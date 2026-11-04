// Phần AI: soạn câu lệnh, đọc và kiểm kết quả JSON, nạp vào kho.
// Đường gọi AI, theo thứ tự: cầu nối cau_noi.py (Claude Code trên máy) → API (khi có key, điền CAU_HINH_AI và viết nhánh API trong goiAPI)
// → không có gì thì giáo viên sao chép câu lệnh sang Claude/Copilot/Gemini rồi dán kết quả lại.
var CAU_HINH_AI = { endpoint: "", api_key: "", model: "" };
var KEYS = ["A", "B", "C", "D"];
var MUC_BAC = { hieu_tu: "Hiểu từ", ap_dung: "Áp dụng", gan_cau_goc: "Gần câu gốc" };

var AI = {
  coCauNoi: function () { var c = DB.cauNoi(); return !!(c && c.ai); },
  daNoi: function () { return AI.coCauNoi() || !!(CAU_HINH_AI.endpoint && CAU_HINH_AI.api_key); },
  tenNguon: function () { return AI.coCauNoi() ? "Claude trên máy (cầu nối)" : "API"; },

  goiAPI: function (cauLenh) {
    if (AI.coCauNoi()) {
      return fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cau_lenh: cauLenh }) })
        .then(function (r) { return r.json(); })
        .then(function (j) { if (j.loi) throw new Error(j.loi); return j.ket_qua; });
    }
    return Promise.reject(new Error("Chưa viết nhánh gọi API trong js/ai.js"));
  },

  promptTach: function (vanBan, mon, lop, dsBai) {
    return "Bạn là giáo viên " + mon + " lớp " + lop + ". Dưới đây là văn bản chép từ một đề kiểm tra hoặc trang web, có thể lẫn chữ thừa. Hãy tách ra các câu trắc nghiệm.\n\n" +
      "Yêu cầu:\n- Giữ nguyên nội dung câu hỏi và phương án; chỉ bỏ chữ thừa (như «Hiển thị đáp án», tên nút bấm, thời gian video, quảng cáo). Giữ các ý (1), (2)… trong câu hỏi, mỗi ý một dòng (dùng \\n).\n" +
      "- Bỏ chữ cái «A.», «B.»… ở đầu phương án.\n" +
      "- d là chỉ số đáp án đúng (0 = A). Nếu văn bản có ghi đáp án thì dùng đáp án đó và ghi \"nguon_dap_an\":\"de\"; nếu không, tự giải cẩn thận và ghi \"nguon_dap_an\":\"ai\".\n" +
      "- bai: mã bài phù hợp nhất trong danh sách sau, không chắc thì null:\n" + dsBai.map(function (b) { return "  " + b.id + ": " + b.ten; }).join("\n") + "\n" +
      "- Chỉ lấy câu có đúng 4 phương án; câu khác ghi tóm tắt vào \"bo_qua\".\n\n" +
      "Chỉ trả về đúng một khối JSON, không giải thích thêm:\n" +
      "- muc: mức độ của câu: \"biet\", \"hieu\" hoặc \"van_dung\".\n" +
      "- dung_mon: false nếu câu thuộc môn hoặc lớp khác, hoặc ngoài chương trình môn " + mon + " lớp " + lop + "; khi đó mon_goi_y ghi môn – lớp phù hợp (vd «Sinh học 12») và bai là null.\n" +
      '{"cau":[{"q":"...","o":["...","...","...","..."],"d":0,"nguon_dap_an":"de","bai":"<mã bài hoặc null>","muc":"biet","dung_mon":true,"mon_goi_y":""}],"bo_qua":["..."]}\n\n' +
      "Văn bản:\n<<<\n" + vanBan + "\n>>>\n";
  },

  // Luyện đề: AI soạn đề theo môn, học kì, số câu; mỗi câu gắn bài và mức độ (lộ trình ôn lại dựng sau, khi học sinh làm sai)
  promptTaoDe: function (ct, hocKy, n, dsBai) {
    return "Bạn là giáo viên " + ct.mon + " lớp " + ct.lop + ". Hãy soạn một đề luyện tập trắc nghiệm " + n + " câu, mỗi câu 4 phương án, cho học kì " + hocKy + ".\n\n" +
      "Phạm vi (chỉ lấy kiến thức trong các bài sau):\n" + dsBai.map(function (b) { return "  " + b.id + ": " + b.ten + (b.yccd.length ? " — " + b.yccd.join("; ") : ""); }).join("\n") + "\n\n" +
      "Yêu cầu:\n- Rải đều câu hỏi trên các bài trong phạm vi; khoảng 40% mức biết, 30% hiểu, 30% vận dụng.\n" +
      "- Mỗi phương án sai là một cách hiểu sai thường gặp của học sinh, không dùng phương án vô lí. Mỗi câu có đúng một đáp án đúng.\n" +
      "- Vị trí đáp án đúng rải đều A, B, C, D. Chỉ dùng kiến thức trong chương trình lớp " + ct.lop + ". Viết tiếng Việt; kí hiệu viết như O₂, Na⁺, x².\n" +
      "- bai: mã bài của câu trong danh sách trên. muc: \"biet\", \"hieu\" hoặc \"van_dung\". d: chỉ số đáp án đúng (0 = A).\n\n" +
      "Chỉ trả về đúng một khối JSON, không giải thích thêm:\n" +
      '{"ten":"<tên ngắn của đề>","cau":[{"q":"...","o":["...","...","...","..."],"d":0,"bai":"<mã bài>","muc":"biet"}]}\n';
  },

  kiemDeAI: function (obj) {
    var e = AI.kiemTach(obj);
    return e;
  },

  // Thời gian chuẩn của đề: biết 1 phút, hiểu 1,5 phút, vận dụng 2,5 phút mỗi câu; làm tròn lên bước 5 phút, ít nhất 5 phút
  thoiGianDe: function (dsCau) {
    var p = { biet: 1, hieu: 1.5, van_dung: 2.5 }, tong = 0;
    dsCau.forEach(function (c) { tong += p[c.muc] || 1.5; });
    return Math.max(5, Math.ceil(tong / 5) * 5);
  },

  // Ôn lại một câu học sinh làm sai: AI nêu cách hiểu sai ứng với phương án đã chọn và dựng lộ trình gỡ
  promptLoTrinh: function (c, k, bai, loiCo) {
    return "Bạn là giáo viên " + bai.ct.mon + " lớp " + bai.ct.lop + " giỏi giải thích cho học sinh yếu. Một học sinh làm sai câu trắc nghiệm dưới đây. Hãy dựng một bài học lại ngắn để gỡ đúng chỗ em hiểu sai.\n\n" +
      AI.moTaBai(bai) + "\nCâu hỏi: " + c.q + "\n" + c.o.map(function (o, i) { return KEYS[i] + ". " + o; }).join("\n") +
      "\nĐáp án đúng: " + KEYS[c.d] + "\nHọc sinh " + (k === null ? "bỏ trống, không biết làm câu này" : "chọn: " + KEYS[k]) + (loiCo ? "\nCách hiểu sai đã ghi nhận cho phương án này: " + loiCo : "") + "\n\nYêu cầu:\n" +
      (k === null ? "- ten: tên ngắn của chỗ kiến thức em còn hổng khiến em không làm được (cho giáo viên đọc); hs: một câu nhẹ nhàng nói với em, mở đầu bằng «Có thể em chưa nắm…».\n"
        : "- ten: tên ngắn của cách hiểu sai khiến em chọn " + KEYS[k] + " (cho giáo viên đọc); hs: một câu nhẹ nhàng nói với em, mở đầu bằng «Có thể em đang nghĩ…».\n") +
      "- thuat_ngu: 2–4 từ chuyên ngành em phải hiểu để làm đúng câu này; mỗi từ có dinh_nghia bằng lời đơn giản và vi_du đời thường, cụ thể.\n" +
      "- hien_tuong: giải thích lại kiến thức bằng lời dễ hiểu, 3–5 câu, có so sánh đời thường. vi_du: một ví dụ cụ thể, gần gũi.\n" +
      "- hinh: một mã hình có sẵn nếu khớp, nếu không thì null và ghi mo_ta_hinh. Mã hình có sẵn:\n" +
      HINH.danhSach().map(function (s) { return "    " + s; }).join("\n") + "\n" + AI.quyTacSvg("- ") +
      "- bac_thang: đúng 4 câu từ dễ đến khó, mỗi câu 2–3 phương án, có giai: 2 câu «hieu_tu» kiểm tra các thuật ngữ, 1 câu «ap_dung», 1 câu «gan_cau_goc» giống câu gốc nhưng khác tình huống. d là chỉ số đáp án đúng (0 = A).\n\n" +
      "Chỉ trả về đúng một khối JSON, không giải thích thêm:\n" +
      '{"ten":"...","hs":"Có thể em đang nghĩ ...","thuat_ngu":[{"ten":"...","dinh_nghia":"...","vi_du":"..."}],"hien_tuong":"...","vi_du":"...","hinh":null,"mo_ta_hinh":"...","svg":"<svg viewBox=\\"0 0 360 200\\">…</svg>",' +
      '"bac_thang":[{"muc":"hieu_tu","q":"...","o":["...","..."],"d":0,"giai":"..."}]}\n';
  },

  kiemLoTrinh: function (l) {
    var e = [];
    if (!l || !l.ten) e.push("Thiếu «ten».");
    if (!l || !Array.isArray(l.thuat_ngu) || !l.thuat_ngu.length) e.push("Thiếu «thuat_ngu».");
    if (!l || !l.hien_tuong) e.push("Thiếu «hien_tuong».");
    if (!l || !Array.isArray(l.bac_thang) || l.bac_thang.length < 3) e.push("Cần ít nhất 3 câu trong «bac_thang».");
    else l.bac_thang.forEach(function (g, j) { AI.kiemCauNho(g, "Bậc " + (j + 1), e); });
    return e;
  },

  // Ghi lộ trình vào bảng lỗi tư duy và gắn vào phương án học sinh đã chọn; trả về mã lỗi
  napLoTrinh: function (l, c, k, bai) {
    var n = DB.d.loi_tu_duy.filter(function (x) { return x.bai === bai.id; }).length + 1, id = bai.id + "-L" + n;
    while (DB.d.loi_tu_duy.some(function (x) { return x.id === id; })) { n++; id = bai.id + "-L" + n; }
    DB.d.loi_tu_duy.push({
      id: id, bai: bai.id, nguon: "ai", ten: String(l.ten), hs: String(l.hs || ""),
      bai_giang: { thuat_ngu: l.thuat_ngu.map(AI.napThuatNgu), hien_tuong: String(l.hien_tuong), vi_du: String(l.vi_du || ""),
        hinh: HINH.co(l.hinh) ? l.hinh : null, mo_ta_hinh: HINH.co(l.hinh) ? "" : String(l.mo_ta_hinh || ""), svg: HINH.co(l.hinh) ? "" : HINH.locSvg(l.svg) },
      bac_thang: l.bac_thang.map(function (g) { return { muc: MUC_BAC[g.muc] ? g.muc : "ap_dung", q: String(g.q), o: g.o.map(String), d: +g.d, giai: String(g.giai || "") }; })
    });
    c.loi = c.loi || {};
    c.loi[k] = id;
    return id;
  },

  promptYCCD: function (bai) {
    return "Bạn là giáo viên " + bai.ct.mon + " lớp " + bai.ct.lop + " am hiểu Chương trình giáo dục phổ thông 2018. Hãy viết 2–4 yêu cầu cần đạt cho bài dưới đây, bám sát văn phong của Chương trình 2018 (bắt đầu bằng động từ như «Nêu được», «Trình bày được», «Giải thích được», «Vận dụng được»).\n\n" +
      "Môn: " + bai.ct.mon + " " + bai.ct.lop + "\nChương: " + bai.chuong + "\nBài: " + bai.ten + "\n" +
      (bai.noi_dung ? "Nội dung bài do giáo viên cung cấp:\n" + bai.noi_dung + "\n" : "") +
      '\nChỉ trả về đúng một khối JSON, không giải thích thêm:\n{"yccd":["...","..."]}\n';
  },

  promptKhung: function (vanBan, mon, lop) {
    return "Dưới đây là khung chương trình (kế hoạch dạy học) môn " + mon + " lớp " + lop + " do giáo viên dán vào, có thể lẫn chữ thừa như số tiết, tuần, cột bảng. Hãy tách thành danh sách chương và bài.\n\n" +
      "Yêu cầu:\n- Giữ nguyên tên chương, tên bài như văn bản; bỏ số tiết, tuần, ghi chú.\n- so là số thứ tự bài nếu văn bản có ghi, không có thì null.\n" +
      "- yccd: các yêu cầu cần đạt của bài nếu văn bản có ghi; nếu không có thì để mảng rỗng, không tự bịa.\n" +
      "- Bài ôn tập, kiểm tra vẫn giữ nếu văn bản có.\n\n" +
      'Chỉ trả về đúng một khối JSON, không giải thích thêm:\n{"chuong":[{"ten":"Chương I. ...","bai":[{"so":1,"ten":"...","yccd":["..."]}]}]}\n\n' +
      "Văn bản:\n<<<\n" + vanBan + "\n>>>\n";
  },

  kiemKhung: function (obj) {
    var e = [];
    if (!obj || !Array.isArray(obj.chuong) || !obj.chuong.length) return ["Không có chương nào trong «chuong»."];
    obj.chuong.forEach(function (c, i) {
      if (!c.ten) e.push("Chương " + (i + 1) + " thiếu «ten».");
      if (!Array.isArray(c.bai) || !c.bai.length) e.push("Chương " + (i + 1) + " chưa có bài nào.");
      else c.bai.forEach(function (b, j) { if (!b.ten) e.push("Chương " + (i + 1) + ", bài " + (j + 1) + " thiếu «ten»."); });
    });
    return e;
  },

  kiemTach: function (obj) {
    var e = [];
    if (!obj || !Array.isArray(obj.cau) || !obj.cau.length) return ["Không có câu nào trong «cau»."];
    obj.cau.forEach(function (x, i) {
      if (!x.q) e.push("Câu " + (i + 1) + " thiếu «q».");
      if (!Array.isArray(x.o) || x.o.length !== 4) e.push("Câu " + (i + 1) + " cần đúng 4 phương án.");
      else if (!(x.d >= 0 && x.d < 4)) e.push("Câu " + (i + 1) + " có «d» không hợp lệ.");
    });
    return e;
  },

  mauLoi: '"loi_tu_duy":[{"ma":"M1","ten":"<tên lỗi, cho giáo viên>","hs":"Có thể em đang nghĩ ...",\n' +
    '   "thuat_ngu":[{"ten":"<từ chuyên ngành>","dinh_nghia":"<giải thích bằng lời đơn giản>","vi_du":"<ví dụ đời thường>"}],\n' +
    '   "hien_tuong":"<giải thích lại hiện tượng, 3–5 câu>","vi_du":"<một ví dụ cụ thể, gần gũi>","hinh":"<mã hình hoặc null>","mo_ta_hinh":"<mô tả hình nên vẽ nếu không có mã phù hợp>","svg":"<svg viewBox=\\"0 0 360 200\\">…</svg> hoặc null",\n' +
    '   "bac_thang":[{"muc":"hieu_tu","q":"...","o":["...","..."],"d":0,"giai":"<giải thích hiện ra sau khi trả lời đúng>"}]}]',

  quyTacChung: function (mon, lop) {
    return "- Với mỗi phương án SAI, nêu đúng cách hiểu sai khiến học sinh chọn nó (lỗi tư duy). Các phương án sai cùng một cách hiểu sai thì dùng chung một mã.\n" +
      "- Mỗi lỗi tư duy là một bài học lại ngắn cho học sinh đã chọn sai, gồm:\n" +
      "  · ten: tên lỗi ngắn gọn cho giáo viên; hs: một câu nhẹ nhàng nói với học sinh, mở đầu bằng «Có thể em đang nghĩ…».\n" +
      "  · thuat_ngu: 2–4 từ chuyên ngành học sinh phải hiểu thì mới làm đúng câu này (ví dụ: chất tan, nồng độ, nồng độ cao/thấp…). Mỗi từ có dinh_nghia viết bằng lời đơn giản cho học sinh lớp " + lop + " và vi_du là ví dụ đời thường, cụ thể (có số liệu nếu được).\n" +
      "  · hien_tuong: giải thích lại kiến thức, hiện tượng bằng lời dễ hiểu, 3–5 câu, có so sánh đời thường. vi_du: một ví dụ cụ thể, gần gũi.\n" +
      "  · hinh: chọn một mã hình có sẵn nếu khớp nội dung, nếu không thì null và ghi mo_ta_hinh để giáo viên bổ sung hình. Mã hình có sẵn:\n" +
      HINH.danhSach().map(function (s) { return "      " + s; }).join("\n") + "\n" +
      AI.quyTacSvg("      ") +
      "  · bac_thang: đúng 4 câu đi từ dễ đến khó, mỗi câu 2–3 phương án, có giai (giải thích ngắn): 2 câu «hieu_tu» kiểm tra đúng các thuật ngữ vừa giải thích (ví dụ: «Trong các chất sau, chất nào là chất tan?», «Dung dịch nào có nồng độ cao hơn?»); 1 câu «ap_dung» áp dụng vào tình huống đơn giản; 1 câu «gan_cau_goc» gần giống câu gốc nhưng khác tình huống, để mở dần ra chỗ sai.\n" +
      "- Không cần câu kiểm tra lại: sau lộ trình này học sinh sẽ làm lại chính câu gốc.\n" +
      "- d là chỉ số đáp án đúng, đếm từ 0. Chỉ dùng kiến thức trong chương trình " + mon + " lớp " + lop + ". Viết tiếng Việt; kí hiệu viết như O₂, Na⁺.\n";
  },

  quyTacSvg: function (le) {
    return le + "· svg: khi hinh là null, tự vẽ đúng hình trong mo_ta_hinh bằng mã SVG gọn: viewBox=\"0 0 360 200\"; chỉ dùng g, rect, circle, ellipse, line, polyline, polygon, path, text, tspan, defs, marker; " +
      "tô màu bằng thuộc tính class với các lớp: " + HINH.lopMau + "; chữ tiếng Việt ngắn, font-size 11–13, đặt trong khung, không chồng lên hình; không dùng script, style, ảnh hay liên kết ngoài. Vẽ đúng kiến thức, rõ ràng, ít chi tiết thừa.\n";
  },

  promptVeHinh: function (L, bai) {
    return "Hãy vẽ một hình minh họa cho bài học " + (bai ? bai.ct.mon + " lớp " + bai.ct.lop + " · " + bai.ten : "") + ", dùng trong phần giải thích cho học sinh.\n\n" +
      "Nội dung cần giải thích: " + (L.bai_giang.hien_tuong || L.ten) + "\nMô tả hình cần vẽ: " + L.bai_giang.mo_ta_hinh + "\n\nYêu cầu:\n" + AI.quyTacSvg("- ") +
      '\nChỉ trả về đúng một khối JSON, không giải thích thêm:\n{"svg":"<svg viewBox=\\"0 0 360 200\\">…</svg>"}\n';
  },

  // Xếp câu vào bài và phát hiện câu không thuộc môn – lớp đang chọn
  promptXepBai: function (dsCau, ct, dsBai) {
    return "Dưới đây là các câu trắc nghiệm học sinh đưa vào để luyện môn " + ct.mon + " lớp " + ct.lop + ". Với mỗi câu, chọn bài phù hợp nhất trong danh sách, và cho biết câu có thuộc môn – lớp này không.\n\n" +
      "Danh sách bài:\n" + dsBai.map(function (b) { return "  " + b.id + ": " + b.ten + (b.yccd.length ? " — " + b.yccd.join("; ") : ""); }).join("\n") + "\n\nCâu hỏi:\n" +
      dsCau.map(function (c, i) { return i + ". " + c.q.replace(/\n/g, " ") + " | " + c.o.join(" | "); }).join("\n") +
      "\n\nYêu cầu: i là số thứ tự câu như trên; bai là mã bài, không chắc thì null; dung_mon là false nếu câu thuộc môn hoặc lớp khác, hoặc ngoài chương trình lớp " + ct.lop + "; khi đó mon_goi_y ghi môn – lớp phù hợp (vd «Sinh học 12»).\n" +
      'Chỉ trả về đúng một khối JSON, không giải thích thêm:\n{"cau":[{"i":0,"bai":"<mã bài hoặc null>","dung_mon":true,"mon_goi_y":""}]}\n';
  },

  moTaBai: function (bai) {
    var s = "Bài: " + bai.ten + "\n";
    if (bai.yccd && bai.yccd.length) s += "Yêu cầu cần đạt:\n" + bai.yccd.map(function (y) { return "- " + y; }).join("\n") + "\n";
    if (bai.noi_dung) s += "Nội dung bài do giáo viên cung cấp:\n" + bai.noi_dung + "\n";
    return s;
  },

  promptBanDo: function (bai, caus, mon, lop) {
    var ds = caus.map(function (c) { return { id: c.id, q: c.q, o: c.o, d: c.d }; });
    return "Bạn là giáo viên " + mon + " giàu kinh nghiệm, giỏi giải thích cho học sinh yếu. Hãy dựng «bản đồ lỗi tư duy» và lộ trình học lại cho từng câu trắc nghiệm dưới đây.\n\n" +
      AI.moTaBai(bai) + "\nCâu hỏi (JSON):\n" + JSON.stringify(ds, null, 1) + "\n\nYêu cầu:\n" + AI.quyTacChung(mon, lop) +
      "\nChỉ trả về đúng một khối JSON theo mẫu sau, không giải thích thêm:\n" +
      '{"cau":[{"id":"<giữ nguyên id câu>","loi":{"<chỉ số phương án sai>":"<mã lỗi>"}}],\n ' + AI.mauLoi + "}\n";
  },

  promptSoan: function (bai, n, mon, lop) {
    return "Bạn là giáo viên " + mon + " giàu kinh nghiệm, giỏi giải thích cho học sinh yếu. Hãy soạn " + n + " câu trắc nghiệm 4 phương án để kiểm tra nhanh cuối tiết, mỗi câu kèm «bản đồ lỗi tư duy» và lộ trình học lại.\n\n" +
      AI.moTaBai(bai) + "\nYêu cầu:\n- Câu hỏi bám yêu cầu cần đạt, mức Biết và Hiểu, làm trong khoảng 1 phút mỗi câu.\n" +
      "- Mỗi phương án sai phải là một cách hiểu sai thường gặp của học sinh, không dùng phương án vô lí.\n" + AI.quyTacChung(mon, lop) +
      "\nChỉ trả về đúng một khối JSON theo mẫu sau, không giải thích thêm:\n" +
      '{"cau":[{"q":"<câu hỏi>","o":["...","...","...","..."],"d":0,"loi":{"<chỉ số phương án sai>":"<mã lỗi>"}}],\n ' + AI.mauLoi + "}\n";
  },

  docKetQua: function (text) {
    var t = String(text || "").replace(/```(?:json)?/gi, "");
    var i = t.indexOf("{"), j = t.lastIndexOf("}");
    if (i < 0 || j <= i) return { loi: ["Không tìm thấy khối JSON trong phần đã dán."] };
    try { return { obj: JSON.parse(t.slice(i, j + 1)), loi: [] }; }
    catch (e) { return { loi: ["JSON không hợp lệ: " + e.message] }; }
  },

  kiem: function (obj, loai, caus) {
    var e = [];
    if (!obj || !Array.isArray(obj.cau) || !obj.cau.length) return ["Thiếu mảng «cau»."];
    var ltd = Array.isArray(obj.loi_tu_duy) ? obj.loi_tu_duy : [];
    if (!ltd.length) e.push("Thiếu mảng «loi_tu_duy».");
    var ma = {};
    ltd.forEach(function (l, i) {
      var nm = "Lỗi tư duy " + (l && l.ma ? l.ma : "#" + (i + 1));
      if (!l || !l.ma) { e.push(nm + " thiếu «ma»."); return; }
      ma[l.ma] = 1;
      if (!l.ten) e.push(nm + " thiếu «ten».");
      if (!Array.isArray(l.thuat_ngu) || !l.thuat_ngu.length) e.push(nm + " cần ít nhất 1 thuật ngữ trong «thuat_ngu».");
      else l.thuat_ngu.forEach(function (t, j) { if (!t || !t.ten || !t.dinh_nghia) e.push(nm + ", thuật ngữ " + (j + 1) + " thiếu «ten» hoặc «dinh_nghia»."); });
      if (!l.hien_tuong) e.push(nm + " thiếu «hien_tuong».");
      if (!Array.isArray(l.bac_thang) || l.bac_thang.length < 3) e.push(nm + " cần ít nhất 3 câu trong «bac_thang».");
      else l.bac_thang.forEach(function (g, j) { AI.kiemCauNho(g, nm + ", bậc " + (j + 1), e); });
    });
    if (loai === "bando") {
      var can = {};
      caus.forEach(function (c) { can[c.id] = c; });
      obj.cau.forEach(function (x) {
        var c = can[x.id];
        if (!c) { e.push("Câu «" + x.id + "» không có trong danh sách đã gửi."); return; }
        AI.kiemBanDo(x, c.o.length, c.d, ma, "Câu " + x.id, e);
      });
      caus.forEach(function (c) { if (!obj.cau.some(function (x) { return x.id === c.id; })) e.push("Thiếu kết quả cho câu " + c.id + "."); });
    } else {
      obj.cau.forEach(function (x, i) {
        var nm = "Câu " + (i + 1);
        if (!x.q) e.push(nm + " thiếu «q».");
        if (!Array.isArray(x.o) || x.o.length !== 4) { e.push(nm + " cần đúng 4 phương án."); return; }
        if (!(x.d >= 0 && x.d < 4)) { e.push(nm + " có «d» không hợp lệ."); return; }
        AI.kiemBanDo(x, 4, x.d, ma, nm, e);
      });
    }
    return e;
  },

  kiemBanDo: function (x, n, d, ma, nm, e) {
    for (var k = 0; k < n; k++) {
      if (k === d) continue;
      var v = x.loi && x.loi[k];
      if (!v) e.push(nm + ": phương án " + KEYS[k] + " chưa gắn lỗi tư duy.");
      else if (!ma[v]) e.push(nm + ": mã lỗi «" + v + "» không có trong loi_tu_duy.");
    }
  },

  kiemCauNho: function (g, nm, e) {
    if (!g || !g.q || !Array.isArray(g.o) || g.o.length < 2 || g.o.length > 4 || !(g.d >= 0 && g.d < g.o.length))
      e.push(nm + " sai định dạng (cần q; o có 2–4 phương án; d là chỉ số đáp án đúng).");
  },

  // Thuật ngữ trùng tên (không phân biệt hoa thường) thì dùng lại bản đã có trong kho
  napThuatNgu: function (t) {
    var ten = String(t.ten).trim(), co = DB.d.thuat_ngu.filter(function (x) { return x.ten.toLowerCase() === ten.toLowerCase(); })[0];
    if (co) return co.id;
    var n = DB.d.thuat_ngu.length + 1, id = "TN-" + String(n).padStart(3, "0");
    while (DB.d.thuat_ngu.some(function (x) { return x.id === id; })) { n++; id = "TN-" + String(n).padStart(3, "0"); }
    DB.d.thuat_ngu.push({ id: id, ten: ten, dinh_nghia: String(t.dinh_nghia), vi_du: String(t.vi_du || ""), hinh: HINH.co(t.hinh) ? t.hinh : null, nguon: "ai" });
    return id;
  },

  nap: function (obj, loai, bai) {
    var doiMa = {};
    function chuanBac(g) { return { muc: MUC_BAC[g.muc] ? g.muc : "ap_dung", q: String(g.q), o: g.o.map(String), d: +g.d, giai: String(g.giai || "") }; }
    function chuanLoi(loi) { var o = {}; Object.keys(loi || {}).forEach(function (k) { o[k] = doiMa[loi[k]]; }); return o; }
    obj.loi_tu_duy.forEach(function (l) {
      var goc = bai.id + "-" + String(l.ma).replace(/\s+/g, ""), id = goc, n = 2;
      while (DB.d.loi_tu_duy.some(function (x) { return x.id === id; })) id = goc + "-" + (n++);
      doiMa[l.ma] = id;
      DB.d.loi_tu_duy.push({
        id: id, bai: bai.id, nguon: "ai", ten: String(l.ten), hs: String(l.hs || ""),
        bai_giang: {
          thuat_ngu: l.thuat_ngu.map(AI.napThuatNgu), hien_tuong: String(l.hien_tuong), vi_du: String(l.vi_du || ""),
          hinh: HINH.co(l.hinh) ? l.hinh : null, mo_ta_hinh: HINH.co(l.hinh) ? "" : String(l.mo_ta_hinh || ""),
          svg: HINH.co(l.hinh) ? "" : HINH.locSvg(l.svg)
        },
        bac_thang: l.bac_thang.map(chuanBac)
      });
    });
    if (loai === "bando") {
      obj.cau.forEach(function (x) {
        var c = DB.d.ngan_hang.filter(function (y) { return y.id === x.id; })[0];
        if (!c) return;
        c.loi = chuanLoi(x.loi); c.trang_thai = "cho_duyet";
      });
    } else {
      var n = DB.d.ngan_hang.filter(function (c) { return c.bai === bai.id; }).length;
      obj.cau.forEach(function (x) {
        n++;
        var id = bai.id + "-Q" + n;
        while (DB.d.ngan_hang.some(function (c) { return c.id === id; })) { n++; id = bai.id + "-Q" + n; }
        DB.d.ngan_hang.push({ id: id, bai: bai.id, nguon: "ai", trang_thai: "cho_duyet", q: String(x.q), o: x.o.map(String), d: +x.d, loi: chuanLoi(x.loi) });
      });
    }
  }
};
