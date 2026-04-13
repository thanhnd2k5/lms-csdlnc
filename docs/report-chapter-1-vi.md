# Chương 1. Giới thiệu đề tài

## 1.1. Lý do chọn đề tài

Trong xu thế chuyển đổi số hiện nay, ứng dụng công nghệ thông tin vào giáo dục và đào tạo đã trở thành một nhu cầu cấp thiết. Các hệ thống quản lý học tập trực tuyến, thường được gọi là Learning Management System, đóng vai trò quan trọng trong việc tổ chức, phân phối và theo dõi quá trình học tập của người học. Thông qua các hệ thống này, giảng viên có thể xây dựng nội dung giảng dạy, học viên có thể tiếp cận tài liệu học tập mọi lúc mọi nơi, trong khi nhà quản lý có thể theo dõi và đánh giá hiệu quả đào tạo dựa trên các dữ liệu cụ thể.

Tuy nhiên, để một hệ thống LMS có thể vận hành hiệu quả, nền tảng dữ liệu của nó cần được thiết kế khoa học, nhất quán và có khả năng mở rộng. Dữ liệu trong hệ thống LMS không đơn thuần là danh sách người dùng hay danh sách khóa học, mà còn bao gồm nhiều thành phần có quan hệ chặt chẽ như chương học, video bài giảng, tài liệu, bài kiểm tra, kết quả làm bài, lịch sử đăng ký học và thông tin lớp học. Nếu cơ sở dữ liệu được thiết kế không hợp lý, hệ thống sẽ gặp khó khăn trong quá trình truy vấn, cập nhật, bảo trì và mở rộng.

Xuất phát từ lý do trên, đề tài “Ứng dụng sử dụng cơ sở dữ liệu SQL cho hệ thống quản lý học tập trực tuyến LMS CSDLNC” được lựa chọn nhằm nghiên cứu và phân tích một bài toán gần với thực tế, đồng thời vẫn đảm bảo thể hiện rõ các kiến thức cốt lõi của môn Cơ sở dữ liệu, bao gồm phân tích thực thể, xây dựng lược đồ quan hệ, chuẩn hóa, tạo schema SQL, tối ưu truy vấn và đề xuất các giải pháp vận hành như sao lưu, phục hồi và mở rộng hệ thống.

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

Báo cáo được thực hiện theo các bước cơ bản sau:

1. Khảo sát cấu trúc dự án và file schema SQL.
2. Phân tích bài toán nghiệp vụ của hệ thống LMS.
3. Xác định các thực thể và quan hệ dữ liệu.
4. Đối chiếu schema với mã nguồn backend để đánh giá tính phù hợp.
5. Mô tả lược đồ dữ liệu ở hai mức logic và vật lý.
6. Phân tích các ràng buộc, index và truy vấn tiêu biểu.
7. Xây dựng nội dung backup, restore và các hướng mở rộng nâng cao.

Trong quá trình thực hiện, đề tài kết hợp giữa hai hướng chính. Thứ nhất là phân tích bài toán và thiết kế dữ liệu theo lý thuyết của môn học, gồm xác định thực thể, thuộc tính, quan hệ và chuẩn hóa lược đồ. Thứ hai là đối chiếu thiết kế đó với hệ thống đã xây dựng để xem dữ liệu được sử dụng như thế nào trong thực tế.

Ngoài phần thiết kế, báo cáo còn xem xét một số nội dung gần với triển khai như truy vấn SQL, chỉ mục, `EXPLAIN`, seed dữ liệu và backup/restore. Cách làm này giúp phần báo cáo không chỉ dừng ở mô tả lý thuyết mà còn gắn với khả năng sử dụng cơ sở dữ liệu trong hệ thống.

## 1.5. Ý nghĩa của đề tài

Đề tài có ý nghĩa ở hai khía cạnh.

Về mặt học thuật, đề tài giúp vận dụng các kiến thức trong môn Cơ sở dữ liệu vào một bài toán cụ thể và có tính thực tế cao. Các nội dung như phân tích thực thể, lược đồ quan hệ, chuẩn hóa, index hay backup không được trình bày một cách lý thuyết đơn lẻ, mà được gắn trực tiếp với một hệ thống ứng dụng cụ thể.

Về mặt ứng dụng, đề tài cho thấy tầm quan trọng của việc thiết kế cơ sở dữ liệu đúng ngay từ đầu đối với các hệ thống phần mềm có nghiệp vụ phức tạp.

Ngoài ra, đề tài này phù hợp với môn học vì bài toán LMS có nhiều kiểu dữ liệu khác nhau: dữ liệu người dùng, dữ liệu khóa học, dữ liệu bài kiểm tra, dữ liệu tiến độ học tập và dữ liệu lớp học. Nhờ đó, báo cáo có điều kiện trình bày được khá đầy đủ các nội dung quan trọng của môn Cơ sở dữ liệu trong cùng một hệ thống.

## 1.6. Cấu trúc báo cáo

Nội dung báo cáo được tổ chức thành các chương từ Chương 1 đến Chương 8, bao quát từ giới thiệu đề tài, mô tả bài toán, thiết kế cơ sở dữ liệu, khởi tạo, tối ưu, backup, kỹ thuật nâng cao cho đến kết luận và hướng phát triển.
