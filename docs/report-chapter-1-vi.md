# Chương 1. Giới thiệu đề tài

## 1.1. Lý do chọn đề tài

Trong những năm gần đây, nhu cầu học tập trực tuyến tăng nhanh và kéo theo sự phát triển của các hệ thống quản lý học tập, thường được gọi là Learning Management System. Một hệ thống LMS không chỉ giúp cung cấp nội dung học tập, mà còn hỗ trợ quản lý người học, tổ chức bài kiểm tra, theo dõi tiến độ và tổng hợp kết quả học tập.

Để các chức năng đó vận hành ổn định, cơ sở dữ liệu giữ vai trò rất quan trọng. Dữ liệu trong hệ thống LMS không chỉ dừng ở thông tin tài khoản hay danh sách khóa học, mà còn bao gồm chương học, video, tài liệu, bài kiểm tra, kết quả làm bài, lịch sử ghi danh và thông tin lớp học. Nếu mô hình dữ liệu được thiết kế thiếu chặt chẽ, hệ thống sẽ dễ gặp vấn đề về trùng lặp dữ liệu, khó truy vấn, khó mở rộng và khó bảo trì.

Từ yêu cầu đó, đề tài “Ứng dụng sử dụng cơ sở dữ liệu SQL cho hệ thống quản lý học tập trực tuyến LMS CSDLNC” được thực hiện nhằm xây dựng và phân tích một bài toán có tính thực tế, qua đó vận dụng các nội dung trọng tâm của học phần Cơ sở dữ liệu như phân tích thực thể, thiết kế lược đồ quan hệ, chuẩn hóa, khởi tạo schema, tối ưu truy vấn và đề xuất các phương án sao lưu, phục hồi dữ liệu.

## 1.2. Mục tiêu nghiên cứu

Đề tài hướng tới các mục tiêu chính sau:

- Phân tích bài toán quản lý học tập trực tuyến trên môi trường web.
- Xác định các thực thể dữ liệu, thuộc tính, quan hệ và ràng buộc cần thiết của hệ thống.
- Xây dựng cơ sở dữ liệu quan hệ sử dụng SQL phù hợp với bài toán.
- Đánh giá mức độ hợp lý của schema dữ liệu được xây dựng cho hệ thống LMS CSDLNC.
- Trình bày các nội dung liên quan đến khởi tạo, tối ưu, backup và restore cơ sở dữ liệu.
- Đề xuất một số hướng mở rộng nâng cao như replication và sharding ở mức độ lý thuyết.

## 1.3. Phạm vi đề tài

Đề tài hướng tới việc xây dựng một hệ thống LMS gồm frontend, backend và cơ sở dữ liệu SQL. Tuy nhiên, do trọng tâm của học phần là Cơ sở dữ liệu, nội dung báo cáo chủ yếu tập trung trình bày thành phần cơ sở dữ liệu của hệ thống, cụ thể bao gồm:

- phân tích yêu cầu dữ liệu
- xác định thực thể, thuộc tính và quan hệ
- xây dựng lược đồ logic và vật lý
- mô tả data dictionary
- phân tích chuẩn hóa
- đánh giá index và hiệu năng truy vấn
- đề xuất backup, restore và mở rộng cơ sở dữ liệu

## 1.4. Phương pháp thực hiện

Báo cáo được thực hiện theo các bước chính sau:

1. Phân tích bài toán nghiệp vụ của hệ thống LMS.
2. Khảo sát schema SQL và xác định các thực thể dữ liệu chính.
3. Mô tả quan hệ, ràng buộc và lược đồ dữ liệu ở mức logic và vật lý.
4. Đánh giá mức độ chuẩn hóa của lược đồ.
5. Xây dựng các nội dung về migration, seed, chỉ mục, truy vấn mẫu và `EXPLAIN`.
6. Đề xuất phương án sao lưu, phục hồi và các hướng mở rộng nâng cao.

Trong quá trình thực hiện, đề tài kết hợp giữa phân tích lý thuyết và đối chiếu với phần triển khai thực tế của hệ thống. Cách tiếp cận này giúp nội dung báo cáo vừa bám sát yêu cầu của môn học, vừa phản ánh đúng cách cơ sở dữ liệu được sử dụng trong ứng dụng.

## 1.5. Ý nghĩa của đề tài

Đề tài có ý nghĩa ở cả mặt học thuật và thực tiễn.

Về mặt học thuật, đề tài tạo điều kiện vận dụng các kiến thức cốt lõi của môn Cơ sở dữ liệu vào một bài toán cụ thể, từ phân tích thực thể và quan hệ cho đến chuẩn hóa, tối ưu truy vấn và tổ chức dữ liệu. Nhờ vậy, các khái niệm của môn học không chỉ được trình bày ở mức lý thuyết mà còn gắn với một hệ thống có nghiệp vụ rõ ràng.

Về mặt thực tiễn, đề tài cho thấy cơ sở dữ liệu là nền tảng quyết định khả năng vận hành của hệ thống LMS. Một thiết kế dữ liệu hợp lý sẽ hỗ trợ tốt cho việc quản lý người dùng, tổ chức nội dung học tập, lưu kết quả đánh giá và theo dõi tiến độ học tập một cách nhất quán.

## 1.6. Cấu trúc báo cáo

Nội dung báo cáo được tổ chức thành các chương từ Chương 1 đến Chương 8, bao quát từ giới thiệu đề tài, mô tả bài toán, thiết kế cơ sở dữ liệu, khởi tạo, tối ưu, backup, kỹ thuật nâng cao cho đến kết luận và hướng phát triển.
