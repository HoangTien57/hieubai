"""Dựng db/chuong_trinh.js (nhiều môn) từ cong_cu/khung_lop10.txt.

Sinh học 10 (=SINHHOC) lấy nguyên từ db/chuong_trinh.js đang có để giữ mã bài và yêu cầu cần đạt.
Chạy: python cong_cu/dung_chuong_trinh.py
"""
import json
import os
import sys
from datetime import datetime, timezone

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILE_DB = os.path.join(GOC, "db", "chuong_trinh.js")
FILE_KHUNG = os.path.join(GOC, "cong_cu", "khung_lop10.txt")

PHAN_NGU_VAN = [("DH", "Đọc hiểu văn bản"), ("TV", "Thực hành tiếng Việt"), ("VI", "Viết"), ("NN", "Nói và nghe")]
KI_NANG_TA = [("VP", "Vocabulary & Pronunciation"), ("GR", "Grammar"), ("RE", "Reading"),
              ("LI", "Listening"), ("SP", "Speaking"), ("WR", "Writing")]


def doc_js(duong_dan):
    chu = open(duong_dan, encoding="utf-8").read()
    i = chu.index("=", chu.index("DB_SEED.chuong_trinh")) + 1
    return json.loads(chu[i:chu.rindex(";")])


def sinh_hoc_hien_co():
    cu = doc_js(FILE_DB)
    ds = cu if isinstance(cu, list) else [cu]
    for ct in ds:
        if ct.get("id") == "SH10" or ct.get("mon") == "Sinh học":
            ct = dict(ct)
            ct["id"] = "SH10"
            return ct
    raise SystemExit("Không tìm thấy Sinh học 10 trong db/chuong_trinh.js")


def dung():
    ds, ct, chuong = [], None, None
    for dong in open(FILE_KHUNG, encoding="utf-8"):
        dong = dong.rstrip("\n")
        if not dong.strip() or dong.startswith("# "):
            continue
        if dong.startswith("@"):
            ma, mon, lop, nguon = dong[1:].split("|", 3)
            ct = {"id": ma, "mon": mon, "lop": int(lop), "nguon": nguon, "chuong": []}
            ds.append(ct)
        elif dong.startswith("=SINHHOC"):
            ds.append(sinh_hoc_hien_co())
            ct = None
        elif dong.startswith("=NGUVAN|"):
            for i, ten in enumerate(dong.split("|", 1)[1].split(";"), 1):
                ct["chuong"].append({"id": "C%d" % i, "ten": "Bài %d. %s" % (i, ten), "bai": [
                    {"id": "%s-B%02d-%s" % (ct["id"], i, k), "so": None, "ten": "Bài %d · %s" % (i, t), "yccd": []} for k, t in PHAN_NGU_VAN]})
        elif dong.startswith("=TIENGANH|"):
            for i, ten in enumerate(dong.split("|", 1)[1].split(";"), 1):
                ct["chuong"].append({"id": "U%d" % i, "ten": "Unit %d. %s" % (i, ten), "bai": [
                    {"id": "%s-U%02d-%s" % (ct["id"], i, k), "so": None, "ten": "Unit %d · %s" % (i, t), "yccd": []} for k, t in KI_NANG_TA]})
        elif dong.startswith("#"):
            chuong = {"id": "C%d" % (len(ct["chuong"]) + 1), "ten": dong[1:].strip(), "bai": []}
            ct["chuong"].append(chuong)
        else:
            so, ten = dong.split("|", 1)
            so = int(so) if so.strip() else None
            ma_bai = "%s-B%02d" % (ct["id"], so) if so is not None else "%s-X%02d" % (ct["id"], len(chuong["bai"]) + 1)
            chuong["bai"].append({"id": ma_bai, "so": so, "ten": ten.strip(), "yccd": []})
    ma = [b["id"] for c in ds for ch in c["chuong"] for b in ch["bai"]]
    trung = sorted({m for m in ma if ma.count(m) > 1})
    if trung:
        raise SystemExit("Trùng mã bài: " + ", ".join(trung))
    return ds, len(ma)


def main():
    ds, so_bai = dung()
    luc = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    with open(FILE_DB, "w", encoding="utf-8", newline="\n") as f:
        f.write("// Bảng chuong_trinh: danh sách môn – lớp, mỗi môn gồm chương ▸ bài ▸ yêu cầu cần đạt. Dựng bởi cong_cu/dung_chuong_trinh.py lúc " + luc + "\n")
        f.write("window.DB_SEED = window.DB_SEED || {};\nDB_SEED.chuong_trinh = " + json.dumps(ds, ensure_ascii=False, indent=1) + ";\n")
    # Đổi mốc lưu và cấu trúc (schema 3) để trang dùng dữ liệu mới thay cho bản cũ trên trình duyệt
    file_meta = os.path.join(GOC, "db", "meta.js")
    with open(file_meta, "w", encoding="utf-8", newline="\n") as f:
        f.write("// Bảng meta: thời điểm lưu gần nhất và phiên bản cấu trúc dữ liệu\nwindow.DB_SEED = window.DB_SEED || {};\nDB_SEED.meta = "
                + json.dumps({"luu_luc": luc, "schema": 3}) + ";\n")
    for c in ds:
        print("%-5s %-38s %2d chương, %3d bài" % (c["id"], c["mon"] + " " + str(c["lop"]), len(c["chuong"]), sum(len(ch["bai"]) for ch in c["chuong"])))
    print("Tổng:", len(ds), "môn,", so_bai, "bài")


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    main()
