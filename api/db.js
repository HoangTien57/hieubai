// GET /db/<bảng>.js (chuyển về /api/db?bang=…) — trả bản mới nhất của bảng: trong Blob nếu đã lưu, không thì bản gốc trong repo
const { BANG, docBang } = require("./_chung");

module.exports = async (req, res) => {
  const bang = String((req.query || {}).bang || "");
  if (!BANG.includes(bang)) { res.status(404).send("// không có bảng này"); return; }
  try {
    const chu = await docBang(bang);
    res.setHeader("Content-Type", "text/javascript; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(chu);
  } catch (e) {
    res.status(500).send("// lỗi đọc bảng " + bang + ": " + String(e.message).replace(/\n/g, " "));
  }
};
