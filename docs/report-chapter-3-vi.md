# Chương 3. Phân tích và thiết kế cơ sở dữ liệu

## 3.1. Yêu cầu dữ liệu

Cơ sở dữ liệu của hệ thống cần đáp ứng các nhóm yêu cầu:

- Lưu trữ thông tin người dùng và phân quyền
- Lưu trữ cấu trúc nội dung học tập
- Lưu trữ tài liệu, bài kiểm tra và kết quả học tập
- Lưu trữ ghi danh, tiến độ học tập và lớp học
- Đảm bảo tính toàn vẹn tham chiếu

## 3.2. Phân tích thực thể

Lược đồ dữ liệu của hệ thống được tổ chức quanh các thực thể chính sau:

- `users`
- `courses`
- `chapters`
- `videos`
- `quizzes`
- `quiz_questions`
- `quiz_options`
- `quiz_attempts`
- `quiz_answers`
- `course_enrollments`
- `video_completion`
- `documents`
- `classes`
- `class_courses`
- `class_students`
- `class_students_courses_approval`

Trong báo cáo chính, các thực thể trên sẽ được phân tích theo nhóm chức năng để làm rõ vai trò của từng thành phần dữ liệu trong hệ thống. Phần mô tả chi tiết tên bảng, tên cột, kiểu dữ liệu và ràng buộc có thể trình bày ở mục Từ điển dữ liệu hoặc đưa xuống phần phụ lục để thuận tiện theo dõi.

## 3.3. Quan hệ và ràng buộc giữa các thực thể

Hệ thống có các quan hệ một-nhiều và nhiều-nhiều rõ ràng:

- `users` - `courses`
- `courses` - `chapters`
- `chapters` - `videos`
- `users` - `courses` qua `course_enrollments`
- `users` - `videos` qua `video_completion`
- `classes` - `courses` qua `class_courses`
- `classes` - `users` qua `class_students`

Để đảm bảo tính toàn vẹn dữ liệu, lược đồ sử dụng các cơ chế ràng buộc sau:

- khóa chính
- khóa ngoại
- unique key
- enum
- not null

## 3.4. Lược đồ logic

Về mặt logic, hệ thống được chia thành các cụm dữ liệu:

- quản lý người dùng
- quản lý nội dung học tập
- quản lý đánh giá
- quản lý tham gia học tập
- quản lý lớp học

Để làm rõ quan hệ giữa các thực thể, báo cáo sử dụng sơ đồ ERD ở cả mức tổng thể và mức nhóm chức năng. Trước hết, Hình 3.1 trình bày sơ đồ ERD tổng thể của toàn bộ hệ thống, qua đó cho thấy mối liên hệ giữa người dùng, khóa học, nội dung học tập, bài kiểm tra, tiến độ học tập và lớp học.

`[Chèn Hình 3.1. Sơ đồ ERD tổng thể của hệ thống tại đây]`

Từ sơ đồ tổng thể, có thể tiếp tục phân tích sâu hơn các nhóm dữ liệu có vai trò trọng tâm trong hệ thống. Để thuận tiện cho việc theo dõi, báo cáo tách riêng ba nhóm dữ liệu chính gồm nhóm đánh giá và bài kiểm tra, nhóm lớp học và ghi danh, và nhóm nội dung học tập.

Hình 3.2 làm rõ mối quan hệ giữa bài kiểm tra, câu hỏi, đáp án và lịch sử làm bài của học viên.

`[Chèn Hình 3.2. Sơ đồ ERD nhóm đánh giá và bài kiểm tra tại đây]`

Hình 3.3 thể hiện nhóm dữ liệu phục vụ quản lý lớp học, ghi danh và theo dõi tiến độ học tập của học viên.

`[Chèn Hình 3.3. Sơ đồ ERD nhóm lớp học, ghi danh và tiến độ học tập tại đây]`

Hình 3.4 mô tả cấu trúc dữ liệu của nhóm nội dung học tập, gồm khóa học, chương học, video và tài liệu.

`[Chèn Hình 3.4. Sơ đồ ERD nhóm nội dung học tập tại đây]`

Cách trình bày này giúp người đọc vừa có cái nhìn tổng quan về toàn bộ hệ thống, vừa theo dõi được chi tiết của từng nhóm dữ liệu quan trọng mà không bị rối bởi một sơ đồ quá lớn.

