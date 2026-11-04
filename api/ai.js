// POST /api/ai {cau_lenh} — chuyển câu lệnh cho Gemini bằng khóa Ban Khảo thí đã lưu; trả {ket_qua}
const { cauHinhAI, goiGemini } = require("./_chung");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.status(405).json({ loi: "Chỉ nhận POST" }); return; }
  const cauLenh = String((req.body || {}).cau_lenh || "");
  if (!cauLenh.trim()) { res.status(400).json({ loi: "Thiếu câu lệnh" }); return; }
  if (cauLenh.length > 200000) { res.status(413).json({ loi: "Nội dung quá dài." }); return; }
  try {
    const c = await cauHinhAI();
    if (!c.khoa) { res.status(400).json({ loi: "Chưa có khóa API Gemini. Ban Khảo thí vào «Cài đặt AI» để dán khóa." }); return; }
    res.status(200).json({ ket_qua: await goiGemini(cauLenh, c.khoa, c.model) });
  } catch (e) {
    res.status(502).json({ loi: String(e.message || e) });
  }
};
