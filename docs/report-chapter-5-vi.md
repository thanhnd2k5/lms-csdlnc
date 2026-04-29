# Chương 5. Tối ưu và vận hành cơ sở dữ liệu

## 5.1. Vai trò của tối ưu cơ sở dữ liệu

Tối ưu cơ sở dữ liệu nhằm đảm bảo hệ thống có thể truy vấn dữ liệu nhanh, ổn định và duy trì được hiệu năng khi khối lượng dữ liệu tăng lên. Đối với hệ thống LMS, dữ liệu phát sinh không chỉ nằm ở bảng người dùng hay khóa học, mà còn tăng liên tục ở các bảng ghi danh, tiến độ học tập, lịch sử làm bài và câu trả lời của học viên.

Nếu không quan tâm đến tối ưu truy vấn ngay từ giai đoạn thiết kế, hệ thống có thể gặp tình trạng truy vấn chậm, thời gian phản hồi tăng cao và khó mở rộng khi số lượng học viên tham gia học tập ngày càng lớn. Vì vậy, việc xem xét chỉ mục, truy vấn tiêu biểu và kế hoạch thực thi truy vấn là nội dung cần thiết trong báo cáo.

## 5.2. Danh sách chỉ mục trong lược đồ

Trong lược đồ của hệ thống đã có một số chỉ mục cơ bản nhằm hỗ trợ truy vấn trên các cột khóa chính, khóa ngoại và các trường thường xuyên tham gia liên kết. Các chỉ mục này có vai trò rút ngắn thời gian tìm kiếm bản ghi, giảm số lượng dòng phải quét và hỗ trợ tốt hơn cho các phép nối giữa các bảng.

Khi trình bày trong báo cáo, có thể tổng hợp các chỉ mục này thành một bảng riêng để nêu rõ tên chỉ mục, bảng áp dụng và mục đích sử dụng. Cách trình bày này giúp người đọc dễ liên hệ giữa cấu trúc lược đồ và các truy vấn thực tế của hệ thống.

## 5.3. Các truy vấn tiêu biểu và EXPLAIN

Để đánh giá hiệu năng của cơ sở dữ liệu, báo cáo lựa chọn một số truy vấn tiêu biểu gắn trực tiếp với nghiệp vụ của hệ thống như thống kê số học viên theo khóa học, theo dõi tiến độ học tập, đếm số câu hỏi theo bài kiểm tra và tìm kiếm lớp học theo mã lớp. Đây đều là các truy vấn có khả năng xuất hiện thường xuyên trong quá trình vận hành hệ thống.

Trong số đó, lệnh `EXPLAIN` được sử dụng để phân tích cách hệ quản trị cơ sở dữ liệu xây dựng kế hoạch thực thi truy vấn. Nói cách khác, `EXPLAIN` giúp người thực hiện biết được hệ quản trị đang quét bảng như thế nào, có sử dụng chỉ mục hay không và truy vấn có dấu hiệu kém hiệu quả ở đâu. Vì vậy, đây là công cụ phù hợp để minh chứng cho phần tối ưu trong báo cáo môn học.

Trong phần thực nghiệm, báo cáo sử dụng hai cấu hình để so sánh. Cấu hình thứ nhất là lược đồ giản lược chỉ mục, chỉ giữ các ràng buộc nền tảng cần thiết để hệ thống hoạt động đúng. Cấu hình thứ hai là lược đồ chính thức của hệ thống, được lấy từ file `lms.sql`, trong đó đã bao gồm các chỉ mục phục vụ truy vấn nghiệp vụ. Việc so sánh hai cấu hình này giúp làm rõ vai trò của các chỉ mục trong thiết kế hiện tại mà không cần tự tạo thêm một bộ chỉ mục ngoài schema chuẩn.

`[Chèn Hình 5.1. Kết quả EXPLAIN tại đây]`

## 5.4. Nhận xét về hiệu năng của lược đồ

Từ góc độ thiết kế, lược đồ hiện đã có nền tảng tối ưu cơ bản nhờ việc xác định khóa chính, khóa ngoại và một số chỉ mục quan trọng ngay trong quá trình tạo bảng. Tuy nhiên, khi đặt trong bối cảnh vận hành thực tế, vẫn có thể xem xét bổ sung thêm chỉ mục trên các cột thường xuyên tham gia phép nối và điều kiện lọc như:

- `courses.teacher_id`
- `videos.course_id`
- `documents.course_id`
- `course_enrollments.course_id`

## 5.5. Kết luận

Nhìn chung, lược đồ hiện đã có nền tảng tối ưu cơ bản và có thể đáp ứng tốt nhu cầu truy vấn ở mức thông thường. Tuy nhiên, khi số lượng người dùng và dữ liệu tăng lên, việc bổ sung chỉ mục phù hợp, đối chiếu truy vấn với `EXPLAIN` và đánh giá định kỳ hiệu năng truy vấn vẫn là cần thiết để duy trì khả năng vận hành ổn định của hệ thống.
