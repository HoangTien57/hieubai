// Giao diện: 5 màn theo địa chỉ #kho, #buoi, #hs, #ketqua, #dulieu. Bấm nút dùng một bộ bắt sự kiện chung trên #main
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
function pct(n, d) { return d ? Math.round(n / d * 100) : 0; }
function ngay(iso) { if (!iso) return ""; var t = new Date(iso); return isNaN(t) ? iso : t.toLocaleDateString("vi-VN") + " " + t.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }); }
function thamSo() { var o = {}; (location.hash.split("?")[1] || "").split("&").forEach(function (p) { var kv = p.split("="); if (kv[0]) o[kv[0]] = decodeURIComponent(kv[1] || ""); }); return o; }

var main = $("#main");
function nhapMoi() { return { tab: "dan", text: "", ds: [], boQua: [], trangThai: "" }; }
var UI = { bai: null, form: null, phienKQ: null, nhap: nhapMoi() };
var TEN_TT = { trong: "Chưa có câu", thieu: "Thiếu bản đồ lỗi", cho: "Chờ duyệt", san: "Sẵn sàng" };
var TEN_NGUON = { ngan_hang: "Ngân hàng", ai: "AI soạn", gv: "GV nhập", nhap: "Nhập từ đề", mau: "Mẫu" };

// ---------- Truy vấn dữ liệu ----------
// Danh sách bài của mọi môn, lập lại mỗi khi dữ liệu được lưu (khóa theo mốc lưu + số môn + số bài ngoài)
var _bai = { khoa: "", ds: [], theoId: {} };
function timCT(id) { return DB.d.chuong_trinh.filter(function (c) { return c.id === id; })[0] || null; }
function tenBai(b) { return (b.so !== null && b.so !== undefined ? "Bài " + b.so + ". " : "") + b.ten; }
function tatCaBai() {
  var khoa = DB.d.meta.luu_luc + "|" + DB.d.chuong_trinh.length + "|" + DB.d.bai_ngoai.length;
  if (_bai.khoa === khoa) return _bai.ds;
  var out = [], theoId = {};
  DB.d.chuong_trinh.forEach(function (ct) {
    ct.chuong.forEach(function (c) { c.bai.forEach(function (b) { out.push({ id: b.id, ten: tenBai(b), chuong: c.ten, yccd: b.yccd || [], ngoai: false, ct: ct, goc: b }); }); });
  });
  DB.d.bai_ngoai.forEach(function (b) {
    var ct = timCT(b.ct) || timCT("SH10") || DB.d.chuong_trinh[0];
    out.push({ id: b.id, ten: b.ten, chuong: "Ngoài chương trình", yccd: b.yccd || [], noi_dung: b.noi_dung || "", ngoai: true, ct: ct, goc: b });
  });
  out.forEach(function (b) { theoId[b.id] = b; });
  _bai = { khoa: khoa, ds: out, theoId: theoId };
  return out;
}
function timBai(id) { tatCaBai(); return _bai.theoId[id] || null; }
function baiCuaMon(ctId) { return tatCaBai().filter(function (b) { return b.ct && b.ct.id === ctId; }); }
function tenDayDu(b) { return b ? b.ct.mon + " " + b.ct.lop + " · " + b.ten : ""; }
function soCauMon(ctId) { var ids = {}; baiCuaMon(ctId).forEach(function (b) { ids[b.id] = 1; }); return DB.d.ngan_hang.filter(function (c) { return ids[c.bai]; }).length; }
function lamMoiBai() { _bai.khoa = ""; }
function cauCuaBai(id) { return DB.d.ngan_hang.filter(function (c) { return c.bai === id; }); }
function timCau(id) { return DB.d.ngan_hang.filter(function (c) { return c.id === id; })[0] || null; }
function timLoi(id) { return DB.d.loi_tu_duy.filter(function (l) { return l.id === id; })[0] || null; }
function timLop(id) { return DB.d.lop.filter(function (l) { return l.id === id; })[0] || null; }
function timPhien(id) { return DB.d.phien.filter(function (p) { return p.id === id; })[0] || null; }
function timTN(id) { return DB.d.thuat_ngu.filter(function (t) { return t.id === id; })[0] || null; }
// Câu dùng được khi mọi phương án sai đều dẫn tới một lỗi tư duy có lộ trình gỡ
function coBanDo(c) {
  for (var k = 0; k < c.o.length; k++) {
    if (k === c.d) continue;
    var L = c.loi && c.loi[k] ? timLoi(c.loi[k]) : null;
    if (!L || !L.bac_thang || !L.bac_thang.length) return false;
  }
  return true;
}
// Phần học lại: thuật ngữ → hiện tượng → hình → ví dụ. Dùng chung cho màn học sinh và phần giáo viên xem trước
function veBaiGiang(L, choSua) {
  var bg = L.bai_giang || {}, h = '<div class="bg"><p class="bg-h">Hiểu các từ trước đã</p><div class="terms">';
  h += (bg.thuat_ngu || []).map(timTN).filter(Boolean).map(function (t) {
    return '<div class="term"><b>' + esc(t.ten) + '</b><p>' + esc(t.dinh_nghia) + '</p>' +
      (t.vi_du ? '<p class="small"><span class="lab2">Ví dụ:</span> ' + esc(t.vi_du) + '</p>' : '') +
      (t.hinh && t.hinh !== bg.hinh ? HINH.ve(t.hinh) : '') + '</div>';
  }).join("") + '</div>';
  h += '<p class="bg-h">Chuyện gì xảy ra?</p><p>' + esc(bg.hien_tuong || "") + '</p>';
  // Thứ tự hình: ảnh giáo viên tải lên → hình vẽ sẵn → hình AI vẽ → chỉ có mô tả (kèm nút nhờ AI vẽ)
  if (bg.anh && /^data:image\/(png|jpeg|webp|gif);base64,/.test(bg.anh)) h += '<div class="hinh"><img src="' + bg.anh + '" alt="' + esc(bg.mo_ta_hinh || "Hình minh họa") + '"></div>';
  else if (bg.hinh && HINH.co(bg.hinh)) h += HINH.ve(bg.hinh);
  else if (bg.svg && HINH.veSvg(bg.svg)) h += HINH.veSvg(bg.svg);
  else if (bg.mo_ta_hinh) h += '<div class="hinh-cho"><p class="small">Hình gợi ý: ' + esc(bg.mo_ta_hinh) + '</p><button class="btn ghost sm" data-ve-hinh="' + esc(L.id) + '"><span class="ai-dot"></span>AI vẽ hình này</button></div>';
  if (choSua && (bg.mo_ta_hinh || bg.svg || bg.anh)) h += '<label class="link small tai-hinh">' + (bg.anh ? "Đổi hình đã tải lên" : "Tải hình chính thống lên thay (PNG, JPG ≤ 400 KB)") + '<input type="file" accept="image/png,image/jpeg,image/webp" data-tai-hinh="' + esc(L.id) + '" hidden></label>';
  if (bg.vi_du) h += '<div class="vidu"><span class="lab">Ví dụ đời thường</span><span>' + esc(bg.vi_du) + '</span></div>';
  return h + '</div>';
}
function trangThaiBai(id) {
  var ds = cauCuaBai(id);
  if (!ds.length) return "trong";
  if (ds.some(function (c) { return !coBanDo(c); })) return "thieu";
  if (ds.some(function (c) { return c.trang_thai !== "da_duyet"; })) return "cho";
  return "san";
}
function cauDungDuoc(id) { return cauCuaBai(id).filter(function (c) { return coBanDo(c) && c.trang_thai === "da_duyet"; }); }

