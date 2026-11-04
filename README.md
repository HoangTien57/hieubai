# Hiểu bài — kiểm tra và điều chỉnh sau buổi học

App chạy trên máy, không cần cài đặt. Hai cách mở:

- **Bấm đúp `Mo_app.bat`** (nên dùng): chạy cầu nối `cau_noi.py` và mở trình duyệt tại http://127.0.0.1:8787. Các nút AI gọi thẳng Claude Code trên máy, mỗi lần lưu tự ghi vào thư mục `db/`. Đóng cửa sổ đen là tắt.
- **Bấm đúp `Mo_app_LAN.bat`**: như trên, nhưng máy khác cùng mạng LAN cũng vào được. Cửa sổ đen in link dạng `http://192.168.x.x:8787/` và mật khẩu (cố định `aispark`; đổi bằng biến môi trường `HIEUBAI_MK` hoặc sửa dòng `MAT_KHAU` trong `cau_noi.py`). Máy khác dùng đủ chức năng, kể cả nút AI (trừ hạn mức tài khoản Claude trên máy chạy app). Hai máy cùng sửa: máy lưu sau mà chưa tải bản mới nhất bị từ chối và được nhắc tải lại trang, không ghi đè việc của máy kia. Tường lửa của trường chặn kết nối vào theo mặc định: nếu máy khác không mở được, cần IT cho phép `python.exe` (hoặc cổng 8787) nhận kết nối trong mạng nội bộ.
- **Bản web trên Vercel** (cho người dùng ở mạng khác): thư mục `api/` thay cho `cau_noi.py` — `api/db.js` (đọc bảng), `api/luu.js` (lưu bảng vào Vercel Blob, chặn ghi đè khi hai máy cùng sửa), `api/ai.js` (gọi **Gemini**), `api/cau-hinh.js` (Ban Khảo thí dán khóa ở trang **Cài đặt AI**; khóa chỉ lưu ở máy chủ, không trả về trình duyệt). Cách đưa lên:
  1. Đẩy repo lên GitHub (riêng tư).
  2. vercel.com → Add New → Project → chọn repo → Deploy (không cần chọn framework, không cần lệnh build).
  3. Trong dự án Vercel: **Storage → Create → Blob** → nối vào dự án → **Redeploy** (để có biến `BLOB_READ_WRITE_TOKEN`).
  4. Mở web, đăng nhập Ban Khảo thí → **Cài đặt AI** → dán khóa Gemini (aistudio.google.com → Get API key) → Thử gọi AI → Lưu. (Hoặc đặt biến môi trường `GEMINI_API_KEY` trên Vercel.)
  Lưu ý bản web dùng thử: ai có địa chỉ đều mở được trang và đọc dữ liệu (chỉ dùng dữ liệu giả, không nhập thông tin học sinh thật); đăng nhập theo vai trò chỉ là lớp giao diện. Mỗi lượt AI có thời hạn 60 giây (gói Hobby), đề quá nhiều câu có thể bị cắt — nên tạo đề ≤ 20 câu. Nhiều người lưu cùng lúc có thể phải tải lại trang (chặn ghi đè theo cả kho).
- **Mở thẳng `index.html`**: vẫn dùng được hết, nhưng nút AI dùng cách sao chép câu lệnh rồi dán kết quả, và phải tự ghi dữ liệu ra `db/` ở màn Dữ liệu.

## Luồng

1. **Kho bài học** (giáo viên): chọn bài theo chương trình hoặc thêm bài ngoài chương trình → có câu hỏi → AI dựng bản đồ lỗi → giáo viên tích «Đã duyệt» → «Tạo buổi kiểm tra» cho một lớp, app cấp mã buổi 4 kí tự. Bốn cách có câu hỏi:
   - **Nhập nhiều câu**: dán văn bản chép từ đề hay trang web, hoặc thả file PDF (có lớp chữ), Word .docx, .txt. «Tách câu» chạy ngay trên máy (nhận «Câu 1:», phương án A–D cùng dòng hay mỗi dòng một phương án, «Đáp án: …», bỏ chữ thừa như «Hiển thị đáp án»); «Nhờ AI tách câu và chọn đáp án» cho văn bản lộn xộn hoặc đề không ghi đáp án. Xem trước, sửa, chọn bài cho từng câu rồi lưu; có thể nhờ AI dựng bản đồ lỗi ngay sau khi lưu.
   - **Nhập 1 câu** bằng tay.
   - **AI soạn câu hỏi** theo yêu cầu cần đạt hoặc nội dung bài.
   - Câu có sẵn trong ngân hàng.
