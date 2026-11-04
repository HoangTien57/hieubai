// Vai trò: học sinh (mã học sinh) · giáo viên · Ban Khảo thí (admin, thấy tất cả). Mỗi vai một menu riêng.
// Bản dùng thử: phiên đăng nhập và PIN kiểm trên trình duyệt (chưa phải bảo mật thật). Nạp trước app.js.
var VAI = (function () {
  var KHOA = "hb_phien";
  function nd(ma) { return DB.d.nguoi_dung.filter(function (u) { return u.ma.toUpperCase() === String(ma || "").trim().toUpperCase(); })[0] || null; }
  function me() { var m = null; try { m = localStorage.getItem(KHOA); } catch (e) {} return m ? nd(m) : null; }
  // Đổi người dùng: xóa mọi trạng thái màn hình của người trước (bài đang làm, kết quả đang xem…)
  function dat(ma) {
    var cu = me();
    try { if (ma) localStorage.setItem(KHOA, ma); else localStorage.removeItem(KHOA); } catch (e) {}
    if (!cu || !ma || cu.ma !== String(ma).toUpperCase()) {
      clearInterval(LD.hen);
      LD.man = "ds"; LD.lam = null; LD.on = null; LD.kq = null; LD.de = null; LD.tao = null; LD.them = null; LD.ct = "";
      HS = null; GVUI.lop = null; GVUI.chonDe = null;
    }
  }
  var TEN_VAI = { hs: "Học sinh", gv: "Giáo viên", admin: "Ban Khảo thí" };

  // Trang theo vai: h = địa chỉ, ten = chữ trên menu (trống = trang ẩn), fn = hàm vẽ
  function trang() {
    var u = me();
    if (!u) return [];
    var kho = function (k) { return function () { datKho(k); vLuyen(); }; };
    if (u.vai === "hs") return [
      { h: "chung", ten: "Kho đề chung", fn: kho("chung") }, { h: "rieng", ten: "Đề của em", fn: kho("rieng") },
      { h: "duocgiao", ten: "Đề được giao", fn: kho("duocgiao") }, { h: "hs", ten: "Kiểm tra trên lớp", fn: vHs },
      { h: "cuaem", ten: "Kết quả của em", fn: vCuaEm }];
    var chung = [
      { h: "lop", ten: "Tình hình lớp", fn: vLop }, { h: "giaode", ten: "Giao đề", fn: vGiaoDe }, { h: "kho", ten: "Kho bài học", fn: vKho },
      { h: "buoi", ten: "Buổi kiểm tra", fn: vBuoi }, { h: "ketqua", ten: "Kết quả buổi", fn: vKetQua }, { h: "taode", ten: "", fn: kho("gvtao") }];
    if (u.vai === "gv") return chung;
    return [{ h: "tongquan", ten: "Tổng quan", fn: vTongQuan }, { h: "qlde", ten: "Kho đề chung", fn: kho("qlde") }]
      .concat(chung, [{ h: "nguoi", ten: "Người dùng", fn: vNguoi }, { h: "caidat", ten: "Cài đặt AI", fn: vCaiDat }, { h: "dulieu", ten: "", fn: vDuLieu }]);
  }
  function coLop(lop) { var u = me(); return !!u && (u.vai === "admin" || (u.vai === "gv" && (u.lops || []).indexOf(lop) >= 0) || (u.vai === "hs" && u.lop === lop)); }
  function lopCuaToi() { var u = me(); if (!u) return []; return u.vai === "admin" ? DB.d.lop.map(function (l) { return l.id; }) : u.vai === "gv" ? (u.lops || []) : [u.lop]; }

  function veNav(h) {
    var u = me();
    document.getElementById("nav").innerHTML = trang().filter(function (t) { return t.ten; }).map(function (t) {
      return '<a href="#' + t.h + '" aria-current="' + (t.h === h ? "page" : "false") + '">' + t.ten + '</a>';
    }).join("");
    document.getElementById("toi").innerHTML = '<span class="toi-ten"><b>' + esc(u.ten) + '</b><span>' + TEN_VAI[u.vai] + (u.lop ? ' · ' + esc(u.lop) : u.lops ? ' · ' + esc(u.lops.join(", ")) : '') + '</span></span><button class="btn ghost sm" data-thoat>Đăng xuất</button>';
  }

  // ---------- Màn chào / đăng nhập ----------
  function veVao(goiY) {
    document.getElementById("nav").innerHTML = "";
    document.getElementById("toi").innerHTML = "";
    var gv = goiY === "vao-gv";
    document.getElementById("main").innerHTML = '<div class="vao"><h1 class="vao-chao">Chào mừng đến với <span>Hiểu bài</span></h1><p class="muted">Luyện đề, hiểu sai ở đâu, ôn đúng chỗ đó.</p><div class="vao-the">' +
      '<form class="vao-o' + (gv ? '' : ' chinh') + '" data-vao="hs"><span class="vao-icon">🎒</span><h2>Em là học sinh</h2><label class="f">Mã học sinh<input name="ma" autocomplete="username" placeholder="Ví dụ: HS1001"' + (gv ? '' : ' autofocus') + '></label><button class="btn">Vào học</button><p class="err-t small" data-loi></p></form>' +
      '<form class="vao-o' + (gv ? ' chinh' : '') + '" data-vao="gv"><span class="vao-icon">🧑‍🏫</span><h2>Thầy cô · Ban Khảo thí</h2><label class="f">Mã<input name="ma" autocomplete="username" placeholder="Ví dụ: GV01"' + (gv ? ' autofocus' : '') + '></label><label class="f">Mã PIN<input name="pin" type="password" inputmode="numeric" autocomplete="current-password"></label><button class="btn">Vào</button><p class="err-t small" data-loi></p></form>' +
      '</div></div>';
  }
  document.addEventListener("submit", function (ev) {
    var f = ev.target.closest("[data-vao]");
    if (!f) return;
    ev.preventDefault();
    var u = nd(f.ma.value), loi = f.querySelector("[data-loi]");
    if (f.dataset.vao === "hs") {
      if (!u || u.vai !== "hs") { loi.textContent = "Không tìm thấy mã học sinh này."; return; }
    } else if (!u || u.vai === "hs" || String(u.pin) !== f.pin.value.trim()) { loi.textContent = "Mã hoặc PIN chưa đúng."; return; }
    dat(u.ma); location.hash = "#" + trang()[0].h; route();
  });
  document.addEventListener("click", function (ev) {
    if (ev.target.closest && ev.target.closest("[data-thoat]")) { dat(null); LD.lam = null; LD.on = null; LD.man = "ds"; HS = null; location.hash = "#vao"; route(); }
  });

  return { me: me, nd: nd, dat: dat, trang: trang, veNav: veNav, veVao: veVao, coLop: coLop, lopCuaToi: lopCuaToi, TEN_VAI: TEN_VAI };
})();