// ---------- Khung chung ----------
function toast(msg) {
  var t = $("#toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(function () { t.hidden = true; }, 2600);
}
window.capNhatBanner = function () {
  var cn = $("#cn"), c = DB.cauNoi();
  if (c) { cn.className = "cn on"; cn.textContent = c.ai ? "● Cầu nối: AI + ghi file" : "● Cầu nối: ghi file (không thấy Claude)"; cn.title = "Đang chạy qua cau_noi.py"; }
  else { cn.className = "cn"; cn.textContent = "○ Chưa chạy cầu nối"; cn.title = "Bấm đúp Mo_app.bat để nút AI gọi thẳng Claude trên máy và lưu thẳng ra thư mục db"; }
  var b = $("#banner");
  if (DB.xungDot()) { b.innerHTML = '<b>Máy khác vừa lưu thay đổi.</b> Thay đổi vừa rồi của bạn chưa được ghi. <a href="javascript:location.reload()">Tải lại trang</a> để lấy dữ liệu mới rồi làm lại.'; b.hidden = false; return; }
  if (DB.loiGhi()) { b.innerHTML = 'Chưa lưu được thay đổi vừa rồi. <a href="javascript:location.reload()">Tải lại trang</a> rồi thử lại.'; b.hidden = false; return; }
  if (DB.chuaGhi()) { b.innerHTML = 'Thay đổi đang lưu trên trình duyệt, chưa ghi ra thư mục <b>db</b>. <a href="#dulieu">Ghi ra file</a>'; b.hidden = false; return; }
  b.hidden = true;
};
// Chưa đăng nhập → màn chào; đã đăng nhập → chỉ các trang của vai trò đó (địa chỉ lạ thì về trang đầu của vai)
function route() {
  var h = (location.hash || "").slice(1).split("?")[0];
  if (!VAI.me()) { VAI.veVao(h); window.capNhatBanner(); return; }
  var ds = VAI.trang(), t = ds.filter(function (x) { return x.h === h; })[0];
  if (!t) { t = ds[0]; if (location.hash !== "#" + t.h) { location.hash = "#" + t.h; return; } }
  VAI.veNav(t.h);
  t.fn();
  window.capNhatBanner();
}
window.addEventListener("hashchange", route);

// ---------- Màn 1: Kho bài học ----------
function nutBai(id, ten) {
  var st = trangThaiBai(id);
  return '<button class="tree-b' + (UI.bai === id ? " on" : "") + '" data-bai="' + id + '" title="' + TEN_TT[st] + '"><span class="st ' + st + '"></span><span>' + esc(ten) + '</span></button>';
}
function chonMonMacDinh() {
  if (UI.ct && timCT(UI.ct)) return;
  var nho = null;
  try { nho = localStorage.getItem("hieubai_mon"); } catch (e) {}
  UI.ct = nho && timCT(nho) ? nho : timCT("SH10") ? "SH10" : (DB.d.chuong_trinh[0] || {}).id;
}
function vKho() {
  chonMonMacDinh();
  var ct = timCT(UI.ct);
  if (UI.form === "mon" || !ct) { main.innerHTML = '<div class="head"><h1>Kho bài học</h1></div>' + formMon(); return; }
  var dsBai = baiCuaMon(ct.id);
  if (!UI.bai || !timBai(UI.bai) || timBai(UI.bai).ct.id !== ct.id) {
    var coCau = dsBai.filter(function (b) { return cauCuaBai(b.id).length; })[0];
    UI.bai = (coCau || dsBai[0] || {}).id || null;
  }
  var chon = '<select id="ct-chon" aria-label="Môn – lớp">' + DB.d.chuong_trinh.map(function (c) {
    var n = soCauMon(c.id);
    return '<option value="' + c.id + '"' + (c.id === ct.id ? " selected" : "") + '>' + esc(c.mon + " " + c.lop) + (n ? " · " + n + " câu" : "") + '</option>';
  }).join("") + '</select>';
  var tree = '<div class="tree">';
  ct.chuong.forEach(function (c) {
    tree += '<div class="tree-c"><p class="tree-h">' + esc(c.ten) + '</p>' + c.bai.map(function (b) { return nutBai(b.id, tenBai(b)); }).join("") + '</div>';
  });
  var ngoai = DB.d.bai_ngoai.filter(function (b) { var x = timBai(b.id); return x && x.ct.id === ct.id; });
  tree += '<div class="tree-c"><p class="tree-h">Ngoài chương trình</p>' + ngoai.map(function (b) { return nutBai(b.id, b.ten); }).join("") +
    '<button class="btn ghost sm" data-act="form-bai">+ Thêm bài ngoài chương trình</button></div></div>';
  main.innerHTML = '<div class="head"><div class="head-row"><h1>Kho bài học</h1>' + chon + '<button class="btn ghost sm" data-act="form-mon">+ Thêm môn – lớp</button></div>' +
    '<p class="small muted">' + esc(ct.nguon || "") + ' · ' + dsBai.length + ' bài</p>' +
    '<div class="legend"><span><i class="st san"></i>Sẵn sàng</span><span><i class="st cho"></i>Chờ duyệt</span><span><i class="st thieu"></i>Thiếu bản đồ lỗi</span><span><i class="st trong"></i>Chưa có câu</span></div></div>' +
    '<div class="kho">' + tree + '<div class="detail">' + (UI.form === "bai" ? formBai() : UI.bai ? chiTietBai(UI.bai) : '<p class="empty">Môn này chưa có bài nào.</p>') + '</div></div>';
}
// Thêm môn – lớp: dán khung chương trình (kế hoạch dạy học) → tách trên máy hoặc nhờ AI → xem trước → lưu
function formMon() {
  var M = UI.mon || (UI.mon = { mon: "", lop: "", text: "", chuong: [] });
  var h = '<div class="card"><h2>Thêm môn – lớp</h2><p class="small muted">Dán khung chương trình từ kế hoạch dạy học: mỗi dòng «Chương…», «Chủ đề…», «Phần…» hoặc «Unit…» là một chương; mỗi dòng «Bài 1. …» là một bài; các dòng bắt đầu bằng «-» ngay dưới một bài là yêu cầu cần đạt của bài đó.</p>' +
    '<div class="row"><label class="f">Tên môn<input type="text" id="mn-mon" value="' + esc(M.mon) + '" placeholder="Ví dụ: Toán"></label><label class="f">Lớp<input type="number" id="mn-lop" min="1" max="12" value="' + esc(M.lop) + '" placeholder="11"></label></div>' +
    '<label class="f">Khung chương trình<textarea id="mn-text" rows="10" placeholder="Chương I. Hàm số lượng giác và phương trình lượng giác&#10;Bài 1. Giá trị lượng giác của góc lượng giác&#10;- Nhận biết được góc lượng giác…&#10;Bài 2. Công thức lượng giác">' + esc(M.text) + '</textarea></label>' +
    '<div class="row-btn"><button class="btn" data-act="mon-tach">Tách khung</button><button class="btn ghost" data-act="mon-ai"><span class="ai-dot"></span>Nhờ AI tách khung và yêu cầu cần đạt</button><button class="btn ghost" data-act="mon-huy">Hủy</button></div>';
  if (M.chuong.length) {
    var soBai = M.chuong.reduce(function (s, c) { return s + c.bai.length; }, 0);
    h += '<div class="nh-list"><h3>Xem trước: ' + M.chuong.length + ' chương, ' + soBai + ' bài</h3>' + M.chuong.map(function (c) {
      return '<div class="nh-item"><b>' + esc(c.ten) + '</b><ul class="plain small">' + c.bai.map(function (b) {
        return '<li>' + esc(tenBai(b)) + (b.yccd && b.yccd.length ? ' <span class="muted">· ' + b.yccd.length + ' yêu cầu cần đạt</span>' : '') + '</li>';
      }).join("") + '</ul></div>';
    }).join("") + '<div class="row-btn"><button class="btn" data-act="mon-luu">Lưu môn này</button></div></div>';
  }
  return h + '</div>';
}
function docFormMon() {
  var M = UI.mon;
  M.mon = $("#mn-mon").value.trim(); M.lop = $("#mn-lop").value.trim(); M.text = $("#mn-text").value;
  return M;
}
function maMon(mon, lop) {
  var khong = mon.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toUpperCase().replace(/[^A-Z ]/g, " ").trim().split(/\s+/);
  var goc = (khong.length > 1 ? khong[0][0] + khong[1][0] : (khong[0] || "MON").slice(0, 2)) + lop, ma = goc, n = 2;
  while (timCT(ma)) ma = goc + "_" + (n++);
  return ma;
}
function luuMon() {
  var M = docFormMon(), lop = parseInt(M.lop, 10);
  if (!M.mon || !(lop >= 1 && lop <= 12)) { toast("Nhập tên môn và lớp (1–12)."); return; }
  if (!M.chuong.length) { toast("Bấm «Tách khung» trước đã."); return; }
  var ma = maMon(M.mon, lop), dung = {};
  var ct = { id: ma, mon: M.mon, lop: lop, nguon: "Giáo viên nhập từ kế hoạch dạy học", tu_nhap: true, chuong: M.chuong.map(function (c, i) {
    return { id: "C" + (i + 1), ten: c.ten, bai: c.bai.map(function (b, j) {
      var id = ma + "-B" + String(b.so || j + 1).padStart(2, "0");
      while (dung[id]) id += "b";
      dung[id] = 1;
      return { id: id, so: b.so || null, ten: b.ten, yccd: b.yccd || [] };
    }) };
  }) };
  DB.d.chuong_trinh.push(ct); lamMoiBai(); DB.luu();
  UI.ct = ma; UI.bai = null; UI.form = null; UI.mon = null; ghiNhoMon(); vKho();
  toast("Đã thêm " + M.mon + " " + lop + ".");
}
function ghiNhoMon() { try { localStorage.setItem("hieubai_mon", UI.ct); } catch (e) {} }
function formBai() {
  return '<div class="card"><h2>Thêm bài ngoài chương trình</h2><p class="small muted">Dùng cho chuyên đề, bài riêng của trường. Sau khi lưu, bấm «AI soạn câu hỏi» để có bộ câu kèm bản đồ lỗi.</p>' +
    '<label class="f">Tên bài<input type="text" id="fb-ten" placeholder="Ví dụ: Chuyên đề Sinh học tế bào và sức khỏe"></label>' +
    '<label class="f">Nội dung hoặc mục tiêu bài (dán từ giáo án)<textarea id="fb-nd" rows="7" placeholder="Học sinh cần biết, hiểu được gì sau bài này…"></textarea></label>' +
    '<div class="row-btn"><button class="btn" data-act="luu-bai">Lưu bài</button><button class="btn ghost" data-act="huy">Hủy</button></div></div>';
}
function chiTietBai(id) {
  var b = timBai(id), ds = cauCuaBai(id), st = trangThaiBai(id), dung = cauDungDuoc(id), thieu = ds.filter(function (c) { return !coBanDo(c); });
  var h = '<div class="card"><p class="eyebrow">' + esc(b.ct.mon + " " + b.ct.lop + " · " + b.chuong) + '</p><h2>' + esc(b.ten) + '</h2>';
  if (UI.form === "yccd") {
    h += '<div class="yccd-edit"><p class="small b">Yêu cầu cần đạt (mỗi dòng một yêu cầu)</p><textarea id="yc-text" rows="5">' + esc((UI.yccdNhap || b.yccd).join("\n")) + '</textarea>' +
      '<div class="row-btn"><button class="btn sm" data-act="yc-luu">Lưu</button><button class="btn ghost sm" data-act="yc-ai"><span class="ai-dot"></span>AI gợi ý</button><button class="btn ghost sm" data-act="huy">Hủy</button></div>' +
      (UI.yccdNhap ? '<p class="note-ai">AI gợi ý theo Chương trình GDPT 2018: đối chiếu kế hoạch dạy học trước khi lưu.</p>' : '') + '</div>';
  } else if (b.yccd.length) {
    h += '<div><p class="small b">Yêu cầu cần đạt <button class="link" data-act="yc-sua">Sửa</button></p><ul class="plain small">' + b.yccd.map(function (y) { return "<li>" + esc(y) + "</li>"; }).join("") + '</ul></div>';
  } else {
    h += '<p class="warnline">Bài chưa có yêu cầu cần đạt nên AI chỉ dựa vào tên bài khi soạn câu. <button class="link" data-act="yc-sua">Thêm yêu cầu cần đạt</button></p>';
  }
  if (b.noi_dung) h += '<div><p class="small b">Nội dung giáo viên cung cấp</p><p class="small pre">' + esc(b.noi_dung) + '</p></div>';
  h += '<p class="small"><span class="st ' + st + '"></span> <b>' + TEN_TT[st] + '</b> · ' + ds.length + ' câu, ' + dung.length + ' câu dùng được để kiểm tra</p>' +
    '<div class="row-btn">' +
    (thieu.length ? '<button class="btn" data-act="ai-bando"><span class="ai-dot"></span>AI dựng bản đồ lỗi (' + thieu.length + ' câu)</button>' : '') +
    '<button class="btn' + (thieu.length ? " ghost" : "") + '" data-act="ai-soan"><span class="ai-dot"></span>' + (ds.length ? "AI soạn thêm câu" : "AI soạn câu hỏi") + '</button>' +
    '<button class="btn ghost" data-act="form-nhap">+ Nhập nhiều câu (dán, PDF, Word)</button>' +
    '<button class="btn ghost" data-act="form-cau">+ Nhập 1 câu</button>' +
    '<button class="btn ghost" data-act="form-buoi"' + (dung.length ? "" : " disabled title=\"Cần ít nhất 1 câu có bản đồ lỗi và đã duyệt\"") + '>Tạo buổi kiểm tra</button></div></div>';
  if (UI.form === "cau") h += formCau();
  if (UI.form === "nhap") h += formNhap();
  if (UI.form === "buoi") h += formBuoi(id, dung);
  if (!ds.length) h += '<p class="empty">Bài này chưa có câu nào. Bấm «AI soạn câu hỏi» hoặc nhập câu thủ công.</p>';
  else {
    var chua = ds.filter(function (c) { return coBanDo(c) && c.trang_thai !== "da_duyet"; }).length;
    h += '<div class="qhead"><h3>Câu hỏi của bài</h3>' + (chua ? '<button class="btn ghost sm" data-act="duyet-het">Duyệt tất cả câu có bản đồ lỗi (' + chua + ')</button>' : '') + '</div>';
    h += ds.map(theCau).join("");
  }
  return h;
}
function theCau(c, i) {
  var ok = coBanDo(c);
  var h = '<div class="map"><div class="map-h"><div><b>Câu ' + (i + 1) + '.</b> ' + esc(c.q) + '</div><div class="map-tools"><span class="tag">' + esc(TEN_NGUON[c.nguon] || c.nguon) + '</span>' +
    (ok ? '<label class="check"><input type="checkbox" data-duyet="' + c.id + '"' + (c.trang_thai === "da_duyet" ? " checked" : "") + '> Đã duyệt</label>' : '') +
    '<button class="link" data-act="xoa-cau" data-id="' + c.id + '">Xóa</button></div></div><div class="map-b">';
  c.o.forEach(function (o, k) {
    if (k === c.d) { h += '<div class="opt-line right"><span class="k">' + KEYS[k] + ' ✓</span><span>' + esc(o) + '</span></div>'; return; }
    var L = c.loi && c.loi[k] ? timLoi(c.loi[k]) : null;
    h += L ? '<div class="opt-line"><span class="k">' + KEYS[k] + '</span><div class="err"><span>' + esc(o) + '</span><span class="t">' + esc(L.ten) + '</span>' +
        '<span class="small">Học lại: ' + ((L.bai_giang && L.bai_giang.thuat_ngu) || []).length + ' thuật ngữ' + (L.bai_giang && HINH.co(L.bai_giang.hinh) ? ', có hình' : '') + ' · ' + L.bac_thang.length + ' câu nhỏ · làm lại câu gốc</span></div></div>'
      : '<div class="opt-line"><span class="k">' + KEYS[k] + '</span><span>' + esc(o) + '</span></div>';
  });
  var dsLoi = [];
  Object.keys(c.loi || {}).forEach(function (k) { var L = timLoi(c.loi[k]); if (L && dsLoi.indexOf(L) < 0) dsLoi.push(L); });
  h += dsLoi.map(function (L) {
    return '<details class="lotrinh"><summary>Xem lộ trình gỡ: ' + esc(L.ten) + '</summary>' + veBaiGiang(L, true) +
      '<p class="bg-h">Câu nhỏ</p><ol class="ladder">' + L.bac_thang.map(function (g) {
        return '<li><span class="tag">' + (MUC_BAC[g.muc] || g.muc) + '</span>' + esc(g.q) + ' <span class="small ok-t">→ ' + esc(g.o[g.d]) + '</span>' + (g.giai ? '<br><span class="small muted">' + esc(g.giai) + '</span>' : '') + '</li>';
      }).join("") + '</ol><p class="small muted">Cuối cùng học sinh làm lại chính câu này, phương án được đảo thứ tự.</p></details>';
  }).join("");
  if (!ok) h += '<p class="warnline">Chưa có bản đồ lỗi nên chưa dùng được để kiểm tra.</p>';
  return h + '</div></div>';
}
function formCau() {
  return '<div class="card"><h3>Nhập câu thủ công</h3><label class="f">Câu hỏi<textarea id="fc-q" rows="2"></textarea></label>' +
    KEYS.map(function (k, i) { return '<label class="f-opt"><input type="radio" name="fc-d" value="' + i + '"' + (i === 0 ? " checked" : "") + ' aria-label="Đáp án đúng ' + k + '"><b>' + k + '</b><input type="text" id="fc-o' + i + '"></label>'; }).join("") +
    '<p class="small muted">Chọn nút tròn ở phương án đúng. Câu mới chưa có bản đồ lỗi; lưu xong bấm «AI dựng bản đồ lỗi».</p>' +
    '<div class="row-btn"><button class="btn" data-act="luu-cau">Lưu câu</button><button class="btn ghost" data-act="huy">Hủy</button></div></div>';
}
function formNhap() {
  var N = UI.nhap, dsBai = baiCuaMon(UI.ct);
  var h = '<div class="card"><h3>Nhập nhiều câu</h3><div class="seg" role="tablist">' +
    '<button role="tab" data-act="nhap-tab" data-tab="dan" aria-selected="' + (N.tab === "dan") + '">Dán văn bản</button>' +
    '<button role="tab" data-act="nhap-tab" data-tab="file" aria-selected="' + (N.tab === "file") + '">Tải file PDF, Word</button></div>';
  if (N.tab === "dan") {
    h += '<textarea id="nh-text" rows="10" placeholder="Dán câu hỏi chép từ đề, trang web… Ví dụ:&#10;Câu 1: Nội dung câu hỏi&#10;A. …    B. …    C. …    D. …&#10;Đáp án: B (nếu có)">' + esc(N.text) + '</textarea>';
  } else {
    h += '<label class="drop" id="nh-drop"><input type="file" id="nh-file" accept=".pdf,.docx,.txt" hidden><b>Kéo thả file vào đây</b><span class="small muted">hoặc bấm để chọn · PDF có lớp chữ, Word .docx, .txt</span></label>';
  }
  if (N.trangThai) h += '<p class="small">' + N.trangThai + '</p>';
  h += '<div class="row-btn"><button class="btn" data-act="nhap-tach"' + (N.text.trim() ? "" : " disabled") + '>Tách câu</button>' +
    '<button class="btn ghost" data-act="nhap-ai"' + (N.text.trim() ? "" : " disabled") + '><span class="ai-dot"></span>Nhờ AI tách câu và chọn đáp án</button>' +
    '<button class="btn ghost" data-act="huy">Đóng</button></div>' +
    '<p class="small muted">«Tách câu» chạy ngay trên máy: nhận «Câu 1:», phương án A–D (cùng dòng hay mỗi dòng một phương án), dòng «Đáp án: …» nếu có, và bỏ chữ thừa như «Hiển thị đáp án». Văn bản lộn xộn quá thì dùng nút AI; AI cũng tự giải để chọn đáp án khi đề không ghi, giáo viên kiểm lại.</p>';
  if (N.ds.length) {
    h += '<div class="nh-list"><div class="qhead"><h3>Xem trước: ' + N.ds.length + ' câu</h3><span class="small muted">Sửa trực tiếp nếu tách sai; bỏ tích câu không muốn lưu.</span></div>';
    N.ds.forEach(function (x, i) {
      h += '<div class="nh-item"><div class="nh-top"><label class="check"><input type="checkbox" data-nh-chon="' + i + '" checked> <b>Câu ' + (i + 1) + '</b></label>' +
        '<select data-nh-bai="' + i + '" aria-label="Bài của câu ' + (i + 1) + '">' + dsBai.map(function (b) { return '<option value="' + b.id + '"' + (b.id === x.bai ? " selected" : "") + '>' + esc(b.ten) + '</option>'; }).join("") + '</select></div>' +
        (x.aiDapAn ? '<p class="note-ai">AI tự giải để chọn đáp án: giáo viên kiểm lại trước khi lưu.</p>' : '') +
        (x.canh || []).map(function (c) { return '<p class="warnline">' + esc(c) + '</p>'; }).join("") +
        '<textarea data-nh-q="' + i + '" rows="' + Math.min(9, Math.max(2, x.q.split("\n").length + 1)) + '" aria-label="Câu hỏi ' + (i + 1) + '">' + esc(x.q) + '</textarea>' +
        [0, 1, 2, 3].map(function (k) {
          return '<label class="f-opt"><input type="radio" name="nh-d-' + i + '" value="' + k + '"' + (x.d === k ? " checked" : "") + ' aria-label="Đáp án đúng ' + KEYS[k] + '"><b>' + KEYS[k] + '</b><input type="text" data-nh-o="' + i + '-' + k + '" value="' + esc(x.o[k] || "") + '"></label>';
        }).join("") + '</div>';
    });
    if (N.boQua && N.boQua.length) h += '<p class="small muted">AI bỏ qua (không phải câu 4 phương án): ' + N.boQua.map(esc).join("; ") + '</p>';
    h += '<div class="row-btn">' + (AI.daNoi() ? '<label class="check"><input type="checkbox" id="nh-bando" checked> Lưu xong nhờ AI dựng bản đồ lỗi luôn</label>' : '') +
      '<button class="btn" data-act="nhap-luu">Lưu các câu đã chọn vào kho</button><button class="btn ghost" data-act="nhap-xoa">Xóa danh sách</button></div><ul class="plain small err-t" id="nh-loi"></ul></div>';
  }
  return h + '</div>';
}
function napFileNhap(file) {
  UI.nhap.trangThai = "Đang đọc file «" + esc(file.name) + "»…"; vKho();
  NHAP.docFile(file).then(function (chu) {
    UI.nhap.text = chu; UI.nhap.tab = "dan"; UI.nhap.trangThai = "Đã đọc «" + esc(file.name) + "». Rà lại phần chữ bên dưới rồi bấm «Tách câu».";
    vKho();
  }).catch(function (e) { UI.nhap.trangThai = '<span class="err-t">' + esc(e.message) + '</span>'; vKho(); });
}
function formBuoi(id, dung) {
  return '<div class="card"><h3>Tạo buổi kiểm tra</h3><label class="f">Lớp<select id="fbu-lop">' + DB.d.lop.map(function (l) { return '<option value="' + l.id + '">' + l.id + ' · ' + l.si_so + ' học sinh</option>'; }).join("") + '</select></label>' +
    '<div><p class="small b">Chọn câu (nên 3–5 câu, khoảng 5 phút)</p><div class="chon">' +
    dung.map(function (c, i) { return '<label class="check"><input type="checkbox" data-chon="' + c.id + '"' + (i < 5 ? " checked" : "") + '> ' + esc(c.q) + '</label>'; }).join("") + '</div></div>' +
    '<div class="row-btn"><button class="btn" data-act="luu-buoi">Tạo và mở buổi</button><button class="btn ghost" data-act="huy">Hủy</button></div></div>';
}
function maMoi() {
  var kt = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", m;
  do { m = ""; for (var i = 0; i < 4; i++) m += kt[Math.floor(Math.random() * kt.length)]; } while (DB.d.phien.some(function (p) { return p.ma === m; }));
  return m;
}

// ---------- Màn 2: Buổi kiểm tra ----------
function soNop(pid) { return DB.d.ket_qua.filter(function (k) { return k.phien === pid; }).length; }
function vBuoi() {
  var ds = DB.d.phien.filter(function (p) { return VAI.coLop(p.lop); }).sort(function (a, b) { return a.tao_luc < b.tao_luc ? 1 : -1; });
  var h = '<div class="head"><h1>Buổi kiểm tra</h1><p class="small muted">Tạo buổi mới ở Kho bài học (chọn bài → «Tạo buổi kiểm tra»). Học sinh vào bằng mã buổi và số thứ tự.</p></div>';
  if (!ds.length) { main.innerHTML = h + '<p class="empty">Chưa có buổi nào.</p>'; return; }
  h += '<div class="grid-wrap"><table class="list"><thead><tr><th>Mã</th><th>Bài</th><th>Lớp</th><th>Tạo lúc</th><th>Câu</th><th>Đã nộp</th><th>Trạng thái</th><th></th></tr></thead><tbody>';
  ds.forEach(function (p) {
    var b = timBai(p.bai), l = timLop(p.lop);
    h += '<tr><td class="code-s">' + esc(p.ma) + '</td><td>' + esc(b ? tenDayDu(b) : p.bai) + '</td><td>' + esc(p.lop) + '</td><td>' + ngay(p.tao_luc) + '</td><td>' + p.cau.length + '</td><td>' + soNop(p.id) + '/' + (l ? l.si_so : "?") + '</td>' +
      '<td><span class="pill ' + (p.trang_thai === "mo" ? "d" : "n") + '">' + (p.trang_thai === "mo" ? "Đang mở" : "Đã đóng") + '</span></td><td class="acts">' +
      (p.trang_thai === "mo" ? '<a href="#hs?ma=' + p.ma + '">Màn học sinh</a> · <button class="link" data-act="dong-buoi" data-id="' + p.id + '">Đóng</button>' : '<button class="link" data-act="mo-buoi" data-id="' + p.id + '">Mở lại</button>') +
      ' · <a href="#ketqua?p=' + p.id + '">Kết quả</a> · <button class="link danger" data-act="xoa-buoi" data-id="' + p.id + '">Xóa</button></td></tr>';
  });
  main.innerHTML = h + '</tbody></table></div>';
}

// ---------- Màn 3: Học sinh ----------
var HS = null;
// fstep trong một câu sai: 0 mở đầu · 1 học lại · 2..n+1 câu nhỏ · n+2 làm lại câu gốc (n = số câu nhỏ)
function hsMoi() { return { pid: null, stt: null, phase: "login", i: 0, ans: [], fix: [], fi: 0, fstep: 0, chosen: null, lai: {}, saiBac: [], perm: [], daHoc: {}, goSai: {} }; }
function tron(n) {
  var a = []; for (var i = 0; i < n; i++) a.push(i);
  for (var j = n - 1; j > 0; j--) { var r = Math.floor(Math.random() * (j + 1)), t = a[j]; a[j] = a[r]; a[r] = t; }
  if (n > 1 && a.every(function (v, i) { return v === i; })) { a[0] = 1; a[1] = 0; }
  return a;
}
function loiDangGo(ds) { var qi = HS.fix[HS.fi]; return { c: ds[qi], qi: qi, L: timLoi(ds[qi].loi[HS.ans[qi]]) }; }
function vaoGoc(x) { HS.fstep = x.L.bac_thang.length + 2; HS.perm = tron(x.c.o.length); HS.chosen = null; HS.saiBac = []; }
function cauPhien(p) { return p.cau.map(timCau).filter(Boolean); }
function vHs() {
  if (!HS) HS = hsMoi();
  main.innerHTML = '<div class="head"><h1>Kiểm tra cuối tiết</h1></div><div class="phone" id="phone"></div>';
  veHs();
}
function luuKQ() {
  var kq = DB.d.ket_qua.filter(function (k) { return k.phien === HS.pid && k.stt === HS.stt; })[0];
  if (!kq) { kq = { phien: HS.pid, stt: HS.stt }; DB.d.ket_qua.push(kq); }
  kq.lan1 = HS.ans.slice(); kq.lai = JSON.parse(JSON.stringify(HS.lai)); kq.go_sai = JSON.parse(JSON.stringify(HS.goSai)); kq.nop_luc = new Date().toISOString();
  DB.luu();
}
function optsHs(c, coFb) {
  return '<div class="opts">' + c.o.map(function (o, k) {
    var cls = "";
    if (coFb && HS.chosen !== null) { if (k === c.d) cls = "right"; else if (k === HS.chosen) cls = "wrong"; }
    else if (!coFb && HS.chosen === k) cls = "sel";
    return '<button data-k="' + k + '"' + (cls ? ' class="' + cls + '"' : "") + (coFb && HS.chosen !== null ? " disabled" : "") + '><b>' + KEYS[k] + '</b><span>' + esc(o) + '</span></button>';
  }).join("") + '</div>';
}
// Câu nhỏ: chọn sai thì phương án đó bị gạch, học sinh chọn lại đến khi đúng
// st: trạng thái lượt gỡ (chosen, saiBac, perm) — mặc định của Màn học sinh, Luyện đề truyền trạng thái riêng
function optsBac(g, st) {
  st = st || HS;
  return '<div class="opts">' + g.o.map(function (o, k) {
    var sai = st.saiBac.indexOf(k) >= 0, dung = st.chosen === k;
    return '<button data-k="' + k + '"' + (sai ? ' class="wrong"' : dung ? ' class="right"' : '') + (sai || st.chosen !== null ? " disabled" : "") + '><b>' + KEYS[k] + '</b><span>' + esc(o) + '</span></button>';
  }).join("") + '</div>';
}
function fbBac(g, st) {
  st = st || HS;
  if (st.chosen !== null) return '<div class="fb ok">Đúng rồi. ' + esc(g.giai || "") + '</div>';
  if (st.saiBac.length) return '<div class="fb no">Chưa đúng. Em đọc lại phần giải thích rồi chọn lại nhé.</div>';
  return "";
}
// Câu gốc làm lại: phương án hiển thị theo thứ tự đã đảo (st.perm), data-k vẫn là chỉ số gốc
function optsGoc(c, st) {
  st = st || HS;
  return '<div class="opts">' + st.perm.map(function (k, pos) {
    var cls = "";
    if (st.chosen !== null) { if (k === c.d) cls = "right"; else if (k === st.chosen) cls = "wrong"; }
    return '<button data-k="' + k + '"' + (cls ? ' class="' + cls + '"' : "") + (st.chosen !== null ? " disabled" : "") + '><b>' + KEYS[pos] + '</b><span>' + esc(c.o[k]) + '</span></button>';
  }).join("") + '</div>';
}
function fbGoc(c, st) {
  st = st || HS;
  if (st.chosen === null) return "";
  return st.chosen === c.d ? '<div class="fb ok">Đúng rồi! Em đã hiểu đúng câu này.</div>'
    : '<div class="fb no">Chưa đúng. Đáp án đúng là «' + esc(c.o[c.d]) + '». Thầy cô sẽ giúp em thêm phần này.</div>';
}
function thanhBuoc(fstep, n) {
  var ten = ["Học lại"], i;
  for (i = 1; i <= n; i++) ten.push("Câu nhỏ " + i);
  ten.push("Câu gốc");
  var hien = fstep <= 1 ? 0 : fstep - 1;
  return '<div class="buoc">' + ten.map(function (t, j) { return '<span class="' + (j < hien ? "xong" : j === hien ? "on" : "") + '" title="' + t + '"></span>'; }).join("") + '</div>';
}
function veHs() {
  var ph = $("#phone"), h = "", p = HS.pid ? timPhien(HS.pid) : null, ds = p ? cauPhien(p) : [];
  if (HS.phase === "login") {
    h = '<h2>Kiểm tra cuối tiết</h2><label class="f">Mã buổi<input type="text" id="hs-ma" value="' + esc(thamSo().ma || "") + '" autocomplete="off" style="text-transform:uppercase"></label>' +
      (VAI.me() && VAI.me().vai === "hs" ? '<p class="small muted">Thầy cô đọc mã buổi trên lớp, em nhập vào ô trên.</p>' : '<label class="f">Số thứ tự của em<input type="number" id="hs-stt" min="1" max="50"></label>') +
      '<button class="btn" data-hs="vao">Vào bài</button><p class="small err-t" id="hs-loi"></p>';
  } else if (HS.phase === "test") {
    var c = ds[HS.i];
    h = '<p class="small muted">' + esc(tenDayDu(timBai(p.bai))) + '</p><div class="prog"><i style="width:' + (HS.i / ds.length * 100) + '%"></i></div><p class="small muted">Câu ' + (HS.i + 1) + '/' + ds.length + '</p>' +
      '<p class="qtext">' + esc(c.q) + '</p>' + optsHs(c, false) + '<button class="btn" data-hs="tiep"' + (HS.chosen === null ? " disabled" : "") + '>' + (HS.i < ds.length - 1 ? "Câu tiếp" : "Nộp bài") + '</button>';
  } else if (HS.phase === "kq1") {
    var dung = HS.ans.filter(function (a, i) { return a === ds[i].d; }).length;
    h = '<p class="small muted">Kết quả lần đầu</p><div class="big">' + dung + '/' + ds.length + '</div>' +
      (HS.fix.length ? '<p>Em có ' + HS.fix.length + ' câu chưa đúng. Mình cùng xem lại từng câu: có vài câu dễ hơn để gỡ, rồi em làm lại câu tương tự nhé.</p><button class="btn" data-hs="batdau">Bắt đầu xem lại</button>'
        : '<p>Em làm đúng hết. Rất tốt!</p><button class="btn" data-hs="xong">Xem tổng kết</button>');
  } else if (HS.phase === "fix") {
    var x = loiDangGo(ds), c2 = x.c, L = x.L, n = L.bac_thang.length;
    var head = '<p class="small muted">Xem lại câu ' + (x.qi + 1) + ' · câu sai ' + (HS.fi + 1) + '/' + HS.fix.length + '</p>' + thanhBuoc(HS.fstep, n);
    if (HS.fstep === 0) {
      h = head + '<p class="qtext">' + esc(c2.q) + '</p><p class="small">Em đã chọn <b>' + KEYS[HS.ans[x.qi]] + '. ' + esc(c2.o[HS.ans[x.qi]]) + '</b></p>' +
        '<div class="hint"><span class="lab">Có thể em đang nghĩ</span><span>' + esc(L.hs) + '</span></div>' +
        (HS.daHoc[L.id] ? '<p class="small">Em đã học lại phần này ở câu trước. Thử làm lại câu này nhé.</p><button class="btn" data-hs="den-goc">Làm lại câu này</button>'
          : '<p class="small muted">Mình cùng học lại phần này, làm vài câu nhỏ, rồi em làm lại câu này nhé.</p><button class="btn" data-hs="fnext">Học lại phần này</button>');
    } else if (HS.fstep === 1) {
      h = head + '<p class="eyebrow">Học lại</p>' + veBaiGiang(L) + '<button class="btn" data-hs="fnext">Em đã đọc xong, làm câu nhỏ</button>';
    } else if (HS.fstep < n + 2) {
      var g = L.bac_thang[HS.fstep - 2];
      h = head + '<p class="small muted">Câu nhỏ ' + (HS.fstep - 1) + '/' + n + ' · ' + (MUC_BAC[g.muc] || "") + '</p><p class="qtext">' + esc(g.q) + '</p>' + optsBac(g) + fbBac(g) +
        (HS.chosen !== null ? '<button class="btn" data-hs="fnext">' + (HS.fstep - 1 < n ? "Câu nhỏ tiếp theo" : "Làm lại câu gốc") + '</button>' : "") +
        '<details class="lotrinh"><summary>Xem lại phần giải thích</summary>' + veBaiGiang(L) + '</details>';
    } else {
      h = head + '<p class="small muted">Làm lại câu gốc · thứ tự phương án đã được đổi</p><p class="qtext">' + esc(c2.q) + '</p>' + optsGoc(c2) + fbGoc(c2) +
        (HS.chosen !== null ? '<button class="btn" data-hs="fnext">' + (HS.fi < HS.fix.length - 1 ? "Câu sai tiếp theo" : "Xem tổng kết") + '</button>' : "");
    }
  } else if (HS.phase === "done") {
    var d1 = HS.ans.filter(function (a, i) { return a === ds[i].d; }).length, d2 = d1;
    ds.forEach(function (c, i) { if (HS.ans[i] !== c.d && HS.lai[c.id] === c.d) d2++; });
    h = '<p class="small muted">Tổng kết</p><div class="before-after"><div><div class="big">' + d1 + '/' + ds.length + '</div><span class="small muted">Lần đầu</span></div><div class="big muted">→</div>' +
      '<div><div class="big ok-t">' + d2 + '/' + ds.length + '</div><span class="small muted">Sau khi điều chỉnh</span></div></div><div>' +
      ds.map(function (c, i) {
        var st = HS.ans[i] === c.d ? '<span class="pill d">Đúng ngay</span>' : HS.lai[c.id] === c.d ? '<span class="pill s">Đã hiểu lại, làm đúng</span>' : '<span class="pill x">Cần thầy cô hỗ trợ</span>';
        return '<div class="sumrow"><span>Câu ' + (i + 1) + '</span>' + st + '</div>';
      }).join("") + '</div><p class="small muted">Kết quả đã gửi cho giáo viên (chỉ giáo viên xem).</p><button class="btn ghost" data-hs="moi">Học sinh tiếp theo</button>';
  }
  ph.innerHTML = h;
}
function hsBam(act, el) {
  var p = HS.pid ? timPhien(HS.pid) : null, ds = p ? cauPhien(p) : [];
  if (act === "vao") {
    var toi = VAI.me(), laHs = toi && toi.vai === "hs";
    var ma = ($("#hs-ma").value || "").trim().toUpperCase(), stt = laHs ? +toi.stt : parseInt($("#hs-stt").value, 10), loi = $("#hs-loi");
    var ph = DB.d.phien.filter(function (x) { return x.ma === ma; })[0];
    if (!ph) { loi.textContent = "Không tìm thấy buổi có mã này."; return; }
    if (ph.trang_thai !== "mo") { loi.textContent = "Buổi này đã đóng."; return; }
    if (laHs && ph.lop !== toi.lop) { loi.textContent = "Mã này của lớp " + ph.lop + ", không phải lớp em."; return; }
    var lop = timLop(ph.lop);
    if (!(stt >= 1 && stt <= (lop ? lop.si_so : 50))) { loi.textContent = "Số thứ tự phải từ 1 đến " + (lop ? lop.si_so : 50) + "."; return; }
    if (!cauPhien(ph).length) { loi.textContent = "Buổi này không còn câu nào trong kho."; return; }
    if (DB.d.ket_qua.some(function (k) { return k.phien === ph.id && k.stt === stt; }) && !confirm("Số thứ tự " + stt + " đã nộp bài trong buổi này. Làm lại và ghi đè?")) return;
    HS = hsMoi(); HS.pid = ph.id; HS.stt = stt; HS.phase = "test";
  } else if (act === "chon") {
    var k = +el.dataset.k;
    if (HS.phase === "test") HS.chosen = k;
    else if (HS.phase === "fix" && HS.chosen === null) {
      var x = loiDangGo(ds), n = x.L.bac_thang.length;
      if (HS.fstep >= 2 && HS.fstep < n + 2) {
        if (k === x.L.bac_thang[HS.fstep - 2].d) HS.chosen = k;
        else if (HS.saiBac.indexOf(k) < 0) { HS.saiBac.push(k); HS.goSai[x.c.id] = (HS.goSai[x.c.id] || 0) + 1; }
      } else if (HS.fstep === n + 2) { HS.chosen = k; HS.lai[x.c.id] = k; luuKQ(); }
    }
  } else if (act === "tiep") {
    HS.ans[HS.i] = HS.chosen; HS.chosen = null;
    if (HS.i < ds.length - 1) HS.i++;
    else {
      HS.fix = ds.map(function (c, i) { return i; }).filter(function (i) { return HS.ans[i] !== ds[i].d && timLoi(ds[i].loi[HS.ans[i]]); });
      HS.phase = "kq1"; luuKQ();
    }
  } else if (act === "batdau") { HS.phase = "fix"; HS.fi = 0; HS.fstep = 0; HS.chosen = null; }
  else if (act === "xong") { HS.phase = "done"; }
  else if (act === "fnext") {
    var y = loiDangGo(ds), m = y.L.bac_thang.length;
    HS.chosen = null; HS.saiBac = [];
    if (HS.fstep < m + 1) HS.fstep++;
    else if (HS.fstep === m + 1) { HS.daHoc[y.L.id] = true; vaoGoc(y); }
    else if (HS.fi < HS.fix.length - 1) { HS.fi++; HS.fstep = 0; }
    else HS.phase = "done";
    window.scrollTo(0, 0);
  } else if (act === "den-goc") { vaoGoc(loiDangGo(ds)); window.scrollTo(0, 0); }
  else if (act === "moi") { var ma2 = p ? p.ma : ""; HS = hsMoi(); location.hash = "#hs?ma=" + ma2; }
  veHs();
}

// ---------- Màn 4: Kết quả ----------
function vKetQua() {
  var coKQ = DB.d.phien.filter(function (p) { return soNop(p.id) && VAI.coLop(p.lop); }).sort(function (a, b) { return a.tao_luc < b.tao_luc ? 1 : -1; });
  var pid = thamSo().p || UI.phienKQ || (coKQ[0] && coKQ[0].id);
  var h = '<div class="head"><h1>Kết quả buổi kiểm tra</h1>';
  if (!DB.d.phien.length) { main.innerHTML = h + '</div><p class="empty">Chưa có buổi nào.</p>'; return; }
  h += '<label class="f inline">Buổi<select id="kq-p">' + DB.d.phien.filter(function (p) { return VAI.coLop(p.lop); }).map(function (p) { var b = timBai(p.bai); return '<option value="' + p.id + '"' + (p.id === pid ? " selected" : "") + '>' + esc(p.ma + " · " + p.lop + " · " + (b ? tenDayDu(b) : p.bai)) + ' (' + soNop(p.id) + ' bài)</option>'; }).join("") + '</select></label></div>';
  var p = timPhien(pid);
  if (!p) { main.innerHTML = h; return; }
  UI.phienKQ = p.id;
  var ds = cauPhien(p), rows = DB.d.ket_qua.filter(function (k) { return k.phien === p.id; }).sort(function (a, b) { return a.stt - b.stt; });
  if (!rows.length) { main.innerHTML = h + '<p class="empty">Chưa có học sinh nào nộp bài trong buổi này.</p>'; return; }
  var lop = timLop(p.lop), n = rows.length, Q = ds.length, d1 = 0, d2 = 0, perQ = ds.map(function () { return { a: 0, b: 0 }; }), mis = {};
  var luoi = rows.map(function (r) {
    return { stt: r.stt, cells: ds.map(function (c, qi) {
      var a = r.lan1[qi];
      if (a === c.d) { d1++; d2++; perQ[qi].a++; perQ[qi].b++; return { st: "d" }; }
      var loi = c.loi[a], fixed = !!(r.lai && r.lai[c.id] === c.d);
      if (fixed) { d2++; perQ[qi].b++; }
      if (loi) {
        var m = mis[loi] || (mis[loi] = { n: {}, x: {}, gs: 0, lan: 0 });
        m.n[r.stt] = 1; if (!fixed) m.x[r.stt] = 1;
        if (r.go_sai && r.go_sai[c.id] !== undefined) { m.gs += r.go_sai[c.id]; m.lan++; }
      }
      return { st: fixed ? "s" : "x", loi: loi };
    }) };
  });
  h += '<div class="tiles"><div class="tile"><span class="v">' + n + '/' + (lop ? lop.si_so : "?") + '</span><span class="l">Học sinh đã nộp · lớp ' + esc(p.lop) + '</span></div>' +
    '<div class="tile"><span class="v">' + pct(d1, n * Q) + '%</span><span class="l">Câu đúng ở lần đầu</span></div>' +
    '<div class="tile"><span class="v ok-t">' + pct(d2, n * Q) + '%</span><span class="l">Câu đúng sau khi học lại</span></div></div>';
  var mlist = Object.keys(mis).map(function (k) { return { k: k, n: Object.keys(mis[k].n).length, x: Object.keys(mis[k].x).length, gs: mis[k].lan ? mis[k].gs / mis[k].lan : null }; }).sort(function (a, b) { return b.x - a.x || b.n - a.n; });
  h += '<div class="card"><h2>Lớp còn vướng chỗ nào</h2><p class="small muted">Xếp theo số em vẫn làm sai câu gốc sau khi học lại: đây là chỗ nên giảng lại vài phút đầu tiết sau.</p><div class="misc">' +
    mlist.map(function (m, i) {
      var L = timLoi(m.k);
      return '<div class="misc-item"><div class="top"><b>' + esc(L ? L.ten : m.k) + '</b><span class="small muted">' + m.n + ' em mắc</span></div><span class="small">' + (m.n - m.x) + ' em đã hiểu lại và làm đúng câu gốc' +
        (m.gs !== null ? ' · trung bình chọn sai ' + m.gs.toFixed(1).replace(".", ",") + ' lần ở các câu nhỏ' : '') + '.</span>' +
        (m.x ? '<span class="act">Còn ' + m.x + ' em chưa gỡ được' + (i === 0 ? ' → nên ưu tiên giảng lại' : '') + '</span>' : '<span class="small ok-t">Cả nhóm đã gỡ được</span>') + '</div>';
    }).join("") + '</div></div>';
  h += '<div class="card"><h2>Từng câu: lần đầu và sau khi học lại</h2><div class="legend"><span><i class="sw a"></i>Đúng lần đầu</span><span><i class="sw b"></i>Đúng sau khi học lại</span></div><div class="bars">' +
    perQ.map(function (q, i) { var a = pct(q.a, n), b = pct(q.b, n); return '<div class="bar-row"><span title="' + esc(ds[i].q) + '">Câu ' + (i + 1) + '</span><div class="bar-pair"><div class="bar a"><i style="width:' + a + '%"></i></div><div class="bar b"><i style="width:' + b + '%"></i></div><div class="bar-lab"><span>' + a + '%</span><span>' + b + '%</span></div></div></div>'; }).join("") + '</div></div>';
  h += '<div class="card"><h2>Từng học sinh</h2><div class="legend"><span><i class="dot d"></i>Đúng ngay</span><span><i class="dot s"></i>Học lại rồi làm đúng</span><span><i class="dot x"></i>Cần hỗ trợ</span></div><div class="grid-wrap"><table><thead><tr><th>Số thứ tự</th>' +
    ds.map(function (c, i) { return '<th>C' + (i + 1) + '</th>'; }).join("") + '<th>Cần hỗ trợ ở</th></tr></thead><tbody>' +
    luoi.map(function (r) {
      var x = r.cells.filter(function (c) { return c.st === "x" && c.loi; });
      return '<tr><td>' + r.stt + '</td>' + r.cells.map(function (c) { var L = c.loi ? timLoi(c.loi) : null; return '<td><i class="dot ' + c.st + '" title="' + esc(L ? L.ten : "Đúng ngay") + '"></i></td>'; }).join("") +
        '<td class="small left">' + (x.length ? x.map(function (c) { var L = timLoi(c.loi); return esc(L ? L.ten : c.loi); }).join("; ") : "—") + '</td></tr>';
    }).join("") + '</tbody></table></div><p class="small muted">Chỉ giáo viên xem. Không có họ tên, chỉ số thứ tự. Không xếp hạng, không công khai.</p></div>';
  main.innerHTML = h;
}

// ---------- Màn 5: Dữ liệu ----------
function vDuLieu() {
  var dem = { chuong_trinh: "môn – lớp", ngan_hang: "câu hỏi", loi_tu_duy: "lỗi tư duy", thuat_ngu: "thuật ngữ", bai_ngoai: "bài ngoài chương trình", phien: "buổi kiểm tra", ket_qua: "bài làm", lop: "lớp" };
  var h = '<div class="head"><h1>Dữ liệu</h1><p class="small muted">Dữ liệu nằm trong thư mục <b>db/</b> cạnh file index.html, mỗi bảng một file .js. Trang web đọc các file này khi mở. ' +
    (DB.cauNoi() ? 'Đang chạy qua cầu nối nên <b>mỗi lần lưu tự ghi thẳng ra thư mục db</b>.' : 'Mở trực tiếp file index.html thì trình duyệt không tự ghi được ra file: chạy <b>Mo_app.bat</b> để tự ghi, hoặc dùng một trong hai cách dưới đây.') + '</p></div>';
  h += '<div class="card"><h2>Trạng thái</h2><ul class="plain small"><li>Đang dùng dữ liệu từ: <b>' + (DB.nguon() === "file" ? "thư mục db" : "bản trên trình duyệt (mới hơn thư mục db)") + '</b></li>' +
    '<li>Lưu gần nhất: ' + ngay(DB.d.meta.luu_luc) + '</li><li>Thư mục db: ' + (DB.daKetNoi() ? "<b>đã kết nối</b>, mỗi lần lưu sẽ ghi thẳng ra file" : "chưa kết nối") + '</li>' +
    (DB.loiGhi() ? '<li class="err-t">Lỗi ghi: ' + esc(DB.loiGhi()) + '</li>' : '') + '</ul>' +
    '<div class="tiles small-tiles">' + Object.keys(dem).map(function (b) { return '<div class="tile"><span class="v">' + DB.d[b].length + '</span><span class="l">' + dem[b] + '</span></div>'; }).join("") + '</div></div>';
  h += '<div class="card"><h2>Ghi ra thư mục db</h2>' +
    (DB.hoTroThuMuc() ? '<div><p class="small"><b>Cách 1 (nên dùng, Chrome hoặc Edge):</b> kết nối một lần trong mỗi lần mở trang, chọn đúng thư mục <b>db</b> của app. Từ đó mỗi lần lưu sẽ tự ghi đè các file trong thư mục.</p><button class="btn" data-act="ket-noi">' + (DB.daKetNoi() ? "Ghi lại ngay" : "Kết nối thư mục db") + '</button></div>'
      : '<p class="small muted">Trình duyệt này không hỗ trợ ghi thẳng vào thư mục. Dùng cách 2.</p>') +
    '<div><p class="small"><b>Cách 2:</b> tải ' + BANG.length + ' file .js về rồi chép đè vào thư mục db.</p><button class="btn ghost" data-act="tai-file">Tải các file db</button></div></div>';
  h += '<div class="card"><h2>Sao lưu và khôi phục</h2><div class="row-btn"><button class="btn ghost" data-act="sao-luu">Sao lưu thành 1 file .json</button>' +
    '<label class="btn ghost">Nhập file sao lưu<input type="file" id="nhap-file" accept=".json" hidden></label>' +
    '<button class="btn ghost danger" data-act="bo-thay-doi">Bỏ thay đổi trên trình duyệt</button></div><p class="small muted">«Bỏ thay đổi» xóa bản trên trình duyệt và dùng lại đúng dữ liệu đang có trong thư mục db.</p></div>';
  main.innerHTML = h;
}

// ---------- Hộp thoại AI ----------
// chayAI: có cầu nối/API thì gọi thẳng và chờ; không có (hoặc gọi lỗi, kết quả sai định dạng) thì mở hộp sao chép, dán.
// xuLy(text) trả về danh sách lỗi hoặc null (đã nạp xong); xong() chạy sau khi nạp thành công.
function chayAI(tieuDe, cauLenh, xuLy, xong) {
  var dlg = $("#dlg");
  if (!AI.daNoi()) { hopThuCong(tieuDe, cauLenh, xuLy, xong); return; }
  var bd = Date.now();
  dlg.dataset.ban = "1";
  dlg.innerHTML = '<div class="dlg"><h2>' + esc(tieuDe) + '</h2><div class="loading"><span class="spin"></span><span>AI đang làm… <b id="dlg-giay">0</b> giây</span></div>' +
    '<p class="small muted">Thường mất từ 30 giây đến vài phút. Em đừng đóng hay tải lại trang nhé.</p></div>';
  if (!dlg.open) dlg.showModal();
  var dem = setInterval(function () { var g = $("#dlg-giay"); if (g) g.textContent = Math.round((Date.now() - bd) / 1000); }, 1000);
  AI.goiAPI(cauLenh).then(function (text) {
    clearInterval(dem); dlg.dataset.ban = "";
    var e = xuLy(text);
    if (e) { hopThuCong(tieuDe, cauLenh, xuLy, xong, ["Kết quả AI chưa đúng định dạng, sửa trong ô bên dưới hoặc thử lại:"].concat(e), text); return; }
    dlg.close(); xong();
  }).catch(function (err) {
    clearInterval(dem); dlg.dataset.ban = "";
    hopThuCong(tieuDe, cauLenh, xuLy, xong, ["Lỗi gọi AI: " + err.message]);
  });
}
function hopThuCong(tieuDe, cauLenh, xuLy, xong, loiTruoc, kqTruoc) {
  var dlg = $("#dlg");
  dlg.innerHTML = '<form method="dialog" class="dlg"><div class="dlg-h"><h2>' + esc(tieuDe) + '</h2><button class="link" value="dong" aria-label="Đóng">✕</button></div>' +
    (AI.daNoi() ? '<div class="row-btn"><button type="button" class="btn sm" id="dlg-lai"><span class="ai-dot"></span>Gọi AI lại</button><span class="small muted">hoặc làm tay theo 3 bước dưới đây</span></div>'
      : '<p class="small demo-line">Chưa kết nối được AI. Em có thể nhờ AI ở trang khác theo 3 bước:</p>') +
    '<p class="small b">1. Sao chép câu lệnh</p><textarea id="dlg-cl" rows="6" readonly>' + esc(cauLenh) + '</textarea><button type="button" class="btn ghost sm" id="dlg-copy">Sao chép</button>' +
    '<p class="small b">2. Dán vào Claude, Copilot hoặc Gemini và chờ AI trả lời</p>' +
    '<p class="small b">3. Dán toàn bộ câu trả lời của AI vào đây</p><textarea id="dlg-kq" rows="7" placeholder="{ &quot;cau&quot;: [ … ] }">' + esc(kqTruoc || "") + '</textarea>' +
    '<ul class="plain small err-t" id="dlg-loi">' + (loiTruoc || []).slice(0, 12).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul>' +
    '<div class="row-btn"><button type="button" class="btn" id="dlg-nap">Kiểm tra và nạp</button></div></form>';
  if (!dlg.open) dlg.showModal();
  if ($("#dlg-lai")) $("#dlg-lai").onclick = function () { chayAI(tieuDe, cauLenh, xuLy, xong); };
  $("#dlg-copy").onclick = function () {
    var ta = $("#dlg-cl");
    function xong() { toast("Đã sao chép câu lệnh."); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(xong, function () { ta.select(); document.execCommand("copy"); xong(); });
    else { ta.select(); document.execCommand("copy"); xong(); }
  };
  $("#dlg-nap").onclick = function () {
    var e = xuLy($("#dlg-kq").value);
    if (e) { $("#dlg-loi").innerHTML = e.slice(0, 12).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + (e.length > 12 ? "<li>… và " + (e.length - 12) + " lỗi khác</li>" : ""); return; }
    dlg.close(); xong();
  };
}
$("#dlg").addEventListener("cancel", function (ev) { if (this.dataset.ban === "1") ev.preventDefault(); });

function moAI(loai, baiId) {
  var bai = timBai(baiId), ct = bai.ct, caus = cauCuaBai(baiId).filter(function (c) { return !coBanDo(c); });
  if (loai === "bando" && !caus.length) { toast("Mọi câu đã có bản đồ lỗi."); return; }
  var cauLenh = loai === "bando" ? AI.promptBanDo(bai, caus, ct.mon, ct.lop) : AI.promptSoan(bai, 5, ct.mon, ct.lop);
  chayAI(loai === "bando" ? "AI dựng bản đồ lỗi · " + bai.ten : "AI soạn câu hỏi · " + bai.ten, cauLenh, function (text) {
    var r = AI.docKetQua(text);
    if (r.loi.length) return r.loi;
    var e = AI.kiem(r.obj, loai, caus);
    if (e.length) return e;
    AI.nap(r.obj, loai, bai); DB.luu();
    return null;
  }, function () { toast("Đã nạp kết quả AI. Giáo viên rà lại rồi tích «Đã duyệt»."); route(); });
}
function nhapBangAI() {
  var ct = timCT(UI.ct), vb = UI.nhap.text.trim();
  if (!vb) { toast("Dán văn bản trước đã."); return; }
  chayAI("AI tách câu và chọn đáp án", AI.promptTach(vb, ct.mon, ct.lop, baiCuaMon(ct.id)), function (text) {
    var r = AI.docKetQua(text);
    if (r.loi.length) return r.loi;
    var e = AI.kiemTach(r.obj);
    if (e.length) return e;
    UI.nhap.ds = r.obj.cau.map(function (x) { return { q: String(x.q), o: x.o.map(String), d: +x.d, bai: timBai(x.bai) ? x.bai : UI.bai, aiDapAn: x.nguon_dap_an !== "de", canh: [] }; });
    UI.nhap.boQua = Array.isArray(r.obj.bo_qua) ? r.obj.bo_qua.map(String) : [];
    return null;
  }, function () { UI.nhap.trangThai = ""; vKho(); toast("AI đã tách " + UI.nhap.ds.length + " câu. Kiểm lại đáp án trước khi lưu."); });
}
function monBangAI() {
  var M = docFormMon();
  if (!M.mon || !M.lop) { toast("Nhập tên môn và lớp trước."); return; }
  if (!M.text.trim()) { toast("Dán khung chương trình trước."); return; }
  chayAI("AI tách khung chương trình · " + M.mon + " " + M.lop, AI.promptKhung(M.text, M.mon, M.lop), function (text) {
    var r = AI.docKetQua(text);
    if (r.loi.length) return r.loi;
    var e = AI.kiemKhung(r.obj);
    if (e.length) return e;
    M.chuong = r.obj.chuong.map(function (c) {
      return { ten: String(c.ten), bai: c.bai.map(function (b) { return { so: b.so === null || b.so === undefined || b.so === "" ? null : +b.so, ten: String(b.ten), yccd: (b.yccd || []).map(String) }; }) };
    });
    return null;
  }, function () { vKho(); toast("AI đã tách khung. Rà lại rồi bấm «Lưu môn này»."); });
}
function yccdBangAI() {
  var b = timBai(UI.bai);
  chayAI("AI gợi ý yêu cầu cần đạt · " + b.ten, AI.promptYCCD(b), function (text) {
    var r = AI.docKetQua(text);
    if (r.loi.length) return r.loi;
    if (!r.obj || !Array.isArray(r.obj.yccd) || !r.obj.yccd.length) return ["Thiếu mảng «yccd»."];
    UI.yccdNhap = r.obj.yccd.map(String);
    return null;
  }, function () { UI.form = "yccd"; vKho(); });
}
function luuNhap() {
  var loi = [], moi = [];
  UI.nhap.ds.forEach(function (x, i) {
    if (!$('[data-nh-chon="' + i + '"]').checked) return;
    var q = $('[data-nh-q="' + i + '"]').value.trim(), o = [0, 1, 2, 3].map(function (k) { return $('[data-nh-o="' + i + '-' + k + '"]').value.trim(); });
    var dEl = $('input[name="nh-d-' + i + '"]:checked'), bai = $('[data-nh-bai="' + i + '"]').value;
    if (!q || o.some(function (v) { return !v; })) loi.push("Câu " + (i + 1) + ": cần đủ nội dung câu hỏi và 4 phương án.");
    else if (!dEl) loi.push("Câu " + (i + 1) + ": chưa chọn đáp án đúng.");
    else moi.push({ q: q, o: o, d: +dEl.value, bai: bai });
  });
  if (loi.length) { $("#nh-loi").innerHTML = loi.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); return; }
  if (!moi.length) { toast("Chưa chọn câu nào."); return; }
  var dsBai = [];
  moi.forEach(function (x) {
    var n = cauCuaBai(x.bai).length + 1, id = x.bai + "-Q" + n;
    while (timCau(id)) { n++; id = x.bai + "-Q" + n; }
    DB.d.ngan_hang.push({ id: id, bai: x.bai, nguon: "nhap", trang_thai: "cho_duyet", q: x.q, o: x.o, d: x.d, loi: {} });
    if (dsBai.indexOf(x.bai) < 0) dsBai.push(x.bai);
  });
  var banDo = $("#nh-bando") && $("#nh-bando").checked;
  DB.luu(); UI.nhap = nhapMoi(); UI.form = null; UI.bai = dsBai[0]; vKho();
  toast("Đã lưu " + moi.length + " câu" + (dsBai.length > 1 ? " vào " + dsBai.length + " bài" : "") + ".");
  if (banDo) moAI("bando", dsBai[0]);
}

// ---------- Bắt sự kiện ----------
main.addEventListener("click", function (ev) {
  var hsEl = ev.target.closest("[data-hs]"), opt = ev.target.closest(".phone .opts button");
  if (opt && !opt.disabled) { hsBam("chon", opt); return; }
  if (hsEl) { hsBam(hsEl.dataset.hs, hsEl); return; }
  var baiEl = ev.target.closest("[data-bai]");
  if (baiEl) { UI.bai = baiEl.dataset.bai; UI.form = null; vKho(); return; }
  var el = ev.target.closest("[data-act]");
  if (!el || el.disabled) return;
  var act = el.dataset.act, id = el.dataset.id;
  if (act === "form-bai") { UI.form = "bai"; vKho(); }
  else if (act === "form-cau") { UI.form = "cau"; vKho(); }
  else if (act === "form-buoi") { UI.form = "buoi"; vKho(); }
  else if (act === "form-nhap") { UI.form = "nhap"; vKho(); }
  else if (act === "nhap-tab") { UI.nhap.tab = el.dataset.tab; vKho(); }
  else if (act === "nhap-tach") {
    var ds = NHAP.tach(UI.nhap.text);
    if (!ds.length) { toast("Không nhận ra câu nào. Thử «Nhờ AI tách câu»."); return; }
    UI.nhap.ds = ds.map(function (x) { x.bai = UI.bai; return x; }); UI.nhap.boQua = []; UI.nhap.trangThai = "";
    vKho(); toast("Tách được " + ds.length + " câu.");
  }
  else if (act === "nhap-ai") nhapBangAI();
  else if (act === "nhap-luu") luuNhap();
  else if (act === "nhap-xoa") { UI.nhap.ds = []; UI.nhap.boQua = []; vKho(); }
  else if (act === "huy") { UI.form = null; UI.yccdNhap = null; vKho(); }
  else if (act === "form-mon") { UI.form = "mon"; vKho(); }
  else if (act === "mon-huy") { UI.form = null; UI.mon = null; vKho(); }
  else if (act === "mon-tach") {
    var M = docFormMon(); M.chuong = NHAP.tachKhung(M.text);
    if (!M.chuong.length) { toast("Không nhận ra chương, bài nào. Thử «Nhờ AI tách khung»."); return; }
    vKho();
  }
  else if (act === "mon-ai") monBangAI();
  else if (act === "mon-luu") luuMon();
  else if (act === "yc-sua") { UI.form = "yccd"; UI.yccdNhap = null; vKho(); }
  else if (act === "yc-luu") {
    var b0 = timBai(UI.bai), ds0 = $("#yc-text").value.split("\n").map(function (s) { return s.replace(/^[\s\-•+*]+/, "").trim(); }).filter(Boolean);
    b0.goc.yccd = ds0; UI.form = null; UI.yccdNhap = null; DB.luu(); vKho(); toast("Đã lưu " + ds0.length + " yêu cầu cần đạt.");
  }
  else if (act === "yc-ai") yccdBangAI();
  else if (act === "luu-bai") {
    var ten = $("#fb-ten").value.trim(), nd = $("#fb-nd").value.trim();
    if (!ten) { toast("Nhập tên bài."); return; }
    var nid = "NG-" + String(DB.d.bai_ngoai.length + 1).padStart(3, "0");
    while (timBai(nid)) nid += "b";
    DB.d.bai_ngoai.push({ id: nid, ct: UI.ct, ten: ten, noi_dung: nd, tao_luc: new Date().toISOString() });
    DB.luu(); UI.bai = nid; UI.form = null; vKho(); toast("Đã thêm bài. Bấm «AI soạn câu hỏi».");
  }
  else if (act === "luu-cau") {
    var q = $("#fc-q").value.trim(), o = [0, 1, 2, 3].map(function (i) { return $("#fc-o" + i).value.trim(); }), d = +($("input[name=fc-d]:checked") || { value: 0 }).value;
    if (!q || o.some(function (x) { return !x; })) { toast("Nhập đủ câu hỏi và 4 phương án."); return; }
    var n = cauCuaBai(UI.bai).length + 1, cid = UI.bai + "-Q" + n;
    while (timCau(cid)) { n++; cid = UI.bai + "-Q" + n; }
    DB.d.ngan_hang.push({ id: cid, bai: UI.bai, nguon: "gv", trang_thai: "cho_duyet", q: q, o: o, d: d, loi: {}, lai: null });
    DB.luu(); UI.form = null; vKho(); toast("Đã lưu câu. Bấm «AI dựng bản đồ lỗi».");
  }
  else if (act === "xoa-cau") {
    if (!confirm("Xóa câu này khỏi kho?")) return;
    DB.d.ngan_hang = DB.d.ngan_hang.filter(function (c) { return c.id !== id; });
    DB.luu(); vKho();
  }
  else if (act === "duyet-het") {
    cauCuaBai(UI.bai).forEach(function (c) { if (coBanDo(c)) c.trang_thai = "da_duyet"; });
    DB.luu(); vKho();
  }
  else if (act === "ai-bando") moAI("bando", UI.bai);
  else if (act === "ai-soan") moAI("soan", UI.bai);
  else if (act === "luu-buoi") {
    var chon = $$("[data-chon]").filter(function (x) { return x.checked; }).map(function (x) { return x.dataset.chon; });
    if (!chon.length) { toast("Chọn ít nhất 1 câu."); return; }
    var pid = "P" + String(DB.d.phien.length + 1).padStart(3, "0");
    while (timPhien(pid)) pid += "b";
    var ma = maMoi();
    DB.d.phien.push({ id: pid, ma: ma, bai: UI.bai, lop: $("#fbu-lop").value, cau: chon, tao_luc: new Date().toISOString(), trang_thai: "mo" });
    DB.luu(); UI.form = null; toast("Đã mở buổi. Mã cho học sinh: " + ma); location.hash = "#buoi";
  }
  else if (act === "dong-buoi" || act === "mo-buoi") { timPhien(id).trang_thai = act === "dong-buoi" ? "dong" : "mo"; DB.luu(); vBuoi(); }
  else if (act === "xoa-buoi") {
    if (!confirm("Xóa buổi này và toàn bộ bài làm của buổi?")) return;
    DB.d.phien = DB.d.phien.filter(function (p) { return p.id !== id; });
    DB.d.ket_qua = DB.d.ket_qua.filter(function (k) { return k.phien !== id; });
    DB.luu(); vBuoi();
  }
  else if (act === "ket-noi") {
    DB.ketNoiThuMuc().then(function (ok) { toast(ok ? "Đã ghi dữ liệu vào thư mục db." : "Chưa ghi được: " + DB.loiGhi()); vDuLieu(); window.capNhatBanner(); })
      .catch(function (e) { if (e && e.name !== "AbortError") toast("Không kết nối được: " + e.message); });
  }
  else if (act === "tai-file") { DB.taiCacFile(); toast("Đang tải " + BANG.length + " file. Chép đè vào thư mục db."); }
  else if (act === "sao-luu") DB.saoLuu();
  else if (act === "bo-thay-doi") { if (confirm("Bỏ mọi thay đổi chưa ghi ra thư mục db?")) DB.boThayDoi(); }
});
main.addEventListener("change", function (ev) {
  var t = ev.target;
  if (t.dataset && t.dataset.duyet) { var c = timCau(t.dataset.duyet); c.trang_thai = t.checked ? "da_duyet" : "cho_duyet"; DB.luu(); vKho(); }
  else if (t.id === "kq-p") { UI.phienKQ = t.value; location.hash = "#ketqua?p=" + t.value; }
  else if (t.id === "nh-file" && t.files[0]) napFileNhap(t.files[0]);
  else if (t.id === "ct-chon") { UI.ct = t.value; UI.bai = null; UI.form = null; UI.nhap = nhapMoi(); ghiNhoMon(); vKho(); }
  else if (t.id === "nhap-file" && t.files[0]) {
    var fr = new FileReader();
    fr.onload = function () {
      try { DB.nhap(JSON.parse(fr.result)).then(function () { toast("Đã nhập file sao lưu."); route(); }, function (e) { toast(e.message); }); }
      catch (e) { toast("File không đúng định dạng JSON."); }
    };
    fr.readAsText(t.files[0], "utf-8");
  }
});

main.addEventListener("input", function (ev) {
  if (ev.target.id !== "nh-text") return;
  UI.nhap.text = ev.target.value;
  $$('[data-act="nhap-tach"],[data-act="nhap-ai"]').forEach(function (b) { b.disabled = !UI.nhap.text.trim(); });
});
main.addEventListener("dragover", function (ev) { var z = ev.target.closest("#nh-drop"); if (z) { ev.preventDefault(); z.classList.add("over"); } });
main.addEventListener("dragleave", function (ev) { var z = ev.target.closest("#nh-drop"); if (z) z.classList.remove("over"); });
main.addEventListener("drop", function (ev) {
  if (!ev.target.closest("#nh-drop")) return;
  ev.preventDefault();
  if (ev.dataTransfer.files[0]) napFileNhap(ev.dataTransfer.files[0]);
});

// Hình minh họa: nhờ AI vẽ (khi chỉ có mô tả) hoặc giáo viên tải hình chính thống lên — dùng được ở mọi màn có phần học lại
document.addEventListener("click", function (ev) {
  var b = ev.target.closest && ev.target.closest("[data-ve-hinh]");
  if (!b) return;
  var L = timLoi(b.dataset.veHinh);
  if (!L) return;
  chayAI("AI vẽ hình minh họa", AI.promptVeHinh(L, timBai(L.bai)), function (text) {
    var r = AI.docKetQua(text);
    if (r.loi.length) return r.loi;
    var svg = HINH.locSvg(r.obj && r.obj.svg);
    if (!svg) return ["Không đọc được hình SVG trong kết quả."];
    L.bai_giang.svg = svg; DB.luu();
    return null;
  }, function () { route(); toast("Đã vẽ xong hình minh họa."); });
});
document.addEventListener("change", function (ev) {
  var t = ev.target;
  if (!t.dataset || !t.dataset.taiHinh || !t.files[0]) return;
  var f = t.files[0], L = timLoi(t.dataset.taiHinh);
  if (!L) return;
  if (f.size > 400 * 1024) { toast("Hình lớn quá 400 KB, em thu nhỏ hoặc cắt bớt rồi tải lại."); return; }
  var fr = new FileReader();
  fr.onload = function () { L.bai_giang.anh = fr.result; DB.luu(); route(); toast("Đã thay bằng hình đã tải lên."); };
  fr.readAsDataURL(f);
});

route();
DB.sanSang.then(route);
