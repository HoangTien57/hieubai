"""Cầu nối chạy trên máy cho app Hiểu bài.

- Phục vụ trang web tại http://127.0.0.1:8787 (chỉ nhận kết nối từ chính máy này).
- POST /api/luu: ghi các bảng dữ liệu ra thư mục db/.
- POST /api/ai: chuyển câu lệnh cho Claude Code trên máy (claude -p), trả kết quả về cho các nút AI.

Chạy: python cau_noi.py   (hoặc bấm đúp Mo_app.bat). Chỉ dùng thư viện có sẵn của Python.
"""
import glob
import json
import os
import re
import secrets
import shutil
import socket
import subprocess
import sys
import tempfile
import threading
import webbrowser
from http.cookies import SimpleCookie
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlsplit

GOC = os.path.dirname(os.path.abspath(__file__))
THU_MUC_DB = os.environ.get("HIEUBAI_DB") or os.path.join(GOC, "db")
CONG = int(os.environ.get("HIEUBAI_CONG", "8787"))
BANG = {"meta", "chuong_trinh", "bai_ngoai", "lop", "ngan_hang", "thuat_ngu", "loi_tu_duy", "phien", "ket_qua", "de", "lam_de", "nguoi_dung", "giao"}
# Chế độ LAN (--lan): mở cho máy khác cùng mạng, máy khác phải nhập mật khẩu; máy chủ vẫn dùng không cần mật khẩu
LAN = "--lan" in sys.argv or os.environ.get("HIEUBAI_LAN") == "1"
MAT_KHAU = os.environ.get("HIEUBAI_MK") or "aispark"


def ip_may():
    ds = set()
    try:
        for kq in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            ds.add(kq[4][0])
    except OSError:
        pass
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("10.255.255.255", 1))
        ds.add(s.getsockname()[0])
        s.close()
    except OSError:
        pass
    return sorted(ip for ip in ds if not ip.startswith(("127.", "169.254.")))


HOST_HOP_LE = {"127.0.0.1:%d" % CONG, "localhost:%d" % CONG} | ({"%s:%d" % (ip, CONG) for ip in ip_may()} if LAN else set())
TRANG_MAT_KHAU = """<!DOCTYPE html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hiểu bài</title><body style="font:16px system-ui,sans-serif;max-width:360px;margin:15vh auto;padding:0 16px">
<h2>Hiểu bài</h2><p>Nhập mật khẩu hiện trên cửa sổ đen ở máy đang chạy app.</p>
<form method="get" action="/"><input name="mk" type="password" autocomplete="current-password" autofocus style="font-size:20px;padding:8px;width:100%;box-sizing:border-box">
<button style="margin-top:10px;padding:10px 16px;font-size:16px">Vào</button></form>{LOI}</body></html>"""


def moc_luu_tren_dia():
    try:
        chu = open(os.path.join(THU_MUC_DB, "meta.js"), encoding="utf-8").read()
        return json.loads(chu[chu.index("=", chu.index("DB_SEED.meta")) + 1:chu.rindex(";")]).get("luu_luc", "")
    except (OSError, ValueError):
        return ""
# Claude chỉ được trả lời bằng chữ: chặn các công cụ chạy lệnh, sửa file, lên mạng (nội dung giáo viên dán vào có thể chứa chỉ dẫn lạ)
CHAN_CONG_CU = "Bash,Edit,Write,NotebookEdit,WebFetch,WebSearch,Task"
KHOA_AI = threading.Lock()
KHOA_LUU = threading.Lock()


def _phien_ban(duong_dan):
    m = re.search(r"anthropic\.claude-code-(\d+)\.(\d+)\.(\d+)", duong_dan)
    return tuple(int(x) for x in m.groups()) if m else (0, 0, 0)


