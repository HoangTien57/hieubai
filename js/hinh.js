// Thư viện hình minh họa vẽ bằng SVG, gọi theo mã: HINH.ve("khuech_tan"). Màu lấy từ biến CSS nên tự đổi theo nền sáng/tối.
// Thêm hình mới: viết một hàm trong HINH.ds rồi khai báo mô tả ở HINH.moTa để câu lệnh AI biết mà chọn.
var HINH = (function () {
  var dem = 0;
  function e(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function rnd(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  // n chấm chất tan rải trong hình chữ nhật (x, y, w, h)
  function cham(x, y, w, h, n, seed) {
    var r = rnd(seed), s = "";
    for (var i = 0; i < n; i++) s += '<circle class="h-sd" cx="' + (x + 6 + r() * (w - 12)).toFixed(1) + '" cy="' + (y + 6 + r() * (h - 12)).toFixed(1) + '" r="3.6"/>';
    return s;
  }
  function chu(x, y, s, neo, cls) {
    var dong = String(s).split("\n");
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (neo || "middle") + '"' + (cls ? ' class="' + cls + '"' : '') + '>' +
      dong.map(function (d, i) { return '<tspan x="' + x + '" dy="' + (i ? 14 : 0) + '">' + e(d) + '</tspan>'; }).join("") + '</text>';
  }
  function mui(x1, y1, x2, y2, loai) {
    return '<line class="' + (loai === "nuoc" ? "h-wa" : "h-ar") + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" marker-end="url(#ID' + (loai === "nuoc" ? "w" : "a") + ')"/>';
  }
  function boc(w, h, nhan, than) {
    var id = "hv" + (++dem);
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + e(nhan) + '"><defs>' +
      '<marker id="' + id + 'a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="h-mk" d="M0 0L10 5L0 10z"/></marker>' +
      '<marker id="' + id + 'w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="h-mkw" d="M0 0L10 5L0 10z"/></marker>' +
      '</defs>' + than.replace(/#ID/g, "#" + id) + '</svg>';
  }

  var ds = {
    khuech_tan: function () {
      return boc(360, 170, "Khuếch tán: chất tan đi từ nơi nồng độ cao sang nơi nồng độ thấp",
        '<rect class="h-box" x="10" y="20" width="340" height="100" rx="8"/><line class="h-mem" x1="180" y1="20" x2="180" y2="120"/>' +
        cham(14, 24, 160, 92, 22, 7) + cham(186, 24, 160, 92, 4, 3) +
        mui(130, 70, 232, 70) + chu(180, 13, "chất tan tự đi sang", "middle", "h-em") +
        chu(95, 140, "Nồng độ CAO\n(nhiều chất tan)") + chu(265, 140, "Nồng độ THẤP\n(ít chất tan)"));
    },
    nong_do: function () {
      var coc = function (x) { return '<path class="h-box" d="M' + x + ' 30 L' + (x + 110) + ' 30 L' + (x + 96) + ' 120 L' + (x + 14) + ' 120 Z"/>'; };
      return boc(360, 175, "So sánh nồng độ: cùng lượng nước, cốc nhiều chất tan hơn có nồng độ cao hơn",
        coc(35) + coc(215) + cham(52, 50, 76, 64, 5, 11) + cham(232, 50, 76, 64, 16, 5) +
        chu(90, 20, "Cốc A · 200 ml nước") + chu(270, 20, "Cốc B · 200 ml nước") +
        chu(90, 140, "1 thìa đường\n→ nồng độ THẤP") + chu(270, 140, "3 thìa đường\n→ nồng độ CAO"));
    },
    tham_thau: function () {
      return boc(360, 185, "Thẩm thấu: nước đi từ dung dịch loãng sang dung dịch đặc",
        '<rect class="h-box" x="10" y="20" width="340" height="110" rx="8"/>' +
        '<rect class="h-water" x="12" y="62" width="166" height="66"/><rect class="h-water" x="182" y="38" width="166" height="90"/>' +
        '<line class="h-mem" x1="180" y1="20" x2="180" y2="130"/>' + cham(16, 66, 158, 58, 4, 9) + cham(186, 42, 158, 82, 18, 4) +
        mui(120, 100, 240, 100, "nuoc") + chu(180, 13, "nước đi sang bên đặc", "middle", "h-emw") +
        chu(95, 150, "Dung dịch LOÃNG\nnhiều nước, ít chất tan") + chu(265, 150, "Dung dịch ĐẶC\nít nước, nhiều chất tan"));
    },
    uu_truong: function () {
      var o = function (x, n, r, chieu, s1, s2) {
        var cx = x + 55, s = '<rect class="h-box" x="' + x + '" y="20" width="110" height="100" rx="8"/>' + cham(x + 2, 22, 106, 96, n, x + 3) +
          '<circle class="h-cell" cx="' + cx + '" cy="70" r="' + r + '"/>';
        if (chieu === "ra") s += mui(cx + r - 2, 70, cx + r + 20, 70, "nuoc") + mui(cx - r + 2, 70, cx - r - 20, 70, "nuoc");
        else if (chieu === "vao") s += mui(cx + r + 22, 70, cx + r + 2, 70, "nuoc") + mui(cx - r - 22, 70, cx - r - 2, 70, "nuoc");
        else s += mui(cx + r + 4, 62, cx + r + 20, 62, "nuoc") + mui(cx + r + 20, 78, cx + r + 4, 78, "nuoc");
        return s + chu(cx, 140, s1, "middle", "h-b") + chu(cx, 156, s2);
      };
      return boc(370, 195, "Tế bào trong môi trường ưu trương, đẳng trương và nhược trương",
        o(5, 22, 16, "ra", "Ưu trương", "ngoài nhiều chất tan hơn\n→ nước đi RA, tế bào co") +
        o(130, 11, 24, "can", "Đẳng trương", "bằng nhau\n→ tế bào giữ nguyên") +
        o(255, 3, 33, "vao", "Nhược trương", "ngoài ít chất tan hơn\n→ nước đi VÀO, tế bào trương"));
    },
    van_chuyen: function () {
      return boc(370, 215, "Vận chuyển thụ động và vận chuyển chủ động qua màng",
        '<rect class="h-mem-band" x="10" y="85" width="350" height="30"/>' + chu(14, 16, "Ngoài tế bào", "start", "h-mu") + chu(14, 206, "Trong tế bào", "start", "h-mu") +
        cham(30, 22, 130, 58, 14, 21) + cham(30, 120, 130, 55, 3, 8) +
        '<rect class="h-pro" x="84" y="80" width="22" height="40" rx="4"/>' + mui(95, 50, 95, 158) +
        cham(205, 22, 130, 58, 3, 13) + cham(205, 120, 130, 55, 14, 17) +
        '<rect class="h-pump" x="258" y="78" width="28" height="44" rx="6"/>' + chu(272, 104, "ATP", "middle", "h-b") + mui(272, 50, 272, 158) +
        chu(95, 190, "Thụ động: cao → thấp\nkhông tốn ATP") + chu(272, 190, "Chủ động: thấp → cao\ncần bơm + ATP"));
    },
    mang: function () {
      var dau = "";
      for (var x = 18; x < 352; x += 16) {
        if (x > 220 && x < 262) continue;
        dau += '<circle class="h-head" cx="' + x + '" cy="78" r="6"/><circle class="h-head" cx="' + x + '" cy="132" r="6"/>' +
          '<line class="h-tail" x1="' + (x - 2) + '" y1="84" x2="' + (x - 2) + '" y2="104"/><line class="h-tail" x1="' + (x + 2) + '" y1="84" x2="' + (x + 2) + '" y2="104"/>' +
          '<line class="h-tail" x1="' + (x - 2) + '" y1="106" x2="' + (x - 2) + '" y2="126"/><line class="h-tail" x1="' + (x + 2) + '" y1="106" x2="' + (x + 2) + '" y2="126"/>';
      }
      return boc(370, 215, "Màng phospholipid: O₂ đi thẳng qua, ion cần kênh protein",
        dau + '<rect class="h-pro" x="224" y="68" width="36" height="74" rx="6"/>' +
        chu(60, 30, "O₂") + mui(60, 38, 60, 170) +
        chu(150, 30, "Na⁺") + '<line class="h-ar" x1="150" y1="38" x2="150" y2="62"/>' + chu(150, 80, "✕", "middle", "h-x") +
        chu(242, 30, "K⁺") + mui(242, 38, 242, 170) +
        chu(60, 190, "nhỏ, không phân cực\n→ lọt thẳng qua") + chu(150, 190, "ion ưa nước\n→ bị lớp mỡ chặn") + chu(242, 190, "đi qua\nkênh protein") +
        chu(330, 105, "lớp\nmỡ", "middle", "h-mu"));
    },
    nhap_xuat: function () {
      return boc(370, 200, "Nhập bào (thực bào) và xuất bào",
        '<path class="h-cellline" d="M10 60 L60 60 Q70 60 72 75 Q80 118 100 118 Q120 118 128 75 Q130 60 140 60 L175 60"/>' +
        '<circle class="h-thing" cx="100" cy="88" r="16"/>' + mui(100, 20, 100, 52) +
        chu(14, 46, "Ngoài", "start", "h-mu") + chu(14, 150, "Trong tế bào", "start", "h-mu") +
        chu(92, 172, "Nhập bào (thực bào):\nmàng lõm vào bao lấy vật") +
        '<path class="h-cellline" d="M195 60 L250 60 Q262 60 265 50 L275 50 Q278 60 290 60 L360 60"/>' +
        '<circle class="h-ves" cx="270" cy="96" r="20"/>' + cham(256, 82, 28, 28, 4, 31) +
        cham(255, 18, 30, 24, 4, 37) + mui(300, 100, 300, 26) +
        chu(200, 46, "Ngoài", "start", "h-mu") + chu(200, 150, "Trong tế bào", "start", "h-mu") +
        chu(278, 172, "Xuất bào: túi dính vào\nmàng, đổ chất ra ngoài"));
    }
  };

  var moTa = {
    khuech_tan: "chất tan đi từ nơi nồng độ cao sang nơi nồng độ thấp qua màng",
    nong_do: "hai cốc cùng lượng nước, khác lượng đường: so nồng độ cao, thấp",
    tham_thau: "nước đi từ dung dịch loãng sang dung dịch đặc qua màng",
    uu_truong: "tế bào trong môi trường ưu trương, đẳng trương, nhược trương",
    van_chuyen: "vận chuyển thụ động (cao → thấp) và chủ động (thấp → cao, có bơm + ATP)",
    mang: "lớp phospholipid: O₂ lọt qua, ion bị chặn, ion đi qua kênh protein",
    nhap_xuat: "nhập bào (màng lõm vào bao lấy vật) và xuất bào (túi dính vào màng đổ chất ra)"
  };

  // Hình AI tự vẽ: chỉ giữ thẻ và thuộc tính vẽ an toàn (bỏ script, sự kiện on…, liên kết, ảnh ngoài)
  var THE = { svg: 1, g: 1, defs: 1, marker: 1, rect: 1, circle: 1, ellipse: 1, line: 1, polyline: 1, polygon: 1, path: 1, text: 1, tspan: 1, title: 1 };
  var THUOC_TINH = /^(viewbox|x|y|x1|y1|x2|y2|cx|cy|r|rx|ry|width|height|d|points|class|transform|text-anchor|dominant-baseline|dx|dy|id|refx|refy|markerwidth|markerheight|orient|marker-end|marker-start|font-size|font-weight|fill|stroke|stroke-width|stroke-dasharray|stroke-linecap|opacity|fill-opacity|role|aria-label|xmlns)$/;
  function locSvg(chu) {
    if (!chu || typeof window.DOMParser !== "function") return "";
    var doc = new window.DOMParser().parseFromString(String(chu), "image/svg+xml"), goc = doc.documentElement;
    if (!goc || goc.nodeName.toLowerCase() !== "svg" || doc.getElementsByTagName("parsererror").length) return "";
    (function duyet(n) {
      [].slice.call(n.children).forEach(function (c) { if (!THE[c.nodeName.toLowerCase()]) n.removeChild(c); else duyet(c); });
      [].slice.call(n.attributes).forEach(function (a) {
        var ten = a.name.toLowerCase(), gt = a.value;
        if (!THUOC_TINH.test(ten) || /javascript:|data:|expression\(/i.test(gt) || (/url\(/i.test(gt) && !/^url\(#[\w-]+\)$/.test(gt.trim()))) n.removeAttribute(a.name);
      });
    })(goc);
    if (!goc.getAttribute("viewBox")) goc.setAttribute("viewBox", "0 0 360 200");
    goc.removeAttribute("width"); goc.removeAttribute("height");
    return new window.XMLSerializer().serializeToString(goc);
  }

  return {
    locSvg: locSvg,
    veSvg: function (chu) { var s = locSvg(chu); return s ? '<div class="hinh hinh-ai">' + s + '<span class="small muted">Hình minh họa do AI vẽ</span></div>' : ""; },
    lopMau: "h-box (khung, nền trắng viền xám), h-water (nền xanh nhạt như nước), h-sd (chấm đậm: phân tử, hạt), h-ar (mũi tên, nét đỏ), h-wa (mũi tên, nét xanh lá), h-cell (vật thể chính: tế bào, hình chính, tô tím nhạt), h-pro (vật thể phụ, tô xanh lá nhạt), h-mem (đường nét đứt màu cam), h-head (chấm cam nhỏ)",
    co: function (ma) { return !!(ma && ds[ma]); },
    ve: function (ma) { return ds[ma] ? '<div class="hinh">' + ds[ma]() + '</div>' : ""; },
    danhSach: function () { return Object.keys(moTa).map(function (k) { return k + ": " + moTa[k]; }); }
  };
})();
