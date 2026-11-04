// GET /api/trang_thai — trang web hỏi xem có máy chủ lưu dữ liệu và AI không (cùng dạng với cau_noi.py)
const { cauHinhAI, khoaBlob } = require("./_chung");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const c = await cauHinhAI().catch(() => ({ khoa: "" }));
  res.status(200).json({ ok: true, ai: !!c.khoa, ghi_file: !!khoaBlob(), nguon: "gemini", model: c.model || null });
};
