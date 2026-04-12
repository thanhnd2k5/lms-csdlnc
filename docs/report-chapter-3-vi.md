# Chương 3. Phân tích và thiết kế cơ sở dữ liệu

## 3.1. Yêu cầu dữ liệu

Cơ sở dữ liệu của hệ thống cần đáp ứng các nhóm yêu cầu:

- Lưu trữ thông tin người dùng và phân quyền
- Lưu trữ cấu trúc nội dung học tập
- Lưu trữ tài liệu, bài kiểm tra và kết quả học tập
- Lưu trữ ghi danh, tiến độ học tập và lớp học
- Đảm bảo tính toàn vẹn tham chiếu

## 3.2. Phân tích thực thể

Schema hiện tại bao gồm các thực thể chính:

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

Schema hiện tại đạt mức chuẩn hóa tốt, có thể trình bày là đạt đến mức 3NF ở phần lớn các bảng:

- dữ liệu lặp được tách ra bảng riêng
- quan hệ nhiều-nhiều được tách qua bảng trung gian
- thông tin mô tả thực thể không lặp lại không cần thiết

## 3.7. Data Dictionary

Data Dictionary chi tiết được trình bày trong:

- [data-dictionary-detailed-vi.md](/D:/lms-csdlnc/docs/data-dictionary-detailed-vi.md)

`[Chèn Bảng Data Dictionary chi tiết tại đây hoặc đưa vào Phụ lục B]`

## 3.8. Nhận xét

Schema hiện tại của hệ thống LMS CSDLNC là nền tảng hợp lý để phân tích trong môn Cơ sở dữ liệu. Tuy nhiên, quá trình đối chiếu với backend cho thấy một số điểm chưa đồng bộ, được ghi chú trong:

- [schema-gap-notes.md](/D:/lms-csdlnc/docs/schema-gap-notes.md)
