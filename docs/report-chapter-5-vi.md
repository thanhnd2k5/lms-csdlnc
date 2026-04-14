# Chương 5. Tối ưu và vận hành cơ sở dữ liệu

## 5.1. Vai trò của tối ưu cơ sở dữ liệu

Tối ưu cơ sở dữ liệu nhằm đảm bảo hệ thống có thể truy vấn dữ liệu nhanh, nhất là khi số lượng học viên, khóa học và dữ liệu học tập tăng lên.

## 5.2. Danh sách chỉ mục trong lược đồ

Trong lược đồ của hệ thống đã có một số chỉ mục cơ bản nhằm hỗ trợ truy vấn trên các cột khóa chính, khóa ngoại và các trường thường xuyên tham gia liên kết. Khi trình bày trong báo cáo, có thể tổng hợp các chỉ mục này thành một bảng riêng để nêu rõ tên chỉ mục, bảng áp dụng và mục đích sử dụng.

## 5.3. Các truy vấn tiêu biểu và EXPLAIN

Để đánh giá hiệu năng của cơ sở dữ liệu, báo cáo lựa chọn một số truy vấn tiêu biểu gắn trực tiếp với nghiệp vụ của hệ thống như thống kê số học viên theo khóa học, theo dõi tiến độ học tập, đếm số câu hỏi theo bài kiểm tra và tìm kiếm lớp học theo mã lớp. Các truy vấn này có thể được kiểm tra bằng lệnh `EXPLAIN` để quan sát cách hệ quản trị sử dụng chỉ mục và xây dựng kế hoạch thực thi.

`[Chèn Hình 5.1. Kết quả EXPLAIN tại đây]`

## 5.4. Nhận xét về hiệu năng của lược đồ

Lược đồ hiện đã có nền tảng tối ưu cơ bản, nhưng vẫn có thể bổ sung thêm chỉ mục trên các cột join và cột lọc như:

- `courses.teacher_id`
- `videos.course_id`
- `documents.course_id`
- `course_enrollments.course_id`

## 5.5. Kết luận

Nhìn chung, schema hiện đã có nền tảng tối ưu cơ bản và có thể đáp ứng tốt nhu cầu truy vấn ở mức thông thường. Tuy nhiên, khi số lượng người dùng và dữ liệu tăng lên, việc bổ sung chỉ mục phù hợp và theo dõi kế hoạch thực thi truy vấn vẫn là cần thiết để duy trì hiệu năng của hệ thống.
