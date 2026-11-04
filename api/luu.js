// POST /api/luu {files: {bảng: nội dung file}, ban_goc} — ghi các bảng vào Blob.
// Máy lưu sau mà chưa tải bản mới nhất (ban_goc khác mốc đang lưu) bị từ chối 409, không ghi đè việc của người khác.
const { BANG, docBang, ghiBang, giaTriBang } = require("./_chung");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.status(405).json({ loi: "Chỉ nhận POST" }); return; }
  if (!process.env.BLOB_READ_WRITE_TOKEN) { res.status(503).json({ loi: "Chưa bật Vercel Blob cho dự án nên chưa lưu được." }); return; }
  const body = req.body || {};
  const files = body.files || {};
  const la = Object.keys(files).filter((b) => !BANG.includes(b));
  if (la.length) { res.status(400).json({ loi: "Bảng không hợp lệ: " + la.join(", ") }); return; }
  try {
    if (body.ban_goc !== undefined && body.ban_goc !== null) {
      const moc = (giaTriBang(await docBang("meta"), "meta") || {}).luu_luc || "";
      if (moc && body.ban_goc !== moc) { res.status(409).json({ loi: "Máy khác vừa lưu thay đổi.", xung_dot: true }); return; }
    }
    // Ghi meta sau cùng: mốc lưu chỉ đổi khi các bảng khác đã ghi xong
    const ten = Object.keys(files).sort((a, b) => (a === "meta") - (b === "meta"));
    for (const b of ten) await ghiBang(b, String(files[b]));
    res.status(200).json({ ok: true, da_ghi: ten });
  } catch (e) {
    res.status(500).json({ loi: String(e.message || e) });
  }
};