def tim_claude():
    """Tìm claude.exe: biến CLAUDE_EXE, rồi extension Claude Code trong các IDE, rồi PATH."""
    tu_dat = os.environ.get("CLAUDE_EXE")
    if tu_dat and os.path.isfile(tu_dat):
        return tu_dat
    nha = os.path.expanduser("~")
    ung_vien = []
    for ide in (".antigravity-ide", ".vscode", ".cursor"):
        ung_vien += glob.glob(os.path.join(nha, ide, "extensions", "anthropic.claude-code-*", "resources", "native-binary", "claude.exe"))
    if ung_vien:
        return max(ung_vien, key=_phien_ban)
    for ten in ("claude.exe", "claude"):
        p = shutil.which(ten)
        if p and not p.lower().endswith((".cmd", ".bat")):
            return p
    return None


def goi_claude(cau_lenh):
    exe = tim_claude()
    if not exe:
        raise RuntimeError("Không tìm thấy Claude Code trên máy (đặt biến CLAUDE_EXE trỏ tới claude.exe nếu cài ở chỗ khác).")
    with tempfile.TemporaryDirectory() as tam:
        kq = subprocess.run(
            [exe, "-p", "--output-format", "text", "--disallowedTools", CHAN_CONG_CU],
            input=cau_lenh.encode("utf-8"), capture_output=True, cwd=tam, timeout=600,
        )
    if kq.returncode != 0:
        raise RuntimeError((kq.stderr or kq.stdout).decode("utf-8", "replace")[-800:] or "Claude trả về lỗi")
    return kq.stdout.decode("utf-8", "replace")


def ghi_bang(ten, noi_dung):
    os.makedirs(THU_MUC_DB, exist_ok=True)
    dich = os.path.join(THU_MUC_DB, ten + ".js")
    tam = dich + ".tmp"
    with open(tam, "w", encoding="utf-8", newline="\n") as f:
        f.write(noi_dung)
    os.replace(tam, dich)