## 3.5. Lược đồ vật lý

Về mặt vật lý, lược đồ được cài đặt trên MySQL với:

- `INT AUTO_INCREMENT`
- `TIMESTAMP`
- `BOOLEAN`
- `ENUM`
- `InnoDB`
- `utf8mb4`

Ở mức vật lý, mỗi bảng được cài đặt bằng các câu lệnh `CREATE TABLE`, trong đó xác định rõ khóa chính, khóa ngoại, kiểu dữ liệu, giá trị mặc định và các chỉ mục cần thiết. Việc mô tả lược đồ vật lý giúp làm rõ cách mô hình dữ liệu logic được chuyển thành cấu trúc cụ thể trong hệ quản trị cơ sở dữ liệu MySQL.

## 3.6. Chuẩn hóa lược đồ

Lược đồ của hệ thống được thiết kế theo hướng chuẩn hóa tốt. Nhìn chung, các thực thể chính và các quan hệ trung gian đã được tách tương đối rõ, giúp hạn chế trùng lặp dữ liệu và thuận lợi cho việc cập nhật, truy vấn cũng như mở rộng hệ thống.

Ở mức chuẩn thứ nhất, các bảng đều có khóa chính rõ ràng và các thuộc tính được tổ chức theo dạng giá trị nguyên tử. Hệ thống không lưu nhiều giá trị trong cùng một cột, đồng thời các nhóm dữ liệu lặp đã được tách thành các bảng riêng như `quiz_questions`, `quiz_options`, `course_enrollments` hay `class_students`.

Ở mức chuẩn thứ hai, các bảng liên kết sử dụng khóa ghép như `class_courses`, `class_students` và `class_students_courses_approval` được tổ chức tương đối hợp lý. Các thuộc tính không khóa trong các bảng này nhìn chung phụ thuộc vào toàn bộ khóa chính, thay vì chỉ phụ thuộc vào một phần của khóa.

Ở mức chuẩn thứ ba, phần lớn các bảng có thể xem là đạt mức chuẩn hóa tốt vì thông tin mô tả thực thể đã được đặt đúng vào bảng tương ứng. Ví dụ, thông tin giảng viên không lặp lại trong bảng `courses`, mà được liên kết qua khóa ngoại `teacher_id`; thông tin câu hỏi và đáp án cũng được tách khỏi bảng `quizzes` để tránh phụ thuộc bắc cầu không cần thiết.

Tuy nhiên, xét một cách chặt chẽ theo lý thuyết, vẫn có một số bảng được thiết kế theo hướng phục vụ nghiệp vụ và thuận tiện cho truy vấn nên có thể tiếp tục được xem xét, tinh chỉnh nếu cần chuẩn hóa sâu hơn trong tương lai. Vì vậy, có thể kết luận rằng lược đồ của hệ thống đạt mức chuẩn hóa tốt, trong đó phần lớn các bảng có thể trình bày ở mức gần hoặc đạt chuẩn 3NF.

## 3.7. Từ điển dữ liệu

Sau khi phân tích thực thể và quan hệ, bước tiếp theo là mô tả chi tiết từng bảng dữ liệu thông qua Từ điển dữ liệu (Data Dictionary). Nội dung này bao gồm tên bảng, mục đích sử dụng, tên cột, kiểu dữ liệu, khóa chính, khóa ngoại và các ràng buộc quan trọng. Nếu phần này quá dài, có thể chuyển xuống phụ lục để báo cáo chính gọn và dễ theo dõi hơn.

`[Chèn Bảng Data Dictionary chi tiết tại đây hoặc chuyển xuống Phụ lục B]`

## 3.8. Nhận xét

Nhìn chung, lược đồ dữ liệu của hệ thống LMS CSDLNC đủ rõ ràng để trình bày trong khuôn khổ môn Cơ sở dữ liệu. Tuy nhiên, khi đối chiếu giữa thiết kế dữ liệu và phần triển khai backend, vẫn có một số điểm chưa đồng bộ. Các điểm này nên được ghi nhận ở một mục riêng hoặc phụ lục nhận xét để tránh nhầm lẫn giữa thiết kế cơ sở dữ liệu và hiện trạng triển khai mã nguồn.