2. **Màn học sinh**: nhập mã buổi + số thứ tự → làm bài → với mỗi câu sai, học sinh đi hết **lộ trình gỡ** của cách hiểu sai đó, rồi làm lại chính câu gốc. Bước này không gọi AI.
   - «Có thể em đang nghĩ…»
   - **Học lại**: giải thích từng từ chuyên ngành kèm ví dụ đời thường (chất tan là gì, nồng độ cao/thấp là gì…) → giải thích lại hiện tượng → hình minh họa → ví dụ cụ thể.
   - **Câu nhỏ** từ dễ đến khó: hiểu từ (vd. «chất nào là chất tan?», «cốc nào nồng độ cao hơn?») → áp dụng → gần câu gốc. Chọn sai thì phương án bị gạch, chọn lại đến khi đúng, rồi hiện giải thích.
   - **Làm lại câu gốc**, phương án đảo thứ tự để không nhớ vị trí đáp án.
   - Nếu câu sai sau cùng một cách hiểu sai đã học ở câu trước thì bỏ qua phần học lại, vào thẳng câu gốc.
4. **Luyện đề** (học sinh tự luyện): kho đề theo môn, nhóm Đề 15 phút / 1 tiết / học kì / khác. Mỗi đề có thời gian chuẩn; học sinh đặt giờ đếm ngược trước khi làm (hết giờ tự nộp). Làm bài: bảng số câu để đi tới câu bất kì, gắn cờ câu chưa chắc, nộp bài. Kết quả: số câu đúng, điểm thang 10, thời gian; câu sai ghi kiến thức thuộc bài nào và nút «Ôn lại câu này» (học lại → câu nhỏ → làm lại câu gốc, như Màn học sinh). Lộ trình ôn được dựng **khi học sinh làm sai**, đúng cho phương án em đã chọn (hoặc câu bỏ trống), rồi lưu lại cho lần sau. **AI tạo đề**: chọn môn, học kì, loại đề, số câu (5–50); học kì tạm chia nửa đầu / nửa sau số bài; thời gian chuẩn = biết 1 phút, hiểu 1,5 phút, vận dụng 2,5 phút mỗi câu, làm tròn lên bước 5 phút. **Thêm đề của em**: gõ, dán hoặc thả PDF/Word → AI tách câu và tìm đáp án, hoặc tách trên máy. Bảng mới: `de.js` (đề), `lam_de.js` (lượt làm).
3. **Kết quả** (giáo viên): % đúng lần đầu và sau khi học lại, lỗi tư duy lớp còn vướng (kèm số lần chọn sai trung bình ở câu nhỏ), từng câu, từng học sinh theo số thứ tự.

**Môn có sẵn (lớp 10, 12 môn, 341 bài):** Toán, Ngữ văn, Tiếng Anh, Vật lí, Hóa học, Sinh học, Lịch sử, Địa lí, Giáo dục kinh tế và pháp luật, Tin học, Công nghệ (Thiết kế và công nghệ), Công nghệ (Trồng trọt). Chọn môn ở đầu màn Kho. Ngữ văn chia mỗi bài học thành Đọc hiểu, Thực hành tiếng Việt, Viết, Nói và nghe; Tiếng Anh chia mỗi Unit theo kĩ năng. Các môn không chấm điểm số (Giáo dục thể chất, Hoạt động trải nghiệm, Âm nhạc, Mĩ thuật, Nội dung giáo dục địa phương) không đưa vào. Khung là **khung tạm** (theo SGK Kết nối tri thức hoặc theo chủ đề của Chương trình 2018), cần đối chiếu kế hoạch dạy học của trường; trừ Sinh học 10, các bài chưa có yêu cầu cần đạt: bấm «Thêm yêu cầu cần đạt» trong từng bài (dán từ kế hoạch dạy học hoặc «AI gợi ý»).

