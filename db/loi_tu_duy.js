// Bảng loi_tu_duy — ghi bởi app Hiểu bài lúc 2026-11-04T04:14:21.178Z. Sửa tay được, giữ đúng cú pháp JSON
window.DB_SEED = window.DB_SEED || {};
DB_SEED.loi_tu_duy = [
 {
  "id": "SH10-B09-M1",
  "bai": "SH10-B09",
  "nguon": "mau",
  "ten": "Nghĩ chất tan khuếch tán từ nơi nồng độ thấp đến nơi nồng độ cao",
  "hs": "Có thể em đang nghĩ chất tan đi từ chỗ ít sang chỗ nhiều.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-001",
    "TN-004",
    "TN-005",
    "TN-006"
   ],
   "hinh": "khuech_tan",
   "hien_tuong": "Các phân tử chất tan luôn chuyển động lộn xộn không ngừng. Ở nơi đông phân tử (nồng độ cao), chúng va chạm nhiều và tỏa dần ra chỗ thưa hơn (nồng độ thấp), giống như người trong một phòng chật tự tản ra hành lang rộng. Vì vậy chất tan luôn đi từ nơi nồng độ cao đến nơi nồng độ thấp, cho đến khi hai nơi bằng nhau thì không còn dồn về phía nào nữa.",
   "vi_du": "Thả một thìa đường vào đáy cốc nước, không khuấy. Lúc đầu đáy cốc rất ngọt (nồng độ cao), mặt nước gần như không ngọt (nồng độ thấp). Để vài giờ, cả cốc ngọt đều: đường đã khuếch tán từ đáy lên mặt nước."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Trong cốc nước đường, chất nào là chất tan?",
    "o": [
     "Nước",
     "Đường",
     "Cái cốc"
    ],
    "d": 1,
    "giai": "Đường được hòa vào nước nên đường là chất tan; nước là dung môi."
   },
   {
    "muc": "hieu_tu",
    "q": "Cốc A: 1 thìa đường trong 200 ml nước. Cốc B: 3 thìa đường trong 200 ml nước. Cốc nào có nồng độ đường cao hơn?",
    "o": [
     "Cốc A",
     "Cốc B",
     "Bằng nhau"
    ],
    "d": 1,
    "giai": "Cùng 200 ml nước, cốc B có nhiều đường hơn nên nồng độ cao hơn (uống thấy ngọt hơn)."
   },
   {
    "muc": "ap_dung",
    "q": "Nối cốc A và cốc B ở câu trước bằng một ống thông nhau. Đường sẽ đi theo chiều nào?",
    "o": [
     "Từ cốc A sang cốc B",
     "Từ cốc B sang cốc A",
     "Không đi đâu cả"
    ],
    "d": 1,
    "giai": "Đường đi từ nơi nồng độ cao (cốc B) sang nơi nồng độ thấp (cốc A), đến khi hai cốc ngọt như nhau."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Nhỏ một giọt mực vào cốc nước, mực lan dần ra khắp cốc. Mực đã đi:",
    "o": [
     "Từ chỗ ít mực đến chỗ nhiều mực",
     "Từ chỗ nhiều mực đến chỗ ít mực"
    ],
    "d": 1,
    "giai": "Chỗ giọt mực rơi xuống có nồng độ mực cao nhất; mực tỏa dần ra chỗ chưa có mực (nồng độ thấp). Đó chính là khuếch tán."
   }
  ]
 },
 {
  "id": "SH10-B09-M2",
  "bai": "SH10-B09",
  "nguon": "mau",
  "ten": "Nhầm chiều di chuyển của nước trong thẩm thấu",
  "hs": "Có thể em đang nghĩ nước đi về phía dung dịch loãng hơn.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-002",
    "TN-005",
    "TN-007",
    "TN-008"
   ],
   "hinh": "tham_thau",
   "hien_tuong": "Hãy nghĩ theo nước, đừng nghĩ theo chất tan. Dung dịch loãng (ít chất tan) thì chứa nhiều nước; dung dịch đặc (nhiều chất tan) thì chứa ít nước hơn. Nước cũng tự đi từ nơi nhiều nước sang nơi ít nước, tức là từ dung dịch loãng sang dung dịch đặc. Màng chỉ cho nước qua, giữ chất tan lại, nên nước «chạy» về phía có nhiều chất tan như để pha loãng bên đó.",
   "vi_du": "Rắc đường lên đĩa dâu tây cắt lát. Bên ngoài (lớp đường) đặc hơn bên trong tế bào quả dâu, nên nước từ trong quả đi ra: vài phút sau đĩa có nước, quả dâu mềm đi."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Trong thẩm thấu, chất đi qua màng là:",
    "o": [
     "Chất tan (đường, muối)",
     "Nước"
    ],
    "d": 1,
    "giai": "Thẩm thấu là sự di chuyển của nước qua màng; chất tan bị màng giữ lại."
   },
   {
    "muc": "hieu_tu",
    "q": "Dung dịch nào chứa nhiều nước hơn?",
    "o": [
     "Nước đường loãng",
     "Nước đường đặc"
    ],
    "d": 0,
    "giai": "Ít đường thì phần lớn là nước, nên dung dịch loãng chứa nhiều nước hơn."
   },
   {
    "muc": "ap_dung",
    "q": "Hai bên một màng: bên trái là nước muối loãng, bên phải là nước muối đặc. Nước sẽ đi:",
    "o": [
     "Từ trái sang phải",
     "Từ phải sang trái"
    ],
    "d": 0,
    "giai": "Nước đi từ nơi loãng (nhiều nước) sang nơi đặc (ít nước): từ trái sang phải."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Rắc đường lên dâu tây cắt lát, một lúc sau dâu ra nước. Nước đã đi:",
    "o": [
     "Từ lớp đường vào trong quả dâu",
     "Từ trong quả dâu ra lớp đường"
    ],
    "d": 1,
    "giai": "Bên ngoài nhiều đường hơn bên trong tế bào quả dâu, nên nước đi ra ngoài."
   }
  ]
 },
 {
  "id": "SH10-B09-M3",
  "bai": "SH10-B09",
  "nguon": "mau",
  "ten": "Nghĩ vận chuyển thụ động cũng cần năng lượng ATP",
  "hs": "Có thể em đang nghĩ mọi cách vận chuyển qua màng đều tốn năng lượng.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-010",
    "TN-011",
    "TN-006"
   ],
   "hinh": "van_chuyen",
   "hien_tuong": "Chất đi từ nơi nồng độ cao đến nơi nồng độ thấp là đi «xuôi dốc»: nó tự xảy ra, như quả bóng tự lăn xuống dốc mà không cần ai đẩy. Vì vậy khuếch tán và thẩm thấu (gọi chung là vận chuyển thụ động) không tốn ATP. Chỉ khi phải đưa chất «lên dốc», từ nơi nồng độ thấp đến nơi nồng độ cao, tế bào mới phải tiêu ATP.",
   "vi_du": "Khi ta hít vào, trong phổi có nhiều O₂ hơn trong máu, nên O₂ tự khuếch tán từ phổi vào máu mà cơ thể không phải tốn năng lượng cho việc này."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "ATP có vai trò gì đối với tế bào?",
    "o": [
     "Là một loại muối khoáng",
     "Là nguồn năng lượng tế bào dùng khi làm việc tốn sức",
     "Là một bào quan"
    ],
    "d": 1,
    "giai": "ATP như «đồng tiền năng lượng»: tế bào tiêu ATP khi phải làm việc tốn sức."
   },
   {
    "muc": "hieu_tu",
    "q": "Quả bóng lăn xuống dốc có cần người đẩy không?",
    "o": [
     "Cần",
     "Không cần"
    ],
    "d": 1,
    "giai": "Đi xuôi dốc thì tự diễn ra. Chất đi xuôi chiều nồng độ (cao → thấp) cũng tự diễn ra như vậy."
   },
   {
    "muc": "ap_dung",
    "q": "O₂ đi từ phổi (nhiều O₂) vào máu (ít O₂). Quá trình này:",
    "o": [
     "Tốn ATP vì đi ngược chiều nồng độ",
     "Không tốn ATP vì đi xuôi chiều nồng độ"
    ],
    "d": 1,
    "giai": "Từ nơi nhiều sang nơi ít là xuôi chiều nồng độ, nên không tốn ATP."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Cách vận chuyển nào KHÔNG tốn ATP?",
    "o": [
     "Khuếch tán",
     "Bơm chất ngược chiều nồng độ"
    ],
    "d": 0,
    "giai": "Khuếch tán là vận chuyển thụ động, đi xuôi chiều nồng độ nên không tốn ATP."
   }
  ]
 },
 {
  "id": "SH10-B09-M4",
  "bai": "SH10-B09",
  "nguon": "mau",
  "ten": "Nghĩ vận chuyển chủ động cũng đi xuôi chiều nồng độ",
  "hs": "Có thể em đang nghĩ vận chuyển chủ động giống khuếch tán, chỉ là nhanh hơn.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-011",
    "TN-012",
    "TN-013",
    "TN-010"
   ],
   "hinh": "van_chuyen",
   "hien_tuong": "Có lúc tế bào cần lấy thêm một chất dù bên trong đã có nhiều hơn bên ngoài. Lúc này chất phải đi «lên dốc»: từ nơi nồng độ thấp đến nơi nồng độ cao. Việc này không tự xảy ra. Tế bào phải dùng bơm protein trên màng và tiêu ATP để đẩy chất vào, giống như phải tốn sức đẩy xe lên dốc. Đó là vận chuyển chủ động.",
   "vi_du": "Trong đất có ít ion khoáng (như K⁺) hơn trong tế bào lông hút của rễ, nhưng rễ vẫn hút thêm được K⁺ nhờ bơm protein và ATP."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Đẩy xe từ chân dốc lên đỉnh dốc thì:",
    "o": [
     "Xe tự lên được",
     "Phải tốn sức đẩy"
    ],
    "d": 1,
    "giai": "Đi ngược dốc phải tốn sức. Đưa chất từ nơi nồng độ thấp lên nơi nồng độ cao cũng phải tốn năng lượng."
   },
   {
    "muc": "hieu_tu",
    "q": "Chất đi từ nơi nồng độ thấp đến nơi nồng độ cao là đi:",
    "o": [
     "Xuôi chiều nồng độ",
     "Ngược chiều nồng độ"
    ],
    "d": 1,
    "giai": "Thấp → cao là ngược chiều nồng độ."
   },
   {
    "muc": "ap_dung",
    "q": "Để đưa chất đi ngược chiều nồng độ, tế bào cần:",
    "o": [
     "Bơm protein và ATP",
     "Chỉ cần lớp phospholipid của màng"
    ],
    "d": 0,
    "giai": "Bơm protein dùng năng lượng ATP để đẩy chất ngược chiều nồng độ."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Trong tế bào có 50 phần K⁺, bên ngoài chỉ có 5 phần K⁺, nhưng tế bào vẫn lấy thêm K⁺ vào. Đây là:",
    "o": [
     "Khuếch tán",
     "Vận chuyển chủ động"
    ],
    "d": 1,
    "giai": "K⁺ đi từ ngoài (ít) vào trong (nhiều): ngược chiều nồng độ, nên là vận chuyển chủ động."
   }
  ]
 },
 {
  "id": "SH10-B09-M5",
  "bai": "SH10-B09",
  "nguon": "mau",
  "ten": "Nhầm môi trường ưu trương với nhược trương",
  "hs": "Có thể em đang nhầm «ưu trương» với «nhược trương».",
  "bai_giang": {
   "thuat_ngu": [
    "TN-005",
    "TN-009",
    "TN-008"
   ],
   "hinh": "uu_truong",
   "hien_tuong": "«Ưu trương», «nhược trương», «đẳng trương» luôn là so môi trường bên ngoài với bên trong tế bào. Ưu trương: bên ngoài nhiều chất tan hơn, nước trong tế bào đi ra, tế bào mất nước và co lại. Nhược trương: bên ngoài ít chất tan hơn, nước đi vào, tế bào trương lên (tế bào động vật có thể vỡ). Đẳng trương: hai bên bằng nhau, nước ra vào cân bằng, tế bào giữ nguyên.",
   "vi_du": "Ngâm rau muống trong nước muối đặc (ưu trương), rau héo vì tế bào mất nước. Ngâm rau héo vào chậu nước sạch (nhược trương), rau tươi lại vì nước đi vào tế bào."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Môi trường ưu trương có nồng độ chất tan so với bên trong tế bào:",
    "o": [
     "Cao hơn",
     "Thấp hơn",
     "Bằng"
    ],
    "d": 0,
    "giai": "«Ưu» nghĩa là hơn: bên ngoài nhiều chất tan hơn bên trong."
   },
   {
    "muc": "hieu_tu",
    "q": "Nước cất (gần như không có chất tan) là môi trường gì đối với tế bào?",
    "o": [
     "Ưu trương",
     "Nhược trương",
     "Đẳng trương"
    ],
    "d": 1,
    "giai": "Nước cất có ít chất tan hơn bên trong tế bào nên là nhược trương."
   },
   {
    "muc": "ap_dung",
    "q": "Đặt tế bào trong môi trường ưu trương thì nước sẽ:",
    "o": [
     "Đi từ tế bào ra ngoài",
     "Đi từ ngoài vào tế bào"
    ],
    "d": 0,
    "giai": "Bên ngoài nhiều chất tan hơn nên nước đi ra; tế bào mất nước."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Ngâm rau héo vào chậu nước sạch, rau tươi lại vì:",
    "o": [
     "Nước sạch là môi trường ưu trương, nước đi ra",
     "Nước sạch là môi trường nhược trương, nước đi vào tế bào"
    ],
    "d": 1,
    "giai": "Nước sạch ít chất tan hơn tế bào rau (nhược trương), nước đi vào làm tế bào căng lại."
   }
  ]
 },
 {
  "id": "SH10-B09-M6",
  "bai": "SH10-B09",
  "nguon": "mau",
  "ten": "Nghĩ mọi chất đều đi thẳng qua lớp phospholipid của màng",
  "hs": "Có thể em đang nghĩ chất nào cũng chui thẳng qua màng được.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-007",
    "TN-014",
    "TN-013"
   ],
   "hinh": "mang",
   "hien_tuong": "Lớp giữa của màng giống một lớp mỡ. Dầu mỡ và nước không hòa vào nhau, nên chất «ưa nước» như ion (Na⁺, K⁺) hay glucose rất khó chui qua lớp mỡ này; chúng phải đi qua «cửa riêng» là kênh protein. Chỉ những phân tử rất nhỏ, không phân cực như O₂, CO₂ mới lọt thẳng qua. Còn những thứ rất lớn như protein, vi khuẩn thì không qua cửa nào được; tế bào phải «nuốt» vào hoặc «nhả» ra bằng nhập bào, xuất bào.",
   "vi_du": "Nhỏ vài giọt dầu ăn vào cốc nước: dầu nổi thành lớp riêng, không hòa vào nước. Lớp giữa của màng cũng «không ưa nước» như vậy."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Nhỏ dầu ăn vào cốc nước thì:",
    "o": [
     "Dầu hòa tan đều trong nước",
     "Dầu tách thành lớp riêng"
    ],
    "d": 1,
    "giai": "Dầu và nước không hòa vào nhau. Lớp giữa của màng giống dầu nên chất ưa nước khó lọt qua."
   },
   {
    "muc": "hieu_tu",
    "q": "Chất nào nhỏ, không phân cực, lọt thẳng qua lớp phospholipid được?",
    "o": [
     "O₂",
     "Ion Na⁺",
     "Glucose"
    ],
    "d": 0,
    "giai": "O₂ rất nhỏ, không phân cực nên đi thẳng qua; Na⁺ và glucose cần kênh protein."
   },
   {
    "muc": "ap_dung",
    "q": "Ion K⁺ đi qua màng bằng cách:",
    "o": [
     "Chui thẳng qua lớp phospholipid",
     "Đi qua kênh protein"
    ],
    "d": 1,
    "giai": "Ion mang điện, ưa nước nên phải đi qua kênh protein."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Một phân tử protein rất lớn muốn ra khỏi tế bào thì phải:",
    "o": [
     "Khuếch tán qua lớp phospholipid",
     "Được đóng gói vào túi rồi xuất bào"
    ],
    "d": 1,
    "giai": "Phân tử quá lớn không qua được lớp phospholipid hay kênh protein; tế bào dùng xuất bào."
   }
  ]
 },
 {
  "id": "SH10-B09-M7",
  "bai": "SH10-B09",
  "nguon": "mau",
  "ten": "Nhầm các cách vận chuyển chất có kích thước lớn",
  "hs": "Có thể em đang nhầm nhập bào với xuất bào.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-015",
    "TN-007"
   ],
   "hinh": "nhap_xuat",
   "hien_tuong": "Với vật quá lớn, tế bào dùng chính màng của mình để vận chuyển. Nhập bào: màng lõm vào, bao lấy vật rồi khép lại thành một túi đưa vào trong; nếu vật là chất rắn thì gọi là thực bào (như «ăn»), nếu là giọt dịch thì gọi là ẩm bào (như «uống»). Xuất bào thì ngược lại: túi chứa chất bên trong tế bào di chuyển ra, dính vào màng rồi mở ra, đổ chất ra ngoài.",
   "vi_du": "Bạch cầu «ăn» vi khuẩn bằng thực bào. Tế bào tuyến tụy đưa enzyme tiêu hóa ra ngoài bằng xuất bào."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "«Nhập bào» nghĩa là đưa chất:",
    "o": [
     "Vào trong tế bào",
     "Ra ngoài tế bào"
    ],
    "d": 0,
    "giai": "«Nhập» là vào, «xuất» là ra."
   },
   {
    "muc": "hieu_tu",
    "q": "Thực bào khác ẩm bào ở chỗ thực bào đưa vào:",
    "o": [
     "Vật rắn lớn",
     "Giọt dịch lỏng"
    ],
    "d": 0,
    "giai": "«Thực» như ăn (vật rắn), «ẩm» như uống (giọt dịch)."
   },
   {
    "muc": "ap_dung",
    "q": "Túi chứa chất trong tế bào dính vào màng rồi đổ chất ra ngoài. Đây là:",
    "o": [
     "Nhập bào",
     "Xuất bào"
    ],
    "d": 1,
    "giai": "Đưa chất ra ngoài bằng túi dính vào màng là xuất bào."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Bạch cầu bắt vi khuẩn bằng cách lõm màng bao lấy vi khuẩn. Đây là:",
    "o": [
     "Xuất bào",
     "Thực bào",
     "Ẩm bào"
    ],
    "d": 1,
    "giai": "Màng lõm vào đưa vật rắn (vi khuẩn) vào trong là thực bào."
   }
  ]
 },
 {
  "id": "SH10-B03-M1",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Nhầm dấu hiệu sống của cơ thể (cảm ứng, vận động, trao đổi chất) với đặc điểm chung của mọi cấp độ",
  "hs": "Có thể em đang nghĩ cái gì đúng với một con vật (cảm ứng, vận động, trao đổi chất) thì cũng được tính thành một đặc điểm chung riêng của mọi cấp độ tổ chức sống.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-016",
    "TN-017",
    "TN-018"
   ],
   "hien_tuong": "Câu hỏi hỏi về đặc điểm của các cấp độ tổ chức sống, tức là điều đúng cho TẤT CẢ các cấp: tế bào, cơ thể, quần thể, quần xã và hệ sinh thái. SGK chỉ nêu 3 đặc điểm: tổ chức theo nguyên tắc thứ bậc; là hệ mở, tự điều chỉnh; liên tục tiến hóa. Cảm ứng và vận động chỉ là biểu hiện của cơ thể sinh vật, vì một khu rừng không thể «rụt lại» như bàn tay. Còn «trao đổi chất với môi trường» chính là ý nghĩa của «hệ mở», đã nằm trong ý (4), nên không đếm thêm thành một ý riêng. Cũng như khi kể điểm chung của mọi trường học, em không kể «có hồ bơi» vì không phải trường nào cũng có.",
   "vi_du": "Một tế bào, một con bò, một đàn bò và cả đồng cỏ đều được xếp theo bậc, đều trao đổi chất với môi trường, tự điều chỉnh và thay đổi dần qua nhiều thế hệ. Nhưng chỉ con bò mới quất đuôi đuổi ruồi, đó là cảm ứng của riêng cơ thể.",
   "hinh": null,
   "mo_ta_hinh": "Bảng 2 cột. Cột trái «Đặc điểm chung của mọi cấp độ» có 3 ô: thứ bậc; hệ mở, tự điều chỉnh; liên tục tiến hóa. Hàng biểu tượng tế bào, con voi, đàn voi, khu rừng đều được đánh dấu ✓. Cột phải «Chỉ là biểu hiện của cơ thể» có cảm ứng, vận động: chỉ con voi được ✓, khu rừng bị ✗."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Theo SGK, các cấp độ tổ chức sống có bao nhiêu đặc điểm chung?",
    "o": [
     "3",
     "5",
     "6"
    ],
    "d": 0,
    "giai": "Chỉ có 3 đặc điểm: tổ chức theo nguyên tắc thứ bậc; là hệ mở và tự điều chỉnh; liên tục tiến hóa."
   },
   {
    "muc": "hieu_tu",
    "q": "Hiện tượng nào sau đây là cảm ứng?",
    "o": [
     "Rễ cây hút nước",
     "Lá cây trinh nữ cụp lại khi bị chạm",
     "Tế bào phân chia thành 2"
    ],
    "d": 1,
    "giai": "Cảm ứng là nhận kích thích rồi phản ứng lại. Lá trinh nữ cụp xuống là phản ứng khi bị chạm."
   },
   {
    "muc": "ap_dung",
    "q": "Ý nào đúng với MỌI cấp độ, từ tế bào đến hệ sinh thái?",
    "o": [
     "Có khả năng chạy trốn kẻ thù",
     "Là hệ mở, luôn trao đổi chất và năng lượng với môi trường",
     "Có hệ thần kinh"
    ],
    "d": 1,
    "giai": "Tế bào hay khu rừng đều không chạy trốn được và cũng không có hệ thần kinh, nhưng tất cả đều trao đổi chất với môi trường, tức là hệ mở."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Cho các ý: (1) Là hệ mở, có khả năng tự điều chỉnh. (2) Có khả năng vận động. (3) Liên tục tiến hóa. (4) Có hệ thần kinh. Có mấy ý là đặc điểm chung của các cấp độ tổ chức sống?",
    "o": [
     "2",
     "3",
     "4"
    ],
    "d": 0,
    "giai": "Chỉ (1) và (3) đúng. Vận động và hệ thần kinh chỉ có ở một số cơ thể sinh vật, quần xã hay hệ sinh thái thì không có."
   }
  ]
 },
 {
  "id": "SH10-B03-M2",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Nhầm hệ kín với hệ mở (nghĩ rằng ổn định là nhờ khép kín)",
  "hs": "Có thể em đang nghĩ tổ chức sống bền vững, ổn định được là vì nó khép kín, không trao đổi gì với bên ngoài.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-019",
    "TN-020",
    "TN-021"
   ],
   "hien_tuong": "Mọi cấp độ tổ chức sống đều là hệ mở, luôn nhận vào và thải ra vật chất, năng lượng. Nếu bị đóng kín, sinh vật không lấy được thức ăn và O₂, cũng không thải được chất thải, nên sẽ chết. Tổ chức sống ổn định không phải nhờ «đóng cửa» mà nhờ tự điều chỉnh: thay đổi hoạt động bên trong để bù lại những thay đổi bên ngoài. Giống một cửa hàng mở cửa cả ngày, khách ra vào liên tục, nhưng chủ cửa hàng luôn nhập thêm hàng nên kệ không bao giờ trống. Vì vậy ý «là hệ kín» là SAI.",
   "vi_du": "Con cá trong bể liên tục lấy O₂ hòa tan trong nước và thải CO₂, phân ra nước. Nếu đậy kín bể và không thay nước, chỉ sau vài ngày cá sẽ chết.",
   "hinh": null,
   "mo_ta_hinh": "Hai hình cạnh nhau. Bên trái là chai nước đóng nắp, mũi tên vào và ra đều bị chặn (hệ kín). Bên phải là một người có mũi tên đi vào (thức ăn, nước, O₂) và mũi tên đi ra (CO₂, mồ hôi, chất thải), kèm nhiệt kế giữ ở 37 °C để minh họa khả năng tự điều chỉnh."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Vật nào sau đây là một hệ mở?",
    "o": [
     "Chai nước đóng nắp kín",
     "Cây lúa ngoài đồng"
    ],
    "d": 1,
    "giai": "Cây lúa luôn hút nước, lấy CO₂ và ánh sáng, thải ra O₂, nghĩa là có trao đổi với môi trường. Đó là hệ mở."
   },
   {
    "muc": "hieu_tu",
    "q": "Tự điều chỉnh là gì?",
    "o": [
     "Tự giữ điều kiện bên trong ổn định khi môi trường thay đổi",
     "Đóng kín, không trao đổi chất với môi trường",
     "Tự lớn lên về kích thước"
    ],
    "d": 0,
    "giai": "Tự điều chỉnh là tự kéo các điều kiện bên trong (nhiệt độ, lượng nước…) trở về mức bình thường."
   },
   {
    "muc": "ap_dung",
    "q": "Khi chạy bộ, nhiệt độ cơ thể tăng lên và cơ thể đổ mồ hôi để hạ nhiệt. Đây là biểu hiện của:",
    "o": [
     "Hệ kín",
     "Khả năng tự điều chỉnh"
    ],
    "d": 1,
    "giai": "Đổ mồ hôi giúp thân nhiệt trở về khoảng 37 °C. Đó là tự điều chỉnh, và mồ hôi thoát ra ngoài cũng cho thấy cơ thể là hệ mở."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Cho các ý: (1) Là hệ kín, cách li với môi trường. (2) Là hệ mở, có khả năng tự điều chỉnh. (3) Tổ chức theo nguyên tắc thứ bậc. Những ý nào là đặc điểm chung của các cấp độ tổ chức sống?",
    "o": [
     "(1) và (3)",
     "(2) và (3)",
     "Cả (1), (2) và (3)"
    ],
    "d": 1,
    "giai": "Tổ chức sống là hệ mở chứ không phải hệ kín, nên ý (1) sai. Chỉ (2) và (3) đúng."
   }
  ]
 },
 {
  "id": "SH10-B03-M3",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Bỏ sót đặc điểm «liên tục tiến hóa»",
  "hs": "Có thể em đang nghĩ tiến hóa chỉ là chuyện xảy ra từ hàng triệu năm trước, không phải đặc điểm của các tổ chức sống hôm nay.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-022",
    "TN-023",
    "TN-024"
   ],
   "hien_tuong": "Sự sống được truyền từ thế hệ này sang thế hệ khác. Trong quá trình đó luôn xuất hiện những biến đổi nhỏ, và môi trường giữ lại những biến đổi có lợi. Vì thế sinh vật không đứng yên mà luôn thay đổi dần qua các thế hệ, và tiến hóa vẫn đang diễn ra ngay hôm nay, không chỉ ở thời khủng long. Giống điện thoại năm nào cũng có phiên bản mới, giữ lại những cải tiến tốt, sự sống cũng liên tục «cập nhật» qua từng thế hệ. Đây là 1 trong 3 đặc điểm chung, cùng với thứ bậc và hệ mở – tự điều chỉnh.",
   "vi_du": "Ở những nơi phun thuốc diệt muỗi nhiều năm, dần xuất hiện các dòng muỗi kháng thuốc: loại thuốc trước kia diệt gần hết muỗi, nay diệt kém hơn hẳn.",
   "hinh": null,
   "mo_ta_hinh": "Dòng thời gian 3 thế hệ vi khuẩn. Thế hệ 1: khi gặp kháng sinh, đa số chết, chỉ vài con sống sót (tô màu khác). Thế hệ 3: gần như toàn bộ là vi khuẩn kháng thuốc. Chú thích: sự sống liên tục tiến hóa."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Tiến hóa là gì?",
    "o": [
     "Sự lớn lên của một con vật trong suốt đời nó",
     "Sự thay đổi dần của sinh vật qua nhiều thế hệ"
    ],
    "d": 1,
    "giai": "Lớn lên trong một đời là sinh trưởng. Tiến hóa diễn ra qua nhiều thế hệ."
   },
   {
    "muc": "hieu_tu",
    "q": "Ông bà, bố mẹ và em là mấy thế hệ?",
    "o": [
     "1",
     "2",
     "3"
    ],
    "d": 2,
    "giai": "Mỗi lượt sinh con tạo ra một thế hệ mới: ông bà, bố mẹ, em là 3 thế hệ."
   },
   {
    "muc": "ap_dung",
    "q": "Sau nhiều năm, vi khuẩn dần kháng thuốc kháng sinh. Hiện tượng này cho thấy:",
    "o": [
     "Sự sống liên tục tiến hóa",
     "Sự sống là hệ kín",
     "Sự sống không bao giờ thay đổi"
    ],
    "d": 0,
    "giai": "Vi khuẩn thay đổi qua nhiều thế hệ để thích nghi với kháng sinh, tức là tiến hóa vẫn đang diễn ra."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Cho các ý: (1) Liên tục tiến hóa. (2) Là hệ mở, có khả năng tự điều chỉnh. (3) Tổ chức theo nguyên tắc thứ bậc. Có mấy ý là đặc điểm chung của các cấp độ tổ chức sống?",
    "o": [
     "1",
     "2",
     "3"
    ],
    "d": 2,
    "giai": "Cả 3 ý đều là đặc điểm chung. Đừng bỏ sót ý «liên tục tiến hóa»."
   }
  ]
 },
 {
  "id": "SH10-B03-M4",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Nhầm hoạt động sống cơ bản (trao đổi chất, sinh sản, sinh trưởng) với cơ chế giữ ổn định",
  "hs": "Có thể em đang nghĩ hoạt động sống nào quan trọng (ăn uống, sinh sản, lớn lên) cũng là thứ giữ cho tổ chức sống ổn định.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-025",
    "TN-021",
    "TN-026",
    "TN-027"
   ],
   "hien_tuong": "Trao đổi chất, sinh sản và sinh trưởng đều là hoạt động sống quan trọng, nhưng không hoạt động nào trong số đó tự giữ cho cơ thể ổn định. Trao đổi chất làm bên trong luôn biến đổi, sinh sản giúp duy trì nòi giống, còn sinh trưởng làm cơ thể lớn lên. Thứ giúp tổ chức sống bền vững, ổn định là khả năng tự điều chỉnh: khi có gì lệch khỏi mức bình thường, cơ thể tự kéo nó trở lại, và kết quả là cân bằng nội môi. Giống máy điều hòa có cảm biến: phòng nóng lên thì máy tự làm lạnh, lạnh quá thì máy tự ngừng, nhờ vậy phòng luôn giữ khoảng 26 °C.",
   "vi_du": "Ăn một chiếc bánh ngọt xong, lượng đường trong máu tăng lên. Cơ thể tiết hoocmôn insulin để đưa đường vào tế bào, nên đường huyết trở về mức bình thường. Khi khả năng tự điều chỉnh này bị hỏng, người đó mắc bệnh tiểu đường.",
   "hinh": null,
   "mo_ta_hinh": "Sơ đồ vòng điều chỉnh thân nhiệt, giữa vòng ghi «Cân bằng nội môi 37 °C». Nhánh trên: trời nóng → thân nhiệt tăng → đổ mồ hôi → thân nhiệt về 37 °C. Nhánh dưới: trời lạnh → thân nhiệt giảm → run, nổi da gà → thân nhiệt về 37 °C."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Cân bằng nội môi là gì?",
    "o": [
     "Giữ môi trường bên trong cơ thể gần như không đổi",
     "Sinh ra con cái giống mình",
     "Cơ thể lớn lên về kích thước"
    ],
    "d": 0,
    "giai": "Cân bằng nội môi là giữ nhiệt độ, lượng nước, lượng đường… bên trong cơ thể ở mức ổn định."
   },
   {
    "muc": "hieu_tu",
    "q": "Thân nhiệt của một người buổi sáng là 36,6 °C, buổi chiều là 37,1 °C. Điều này cho thấy thân nhiệt:",
    "o": [
     "Ổn định tương đối",
     "Thay đổi lung tung, không ổn định"
    ],
    "d": 0,
    "giai": "Thân nhiệt chỉ dao động trong khoảng hẹp quanh 37 °C, nên gọi là ổn định tương đối."
   },
   {
    "muc": "ap_dung",
    "q": "Trời nắng nóng, em đổ nhiều mồ hôi. Hoạt động này giúp:",
    "o": [
     "Sinh sản",
     "Giữ thân nhiệt ổn định nhờ tự điều chỉnh",
     "Cơ thể lớn nhanh hơn"
    ],
    "d": 1,
    "giai": "Mồ hôi bay hơi làm mát da, kéo thân nhiệt về khoảng 37 °C. Đó là tự điều chỉnh để giữ cân bằng nội môi."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Một người uống nhiều nước thì đi tiểu nhiều hơn, nhờ đó lượng nước trong máu luôn ổn định. Đặc tính nào giúp điều này?",
    "o": [
     "Sinh trưởng và phát triển",
     "Khả năng tự điều chỉnh và cân bằng nội môi",
     "Sinh sản"
    ],
    "d": 1,
    "giai": "Cơ thể tự phát hiện dư nước và tự thải bớt ra. Đây là tự điều chỉnh, giúp giữ cân bằng nội môi."
   }
  ]
 },
 {
  "id": "SH10-B03-M5",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Không nắm quan hệ «thành phần – tổng thể» giữa tế bào, cơ thể và quần thể",
  "hs": "Có thể em đang nghĩ cơ thể là cấp nhỏ nhất (hoặc lớn nhất), mà chưa để ý rằng cơ thể được xây từ tế bào và nhiều cơ thể mới hợp thành quần thể.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-028",
    "TN-029",
    "TN-030",
    "TN-031"
   ],
   "hien_tuong": "Các cấp độ giống bộ búp bê lồng nhau: con lớn chứa con nhỏ bên trong. Nhiều tế bào tạo nên một cơ thể, nhiều cơ thể cùng loài tạo nên quần thể, nhiều quần thể khác loài tạo nên quần xã. Quần xã cộng với môi trường sống (đất, nước, ánh sáng) thì tạo nên hệ sinh thái. Cơ thể được làm từ tế bào nên tế bào luôn đứng trước cơ thể, và quần thể gồm nhiều cơ thể nên cơ thể đứng trước quần thể. Mẹo kiểm tra: đọc thử «A nằm bên trong B», nếu đúng thì A đứng trước B.",
   "vi_du": "Một tế bào cơ → con bò (cơ thể) → đàn bò trên đồng (quần thể) → bò, cỏ, châu chấu, chim sáo trên đồng (quần xã) → tất cả cùng với đất, nước, ánh nắng của cánh đồng (hệ sinh thái).",
   "hinh": null,
   "mo_ta_hinh": "Năm vòng tròn lồng nhau, từ trong ra ngoài: tế bào → cơ thể (con bò) → quần thể (đàn bò) → quần xã (bò, cỏ, chim) → hệ sinh thái (thêm mặt trời, đất, nước). Mũi tên chỉ từ trong ra ngoài ghi «thấp → cao»."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Cơ thể con mèo được tạo nên từ:",
    "o": [
     "Nhiều tế bào",
     "Nhiều quần thể"
    ],
    "d": 0,
    "giai": "Mọi cơ thể sinh vật đều được tạo nên từ tế bào, nên tế bào là cấp thấp hơn cơ thể."
   },
   {
    "muc": "hieu_tu",
    "q": "Nhóm nào sau đây là một quần thể?",
    "o": [
     "Một con trâu",
     "Đàn trâu 30 con trong một làng",
     "Trâu, cỏ, cò trên cánh đồng"
    ],
    "d": 1,
    "giai": "Quần thể gồm nhiều cá thể cùng một loài sống cùng nơi. Một con trâu là cá thể, còn nhiều loài sống chung là quần xã."
   },
   {
    "muc": "ap_dung",
    "q": "Sắp xếp từ nhỏ đến lớn: cây lúa, tế bào lá lúa, ruộng lúa (gồm nhiều cây lúa).",
    "o": [
     "Tế bào lá lúa → cây lúa → ruộng lúa",
     "Cây lúa → tế bào lá lúa → ruộng lúa",
     "Ruộng lúa → cây lúa → tế bào lá lúa"
    ],
    "d": 0,
    "giai": "Tế bào nằm trong cây lúa, cây lúa nằm trong ruộng lúa, nên tế bào → cơ thể → quần thể."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Cho các cấp độ: (1) quần thể, (2) tế bào, (3) cơ thể. Thứ tự từ thấp đến cao là:",
    "o": [
     "3 → 2 → 1",
     "2 → 3 → 1",
     "2 → 1 → 3"
    ],
    "d": 1,
    "giai": "Tế bào tạo nên cơ thể, nhiều cơ thể tạo nên quần thể: 2 → 3 → 1."
   }
  ]
 },
 {
  "id": "SH10-B03-M6",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Đảo chiều thứ bậc, xếp từ lớn xuống nhỏ theo số mà không kiểm tra từng bậc",
  "hs": "Có thể em đang nghĩ thứ bậc là xếp từ cấp lớn nhất xuống, nên thấy dãy số giảm dần 5 → 1 là chọn ngay mà chưa kiểm tra từng cặp.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-032",
    "TN-033"
   ],
   "hien_tuong": "Thứ bậc trong SGK luôn được đọc từ thấp đến cao: tế bào → cơ thể → quần thể → quần xã → hệ sinh thái. Mỗi mũi tên «→» có nghĩa là «tạo nên». Vì vậy cần kiểm tra từng cặp đứng cạnh nhau, chẳng hạn tế bào có tạo nên cơ thể không? Có. Trong dãy 5 → 4 → 3 → 2 → 1, phần đầu đi từ lớn xuống nhỏ nhưng cuối dãy «tế bào → cơ thể» lại đi từ nhỏ lên lớn, nên cả dãy bị lộn xộn. Giống cầu thang, mỗi bậc phải cao hơn bậc trước, chỉ một bậc thụt xuống là cả cầu thang hỏng.",
   "vi_du": "Xếp học sinh, lớp, khối, trường. Thứ tự đúng là học sinh → lớp → khối → trường. Nếu viết trường → khối → học sinh → lớp thì sai, vì cuối dãy bị đảo chiều.",
   "hinh": null,
   "mo_ta_hinh": "Cầu thang 5 bậc đi lên, bậc thấp nhất ghi «tế bào», tiếp theo là cơ thể, quần thể, quần xã, hệ sinh thái. Mũi tên đi lên ghi «cấp thấp làm nền tảng cho cấp cao». Bên cạnh vẽ một cầu thang lỗi có một bậc bị thụt xuống."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Theo nguyên tắc thứ bậc, các cấp độ tổ chức sống được sắp xếp:",
    "o": [
     "Từ cấp thấp đến cấp cao",
     "Tùy ý, không theo thứ tự"
    ],
    "d": 0,
    "giai": "Cấp thấp làm nền tảng xây nên cấp cao, nên xếp từ thấp đến cao."
   },
   {
    "muc": "hieu_tu",
    "q": "Trong cặp «tế bào – cơ thể», cấp nào thấp hơn?",
    "o": [
     "Cơ thể",
     "Tế bào"
    ],
    "d": 1,
    "giai": "Tế bào là thành phần tạo nên cơ thể, nên tế bào là cấp thấp hơn."
   },
   {
    "muc": "ap_dung",
    "q": "Dãy nào được xếp đúng từ thấp đến cao?",
    "o": [
     "Học sinh → lớp → trường",
     "Trường → học sinh → lớp",
     "Lớp → học sinh → trường"
    ],
    "d": 0,
    "giai": "Nhiều học sinh tạo nên lớp, nhiều lớp tạo nên trường. Mỗi bậc đều lớn hơn bậc trước."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Cho các cấp độ: (1) quần xã, (2) cơ thể, (3) quần thể, (4) tế bào. Thứ tự đúng theo nguyên tắc thứ bậc là:",
    "o": [
     "1 → 3 → 4 → 2",
     "4 → 2 → 3 → 1",
     "2 → 4 → 3 → 1"
    ],
    "d": 1,
    "giai": "Tế bào → cơ thể → quần thể → quần xã, tức là 4 → 2 → 3 → 1. Mỗi bậc là thành phần của bậc kế tiếp."
   }
  ]
 },
 {
  "id": "SH10-B03-M7",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Nhầm lẫn tên ba đặc điểm chung (thứ bậc – hệ mở – tự điều chỉnh)",
  "hs": "Có thể em đang nghĩ ba đặc điểm chung đều na ná nhau, nên thấy tên nào quen thì chọn tên đó.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-032",
    "TN-019",
    "TN-021"
   ],
   "hien_tuong": "Mỗi đặc điểm trả lời một câu hỏi khác nhau. Thứ bậc trả lời câu «Các cấp độ được xếp và xây nên nhau thế nào?»: cấp thấp làm nền tảng cho cấp cao. Hệ mở trả lời câu «Tổ chức sống quan hệ với môi trường ra sao?»: luôn trao đổi chất và năng lượng. Tự điều chỉnh trả lời câu «Làm sao giữ được ổn định?»: tự cân bằng bên trong. Câu nào có cụm «cấp thấp», «cấp cao», «nền tảng», «xây dựng nên» thì đó là nguyên tắc thứ bậc.",
   "vi_du": "Chiếc xe đạp: nhiều bộ phận nhỏ lắp thành chiếc xe (giống thứ bậc); phải có người đạp cung cấp sức thì xe mới chạy (giống hệ mở nhận năng lượng từ ngoài); người lái nghiêng người để giữ thăng bằng (giống tự điều chỉnh).",
   "hinh": null,
   "mo_ta_hinh": "Ba thẻ màu đặt cạnh nhau. Thẻ 1 «Thứ bậc» vẽ bậc thang từ tế bào đến hệ sinh thái. Thẻ 2 «Hệ mở» vẽ cơ thể có mũi tên vào, ra. Thẻ 3 «Tự điều chỉnh» vẽ nhiệt kế giữ 37 °C. Dưới mỗi thẻ ghi từ khóa nhận diện."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "«Luôn lấy vào và thải ra vật chất với môi trường» là nội dung của đặc điểm nào?",
    "o": [
     "Hệ mở",
     "Nguyên tắc thứ bậc"
    ],
    "d": 0,
    "giai": "Từ khóa «lấy vào – thải ra» với môi trường cho biết đây là hệ mở."
   },
   {
    "muc": "hieu_tu",
    "q": "«Giữ thân nhiệt khoảng 37 °C dù trời nóng hay lạnh» là biểu hiện của đặc điểm nào?",
    "o": [
     "Nguyên tắc thứ bậc",
     "Tự điều chỉnh"
    ],
    "d": 1,
    "giai": "Giữ ổn định bên trong khi môi trường thay đổi chính là tự điều chỉnh."
   },
   {
    "muc": "ap_dung",
    "q": "«Nhiều tế bào tạo nên cơ thể, nhiều cơ thể tạo nên quần thể» minh họa cho đặc điểm nào?",
    "o": [
     "Hệ mở",
     "Nguyên tắc thứ bậc",
     "Tự điều chỉnh"
    ],
    "d": 1,
    "giai": "Cấp nhỏ xây nên cấp lớn, nên đây là nguyên tắc thứ bậc."
   },
   {
    "muc": "gan_cau_goc",
    "q": "«Tổ chức sống cấp cao hơn được xây dựng từ các tổ chức sống cấp thấp hơn» là nội dung của nguyên tắc nào?",
    "o": [
     "Nguyên tắc tự điều chỉnh",
     "Nguyên tắc mở",
     "Nguyên tắc thứ bậc"
    ],
    "d": 2,
    "giai": "Có từ khóa «cấp cao», «cấp thấp», «xây dựng», nên đây là nguyên tắc thứ bậc."
   }
  ]
 },
 {
  "id": "SH10-B03-M8",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Nhầm với nguyên tắc bổ sung trong cấu trúc ADN",
  "hs": "Có thể em đang nghĩ «bổ sung» nghĩa là «thêm vào, xây thêm», nên hiểu là cấp thấp bổ sung để tạo ra cấp cao.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-034",
    "TN-032"
   ],
   "hien_tuong": "Trong lời nói hằng ngày, «bổ sung» có nghĩa là «thêm vào», nên rất dễ nghĩ cấp thấp «bổ sung» cho cấp cao. Nhưng trong Sinh học, «nguyên tắc bổ sung» là tên riêng của quy tắc ghép cặp trong phân tử ADN (A – T, G – C) và không liên quan gì đến cách sắp xếp các cấp độ sống. Câu «cấp thấp làm nền tảng xây nên cấp cao» là nguyên tắc thứ bậc. Giống chữ «bàn» trong «bàn học» và «bàn bạc»: cùng một chữ nhưng nghĩa khác hẳn.",
   "vi_du": "Xếp gạch thành tường, rồi tường thành nhà là «thứ bậc». Còn hai nửa dây kéo khóa áo phải khớp răng với nhau đúng từng cặp thì mới giống «bổ sung».",
   "hinh": null,
   "mo_ta_hinh": "Hình đôi. Bên trái là đoạn ADN hai mạch với các cặp A–T, G–C, ghi «nguyên tắc bổ sung». Bên phải là bậc thang tế bào → cơ thể → quần thể → quần xã → hệ sinh thái, ghi «nguyên tắc thứ bậc»."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Nguyên tắc bổ sung nói về điều gì?",
    "o": [
     "Cách ghép cặp A – T, G – C trong ADN",
     "Cách các cấp độ sống xây nên nhau"
    ],
    "d": 0,
    "giai": "Nguyên tắc bổ sung là quy tắc ghép cặp nucleotide giữa hai mạch ADN."
   },
   {
    "muc": "hieu_tu",
    "q": "Nguyên tắc thứ bậc nói về điều gì?",
    "o": [
     "Cách ghép cặp nucleotide",
     "Cấp thấp làm nền tảng cho cấp cao"
    ],
    "d": 1,
    "giai": "Thứ bậc nói về việc các cấp độ sống được xây từ thấp lên cao."
   },
   {
    "muc": "ap_dung",
    "q": "Một mạch ADN có đoạn A – G – T. Theo nguyên tắc bổ sung, đoạn tương ứng ở mạch kia là:",
    "o": [
     "T – C – A",
     "A – G – T",
     "G – A – C"
    ],
    "d": 0,
    "giai": "A ghép với T, G ghép với C, T ghép với A, nên được T – C – A. Đây mới là chỗ dùng nguyên tắc bổ sung."
   },
   {
    "muc": "gan_cau_goc",
    "q": "«Nhiều quần thể khác loài hợp lại tạo nên quần xã» thể hiện nguyên tắc nào?",
    "o": [
     "Nguyên tắc bổ sung",
     "Nguyên tắc thứ bậc"
    ],
    "d": 1,
    "giai": "Cấp thấp (quần thể) xây nên cấp cao (quần xã), nên đây là nguyên tắc thứ bậc."
   }
  ]
 },
 {
  "id": "SH10-B03-M9",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Bỏ qua chữ «đàn», nhầm quần thể với cá thể",
  "hs": "Có thể em đang nghĩ chỉ có loài voi nên đó là cấp cá thể, mà quên rằng chữ «đàn» nghĩa là nhiều con.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-035",
    "TN-030",
    "TN-036"
   ],
   "hien_tuong": "Cá thể là một con, còn quần thể là nhiều con cùng loài sống chung một nơi. Những chữ như «đàn», «bầy», «rừng thông», «ruộng lúa» là dấu hiệu của nhiều cá thể cùng loài. Đàn voi gồm nhiều con voi cùng một loài, cùng sống trong rừng, nên là quần thể. Giống như «một bạn học sinh» khác với «cả lớp 10A»: cả lớp gồm nhiều bạn.",
   "vi_du": "«Con cá chép» là một cá thể, còn «đàn cá chép trong ao» là một quần thể.",
   "hinh": null,
   "mo_ta_hinh": "Hai khung cạnh nhau. Khung trái vẽ 1 con voi, ghi «cá thể». Khung phải vẽ đàn voi nhiều con lớn nhỏ, ghi «quần thể – nhiều cá thể cùng loài»."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Ví dụ nào sau đây là một cá thể?",
    "o": [
     "Một con voi",
     "Một đàn voi"
    ],
    "d": 0,
    "giai": "Cá thể là một sinh vật riêng lẻ, tức là một con voi."
   },
   {
    "muc": "hieu_tu",
    "q": "Quần thể gồm:",
    "o": [
     "Nhiều cá thể cùng loài sống cùng một nơi",
     "Nhiều loài khác nhau sống cùng một nơi",
     "Một sinh vật riêng lẻ"
    ],
    "d": 0,
    "giai": "Quần thể là nhiều cá thể cùng loài. Nhiều loài sống chung là quần xã."
   },
   {
    "muc": "ap_dung",
    "q": "«Bầy chim sẻ trên cánh đồng» thuộc cấp độ nào?",
    "o": [
     "Cá thể",
     "Quần thể"
    ],
    "d": 1,
    "giai": "Chữ «bầy» nghĩa là nhiều con chim sẻ cùng loài, nên đây là quần thể."
   },
   {
    "muc": "gan_cau_goc",
    "q": "«Đàn trâu đang gặm cỏ trên đồng» thuộc cấp độ tổ chức sống nào?",
    "o": [
     "Cá thể",
     "Quần thể",
     "Hệ sinh thái"
    ],
    "d": 1,
    "giai": "Có nhiều con trâu cùng loài, còn «trên đồng» chỉ là nơi sống. Vậy đây là quần thể."
   }
  ]
 },
 {
  "id": "SH10-B03-M10",
  "bai": "SH10-B03",
  "nguon": "ai",
  "ten": "Tính cả nơi sống «trong rừng» vào nhóm, nhầm quần thể với quần xã hoặc hệ sinh thái",
  "hs": "Có thể em đang nghĩ cứ nhắc đến «rừng» là phải tính cả cây cối, các con vật khác và đất đá trong rừng.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-030",
    "TN-031",
    "TN-037"
   ],
   "hien_tuong": "Muốn xác định cấp độ, hãy tự hỏi: nhóm đang nói tới có mấy loài, và có kèm cả môi trường không? Cụm «sống trong rừng» chỉ cho biết đàn voi sống ở đâu, giống như địa chỉ nhà, chứ không gộp cây cối hay đất đá vào nhóm. Ở đây chỉ có một loài là voi, nên là quần thể. Nếu đề nói «các loài sinh vật trong rừng» (voi, khỉ, cây…) thì là quần xã, còn nếu nói «khu rừng» gồm cả sinh vật lẫn đất, nước, ánh sáng thì là hệ sinh thái. Như câu «gia đình em sống ở Hà Nội» chỉ nói về gia đình em, không phải cả thành phố.",
   "vi_du": "«Đàn cá rô phi trong hồ» là quần thể. «Cá, tôm, rong, ốc trong hồ» là quần xã. «Cả cái hồ, gồm sinh vật, nước, bùn và ánh sáng» là hệ sinh thái.",
   "hinh": null,
   "mo_ta_hinh": "Cảnh một khu rừng với ba khung lồng nhau. Khung nhỏ chỉ khoanh đàn voi (quần thể). Khung giữa khoanh voi, khỉ, cây, chim (quần xã). Khung lớn khoanh tất cả, thêm đất, suối và mặt trời (hệ sinh thái)."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Quần xã khác quần thể ở điểm nào?",
    "o": [
     "Quần xã gồm nhiều loài khác nhau",
     "Quần xã chỉ có một loài"
    ],
    "d": 0,
    "giai": "Quần thể chỉ có một loài, còn quần xã gồm nhiều loài sống chung."
   },
   {
    "muc": "hieu_tu",
    "q": "Hệ sinh thái gồm:",
    "o": [
     "Chỉ các sinh vật",
     "Quần xã sinh vật và môi trường sống (đất, nước, ánh sáng…)",
     "Một loài sinh vật"
    ],
    "d": 1,
    "giai": "Hệ sinh thái = quần xã + môi trường không sống xung quanh."
   },
   {
    "muc": "ap_dung",
    "q": "«Các loài cá, tôm, ốc, rong cùng sống trong một cái ao» thuộc cấp độ nào?",
    "o": [
     "Quần thể",
     "Quần xã",
     "Cá thể"
    ],
    "d": 1,
    "giai": "Có nhiều loài khác nhau nhưng không nhắc đến nước, bùn, ánh sáng, nên đây là quần xã."
   },
   {
    "muc": "gan_cau_goc",
    "q": "«Đàn hươu sống trên thảo nguyên» thuộc cấp độ tổ chức sống nào?",
    "o": [
     "Quần thể",
     "Quần xã",
     "Hệ sinh thái"
    ],
    "d": 0,
    "giai": "Chỉ có một loài là hươu, còn «trên thảo nguyên» chỉ là nơi sống. Vậy đây là quần thể."
   }
  ]
 },
 {
  "id": "TO10-B01-M1",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Coi mọi câu có nghĩa là mệnh đề (kể cả câu hỏi, câu cảm thán)",
  "hs": "Có thể em đang nghĩ cứ câu nào có nghĩa, nói về một điều gì đó thì là mệnh đề, kể cả câu hỏi hay câu cảm thán.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-038",
    "TN-039",
    "TN-040"
   ],
   "hien_tuong": "Mệnh đề giống một câu trong bài kiểm tra Đúng/Sai: thầy cô phải chấm được là Đ hay S. Câu hỏi như «Bạn làm bài chưa?» không chấm Đ/S được, vì nó không khẳng định điều gì. Câu cảm thán như «Trời đẹp quá!» là cảm xúc riêng, mỗi người thấy một khác nên cũng không chấm được. Vì vậy chỉ câu khẳng định có đúng hoặc sai rõ ràng mới là mệnh đề, kể cả câu sai như «15 chia hết cho 4» (đó là mệnh đề sai).",
   "vi_du": "«Số 10 là số chẵn» là mệnh đề đúng. «Số 10 là số lẻ» là mệnh đề sai. «Số 10 đẹp quá!» không phải mệnh đề.",
   "hinh": null,
   "mo_ta_hinh": "Sơ đồ «cái phễu» 2 tầng: Tầng 1 hỏi «Có phải câu khẳng định không?» (loại câu hỏi, cảm thán, ra lệnh); Tầng 2 hỏi «Chấm được Đúng/Sai rõ ràng không?». Câu lọt qua cả 2 tầng ghi nhãn «Mệnh đề». Thả 4 câu ví dụ vào phễu để thấy câu nào bị giữ lại ở tầng nào."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Câu nào sau đây là câu khẳng định?",
    "o": [
     "Lớp em có 38 bạn.",
     "Lớp em có bao nhiêu bạn?"
    ],
    "d": 0,
    "giai": "Câu khẳng định kể ra một điều. Câu thứ hai là câu hỏi."
   },
   {
    "muc": "hieu_tu",
    "q": "Câu nào có tính đúng sai rõ ràng?",
    "o": [
     "Bức tranh này rất đẹp.",
     "Một năm có 12 tháng.",
     "Ôi, mệt quá!"
    ],
    "d": 1,
    "giai": "Ai kiểm tra cũng thấy «một năm có 12 tháng» là đúng. Còn «đẹp», «mệt» là cảm nhận riêng của mỗi người."
   },
   {
    "muc": "ap_dung",
    "q": "Câu «Số 9 là số chẵn.» có phải là mệnh đề không?",
    "o": [
     "Có, đó là mệnh đề sai.",
     "Không, vì câu này sai."
    ],
    "d": 0,
    "giai": "Mệnh đề chỉ cần đúng HOẶC sai rõ ràng. Câu này sai rõ ràng nên vẫn là mệnh đề (mệnh đề sai)."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Câu nào sau đây là mệnh đề?",
    "o": [
     "Hãy đóng cửa lại!",
     "Số 20 chia hết cho 3.",
     "Hôm nay em có đi học không?"
    ],
    "d": 1,
    "giai": "Câu ra lệnh và câu hỏi không chấm Đ/S được. «20 chia hết cho 3» là câu khẳng định và sai rõ ràng, nên là mệnh đề sai."
   }
  ]
 },
 {
  "id": "TO10-B01-M2",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Nhầm mệnh đề chứa biến là mệnh đề",
  "hs": "Có thể em đang nghĩ cứ câu nào có phép tính, có dấu «=» là mệnh đề, dù trong câu còn chữ x chưa biết giá trị.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-041",
    "TN-042",
    "TN-038"
   ],
   "hien_tuong": "Mệnh đề chứa biến giống câu «Bạn ấy cao 1 m 70» khi chưa biết «bạn ấy» là ai: nói về Minh thì có thể đúng, nói về Lan thì có thể sai. Câu «x + 2 = 5» cũng vậy: chưa biết x là số nào nên lúc đúng lúc sai, ta chưa chấm Đ/S được. Vì thế nó chưa phải mệnh đề. Chỉ khi thay x bằng một số cụ thể, ví dụ x = 3, ta mới được mệnh đề «3 + 2 = 5».",
   "vi_du": "«n là số chẵn» chưa phải mệnh đề. Thay n = 4 được «4 là số chẵn» (mệnh đề đúng); thay n = 7 được «7 là số chẵn» (mệnh đề sai).",
   "hinh": null,
   "mo_ta_hinh": "Bảng 2 cột: cột trái là câu «x + 2 = 5», chỗ x để thành ô trống. Cột phải có các mũi tên: thay x = 3 cho ra «3 + 2 = 5» (Đúng ✔), thay x = 1 cho ra «1 + 2 = 5» (Sai ✘), để thấy câu chứa biến lúc đúng lúc sai."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Trong câu «2n + 1 > 7», đâu là biến?",
    "o": [
     "n",
     "7",
     "1"
    ],
    "d": 0,
    "giai": "n là chữ thay cho một số chưa biết. 7 và 1 là số cụ thể."
   },
   {
    "muc": "hieu_tu",
    "q": "Câu nào là mệnh đề chứa biến?",
    "o": [
     "5 + 3 = 8",
     "x − 4 = 1"
    ],
    "d": 1,
    "giai": "«x − 4 = 1» có biến x nên chưa biết đúng hay sai. «5 + 3 = 8» là mệnh đề đúng."
   },
   {
    "muc": "ap_dung",
    "q": "Thay x = 2 vào câu «x + 2 = 5», ta được:",
    "o": [
     "Mệnh đề sai «2 + 2 = 5»",
     "Mệnh đề đúng «2 + 2 = 5»",
     "Vẫn là mệnh đề chứa biến"
    ],
    "d": 0,
    "giai": "Sau khi thay số, câu không còn biến nên thành mệnh đề. Vì 2 + 2 = 4 ≠ 5 nên đây là mệnh đề sai."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Câu nào sau đây là mệnh đề?",
    "o": [
     "x > 3",
     "Số 12 chia hết cho 5.",
     "y là số nguyên tố."
    ],
    "d": 1,
    "giai": "«x > 3» và «y là số nguyên tố» còn biến nên chưa biết đúng sai. «12 chia hết cho 5» là mệnh đề (mệnh đề sai)."
   }
  ]
 },
 {
  "id": "TO10-B01-M3",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Phủ định dấu so sánh nhưng quên trường hợp «bằng»",
  "hs": "Có thể em đang nghĩ phủ định của «>» là «<» (hoặc của «<» là «>»), mà quên mất trường hợp hai số bằng nhau.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-043",
    "TN-044",
    "TN-045"
   ],
   "hien_tuong": "Khi so sánh hai số a và b, chỉ có 3 khả năng: a > b, a = b, a < b. Câu «a > b» chỉ chiếm 1 khả năng, nên phủ định của nó phải gồm cả 2 khả năng còn lại là a = b hoặc a < b, viết gọn là a ≤ b. Giống như bạn hỏi «Cậu cao hơn mình à?», trả lời «Không» thì có thể là thấp hơn, cũng có thể là cao bằng nhau. Nếu chỉ viết «a < b» là em đã bỏ quên trường hợp bằng nhau. Tương tự, phủ định của «a < b» là «a ≥ b», không phải «a > b».",
   "vi_du": "Phủ định của «Điểm của Nam lớn hơn 5» là «Điểm của Nam không lớn hơn 5», tức điểm ≤ 5: Nam được đúng 5 điểm hoặc ít hơn.",
   "hinh": null,
   "mo_ta_hinh": "Trục số có điểm b. Phần bên phải b (không gồm b, vẽ chấm tròn rỗng) tô xanh, ghi «a > b». Phần còn lại gồm điểm b (chấm tròn đặc) và bên trái b tô cam, ghi «a ≤ b: phủ định». Hai phần ghép lại phủ kín trục số, không chồng lên nhau."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Nếu mệnh đề P đúng thì mệnh đề phủ định của P:",
    "o": [
     "Luôn sai",
     "Có thể đúng, có thể sai"
    ],
    "d": 0,
    "giai": "P và phủ định của P luôn trái ngược nhau: một câu đúng thì câu kia sai."
   },
   {
    "muc": "hieu_tu",
    "q": "«a ≤ 5» có nghĩa là:",
    "o": [
     "a nhỏ hơn 5",
     "a nhỏ hơn 5 hoặc a bằng 5",
     "a lớn hơn 5"
    ],
    "d": 1,
    "giai": "Dấu ≤ gồm cả «nhỏ hơn» và «bằng»."
   },
   {
    "muc": "ap_dung",
    "q": "Phủ định của «Nhiệt độ hôm nay lớn hơn 30°C» là:",
    "o": [
     "Nhiệt độ hôm nay nhỏ hơn 30°C",
     "Nhiệt độ hôm nay nhỏ hơn hoặc bằng 30°C"
    ],
    "d": 1,
    "giai": "«Không lớn hơn 30°C» có thể là đúng 30°C hoặc thấp hơn, nên phải là «nhỏ hơn hoặc bằng»."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Phủ định của mệnh đề «9 > 7» là:",
    "o": [
     "9 < 7",
     "9 ≤ 7",
     "9 ≥ 7"
    ],
    "d": 1,
    "giai": "Phủ định của «>» là «≤». «9 < 7» quên trường hợp bằng; «9 ≥ 7» vẫn cùng ý với câu gốc."
   }
  ]
 },
 {
  "id": "TO10-B01-M4",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Hiểu phủ định là một câu sai bất kì",
  "hs": "Có thể em đang nghĩ phủ định chỉ cần là một câu sai nào đó, chứ không phải câu nói ngược đúng ý câu ban đầu.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-043",
    "TN-046"
   ],
   "hien_tuong": "Phủ định giống như đáp lại «Không phải vậy» cho đúng câu người kia vừa nói, chứ không phải nói ra một điều sai khác. Bạn nói «Mình cao hơn cậu» thì phủ định là «Mình không cao hơn cậu», chứ không phải «Mình cao bằng cái cột điện». Các câu «6 = 4» hay «4 > 6» tuy sai nhưng mỗi câu chỉ nói một phần, không bao hết ý «6 không lớn hơn 4». Cách làm chắc chắn: chèn chữ «không» vào câu gốc trước, rồi mới đổi sang kí hiệu: «6 không lớn hơn 4» chính là «6 ≤ 4».",
   "vi_du": "Câu gốc «Lan được 8 điểm» có phủ định là «Lan không được 8 điểm». Câu «Lan được 3 điểm» có thể sai, nhưng không phải phủ định.",
   "hinh": null,
   "mo_ta_hinh": "Từ câu gốc «6 > 4» vẽ hai con đường. Đường đúng có biển «Chèn chữ KHÔNG», dẫn tới «6 không lớn hơn 4, tức 6 ≤ 4». Đường sai có biển «Chọn đại một câu sai», dẫn tới «6 = 4» và «4 > 6», cả hai bị gạch chéo."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Phủ định của «Hôm nay trời mưa» là:",
    "o": [
     "Hôm nay trời không mưa",
     "Hôm nay trời có tuyết"
    ],
    "d": 0,
    "giai": "Phủ định là nói ngược đúng ý câu gốc bằng cách thêm chữ «không»."
   },
   {
    "muc": "hieu_tu",
    "q": "Câu nào là phủ định của «Số 5 là số lẻ»?",
    "o": [
     "Số 5 là số âm",
     "Số 5 không phải là số lẻ",
     "Số 4 là số lẻ"
    ],
    "d": 1,
    "giai": "Hai câu còn lại đều sai nhưng nói chuyện khác, không phải phủ định của câu gốc."
   },
   {
    "muc": "ap_dung",
    "q": "Phủ định của «Bạn An cao hơn bạn Bình» là:",
    "o": [
     "Bạn An không cao hơn bạn Bình",
     "Bạn An cao bằng bạn Bình"
    ],
    "d": 0,
    "giai": "«Không cao hơn» gồm cả thấp hơn và cao bằng. «Cao bằng» chỉ là một trường hợp."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Phủ định của mệnh đề «10 > 8» là:",
    "o": [
     "10 = 8",
     "10 không lớn hơn 8, tức 10 ≤ 8",
     "8 > 10"
    ],
    "d": 1,
    "giai": "Chèn «không» vào câu gốc rồi đổi sang kí hiệu: «không lớn hơn» chính là «≤»."
   }
  ]
 },
 {
  "id": "TO10-B01-M5",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Nhầm lập mệnh đề đảo với việc thêm «không»",
  "hs": "Có thể em đang nghĩ «đảo» là thêm chữ «không» vào hai vế của câu, giống như khi lập phủ định.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-047",
    "TN-048",
    "TN-043"
   ],
   "hien_tuong": "Lập mệnh đề đảo giống như đổi chỗ hai toa tàu: toa đầu ra sau, toa sau lên trước, hàng trong mỗi toa giữ nguyên. Với «Nếu P thì Q», em chỉ việc đặt Q sau chữ «Nếu» và đặt P sau chữ «thì». Chữ «không» chỉ dùng khi lập phủ định, không dùng khi lập mệnh đề đảo. Lưu ý: câu gốc đúng thì câu đảo chưa chắc đúng, ví dụ tam giác cân chưa chắc là tam giác đều.",
   "vi_du": "«Nếu một số chia hết cho 4 thì nó chia hết cho 2» là câu đúng. Mệnh đề đảo: «Nếu một số chia hết cho 2 thì nó chia hết cho 4», câu này sai vì 6 chia hết cho 2 nhưng không chia hết cho 4.",
   "hinh": null,
   "mo_ta_hinh": "Hai ô chữ P và Q nối bằng mũi tên, ghi «Nếu P thì Q». Hàng dưới là hai ô đó đã đổi chỗ, có mũi tên vòng cung chỉ việc hoán đổi, ghi «Nếu Q thì P». Bên cạnh ghi chú: «Không thêm chữ 'không'»."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Trong mệnh đề «Nếu hôm nay là Chủ nhật thì em được nghỉ học», phần P (đứng sau «Nếu») là:",
    "o": [
     "Hôm nay là Chủ nhật",
     "Em được nghỉ học"
    ],
    "d": 0,
    "giai": "P là phần đứng sau «Nếu», Q là phần đứng sau «thì»."
   },
   {
    "muc": "hieu_tu",
    "q": "Mệnh đề đảo của P ⇒ Q là:",
    "o": [
     "Q ⇒ P",
     "«không P» ⇒ «không Q»"
    ],
    "d": 0,
    "giai": "Mệnh đề đảo chỉ đổi chỗ P và Q, không thêm «không»."
   },
   {
    "muc": "ap_dung",
    "q": "Mệnh đề đảo của «Nếu trời mưa thì đường ướt» là:",
    "o": [
     "Nếu trời không mưa thì đường không ướt",
     "Nếu đường ướt thì trời mưa"
    ],
    "d": 1,
    "giai": "Đổi chỗ hai phần «trời mưa» và «đường ướt», không thêm «không»."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Mệnh đề đảo của «Nếu tứ giác ABCD là hình vuông thì ABCD là hình chữ nhật» là:",
    "o": [
     "Nếu ABCD là hình chữ nhật thì ABCD là hình vuông",
     "Nếu ABCD không là hình vuông thì ABCD không là hình chữ nhật",
     "Nếu ABCD không là hình chữ nhật thì ABCD không là hình vuông"
    ],
    "d": 0,
    "giai": "Đổi chỗ «là hình vuông» và «là hình chữ nhật». Câu đảo này sai (hình chữ nhật chưa chắc là hình vuông), nhưng nó vẫn đúng là mệnh đề đảo."
   }
  ]
 },
 {
  "id": "TO10-B01-M6",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Nhầm mệnh đề đảo với mệnh đề tương đương",
  "hs": "Có thể em đang nghĩ mệnh đề đảo là câu «P khi và chỉ khi Q», tức là gộp cả hai chiều lại với nhau.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-048",
    "TN-049",
    "TN-050"
   ],
   "hien_tuong": "Mệnh đề đảo giống như đi đường một chiều theo hướng ngược lại: chỉ có một chiều Q ⇒ P. Mệnh đề tương đương P ⇔ Q giống đường hai chiều: cả P ⇒ Q và Q ⇒ P đều phải đúng. Đề hỏi mệnh đề đảo thì em chỉ viết một chiều, theo dạng «Nếu Q thì P». Hơn nữa, câu «Tam giác ABC đều khi và chỉ khi tam giác ABC cân» là câu sai, vì có những tam giác cân mà không đều.",
   "vi_du": "«Nếu x = 2 thì x² = 4» có mệnh đề đảo là «Nếu x² = 4 thì x = 2», câu này sai vì x còn có thể bằng −2. Vì vậy không thể nói «x = 2 khi và chỉ khi x² = 4».",
   "hinh": null,
   "mo_ta_hinh": "Hai biển giao thông đặt cạnh nhau: biển «đường một chiều» có mũi tên Q → P, ghi «Mệnh đề đảo: Nếu Q thì P»; biển «đường hai chiều» có mũi tên P ⇄ Q, ghi «Mệnh đề tương đương: P khi và chỉ khi Q»."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Mệnh đề «P khi và chỉ khi Q» được kí hiệu là:",
    "o": [
     "P ⇔ Q",
     "Q ⇒ P"
    ],
    "d": 0,
    "giai": "«Khi và chỉ khi» là mũi tên hai chiều ⇔. Còn Q ⇒ P là mệnh đề đảo, chỉ một chiều."
   },
   {
    "muc": "hieu_tu",
    "q": "Mệnh đề đảo của P ⇒ Q có dạng:",
    "o": [
     "Nếu Q thì P",
     "P khi và chỉ khi Q"
    ],
    "d": 0,
    "giai": "Mệnh đề đảo chỉ là một chiều ngược lại: Q ⇒ P, tức «Nếu Q thì P»."
   },
   {
    "muc": "ap_dung",
    "q": "Mệnh đề đảo của «Nếu hôm nay là thứ Bảy thì ngày mai là Chủ nhật» là:",
    "o": [
     "Nếu ngày mai là Chủ nhật thì hôm nay là thứ Bảy",
     "Hôm nay là thứ Bảy khi và chỉ khi ngày mai là Chủ nhật"
    ],
    "d": 0,
    "giai": "Mệnh đề đảo chỉ viết một chiều «Nếu Q thì P». Câu có «khi và chỉ khi» là mệnh đề tương đương."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Mệnh đề đảo của «Nếu một số tự nhiên chia hết cho 6 thì nó chia hết cho 3» là:",
    "o": [
     "Một số tự nhiên chia hết cho 6 khi và chỉ khi nó chia hết cho 3",
     "Nếu một số tự nhiên chia hết cho 3 thì nó chia hết cho 6"
    ],
    "d": 1,
    "giai": "Đảo là Q ⇒ P. Câu đảo này sai (3 chia hết cho 3 nhưng không chia hết cho 6), nên càng không thể viết «khi và chỉ khi»."
   }
  ]
 },
 {
  "id": "TO10-B01-M7",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Nhầm kí hiệu ∀ (với mọi) với ∃ (tồn tại)",
  "hs": "Có thể em đang nghĩ kí hiệu ∀ nghĩa là «có một số» hoặc «một vài số», giống như kí hiệu ∃.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-051",
    "TN-052",
    "TN-053"
   ],
   "hien_tuong": "∀ là chữ A lộn ngược, lấy từ «All» nghĩa là tất cả; ∃ là chữ E quay ngược, lấy từ «Exist» nghĩa là tồn tại. «Với mọi» giống lời cô giáo dặn: «Tất cả các em phải nộp bài», thiếu một bạn là chưa đạt. «Tồn tại» giống câu hỏi: «Có bạn nào nộp bài chưa?», chỉ cần một bạn nộp là đúng. Vì vậy «∀x ∈ ℝ, x² ≥ 0» phải đọc là «Với mọi số thực x…», không được đọc là «Có một số thực x…».",
   "vi_du": "«∀x ∈ ℝ, x + 0 = x»: với mọi số thực x, x cộng 0 bằng x. «∃x ∈ ℝ, x + 1 = 3»: có một số thực x (là x = 2) để x + 1 = 3.",
   "hinh": null,
   "mo_ta_hinh": "Hai ô cạnh nhau. Ô trái: chữ A lật ngược thành ∀, ghi «All: tất cả», kèm hình cả lớp cùng giơ tay. Ô phải: chữ E quay ngược thành ∃, ghi «Exist: có ít nhất một», kèm hình chỉ một bạn giơ tay."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Kí hiệu ∀ được đọc là:",
    "o": [
     "Với mọi",
     "Tồn tại"
    ],
    "d": 0,
    "giai": "∀ là chữ A (All) lộn ngược, đọc là «với mọi»."
   },
   {
    "muc": "hieu_tu",
    "q": "Kí hiệu ∃ có nghĩa là:",
    "o": [
     "Tất cả",
     "Có ít nhất một"
    ],
    "d": 1,
    "giai": "∃ là chữ E (Exist) quay ngược, nghĩa là «tồn tại, có ít nhất một»."
   },
   {
    "muc": "ap_dung",
    "q": "Câu «Tất cả học sinh lớp em đều có thẻ thư viện» ứng với kí hiệu nào?",
    "o": [
     "∀",
     "∃"
    ],
    "d": 0,
    "giai": "«Tất cả» ứng với kí hiệu ∀."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Mệnh đề «∀n ∈ ℕ, n + 1 > n» được phát biểu là:",
    "o": [
     "Có một số tự nhiên n mà n + 1 lớn hơn n",
     "Với mọi số tự nhiên n, n + 1 lớn hơn n"
    ],
    "d": 1,
    "giai": "∀ đọc là «với mọi», nên phải phát biểu «Với mọi số tự nhiên n…»."
   }
  ]
 },
 {
  "id": "TO10-B01-M8",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Nhầm «không âm» (≥ 0) với «dương» (> 0)",
  "hs": "Có thể em đang nghĩ «x² ≥ 0» nghĩa là «x² dương», mà quên rằng x² còn có thể bằng 0.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-054",
    "TN-055",
    "TN-056"
   ],
   "hien_tuong": "Hãy tưởng tượng một chiếc nhiệt kế: trên vạch 0 là dương, dưới vạch 0 là âm, còn đúng vạch 0 thì không dương cũng không âm. «Không âm» nghĩa là «không nằm dưới vạch 0», tức là ở trên vạch 0 HOẶC đúng vạch 0. Vì 0² = 0 nên x² không phải lúc nào cũng dương; nói đúng là x² luôn không âm. Do đó «x² ≥ 0» đọc là «x² không âm» hay «x² lớn hơn hoặc bằng 0».",
   "vi_du": "x = 3 thì x² = 9 > 0; x = −2 thì x² = 4 > 0; x = 0 thì x² = 0: không dương nhưng vẫn không âm.",
   "hinh": null,
   "mo_ta_hinh": "Trục số nằm ngang: phần bên phải 0 tô xanh ghi «dương (> 0)», phần bên trái 0 tô đỏ ghi «âm (< 0)», điểm 0 được khoanh tròn. Một dấu ngoặc lớn ôm cả điểm 0 và phần xanh, ghi «không âm (≥ 0)»."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Số 0 có phải là số dương không?",
    "o": [
     "Có",
     "Không"
    ],
    "d": 1,
    "giai": "Số dương phải lớn hơn 0, mà 0 không lớn hơn 0."
   },
   {
    "muc": "hieu_tu",
    "q": "«a là số không âm» được viết là:",
    "o": [
     "a > 0",
     "a ≥ 0",
     "a < 0"
    ],
    "d": 1,
    "giai": "Không âm gồm dương và bằng 0, nên viết a ≥ 0."
   },
   {
    "muc": "ap_dung",
    "q": "Số tiền trong ví của Minh là 0 đồng. Câu nào đúng?",
    "o": [
     "Số tiền đó là số dương",
     "Số tiền đó là số không âm"
    ],
    "d": 1,
    "giai": "0 không phải số dương nhưng vẫn là số không âm."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Mệnh đề «∀x ∈ ℝ, |x| ≥ 0» được phát biểu là:",
    "o": [
     "Với mọi số thực x, |x| dương",
     "Với mọi số thực x, |x| không âm"
    ],
    "d": 1,
    "giai": "Vì |0| = 0 nên |x| không phải lúc nào cũng dương. Dấu «≥ 0» đọc là «không âm»."
   }
  ]
 },
 {
  "id": "TO10-B01-M9",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Phủ định mệnh đề có ∀, ∃ nhưng chỉ làm một trong hai bước",
  "hs": "Có thể em đang nghĩ khi phủ định câu có ∀, ∃ thì chỉ cần đổi một chỗ (hoặc đổi kí hiệu, hoặc đổi phần tính chất), trong khi phải đổi cả hai.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-057",
    "TN-058",
    "TN-059"
   ],
   "hien_tuong": "Phủ định câu có lượng từ luôn gồm 2 bước, giống như mặc áo phải cài đủ cả hai cúc. Bước 1: đổi ∃ thành ∀ (hoặc ∀ thành ∃). Bước 2: phủ định phần tính chất phía sau, ví dụ «<» thành «≥». Nếu chỉ làm bước 1, ta được «∀x ∈ ℝ, x² < 0», vẫn nói «x² âm» như câu gốc, chưa hề nói ngược ý; nếu chỉ làm bước 2, ta được «∃x ∈ ℝ, x² ≥ 0», vẫn chỉ nói về «một số x». Kiểm tra lại: câu gốc «có số thực mà bình phương âm» là sai, còn phủ định đúng «mọi số thực đều có bình phương ≥ 0» là đúng, đúng kiểu một đúng một sai.",
   "vi_du": "«∃x ∈ ℝ, x + 1 = 0». Bước 1: đổi ∃ thành ∀. Bước 2: đổi «=» thành «≠». Phủ định là «∀x ∈ ℝ, x + 1 ≠ 0».",
   "hinh": null,
   "mo_ta_hinh": "Sơ đồ 2 bước như dây chuyền: câu gốc «∃x ∈ ℝ, x² < 0» → ô 1 «Đổi ∃ thành ∀» → ô 2 «Đổi < thành ≥» → kết quả «∀x ∈ ℝ, x² ≥ 0». Bên dưới là hai đáp án sai bị gạch, một cái ghi chú «quên bước 2», một cái ghi chú «quên bước 1»."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Khi lập phủ định của mệnh đề có kí hiệu ∃, kí hiệu ∃ được:",
    "o": [
     "Đổi thành ∀",
     "Giữ nguyên ∃"
    ],
    "d": 0,
    "giai": "Phủ định của «có ít nhất một» là «mọi … đều không», nên ∃ đổi thành ∀."
   },
   {
    "muc": "hieu_tu",
    "q": "Phủ định của «Có một bạn trong lớp chưa nộp bài» là:",
    "o": [
     "Mọi bạn trong lớp đều chưa nộp bài",
     "Mọi bạn trong lớp đều đã nộp bài",
     "Có một bạn trong lớp đã nộp bài"
    ],
    "d": 1,
    "giai": "Làm đủ 2 bước: đổi «có một» thành «mọi», và đổi «chưa nộp» thành «đã nộp»."
   },
   {
    "muc": "ap_dung",
    "q": "Phủ định của «∀x ∈ ℝ, x + 1 > x» là:",
    "o": [
     "∃x ∈ ℝ, x + 1 ≤ x",
     "∀x ∈ ℝ, x + 1 ≤ x",
     "∃x ∈ ℝ, x + 1 > x"
    ],
    "d": 0,
    "giai": "Bước 1: đổi ∀ thành ∃. Bước 2: đổi «>» thành «≤»."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Phủ định của mệnh đề «∃x ∈ ℝ, x² + 1 = 0» là:",
    "o": [
     "∀x ∈ ℝ, x² + 1 = 0",
     "∃x ∈ ℝ, x² + 1 ≠ 0",
     "∀x ∈ ℝ, x² + 1 ≠ 0"
    ],
    "d": 2,
    "giai": "Phải làm đủ cả 2 bước: đổi ∃ thành ∀ và đổi «=» thành «≠». Hai phương án kia mới làm có một bước."
   }
  ]
 },
 {
  "id": "TO10-B05-M1",
  "bai": "TO10-B05",
  "nguon": "ai",
  "ten": "Sai dấu giá trị lượng giác của góc tù",
  "hs": "Có thể em đang nghĩ góc tù thì mọi giá trị lượng giác đều âm, hoặc đều dương giống góc nhọn.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-060",
    "TN-061",
    "TN-062"
   ],
   "hien_tuong": "Điểm M ứng với góc α luôn nằm trên nửa đường tròn phía trên trục Ox, nên tung độ của M (chính là sin α) luôn không âm. Khi α là góc tù, M nằm bên trái trục Oy nên hoành độ (cos α) âm. Vì tan α = sin α / cos α nên tan của góc tù là số dương chia số âm, kết quả âm. Hãy tưởng tượng em đứng trên một ngọn đồi: dù đi sang trái hay sang phải, em vẫn ở trên mặt đất (sin dương); chỉ có hướng ngang là đổi (cos đổi dấu).",
   "vi_du": "Với α = 150°: sin 150° = 1/2 > 0, cos 150° = −√3/2 < 0, tan 150° = −√3/3 < 0.",
   "hinh": null,
   "mo_ta_hinh": "Nửa đường tròn đơn vị chia hai phần bởi trục Oy: phần bên phải ghi 'góc nhọn: sin +, cos +, tan +', phần bên trái ghi 'góc tù: sin +, cos −, tan −'; vẽ điểm M ứng với 150° và hạ hai đường vuông góc xuống hai trục."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Góc nào sau đây là góc tù?",
    "o": [
     "60°",
     "135°",
     "90°"
    ],
    "d": 1,
    "giai": "135° lớn hơn 90° và nhỏ hơn 180° nên là góc tù."
   },
   {
    "muc": "hieu_tu",
    "q": "Điểm M nằm trên nửa đường tròn đơn vị (phía trên trục Ox). Tung độ của M:",
    "o": [
     "luôn không âm",
     "có thể âm"
    ],
    "d": 0,
    "giai": "Nửa đường tròn nằm phía trên trục Ox nên tung độ luôn ≥ 0."
   },
   {
    "muc": "ap_dung",
    "q": "Dấu của cos 120° là gì?",
    "o": [
     "Dương",
     "Âm",
     "Bằng 0"
    ],
    "d": 1,
    "giai": "120° là góc tù, M nằm bên trái trục Oy nên hoành độ âm: cos 120° = −1/2."
   },
   {
    "muc": "gan_cau_goc",
    "q": "sin 135° bằng bao nhiêu?",
    "o": [
     "√2/2",
     "−√2/2"
    ],
    "d": 0,
    "giai": "sin của góc tù luôn dương: sin 135° = sin 45° = √2/2."
   }
  ]
 },
 {
  "id": "TO10-B05-M2",
  "bai": "TO10-B05",
  "nguon": "ai",
  "ten": "Nhầm lẫn bảng giá trị của góc đặc biệt (lẫn sin với cos, lẫn 30° với 60°)",
  "hs": "Có thể em đang nghĩ sin và cos của 30°, 60° giống nhau hoặc có thể đổi chỗ cho nhau.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-063",
    "TN-064",
    "TN-065"
   ],
   "hien_tuong": "Góc càng lớn (từ 0° tới 90°) thì điểm M càng lên cao, nên sin càng tăng còn cos càng giảm. Vì vậy sin 30° nhỏ (1/2) còn sin 60° lớn (√3/2); cos thì ngược lại. Giống như kéo cần câu lên: càng dựng đứng thì đầu cần càng cao (sin tăng) và càng gần người (cos giảm). Với góc tù, trước hết đưa về góc nhọn liên quan, lấy đúng hàm trong bảng, rồi mới xét dấu.",
   "vi_du": "tan 60° = sin 60°/cos 60° = (√3/2)/(1/2) = √3; còn tan 30° = √3/3. Vậy tan 120° = −tan 60° = −√3.",
   "hinh": null,
   "mo_ta_hinh": "Bảng giá trị lượng giác các góc 0°, 30°, 45°, 60°, 90° có mũi tên chỉ sin tăng dần, cos giảm dần; bên cạnh là nửa đường tròn đơn vị đánh dấu các điểm ứng với 30° và 60°, thể hiện điểm 60° cao hơn điểm 30°."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "sin 30° bằng bao nhiêu?",
    "o": [
     "1/2",
     "√3/2"
    ],
    "d": 0,
    "giai": "Góc 30° nhỏ nên điểm M thấp: sin 30° = 1/2."
   },
   {
    "muc": "hieu_tu",
    "q": "Góc nhọn liên quan đến góc 150° là góc nào?",
    "o": [
     "30°",
     "60°",
     "50°"
    ],
    "d": 0,
    "giai": "150° = 180° − 30° nên ta dùng giá trị của góc 30°."
   },
   {
    "muc": "ap_dung",
    "q": "tan 60° bằng bao nhiêu?",
    "o": [
     "√3",
     "√3/3"
    ],
    "d": 0,
    "giai": "tan 60° = sin 60°/cos 60° = (√3/2):(1/2) = √3."
   },
   {
    "muc": "gan_cau_goc",
    "q": "cos 120° bằng bao nhiêu?",
    "o": [
     "−1/2",
     "−√3/2",
     "1/2"
    ],
    "d": 0,
    "giai": "cos 120° = −cos 60° = −1/2 (dùng cos của 60°, không phải sin của 60°)."
   }
  ]
 },
 {
  "id": "TO10-B05-M3",
  "bai": "TO10-B05",
  "nguon": "ai",
  "ten": "Nghĩ cos của góc bù giữ nguyên dấu",
  "hs": "Có thể em đang nghĩ cos cũng giống sin: hai góc bù nhau thì cos bằng nhau.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-066",
    "TN-067",
    "TN-068"
   ],
   "hien_tuong": "Điểm ứng với góc α và điểm ứng với góc 180° − α đối xứng nhau qua trục Oy. Chúng cao bằng nhau nên sin bằng nhau: sin(180° − α) = sin α. Nhưng chúng ở hai bên trục Oy nên hoành độ đối nhau: cos(180° − α) = −cos α. Giống hình ảnh trong gương: em giơ tay phải lên thì người trong gương giơ tay ở phía bên kia, nhưng tay vẫn cao bằng nhau.",
   "vi_du": "cos 30° = √3/2 thì cos 150° = −√3/2; còn sin 30° = sin 150° = 1/2.",
   "hinh": null,
   "mo_ta_hinh": "Nửa đường tròn đơn vị có hai điểm M (góc α) và M' (góc 180° − α) đối xứng qua Oy; nét đứt ngang nối M và M' cho thấy cùng tung độ, hai hoành độ x₀ và −x₀ được đánh dấu trên trục Ox."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Góc nào bù với góc 40°?",
    "o": [
     "50°",
     "140°"
    ],
    "d": 1,
    "giai": "40° + 140° = 180° nên hai góc bù nhau."
   },
   {
    "muc": "hieu_tu",
    "q": "Hai điểm (0,6; 0,8) và (−0,6; 0,8) có hoành độ như thế nào?",
    "o": [
     "Bằng nhau",
     "Đối nhau"
    ],
    "d": 1,
    "giai": "0,6 và −0,6 là hai số đối nhau."
   },
   {
    "muc": "ap_dung",
    "q": "Biết cos 40° ≈ 0,77. Vậy cos 140° xấp xỉ bằng:",
    "o": [
     "0,77",
     "−0,77"
    ],
    "d": 1,
    "giai": "cos(180° − 40°) = −cos 40° ≈ −0,77."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Với 0° ≤ α ≤ 180°, sin(180° − α) bằng:",
    "o": [
     "sin α",
     "−sin α",
     "cos α"
    ],
    "d": 0,
    "giai": "Hai điểm đối xứng qua Oy có cùng độ cao nên sin(180° − α) = sin α; chỉ cos mới đổi dấu."
   }
  ]
 },
 {
  "id": "TO10-B05-M4",
  "bai": "TO10-B05",
  "nguon": "ai",
  "ten": "Nhầm sin là hoành độ, cos là tung độ",
  "hs": "Có thể em đang nghĩ sin ứng với trục Ox (đứng trước) còn cos ứng với trục Oy.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-069",
    "TN-070",
    "TN-071"
   ],
   "hien_tuong": "Với M(x₀; y₀) trên nửa đường tròn đơn vị, cos α = x₀ (hoành độ) và sin α = y₀ (tung độ). Mẹo nhớ: 'Sin – Sừng – đứng thẳng' (trục dọc), 'Cos – nằm ngang'. Giống như một cây cột cờ: độ cao lá cờ là sin, khoảng cách từ chân cột ra chỗ em đứng là cos. Khi đã nhớ đúng sin, cos thì tan = sin/cos = y₀/x₀ và cot = x₀/y₀.",
   "vi_du": "Góc 60° ứng với M(1/2; √3/2): cos 60° = 1/2 (hoành độ), sin 60° = √3/2 (tung độ).",
   "hinh": null,
   "mo_ta_hinh": "Nửa đường tròn đơn vị có điểm M(x₀; y₀); đoạn hình chiếu trên trục Ox tô màu xanh ghi 'cos α = x₀', đoạn hình chiếu trên trục Oy tô màu đỏ ghi 'sin α = y₀'."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Điểm A(−0,6; 0,8) có tung độ bằng bao nhiêu?",
    "o": [
     "−0,6",
     "0,8"
    ],
    "d": 1,
    "giai": "Tung độ là số thứ hai: 0,8."
   },
   {
    "muc": "hieu_tu",
    "q": "tan α được tính bằng:",
    "o": [
     "sin α / cos α",
     "cos α / sin α"
    ],
    "d": 0,
    "giai": "tan α = sin α / cos α; công thức còn lại là cot α."
   },
   {
    "muc": "ap_dung",
    "q": "M(−0,6; 0,8) nằm trên nửa đường tròn đơn vị, góc xOM = α. Giá trị cos α là:",
    "o": [
     "−0,6",
     "0,8"
    ],
    "d": 0,
    "giai": "cos α là hoành độ của M: −0,6."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Với M(−0,6; 0,8) như trên, tan α bằng:",
    "o": [
     "−4/3",
     "−3/4"
    ],
    "d": 0,
    "giai": "tan α = y₀/x₀ = 0,8/(−0,6) = −4/3."
   }
  ]
 },
 {
  "id": "TO10-B05-M5",
  "bai": "TO10-B05",
  "nguon": "ai",
  "ten": "Nhầm công thức góc bù với công thức góc phụ",
  "hs": "Có thể em đang nghĩ 180° − α cũng giống 90° − α nên cos đổi thành sin.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-072",
    "TN-066"
   ],
   "hien_tuong": "Có hai cặp góc dễ lẫn: phụ nhau (tổng 90°) và bù nhau (tổng 180°). Phụ nhau thì 'đổi tên': sin thành cos, cos thành sin. Bù nhau thì 'giữ tên': sin vẫn là sin, cos vẫn là cos, chỉ cos (và tan, cot) đổi dấu. Mẹo nhớ: 'Phụ chéo, Bù giữ tên' — giống như đổi ca làm việc (phụ: hai người đổi chỗ) và soi gương (bù: vẫn là mình nhưng ngược bên).",
   "vi_du": "cos(180° − 30°) = cos 150° = −√3/2 = −cos 30°, không phải sin 30° = 1/2.",
   "hinh": null,
   "mo_ta_hinh": "Bảng hai cột: cột 'Góc phụ (90° − α)': sin ↔ cos đổi chéo; cột 'Góc bù (180° − α)': sin giữ nguyên, cos thêm dấu trừ; mỗi cột kèm một ví dụ số (30° và 60°; 30° và 150°)."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Hai góc 35° và 145° là hai góc:",
    "o": [
     "Phụ nhau",
     "Bù nhau"
    ],
    "d": 1,
    "giai": "35° + 145° = 180° nên hai góc bù nhau."
   },
   {
    "muc": "hieu_tu",
    "q": "Hai góc 20° và 70° là hai góc:",
    "o": [
     "Phụ nhau",
     "Bù nhau"
    ],
    "d": 0,
    "giai": "20° + 70° = 90° nên hai góc phụ nhau."
   },
   {
    "muc": "ap_dung",
    "q": "cos(90° − α) bằng:",
    "o": [
     "sin α",
     "−cos α"
    ],
    "d": 0,
    "giai": "Góc phụ thì đổi tên: cos(90° − α) = sin α."
   },
   {
    "muc": "gan_cau_goc",
    "q": "cos 135° bằng:",
    "o": [
     "−cos 45°",
     "sin 45°",
     "cos 45°"
    ],
    "d": 0,
    "giai": "135° = 180° − 45° là góc bù, giữ tên và đổi dấu: cos 135° = −cos 45° = −√2/2."
   }
  ]
 },
 {
  "id": "TO10-B01-L10",
  "bai": "TO10-B01",
  "nguon": "ai",
  "ten": "Nghĩ mỗi noãn bào bậc I chỉ chia một lần, tạo 1 trứng + 1 thể định hướng (quên giảm phân có 2 lần phân bào)",
  "hs": "Có thể em đang nghĩ mỗi noãn bào bậc I chỉ tách đôi một lần, thành 1 trứng và 1 thể định hướng. Thật ra giảm phân có 2 lần phân bào liên tiếp, nên mỗi noãn bào bậc I tạo ra 1 trứng và 3 thể định hướng.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-073",
    "TN-074",
    "TN-075",
    "TN-076"
   ],
   "hien_tuong": "Giảm phân có 2 lần phân bào, nên 1 tế bào ban đầu luôn tạo ra 4 tế bào con. Ở con cái, mỗi lần chia đều chia không đều: một bên nhận gần hết chất dinh dưỡng, bên kia rất nhỏ. Kết quả là 1 noãn bào bậc I chỉ tạo 1 trứng to và 3 thể định hướng nhỏ (1 + 3 = 4). Giống như chia một nồi cơm cho 4 bát nhưng dồn gần hết vào 1 bát, 3 bát còn lại chỉ có vài hạt. Vậy 10 noãn bào bậc I tạo ra 10 trứng và 10 × 3 = 30 thể định hướng.",
   "vi_du": "Có 10 nồi cơm, mỗi nồi chia ra 4 bát: 1 bát đầy và 3 bát gần như trống. Tổng cộng có 10 bát đầy (10 trứng) và 30 bát gần trống (30 thể định hướng).",
   "hinh": null,
   "mo_ta_hinh": "Sơ đồ 1 noãn bào bậc I (hình tròn lớn) → lần phân bào 1: 1 tế bào to + 1 thể định hướng nhỏ → lần phân bào 2: tế bào to tách thành 1 trứng to + 1 thể định hướng nhỏ, thể định hướng ban đầu tách thành 2 thể định hướng nhỏ. Cuối sơ đồ ghi: 1 trứng + 3 thể định hướng = 4 tế bào."
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Giảm phân gồm bao nhiêu lần phân bào liên tiếp?",
    "o": [
     "1 lần",
     "2 lần",
     "4 lần"
    ],
    "d": 1,
    "giai": "Giảm phân có 2 lần phân bào (giảm phân I và giảm phân II), nên 1 tế bào tạo ra 4 tế bào con."
   },
   {
    "muc": "hieu_tu",
    "q": "Trong 4 tế bào con tạo ra từ 1 noãn bào bậc I, tế bào nào có thể thụ tinh?",
    "o": [
     "Cả 4 tế bào",
     "Chỉ 1 tế bào là trứng",
     "3 thể định hướng"
    ],
    "d": 1,
    "giai": "Chỉ 1 tế bào lớn là trứng; 3 thể định hướng nhỏ sẽ tiêu biến."
   },
   {
    "muc": "ap_dung",
    "q": "1 noãn bào bậc I giảm phân tạo ra:",
    "o": [
     "1 trứng và 1 thể định hướng",
     "1 trứng và 3 thể định hướng",
     "4 trứng"
    ],
    "d": 1,
    "giai": "1 tế bào → 4 tế bào con, trong đó 1 trứng và 3 thể định hướng."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Từ 5 noãn bào bậc I, qua giảm phân sẽ cho:",
    "o": [
     "5 thể định hướng và 5 trứng",
     "15 thể định hướng và 5 trứng",
     "20 thể định hướng và 20 trứng"
    ],
    "d": 1,
    "giai": "Mỗi noãn bào bậc I tạo 1 trứng + 3 thể định hướng. Vậy 5 noãn bào tạo 5 trứng và 5 × 3 = 15 thể định hướng."
   }
  ]
 },
 {
  "id": "TA10-U01-VP-M1",
  "bai": "TA10-U01-VP",
  "nguon": "ai",
  "ten": "Nhầm giữa hai vai trò trong gia đình: người kiếm tiền (breadwinner) và người nội trợ (homemaker)",
  "hs": "Có thể em đang nghĩ ai lo cho gia đình cũng gọi là homemaker, nhưng câu này hỏi người kiếm tiền, còn homemaker là người lo việc nhà.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-077",
    "TN-078",
    "TN-079"
   ],
   "hien_tuong": "Trong một gia đình, mỗi người có một vai trò riêng. Người đi làm mang tiền về là breadwinner, giống như người đi chợ mang thức ăn về. Người ở nhà nấu nướng, dọn dẹp, chăm sóc mọi người là homemaker, giống như người chế biến thức ăn đó thành bữa cơm. Cả hai đều lo cho gia đình, nhưng theo hai cách khác nhau. Gặp cụm «earns money» thì em chọn breadwinner.",
   "vi_du": "My father is the breadwinner: he works in a bank. My mother is the homemaker: she cooks and cleans the house.",
   "hinh": null,
   "mo_ta_hinh": "Hai người đứng cạnh nhau. Bên trái là breadwinner, cầm đồng xu, có mũi tên chỉ về ngôi nhà và chữ «kiếm tiền». Bên phải là homemaker, cầm chổi, chữ «lo việc nhà».",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect class=\"h-box\" x=\"5\" y=\"5\" width=\"350\" height=\"190\"/><circle class=\"h-cell\" cx=\"90\" cy=\"60\" r=\"18\"/><rect class=\"h-cell\" x=\"72\" y=\"82\" width=\"36\" height=\"50\"/><circle class=\"h-head\" cx=\"125\" cy=\"100\" r=\"8\"/><text x=\"115\" y=\"88\" font-size=\"11\">$</text><text x=\"40\" y=\"155\" font-size=\"13\">breadwinner</text><text x=\"40\" y=\"172\" font-size=\"11\">người kiếm tiền</text><circle class=\"h-pro\" cx=\"270\" cy=\"60\" r=\"18\"/><rect class=\"h-pro\" x=\"252\" y=\"82\" width=\"36\" height=\"50\"/><line class=\"h-wa\" x1=\"305\" y1=\"75\" x2=\"305\" y2=\"130\"/><line class=\"h-wa\" x1=\"297\" y1=\"130\" x2=\"313\" y2=\"130\"/><text x=\"225\" y=\"155\" font-size=\"13\">homemaker</text><text x=\"225\" y=\"172\" font-size=\"11\">người lo việc nhà</text><line class=\"h-mem\" x1=\"180\" y1=\"30\" x2=\"180\" y2=\"175\"/></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "«Breadwinner» là ai?",
    "o": [
     "Người kiếm tiền nuôi gia đình",
     "Người nấu ăn cho gia đình"
    ],
    "d": 0,
    "giai": "Breadwinner là người «mang bánh mì về», tức là kiếm tiền cho cả nhà."
   },
   {
    "muc": "hieu_tu",
    "q": "«Homemaker» là ai?",
    "o": [
     "Người đi làm ở công ty",
     "Người ở nhà lo việc nhà",
     "Người xây nhà"
    ],
    "d": 1,
    "giai": "Homemaker là người lo việc nhà như nấu ăn, dọn dẹp, chăm con. Không phải thợ xây nhà."
   },
   {
    "muc": "ap_dung",
    "q": "Mr Nam works in a factory and pays for everything in the family. He is the ____.",
    "o": [
     "homemaker",
     "breadwinner"
    ],
    "d": 1,
    "giai": "Ông Nam đi làm và chi trả mọi thứ, tức là ông kiếm tiền, nên ông là breadwinner."
   },
   {
    "muc": "gan_cau_goc",
    "q": "The person who stays at home, cooks and looks after the children is called the ____.",
    "o": [
     "breadwinner",
     "homemaker",
     "worker"
    ],
    "d": 1,
    "giai": "Câu này tả người ở nhà nấu ăn, chăm con, nên chọn homemaker. Câu gốc thì hỏi người «earns money», nên đáp án là breadwinner."
   }
  ]
 },
 {
  "id": "TA10-U01-VP-M2",
  "bai": "TA10-U01-VP",
  "nguon": "ai",
  "ten": "Chọn từ có chữ «house» mà không xét loại từ: housework chỉ công việc, household chỉ cả hộ gia đình, đều không chỉ một người",
  "hs": "Có thể em đang nghĩ cứ từ nào có chữ «house» là nói về người trong nhà, nhưng housework là công việc, còn household là cả một gia đình.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-080",
    "TN-081",
    "TN-082"
   ],
   "hien_tuong": "Câu hỏi bắt đầu bằng «The person who…» nên chỗ trống phải là một từ chỉ người. Housework là việc, giống như «bài tập» chứ không phải «học sinh». Household là cả nhóm người sống chung, giống như «cả lớp» chứ không phải một bạn. Vì vậy hai từ này không hợp với «the person». Em hãy tìm từ có đuôi chỉ người, như -er hoặc -winner.",
   "vi_du": "In my household, my mother is the breadwinner and my father does most of the housework.",
   "hinh": null,
   "mo_ta_hinh": "Ba ô xếp ngang. Ô «NGƯỜI» ghi breadwinner, homemaker. Ô «VIỆC» ghi housework. Ô «CẢ NHÀ» ghi household. Mũi tên từ «The person who…» chỉ vào ô NGƯỜI.",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect class=\"h-box\" x=\"5\" y=\"5\" width=\"350\" height=\"190\"/><text x=\"115\" y=\"30\" font-size=\"13\">The person who…</text><line class=\"h-ar\" x1=\"150\" y1=\"38\" x2=\"70\" y2=\"75\"/><rect class=\"h-cell\" x=\"15\" y=\"80\" width=\"105\" height=\"95\"/><text x=\"40\" y=\"100\" font-size=\"12\">NGƯỜI</text><text x=\"22\" y=\"130\" font-size=\"11\">breadwinner</text><text x=\"22\" y=\"150\" font-size=\"11\">homemaker</text><rect class=\"h-pro\" x=\"128\" y=\"80\" width=\"105\" height=\"95\"/><text x=\"160\" y=\"100\" font-size=\"12\">VIỆC</text><text x=\"145\" y=\"130\" font-size=\"11\">housework</text><rect class=\"h-water\" x=\"241\" y=\"80\" width=\"105\" height=\"95\"/><text x=\"265\" y=\"100\" font-size=\"12\">CẢ NHÀ</text><text x=\"260\" y=\"130\" font-size=\"11\">household</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Từ nào chỉ NGƯỜI?",
    "o": [
     "housework",
     "homemaker"
    ],
    "d": 1,
    "giai": "Homemaker là người lo việc nhà, còn housework chỉ là công việc."
   },
   {
    "muc": "hieu_tu",
    "q": "«Household» nghĩa là gì?",
    "o": [
     "Một người trong nhà",
     "Tất cả những người sống chung một nhà",
     "Việc dọn nhà"
    ],
    "d": 1,
    "giai": "Household là cả hộ gia đình, gồm mọi người sống chung."
   },
   {
    "muc": "ap_dung",
    "q": "I help my mum with the ____ every evening: I wash the dishes.",
    "o": [
     "housework",
     "breadwinner"
    ],
    "d": 0,
    "giai": "Rửa bát là một việc, nên chọn housework, tức là việc nhà."
   },
   {
    "muc": "gan_cau_goc",
    "q": "The person who goes to work and brings home money for the family is the ____.",
    "o": [
     "household",
     "breadwinner",
     "housework"
    ],
    "d": 1,
    "giai": "Có «The person» thì phải chọn từ chỉ người. Người mang tiền về nhà là breadwinner."
   }
  ]
 },
 {
  "id": "TA10-U01-GR-M1",
  "bai": "TA10-U01-GR",
  "nguon": "ai",
  "ten": "Dùng hiện tại đơn cho hành động đang diễn ra, bỏ qua dấu hiệu «Look!», «now»",
  "hs": "Có thể em đang nghĩ cứ nói về hiện tại là dùng hiện tại đơn (washes), nên chưa để ý đến «Look!» và «now» báo rằng việc này đang xảy ra ngay lúc nói.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-083",
    "TN-084",
    "TN-085"
   ],
   "hien_tuong": "Hiện tại đơn giống như một thời khoá biểu: nó cho biết việc gì thường xảy ra. Hiện tại tiếp diễn giống như một tấm ảnh chụp ngay lúc này: nó cho biết việc gì đang xảy ra trước mắt. Khi ai đó nói «Look!» (Nhìn kìa!), họ chỉ cho em thấy một việc đang diễn ra trước mắt. Thêm chữ «now» nữa thì chắc chắn phải dùng am/is/are + V-ing. Chủ ngữ «My father» là số ít nên dùng «is washing».",
   "vi_du": "Every Sunday my mother cooks lunch. (thói quen) – Listen! My mother is singing in the kitchen. (đang xảy ra lúc này)",
   "hinh": null,
   "mo_ta_hinh": "Hai khung cạnh nhau: bên trái là «Thói quen» với nhiều chấm lặp lại trên trục thời gian, ghi «every day → washes»; bên phải là «Đang xảy ra» với một đoạn dài vắt qua mốc NOW, ghi «Look!/now → is washing».",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect class=\"h-box\" x=\"5\" y=\"5\" width=\"170\" height=\"190\"/><rect class=\"h-box\" x=\"185\" y=\"5\" width=\"170\" height=\"190\"/><text x=\"90\" y=\"28\" font-size=\"13\" text-anchor=\"middle\">Thói quen</text><line class=\"h-ar\" x1=\"20\" y1=\"100\" x2=\"160\" y2=\"100\"/><circle class=\"h-sd\" cx=\"35\" cy=\"100\" r=\"6\"/><circle class=\"h-sd\" cx=\"70\" cy=\"100\" r=\"6\"/><circle class=\"h-sd\" cx=\"105\" cy=\"100\" r=\"6\"/><circle class=\"h-sd\" cx=\"140\" cy=\"100\" r=\"6\"/><text x=\"90\" y=\"150\" font-size=\"12\" text-anchor=\"middle\">every day</text><text x=\"90\" y=\"172\" font-size=\"12\" text-anchor=\"middle\">→ washes</text><text x=\"270\" y=\"28\" font-size=\"13\" text-anchor=\"middle\">Đang xảy ra</text><line class=\"h-ar\" x1=\"200\" y1=\"100\" x2=\"340\" y2=\"100\"/><rect class=\"h-cell\" x=\"235\" y=\"88\" width=\"70\" height=\"24\"/><line class=\"h-mem\" x1=\"270\" y1=\"60\" x2=\"270\" y2=\"130\"/><text x=\"270\" y=\"55\" font-size=\"11\" text-anchor=\"middle\">NOW</text><text x=\"270\" y=\"150\" font-size=\"12\" text-anchor=\"middle\">Look! / now</text><text x=\"270\" y=\"172\" font-size=\"12\" text-anchor=\"middle\">→ is washing</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Câu nào nói về một thói quen?",
    "o": [
     "She plays tennis every Saturday.",
     "She is playing tennis now."
    ],
    "d": 0,
    "giai": "«every Saturday» chỉ việc lặp lại hằng tuần nên đây là thói quen, dùng hiện tại đơn."
   },
   {
    "muc": "hieu_tu",
    "q": "Từ nào là dấu hiệu của thì hiện tại tiếp diễn?",
    "o": [
     "usually",
     "at the moment",
     "every day"
    ],
    "d": 1,
    "giai": "«at the moment» nghĩa là «ngay lúc này», tức việc đang diễn ra."
   },
   {
    "muc": "ap_dung",
    "q": "Listen! The baby ____.",
    "o": [
     "cries",
     "is crying"
    ],
    "d": 1,
    "giai": "«Listen!» báo hiệu việc đang xảy ra lúc nói nên dùng is + V-ing."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Look! My sister ____ the floor in the living room now.",
    "o": [
     "cleans",
     "is cleaning",
     "cleaned"
    ],
    "d": 1,
    "giai": "Có «Look!» và «now», chủ ngữ số ít nên dùng «is cleaning»."
   }
  ]
 },
 {
  "id": "TA10-U01-GR-M2",
  "bai": "TA10-U01-GR",
  "nguon": "ai",
  "ten": "Chọn quá khứ đơn, không dựa vào dấu hiệu thời gian",
  "hs": "Có thể em đang nghĩ «washed» là dạng quen thuộc của động từ nên chọn luôn, chưa để ý «now» cho biết câu nói về lúc này chứ không phải chuyện đã qua.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-086",
    "TN-087",
    "TN-088"
   ],
   "hien_tuong": "Mỗi câu tiếng Anh giống như một chiếc đồng hồ: em phải xem kim đang chỉ vào quá khứ hay hiện tại. Đuôi -ed giống như dán nhãn «đã xong, chuyện cũ». Nhưng câu gốc có «Look!» và «now» nên kim đồng hồ đang chỉ đúng lúc này. Việc bố rửa bát đang diễn ra trước mắt nên không thể dùng «washed».",
   "vi_du": "Yesterday I watched TV. – Now I am doing my homework.",
   "hinh": null,
   "mo_ta_hinh": "Một trục thời gian từ trái sang phải: điểm bên trái ghi «yesterday → washed», mốc NOW ở giữa có một đoạn đang diễn ra ghi «now → is washing».",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect class=\"h-box\" x=\"5\" y=\"5\" width=\"350\" height=\"190\"/><text x=\"180\" y=\"28\" font-size=\"13\" text-anchor=\"middle\">Trục thời gian</text><line class=\"h-ar\" x1=\"20\" y1=\"110\" x2=\"340\" y2=\"110\"/><polygon class=\"h-sd\" points=\"340,104 352,110 340,116\"/><circle class=\"h-sd\" cx=\"80\" cy=\"110\" r=\"7\"/><text x=\"80\" y=\"80\" font-size=\"12\" text-anchor=\"middle\">QUÁ KHỨ</text><text x=\"80\" y=\"145\" font-size=\"12\" text-anchor=\"middle\">yesterday</text><text x=\"80\" y=\"165\" font-size=\"12\" text-anchor=\"middle\">→ washed</text><rect class=\"h-cell\" x=\"220\" y=\"98\" width=\"80\" height=\"24\"/><line class=\"h-mem\" x1=\"260\" y1=\"65\" x2=\"260\" y2=\"130\"/><text x=\"260\" y=\"60\" font-size=\"12\" text-anchor=\"middle\">NOW</text><text x=\"260\" y=\"145\" font-size=\"12\" text-anchor=\"middle\">Look! / now</text><text x=\"260\" y=\"165\" font-size=\"12\" text-anchor=\"middle\">→ is washing</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Từ nào cho biết câu ở quá khứ?",
    "o": [
     "now",
     "last night"
    ],
    "d": 1,
    "giai": "«last night» (tối qua) là thời gian đã qua nên dùng quá khứ đơn."
   },
   {
    "muc": "hieu_tu",
    "q": "Câu nào nói về việc đang xảy ra lúc nói?",
    "o": [
     "Tom played football.",
     "Tom is playing football."
    ],
    "d": 1,
    "giai": "is + playing là hiện tại tiếp diễn, chỉ việc đang diễn ra."
   },
   {
    "muc": "ap_dung",
    "q": "Be quiet! The students ____ a test right now.",
    "o": [
     "did",
     "are doing"
    ],
    "d": 1,
    "giai": "«right now» là bây giờ, chủ ngữ số nhiều nên dùng «are doing»."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Look! My mother ____ the clothes in the garden now.",
    "o": [
     "hung",
     "is hanging",
     "has hung"
    ],
    "d": 1,
    "giai": "«Look!» và «now» chỉ việc đang diễn ra, nên dùng «is hanging»."
   }
  ]
 },
 {
  "id": "TA10-U01-GR-M3",
  "bai": "TA10-U01-GR",
  "nguon": "ai",
  "ten": "Nhầm hiện tại hoàn thành (đã xong, có kết quả) với hành động đang diễn ra",
  "hs": "Có thể em đang nghĩ «has washed» cũng là hiện tại nên dùng được, nhưng nó có nghĩa là bố đã rửa xong rồi, còn «Look!» lại cho thấy bố vẫn đang rửa.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-089",
    "TN-087",
    "TN-090"
   ],
   "hien_tuong": "Hãy tưởng tượng em nhìn vào bếp. Nếu thấy chồng bát đã sạch nhưng bố không còn ở đó, em nói «has washed» (đã rửa xong). Nếu thấy bố đang đứng rửa, tay đầy bọt, em nói «is washing» (đang rửa). «Look!» là gọi người khác nhìn một việc đang diễn ra trước mắt, cùng với «now» nên ta chọn «is washing».",
   "vi_du": "I have finished my homework. (xong rồi, đi chơi được) – I am doing my homework. (đang làm, chưa xong)",
   "hinh": null,
   "mo_ta_hinh": "Hai khung: bên trái là «Đã xong» với một đoạn kết thúc trước mốc NOW, ghi «has washed»; bên phải là «Đang làm» với một đoạn vắt qua mốc NOW, ghi «is washing».",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect class=\"h-box\" x=\"5\" y=\"5\" width=\"170\" height=\"190\"/><rect class=\"h-box\" x=\"185\" y=\"5\" width=\"170\" height=\"190\"/><text x=\"90\" y=\"28\" font-size=\"13\" text-anchor=\"middle\">Đã xong</text><line class=\"h-ar\" x1=\"20\" y1=\"105\" x2=\"160\" y2=\"105\"/><rect class=\"h-pro\" x=\"35\" y=\"93\" width=\"60\" height=\"24\"/><line class=\"h-mem\" x1=\"130\" y1=\"65\" x2=\"130\" y2=\"130\"/><text x=\"130\" y=\"60\" font-size=\"11\" text-anchor=\"middle\">NOW</text><text x=\"90\" y=\"155\" font-size=\"12\" text-anchor=\"middle\">→ has washed</text><text x=\"90\" y=\"175\" font-size=\"11\" text-anchor=\"middle\">(bát đã sạch)</text><text x=\"270\" y=\"28\" font-size=\"13\" text-anchor=\"middle\">Đang làm</text><line class=\"h-ar\" x1=\"200\" y1=\"105\" x2=\"340\" y2=\"105\"/><rect class=\"h-cell\" x=\"230\" y=\"93\" width=\"80\" height=\"24\"/><line class=\"h-mem\" x1=\"270\" y1=\"65\" x2=\"270\" y2=\"130\"/><text x=\"270\" y=\"60\" font-size=\"11\" text-anchor=\"middle\">NOW</text><text x=\"270\" y=\"155\" font-size=\"12\" text-anchor=\"middle\">→ is washing</text><text x=\"270\" y=\"175\" font-size=\"11\" text-anchor=\"middle\">(vẫn đang rửa)</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Câu nào cho biết việc đã làm xong?",
    "o": [
     "She has cleaned her room.",
     "She is cleaning her room."
    ],
    "d": 0,
    "giai": "has + V3 nghĩa là đã làm xong, phòng giờ đã sạch."
   },
   {
    "muc": "hieu_tu",
    "q": "Câu nào cho biết việc chưa xong, đang làm dở?",
    "o": [
     "He has painted the wall.",
     "He is painting the wall."
    ],
    "d": 1,
    "giai": "is + V-ing là đang làm, chưa xong."
   },
   {
    "muc": "ap_dung",
    "q": "Em thấy bạn Nam đang ngồi viết bài. Em nói: «Nam ____ an essay.»",
    "o": [
     "has written",
     "is writing"
    ],
    "d": 1,
    "giai": "Nam vẫn đang viết, chưa xong nên dùng «is writing»."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Look! The children ____ a snowman in the yard now.",
    "o": [
     "have built",
     "are building",
     "build"
    ],
    "d": 1,
    "giai": "«Look!» và «now» cho thấy các em nhỏ vẫn đang nặn, chủ ngữ số nhiều nên dùng «are building»."
   }
  ]
 },
 {
  "id": "TA10-U02-VP-M1",
  "bai": "TA10-U02-VP",
  "nguon": "ai",
  "ten": "Nhầm «liên quan đến môi trường» với «tốt cho môi trường»",
  "hs": "Có thể em đang nghĩ cứ có chữ «environment» trong từ là đúng, vì câu đang nói về môi trường.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-091",
    "TN-092",
    "TN-093"
   ],
   "hien_tuong": "Câu hỏi không hỏi «sản phẩm về chủ đề môi trường» mà hỏi «sản phẩm KHÔNG gây hại cho môi trường». environmental chỉ cho biết chủ đề, giống như «sách về sức khỏe» chưa chắc là đồ ăn tốt cho sức khỏe. Muốn nói «tốt, thân thiện với môi trường» ta dùng eco-friendly (hoặc environmentally friendly). Mẹo: thấy «do not harm» (không gây hại) thì tìm từ mang nghĩa tích cực «thân thiện».",
   "vi_du": "environmental problems (vấn đề môi trường) ≠ eco-friendly products (sản phẩm thân thiện môi trường, như ống hút tre, bình nước inox).",
   "hinh": null,
   "mo_ta_hinh": "Hai khung: trái «environmental = về môi trường» kèm hình trái đất có dấu hỏi; phải «eco-friendly = thân thiện môi trường» kèm trái đất và dấu tích xanh.",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect class=\"h-box\" x=\"10\" y=\"10\" width=\"165\" height=\"180\"/><rect class=\"h-box\" x=\"185\" y=\"10\" width=\"165\" height=\"180\"/><circle class=\"h-water\" cx=\"92\" cy=\"85\" r=\"40\"/><text x=\"92\" y=\"92\" font-size=\"13\" text-anchor=\"middle\">?</text><circle class=\"h-pro\" cx=\"267\" cy=\"85\" r=\"40\"/><polyline class=\"h-wa\" points=\"250,85 262,98 285,70\" fill=\"none\"/><text x=\"92\" y=\"150\" font-size=\"12\" text-anchor=\"middle\">environmental</text><text x=\"92\" y=\"168\" font-size=\"11\" text-anchor=\"middle\">= về môi trường</text><text x=\"267\" y=\"150\" font-size=\"12\" text-anchor=\"middle\">eco-friendly</text><text x=\"267\" y=\"168\" font-size=\"11\" text-anchor=\"middle\">= thân thiện môi trường</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "«environmental problems» nghĩa là gì?",
    "o": [
     "các vấn đề môi trường",
     "các sản phẩm thân thiện"
    ],
    "d": 0,
    "giai": "environmental = thuộc về/liên quan đến môi trường."
   },
   {
    "muc": "hieu_tu",
    "q": "Từ nào nghĩa là «thân thiện với môi trường»?",
    "o": [
     "environmental",
     "eco-friendly"
    ],
    "d": 1,
    "giai": "eco (sinh thái) + friendly (thân thiện) = thân thiện môi trường."
   },
   {
    "muc": "ap_dung",
    "q": "Chọn từ đúng: Air pollution is a serious ____ problem.",
    "o": [
     "environmental",
     "eco-friendly"
    ],
    "d": 0,
    "giai": "Ô nhiễm không khí là vấn đề VỀ môi trường, không phải «vấn đề thân thiện»."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Chọn từ đúng: Bamboo straws are ____ because they don't hurt the planet.",
    "o": [
     "environmental",
     "eco-friendly",
     "plastic"
    ],
    "d": 1,
    "giai": "«don't hurt the planet» = không gây hại → eco-friendly."
   }
  ]
 },
 {
  "id": "TA10-U02-VP-M2",
  "bai": "TA10-U02-VP",
  "nguon": "ai",
  "ten": "Nghĩ «tự nhiên» là luôn không gây hại",
  "hs": "Có thể em đang nghĩ cái gì «tự nhiên» thì chắc chắn tốt cho môi trường.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-094",
    "TN-092",
    "TN-093"
   ],
   "hien_tuong": "natural trả lời câu hỏi «nó từ đâu ra?», còn eco-friendly trả lời «nó có hại cho môi trường không?». Thứ tự nhiên vẫn có thể gây hại: than đá là tự nhiên nhưng đốt lên làm ô nhiễm không khí. Ngược lại, chai nhựa tái chế do người làm ra nhưng lại thân thiện với môi trường hơn. Câu gốc định nghĩa theo tác động («do not harm») nên phải chọn eco-friendly.",
   "vi_du": "Than đá: natural nhưng KHÔNG eco-friendly. Túi vải tái chế: không hoàn toàn natural nhưng eco-friendly.",
   "hinh": null,
   "mo_ta_hinh": "Hai cột: «natural = nguồn gốc» (cục than, mũi tên ra khói đỏ) và «eco-friendly = không gây hại» (xe đạp, dấu tích xanh).",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect class=\"h-box\" x=\"10\" y=\"10\" width=\"165\" height=\"180\"/><rect class=\"h-box\" x=\"185\" y=\"10\" width=\"165\" height=\"180\"/><text x=\"92\" y=\"32\" font-size=\"12\" text-anchor=\"middle\">natural = từ thiên nhiên</text><ellipse class=\"h-cell\" cx=\"70\" cy=\"100\" rx=\"25\" ry=\"18\"/><text x=\"70\" y=\"140\" font-size=\"11\" text-anchor=\"middle\">than đá</text><line class=\"h-ar\" x1=\"100\" y1=\"95\" x2=\"140\" y2=\"70\"/><text x=\"140\" y=\"62\" font-size=\"11\" text-anchor=\"middle\">khói</text><text x=\"92\" y=\"172\" font-size=\"11\" text-anchor=\"middle\">vẫn gây hại!</text><text x=\"267\" y=\"32\" font-size=\"12\" text-anchor=\"middle\">eco-friendly = không hại</text><circle class=\"h-pro\" cx=\"240\" cy=\"105\" r=\"18\"/><circle class=\"h-pro\" cx=\"295\" cy=\"105\" r=\"18\"/><line class=\"h-wa\" x1=\"240\" y1=\"105\" x2=\"295\" y2=\"105\"/><text x=\"267\" y=\"145\" font-size=\"11\" text-anchor=\"middle\">xe đạp</text><text x=\"267\" y=\"172\" font-size=\"11\" text-anchor=\"middle\">không khói ✓</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "«natural» chủ yếu nói về điều gì?",
    "o": [
     "nguồn gốc từ thiên nhiên",
     "không gây hại môi trường"
    ],
    "d": 0,
    "giai": "natural = tự nhiên, có sẵn trong thiên nhiên."
   },
   {
    "muc": "hieu_tu",
    "q": "Một sản phẩm «eco-friendly» là sản phẩm…",
    "o": [
     "không gây hại môi trường",
     "lấy từ rừng"
    ],
    "d": 0,
    "giai": "eco-friendly nói về tác động: không gây hại."
   },
   {
    "muc": "ap_dung",
    "q": "Coal is a ____ resource, but burning it pollutes the air.",
    "o": [
     "natural",
     "eco-friendly"
    ],
    "d": 0,
    "giai": "Than có từ thiên nhiên (natural) nhưng gây ô nhiễm nên không eco-friendly."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Bags that are safe for the environment are called ____ bags.",
    "o": [
     "natural",
     "eco-friendly",
     "polluted"
    ],
    "d": 1,
    "giai": "«safe for the environment» = không gây hại → eco-friendly."
   }
  ]
 },
 {
  "id": "TA10-U02-VP-M3",
  "bai": "TA10-U02-VP",
  "nguon": "ai",
  "ten": "Không nắm nghĩa từ, chọn theo chủ đề «ô nhiễm»",
  "hs": "Có thể em đang nghĩ câu nói về môi trường thì chọn từ liên quan ô nhiễm là được, mà chưa để ý chữ «do not».",
  "bai_giang": {
   "thuat_ngu": [
    "TN-095",
    "TN-096",
    "TN-092"
   ],
   "hien_tuong": "polluted mang nghĩa xấu (bị ô nhiễm), còn câu gốc mô tả sản phẩm tốt (không gây hại). Giống như hỏi «người không bao giờ nói dối gọi là người…» mà lại trả lời «gian dối», nghĩa bị ngược hẳn. Em cần gạch chân «do not harm» và tự hỏi: ý này tích cực hay tiêu cực? Tích cực thì chọn từ tích cực: eco-friendly.",
   "vi_du": "polluted water (nước bị ô nhiễm) ↔ eco-friendly products (sản phẩm thân thiện môi trường).",
   "hinh": null,
   "mo_ta_hinh": "Trái: dòng sông xám có chấm bẩn, nhãn «polluted (−)»; phải: chiếc lá xanh, nhãn «eco-friendly (+)»; ở giữa là mũi tên hai chiều «trái nghĩa».",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect class=\"h-box\" x=\"10\" y=\"10\" width=\"340\" height=\"180\"/><rect class=\"h-water\" x=\"30\" y=\"60\" width=\"110\" height=\"60\"/><circle class=\"h-sd\" cx=\"55\" cy=\"80\" r=\"5\"/><circle class=\"h-sd\" cx=\"90\" cy=\"100\" r=\"5\"/><circle class=\"h-sd\" cx=\"120\" cy=\"75\" r=\"5\"/><text x=\"85\" y=\"150\" font-size=\"12\" text-anchor=\"middle\">polluted (−)</text><ellipse class=\"h-pro\" cx=\"275\" cy=\"90\" rx=\"45\" ry=\"25\"/><text x=\"275\" y=\"150\" font-size=\"12\" text-anchor=\"middle\">eco-friendly (+)</text><line class=\"h-ar\" x1=\"155\" y1=\"90\" x2=\"220\" y2=\"90\"/><text x=\"187\" y=\"80\" font-size=\"11\" text-anchor=\"middle\">trái nghĩa</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "«a polluted river» là…",
    "o": [
     "dòng sông bị ô nhiễm",
     "dòng sông sạch"
    ],
    "d": 0,
    "giai": "polluted = bị ô nhiễm, nghĩa tiêu cực."
   },
   {
    "muc": "hieu_tu",
    "q": "«do not harm» nghĩa là…",
    "o": [
     "gây hại",
     "không gây hại"
    ],
    "d": 1,
    "giai": "«do not» phủ định: không gây hại."
   },
   {
    "muc": "ap_dung",
    "q": "Nobody can swim here because the lake is ____.",
    "o": [
     "polluted",
     "eco-friendly"
    ],
    "d": 0,
    "giai": "Không ai bơi được vì hồ bị ô nhiễm → polluted."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Cleaning products that do not hurt nature are ____.",
    "o": [
     "polluted",
     "eco-friendly",
     "dirty"
    ],
    "d": 1,
    "giai": "«do not hurt nature» là ý tích cực → eco-friendly."
   }
  ]
 },
 {
  "id": "TA10-U02-GR-M1",
  "bai": "TA10-U02-GR",
  "nguon": "ai",
  "ten": "Dùng câu chủ động khi chủ ngữ là vật chịu tác động (không nhận ra cần câu bị động)",
  "hs": "Có thể em đang nghĩ cứ thấy chủ ngữ đứng đầu câu là chủ ngữ tự làm hành động, nên chọn «will plant» hoặc «are planting», mà quên rằng cây không thể tự trồng.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-097",
    "TN-098",
    "TN-099",
    "TN-100"
   ],
   "hien_tuong": "Trước khi chọn đáp án, em hãy hỏi: «Chủ ngữ có tự làm hành động này được không?». Cái cây không cầm xẻng đi trồng được, cũng như cái bánh không tự nướng mình. Cây là vật ĐƯỢC trồng, nên câu phải dùng bị động: be + V3. «will plant» và «are planting» đều là chủ động, tức là cây tự đi trồng một cái gì đó, nghe vô lý. Có «next month» nên ta dùng bị động tương lai: will be planted.",
   "vi_du": "Mẹ nấu cơm → «Mom cooks rice» (chủ động). Cơm được nấu → «Rice is cooked» (bị động). Cơm không thể tự nấu, nên khi «rice» làm chủ ngữ thì bắt buộc dùng bị động.",
   "hinh": null,
   "mo_ta_hinh": "Hai khung cạnh nhau. Khung trái «Chủ động»: hình người (học sinh) có mũi tên đỏ chỉ sang cái cây, chữ «Học sinh trồng cây». Khung phải «Bị động»: cái cây ở đầu, mũi tên xanh lá chỉ vào cây từ phía người, chữ «Cây được trồng» và công thức «will be + V3».",
   "svg": "<svg viewBox=\"0 0 360 200\"><defs><marker id=\"a1\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><polygon points=\"0,0 8,4 0,8\" class=\"h-ar\"/></marker><marker id=\"a2\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><polygon points=\"0,0 8,4 0,8\" class=\"h-wa\"/></marker></defs><rect x=\"5\" y=\"5\" width=\"170\" height=\"190\" class=\"h-box\"/><rect x=\"185\" y=\"5\" width=\"170\" height=\"190\" class=\"h-box\"/><text x=\"90\" y=\"25\" font-size=\"13\" text-anchor=\"middle\">Chủ động</text><text x=\"270\" y=\"25\" font-size=\"13\" text-anchor=\"middle\">Bị động</text><circle cx=\"40\" cy=\"70\" r=\"10\" class=\"h-cell\"/><rect x=\"32\" y=\"82\" width=\"16\" height=\"30\" class=\"h-cell\"/><line x1=\"58\" y1=\"92\" x2=\"108\" y2=\"92\" class=\"h-ar\" marker-end=\"url(#a1)\"/><rect x=\"133\" y=\"95\" width=\"8\" height=\"20\" class=\"h-cell\"/><circle cx=\"137\" cy=\"82\" r=\"16\" class=\"h-pro\"/><text x=\"90\" y=\"145\" font-size=\"12\" text-anchor=\"middle\">Học sinh trồng cây</text><text x=\"90\" y=\"165\" font-size=\"11\" text-anchor=\"middle\">will plant</text><rect x=\"221\" y=\"95\" width=\"8\" height=\"20\" class=\"h-cell\"/><circle cx=\"225\" cy=\"82\" r=\"16\" class=\"h-pro\"/><line x1=\"320\" y1=\"92\" x2=\"250\" y2=\"92\" class=\"h-wa\" marker-end=\"url(#a2)\"/><circle cx=\"330\" cy=\"70\" r=\"8\" class=\"h-cell\"/><rect x=\"324\" y=\"80\" width=\"12\" height=\"26\" class=\"h-cell\"/><text x=\"270\" y=\"145\" font-size=\"12\" text-anchor=\"middle\">Cây được trồng</text><text x=\"270\" y=\"165\" font-size=\"11\" text-anchor=\"middle\">will be + V3</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Câu nào là câu bị động?",
    "o": [
     "My father washes the car.",
     "The car is washed every Sunday."
    ],
    "d": 1,
    "giai": "«is washed» có dạng be + V3, và chiếc xe là vật được rửa, nên đây là câu bị động."
   },
   {
    "muc": "hieu_tu",
    "q": "Bị động thì tương lai đơn có công thức nào?",
    "o": [
     "will + V",
     "will + be + V3",
     "will + V-ing"
    ],
    "d": 1,
    "giai": "Bị động tương lai đơn có dạng will + be + V3, ví dụ: will be built."
   },
   {
    "muc": "ap_dung",
    "q": "The letter ____ tomorrow.",
    "o": [
     "will send",
     "will be sent"
    ],
    "d": 1,
    "giai": "Lá thư không thể tự gửi đi, nó được người khác gửi, nên dùng bị động: will be sent."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Many new books ____ to our library next week.",
    "o": [
     "will bring",
     "are bringing",
     "will be brought"
    ],
    "d": 2,
    "giai": "Sách không tự mang mình đến được, chúng được mang đến. Có «next week» nên dùng bị động tương lai: will be brought."
   }
  ]
 },
 {
  "id": "TA10-U02-GR-M2",
  "bai": "TA10-U02-GR",
  "nguon": "ai",
  "ten": "Bỏ qua dấu hiệu thời gian tương lai (chọn thì quá khứ)",
  "hs": "Có thể em đang nghĩ cứ thấy động từ có đuôi -ed như «planted» là đúng dạng bị động, mà chưa để ý chữ «next month» cho biết việc này chưa xảy ra.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-101",
    "TN-102",
    "TN-103"
   ],
   "hien_tuong": "Dấu hiệu thời gian giống như biển báo trên đường: nó cho em biết phải đi về phía nào. «next month» là tháng sau, tức là việc trồng cây chưa xảy ra. «planted» đứng một mình là quá khứ đơn chủ động, nói về việc đã làm rồi, nên không hợp với «next month». Ngoài ra «planted» lại thiếu «be» nên cũng không phải bị động. Câu cần cả tương lai lẫn bị động: will be planted.",
   "vi_du": "«I bought a new bag yesterday» (đã mua hôm qua) khác với «I will buy a new bag next week» (tuần sau sẽ mua). Chỉ cần đổi từ chỉ thời gian là thì của động từ phải đổi theo.",
   "hinh": null,
   "mo_ta_hinh": "Một trục thời gian nằm ngang có ba mốc: «Quá khứ» (bên trái, ghi last month → planted), «Bây giờ» (ở giữa), «Tương lai» (bên phải, ghi next month → will be planted). Mũi tên đỏ chỉ từ «Bây giờ» sang mốc tương lai.",
   "svg": "<svg viewBox=\"0 0 360 200\"><defs><marker id=\"b1\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><polygon points=\"0,0 8,4 0,8\" class=\"h-ar\"/></marker></defs><rect x=\"5\" y=\"5\" width=\"350\" height=\"190\" class=\"h-box\"/><text x=\"180\" y=\"28\" font-size=\"13\" text-anchor=\"middle\">Trục thời gian</text><line x1=\"30\" y1=\"100\" x2=\"330\" y2=\"100\" class=\"h-mem\"/><circle cx=\"70\" cy=\"100\" r=\"6\" class=\"h-sd\"/><circle cx=\"180\" cy=\"100\" r=\"6\" class=\"h-head\"/><circle cx=\"290\" cy=\"100\" r=\"6\" class=\"h-sd\"/><line x1=\"190\" y1=\"85\" x2=\"278\" y2=\"85\" class=\"h-ar\" marker-end=\"url(#b1)\"/><text x=\"70\" y=\"75\" font-size=\"12\" text-anchor=\"middle\">Quá khứ</text><text x=\"180\" y=\"75\" font-size=\"12\" text-anchor=\"middle\">Bây giờ</text><text x=\"290\" y=\"75\" font-size=\"12\" text-anchor=\"middle\">Tương lai</text><text x=\"70\" y=\"130\" font-size=\"11\" text-anchor=\"middle\">last month</text><text x=\"70\" y=\"150\" font-size=\"11\" text-anchor=\"middle\">planted</text><text x=\"290\" y=\"130\" font-size=\"11\" text-anchor=\"middle\">next month</text><text x=\"290\" y=\"150\" font-size=\"11\" text-anchor=\"middle\">will be planted</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Từ nào là dấu hiệu của thì tương lai?",
    "o": [
     "yesterday",
     "next month",
     "last year"
    ],
    "d": 1,
    "giai": "«next month» là tháng sau, chỉ thời gian trong tương lai."
   },
   {
    "muc": "hieu_tu",
    "q": "«planted» trong câu «They planted trees» là thì gì?",
    "o": [
     "Quá khứ đơn",
     "Tương lai đơn"
    ],
    "d": 0,
    "giai": "V-ed đứng một mình sau chủ ngữ là quá khứ đơn, nói về việc đã xảy ra."
   },
   {
    "muc": "ap_dung",
    "q": "We ____ a football match next Sunday.",
    "o": [
     "watched",
     "will watch"
    ],
    "d": 1,
    "giai": "«next Sunday» là tương lai, nên dùng will + V: will watch."
   },
   {
    "muc": "gan_cau_goc",
    "q": "A new bridge ____ in our town next year.",
    "o": [
     "built",
     "will be built",
     "will build"
    ],
    "d": 1,
    "giai": "«next year» cho biết là tương lai, cây cầu được xây chứ không tự xây, nên dùng will be built."
   }
  ]
 },
 {
  "id": "TA10-U03-VP-M1",
  "bai": "TA10-U03-VP",
  "nguon": "ai",
  "ten": "Cho rằng trước danh từ bắt buộc phải là tính từ, không nhận ra cụm danh từ ghép «talent show»",
  "hs": "Có thể em đang nghĩ đứng trước danh từ «show» thì luôn phải là một tính từ như «talented» hay «talentless», nên chưa để ý rằng «talent show» là một cụm từ cố định.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-104",
    "TN-105",
    "TN-106"
   ],
   "hien_tuong": "Trong tiếng Anh, trước một danh từ có thể là tính từ, nhưng cũng có thể là một danh từ khác. Khi hai danh từ ghép lại thì danh từ đứng trước cho biết «loại gì», giống như trong tiếng Việt ta nói «trạm xe buýt», «phòng nhạc». «Talent show» là chương trình để thí sinh thể hiện tài năng. Nếu dùng «talented show» thì nghĩa thành «chương trình có tài», còn «talentless show» là «chương trình bất tài», cả hai đều vô lý vì chương trình không có tài, người hát mới có tài. Vì vậy em hãy tự hỏi: từ này mô tả chính cái show, hay cho biết đây là loại show gì?",
   "vi_du": "«a talented singer» (ca sĩ có tài, tính từ mô tả người) và «a talent show» (cuộc thi tài năng, danh từ cho biết loại chương trình).",
   "hinh": null,
   "mo_ta_hinh": "Hai khung so sánh: bên trái là cụm «talent + show» với mũi tên ghi «loại chương trình» (đúng); bên phải là cụm «talented + singer» với mũi tên ghi «ca sĩ thế nào» (tính từ mô tả người).",
   "svg": "<svg viewBox=\"0 0 360 200\"><defs><marker id=\"a\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" class=\"h-ar\"/></marker></defs><rect x=\"5\" y=\"5\" width=\"350\" height=\"190\" class=\"h-box\"/><rect x=\"20\" y=\"40\" width=\"150\" height=\"60\" class=\"h-cell\"/><text x=\"95\" y=\"75\" font-size=\"13\" text-anchor=\"middle\">talent + show</text><text x=\"95\" y=\"30\" font-size=\"12\" text-anchor=\"middle\">Danh từ + danh từ</text><line x1=\"95\" y1=\"105\" x2=\"95\" y2=\"140\" class=\"h-ar\" marker-end=\"url(#a)\"/><text x=\"95\" y=\"160\" font-size=\"12\" text-anchor=\"middle\">loại chương trình gì?</text><rect x=\"190\" y=\"40\" width=\"150\" height=\"60\" class=\"h-pro\"/><text x=\"265\" y=\"75\" font-size=\"13\" text-anchor=\"middle\">talented + singer</text><text x=\"265\" y=\"30\" font-size=\"12\" text-anchor=\"middle\">Tính từ + danh từ</text><line x1=\"265\" y1=\"105\" x2=\"265\" y2=\"140\" class=\"h-wa\" marker-end=\"url(#a)\"/><text x=\"265\" y=\"160\" font-size=\"12\" text-anchor=\"middle\">người như thế nào?</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Từ nào là danh từ, có nghĩa là «tài năng»?",
    "o": [
     "talent",
     "talented"
    ],
    "d": 0,
    "giai": "«talent» là danh từ (tài năng). «talented» là tính từ (có tài)."
   },
   {
    "muc": "hieu_tu",
    "q": "Cụm nào là danh từ ghép (danh từ + danh từ)?",
    "o": [
     "music room",
     "beautiful room"
    ],
    "d": 0,
    "giai": "«music» là danh từ, cho biết đây là loại phòng gì. «beautiful» là tính từ mô tả căn phòng."
   },
   {
    "muc": "ap_dung",
    "q": "My brother is a very ____ guitar player.",
    "o": [
     "talent",
     "talented"
    ],
    "d": 1,
    "giai": "Ở đây cần mô tả người chơi đàn «như thế nào», nên dùng tính từ «talented»."
   },
   {
    "muc": "gan_cau_goc",
    "q": "The Voice is a famous singing ____ on TV.",
    "o": [
     "competition",
     "competitive",
     "competitively"
    ],
    "d": 0,
    "giai": "«singing competition» là cuộc thi hát. Sau «singing» cần một danh từ chỉ loại chương trình, nên chọn «competition»."
   }
  ]
 },
 {
  "id": "TA10-U03-VP-M2",
  "bai": "TA10-U03-VP",
  "nguon": "ai",
  "ten": "Thấy «singers» số nhiều nên cho danh từ đứng trước cũng phải số nhiều",
  "hs": "Có thể em đang nghĩ vì có nhiều ca sĩ (singers) nên «talent» cũng phải thêm -s thành «talents».",
  "bai_giang": {
   "thuat_ngu": [
    "TN-107",
    "TN-108",
    "TN-109"
   ],
   "hien_tuong": "Khi một danh từ đứng trước để làm «nhãn loại» cho danh từ khác thì nó gần như luôn ở dạng số ít. Giống như tiếng Việt nói «cửa hàng giày» chứ không nói «cửa hàng những đôi giày». Câu gốc có «a popular music ____ show»: chữ «a» cho thấy chỉ có MỘT chương trình. «singers» nằm ở cụm khác (for young singers) nên không ảnh hưởng đến chỗ trống. Vì vậy ta giữ «talent» ở dạng số ít.",
   "vi_du": "«a ten-year-old boy» chứ không phải «a ten-years-old boy»; «a talent show for singers» chứ không phải «a talents show».",
   "hinh": null,
   "mo_ta_hinh": "Một cụm «a + talent + show» được khoanh trong một khung, mũi tên chỉ «talent» ghi «số ít, làm nhãn»; cụm «for young singers» nằm ngoài khung, ghi «cụm riêng, không ảnh hưởng».",
   "svg": "<svg viewBox=\"0 0 360 200\"><defs><marker id=\"b\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" class=\"h-ar\"/></marker></defs><rect x=\"5\" y=\"5\" width=\"350\" height=\"190\" class=\"h-box\"/><rect x=\"20\" y=\"70\" width=\"170\" height=\"50\" class=\"h-cell\"/><text x=\"105\" y=\"100\" font-size=\"13\" text-anchor=\"middle\">a talent show</text><rect x=\"210\" y=\"70\" width=\"130\" height=\"50\" class=\"h-pro\"/><text x=\"275\" y=\"100\" font-size=\"13\" text-anchor=\"middle\">for young singers</text><line x1=\"90\" y1=\"40\" x2=\"90\" y2=\"68\" class=\"h-ar\" marker-end=\"url(#b)\"/><text x=\"90\" y=\"30\" font-size=\"12\" text-anchor=\"middle\">số ít, làm nhãn loại</text><line x1=\"275\" y1=\"150\" x2=\"275\" y2=\"124\" class=\"h-wa\" marker-end=\"url(#b)\"/><text x=\"275\" y=\"170\" font-size=\"12\" text-anchor=\"middle\">cụm riêng</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Dạng số nhiều của «singer» là gì?",
    "o": [
     "singers",
     "singeres"
    ],
    "d": 0,
    "giai": "Thêm -s: singer → singers."
   },
   {
    "muc": "hieu_tu",
    "q": "Cụm nào đúng?",
    "o": [
     "a shoe shop",
     "a shoes shop"
    ],
    "d": 0,
    "giai": "Danh từ làm nhãn loại đứng trước danh từ khác giữ dạng số ít: «shoe shop»."
   },
   {
    "muc": "ap_dung",
    "q": "We visited a ____ store with many books.",
    "o": [
     "book",
     "books"
    ],
    "d": 0,
    "giai": "«book store» (hiệu sách): «book» làm nhãn loại nên ở dạng số ít, dù cửa hàng có nhiều sách."
   },
   {
    "muc": "gan_cau_goc",
    "q": "It is a famous dance ____ for young dancers.",
    "o": [
     "contest",
     "contests"
    ],
    "d": 0,
    "giai": "Có «a» nên chỉ có một cuộc thi: «a dance contest». «dancers» thuộc cụm «for young dancers» nên không làm danh từ phía trước thành số nhiều."
   }
  ]
 },
 {
  "id": "TA10-U03-GR-M1",
  "bai": "TA10-U03-GR",
  "nguon": "ai",
  "ten": "Dùng V-ing sau «let» vì nhầm với nhóm động từ enjoy/like/stop",
  "hs": "Có thể em đang nghĩ sau động từ thì thêm -ing như «enjoy going», nên «let me going» cũng đúng.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-110",
    "TN-111",
    "TN-112"
   ],
   "hien_tuong": "Mỗi động từ giống như một «ổ cắm» chỉ vừa với một loại phích. «Enjoy» chỉ hợp với phích V-ing, còn «let» chỉ hợp với phích động từ nguyên mẫu trần. Không phải động từ nào đứng sau cũng có -ing. Với let, ta luôn dùng: let + người + V (nguyên mẫu). Vậy nên ta nói «let me go», không phải «let me going».",
   "vi_du": "My teacher let us leave early. (Cô giáo cho chúng em về sớm.) – leave giữ nguyên, không thành leaving.",
   "hinh": null,
   "mo_ta_hinh": "Hai ổ cắm: ổ «enjoy» khớp với phích «V-ing», ổ «let + O» khớp với phích «V (nguyên mẫu)».",
   "svg": "<svg viewBox=\"0 0 360 200\"><defs><marker id=\"a1\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L6,3 L0,6 Z\" class=\"h-ar\"/></marker></defs><rect x=\"5\" y=\"5\" width=\"350\" height=\"190\" class=\"h-box\"/><rect x=\"30\" y=\"40\" width=\"110\" height=\"45\" class=\"h-cell\"/><text x=\"85\" y=\"67\" font-size=\"13\" text-anchor=\"middle\">enjoy</text><rect x=\"220\" y=\"40\" width=\"110\" height=\"45\" class=\"h-pro\"/><text x=\"275\" y=\"67\" font-size=\"13\" text-anchor=\"middle\">V-ing</text><line x1=\"140\" y1=\"62\" x2=\"218\" y2=\"62\" class=\"h-ar\" marker-end=\"url(#a1)\"/><rect x=\"30\" y=\"120\" width=\"110\" height=\"45\" class=\"h-cell\"/><text x=\"85\" y=\"147\" font-size=\"13\" text-anchor=\"middle\">let + người</text><rect x=\"220\" y=\"120\" width=\"110\" height=\"45\" class=\"h-pro\"/><text x=\"275\" y=\"147\" font-size=\"13\" text-anchor=\"middle\">V nguyên mẫu</text><line x1=\"140\" y1=\"142\" x2=\"218\" y2=\"142\" class=\"h-ar\" marker-end=\"url(#a1)\"/><text x=\"180\" y=\"185\" font-size=\"11\" text-anchor=\"middle\">let me go ✓   let me going ✗</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Từ nào là động từ nguyên mẫu không «to»?",
    "o": [
     "play",
     "playing",
     "played"
    ],
    "d": 0,
    "giai": "«play» là dạng gốc, không thêm gì."
   },
   {
    "muc": "hieu_tu",
    "q": "Sau «enjoy» ta dùng dạng nào?",
    "o": [
     "V nguyên mẫu",
     "V-ing"
    ],
    "d": 1,
    "giai": "enjoy + V-ing: I enjoy reading."
   },
   {
    "muc": "ap_dung",
    "q": "Dad lets me ____ his bike.",
    "o": [
     "ride",
     "riding"
    ],
    "d": 0,
    "giai": "let + người + V nguyên mẫu → ride."
   },
   {
    "muc": "gan_cau_goc",
    "q": "The teacher let us ____ home early yesterday.",
    "o": [
     "going",
     "go",
     "goes"
    ],
    "d": 1,
    "giai": "let us go – sau let là động từ nguyên mẫu trần."
   }
  ]
 },
 {
  "id": "TA10-U03-GR-M2",
  "bai": "TA10-U03-GR",
  "nguon": "ai",
  "ten": "Dùng «to V» sau «let» vì nhầm với allow/want",
  "hs": "Có thể em đang nghĩ «let» giống «allow», nên phải có «to» như «allow me to go».",
  "bai_giang": {
   "thuat_ngu": [
    "TN-113",
    "TN-114",
    "TN-115"
   ],
   "hien_tuong": "«Let» và «allow» giống như hai anh em sinh đôi: cùng nghĩa nhưng tính cách khác nhau. Allow thích có «to» đi kèm, còn let thì không bao giờ nhận «to». Tương tự, make (bắt ai làm gì) cũng không có to: make me cry. Em hãy nhớ cặp: allow/want + to V, còn let/make + V.",
   "vi_du": "Mẹ cho em đi chơi: «Mom allows me to go out» = «Mom lets me go out».",
   "hinh": null,
   "mo_ta_hinh": "Hai cột so sánh: allow me TO go và let me go (không to, chữ «to» bị gạch).",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect x=\"5\" y=\"5\" width=\"350\" height=\"190\" class=\"h-box\"/><rect x=\"20\" y=\"30\" width=\"150\" height=\"130\" class=\"h-pro\"/><text x=\"95\" y=\"55\" font-size=\"13\" text-anchor=\"middle\">allow</text><text x=\"95\" y=\"100\" font-size=\"12\" text-anchor=\"middle\">allow me to go</text><text x=\"95\" y=\"135\" font-size=\"11\" text-anchor=\"middle\">có «to» ✓</text><rect x=\"190\" y=\"30\" width=\"150\" height=\"130\" class=\"h-cell\"/><text x=\"265\" y=\"55\" font-size=\"13\" text-anchor=\"middle\">let</text><text x=\"265\" y=\"100\" font-size=\"12\" text-anchor=\"middle\">let me go</text><text x=\"265\" y=\"135\" font-size=\"11\" text-anchor=\"middle\">không «to» ✓</text><text x=\"180\" y=\"185\" font-size=\"11\" text-anchor=\"middle\">let me to go ✗</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Cụm nào là động từ nguyên mẫu có «to»?",
    "o": [
     "to swim",
     "swim",
     "swimming"
    ],
    "d": 0,
    "giai": "to swim có «to» đứng trước."
   },
   {
    "muc": "hieu_tu",
    "q": "Câu nào đúng?",
    "o": [
     "She allows me to use her phone.",
     "She allows me use her phone."
    ],
    "d": 0,
    "giai": "allow + người + to V."
   },
   {
    "muc": "ap_dung",
    "q": "She lets me ____ her phone.",
    "o": [
     "to use",
     "use"
    ],
    "d": 1,
    "giai": "let không đi với to → use."
   },
   {
    "muc": "gan_cau_goc",
    "q": "My brother let me ____ his laptop last night.",
    "o": [
     "to borrow",
     "borrow",
     "borrowing"
    ],
    "d": 1,
    "giai": "let me borrow – không có to."
   }
  ]
 },
 {
  "id": "TA10-U03-GR-M3",
  "bai": "TA10-U03-GR",
  "nguon": "ai",
  "ten": "Chia thì quá khứ cho động từ thứ hai vì thấy «last weekend»",
  "hs": "Có thể em đang nghĩ câu có «last weekend» nên động từ nào cũng phải chia quá khứ.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-116",
    "TN-102",
    "TN-117"
   ],
   "hien_tuong": "Trong một mệnh đề, chỉ động từ chính mới «mặc áo thì», giống như chỉ đội trưởng mới đeo băng đội trưởng. Trong câu gốc, «let» đã là quá khứ (let – let – let) nên đã mang nghĩa quá khứ rồi. Động từ đứng sau «let me» luôn giữ nguyên mẫu, dù câu nói về quá khứ hay hiện tại. Vì vậy dù có «last weekend», ta vẫn viết «let me go».",
   "vi_du": "Hôm qua cô cho cả lớp ra về: «Yesterday the teacher let us go home.» – go không đổi thành went.",
   "hinh": null,
   "mo_ta_hinh": "Câu chia làm khối: My parents | let (đánh dấu: chia quá khứ) | me | go (đánh dấu: giữ nguyên) | last weekend.",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect x=\"5\" y=\"5\" width=\"350\" height=\"190\" class=\"h-box\"/><rect x=\"15\" y=\"70\" width=\"80\" height=\"40\" class=\"h-pro\"/><text x=\"55\" y=\"95\" font-size=\"12\" text-anchor=\"middle\">My parents</text><rect x=\"100\" y=\"70\" width=\"55\" height=\"40\" class=\"h-cell\"/><text x=\"127\" y=\"95\" font-size=\"13\" text-anchor=\"middle\">let</text><rect x=\"160\" y=\"70\" width=\"45\" height=\"40\" class=\"h-pro\"/><text x=\"182\" y=\"95\" font-size=\"12\" text-anchor=\"middle\">me</text><rect x=\"210\" y=\"70\" width=\"50\" height=\"40\" class=\"h-cell\"/><text x=\"235\" y=\"95\" font-size=\"13\" text-anchor=\"middle\">go</text><rect x=\"265\" y=\"70\" width=\"85\" height=\"40\" class=\"h-pro\"/><text x=\"307\" y=\"95\" font-size=\"11\" text-anchor=\"middle\">last weekend</text><text x=\"127\" y=\"50\" font-size=\"11\" text-anchor=\"middle\">chia quá khứ</text><line x1=\"127\" y1=\"55\" x2=\"127\" y2=\"68\" class=\"h-ar\"/><text x=\"235\" y=\"140\" font-size=\"11\" text-anchor=\"middle\">giữ nguyên mẫu</text><line x1=\"235\" y1=\"112\" x2=\"235\" y2=\"128\" class=\"h-wa\"/><text x=\"180\" y=\"180\" font-size=\"11\" text-anchor=\"middle\">let me went ✗</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Trong câu «She let me sing», động từ chính là gì?",
    "o": [
     "let",
     "sing"
    ],
    "d": 0,
    "giai": "let đứng ngay sau chủ ngữ she."
   },
   {
    "muc": "hieu_tu",
    "q": "Dạng quá khứ của «let» là gì?",
    "o": [
     "letted",
     "let"
    ],
    "d": 1,
    "giai": "let – let – let, bất quy tắc."
   },
   {
    "muc": "ap_dung",
    "q": "Yesterday my sister let me ____ her dress.",
    "o": [
     "wore",
     "wear"
    ],
    "d": 1,
    "giai": "Sau let me, động từ giữ nguyên mẫu: wear."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Last Sunday our coach let us ____ a break.",
    "o": [
     "took",
     "take",
     "taking"
    ],
    "d": 1,
    "giai": "let đã mang nghĩa quá khứ, take giữ nguyên."
   }
  ]
 },
 {
  "id": "TA10-U04-VP-M1",
  "bai": "TA10-U04-VP",
  "nguon": "ai",
  "ten": "Nhầm «cho tiền/đồ» (donor) với «cho thời gian, công sức» (volunteer)",
  "hs": "Có thể em đang nghĩ ai giúp đỡ người khác cũng gọi là donor, nhưng donor là người cho tiền hoặc đồ vật, còn câu này nói về người bỏ công sức ra làm việc.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-118",
    "TN-119",
    "TN-120"
   ],
   "hien_tuong": "Có hai cách giúp đỡ cộng đồng: cho đồ vật hoặc tiền bạc, và bỏ thời gian, sức lực ra làm việc. Donor là người «cho đồ»: họ có thể chỉ chuyển khoản rồi về nhà. Volunteer là người «cho công»: họ trực tiếp làm việc như dọn rác, dạy học, nấu cơm, và không nhận lương. Trong câu gốc, các cụm «work» và «without pay» cho thấy người đó đang làm việc, nên đáp án là volunteers. Hãy nhớ: donor đưa ví tiền, volunteer xắn tay áo.",
   "vi_du": "Trong đợt quyên góp sách, bạn A tặng 20 cuốn sách (donor), còn bạn B ở lại 2 buổi chiều để xếp sách lên kệ, không nhận tiền (volunteer).",
   "hinh": null,
   "mo_ta_hinh": "Hai khung cạnh nhau: bên trái «Donor» có tay đưa đồng xu hoặc món quà, mũi tên tới hộp từ thiện, ghi «cho tiền/đồ»; bên phải «Volunteer» có người đang làm việc kèm đồng hồ, ghi «cho thời gian, công sức – 0 đồng lương».",
   "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 200\"><defs><marker id=\"a1\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L6,3 L0,6 Z\" class=\"h-ar\"/></marker></defs><rect x=\"5\" y=\"5\" width=\"170\" height=\"190\" class=\"h-box\"/><rect x=\"185\" y=\"5\" width=\"170\" height=\"190\" class=\"h-box\"/><text x=\"90\" y=\"25\" font-size=\"13\" text-anchor=\"middle\">DONOR</text><circle cx=\"45\" cy=\"90\" r=\"18\" class=\"h-pro\"/><text x=\"45\" y=\"94\" font-size=\"11\" text-anchor=\"middle\">$</text><line x1=\"68\" y1=\"90\" x2=\"105\" y2=\"90\" class=\"h-ar\" marker-end=\"url(#a1)\"/><rect x=\"110\" y=\"72\" width=\"45\" height=\"36\" class=\"h-cell\"/><text x=\"132\" y=\"94\" font-size=\"11\" text-anchor=\"middle\">Quỹ</text><text x=\"90\" y=\"150\" font-size=\"12\" text-anchor=\"middle\">cho tiền / đồ vật</text><text x=\"270\" y=\"25\" font-size=\"13\" text-anchor=\"middle\">VOLUNTEER</text><circle cx=\"235\" cy=\"80\" r=\"10\" class=\"h-cell\"/><line x1=\"235\" y1=\"90\" x2=\"235\" y2=\"115\" class=\"h-wa\"/><line x1=\"235\" y1=\"98\" x2=\"255\" y2=\"108\" class=\"h-wa\"/><circle cx=\"305\" cy=\"95\" r=\"20\" class=\"h-pro\"/><line x1=\"305\" y1=\"95\" x2=\"305\" y2=\"82\" class=\"h-wa\"/><line x1=\"305\" y1=\"95\" x2=\"315\" y2=\"95\" class=\"h-wa\"/><text x=\"270\" y=\"150\" font-size=\"12\" text-anchor=\"middle\">cho thời gian, công sức</text><text x=\"270\" y=\"170\" font-size=\"12\" text-anchor=\"middle\">lương: 0 đồng</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Người nào là donor?",
    "o": [
     "Người tặng 1 triệu đồng cho quỹ từ thiện",
     "Người dạy miễn phí cho trẻ em"
    ],
    "d": 0,
    "giai": "Donor là người cho tiền hoặc đồ. Người dạy miễn phí là volunteer."
   },
   {
    "muc": "hieu_tu",
    "q": "«Unpaid work» nghĩa là gì?",
    "o": [
     "Công việc lương cao",
     "Công việc không được trả tiền",
     "Công việc bán thời gian"
    ],
    "d": 1,
    "giai": "Unpaid / without pay nghĩa là không nhận tiền công."
   },
   {
    "muc": "ap_dung",
    "q": "Minh spends every Saturday cleaning the park for free. Minh is a ____.",
    "o": [
     "donor",
     "volunteer"
    ],
    "d": 1,
    "giai": "Minh bỏ công sức ra làm việc (cleaning) và không nhận tiền (for free), nên Minh là volunteer."
   },
   {
    "muc": "gan_cau_goc",
    "q": "People who give money or blood to help others are called ____.",
    "o": [
     "donors",
     "volunteers",
     "employers"
    ],
    "d": 0,
    "giai": "Câu này nói về việc cho (give money/blood), không phải làm việc, nên đáp án là donors. Hãy so sánh với câu gốc: «work without pay» thì là volunteers."
   }
  ]
 },
 {
  "id": "TA10-U04-VP-M2",
  "bai": "TA10-U04-VP",
  "nguon": "ai",
  "ten": "Bắt một từ khóa lẻ (community / work), bỏ qua ý chính «without pay to help others»",
  "hs": "Có thể em đang nghĩ thấy chữ «community» thì chọn residents, thấy chữ «work» thì chọn employers, mà chưa đọc kĩ cụm «without pay to help others».",
  "bai_giang": {
   "thuat_ngu": [
    "TN-121",
    "TN-122",
    "TN-123"
   ],
   "hien_tuong": "Câu định nghĩa thường có một «chìa khóa» nằm ở cả cụm từ, không nằm ở một từ riêng lẻ. Nó giống như nhận dạng một người: chỉ biết «tóc đen» thì chưa đủ, phải ghép thêm nhiều đặc điểm khác. Ở đây có 3 đặc điểm: work (làm việc), without pay (không lương), to help others (để giúp người khác). Residents chỉ là người sống trong cộng đồng. Employers là người trả lương, ngược hẳn với «without pay». Chỉ volunteers khớp với cả 3 đặc điểm.",
   "vi_du": "Cô Lan sống ở phường Hoa Sen (resident), làm chủ một tiệm bánh và trả lương cho 3 nhân viên (employer). Chỉ khi cô dành chủ nhật nấu cơm miễn phí cho bệnh nhân thì cô mới là volunteer.",
   "hinh": null,
   "mo_ta_hinh": "Ba ô đặc điểm «work», «without pay», «help others» có mũi tên cùng chỉ vào ô «volunteers». Bên dưới là ô «residents» ghi «chỉ sống ở đó» và ô «employers» ghi «trả lương», cả hai bị gạch chéo.",
   "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 200\"><defs><marker id=\"a2\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L6,3 L0,6 Z\" class=\"h-ar\"/></marker></defs><rect x=\"2\" y=\"2\" width=\"356\" height=\"196\" class=\"h-box\"/><rect x=\"15\" y=\"15\" width=\"90\" height=\"28\" class=\"h-pro\"/><text x=\"60\" y=\"34\" font-size=\"12\" text-anchor=\"middle\">work</text><rect x=\"135\" y=\"15\" width=\"90\" height=\"28\" class=\"h-pro\"/><text x=\"180\" y=\"34\" font-size=\"12\" text-anchor=\"middle\">without pay</text><rect x=\"255\" y=\"15\" width=\"90\" height=\"28\" class=\"h-pro\"/><text x=\"300\" y=\"34\" font-size=\"12\" text-anchor=\"middle\">help others</text><line x1=\"60\" y1=\"45\" x2=\"160\" y2=\"85\" class=\"h-ar\" marker-end=\"url(#a2)\"/><line x1=\"180\" y1=\"45\" x2=\"180\" y2=\"83\" class=\"h-ar\" marker-end=\"url(#a2)\"/><line x1=\"300\" y1=\"45\" x2=\"200\" y2=\"85\" class=\"h-ar\" marker-end=\"url(#a2)\"/><rect x=\"125\" y=\"88\" width=\"110\" height=\"30\" class=\"h-cell\"/><text x=\"180\" y=\"108\" font-size=\"13\" text-anchor=\"middle\">volunteers ✓</text><rect x=\"20\" y=\"145\" width=\"140\" height=\"40\" class=\"h-box\"/><text x=\"90\" y=\"162\" font-size=\"12\" text-anchor=\"middle\">residents</text><text x=\"90\" y=\"178\" font-size=\"11\" text-anchor=\"middle\">chỉ sống ở đó</text><line x1=\"20\" y1=\"145\" x2=\"160\" y2=\"185\" class=\"h-mem\"/><rect x=\"200\" y=\"145\" width=\"140\" height=\"40\" class=\"h-box\"/><text x=\"270\" y=\"162\" font-size=\"12\" text-anchor=\"middle\">employers</text><text x=\"270\" y=\"178\" font-size=\"11\" text-anchor=\"middle\">trả lương cho người khác</text><line x1=\"200\" y1=\"145\" x2=\"340\" y2=\"185\" class=\"h-mem\"/></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "«Residents» của một khu phố là ai?",
    "o": [
     "Những người sống ở khu phố đó",
     "Những người giúp khu phố miễn phí"
    ],
    "d": 0,
    "giai": "Resident nghĩa là cư dân, người sống ở một nơi. Từ này không nói gì đến việc giúp đỡ."
   },
   {
    "muc": "hieu_tu",
    "q": "Ai là employer?",
    "o": [
     "Người nhận lương hằng tháng",
     "Người hoặc công ty trả lương cho nhân viên",
     "Người làm việc không lương"
    ],
    "d": 1,
    "giai": "Employer là người thuê và trả lương. Người nhận lương là employee."
   },
   {
    "muc": "ap_dung",
    "q": "Trong câu «Students work without pay to help old people», cụm nào cho biết họ không nhận tiền?",
    "o": [
     "work",
     "without pay",
     "old people"
    ],
    "d": 1,
    "giai": "«Without pay» là không lương, đây là dấu hiệu chính của volunteers."
   },
   {
    "muc": "gan_cau_goc",
    "q": "A company that hires workers and pays them every month is called an ____.",
    "o": [
     "employer",
     "resident",
     "volunteer"
    ],
    "d": 0,
    "giai": "Câu này có «hires» và «pays», tức là thuê và trả lương, nên đáp án là employer. Câu gốc thì có «without pay» nên phải là volunteers, ngược hẳn với employer."
   }
  ]
 },
 {
  "id": "TA10-U04-GR-M1",
  "bai": "TA10-U04-GR",
  "nguon": "ai",
  "ten": "Không phân biệt hành động nền đang diễn ra (quá khứ tiếp diễn) với hành động ngắn xen vào (quá khứ đơn)",
  "hs": "Có thể em đang nghĩ cứ chuyện đã xảy ra hôm qua thì chỉ cần dùng quá khứ đơn là đủ.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-086",
    "TN-124",
    "TN-125"
   ],
   "hien_tuong": "Khi kể chuyện quá khứ, ta thường có hai loại hành động: một hành động dài làm 'nền' và một hành động ngắn 'chen ngang'. Hãy tưởng tượng em đang xem một bộ phim dài (hành động nền) thì mất điện (hành động ngắn xen vào). Hành động nền dùng was/were + V-ing, hành động chen ngang dùng quá khứ đơn. Chữ 'While' là dấu hiệu báo hiệu hành động nền, nên vế sau 'While' cần was/were + V-ing.",
   "vi_du": "While she was walking home, it started to rain. (Cô ấy đang đi bộ về nhà thì trời bắt đầu mưa.)",
   "hinh": null,
   "mo_ta_hinh": "Trục thời gian: một thanh dài tô tím ghi 'was working (đang làm)', một mũi tên đỏ ngắn cắm vào giữa thanh ghi 'met (gặp)'.",
   "svg": "<svg viewBox=\"0 0 360 200\"><defs><marker id=\"a\" markerWidth=\"8\" markerHeight=\"8\" refX=\"4\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" class=\"h-ar\"/></marker></defs><rect x=\"5\" y=\"5\" width=\"350\" height=\"190\" class=\"h-box\"/><text x=\"20\" y=\"30\" font-size=\"13\">Hôm qua (yesterday)</text><line x1=\"20\" y1=\"130\" x2=\"340\" y2=\"130\" class=\"h-wa\" marker-end=\"url(#a)\"/><rect x=\"60\" y=\"115\" width=\"220\" height=\"30\" class=\"h-cell\"/><text x=\"95\" y=\"170\" font-size=\"12\">was working (hành động dài)</text><line x1=\"170\" y1=\"55\" x2=\"170\" y2=\"112\" class=\"h-ar\" marker-end=\"url(#a)\"/><circle cx=\"170\" cy=\"130\" r=\"5\" class=\"h-sd\"/><text x=\"180\" y=\"60\" font-size=\"12\">met (hành động ngắn xen vào)</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Câu nào dùng thì quá khứ tiếp diễn?",
    "o": [
     "I was reading a book.",
     "I read a book yesterday."
    ],
    "d": 0,
    "giai": "Quá khứ tiếp diễn = was/were + V-ing: 'was reading'."
   },
   {
    "muc": "hieu_tu",
    "q": "Sau 'While' ta thường dùng hành động thế nào?",
    "o": [
     "Hành động ngắn, xảy ra trong chốc lát",
     "Hành động dài, đang diễn ra"
    ],
    "d": 1,
    "giai": "'While' = trong khi, đi với hành động đang diễn ra → was/were + V-ing."
   },
   {
    "muc": "ap_dung",
    "q": "I ____ TV when my mom came home.",
    "o": [
     "was watching",
     "watched",
     "watch"
    ],
    "d": 0,
    "giai": "Xem TV là hành động dài đang diễn ra, mẹ về là hành động ngắn xen vào → was watching."
   },
   {
    "muc": "gan_cau_goc",
    "q": "While we ____ in the park last Sunday, we saw a famous singer.",
    "o": [
     "played",
     "were playing",
     "play"
    ],
    "d": 1,
    "giai": "Có 'While' + hành động đang diễn ra trong quá khứ, chủ ngữ 'we' → were playing."
   }
  ]
 },
 {
  "id": "TA10-U04-GR-M2",
  "bai": "TA10-U04-GR",
  "nguon": "ai",
  "ten": "Bỏ qua dấu hiệu thời gian 'yesterday', dùng thì hiện tại (hiện tại tiếp diễn / hiện tại hoàn thành)",
  "hs": "Có thể em đang nghĩ chỉ cần có dạng 'đang làm' hoặc 'đã làm' là được, mà chưa để ý chữ 'yesterday' báo hiệu chuyện đã qua.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-126",
    "TN-084",
    "TN-089"
   ],
   "hien_tuong": "Trạng từ chỉ thời gian giống như tấm biển chỉ đường: nhìn biển là biết phải đi lối nào. 'Yesterday' là một mốc cụ thể đã qua, nên câu bắt buộc phải dùng thì quá khứ. 'am working' là chuyện của bây giờ, 'have worked' không đi với mốc thời gian quá khứ cụ thể. Vì vậy, khi thấy 'yesterday', em phải chọn thì quá khứ; nếu hành động đang diễn ra thì dùng was/were + V-ing.",
   "vi_du": "Yesterday at 8 p.m., I was doing my homework. (Lúc 8 giờ tối hôm qua, tôi đang làm bài tập.)",
   "hinh": null,
   "mo_ta_hinh": "Hai cột: cột trái 'Quá khứ' có yesterday, last week → was working; cột phải 'Hiện tại' có now → am working; dấu X đỏ nối 'yesterday' với 'am working / have worked'.",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect x=\"5\" y=\"5\" width=\"350\" height=\"190\" class=\"h-box\"/><rect x=\"20\" y=\"25\" width=\"150\" height=\"150\" class=\"h-cell\"/><rect x=\"190\" y=\"25\" width=\"150\" height=\"150\" class=\"h-pro\"/><text x=\"65\" y=\"45\" font-size=\"13\">QUÁ KHỨ</text><text x=\"235\" y=\"45\" font-size=\"13\">HIỆN TẠI</text><text x=\"35\" y=\"80\" font-size=\"12\">yesterday, last week</text><text x=\"50\" y=\"130\" font-size=\"12\">was working ✓</text><text x=\"235\" y=\"80\" font-size=\"12\">now, today</text><text x=\"210\" y=\"120\" font-size=\"12\">am working</text><text x=\"210\" y=\"145\" font-size=\"12\">have worked</text><line x1=\"150\" y1=\"75\" x2=\"205\" y2=\"125\" class=\"h-ar\"/><text x=\"170\" y=\"95\" font-size=\"13\">✗</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Từ nào báo hiệu thì quá khứ?",
    "o": [
     "now",
     "yesterday"
    ],
    "d": 1,
    "giai": "'yesterday' (hôm qua) là mốc thời gian đã qua → dùng thì quá khứ."
   },
   {
    "muc": "hieu_tu",
    "q": "'I am working' diễn tả hành động xảy ra khi nào?",
    "o": [
     "Ngay bây giờ",
     "Hôm qua"
    ],
    "d": 0,
    "giai": "am/is/are + V-ing là hiện tại tiếp diễn: đang xảy ra lúc nói."
   },
   {
    "muc": "ap_dung",
    "q": "At 9 a.m. yesterday, they ____ a test.",
    "o": [
     "are doing",
     "were doing",
     "have done"
    ],
    "d": 1,
    "giai": "Có 'yesterday' và hành động đang diễn ra tại một thời điểm quá khứ → were doing."
   },
   {
    "muc": "gan_cau_goc",
    "q": "While my sister ____ at the hospital last month, she helped many old people.",
    "o": [
     "is volunteering",
     "has volunteered",
     "was volunteering"
    ],
    "d": 2,
    "giai": "'last month' là quá khứ, 'While' báo hành động đang diễn ra → was volunteering."
   }
  ]
 },
 {
  "id": "TA10-U05-GR-M1",
  "bai": "TA10-U05-GR",
  "nguon": "ai",
  "ten": "Thấy mốc quá khứ (19th century) liền chọn quá khứ đơn, bỏ qua dấu hiệu «since»",
  "hs": "Có thể em đang nghĩ «thế kỉ 19 là quá khứ nên phải dùng thì quá khứ đơn», nhưng em chưa để ý chữ «since» ở trước nó.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-127",
    "TN-128",
    "TN-129"
   ],
   "hien_tuong": "Thời gian giống một sợi dây: quá khứ đơn chỉ là một điểm đã đóng lại trên sợi dây, còn hiện tại hoàn thành là một đoạn dây kéo dài từ điểm bắt đầu đến tận bây giờ. «In the 19th century» là một điểm đã đóng, nên dùng quá khứ đơn. Còn «since the 19th century» nghĩa là «từ thế kỉ 19 cho đến nay», tức là một đoạn dây kéo tới hiện tại. Vì vậy chữ «since» quyết định thì của câu chứ không phải chữ «19th century». Gặp since thì em nghĩ ngay tới have/has + V3.",
   "vi_du": "«My grandfather built this house in 1990.» (năm 1990, đã xong) khác với «We have lived in this house since 1990.» (từ năm 1990 đến nay, tức 36 năm và vẫn đang ở).",
   "hinh": null,
   "mo_ta_hinh": "Một trục thời gian nằm ngang. Bên trái có một chấm đánh dấu «1800s» và nhãn «in → quá khứ đơn (một điểm)». Từ chấm đó có một mũi tên xanh lá kéo dài tới điểm «Bây giờ» ở bên phải, kèm nhãn «since → have/has + V3 (từ đó đến nay)».",
   "svg": "<svg viewBox=\"0 0 360 200\"><defs><marker id=\"a1\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><polygon points=\"0,0 8,4 0,8\" class=\"h-wa\"/></marker></defs><rect x=\"5\" y=\"5\" width=\"350\" height=\"190\" class=\"h-box\"/><line x1=\"30\" y1=\"110\" x2=\"330\" y2=\"110\" class=\"h-mem\"/><circle cx=\"70\" cy=\"110\" r=\"7\" class=\"h-sd\"/><text x=\"50\" y=\"135\" font-size=\"12\">1800s</text><circle cx=\"300\" cy=\"110\" r=\"7\" class=\"h-head\"/><text x=\"280\" y=\"135\" font-size=\"12\">Bây giờ</text><line x1=\"78\" y1=\"85\" x2=\"292\" y2=\"85\" class=\"h-wa\" marker-end=\"url(#a1)\"/><text x=\"95\" y=\"75\" font-size=\"12\">since → have/has + V3</text><text x=\"20\" y=\"165\" font-size=\"12\">in 1800s → quá khứ đơn (một điểm đã xong)</text><text x=\"20\" y=\"30\" font-size=\"13\">Since = từ mốc đó ĐẾN NAY</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "«since 2019» có nghĩa là gì?",
    "o": [
     "vào năm 2019",
     "từ năm 2019 đến nay"
    ],
    "d": 1,
    "giai": "Since = từ… đến nay, tức là nối từ quá khứ tới hiện tại."
   },
   {
    "muc": "hieu_tu",
    "q": "Dạng nào là thì hiện tại hoàn thành?",
    "o": [
     "has visited",
     "visited",
     "visits"
    ],
    "d": 0,
    "giai": "Hiện tại hoàn thành = have/has + V3. «has visited» đúng công thức."
   },
   {
    "muc": "ap_dung",
    "q": "She ____ English since she was 8.",
    "o": [
     "learned",
     "has learned"
    ],
    "d": 1,
    "giai": "Có «since she was 8» nên việc học kéo dài từ năm 8 tuổi đến nay. Dùng has + V3."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Doctors ____ many new medicines since the 1950s.",
    "o": [
     "discovered",
     "have discovered",
     "discover"
    ],
    "d": 1,
    "giai": "«since the 1950s» là từ thập niên 1950 đến nay, nên dùng have + V3. Nếu câu là «in the 1950s» thì mới dùng discovered."
   }
  ]
 },
 {
  "id": "TA10-U05-GR-M2",
  "bai": "TA10-U05-GR",
  "nguon": "ai",
  "ten": "Thấy việc vẫn còn đúng/đang diễn ra nên chọn hiện tại đơn hoặc tiếp diễn, bỏ qua «since» nối quá khứ với hiện tại",
  "hs": "Có thể em đang nghĩ «bây giờ các nhà khoa học vẫn còn phát minh nên dùng thì hiện tại (make / are making)», nhưng «since» đòi hỏi một thì nối từ quá khứ tới hiện tại.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-127",
    "TN-130",
    "TN-131"
   ],
   "hien_tuong": "Thì hiện tại đơn và hiện tại tiếp diễn chỉ «nhìn» vào hiện tại, còn hiện tại hoàn thành là chiếc cầu nối quá khứ với hiện tại. Câu gốc tổng kết lại «từ thế kỉ 19 tới nay các nhà khoa học đã làm ra bao nhiêu phát minh», giống như đếm số bàn thắng của một cầu thủ từ đầu mùa đến giờ. Muốn đếm từ một mốc trong quá khứ thì phải dùng have/has + V3. Vì vậy hễ thấy since thì loại ngay make và are making.",
   "vi_du": "Cầu thủ ghi bàn: «He scores a lot.» (thói quen), «He is scoring now!» (ngay lúc này), «He has scored 12 goals since August.» (tổng từ tháng 8 đến nay, phải dùng hiện tại hoàn thành).",
   "hinh": null,
   "mo_ta_hinh": "Hai ô để so sánh. Ô trái ghi «make / are making» với một chấm duy nhất ở «Bây giờ» (chỉ nhìn hiện tại). Ô phải ghi «have made» với một cây cầu/mũi tên đi từ «1800s» tới «Bây giờ» (nối quá khứ với hiện tại, đi với since).",
   "svg": "<svg viewBox=\"0 0 360 200\"><defs><marker id=\"a2\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><polygon points=\"0,0 8,4 0,8\" class=\"h-wa\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"160\" height=\"180\" class=\"h-box\"/><rect x=\"190\" y=\"10\" width=\"160\" height=\"180\" class=\"h-box\"/><text x=\"30\" y=\"35\" font-size=\"12\">make / are making</text><line x1=\"25\" y1=\"110\" x2=\"155\" y2=\"110\" class=\"h-mem\"/><circle cx=\"130\" cy=\"110\" r=\"8\" class=\"h-head\"/><text x=\"105\" y=\"135\" font-size=\"11\">Bây giờ</text><text x=\"25\" y=\"170\" font-size=\"11\">Chỉ nhìn hiện tại</text><text x=\"235\" y=\"35\" font-size=\"12\">have made</text><line x1=\"200\" y1=\"110\" x2=\"340\" y2=\"110\" class=\"h-mem\"/><circle cx=\"215\" cy=\"110\" r=\"7\" class=\"h-sd\"/><text x=\"200\" y=\"135\" font-size=\"11\">1800s</text><circle cx=\"320\" cy=\"110\" r=\"8\" class=\"h-head\"/><text x=\"300\" y=\"135\" font-size=\"11\">Bây giờ</text><path d=\"M222 100 Q267 55 312 100\" fill=\"none\" class=\"h-wa\" marker-end=\"url(#a2)\"/><text x=\"200\" y=\"170\" font-size=\"11\">since: nối quá khứ → nay</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Câu nào dùng thì hiện tại tiếp diễn?",
    "o": [
     "They are building a bridge now.",
     "They have built a bridge."
    ],
    "d": 0,
    "giai": "Hiện tại tiếp diễn = am/is/are + V-ing và nói về việc đang diễn ra lúc này (now)."
   },
   {
    "muc": "hieu_tu",
    "q": "Từ nào thường đi với thì hiện tại hoàn thành?",
    "o": [
     "every day",
     "since",
     "now"
    ],
    "d": 1,
    "giai": "«since» (từ… đến nay) là dấu hiệu của hiện tại hoàn thành. «every day» đi với hiện tại đơn, «now» đi với hiện tại tiếp diễn."
   },
   {
    "muc": "ap_dung",
    "q": "My father ____ for this company since 2010.",
    "o": [
     "works",
     "is working",
     "has worked"
    ],
    "d": 2,
    "giai": "Bố làm việc từ năm 2010 đến nay (16 năm), có since nên dùng has + V3."
   },
   {
    "muc": "gan_cau_goc",
    "q": "Engineers ____ a lot of robots since the year 2000.",
    "o": [
     "are building",
     "have built",
     "build"
    ],
    "d": 1,
    "giai": "Câu tổng kết từ năm 2000 đến nay và có since, nên dùng have + V3: have built."
   }
  ]
 },
 {
  "id": "TA10-U05-WR-M1",
  "bai": "TA10-U05-WR",
  "nguon": "ai",
  "ten": "Cho rằng «can» quyết định dạng của động từ sau «be used», nên dùng động từ nguyên mẫu không «to»",
  "hs": "Có thể em đang nghĩ: câu có «can» nên động từ phía sau phải ở dạng nguyên mẫu không «to», giống «can take».",
  "bai_giang": {
   "thuat_ngu": [
    "TN-132",
    "TN-098",
    "TN-113"
   ],
   "hien_tuong": "«Can» giống như toa đầu tàu, nó chỉ kéo được đúng toa đứng ngay sau nó. Trong câu này, toa đứng ngay sau «can» là «be», vì thế «can be» đã đúng luật rồi. Phần «used» khép lại cụm bị động «be used» (được dùng). Muốn nói được dùng ĐỂ làm gì thì ta cần một từ chỉ mục đích, và từ đó là «to + V». Công thức nhớ: be used + to V = được dùng để làm gì.",
   "vi_du": "A knife can be used to cut bread. (Con dao có thể được dùng để cắt bánh mì.) – «can» đi với «be», còn «cut» đi với «to».",
   "hinh": null,
   "mo_ta_hinh": "Ba khối nối nhau theo chiều ngang: «can» → «be used» → «to take». Mũi tên đỏ đi từ «can» đến «be» ghi «can + V nguyên mẫu». Mũi tên xanh đi từ «used» đến «to take» ghi «để làm gì».",
   "svg": "<svg viewBox=\"0 0 360 200\"><defs><marker id=\"a\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\"/></marker></defs><rect class=\"h-box\" x=\"5\" y=\"5\" width=\"350\" height=\"190\"/><rect class=\"h-pro\" x=\"20\" y=\"80\" width=\"70\" height=\"40\"/><text x=\"55\" y=\"105\" font-size=\"13\" text-anchor=\"middle\">can</text><rect class=\"h-cell\" x=\"130\" y=\"80\" width=\"90\" height=\"40\"/><text x=\"175\" y=\"105\" font-size=\"13\" text-anchor=\"middle\">be used</text><rect class=\"h-pro\" x=\"260\" y=\"80\" width=\"85\" height=\"40\"/><text x=\"302\" y=\"105\" font-size=\"13\" text-anchor=\"middle\">to take</text><line class=\"h-ar\" x1=\"90\" y1=\"100\" x2=\"128\" y2=\"100\" marker-end=\"url(#a)\"/><line class=\"h-wa\" x1=\"220\" y1=\"100\" x2=\"258\" y2=\"100\" marker-end=\"url(#a)\"/><text x=\"75\" y=\"65\" font-size=\"11\">can + V nguyên mẫu</text><text x=\"225\" y=\"145\" font-size=\"11\">để làm gì: to + V</text><text x=\"180\" y=\"180\" font-size=\"12\" text-anchor=\"middle\">Mỗi động từ chỉ chi phối từ ngay sau nó</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Trong câu «She can dance», từ nào là động từ khuyết thiếu?",
    "o": [
     "She",
     "can",
     "dance"
    ],
    "d": 1,
    "giai": "«can» là động từ khuyết thiếu, ngay sau nó là động từ nguyên mẫu «dance»."
   },
   {
    "muc": "hieu_tu",
    "q": "Câu nào ở dạng bị động?",
    "o": [
     "People use computers.",
     "Computers are used by people."
    ],
    "d": 1,
    "giai": "Câu bị động có «be + V3»: are used. Chủ ngữ «computers» là vật được dùng."
   },
   {
    "muc": "ap_dung",
    "q": "I turn on the light ____ read books.",
    "o": [
     "read",
     "to read"
    ],
    "d": 1,
    "giai": "Nói mục đích (để đọc sách) thì dùng «to + V»: to read."
   },
   {
    "muc": "gan_cau_goc",
    "q": "A computer can be used ____ emails.",
    "o": [
     "send",
     "to send"
    ],
    "d": 1,
    "giai": "«can» đã đi với «be». Sau «be used» thì dùng «to + V» để chỉ công dụng: to send."
   }
  ]
 },
 {
  "id": "TA10-U05-WR-M2",
  "bai": "TA10-U05-WR",
  "nguon": "ai",
  "ten": "Nhầm với cấu trúc «be used for + V-ing» (dùng sai hoặc dùng thiếu «for»)",
  "hs": "Có thể em đang nghĩ: sau «used» thì động từ thêm -ing, hoặc có thể dùng «for» đi liền với động từ nguyên mẫu.",
  "bai_giang": {
   "thuat_ngu": [
    "TN-133",
    "TN-134",
    "TN-135"
   ],
   "hien_tuong": "Để nói công dụng của một vật có hai «công thức» đúng: «be used to + V» và «be used for + V-ing». Hãy xem hai công thức như hai bộ đồ: phải mặc trọn bộ, không được lấy áo bộ này ghép quần bộ kia. «for take» là ghép sai, vì sau giới từ «for» phải là V-ing. Còn «taking» đứng một mình thì thiếu mất «for». Trong các phương án của câu này, chỉ có «to take» là trọn bộ.",
   "vi_du": "A fridge is used to keep food cold. = A fridge is used for keeping food cold. (Không nói: used keeping / used for keep.)",
   "hinh": null,
   "mo_ta_hinh": "Hai hàng công thức đúng: «be used + to + V» và «be used + for + V-ing», mỗi hàng có dấu ✓. Bên dưới là hai cách sai «used taking» và «used for take», mỗi cách có dấu ✗ màu đỏ.",
   "svg": "<svg viewBox=\"0 0 360 200\"><rect class=\"h-box\" x=\"5\" y=\"5\" width=\"350\" height=\"190\"/><rect class=\"h-pro\" x=\"20\" y=\"20\" width=\"320\" height=\"34\"/><text x=\"30\" y=\"42\" font-size=\"13\">✓ be used + to + V  (to take)</text><rect class=\"h-pro\" x=\"20\" y=\"62\" width=\"320\" height=\"34\"/><text x=\"30\" y=\"84\" font-size=\"13\">✓ be used + for + V-ing  (for taking)</text><rect class=\"h-cell\" x=\"20\" y=\"112\" width=\"320\" height=\"30\"/><text x=\"30\" y=\"132\" font-size=\"13\">✗ be used taking  (thiếu «for»)</text><rect class=\"h-cell\" x=\"20\" y=\"150\" width=\"320\" height=\"30\"/><text x=\"30\" y=\"170\" font-size=\"13\">✗ be used for take  (sau «for» phải V-ing)</text></svg>"
  },
  "bac_thang": [
   {
    "muc": "hieu_tu",
    "q": "Từ nào là giới từ?",
    "o": [
     "for",
     "take",
     "photo"
    ],
    "d": 0,
    "giai": "«for» là giới từ, sau nó phải là danh từ hoặc V-ing."
   },
   {
    "muc": "hieu_tu",
    "q": "Sau giới từ «for» ta dùng dạng nào của động từ?",
    "o": [
     "V nguyên mẫu (take)",
     "V-ing (taking)"
    ],
    "d": 1,
    "giai": "Sau giới từ thì dùng V-ing: for taking."
   },
   {
    "muc": "ap_dung",
    "q": "A pen is used for ____.",
    "o": [
     "write",
     "writing",
     "to write"
    ],
    "d": 1,
    "giai": "Đã có «for» rồi thì dùng V-ing: for writing."
   },
   {
    "muc": "gan_cau_goc",
    "q": "A robot can be used ____ the floor.",
    "o": [
     "cleaning",
     "for clean",
     "to clean"
    ],
    "d": 2,
    "giai": "Câu không có «for» nên phải dùng «to + V»: to clean. «cleaning» thiếu «for», còn «for clean» thì sai vì sau «for» phải là V-ing."
   }
  ]
 }
];
