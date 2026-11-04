// Phần dùng chung của các hàm máy chủ trên Vercel (thay cho cau_noi.py khi chạy trên web).
// Dữ liệu: mỗi bảng một file trong Vercel Blob («hieubai/db/<bảng>.js»); chưa có thì đọc bản gốc trong thư mục db/ của repo.
// Khóa Gemini: lưu ở «hieubai/bi_mat/…» (tên có đuôi ngẫu nhiên, chỉ máy chủ liệt kê được), hoặc biến môi trường GEMINI_API_KEY.
const fs = require("fs");
const path = require("path");
const { put, list, del } = require("@vercel/blob");

const BANG = ["meta", "chuong_trinh", "bai_ngoai", "lop", "ngan_hang", "thuat_ngu", "loi_tu_duy", "phien", "ket_qua", "de", "lam_de", "nguoi_dung", "giao"];
const TIEN_TO = "hieubai/db/";
const BI_MAT = "hieubai/bi_mat/";
const MODEL_MAC_DINH = "gemini-2.5-flash";

// Khóa Blob: Vercel đặt tên BLOB_READ_WRITE_TOKEN, hoặc <TIỀN TỐ>_BLOB_READ_WRITE_TOKEN nếu lúc nối kho có đặt tiền tố
function khoaBlob() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const ten = Object.keys(process.env).find((k) => /BLOB_READ_WRITE_TOKEN$/.test(k) && process.env[k]);
  return ten ? process.env[ten] : "";
}

async function timBlob(ten) {
  const { blobs } = await list({ prefix: ten, limit: 20, token: khoaBlob() });
  return blobs.filter((b) => b.pathname === ten || b.pathname.startsWith(ten))
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0] || null;
}

async function docChu(url) {
  // Thêm tham số để không lấy bản cũ trong bộ nhớ đệm của CDN
  const r = await fetch(url + (url.includes("?") ? "&" : "?") + "t=" + Date.now(), { cache: "no-store" });
  if (!r.ok) throw new Error("Không đọc được dữ liệu (" + r.status + ")");
  return r.text();
}

async function docBang(bang) {
  if (!BANG.includes(bang)) throw new Error("Bảng không hợp lệ");
  if (khoaBlob()) {
    const b = await timBlob(TIEN_TO + bang + ".js");
    if (b) return docChu(b.url);
  }
  return fs.readFileSync(path.join(process.cwd(), "db", bang + ".js"), "utf8");
}

async function ghiBang(bang, noiDung) {
  if (!BANG.includes(bang)) throw new Error("Bảng không hợp lệ");
  await put(TIEN_TO + bang + ".js", noiDung, {
    access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "text/javascript; charset=utf-8", cacheControlMaxAge: 60, token: khoaBlob(),
  });
}

// Lấy giá trị JSON sau «DB_SEED.<bảng> =» trong nội dung file bảng
function giaTriBang(chu, bang) {
  const i = chu.indexOf("=", chu.indexOf("DB_SEED." + bang));
  return JSON.parse(chu.slice(i + 1, chu.lastIndexOf(";")));
}

async function docBiMat() {
  if (!khoaBlob()) return {};
  const b = await timBlob(BI_MAT + "gemini");
  if (!b) return {};
  try { return JSON.parse(await docChu(b.url)); } catch (e) { return {}; }
}

async function ghiBiMat(obj) {
  const { blobs } = await list({ prefix: BI_MAT, limit: 50, token: khoaBlob() });
  if (blobs.length) await del(blobs.map((b) => b.url), { token: khoaBlob() });
  await put(BI_MAT + "gemini.json", JSON.stringify(obj), { access: "public", addRandomSuffix: true, contentType: "application/json", cacheControlMaxAge: 60, token: khoaBlob() });
}

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

module.exports = { khoaBlob, BANG, docBang, ghiBang, giaTriBang, docBiMat, ghiBiMat, cauHinhAI, goiGemini, laAdmin };