**Thêm môn – lớp khác** (lớp 11, 12, môn khác): nút «+ Thêm môn – lớp» ở đầu màn Kho → dán khung chương trình từ kế hoạch dạy học → «Tách khung» (nhận dòng Chương/Chủ đề/Phần/Unit, «Bài 1. …», bỏ «(3 tiết)», dòng «- …» dưới bài là yêu cầu cần đạt) hoặc «Nhờ AI tách khung» → xem trước → lưu. Muốn dựng lại khung lớp 10 từ đầu: sửa `cong_cu/khung_lop10.txt` rồi chạy `python cong_cu/dung_chuong_trinh.py` (giữ nguyên Sinh học 10 và mọi câu hỏi).

Dữ liệu mẫu có sẵn: Sinh học 10, Bài 9 (đủ 5 câu, 7 lỗi tư duy có lộ trình gỡ, 15 thuật ngữ, 7 hình; một buổi đã làm với 30 học sinh lớp 10A2) và Bài 8 (4 câu chưa có bản đồ lỗi, để thử nút AI).

## Thư mục

```
hieu_bai/
  Mo_app.bat        bấm đúp để chạy cầu nối và mở app
  cau_noi.py        cầu nối: phục vụ trang, ghi db/, gọi Claude Code cho nút AI (chỉ thư viện có sẵn của Python)
  index.html        trang chính
  css/style.css
  js/db.js          lớp dữ liệu: đọc db/, lưu trình duyệt, ghi ra db/
  js/hinh.js        thư viện hình minh họa SVG, gọi theo mã
  js/ai.js          câu lệnh AI, kiểm và nạp kết quả; chỗ nối API
  js/nhap.js        tách câu từ văn bản dán vào; đọc chữ từ PDF (pdf.js), Word (mammoth), tải khi cần
  js/app.js         5 màn giao diện
  db/               «database»: mỗi bảng một file .js
  db_sao_luu/       bản sao lưu db/ trước mỗi lần đổi cấu trúc dữ liệu
  cong_cu/          khung_lop10.txt + dung_chuong_trinh.py: dựng db/chuong_trinh.js
```

## Các bảng trong db/

| File | Nội dung |
|---|---|
| `meta.js` | Thời điểm lưu gần nhất (`luu_luc`) |
| `chuong_trinh.js` | Danh sách môn – lớp: `id` (vd. `TO10`), `mon`, `lop`, `nguon`, `chuong` ▸ `bai` (`id` như `TO10-B05`, `so`, `ten`, `yccd`) |
| `bai_ngoai.js` | Bài giáo viên thêm ngoài chương trình |
| `lop.js` | Lớp và sĩ số |
| `ngan_hang.js` | Câu hỏi: `q`, `o` (phương án), `d` (chỉ số đáp án đúng, từ 0), `loi` (phương án sai → mã lỗi), `trang_thai` (`cho_duyet` / `da_duyet`) |
| `thuat_ngu.js` | Từ chuyên ngành: `ten`, `dinh_nghia` (lời đơn giản), `vi_du` (đời thường), `hinh` (mã hình, có thể trống). Dùng chung giữa các bài |
| `loi_tu_duy.js` | Lỗi tư duy: `ten`, `hs` (câu nói với học sinh), `bai_giang` {`thuat_ngu` (danh sách mã), `hien_tuong`, `vi_du`, `hinh`, `mo_ta_hinh`}, `bac_thang` (câu nhỏ: `muc` hieu_tu / ap_dung / gan_cau_goc, `q`, `o`, `d`, `giai`) |
| `phien.js` | Buổi kiểm tra: mã, bài, lớp, danh sách câu, `mo` / `dong` |
| `ket_qua.js` | Bài làm: buổi, số thứ tự, `lan1` (phương án chọn lần đầu), `lai` (phương án chọn khi làm lại câu gốc), `go_sai` (số lần chọn sai ở câu nhỏ) |

