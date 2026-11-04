// Lớp dữ liệu: đọc db/*.js (window.DB_SEED); bản sửa trên trình duyệt (localStorage) được dùng nếu mới hơn.
// Ghi ra db/*.js theo một trong hai đường: cầu nối cau_noi.py (khi mở qua http://127.0.0.1:8787), hoặc thư mục đã kết nối (Chrome/Edge)
var BANG = ["meta", "chuong_trinh", "bai_ngoai", "lop", "ngan_hang", "thuat_ngu", "loi_tu_duy", "phien", "ket_qua", "de", "lam_de", "nguoi_dung", "giao"];
var KHOA_LS = "hieubai_db_v1";

var DB = (function () {
  var seed = window.DB_SEED || {};
  var d = {}, nguon = "file", thuMuc = null, chuaGhi = false, loiGhi = "", cauNoi = null, xungDot = false, banGoc = null;
  // Mở qua cầu nối (http://…) thì file trong db/ là bản chuẩn, dùng chung nhiều máy: không lấy bản trên trình duyệt
  var quaMang = location.protocol.indexOf("http") === 0;

  function sao(x) { return JSON.parse(JSON.stringify(x)); }
  function macDinh(b) { return b === "meta" ? { luu_luc: "", schema: 1 } : []; }
  // chuong_trinh là danh sách môn – lớp; dữ liệu cũ (một môn) được bọc lại thành danh sách
  function chuanHoa() {
    if (!Array.isArray(d.chuong_trinh)) d.chuong_trinh = d.chuong_trinh && d.chuong_trinh.chuong ? [d.chuong_trinh] : [];
    d.chuong_trinh.forEach(function (ct) { if (!ct.id) ct.id = ct.mon === "Sinh học" ? "SH10" : "MON" + Math.random().toString(36).slice(2, 6).toUpperCase(); });
  }

  function tai() {
    var local = null;
    try { local = JSON.parse(localStorage.getItem(KHOA_LS) || "null"); } catch (e) { local = null; }
    var mocFile = (seed.meta && seed.meta.luu_luc) || "", schema = (seed.meta && seed.meta.schema) || 1;
    // Bản trên trình duyệt chỉ được dùng khi cùng cấu trúc dữ liệu và mới hơn thư mục db
    if (!quaMang && local && local.meta && local.meta.schema === schema && local.meta.luu_luc > mocFile) {
      d = local; nguon = "trinh_duyet"; chuaGhi = true;
    } else {
      BANG.forEach(function (b) { d[b] = seed[b] !== undefined ? sao(seed[b]) : macDinh(b); });
      nguon = "file"; chuaGhi = false;
    }
    BANG.forEach(function (b) { if (d[b] === undefined) d[b] = macDinh(b); });
    chuanHoa();
    banGoc = d.meta.luu_luc || "";
  }

  function noiDungFile(b) {
    return "// Bảng " + b + " — ghi bởi app Hiểu bài lúc " + d.meta.luu_luc + ". Sửa tay được, giữ đúng cú pháp JSON\n" +
      "window.DB_SEED = window.DB_SEED || {};\nDB_SEED." + b + " = " + JSON.stringify(d[b], null, 1) + ";\n";
  }

  function ghiFile(b) {
    return thuMuc.getFileHandle(b + ".js", { create: true }).then(function (fh) {
      return fh.createWritable();
    }).then(function (w) {
      return w.write(noiDungFile(b)).then(function () { return w.close(); });
    });
  }

  function ghiQuaCauNoi() {
    var files = {};
    BANG.forEach(function (b) { files[b] = noiDungFile(b); });
    return fetch("/api/luu", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ files: files, ban_goc: banGoc }) })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j.xung_dot) { xungDot = true; throw new Error("Máy khác vừa lưu thay đổi. Tải lại trang (F5) để lấy dữ liệu mới; thay đổi vừa rồi của bạn chưa được ghi."); }
        if (!j.ok) throw new Error(j.loi || "Cầu nối không ghi được");
        banGoc = d.meta.luu_luc;
      });
  }

  function ghiTatCa() {
    var viec = cauNoi && cauNoi.ghi_file ? ghiQuaCauNoi() : thuMuc ? Promise.all(BANG.map(ghiFile)) : null;
    if (!viec) return Promise.resolve(false);
    return viec.then(function () {
      chuaGhi = false; loiGhi = ""; nguon = "file"; return true;
    }).catch(function (e) {
      loiGhi = String(e && e.message || e); chuaGhi = true; return false;
    });
  }

  function luu() {
    if (xungDot) { if (window.capNhatBanner) window.capNhatBanner(); return Promise.resolve(false); }
    d.meta.luu_luc = new Date().toISOString();
    try { localStorage.setItem(KHOA_LS, JSON.stringify(d)); } catch (e) { loiGhi = "Trình duyệt không cho lưu: " + e.message; }
    chuaGhi = true; nguon = "trinh_duyet";
    return ghiTatCa().then(function (ok) { if (window.capNhatBanner) window.capNhatBanner(); return ok; });
  }

  function taiVe(ten, noiDung, loai) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([noiDung], { type: loai || "text/javascript" }));
    a.download = ten;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  tai();

  // Mở qua cầu nối thì hỏi trạng thái; có cầu nối thì ghi luôn bản trên trình duyệt (nếu mới hơn) ra db/
  var sanSang = location.protocol.indexOf("http") === 0
    ? fetch("/api/trang_thai").then(function (r) { return r.json(); }).then(function (j) {
        cauNoi = j && j.ok ? j : null;
        if (cauNoi && chuaGhi) return ghiTatCa();
      }).catch(function () { cauNoi = null; })
    : Promise.resolve();

  return {
    sanSang: sanSang,
    cauNoi: function () { return cauNoi; },
    xungDot: function () { return xungDot; },
    get d() { return d; },
    luu: luu,
    nguon: function () { return nguon; },
    chuaGhi: function () { return chuaGhi; },
    loiGhi: function () { return loiGhi; },
    daKetNoi: function () { return !!thuMuc || !!(cauNoi && cauNoi.ghi_file); },
    hoTroThuMuc: function () { return typeof window.showDirectoryPicker === "function"; },
    ketNoiThuMuc: function () {
      return window.showDirectoryPicker({ mode: "readwrite" }).then(function (h) {
        thuMuc = h;
        return ghiTatCa();
      });
    },
    taiCacFile: function () {
      BANG.forEach(function (b, i) { setTimeout(function () { taiVe(b + ".js", noiDungFile(b)); }, i * 350); });
    },
    saoLuu: function () {
      taiVe("hieu_bai_sao_luu_" + d.meta.luu_luc.slice(0, 10) + ".json", JSON.stringify(d, null, 1), "application/json");
    },
    nhap: function (obj) {
      var thieu = BANG.filter(function (b) { return obj[b] === undefined; });
      if (thieu.length) return Promise.reject(new Error("File thiếu bảng: " + thieu.join(", ")));
      d = obj; chuanHoa();
      return luu();
    },
    boThayDoi: function () {
      try { localStorage.removeItem(KHOA_LS); } catch (e) {}
      location.reload();
    }
  };
})();