class XuLy(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=GOC, **kwargs)

    def log_message(self, fmt, *args):
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _may_nay(self):
        return self.client_address[0] in ("127.0.0.1", "::1")

    def _co_mat_khau(self):
        c = SimpleCookie(self.headers.get("Cookie", ""))
        return "hb_mk" in c and secrets.compare_digest(c["hb_mk"].value, MAT_KHAU)

    def _hop_le(self):
        # Chặn trang web lạ gửi yêu cầu vào cầu nối (kiểm Host và Origin); máy khác trong LAN phải có mật khẩu
        host = self.headers.get("Host", "")
        if host not in HOST_HOP_LE:
            return False
        nguon = self.headers.get("Origin")
        if nguon is not None and nguon != "http://" + host:
            return False
        return self._may_nay() or (LAN and self._co_mat_khau())

    def _cua_vao(self):
        """Máy khác trong LAN chưa có mật khẩu: hiện trang nhập; nhập đúng thì ghi cookie rồi vào app."""
        mk = parse_qs(urlsplit(self.path).query).get("mk", [""])[0].strip()
        if mk and secrets.compare_digest(mk, MAT_KHAU):
            self.send_response(303)
            self.send_header("Set-Cookie", "hb_mk=%s; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400" % MAT_KHAU)
            self.send_header("Location", "/")
            self.end_headers()
            print("[LAN] máy %s đã vào app." % self.client_address[0], flush=True)
            return
        du_lieu = TRANG_MAT_KHAU.replace("{LOI}", '<p style="color:#c22">Mật khẩu chưa đúng.</p>' if mk else "").encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(du_lieu)))
        self.end_headers()
        self.wfile.write(du_lieu)

    def _json(self, ma, obj):
        du_lieu = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(ma)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(du_lieu)))
        self.end_headers()
        self.wfile.write(du_lieu)

    def do_GET(self):
        if not self._hop_le():
            if LAN and not self._may_nay() and self.headers.get("Host", "") in HOST_HOP_LE and not self.path.startswith("/api/"):
                return self._cua_vao()
            return self._json(403, {"loi": "Chỉ dùng từ chính máy này" if not LAN else "Cần mật khẩu: mở lại trang chủ để nhập"})
        if self.path == "/api/trang_thai":
            return self._json(200, {"ok": True, "ai": bool(tim_claude()), "ghi_file": True, "nguon": "claude"})
        if self.path == "/api/cau-hinh":
            return self._json(200, {"nguon": "claude", "co_khoa": bool(tim_claude())})
        return super().do_GET()

    def do_POST(self):
        if not self._hop_le():
            return self._json(403, {"loi": "Chỉ dùng từ chính máy này"})
        try:
            dai = int(self.headers.get("Content-Length", "0"))
            du_lieu = json.loads(self.rfile.read(dai).decode("utf-8"))
        except (ValueError, UnicodeDecodeError):
            return self._json(400, {"loi": "Dữ liệu gửi lên không phải JSON hợp lệ"})

        if self.path == "/api/luu":
            cac_file = du_lieu.get("files") or {}
            la = [t for t in cac_file if t not in BANG]
            if la:
                return self._json(400, {"loi": "Bảng không hợp lệ: " + ", ".join(la)})
            with KHOA_LUU:
                # Hai máy cùng sửa: máy nào lưu sau mà chưa tải bản mới nhất thì bị từ chối, không ghi đè việc của máy kia
                ban_goc = du_lieu.get("ban_goc")
                if ban_goc is not None and ban_goc != moc_luu_tren_dia():
                    return self._json(409, {"loi": "Máy khác vừa lưu thay đổi.", "xung_dot": True})
                for ten, noi_dung in cac_file.items():
                    ghi_bang(ten, str(noi_dung))
            return self._json(200, {"ok": True, "da_ghi": sorted(cac_file)})

        if self.path == "/api/ai":
            cau_lenh = str(du_lieu.get("cau_lenh") or "")
            if not cau_lenh.strip():
                return self._json(400, {"loi": "Thiếu câu lệnh"})
            try:
                with KHOA_AI:
                    print("[AI] đang gọi Claude (%d kí tự)…" % len(cau_lenh), flush=True)
                    ket_qua = goi_claude(cau_lenh)
                print("[AI] xong.", flush=True)
                return self._json(200, {"ket_qua": ket_qua})
            except subprocess.TimeoutExpired:
                return self._json(504, {"loi": "Claude chạy quá 10 phút, đã dừng."})
            except Exception as e:  # trả lỗi về cho trang web hiển thị
                return self._json(500, {"loi": str(e)})

        return self._json(404, {"loi": "Không có đường dẫn này"})


def main():
    # Cửa sổ dòng lệnh Windows hay dùng bảng mã cũ: in tiếng Việt không được thì thay kí tự, không để cầu nối tắt
    for luong in (sys.stdout, sys.stderr):
        try:
            luong.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass
    may_chu = ThreadingHTTPServer(("0.0.0.0" if LAN else "127.0.0.1", CONG), XuLy)
    dia_chi = "http://127.0.0.1:%d/" % CONG
    exe = tim_claude()
    print("Hiểu bài đang chạy tại " + dia_chi)
    if LAN:
        print("=" * 60)
        print("CHẾ ĐỘ LAN: máy khác cùng mạng mở một trong các link sau")
        for ip in ip_may():
            print("   http://%s:%d/" % (ip, CONG))
        print("Mật khẩu: " + MAT_KHAU)
        print("Máy khác dùng đủ chức năng, kể cả nút AI (trừ hạn mức tài khoản Claude trên máy này).")
        print("=" * 60)
    print("Dữ liệu ghi vào: " + THU_MUC_DB)
    print("Claude Code: " + (exe or "KHÔNG tìm thấy, các nút AI sẽ dùng cách sao chép, dán"))
    print("Đóng cửa sổ này (hoặc Ctrl+C) để tắt.")
    if "--khong-mo" not in sys.argv:
        threading.Timer(0.8, lambda: webbrowser.open(dia_chi)).start()
    try:
        may_chu.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
