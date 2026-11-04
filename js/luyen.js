// Luyện đề (#luyen): danh sách đề → chuẩn bị (đặt giờ đếm ngược) → làm bài (gắn cờ, đi lại tự do, nộp) → kết quả → ôn lại câu sai.
// Thêm đề: AI tạo theo môn, học kì, số câu; hoặc học sinh dán chữ / thả file → tách câu. Lộ trình ôn lại (sơ đồ lỗi) được dựng khi
// học sinh làm sai câu nào, cho đúng phương án em đã chọn, rồi lưu lại dùng cho lần sau.
// Nạp trước app.js; dùng các hàm chung của app.js (esc, timBai, timCau, timLoi, veBaiGiang, optsBac…) lúc chạy.
var LOAI_DE = { "15p": "Đề 15 phút", "1tiet": "Đề kiểm tra 1 tiết", "hk": "Đề kiểm tra học kì", "khac": "Đề khác" };
var SO_CAU_GOI_Y = { "15p": 10, "1tiet": 25, "hk": 40, "khac": 15 };
var LD = { man: "ds", ct: "", de: null, lam: null, kq: null, on: null, hen: null, tao: null, them: null };

function ldEl() { return document.getElementById("main"); }
function timDe(id) { return DB.d.de.filter(function (d) { return d.id === id; })[0] || null; }
function timLam(id) { return DB.d.lam_de.filter(function (x) { return x.id === id; })[0] || null; }
function dongHo(giay) { giay = Math.max(0, Math.round(giay)); return Math.floor(giay / 60) + ":" + String(giay % 60).padStart(2, "0"); }
function tenHs() { try { return localStorage.getItem("hb_ten") || ""; } catch (e) { return ""; } }
function diemLam(r, de) {
  var ds = de.cau.map(timCau), dung = 0;
  ds.forEach(function (c, i) { if (c && r.tra_loi[i] === c.d) dung++; });
  return { dung: dung, n: ds.length, diem: ds.length ? Math.round(dung / ds.length * 100) / 10 : 0 };
}
// Học kì: chưa có mốc học kì trong khung chương trình → tạm lấy nửa đầu số bài là học kì I, nửa sau là học kì II
function baiHocKy(ctId, hk) {
  var ds = baiCuaMon(ctId).filter(function (b) { return !b.ngoai; }), giua = Math.ceil(ds.length / 2);
  return hk === 2 ? ds.slice(giua) : ds.slice(0, giua);
}