Một câu «dùng được» khi mọi phương án sai đều gắn với một lỗi tư duy có câu nhỏ.

## Hình minh họa

`js/hinh.js` có 7 hình vẽ sẵn cho Bài 9: `khuech_tan`, `nong_do`, `tham_thau`, `uu_truong`, `van_chuyen`, `mang`, `nhap_xuat`. Màu theo nền sáng/tối. Câu lệnh AI liệt kê các mã này để AI chọn; nếu không có hình phù hợp, AI ghi `mo_ta_hinh` và app hiện «Hình gợi ý, chưa có» để giáo viên bổ sung. Thêm hình: viết thêm một hàm trong `HINH.ds` và một dòng mô tả trong `HINH.moTa`.

Không lưu họ tên học sinh.

## Dữ liệu được lưu thế nào

Trình duyệt không tự ghi được ra file, nên:

- Mỗi thay đổi được lưu ngay trên trình duyệt (localStorage). Khi mở lại trang, app dùng bản nào mới hơn giữa trình duyệt và thư mục `db/` (so `meta.luu_luc`); bản trên trình duyệt có cấu trúc cũ (`meta.schema` khác) sẽ bị bỏ qua.
- Để ghi ra `db/`: vào màn **Dữ liệu** → **Kết nối thư mục db** (Chrome/Edge, chọn đúng thư mục `db`; từ đó mỗi lần lưu tự ghi đè file), hoặc **Tải các file db** rồi chép đè.
- **Sao lưu thành 1 file .json** để chuyển máy; **Bỏ thay đổi trên trình duyệt** để quay về đúng dữ liệu trong `db/`.

## AI

Nút AI đi theo thứ tự:

1. **Cầu nối** (khi mở bằng `Mo_app.bat`): `cau_noi.py` chuyển câu lệnh cho Claude Code đang cài trên máy (`claude -p`, tìm `claude.exe` trong extension của Antigravity, VS Code hoặc Cursor; đặt biến `CLAUDE_EXE` nếu cài chỗ khác). Mỗi lượt khoảng 10 giây đến vài phút; trang hiện đồng hồ đếm.
2. **API** (sau này, khi có key): điền `CAU_HINH_AI` và viết nhánh API trong `AI.goiAPI` ở `js/ai.js`. Không để API key trong file chạy ở trình duyệt khi đưa lên mạng; lúc đó cần một hàm máy chủ đứng giữa.
3. **Sao chép, dán**: hộp thoại 3 bước, dùng được với mọi công cụ AI. Cũng hiện ra khi gọi AI lỗi hoặc kết quả sai định dạng, kèm nút «Gọi AI lại».

Kết quả AI luôn được kiểm định dạng trước khi nạp và vào kho ở trạng thái «chờ duyệt».

Lưu ý về cầu nối:

- Chỉ nhận kết nối từ chính máy này (kiểm Host và Origin), chỉ ghi được 9 file bảng trong `db/`.
- Claude được gọi trong một thư mục tạm trống, bị chặn các công cụ chạy lệnh, sửa file, lên mạng, vì nội dung giáo viên dán vào có thể chứa chỉ dẫn lạ.
- Mỗi lượt gọi trừ vào hạn mức của tài khoản Claude đang đăng nhập trên máy (hiện là tài khoản dùng chung). Cầu nối hợp cho phát triển, demo và thử nghiệm; triển khai cho nhiều giáo viên cần công cụ AI được trường duyệt hoặc API riêng.

## Thêm môn khác

Sửa `db/chuong_trinh.js` (cùng cấu trúc), xóa hoặc giữ câu cũ trong `ngan_hang.js` / `loi_tu_duy.js`. Mã bài nên theo dạng `MÔN+LỚP-Bxx`, ví dụ `HH10-B02`.

Khung chương trình Sinh học 10 hiện là khung tạm theo CT 2018, cần đối chiếu kế hoạch dạy học của trường; nội dung câu hỏi mẫu cần giáo viên bộ môn rà lại.
