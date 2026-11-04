// Nhập câu hỏi hàng loạt: tách câu từ văn bản dán vào (chạy ngay trên máy, không cần AI) và đọc chữ từ file PDF, Word, txt.
// Thư viện đọc PDF (pdf.js) và Word (mammoth) chỉ được tải về khi giáo viên chọn file loại đó.
var NHAP = (function () {
  // Dòng thừa hay gặp khi chép từ trang web
  var RAC = [/^hiển thị (đáp án|lời giải)$/i, /^xem (đáp án|lời giải|thêm|giải thích)\b/i, /arrow_forward/i, /^đọc thêm$/i,
    /^(pause|play|mute|unmute|replay|fullscreen)$/i, /^\d{1,2}:\d{2}(:\d{2})?$/, /^(quảng cáo|advertisement|ads?)$/i];
  var DAU_CAU = /^\s*(?:câu|question|bài)\s*(\d+)\s*[:.)\-–]\s*/i;
  var DAP_AN = /^\s*(?:đáp án|đáp số|chọn|answer)\s*(?:đúng)?\s*(?:là)?\s*[:\-–]?\s*([A-D])\b/i;
  var LOI_GIAI = /^\s*(?:lời giải|giải thích|hướng dẫn( giải)?|phương pháp)\b/i;
  var DAU_PA = /^\s*A\s*[.)]/;

  function sach(text) {
    return String(text || "").replace(/\r/g, "").replace(/ /g, " ").split("\n")
      .map(function (d) { return d.replace(/\s+$/, ""); })
      .filter(function (d) { var t = d.trim(); return t && !RAC.some(function (r) { return r.test(t); }); });
  }

  // Tìm lần lượt A. B. C. D. (hoặc A) B) …), cho phép nhiều phương án trên cùng một dòng
  function tachPhuongAn(vung) {
    var vt = [], tu = 0;
    for (var i = 0; i < 4; i++) {
      var re = new RegExp("(^|\\s)" + "ABCD"[i] + "\\s*[.)]\\s*", "g");
      re.lastIndex = tu;
      var m = re.exec(vung);
      if (!m) break;
      vt.push({ bd: m.index + m[1].length, nd: m.index + m[0].length });
      tu = m.index + m[0].length;
    }
    return vt.map(function (p, i) {
      var het = i + 1 < vt.length ? vt[i + 1].bd : vung.length;
      return vung.slice(p.nd, het).replace(/\s+/g, " ").trim();
    });
  }

  function mot(dong) {
    var than = [], vung = [], d = null, dangPA = false, dung = false;
    dong.forEach(function (l) {
      var m = l.match(DAP_AN);
      if (m) { d = "ABCD".indexOf(m[1].toUpperCase()); dung = true; return; }
      if (LOI_GIAI.test(l)) { dung = true; return; }
      if (dung) return;
      if (!dangPA && DAU_PA.test(l)) dangPA = true;
      (dangPA ? vung : than).push(l.trim());
    });
    // Phương án nằm luôn trên dòng câu hỏi: «… là? A. x B. y C. z D. t»
    if (!vung.length && than.length) {
      var cuoi = than[than.length - 1], k = cuoi.search(/\sA\s*[.)]\s/);
      if (k > 0) { vung.push(cuoi.slice(k + 1)); than[than.length - 1] = cuoi.slice(0, k); }
    }
    var o = tachPhuongAn(vung.join("\n")), canh = [];
    if (o.length < 4) canh.push("Chỉ nhận ra " + o.length + " phương án, bổ sung cho đủ 4.");
    if (d === null) canh.push("Đề không ghi đáp án: chọn nút tròn ở phương án đúng.");
    return { q: than.join("\n").trim(), o: o, d: d, canh: canh };
  }

  function tach(text) {
    var dong = sach(text), khoi = [], hien = null;
    dong.forEach(function (l) {
      if (DAU_CAU.test(l)) { hien = [l.replace(DAU_CAU, "")]; khoi.push(hien); }
      else if (hien) hien.push(l);
    });
    if (!khoi.length && dong.length) khoi.push(dong);
    return khoi.map(mot).filter(function (x) { return x.q || x.o.length; });
  }

  function napScript(src) {
    return new Promise(function (ok, loi) {
      var s = document.createElement("script");
      s.src = src; s.onload = ok;
      s.onerror = function () { loi(new Error("Không tải được thư viện đọc file (cần có mạng).")); };
      document.head.appendChild(s);
    });
  }

  var PDFJS = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/";
  function docPdf(buf) {
    var san = window.pdfjsLib ? Promise.resolve() : napScript(PDFJS + "pdf.min.js").then(function () {
      // Trang mở từ file:// không được chạy worker ở địa chỉ khác, nên tải mã worker về rồi chạy qua blob
      return fetch(PDFJS + "pdf.worker.min.js").then(function (r) { return r.text(); }).then(function (ma) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([ma], { type: "text/javascript" }));
      });
    });
    return san.then(function () { return window.pdfjsLib.getDocument({ data: buf }).promise; }).then(function (pdf) {
      var trang = [];
      for (var i = 1; i <= pdf.numPages; i++) trang.push(i);
      return Promise.all(trang.map(function (i) {
        return pdf.getPage(i).then(function (pg) { return pg.getTextContent(); }).then(function (tc) {
          return tc.items.map(function (it) { return it.str + (it.hasEOL ? "\n" : ""); }).join("");
        });
      })).then(function (ds) {
        var chu = ds.join("\n");
        if (!chu.trim()) throw new Error("File PDF không có lớp chữ (có thể là ảnh quét). Dùng bản Word hoặc PDF xuất từ Word.");
        return chu;
      });
    });
  }

  function docWord(buf) {
    var san = window.mammoth ? Promise.resolve() : napScript("https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js");
    return san.then(function () { return window.mammoth.extractRawText({ arrayBuffer: buf }); }).then(function (r) { return r.value; });
  }

  function docFile(file) {
    var ten = file.name.toLowerCase();
    return file.arrayBuffer().then(function (buf) {
      if (/\.pdf$/.test(ten)) return docPdf(buf);
      if (/\.docx$/.test(ten)) return docWord(buf);
      if (/\.txt$/.test(ten)) return new TextDecoder("utf-8").decode(buf);
      throw new Error("Chỉ nhận file .pdf, .docx hoặc .txt (file .doc cũ: mở bằng Word rồi lưu lại thành .docx).");
    });
  }

  // Khung chương trình: «Chương/Chủ đề/Phần/Unit …» mở chương mới; «Bài 3. …» là bài; dòng «- …» dưới một bài là yêu cầu cần đạt
  var DAU_CHUONG = /^\s*(?:chương|chủ đề|phần|unit|chuyên đề)\b/i;
  var DAU_BAI = /^\s*(?:bài|lesson|tiết)\s*(\d+)\s*[.:)\-–]?\s*(.*)$/i;
  var DAU_GACH = /^\s*[-•+*–]\s*(.+)$/;
  function tachKhung(text) {
    var ds = [], ch = null, bai = null;
    sach(text).forEach(function (l) {
      var t = l.trim(), m;
      if (DAU_CHUONG.test(t)) { ch = { ten: t.replace(/\s*\(\s*\d+\s*tiết\s*\)\s*$/i, ""), bai: [] }; ds.push(ch); bai = null; return; }
      if ((m = t.match(DAU_BAI))) {
        if (!ch) { ch = { ten: "Chương chung", bai: [] }; ds.push(ch); }
        bai = { so: +m[1], ten: m[2].replace(/\s*\(\s*\d+\s*tiết\s*\)\s*$/i, "").trim() || "Bài " + m[1], yccd: [] };
        ch.bai.push(bai); return;
      }
      if (bai && (m = t.match(DAU_GACH))) bai.yccd.push(m[1].trim());
    });
    return ds.filter(function (c) { return c.bai.length; });
  }

  return { tach: tach, docFile: docFile, tachKhung: tachKhung };
})();
