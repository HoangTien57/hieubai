// Phần dùng chung của các hàm máy chủ trên Vercel (thay cho cau_noi.py khi chạy trên web).
// Dữ liệu: mỗi bảng một file trong kho Vercel Blob loại Private («hieubai/db/<bảng>.js»); chưa có thì đọc bản gốc trong db/ của repo.
// Khóa Gemini: «hieubai/bi_mat/gemini.json» trong kho Private (chỉ máy chủ đọc được), hoặc biến môi trường GEMINI_API_KEY.
const fs = require("fs");
const path = require("path");
const { put, get } = require("@vercel/blob");

const BANG = ["meta", "chuong_trinh", "bai_ngoai", "lop", "ngan_hang", "thuat_ngu", "loi_tu_duy", "phien", "ket_qua", "de", "lam_de", "nguoi_dung", "giao"];
const TIEN_TO = "hieubai/db/";
const FILE_BI_MAT = "hieubai/bi_mat/gemini.json";
const MODEL_MAC_DINH = "gemini-3.8-flash";

// Kho Blob loại Private: chạy trên Vercel, thư viện tự đăng nhập bằng OIDC khi kho đã nối dự án (có BLOB_STORE_ID).
// Có khóa BLOB_READ_WRITE_TOKEN (hoặc <TIỀN TỐ>_BLOB_READ_WRITE_TOKEN) thì dùng khóa đó.
function khoaBlob() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const ten = Object.keys(process.env).find((k) => /BLOB_READ_WRITE_TOKEN$/.test(k) && process.env[k]);
  return ten ? process.env[ten] : "";
}
function coBlob() { return !!(process.env.BLOB_STORE_ID || khoaBlob()); }
function tuyChon(them) { const k = khoaBlob(); return Object.assign({ access: "private" }, k ? { token: k } : {}, them || {}); }

// Đọc một file trong kho; chưa có thì trả null. useCache: false để luôn lấy bản vừa ghi
async function docFile(ten) {
  let kq;
  try { kq = await get(ten, tuyChon({ useCache: false })); } catch (e) { if (/not.?found|404/i.test(String(e && (e.name + e.message)))) return null; throw e; }
  if (!kq || kq.statusCode !== 200) return null;
  return new Response(kq.stream).text();
}
async function ghiFile(ten, noiDung, loai) {
  await put(ten, noiDung, tuyChon({ addRandomSuffix: false, allowOverwrite: true, contentType: loai, cacheControlMaxAge: 60 }));
}

async function docBang(bang) {
  if (!BANG.includes(bang)) throw new Error("Bảng không hợp lệ");
  if (coBlob()) { const chu = await docFile(TIEN_TO + bang + ".js"); if (chu !== null) return chu; }
  return fs.readFileSync(path.join(process.cwd(), "db", bang + ".js"), "utf8");
}

async function ghiBang(bang, noiDung) {
  if (!BANG.includes(bang)) throw new Error("Bảng không hợp lệ");
  await ghiFile(TIEN_TO + bang + ".js", noiDung, "text/javascript; charset=utf-8");
}

// Lấy giá trị JSON sau «DB_SEED.<bảng> =» trong nội dung file bảng
function giaTriBang(chu, bang) {
  const i = chu.indexOf("=", chu.indexOf("DB_SEED." + bang));
  return JSON.parse(chu.slice(i + 1, chu.lastIndexOf(";")));
}

// Khóa Gemini lưu trong kho Private (chỉ máy chủ đọc được)
async function docBiMat() {
  if (!coBlob()) return {};
  try { const chu = await docFile(FILE_BI_MAT); return chu ? JSON.parse(chu) : {}; } catch (e) { return {}; }
}
async function ghiBiMat(obj) { await ghiFile(FILE_BI_MAT, JSON.stringify(obj), "application/json"); }

async function cauHinhAI() {
  const bm = await docBiMat();
  return { khoa: bm.khoa || process.env.GEMINI_API_KEY || "", model: bm.model || process.env.GEMINI_MODEL || MODEL_MAC_DINH, tuBien: !bm.khoa && !!process.env.GEMINI_API_KEY };
}

async function goiGemini(cauLenh, khoa, model) {
  const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": khoa },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: cauLenh }] }],
      generationConfig: { temperature: 0.4, responseMimeType: "application/json", maxOutputTokens: 32768 },
    }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j.error && j.error.message) || "Gemini báo lỗi " + r.status);
  const chu = (((j.candidates || [])[0] || {}).content || {}).parts || [];
  const kq = chu.map((p) => p.text || "").join("");
  if (!kq) throw new Error("Gemini không trả nội dung (có thể bị bộ lọc an toàn chặn). Thử lại hoặc đổi cách hỏi.");
  return kq;
}

// Kiểm mã + PIN của Ban Khảo thí theo bảng người dùng đang lưu
async function laAdmin(ma, pin) {
  const ds = giaTriBang(await docBang("nguoi_dung"), "nguoi_dung");
  const u = ds.find((x) => String(x.ma).toUpperCase() === String(ma || "").trim().toUpperCase());
  return !!(u && u.vai === "admin" && String(u.pin) === String(pin || "").trim());
}

module.exports = { khoaBlob, coBlob, BANG, docBang, ghiBang, giaTriBang, docBiMat, ghiBiMat, cauHinhAI, goiGemini, laAdmin };
