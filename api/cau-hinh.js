// /api/cau-hinh — cài đặt AI cho bản web.
// GET: {nguon, co_khoa, model, tu_bien} (không bao giờ trả khóa). POST {ma, pin, khoa?, model?, thu?}: Ban Khảo thí lưu khóa / thử gọi Gemini.
const { cauHinhAI, ghiBiMat, docBiMat, goiGemini, laAdmin, khoaBlob } = require("./_chung");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  try {
    if (req.method === "GET") {
      const c = await cauHinhAI();
      res.status(200).json({ nguon: "gemini", co_khoa: !!c.khoa, model: c.model, tu_bien: !!c.tuBien, luu_duoc: !!khoaBlob(), bien_blob: Object.keys(process.env).filter((k) => /BLOB/.test(k)) });
      return;
    }
    if (req.method !== "POST") { res.status(405).json({ loi: "Không hỗ trợ" }); return; }
    const b = req.body || {};
    if (!(await laAdmin(b.ma, b.pin))) { res.status(403).json({ loi: "Mã hoặc PIN của Ban Khảo thí chưa đúng." }); return; }
    if (b.thu) {
      const c = await cauHinhAI();
      const khoa = String(b.khoa || "").trim() || c.khoa, model = String(b.model || "").trim() || c.model;
      if (!khoa) { res.status(400).json({ loi: "Chưa có khóa để thử." }); return; }
      const kq = await goiGemini('Chỉ trả về đúng JSON {"ok":true,"chao":"Xin chào"}', khoa, model);
      res.status(200).json({ ok: true, ket_qua: kq.slice(0, 200), model });
      return;
    }
    if (!khoaBlob()) { res.status(503).json({ loi: "Chưa bật Vercel Blob nên chưa lưu được khóa. Hoặc đặt biến môi trường GEMINI_API_KEY trên Vercel." }); return; }
    const cu = await docBiMat();
    const moi = { khoa: String(b.khoa || "").trim() || cu.khoa || "", model: String(b.model || "").trim() || cu.model || "", luu_luc: new Date().toISOString() };
    if (b.xoa_khoa) moi.khoa = "";
    await ghiBiMat(moi);
    res.status(200).json({ ok: true, co_khoa: !!moi.khoa, model: moi.model });
  } catch (e) {
    res.status(500).json({ loi: String(e.message || e) });
  }
};
