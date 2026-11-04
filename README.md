# Hiểu bài — bản web (Vercel + Gemini)

App luyện đề và ôn đúng chỗ hiểu sai, cho học sinh, giáo viên và Ban Khảo thí. Đây là **bản đưa lên web**: AI dùng **Gemini** qua API, dữ liệu dùng chung lưu ở **Vercel Blob**.
(Bản chạy trên máy, dùng Claude qua cầu nối `cau_noi.py`, nằm ở thư mục riêng và không thuộc repo này.)

## Chức năng
- **Học sinh** (vào bằng mã học sinh): Kho đề chung · Đề của em (riêng tư) · Đề được giao · Kiểm tra trên lớp · Kết quả của em.
- **Giáo viên** (mã + PIN): Tình hình lớp · Giao đề · Kho bài học · Buổi kiểm tra · Kết quả buổi.
- **Ban Khảo thí** (admin): thêm Tổng quan · Kho đề chung (nháp, đăng) · Người dùng · Cài đặt AI.
- Làm bài có đồng hồ, gắn cờ, nộp; câu sai có lộ trình gỡ: thuật ngữ → hiện tượng → hình minh họa → câu nhỏ → làm lại câu gốc.

## Đưa lên Vercel
1. vercel.com → **Add New → Project** → chọn repo này → **Deploy** (không cần framework, không cần lệnh build).
2. Trong dự án: **Storage → Create → Blob** (Private hoặc Public đều được) → nối vào dự án → **Redeploy**. Kho Private dùng biến `BLOB_STORE_ID` (Vercel tự thêm khi nối).
3. Mở web, đăng nhập Ban Khảo thí → **Cài đặt AI** → dán khóa Gemini (aistudio.google.com → Get API key) → **Thử gọi AI** → **Lưu**. Hoặc đặt biến môi trường `GEMINI_API_KEY` (tùy chọn `GEMINI_MODEL`, mặc định `gemini-2.5-flash`).

Tài khoản dùng thử: `ADMIN`/`2611`, `GV01`/`1111` (10A1), `GV02`/`2222` (10A2), học sinh `HS1001`–`HS1003` (10A1), `HS2001`–`HS2003` (10A2).

## Cấu trúc
```
index.html, css/, js/, img/   trang web (không framework)
db/                           dữ liệu gốc, mỗi bảng một file .js (bản ban đầu khi Blob chưa có gì)
api/                          hàm máy chủ Vercel
  _chung.js                   đọc/ghi Blob, gọi Gemini, kiểm admin
  db.js                       GET /db/<bảng>.js → bản mới nhất của bảng
  luu.js                      POST /api/luu → lưu bảng (chặn ghi đè khi hai máy cùng sửa)
  ai.js                       POST /api/ai → Gemini
  cau-hinh.js                 GET/POST /api/cau-hinh → trạng thái AI, lưu khóa (chỉ admin; khóa không trả về trình duyệt)
  trang_thai.js               GET /api/trang_thai
vercel.json                   chuyển /db/*.js sang api/db.js; giới hạn 60 giây mỗi hàm
cong_cu/                      dựng khung chương trình lớp 10
```

## Lưu ý bản dùng thử
- Ai có địa chỉ đều mở được trang và đọc dữ liệu; đăng nhập theo vai trò chỉ là lớp giao diện, PIN kiểm trên trình duyệt. **Chỉ dùng dữ liệu giả, không nhập thông tin học sinh thật.**
- Người có địa chỉ có thể gọi AI và làm hết hạn mức của khóa Gemini miễn phí.
- Mỗi lượt AI tối đa 60 giây (gói Hobby): nên tạo đề ≤ 20 câu.
- Nhiều người lưu cùng lúc có thể phải tải lại trang (chặn ghi đè theo cả kho).