// ---------- Học sinh: Kết quả của em ----------
function vCuaEm() {
  var u = VAI.me(), ds = DB.d.lam_de.filter(function (r) { return r.ma === u.ma; }).slice().reverse();
  var h = '<div class="head"><h1>Kết quả của em</h1></div>';
  if (!ds.length) { document.getElementById("main").innerHTML = h + '<p class="empty">Em chưa làm đề nào. Vào <a href="#chung">Kho đề chung</a> để bắt đầu luyện nhé.</p>'; return; }
  var tong = ds.map(function (r) { var d = timDe(r.de); return d ? diemLam(r, d).diem : null; }).filter(function (x) { return x !== null; });
  h += '<div class="tiles"><div class="tile"><span class="v">' + ds.length + '</span><span class="l">Lượt luyện đề</span></div><div class="tile"><span class="v">' + (tong.length ? (tong.reduce(function (a, b) { return a + b; }, 0) / tong.length).toFixed(1).replace(".", ",") : "–") + '</span><span class="l">Điểm trung bình</span></div>' +
    '<div class="tile"><span class="v">' + ds.reduce(function (s, r) { return s + Object.keys(r.lai || {}).length; }, 0) + '</span><span class="l">Câu đã ôn lại</span></div></div>';
  h += '<div class="grid-wrap"><table class="list"><thead><tr><th>Đề</th><th>Ngày</th><th>Điểm</th><th>Đã ôn</th><th></th></tr></thead><tbody>' + ds.map(function (r) {
    var d = timDe(r.de); if (!d) return "";
    var k = diemLam(r, d);
    return '<tr><td>' + esc(d.ten) + '</td><td>' + ngay(r.nop_luc) + '</td><td><b>' + k.dung + '/' + k.n + '</b> · ' + String(k.diem).replace(".", ",") + '</td><td>' + Object.keys(r.lai || {}).length + ' câu</td><td><button class="link" data-xem-lam="' + r.id + '">Xem lại</button></td></tr>';
  }).join("") + '</tbody></table></div>';
  document.getElementById("main").innerHTML = h;
}