// Xếp bài khi không có AI: so từ (bỏ dấu) và cặp từ liền nhau của câu hỏi với tên bài + yêu cầu cần đạt; không khớp gì thì null
function boDau(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d"); }
var TU_THUONG = { cua: 1, cac: 1, nhung: 1, mot: 1, trong: 1, duoc: 1, nao: 1, sau: 1, day: 1, la: 1, va: 1, voi: 1, cho: 1, khi: 1, thi: 1, nay: 1, the: 1, bai: 1, nhu: 1, hay: 1, khong: 1, co: 1 };
function tachTu(s) { return boDau(s).split(/[^a-z0-9]+/).filter(function (w) { return w.length >= 2 && !TU_THUONG[w]; }); }
function xepBaiTuKhoa(cau, dsBai) {
  var tq = tachTu(cau.q + " " + cau.o.join(" ")), dem = {}, cap = {};
  tq.forEach(function (w, i) { dem[w] = 1; if (i) cap[tq[i - 1] + " " + w] = 1; });
  var tot = null, diemTot = 0;
  dsBai.forEach(function (b) {
    var tb = tachTu(b.ten + " " + b.yccd.join(" ")), d = 0, da = {};
    tb.forEach(function (w, i) { if (dem[w] && !da[w]) { d += 1; da[w] = 1; } if (i && cap[tb[i - 1] + " " + w]) d += 2; });
    if (d > diemTot) { diemTot = d; tot = b.id; }
  });
  return diemTot >= 2 ? tot : null;
}
function xepBaiCho(M, xong) {
  var ct = timCT(M.ct), dsBai = baiCuaMon(M.ct), hopLe = {};
  dsBai.forEach(function (b) { hopLe[b.id] = 1; });
  if (!AI.daNoi()) {
    M.ds.forEach(function (x) { x.bai = xepBaiTuKhoa(x, dsBai); x.chuaXep = !x.bai; });
    xong(); return;
  }
  chayAI("Đang xếp câu vào bài học", AI.promptXepBai(M.ds, ct, dsBai), function (text) {
    var r = AI.docKetQua(text);
    if (r.loi.length) return r.loi;
    if (!r.obj || !Array.isArray(r.obj.cau)) return ["Thiếu mảng «cau»."];
    r.obj.cau.forEach(function (y) {
      var x = M.ds[+y.i];
      if (!x) return;
      x.bai = hopLe[y.bai] ? y.bai : null; x.chuaXep = !x.bai;
      x.lech = y.dung_mon === false ? String(y.mon_goi_y || "môn khác") : "";
    });
    return null;
  }, xong);
}
// Dựng sơ đồ lỗi (lộ trình gỡ) cho mọi câu của đề ngay khi lưu: mỗi bài một lượt AI, lần lượt; dừng giữa chừng thì phần còn lại dựng khi học sinh làm sai
function dungSoDoDe(deId, xong) {
  var d = timDe(deId), nhom = {}, thuTu = [];
  if (!AI.daNoi()) { xong(); return; }
  d.cau.map(timCau).filter(function (c) { return c && !coBanDo(c); }).forEach(function (c) {
    if (!nhom[c.bai]) { nhom[c.bai] = []; thuTu.push(c.bai); }
    nhom[c.bai].push(c);
  });
  var i = 0;
  (function tiep() {
    if (i >= thuTu.length) { xong(); return; }
    var bai = timBai(thuTu[i]), caus = nhom[thuTu[i]];
    i++;
    if (!bai) { tiep(); return; }
    chayAI("Đang chuẩn bị phần ôn tập · " + i + "/" + thuTu.length + " · " + bai.ten, AI.promptBanDo(bai, caus, bai.ct.mon, bai.ct.lop), function (text) {
      var r = AI.docKetQua(text);
      if (r.loi.length) return r.loi;
      var e = AI.kiem(r.obj, "bando", caus);
      if (e.length) return e;
      AI.nap(r.obj, "bando", bai); DB.luu();
      return null;
    }, tiep);
  })();
}

function vLuyen() {
  if (!LD.kho) LD.kho = "chung";
  var v ={ ds: veDsDe, chuan_bi: veChuanBi, lam: veLam, kq: veKq, on: veOn, tao: veTao, them: veThem }[LD.man] || veDsDe;
  ldEl().innerHTML = '<div class="ldv">' + v() + '</div>';
  if (LD.man === "lam") capNhatGio();
}

// ---------- Danh sách đề ----------
// Phạm vi đề: chung (kho chung, Ban Khảo thí quản lý; nháp hoặc đã đăng) · rieng (của một học sinh) · gv (thầy cô tạo để giao)
function phamViDe(d) { return d.pham_vi || (d.nguon === "hs" ? "rieng" : "chung"); }
function trangThaiDe(d) { return d.trang_thai || "da_dang"; }
// Chỗ đang xem trong Luyện đề: chung | rieng | duocgiao (học sinh) · qlde (Ban Khảo thí) · gvtao (thầy cô tạo đề để giao)
function datKho(k) { if (LD.kho !== k) { LD.kho = k; if (!LD.lam && !LD.on && k !== "gvtao") LD.man = "ds"; } }
var TIEU_DE_KHO = { chung: "Kho đề chung", rieng: "Đề của em", duocgiao: "Đề được giao", qlde: "Kho đề chung", gvtao: "Tạo đề để giao" };
function deCuaKho() {
  var u = VAI.me() || {};
  return DB.d.de.filter(function (d) {
    var pv = phamViDe(d);
    if (LD.kho === "chung") return pv === "chung" && trangThaiDe(d) === "da_dang";
    if (LD.kho === "rieng") return pv === "rieng" && d.chu === u.ma;
    if (LD.kho === "qlde") return pv === "chung";
    return false;
  });
}
function veDuocGiao() {
  var u = VAI.me(), ds = DB.d.giao.filter(function (g) { return g.lop === u.lop; }).slice().reverse();
  var h = '<div class="head"><h1>Đề được giao</h1><p class="muted">Đề thầy cô giao cho lớp ' + esc(u.lop) + '.</p></div>';
  if (!ds.length) return h + '<p class="empty">Thầy cô chưa giao đề nào. Em vào <a href="#chung">Kho đề chung</a> để luyện thêm nhé.</p>';
  return h + '<div class="ld-grid">' + ds.map(function (g) {
    var d = timDe(g.de); if (!d) return "";
    var gv = VAI.nd(g.gv), lan = DB.d.lam_de.filter(function (r) { return r.ma === u.ma && r.de === d.id && r.nop_luc >= g.tao_luc; }), cuoi = lan[lan.length - 1], kq = cuoi ? diemLam(cuoi, d) : null;
    var quaHan = g.han && !cuoi && new Date(g.han + "T23:59:59") < new Date();
    return '<div class="ld-card"><p class="eyebrow">' + esc(gv ? gv.ten : "Thầy cô") + (g.han ? ' · hạn ' + new Date(g.han).toLocaleDateString("vi-VN") : '') + '</p><b>' + esc(d.ten) + '</b><span class="small muted">' + d.cau.length + ' câu · ' + d.thoi_gian + ' phút</span>' +
      (kq ? '<span class="pill d">Đã làm · ' + kq.dung + '/' + kq.n + '</span>' : quaHan ? '<span class="pill x">Quá hạn</span>' : '<span class="pill n">Chưa làm</span>') +
      '<div class="row-btn"><button class="btn sm" data-ld="chon-de" data-id="' + d.id + '">' + (cuoi ? "Làm lại" : "Làm đề") + '</button>' + (cuoi ? '<button class="link" data-ld="xem-kq" data-id="' + cuoi.id + '">Xem kết quả</button>' : '') + '</div></div>';
  }).join("") + '</div>';
}
function veDsDe() {
  if (LD.kho === "duocgiao") return veDuocGiao();
  var u = VAI.me() || {}, mon = {}, tat = deCuaKho(), ds = tat.filter(function (d) { mon[d.ct] = 1; return !LD.ct || d.ct === LD.ct; });
  var chon = '<select data-ld-chon="ct" aria-label="Môn"><option value="">Tất cả môn</option>' + DB.d.chuong_trinh.filter(function (c) { return mon[c.id] || c.id === LD.ct; }).map(function (c) {
    return '<option value="' + c.id + '"' + (c.id === LD.ct ? " selected" : "") + '>' + esc(c.mon + " " + c.lop) + '</option>';
  }).join("") + '</select>';
  var taoDuoc = LD.kho === "rieng" || LD.kho === "qlde";
  var h = '<div class="head"><div class="head-row"><h1>' + TIEU_DE_KHO[LD.kho] + '</h1>' + chon +
    (taoDuoc ? '<button class="btn sm" data-ld="mo-tao"><span class="ai-dot"></span>AI tạo đề</button><button class="btn ghost sm" data-ld="mo-them">+ ' + (LD.kho === "rieng" ? "Thêm đề của em" : "Thêm đề từ văn bản, file") + '</button>' : '') + '</div>' +
    (LD.kho === "rieng" ? '<p class="muted">Đề em tự tạo chỉ mình em thấy.</p>' : LD.kho === "chung" ? '<p class="muted">Đề do Ban Khảo thí soạn và cập nhật thường xuyên, em luyện miễn phí.</p>' : '<p class="muted">Đề mới tạo ở trạng thái nháp; bấm «Đăng» để học sinh thấy.</p>') + '</div>';
  if (!ds.length) return h + '<p class="empty">' + (LD.kho === "rieng" ? 'Em chưa có đề riêng. Bấm «AI tạo đề» hoặc «Thêm đề của em».' : LD.kho === "chung" ? 'Chưa có đề cho môn này.' : 'Chưa có đề nào.') + '</p>';
  Object.keys(LOAI_DE).forEach(function (loai) {
    var nhom = ds.filter(function (d) { return (LOAI_DE[d.loai] ? d.loai : "khac") === loai; });
    if (!nhom.length) return;
    h += '<h2 class="ld-nhom">' + LOAI_DE[loai] + '</h2><div class="ld-grid">' + nhom.map(function (d) {
      var ct = timCT(d.ct), lan = DB.d.lam_de.filter(function (x) { return x.de === d.id && (LD.kho === "qlde" || x.ma === u.ma); }), cuoi = lan[lan.length - 1], kq = cuoi ? diemLam(cuoi, d) : null;
      var ql = LD.kho === "qlde", dang = trangThaiDe(d) === "da_dang";
      return '<div class="ld-card"><p class="eyebrow">' + esc(ct ? ct.mon + " " + ct.lop : d.ct) + ' · Học kì ' + (d.hoc_ky || "–") + (d.nguon === "ai" ? ' · AI tạo' : '') + '</p>' +
        '<b>' + esc(d.ten) + '</b><span class="small muted">' + d.cau.length + ' câu · ' + d.thoi_gian + ' phút</span>' +
        (ql ? '<span class="pill ' + (dang ? "d" : "n") + '">' + (dang ? "Đã đăng" : "Nháp, chưa đăng") + '</span>' + (lan.length ? '<span class="small muted">' + lan.length + ' lượt học sinh làm</span>' : '') :
          kq ? '<span class="small">Lần gần nhất: <b>' + kq.dung + '/' + kq.n + '</b> (' + String(kq.diem).replace(".", ",") + ' điểm) · ' + lan.length + ' lần làm</span>' : '') +
        '<div class="row-btn"><button class="btn sm' + (ql ? " ghost" : "") + '" data-ld="chon-de" data-id="' + d.id + '">' + (ql ? "Làm thử" : "Làm đề") + '</button>' +
        (ql ? '<button class="btn sm" data-ld="' + (dang ? "go-dang" : "dang") + '" data-id="' + d.id + '">' + (dang ? "Gỡ đăng" : "Đăng") + '</button><button class="link danger" data-ld="xoa-de" data-id="' + d.id + '">Xóa</button>'
          : cuoi ? '<button class="link" data-ld="xem-kq" data-id="' + cuoi.id + '">Xem kết quả lần trước</button>' : '') + '</div></div>';
    }).join("") + '</div>';
  });
  return h;
}

// ---------- Chuẩn bị ----------
function veChuanBi() {
  var d = timDe(LD.de), ct = timCT(d.ct);
  return '<div class="ld-phone"><p class="eyebrow">' + esc(ct ? ct.mon + " " + ct.lop : "") + ' · ' + (LOAI_DE[d.loai] || "Đề") + '</p><h2>' + esc(d.ten) + '</h2>' +
    '<p>' + d.cau.length + ' câu trắc nghiệm · thời gian chuẩn <b>' + d.thoi_gian + ' phút</b></p>' +
    '<label class="f">Thời gian em muốn đếm ngược (phút)<input type="number" data-ld-phut min="1" max="240" value="' + d.thoi_gian + '"></label>' +
    '<p class="small muted">Thời gian chuẩn là thời gian nên có để làm đề này. Em có thể đặt ít hơn để luyện tốc độ, hoặc nhiều hơn khi mới ôn. Hết giờ, bài tự nộp.</p>' +
    '<ul class="plain small"><li>Bấm số câu ở bảng câu hỏi để đi tới câu bất kì.</li><li>Chưa chắc đáp án thì bấm <b>Gắn cờ</b> để quay lại sau.</li><li>Xong thì bấm <b>Nộp bài</b>.</li></ul>' +
    '<div class="row-btn"><button class="btn" data-ld="bat-dau">Bắt đầu làm bài</button><button class="btn ghost" data-ld="ve-ds">Quay lại</button></div></div>';
}

// ---------- Làm bài ----------
function veLam() {
  var L = LD.lam, d = timDe(L.de), ds = d.cau.map(timCau), i = L.i, c = ds[i];
  var nav = ds.map(function (x, j) {
    var cls = (j === i ? " on" : "") + (L.tra_loi[j] !== null ? " da" : "") + (L.co[j] ? " co" : "");
    return '<button class="ld-o' + cls + '" data-ld="toi" data-i="' + j + '" aria-label="Câu ' + (j + 1) + (L.co[j] ? ', gắn cờ' : '') + (L.tra_loi[j] !== null ? ', đã làm' : '') + '">' + (j + 1) + '</button>';
  }).join("");
  var daLam = L.tra_loi.filter(function (x) { return x !== null; }).length, soCo = L.co.filter(Boolean).length;
  return '<div class="ld-bar"><b class="ld-ten">' + esc(d.ten) + '</b><span class="ld-gio" id="ld-gio">--:--</span><button class="btn sm" data-ld="nop">Nộp bài</button></div>' +
    '<div class="ld-lam"><aside class="ld-nav"><p class="small b">Bảng câu hỏi</p><div class="ld-onav">' + nav + '</div>' +
    '<p class="small muted">Đã làm ' + daLam + '/' + ds.length + (soCo ? ' · ' + soCo + ' câu gắn cờ' : '') + '</p>' +
    '<div class="legend"><span><i class="ld-sw da"></i>Đã làm</span><span><i class="ld-sw co"></i>Gắn cờ</span></div></aside>' +
    '<div class="ld-cau"><div class="qhead"><b>Câu ' + (i + 1) + '/' + ds.length + '</b><button class="btn ghost sm' + (L.co[i] ? ' ld-flag-on' : '') + '" data-ld="co">' + (L.co[i] ? '⚑ Bỏ cờ' : '⚐ Gắn cờ') + '</button></div>' +
    '<p class="qtext">' + esc(c ? c.q : "(Câu đã bị xóa khỏi kho)") + '</p><div class="opts">' + (c ? c.o.map(function (o, k) {
      return '<button data-k="' + k + '"' + (L.tra_loi[i] === k ? ' class="sel"' : '') + '><b>' + KEYS[k] + '</b><span>' + esc(o) + '</span></button>';
    }).join("") : '') + '</div>' +
    '<div class="row-btn ld-di"><button class="btn ghost" data-ld="lui"' + (i ? "" : " disabled") + '>← Câu trước</button>' +
    (i < ds.length - 1 ? '<button class="btn" data-ld="tien">Câu sau →</button>' : '<button class="btn" data-ld="nop">Nộp bài</button>') + '</div></div></div>';
}
function conLai() { return LD.lam ? (LD.lam.het - Date.now()) / 1000 : 0; }
function capNhatGio() {
  var g = document.getElementById("ld-gio");
  if (g && LD.lam) { var s = conLai(); g.textContent = "⏱ " + dongHo(s); g.classList.toggle("gap", s <= 60); }
}
function chayDongHo() {
  clearInterval(LD.hen);
  LD.hen = setInterval(function () {
    if (!LD.lam) { clearInterval(LD.hen); return; }
    if (conLai() <= 0) { nopBai(true); return; }
    capNhatGio();
  }, 1000);
}
function nopBai(tuDong) {
  var L = LD.lam, d = timDe(L.de);
  if (!tuDong) {
    var trong = L.tra_loi.filter(function (x) { return x === null; }).length, co = L.co.filter(Boolean).length;
    var nhac = (trong ? "Còn " + trong + " câu chưa làm. " : "") + (co ? "Còn " + co + " câu gắn cờ. " : "");
    if (!confirm(nhac + "Em chắc chắn nộp bài?")) return;
  }
  clearInterval(LD.hen);
  var toi = VAI.me() || {};
  var r = { id: "L" + Date.now().toString(36), de: d.id, ma: toi.ma || "", vai: toi.vai || "", ten_hs: toi.ten || "", bat_dau: new Date(L.bd).toISOString(), nop_luc: new Date().toISOString(),
    thoi_gian_dat: L.phut, giay_lam: Math.round((Date.now() - L.bd) / 1000), tu_nop: !!tuDong, tra_loi: L.tra_loi.slice(), co: L.co.slice(), lai: {}, go_sai: {} };
  DB.d.lam_de.push(r);
  DB.luu();
  LD.lam = null; LD.kq = r.id; LD.man = "kq";
  if (tuDong) toast("Hết giờ, bài đã tự nộp.");
  // Vẽ lại trang đang mở (kho đề nào cũng được); hết giờ khi em đang ở trang khác thì kết quả chờ sẵn ở kho đề đó
  route();
}

// ---------- Kết quả ----------
function trangThaiCau(r, c, i) {
  if (!c) return { ma: "x", ten: "Câu đã bị xóa" };
  var a = r.tra_loi[i];
  if (a === c.d) return { ma: "d", ten: "Đúng" };
  if (r.lai[c.id] !== undefined) return r.lai[c.id] === c.d ? { ma: "s", ten: "Đã ôn, làm lại đúng" } : { ma: "x", ten: "Đã ôn, vẫn sai" };
  return a === null ? { ma: "t", ten: "Bỏ trống" } : { ma: "x", ten: "Sai" };
}
function veKq() {
  var r = timLam(LD.kq), d = timDe(r.de), ds = d.cau.map(timCau), kq = diemLam(r, d);
  var canOn = ds.filter(function (c, i) { var t = trangThaiCau(r, c, i); return c && (t.ma === "x" || t.ma === "t") && r.lai[c.id] === undefined; });
  var h = '<div class="head"><p class="eyebrow">Kết quả</p><h1>' + esc(d.ten) + '</h1></div>' +
    '<div class="tiles"><div class="tile"><span class="v">' + kq.dung + '/' + kq.n + '</span><span class="l">Câu đúng</span></div>' +
    '<div class="tile"><span class="v">' + String(kq.diem).replace(".", ",") + '</span><span class="l">Điểm (thang 10)</span></div>' +
    '<div class="tile"><span class="v">' + dongHo(r.giay_lam) + '</span><span class="l">Thời gian làm / đặt ' + r.thoi_gian_dat + ' phút' + (r.tu_nop ? ' · hết giờ tự nộp' : '') + '</span></div></div>';
  h += '<div class="row-btn">' + (canOn.length ? '<button class="btn" data-ld="on-het">Ôn lần lượt ' + canOn.length + ' câu sai</button>' : '<span class="small ok-t">Không còn câu nào cần ôn.</span>') +
    '<button class="btn ghost" data-ld="chon-de" data-id="' + d.id + '">Làm lại đề này</button><button class="btn ghost" data-ld="ve-ds">Về kho đề</button></div>';
  h += ds.map(function (c, i) {
    var t = trangThaiCau(r, c, i), a = r.tra_loi[i], b = c ? timBai(c.bai) : null;
    if (!c) return '';
    return '<div class="map ld-kq ' + t.ma + '"><div class="map-h"><div><b>Câu ' + (i + 1) + '.</b> ' + esc(c.q) + '</div><span class="pill ' + ({ d: "d", s: "s", x: "x", t: "n" })[t.ma] + '">' + t.ten + '</span></div>' +
      (t.ma === "d" ? '' : '<div class="map-b"><p class="small">Em chọn: <b>' + (a === null ? "(bỏ trống)" : KEYS[a] + ". " + esc(c.o[a])) + '</b> · Đáp án đúng: <b class="ok-t">' + KEYS[c.d] + '. ' + esc(c.o[c.d]) + '</b></p>' +
        '<p class="small">Kiến thức: <b>' + esc(b ? tenDayDu(b) : c.bai) + '</b>' + (r.co[i] ? ' · em đã gắn cờ câu này' : '') + '</p>' +
        (r.lai[c.id] === undefined ? '<div class="row-btn"><button class="btn sm" data-ld="on" data-id="' + c.id + '"><span class="ai-dot"></span>Ôn lại câu này</button></div>' : '') + '</div>') + '</div>';
  }).join("");
  return h;
}

// ---------- Ôn lại câu sai (cùng lộ trình với Kho bài học: học lại → câu nhỏ → làm lại câu gốc) ----------
function loiCuaCau(c, k) { var id = k === null ? c.loi_trong : c.loi && c.loi[k]; return id ? timLoi(id) : null; }
function batDauOn(qid, hangDoi) {
  var r = timLam(LD.kq), d = timDe(r.de), i = d.cau.indexOf(qid), c = timCau(qid), k = r.tra_loi[i], L = loiCuaCau(c, k);
  var vao = function () {
    LD.on = { qid: qid, k: k, L: loiCuaCau(c, k), fstep: 0, chosen: null, saiBac: [], perm: [], soSai: 0, hang: hangDoi || [] };
    LD.man = "on"; vLuyen(); window.scrollTo(0, 0);
  };
  if (L && L.bac_thang && L.bac_thang.length) { vao(); return; }
  var bai = timBai(c.bai);
  if (!bai) { toast("Không tìm thấy bài của câu này."); return; }
  chayAI("Đang chuẩn bị bài ôn cho câu " + (i + 1), AI.promptLoTrinh(c, k === null ? null : k, bai, L ? L.ten : ""), function (text) {
    var x = AI.docKetQua(text);
    if (x.loi.length) return x.loi;
    var e = AI.kiemLoTrinh(x.obj);
    if (e.length) return e;
    var id = AI.napLoTrinh(x.obj, c, k, bai);
    if (k === null) { delete c.loi[k]; c.loi_trong = id; }
    DB.luu();
    return null;
  }, vao);
}
function veOn() {
  var O = LD.on, c = timCau(O.qid), L = O.L, n = L.bac_thang.length, r = timLam(LD.kq), i = timDe(r.de).cau.indexOf(O.qid);
  var head = '<p class="small muted">Ôn lại câu ' + (i + 1) + (O.hang.length ? ' · còn ' + O.hang.length + ' câu sau' : '') + '</p>' + thanhBuoc(O.fstep, n);
  var h;
  if (O.fstep === 0) {
    h = head + '<p class="qtext">' + esc(c.q) + '</p><p class="small">Em đã ' + (O.k === null ? '<b>bỏ trống</b> câu này' : 'chọn <b>' + KEYS[O.k] + '. ' + esc(c.o[O.k]) + '</b>') + '</p>' +
      '<div class="hint"><span class="lab">Có thể em đang nghĩ</span><span>' + esc(L.hs) + '</span></div><button class="btn" data-ld="on-tiep">Học lại phần này</button>';
  } else if (O.fstep === 1) {
    h = head + '<p class="eyebrow">Học lại</p>' + veBaiGiang(L) + '<button class="btn" data-ld="on-tiep">Em đã đọc xong, làm câu nhỏ</button>';
  } else if (O.fstep < n + 2) {
    var g = L.bac_thang[O.fstep - 2];
    h = head + '<p class="small muted">Câu nhỏ ' + (O.fstep - 1) + '/' + n + ' · ' + (MUC_BAC[g.muc] || "") + '</p><p class="qtext">' + esc(g.q) + '</p>' + optsBac(g, O) + fbBac(g, O) +
      (O.chosen !== null ? '<button class="btn" data-ld="on-tiep">' + (O.fstep - 1 < n ? "Câu nhỏ tiếp theo" : "Làm lại câu gốc") + '</button>' : "") +
      '<details class="lotrinh"><summary>Xem lại phần giải thích</summary>' + veBaiGiang(L) + '</details>';
  } else {
    h = head + '<p class="small muted">Làm lại câu gốc · thứ tự phương án đã được đổi</p><p class="qtext">' + esc(c.q) + '</p>' + optsGoc(c, O) + fbGoc(c, O) +
      (O.chosen !== null ? '<button class="btn" data-ld="on-xong">' + (O.hang.length ? "Câu sai tiếp theo" : "Về kết quả") + '</button>' : "");
  }
  return '<div class="ld-phone">' + h + '<button class="link" data-ld="on-thoat">Thoát ôn tập</button></div>';
}

// ---------- AI tạo đề ----------
function veTao() {
  var T = LD.tao || (LD.tao = { ct: LD.ct || (DB.d.chuong_trinh[0] || {}).id, hk: 1, loai: "15p", n: SO_CAU_GOI_Y["15p"] });
  var dsBai = baiHocKy(T.ct, T.hk);
  return '<div class="card ld-form"><h2>AI tạo đề</h2>' +
    '<div class="row"><label class="f">Môn – lớp<select data-ld-tao="ct">' + DB.d.chuong_trinh.map(function (c) { return '<option value="' + c.id + '"' + (c.id === T.ct ? " selected" : "") + '>' + esc(c.mon + " " + c.lop) + '</option>'; }).join("") + '</select></label>' +
    '<label class="f">Học kì<select data-ld-tao="hk"><option value="1"' + (T.hk === 1 ? " selected" : "") + '>Học kì I</option><option value="2"' + (T.hk === 2 ? " selected" : "") + '>Học kì II</option></select></label></div>' +
    '<div class="row"><label class="f">Loại đề<select data-ld-tao="loai">' + Object.keys(LOAI_DE).map(function (k) { return '<option value="' + k + '"' + (k === T.loai ? " selected" : "") + '>' + LOAI_DE[k] + '</option>'; }).join("") + '</select></label>' +
    '<label class="f">Số câu<input type="number" data-ld-tao="n" min="5" max="50" value="' + T.n + '"></label></div>' +
    '<p class="small muted">' + (dsBai.length ? 'Kiến thức từ ' + esc(dsBai[0].ten) + ' đến ' + esc(dsBai[dsBai.length - 1].ten) + '. ' : '') + 'AI soạn câu hỏi trải đều các bài, tự tính thời gian làm bài và chuẩn bị sẵn phần ôn cho từng câu. Đề nhiều câu có thể mất vài phút.</p>' +
    '<div class="row-btn"><button class="btn" data-ld="tao-chay"' + (dsBai.length ? "" : " disabled") + '><span class="ai-dot"></span>Tạo đề</button><button class="btn ghost" data-ld="ve-ds">Hủy</button></div></div>';
}
function docTao() {
  var T = LD.tao, q = function (k) { return ldEl().querySelector('[data-ld-tao="' + k + '"]'); };
  T.ct = q("ct").value; T.hk = +q("hk").value; T.loai = q("loai").value; T.n = Math.max(5, Math.min(50, parseInt(q("n").value, 10) || 10));
  return T;
}
function luuDeMoi(dsCau, thongTin) {
  var ids = [];
  dsCau.forEach(function (x) {
    var n = DB.d.ngan_hang.filter(function (c) { return c.bai === x.bai; }).length + 1, id = x.bai + "-Q" + n;
    while (timCau(id)) { n++; id = x.bai + "-Q" + n; }
    DB.d.ngan_hang.push({ id: id, bai: x.bai, nguon: thongTin.nguon === "ai" ? "ai_de" : "hs", trang_thai: "cho_duyet", q: x.q, o: x.o, d: x.d, muc: x.muc || null, loi: {} });
    ids.push(id);
  });
  var n = DB.d.de.length + 1, id = "D" + String(n).padStart(3, "0");
  while (timDe(id)) { n++; id = "D" + String(n).padStart(3, "0"); }
  var ct = timCT(thongTin.ct), toi = VAI.me() || {};
  // Đề mới thuộc chỗ đang tạo: Đề của em → riêng của học sinh; Ban Khảo thí → kho chung (nháp); thầy cô tạo để giao → đề của thầy cô
  var pv = LD.kho === "rieng" ? { pham_vi: "rieng", chu: toi.ma } : LD.kho === "gvtao" ? { pham_vi: "gv", chu: toi.ma } : { pham_vi: "chung", trang_thai: "nhap", chu: toi.ma };
  DB.d.de.push(Object.assign({ id: id, ct: thongTin.ct, lop: ct ? ct.lop : null, hoc_ky: thongTin.hk, loai: thongTin.loai, thoi_gian: AI.thoiGianDe(dsCau), nguon: thongTin.nguon,
    tao_luc: new Date().toISOString(), ten: thongTin.ten, cau: ids }, pv));
  lamMoiBai(); DB.luu();
  return id;
}
// Tạo xong: thầy cô → về Giao đề với đề vừa tạo; Ban Khảo thí → danh sách (đề ở trạng thái nháp); học sinh → vào làm luôn
function sauKhiTao() {
  var d = timDe(LD.de);
  if (LD.kho === "gvtao") { GVUI.chonDe = LD.de; LD.man = "ds"; location.hash = "#giaode"; toast("Đã tạo đề. Chọn lớp rồi bấm «Giao đề»."); return; }
  if (LD.kho === "qlde") { LD.man = "ds"; vLuyen(); toast("Đã tạo đề nháp. Bấm «Đăng» để học sinh thấy."); return; }
  LD.man = "chuan_bi"; vLuyen(); toast("Đề đã sẵn sàng. Thời gian chuẩn: " + d.thoi_gian + " phút.");
}
function taoDeAI() {
  var T = docTao(), ct = timCT(T.ct), dsBai = baiHocKy(T.ct, T.hk), hopLe = {};
  dsBai.forEach(function (b) { hopLe[b.id] = 1; });
  chayAI("AI tạo đề · " + ct.mon + " " + ct.lop + " · " + T.n + " câu", AI.promptTaoDe(ct, T.hk, T.n, dsBai), function (text) {
    var x = AI.docKetQua(text);
    if (x.loi.length) return x.loi;
    var e = AI.kiemDeAI(x.obj);
    if (e.length) return e;
    var cau = x.obj.cau.map(function (c) { return { q: String(c.q), o: c.o.map(String), d: +c.d, bai: hopLe[c.bai] ? c.bai : dsBai[0].id, muc: c.muc }; });
    var ten = (LOAI_DE[T.loai] || "Đề") + " · " + (x.obj.ten ? String(x.obj.ten) : "Học kì " + (T.hk === 2 ? "II" : "I") + " (AI tạo)");
    LD.de = luuDeMoi(cau, { ct: T.ct, hk: T.hk, loai: T.loai, nguon: "ai", ten: ten });
    return null;
  }, function () { dungSoDoDe(LD.de, sauKhiTao); });
}

// ---------- Học sinh thêm đề ----------
function veThem() {
  var M = LD.them || (LD.them = { ten: "", ct: LD.ct || (DB.d.chuong_trinh[0] || {}).id, hk: 1, loai: "khac", tab: "dan", text: "", ds: [], trangThai: "" });
  var dsBai = baiCuaMon(M.ct);
  var h = '<div class="card ld-form"><h2>Thêm đề của em</h2>' +
    '<div class="row"><label class="f">Tên đề<input type="text" data-ld-them="ten" value="' + esc(M.ten) + '" placeholder="Ví dụ: Đề ôn giữa kì I"></label>' +
    '<label class="f">Môn – lớp<select data-ld-them="ct">' + DB.d.chuong_trinh.map(function (c) { return '<option value="' + c.id + '"' + (c.id === M.ct ? " selected" : "") + '>' + esc(c.mon + " " + c.lop) + '</option>'; }).join("") + '</select></label></div>' +
    '<div class="row"><label class="f">Học kì<select data-ld-them="hk"><option value="1"' + (M.hk === 1 ? " selected" : "") + '>Học kì I</option><option value="2"' + (M.hk === 2 ? " selected" : "") + '>Học kì II</option></select></label>' +
    '<label class="f">Loại đề<select data-ld-them="loai">' + Object.keys(LOAI_DE).map(function (k) { return '<option value="' + k + '"' + (k === M.loai ? " selected" : "") + '>' + LOAI_DE[k] + '</option>'; }).join("") + '</select></label></div>' +
    '<div class="seg" role="tablist"><button role="tab" data-ld="them-tab" data-tab="dan" aria-selected="' + (M.tab === "dan") + '">Gõ hoặc dán chữ</button><button role="tab" data-ld="them-tab" data-tab="file" aria-selected="' + (M.tab === "file") + '">Tải file PDF, Word</button></div>';
  h += M.tab === "dan" ? '<textarea data-ld-them="text" rows="9" placeholder="Câu 1: …&#10;A. …    B. …    C. …    D. …">' + esc(M.text) + '</textarea>'
    : '<label class="drop" id="ld-drop"><input type="file" data-ld-file accept=".pdf,.docx,.txt" hidden><b>Kéo thả file vào đây</b><span class="small muted">hoặc bấm để chọn · PDF có lớp chữ, Word .docx, .txt</span></label>';
  if (M.trangThai) h += '<p class="small">' + M.trangThai + '</p>';
  h += '<div class="row-btn"><button class="btn" data-ld="them-ai"><span class="ai-dot"></span>AI tách câu và tìm đáp án</button><button class="btn ghost" data-ld="them-tach">Tách nhanh</button><button class="btn ghost" data-ld="ve-ds">Hủy</button></div>' +
    '<p class="small muted">Đề có ghi sẵn đáp án thì bấm «Tách nhanh». Đề chưa có đáp án thì nhờ AI tìm giúp.</p>';
  if (M.ds.length) {
    var lech = M.ds.filter(function (x) { return x.lech; }), goiY = {};
    lech.forEach(function (x) { goiY[x.lech] = (goiY[x.lech] || 0) + 1; });
    var monGoiY = Object.keys(goiY).sort(function (a, b) { return goiY[b] - goiY[a]; })[0];
    h += '<div class="nh-list"><h3>Xem trước: ' + M.ds.length + ' câu</h3>' +
      (lech.length * 2 >= M.ds.length ? '<p class="canh-to">⚠ ' + lech.length + '/' + M.ds.length + ' câu có vẻ không thuộc <b>' + esc(timCT(M.ct).mon + " " + timCT(M.ct).lop) + '</b>' + (monGoiY ? ' mà thuộc <b>' + esc(monGoiY) + '</b>' : '') + '. Em kiểm tra lại ô Môn – lớp ở trên; nếu chọn nhầm thì đổi môn rồi tách lại.</p>' : '') +
      M.ds.map(function (x, i) {
      return '<div class="nh-item' + (x.lech ? ' lech' : '') + '"><div class="nh-top"><label class="check"><input type="checkbox" data-ld-chon="' + i + '" checked> <b>Câu ' + (i + 1) + '</b></label>' +
        '<select data-ld-bai="' + i + '" aria-label="Bài của câu ' + (i + 1) + '"><option value="">— Chọn bài —</option>' + dsBai.map(function (b) { return '<option value="' + b.id + '"' + (b.id === x.bai ? " selected" : "") + '>' + esc(b.ten) + '</option>'; }).join("") + '</select></div>' +
        (x.lech ? '<p class="warnline">Câu này có vẻ thuộc ' + esc(x.lech) + ', không thuộc môn – lớp đang chọn.</p>' : x.chuaXep ? '<p class="warnline">Chưa xếp được vào bài nào: em chọn bài cho câu này.</p>' : '') +
        (x.aiDapAn ? '<p class="note-ai">Đáp án do AI tự giải: em kiểm lại nếu có đáp án gốc.</p>' : '') +
        (x.d === null ? '<p class="warnline">Chưa có đáp án: chọn nút tròn ở phương án đúng.</p>' : '') +
        '<p class="small pre">' + esc(x.q) + '</p>' + [0, 1, 2, 3].map(function (k) {
          return '<label class="f-opt"><input type="radio" name="ld-d-' + i + '" value="' + k + '"' + (x.d === k ? " checked" : "") + '><b>' + KEYS[k] + '</b><span class="small">' + esc(x.o[k] || "(thiếu)") + '</span></label>';
        }).join("") + '</div>';
    }).join("") + '<div class="row-btn"><button class="btn" data-ld="them-luu">Lưu đề và làm ngay</button></div><ul class="plain small err-t" id="ld-loi"></ul></div>';
  }
  return h + '</div>';
}
function docThem() {
  var M = LD.them, q = function (k) { return ldEl().querySelector('[data-ld-them="' + k + '"]'); };
  M.ten = q("ten").value.trim(); M.ct = q("ct").value; M.hk = +q("hk").value; M.loai = q("loai").value;
  if (q("text")) M.text = q("text").value;
  return M;
}
function themBangAI() {
  var M = docThem(), ct = timCT(M.ct), dsBai = baiCuaMon(M.ct), hopLe = {};
  if (!M.text.trim()) { toast("Dán đề hoặc tải file trước."); return; }
  dsBai.forEach(function (b) { hopLe[b.id] = 1; });
  chayAI("AI tách câu và tìm đáp án", AI.promptTach(M.text, ct.mon, ct.lop, dsBai), function (text) {
    var x = AI.docKetQua(text);
    if (x.loi.length) return x.loi;
    var e = AI.kiemTach(x.obj);
    if (e.length) return e;
    M.ds = x.obj.cau.map(function (c) {
      var bai = hopLe[c.bai] ? c.bai : null;
      return { q: String(c.q), o: c.o.map(String), d: +c.d, bai: bai, chuaXep: !bai, muc: c.muc, aiDapAn: c.nguon_dap_an !== "de", lech: c.dung_mon === false ? String(c.mon_goi_y || "môn khác") : "" };
    });
    return null;
  }, function () { M.trangThai = ""; vLuyen(); toast("Đã tách " + M.ds.length + " câu."); });
}
function luuThem() {
  var M = docThem(), loi = [], cau = [], el = ldEl();
  M.ds.forEach(function (x, i) {
    if (!el.querySelector('[data-ld-chon="' + i + '"]').checked) return;
    var dEl = el.querySelector('input[name="ld-d-' + i + '"]:checked');
    if (x.o.length !== 4 || x.o.some(function (o) { return !o; })) loi.push("Câu " + (i + 1) + ": cần đủ 4 phương án (sửa trong văn bản rồi tách lại).");
    else if (!dEl) loi.push("Câu " + (i + 1) + ": chưa chọn đáp án đúng.");
    else if (!el.querySelector('[data-ld-bai="' + i + '"]').value) loi.push("Câu " + (i + 1) + ": chưa chọn bài.");
    else cau.push({ q: x.q, o: x.o, d: +dEl.value, bai: el.querySelector('[data-ld-bai="' + i + '"]').value, muc: x.muc });
  });
  if (loi.length) { el.querySelector("#ld-loi").innerHTML = loi.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join(""); return; }
  if (!cau.length) { toast("Chưa chọn câu nào."); return; }
  LD.de = luuDeMoi(cau, { ct: M.ct, hk: M.hk, loai: M.loai, nguon: "hs", ten: M.ten || "Đề của em · " + new Date().toLocaleDateString("vi-VN") });
  LD.them = null;
  dungSoDoDe(LD.de, sauKhiTao);
}
function napFileThem(file) {
  var M = docThem();
  M.trangThai = "Đang đọc file «" + esc(file.name) + "»…"; vLuyen();
  NHAP.docFile(file).then(function (chu) { M.text = chu; M.tab = "dan"; M.trangThai = "Đã đọc «" + esc(file.name) + "». Rà lại phần chữ rồi bấm nút tách câu."; vLuyen(); })
    .catch(function (e) { M.trangThai = '<span class="err-t">' + esc(e.message) + '</span>'; vLuyen(); });
}

// ---------- Sự kiện ----------
document.getElementById("main").addEventListener("click", function (ev) {
  if (!ev.target.closest(".ldv")) return;
  var opt = ev.target.closest(".opts button");
  if (opt && !opt.disabled) {
    var k = +opt.dataset.k;
    if (LD.man === "lam") { LD.lam.tra_loi[LD.lam.i] = LD.lam.tra_loi[LD.lam.i] === k ? null : k; vLuyen(); return; }
    if (LD.man === "on" && LD.on.chosen === null) {
      var O = LD.on, n = O.L.bac_thang.length;
      if (O.fstep >= 2 && O.fstep < n + 2) {
        if (k === O.L.bac_thang[O.fstep - 2].d) O.chosen = k;
        else if (O.saiBac.indexOf(k) < 0) { O.saiBac.push(k); O.soSai++; }
      } else if (O.fstep === n + 2) {
        O.chosen = k;
        var r = timLam(LD.kq); r.lai[O.qid] = k; r.go_sai[O.qid] = O.soSai; DB.luu();
      }
      vLuyen();
    }
    return;
  }
  var el = ev.target.closest("[data-ld]");
  if (!el || el.disabled) return;
  var a = el.dataset.ld;
  if (a === "ve-ds") { LD.man = "ds"; LD.tao = null; if (LD.kho === "gvtao") { location.hash = "#giaode"; return; } vLuyen(); }
  else if (a === "dang" || a === "go-dang") { var dd0 = timDe(el.dataset.id); dd0.trang_thai = a === "dang" ? "da_dang" : "nhap"; DB.luu(); vLuyen(); toast(a === "dang" ? "Đã đăng: học sinh thấy đề này trong Kho đề chung." : "Đã gỡ khỏi Kho đề chung."); }
  else if (a === "xoa-de") {
    if (!confirm("Xóa đề này khỏi kho? Bài học sinh đã làm vẫn giữ.")) return;
    DB.d.de = DB.d.de.filter(function (d) { return d.id !== el.dataset.id; }); DB.d.giao = DB.d.giao.filter(function (g) { return g.de !== el.dataset.id; }); DB.luu(); vLuyen();
  }
  else if (a === "chon-de") { LD.de = el.dataset.id; LD.man = "chuan_bi"; vLuyen(); window.scrollTo(0, 0); }
  else if (a === "xem-kq") { LD.kq = el.dataset.id; LD.man = "kq"; vLuyen(); }
  else if (a === "bat-dau") {
    var d = timDe(LD.de), phut = Math.max(1, Math.min(240, parseInt(ldEl().querySelector("[data-ld-phut]").value, 10) || d.thoi_gian));
    LD.lam = { de: d.id, i: 0, tra_loi: d.cau.map(function () { return null; }), co: d.cau.map(function () { return false; }), bd: Date.now(), phut: phut, het: Date.now() + phut * 60000 };
    LD.man = "lam"; vLuyen(); chayDongHo();
  }
  else if (a === "toi") { LD.lam.i = +el.dataset.i; vLuyen(); }
  else if (a === "lui") { LD.lam.i = Math.max(0, LD.lam.i - 1); vLuyen(); }
  else if (a === "tien") { LD.lam.i = Math.min(timDe(LD.lam.de).cau.length - 1, LD.lam.i + 1); vLuyen(); }
  else if (a === "co") { LD.lam.co[LD.lam.i] = !LD.lam.co[LD.lam.i]; vLuyen(); }
  else if (a === "nop") nopBai(false);
  else if (a === "on") batDauOn(el.dataset.id, []);
  else if (a === "on-het") {
    var r = timLam(LD.kq), dd = timDe(r.de), ds = dd.cau.filter(function (qid, i) { var c = timCau(qid); return c && r.tra_loi[i] !== c.d && r.lai[qid] === undefined; });
    if (ds.length) batDauOn(ds[0], ds.slice(1));
  }
  else if (a === "on-tiep") {
    var O = LD.on, n = O.L.bac_thang.length;
    O.chosen = null; O.saiBac = [];
    if (O.fstep < n + 1) O.fstep++;
    else { O.fstep = n + 2; O.perm = tron(timCau(O.qid).o.length); }
    vLuyen(); window.scrollTo(0, 0);
  }
  else if (a === "on-xong") { var hang = LD.on.hang; if (hang.length) batDauOn(hang[0], hang.slice(1)); else { LD.on = null; LD.man = "kq"; vLuyen(); } }
  else if (a === "on-thoat") { LD.on = null; LD.man = "kq"; vLuyen(); }
  else if (a === "mo-tao") { LD.tao = null; LD.man = "tao"; vLuyen(); }
  else if (a === "tao-chay") taoDeAI();
  else if (a === "mo-them") { LD.them = null; LD.man = "them"; vLuyen(); }
  else if (a === "them-tab") { docThem(); LD.them.tab = el.dataset.tab; vLuyen(); }
  else if (a === "them-ai") themBangAI();
  else if (a === "them-tach") {
    var M = docThem(), dsT = NHAP.tach(M.text), dsBai = baiCuaMon(M.ct);
    if (!dsT.length) { toast("Không nhận ra câu nào. Thử nút AI."); return; }
    M.ds = dsT.map(function (x) { return { q: x.q, o: x.o, d: x.d, bai: null, muc: null }; });
    xepBaiCho(M, function () { vLuyen(); toast("Tách được " + dsT.length + " câu và đã xếp bài. Kiểm lại rồi lưu."); });
  }
  else if (a === "them-luu") luuThem();
});
document.getElementById("main").addEventListener("change", function (ev) {
  var t = ev.target;
  if (!t.closest || !t.closest(".ldv")) return;
  if (t.dataset.ldChon === "ct") { LD.ct = t.value; vLuyen(); }
  else if (t.hasAttribute("data-ld-ten")) { try { localStorage.setItem("hb_ten", t.value.trim()); } catch (e) {} }
  else if (t.dataset.ldTao === "ct" || t.dataset.ldTao === "hk") { docTao(); vLuyen(); }
  else if (t.dataset.ldTao === "loai") { docTao(); LD.tao.n = SO_CAU_GOI_Y[LD.tao.loai] || 15; vLuyen(); }
  else if (t.dataset.ldThem === "ct") { docThem(); LD.them.ds = []; vLuyen(); }
  else if (t.hasAttribute("data-ld-file") && t.files[0]) napFileThem(t.files[0]);
});
document.getElementById("main").addEventListener("dragover", function (ev) { var z = ev.target.closest && ev.target.closest("#ld-drop"); if (z) { ev.preventDefault(); z.classList.add("over"); } });
document.getElementById("main").addEventListener("drop", function (ev) {
  if (!(ev.target.closest && ev.target.closest("#ld-drop"))) return;
  ev.preventDefault();
  if (ev.dataTransfer.files[0]) napFileThem(ev.dataTransfer.files[0]);
});
// Đang làm bài mà rời trang: nhắc trước khi đóng
window.addEventListener("beforeunload", function (ev) { if (LD.lam) { ev.preventDefault(); ev.returnValue = ""; } });
