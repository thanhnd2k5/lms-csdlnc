# Chương 3. Phân tích và thiết kế cơ sở dữ liệu

## 3.1. Yêu cầu dữ liệu

Cơ sở dữ liệu của hệ thống cần đáp ứng các nhóm yêu cầu:

- Lưu trữ thông tin người dùng và phân quyền
- Lưu trữ cấu trúc nội dung học tập
- Lưu trữ tài liệu, bài kiểm tra và kết quả học tập
- Lưu trữ ghi danh, tiến độ học tập và lớp học
- Đảm bảo tính toàn vẹn tham chiếu

## 3.2. Phân tích thực thể

Schema của hệ thống được tổ chức quanh các thực thể chính sau:

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

Chi tiết từng bảng được mô tả trong [Data Dictionary chi tiết](/D:/lms-csdlnc/docs/data-dictionary-detailed-vi.md).

## 3.3. Quan hệ và ràng buộc giữa các thực thể

Hệ thống có các quan hệ một-nhiều và nhiều-nhiều rõ ràng:

- `users` - `courses`
- `courses` - `chapters`
- `chapters` - `videos`
- `users` - `courses` qua `course_enrollments`
- `users` - `videos` qua `video_completion`
- `classes` - `courses` qua `class_courses`
- `classes` - `users` qua `class_students`

Schema sử dụng:

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

Sơ đồ ERD đề xuất:

- [erd-mermaid.md](/D:/lms-csdlnc/docs/erd-mermaid.md)

`[Chèn Hình 3.1. Sơ đồ ERD tổng thể tại đây]`

## 3.5. Lược đồ vật lý

Về mặt vật lý, schema được cài đặt trên MySQL với:

- `INT AUTO_INCREMENT`
- `TIMESTAMP`
- `BOOLEAN`
- `ENUM`
- `InnoDB`
- `utf8mb4`

## 3.6. Chuẩn hóa lược đồ

Lược đồ của hệ thống được thiết kế theo hướng chuẩn hóa tốt. Nhìn chung, các thực thể chính và các quan hệ trung gian đã được tách tương đối rõ, giúp hạn chế trùng lặp dữ liệu và thuận lợi cho việc cập nhật, truy vấn cũng như mở rộng hệ thống.

Ở mức chuẩn thứ nhất, các bảng đều có khóa chính rõ ràng và các thuộc tính được tổ chức theo dạng giá trị nguyên tử. Hệ thống không lưu nhiều giá trị trong cùng một cột, đồng thời các nhóm dữ liệu lặp đã được tách thành các bảng riêng như `quiz_questions`, `quiz_options`, `course_enrollments` hay `class_students`.

Ở mức chuẩn thứ hai, các bảng liên kết sử dụng khóa ghép như `class_courses`, `class_students` và `class_students_courses_approval` được tổ chức tương đối hợp lý. Các thuộc tính không khóa trong các bảng này nhìn chung phụ thuộc vào toàn bộ khóa chính, thay vì chỉ phụ thuộc vào một phần của khóa.

Ở mức chuẩn thứ ba, phần lớn các bảng có thể xem là đạt mức chuẩn hóa tốt vì thông tin mô tả thực thể đã được đặt đúng vào bảng tương ứng. Ví dụ, thông tin giảng viên không lặp lại trong bảng `courses`, mà được liên kết qua khóa ngoại `teacher_id`; thông tin câu hỏi và đáp án cũng được tách khỏi bảng `quizzes` để tránh phụ thuộc bắc cầu không cần thiết.

Tuy nhiên, xét một cách chặt chẽ theo lý thuyết, vẫn có một số bảng được thiết kế theo hướng phục vụ nghiệp vụ và thuận tiện cho truy vấn nên có thể tiếp tục được xem xét, tinh chỉnh nếu cần chuẩn hóa sâu hơn trong tương lai. Vì vậy, có thể kết luận rằng lược đồ của hệ thống đạt mức chuẩn hóa tốt, trong đó phần lớn các bảng có thể trình bày ở mức gần hoặc đạt chuẩn 3NF.

## 3.7. Data Dictionary

Data Dictionary chi tiết được trình bày trong:

- [data-dictionary-detailed-vi.md](/D:/lms-csdlnc/docs/data-dictionary-detailed-vi.md)

`[Chèn Bảng Data Dictionary chi tiết tại đây hoặc đưa vào Phụ lục B]`

## 3.8. Nhận xét

Schema của hệ thống LMS CSDLNC là nền tảng hợp lý để trình bày trong môn Cơ sở dữ liệu. Tuy nhiên, quá trình đối chiếu giữa thiết kế dữ liệu và phần triển khai backend cho thấy một số điểm chưa đồng bộ, được ghi chú trong:

- [schema-gap-notes.md](/D:/lms-csdlnc/docs/schema-gap-notes.md)