// ---------- Giáo viên / Ban Khảo thí: Tình hình lớp ----------
var GVUI = { lop: null, chonDe: null };
function vLop() {
  var lops = VAI.lopCuaToi();
  if (!GVUI.lop || lops.indexOf(GVUI.lop) < 0) GVUI.lop = lops[0];
  var lop = GVUI.lop, hs = DB.d.nguoi_dung.filter(function (u) { return u.vai === "hs" && u.lop === lop; }), maHs = {};
  hs.forEach(function (u) { maHs[u.ma] = u; });
  var lan = DB.d.lam_de.filter(function (r) { return maHs[r.ma]; }), giao = DB.d.giao.filter(function (g) { return g.lop === lop; });
  var h = '<div class="head"><div class="head-row"><h1>Tình hình lớp</h1><select data-chon-lop aria-label="Lớp">' + lops.map(function (l) { return '<option' + (l === lop ? " selected" : "") + '>' + esc(l) + '</option>'; }).join("") + '</select></div></div>';
  var diem = lan.map(function (r) { var d = timDe(r.de); return d ? diemLam(r, d).diem : null; }).filter(function (x) { return x !== null; });
  h += '<div class="tiles"><div class="tile"><span class="v">' + hs.length + '</span><span class="l">Học sinh</span></div><div class="tile"><span class="v">' + lan.length + '</span><span class="l">Lượt luyện đề</span></div>' +
    '<div class="tile"><span class="v">' + (diem.length ? (diem.reduce(function (a, b) { return a + b; }, 0) / diem.length).toFixed(1).replace(".", ",") : "–") + '</span><span class="l">Điểm trung bình</span></div></div>';
  // Lỗi tư duy phổ biến của lớp, từ các câu làm sai trong mọi lượt luyện
  var dem = {};
  lan.forEach(function (r) { var d = timDe(r.de); if (!d) return; d.cau.forEach(function (qid, i) { var c = timCau(qid), a = r.tra_loi[i]; if (!c || a === null || a === c.d) return; var id = c.loi && c.loi[a]; if (!id) return; (dem[id] = dem[id] || {})[r.ma] = 1; }); });
  var top = Object.keys(dem).map(function (id) { return { L: timLoi(id), n: Object.keys(dem[id]).length }; }).filter(function (x) { return x.L; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 8);
  h += '<div class="card"><h2>Lớp hay hiểu sai ở đâu</h2>' + (top.length ? '<div class="misc">' + top.map(function (x) {
    var b = timBai(x.L.bai);
    return '<div class="misc-item"><div class="top"><b>' + esc(x.L.ten) + '</b><span class="small muted">' + x.n + ' em</span></div><span class="small muted">' + esc(b ? tenDayDu(b) : "") + '</span></div>';
  }).join("") + '</div>' : '<p class="small muted">Chưa có dữ liệu: học sinh làm sai câu nào thì lỗi đó hiện ở đây.</p>') + '</div>';
  h += '<div class="card"><h2>Đề đã giao</h2>' + (giao.length ? '<div class="grid-wrap"><table class="list"><thead><tr><th>Đề</th><th>Hạn</th><th>Đã làm</th><th>Điểm TB</th></tr></thead><tbody>' + giao.map(function (g) {
    var d = timDe(g.de), xong = {}, ds = [];
    lan.forEach(function (r) { if (r.de === g.de && r.nop_luc >= g.tao_luc && !xong[r.ma]) { xong[r.ma] = 1; if (d) ds.push(diemLam(r, d).diem); } });
    return '<tr><td>' + esc(d ? d.ten : g.de) + '</td><td>' + (g.han ? new Date(g.han).toLocaleDateString("vi-VN") : "—") + '</td><td>' + Object.keys(xong).length + '/' + hs.length + '</td><td>' + (ds.length ? (ds.reduce(function (a, b) { return a + b; }, 0) / ds.length).toFixed(1).replace(".", ",") : "–") + '</td></tr>';
  }).join("") + '</tbody></table></div>' : '<p class="small muted">Chưa giao đề nào. <a href="#giaode">Giao đề</a></p>') + '</div>';
  h += '<div class="card"><h2>Từng học sinh</h2><div class="grid-wrap"><table class="list"><thead><tr><th>Mã</th><th>Họ tên</th><th>Lượt luyện</th><th>Điểm TB</th><th>Đề tự tạo</th><th>Đề được giao</th><th>Gần nhất</th></tr></thead><tbody>' + hs.map(function (u) {
    var cua = lan.filter(function (r) { return r.ma === u.ma; }), dd = cua.map(function (r) { var d = timDe(r.de); return d ? diemLam(r, d).diem : null; }).filter(function (x) { return x !== null; });
    var rieng = DB.d.de.filter(function (d) { return d.pham_vi === "rieng" && d.chu === u.ma; }).length;
    var giaoXong = giao.filter(function (g) { return cua.some(function (r) { return r.de === g.de && r.nop_luc >= g.tao_luc; }); }).length;
    var cuoi = cua[cua.length - 1];
    return '<tr><td>' + esc(u.ma) + '</td><td>' + esc(u.ten) + '</td><td>' + cua.length + '</td><td>' + (dd.length ? (dd.reduce(function (a, b) { return a + b; }, 0) / dd.length).toFixed(1).replace(".", ",") : "–") + '</td><td>' + rieng + '</td><td>' + giaoXong + '/' + giao.length + '</td><td>' + (cuoi ? ngay(cuoi.nop_luc) : "—") + '</td></tr>';
  }).join("") + '</tbody></table></div><p class="small muted">Nội dung đề học sinh tự tạo là riêng tư; thầy cô chỉ thấy số đề và điểm.</p></div>';
  var phien = DB.d.phien.filter(function (p) { return p.lop === lop; });
  if (phien.length) h += '<div class="card"><h2>Kiểm tra trên lớp</h2><ul class="plain small">' + phien.map(function (p) { var b = timBai(p.bai); return '<li><a href="#ketqua?p=' + p.id + '">' + esc(p.ma + " · " + (b ? tenDayDu(b) : p.bai)) + '</a> · ' + soNop(p.id) + ' bài nộp</li>'; }).join("") + '</ul></div>';
  document.getElementById("main").innerHTML = h;
}

// ---------- Giao đề ----------
function deGiaoDuoc() {
  var u = VAI.me();
  return DB.d.de.filter(function (d) { var pv = phamViDe(d); return (pv === "chung" && trangThaiDe(d) === "da_dang") || (pv === "gv" && (u.vai === "admin" || d.chu === u.ma)); });
}
function vGiaoDe() {
  var u = VAI.me(), lops = VAI.lopCuaToi(), ds = deGiaoDuoc();
  var h = '<div class="head"><h1>Giao đề</h1></div><div class="card ld-form"><h2>Giao đề cho lớp</h2>' +
    '<div class="row"><label class="f">Lớp<select data-g="lop">' + lops.map(function (l) { return '<option>' + esc(l) + '</option>'; }).join("") + '</select></label>' +
    '<label class="f">Hạn làm (không bắt buộc)<input type="date" data-g="han"></label></div>' +
    '<label class="f">Đề<select data-g="de">' + ds.map(function (d) { var ct = timCT(d.ct); return '<option value="' + d.id + '"' + (d.id === GVUI.chonDe ? " selected" : "") + '>' + esc((ct ? ct.mon + " " + ct.lop + " · " : "") + d.ten + " · " + d.cau.length + " câu" + (phamViDe(d) === "gv" ? " · đề của thầy cô" : "")) + '</option>'; }).join("") + '</select></label>' +
    '<div class="row-btn"><button class="btn" data-g-giao' + (ds.length ? "" : " disabled") + '>Giao đề</button><button class="btn ghost" data-g-tao="tao"><span class="ai-dot"></span>AI tạo đề mới</button><button class="btn ghost" data-g-tao="them">+ Thêm đề từ văn bản, file</button></div></div>';
  var giao = DB.d.giao.filter(function (g) { return VAI.coLop(g.lop); }).slice().reverse();
  h += '<div class="card"><h2>Đã giao</h2>' + (giao.length ? '<div class="grid-wrap"><table class="list"><thead><tr><th>Lớp</th><th>Đề</th><th>Hạn</th><th>Đã làm</th><th></th></tr></thead><tbody>' + giao.map(function (g) {
    var d = timDe(g.de), hs = DB.d.nguoi_dung.filter(function (x) { return x.vai === "hs" && x.lop === g.lop; }), xong = hs.filter(function (x) { return DB.d.lam_de.some(function (r) { return r.ma === x.ma && r.de === g.de && r.nop_luc >= g.tao_luc; }); }).length;
    return '<tr><td>' + esc(g.lop) + '</td><td>' + esc(d ? d.ten : g.de) + '</td><td>' + (g.han ? new Date(g.han).toLocaleDateString("vi-VN") : "—") + '</td><td>' + xong + '/' + hs.length + '</td><td><button class="link danger" data-g-xoa="' + g.id + '">Bỏ giao</button></td></tr>';
  }).join("") + '</tbody></table></div>' : '<p class="small muted">Chưa giao đề nào.</p>') + '</div>';
  document.getElementById("main").innerHTML = h;
}

// ---------- Ban Khảo thí: Tổng quan, Người dùng ----------
function vTongQuan() {
  var hs = DB.d.nguoi_dung.filter(function (u) { return u.vai === "hs"; }), chung = DB.d.de.filter(function (d) { return phamViDe(d) === "chung"; }), nhap = chung.filter(function (d) { return trangThaiDe(d) !== "da_dang"; });
  var h = '<div class="head"><h1>Tổng quan</h1></div><div class="tiles">' +
    '<div class="tile"><span class="v">' + hs.length + '</span><span class="l">Học sinh · ' + DB.d.lop.length + ' lớp · ' + DB.d.nguoi_dung.filter(function (u) { return u.vai === "gv"; }).length + ' giáo viên</span></div>' +
    '<div class="tile"><span class="v">' + (chung.length - nhap.length) + '</span><span class="l">Đề chung đã đăng' + (nhap.length ? ' · <a href="#qlde">' + nhap.length + ' đề chờ duyệt</a>' : '') + '</span></div>' +
    '<div class="tile"><span class="v">' + DB.d.lam_de.length + '</span><span class="l">Lượt luyện đề · ' + DB.d.de.filter(function (d) { return phamViDe(d) === "rieng"; }).length + ' đề học sinh tự tạo</span></div></div>';
  var gan = DB.d.lam_de.slice(-10).reverse();
  h += '<div class="card"><h2>Hoạt động gần đây</h2>' + (gan.length ? '<div class="grid-wrap"><table class="list"><thead><tr><th>Học sinh</th><th>Lớp</th><th>Đề</th><th>Điểm</th><th>Lúc</th></tr></thead><tbody>' + gan.map(function (r) {
    var u = VAI.nd(r.ma), d = timDe(r.de), k = d ? diemLam(r, d) : null;
    return '<tr><td>' + esc(u ? u.ten : (r.ma || "—")) + '</td><td>' + esc(u && u.lop || "—") + '</td><td>' + esc(d ? (phamViDe(d) === "rieng" ? "Đề riêng của học sinh" : d.ten) : r.de) + '</td><td>' + (k ? k.dung + '/' + k.n : "—") + '</td><td>' + ngay(r.nop_luc) + '</td></tr>';
  }).join("") + '</tbody></table></div>' : '<p class="small muted">Chưa có hoạt động.</p>') + '</div>';
  document.getElementById("main").innerHTML = h;
}
function vNguoi() {
  var nhom = { admin: [], gv: [], hs: [] };
  DB.d.nguoi_dung.forEach(function (u) { (nhom[u.vai] || nhom.hs).push(u); });
  var h = '<div class="head"><h1>Người dùng</h1><p class="small muted">Bản dùng thử: mã PIN hiện ở đây để tiện thử. Khi dùng thật sẽ chuyển sang tài khoản của trường.</p></div>';
  h += '<div class="card ld-form"><h2>Thêm người dùng</h2><div class="row"><label class="f">Vai trò<select data-u="vai"><option value="hs">Học sinh</option><option value="gv">Giáo viên</option></select></label>' +
    '<label class="f">Mã<input data-u="ma" placeholder="HS1004 / GV03"></label><label class="f">Họ tên<input data-u="ten"></label></div>' +
    '<div class="row"><label class="f">Lớp (giáo viên: nhiều lớp cách nhau dấu phẩy)<input data-u="lop" placeholder="10A1"></label><label class="f">Số thứ tự (học sinh)<input type="number" data-u="stt" min="1"></label><label class="f">PIN (giáo viên)<input data-u="pin" inputmode="numeric"></label></div>' +
    '<div class="row-btn"><button class="btn" data-u-them>Thêm</button></div><p class="err-t small" data-u-loi></p></div>';
  [["admin", "Ban Khảo thí"], ["gv", "Giáo viên"], ["hs", "Học sinh"]].forEach(function (x) {
    h += '<div class="card"><h2>' + x[1] + ' (' + nhom[x[0]].length + ')</h2><div class="grid-wrap"><table class="list"><thead><tr><th>Mã</th><th>Họ tên</th><th>Lớp</th>' + (x[0] === "hs" ? '<th>STT</th>' : '<th>PIN</th>') + '<th></th></tr></thead><tbody>' +
      nhom[x[0]].map(function (u) { return '<tr><td><b>' + esc(u.ma) + '</b></td><td>' + esc(u.ten) + '</td><td>' + esc(u.lop || (u.lops || []).join(", ") || "—") + '</td><td>' + esc(x[0] === "hs" ? u.stt : u.pin) + '</td><td>' + (u.vai === "admin" ? "" : '<button class="link danger" data-u-xoa="' + esc(u.ma) + '">Xóa</button>') + '</td></tr>'; }).join("") + '</tbody></table></div></div>';
  });
  document.getElementById("main").innerHTML = h;
}

// ---------- Ban Khảo thí: Cài đặt AI (bản web dùng Gemini; chạy trên máy qua cầu nối thì dùng Claude) ----------
function vCaiDat() {
  var m = document.getElementById("main");
  m.innerHTML = '<div class="head"><h1>Cài đặt AI</h1></div><p class="muted">Đang kiểm tra…</p>';
  if (location.protocol.indexOf("http") !== 0) { m.innerHTML = '<div class="head"><h1>Cài đặt AI</h1></div><p class="empty">Mở app qua Mo_app.bat hoặc bản web để cài đặt AI.</p>'; return; }
  fetch("/api/cau-hinh").then(function (r) { return r.json(); }).then(function (c) {
    var h = '<div class="head"><h1>Cài đặt AI</h1></div>';
    if (c.nguon === "claude") {
      h += '<div class="card ld-form"><h2>Đang dùng Claude trên máy này</h2><p>App đang chạy qua cầu nối trên máy, các nút AI dùng Claude Code đã cài sẵn' + (c.co_khoa ? '' : ' (chưa tìm thấy Claude Code)') + '. Khóa Gemini chỉ cần cho bản đưa lên web (Vercel).</p></div>';
      m.innerHTML = h; return;
    }
    h += '<div class="card ld-form"><h2>Gemini</h2><p>Trạng thái: ' + (c.co_khoa ? '<span class="pill d">Đã có khóa</span>' + (c.tu_bien ? ' (lấy từ biến môi trường trên Vercel)' : '') : '<span class="pill x">Chưa có khóa</span> — các nút AI chưa dùng được') + ' · Mô hình: <b>' + esc(c.model || "") + '</b></p>' +
      (c.luu_duoc ? '' : '<p class="warnline">Máy chủ chưa thấy kho Vercel Blob nên chưa lưu được khóa và dữ liệu. Kiểm tra: Storage → kho Blob → Projects đã nối dự án này, môi trường Production được tích, rồi Redeploy. Biến tìm thấy: ' + esc((c.bien_blob || []).join(", ") || "không có") + '</p>') +
      '<label class="f">Khóa API Gemini<input type="password" data-cd="khoa" autocomplete="off" placeholder="' + (c.co_khoa ? "Để trống nếu giữ khóa cũ" : "Dán khóa bắt đầu bằng AIza…") + '"></label>' +
      '<label class="f">Mô hình<input data-cd="model" value="' + esc(c.model || "gemini-2.5-flash") + '"></label>' +
      '<label class="f">Nhập lại PIN của Ban Khảo thí<input type="password" inputmode="numeric" data-cd="pin" autocomplete="off"></label>' +
      '<div class="row-btn"><button class="btn" data-cd-luu>Lưu</button><button class="btn ghost" data-cd-thu>Thử gọi AI</button>' + (c.co_khoa && !c.tu_bien ? '<button class="link danger" data-cd-xoa>Xóa khóa</button>' : '') + '</div><p class="small" data-cd-kq></p>' +
      '<p class="small muted">Khóa chỉ lưu ở máy chủ, không gửi về máy học sinh. Lấy khóa miễn phí ở aistudio.google.com → Get API key. Gói miễn phí có giới hạn số lượt mỗi phút, mỗi ngày.</p></div>';
    m.innerHTML = h;
  }).catch(function (e) { m.innerHTML = '<div class="head"><h1>Cài đặt AI</h1></div><p class="empty">Không đọc được cài đặt: ' + esc(e.message) + '</p>'; });
}
function guiCaiDat(them) {
  var q = function (k) { return document.querySelector('[data-cd="' + k + '"]'); }, kq = document.querySelector("[data-cd-kq]");
  var body = Object.assign({ ma: VAI.me().ma, pin: q("pin").value, khoa: q("khoa").value, model: q("model").value }, them);
  kq.textContent = them.thu ? "Đang gọi thử…" : "Đang lưu…";
  fetch("/api/cau-hinh", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    .then(function (r) { return r.json(); })
    .then(function (j) {
      if (j.loi) { kq.innerHTML = '<span class="err-t">' + esc(j.loi) + '</span>'; return; }
      if (them.thu) { kq.innerHTML = '<span class="ok-t">Gọi được AI (' + esc(j.model) + ').</span>'; return; }
      toast("Đã lưu cài đặt AI. Đang tải lại trang…"); setTimeout(function () { location.reload(); }, 900);
    }).catch(function (e) { kq.innerHTML = '<span class="err-t">' + esc(e.message) + '</span>'; });
}

// ---------- Sự kiện của các màn vai trò ----------
document.addEventListener("click", function (ev) {
  var t = ev.target.closest ? ev.target : null;
  if (!t) return;
  var el;
  if ((el = t.closest("[data-xem-lam]"))) {
    var r = timLam(el.dataset.xemLam), d = r && timDe(r.de);
    if (!d) return;
    LD.kq = r.id; LD.man = "kq"; LD.lam = null;
    var pv = phamViDe(d);
    location.hash = pv === "rieng" ? "#rieng" : DB.d.giao.some(function (g) { return g.de === d.id; }) ? "#duocgiao" : "#chung";
  } else if ((el = t.closest("[data-g-giao]"))) {
    var q = function (k) { return document.querySelector('[data-g="' + k + '"]'); };
    var g = { id: "G" + Date.now().toString(36), de: q("de").value, lop: q("lop").value, han: q("han").value || "", gv: VAI.me().ma, tao_luc: new Date().toISOString() };
    if (!g.de) return;
    DB.d.giao.push(g); DB.luu(); GVUI.chonDe = null; vGiaoDe(); toast("Đã giao đề cho lớp " + g.lop + ".");
  } else if ((el = t.closest("[data-g-xoa]"))) {
    if (!confirm("Bỏ giao đề này? Bài học sinh đã làm vẫn giữ.")) return;
    DB.d.giao = DB.d.giao.filter(function (g) { return g.id !== el.dataset.gXoa; }); DB.luu(); vGiaoDe();
  } else if ((el = t.closest("[data-g-tao]"))) {
    LD.kho = "gvtao"; LD.man = el.dataset.gTao; LD.tao = null; LD.them = null; location.hash = "#taode";
  } else if ((el = t.closest("[data-u-them]"))) {
    var v = function (k) { return document.querySelector('[data-u="' + k + '"]').value.trim(); }, loi = document.querySelector("[data-u-loi]");
    var u = { ma: v("ma").toUpperCase(), ten: v("ten"), vai: v("vai") };
    if (!u.ma || !u.ten) { loi.textContent = "Nhập mã và họ tên."; return; }
    if (VAI.nd(u.ma)) { loi.textContent = "Mã này đã có."; return; }
    var lops = v("lop").split(",").map(function (s) { return s.trim().toUpperCase(); }).filter(Boolean);
    if (!lops.length) { loi.textContent = "Nhập lớp."; return; }
    if (u.vai === "hs") { u.lop = lops[0]; u.stt = parseInt(v("stt"), 10) || null; } else { u.lops = lops; u.pin = v("pin") || "0000"; }
    lops.forEach(function (l) { if (!DB.d.lop.some(function (x) { return x.id === l; })) DB.d.lop.push({ id: l, si_so: 40 }); });
    DB.d.nguoi_dung.push(u); DB.luu(); vNguoi(); toast("Đã thêm " + u.ten + ".");
  } else if (t.closest("[data-cd-luu]")) guiCaiDat({});
  else if (t.closest("[data-cd-thu]")) guiCaiDat({ thu: true });
  else if (t.closest("[data-cd-xoa]")) { if (confirm("Xóa khóa Gemini? Các nút AI sẽ ngừng hoạt động.")) guiCaiDat({ xoa_khoa: true }); }
  else if ((el = t.closest("[data-u-xoa]"))) {
    if (!confirm("Xóa người dùng " + el.dataset.uXoa + "? Bài đã làm vẫn giữ.")) return;
    DB.d.nguoi_dung = DB.d.nguoi_dung.filter(function (u) { return u.ma !== el.dataset.uXoa; }); DB.luu(); vNguoi();
  }
});
document.addEventListener("change", function (ev) {
  if (ev.target.hasAttribute && ev.target.hasAttribute("data-chon-lop")) { GVUI.lop = ev.target.value; vLop(); }
});
