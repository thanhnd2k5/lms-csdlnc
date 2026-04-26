# Database Notes

Nguồn chính: `backend/lms.sql`

## 1. Các bảng chính

### `users`

Lưu người dùng hệ thống:

- `username`
- `email`
- `password`
- `full_name`
- `role`: `admin`, `student`, `teacher`
- `email_verified`
- `verification_token`
- `avatar`
- `bio`

### `courses`

Lưu khóa học:

- `title`
- `description`
- `thumbnail`
- `is_public`
- `teacher_id`
- `level`
- `requirements`
- `highlights`

Quan hệ:

- một teacher có thể có nhiều course

### `chapters`

Chương thuộc khóa học:

- `course_id`
- `title`
- `order_index`

### `videos`

Video học tập:

- `title`
- `course_id`
- `chapter_id`
- `video_url`

### `quizzes`

Thông tin bài quiz:

- `title`
- `course_id`
- `chapter_id`
- `video_id`
- `duration_minutes`
- `passing_score`
- `quiz_type`
- `teacher_id`

`quiz_type` gồm:

- `video`
- `chapter`
- `course`

### `quiz_questions`

Câu hỏi của quiz:

- `quiz_id`
- `question_text`
- `points`
- `allows_multiple_correct`

### `quiz_options`

Đáp án lựa chọn:

- `question_id`
- `option_text`
- `is_correct`

### `quiz_attempts`

Lần làm quiz của học viên:

- `user_id`
- `quiz_id`
- `score`
- `status`: `completed` hoặc `failed`
- `end_time`

### `quiz_answers`

Đáp án user đã chọn trong từng attempt:

- `attempt_id`
- `question_id`
- `selected_option_id`

### `course_enrollments`

Liên kết học viên với khóa học:

- `user_id`
- `course_id`
- `enrolled_at`

Ràng buộc:

- unique `(user_id, course_id)`

### `video_completion`

Theo dõi tiến độ xem video:

- `user_id`
- `video_id`
- `is_completed`
- `completed_at`

### `documents`

Tài liệu học tập:

- `title`
- `file_path`
- `file_type`
- `course_id`
- `chapter_id`
- `video_id`
- `teacher_id`

### `classes`

Lớp học do teacher tạo:

- `name`
- `teacher_id`
- `class_code`
- `password`
- `requires_password`
- `status`
- `max_students`
- `thumbnail`

### `class_courses`

Liên kết lớp và khóa học:

- `class_id`
- `course_id`
- `requires_approval`

### `class_students`

Liên kết lớp và học viên:

- `class_id`
- `student_id`
- `status`
- `joined_at`

### `class_students_courses_approval`

Bảng thiết kế cho workflow duyệt học viên theo từng course trong lớp:

- `class_id`
- `student_id`
- `course_id`
- `status`

Trong code hiện tại chưa thấy phần logic sử dụng bảng này rõ ràng.

### `course_reviews`

Đánh giá và nhận xét của học viên:

- `course_id`
- `user_id`
- `rating` (1-5)
- `comment`
- `created_at`

## 2. Quan hệ dữ liệu chính

- `users (teacher)` 1-n `courses`
- `courses` 1-n `chapters`
- `chapters` 1-n `videos`
- `courses/videos/chapters` có thể gắn với `quizzes`
- `quizzes` 1-n `quiz_questions`
- `quiz_questions` 1-n `quiz_options`
- `users (student)` n-n `courses` qua `course_enrollments`
- `users (student)` n-n `videos` qua `video_completion`
- `courses` 1-n `documents`
- `classes` n-n `courses` qua `class_courses`
- `classes` n-n `users (student)` qua `class_students`
- `users (student)` 1-n `course_reviews`
- `courses` 1-n `course_reviews`

## 3. Ý nghĩa nghiệp vụ

Hệ thống có hai lớp tổ chức học tập:

1. `course`: đơn vị nội dung học chính, gồm chapter, video, quiz, document.
2. `class`: đơn vị quản lý nhóm học viên, dùng để gom nhiều course dưới một mã lớp.

Điểm này rất quan trọng trong báo cáo vì đây không phải chỉ là LMS kiểu "khóa học đơn lẻ", mà còn có khái niệm lớp học quản trị theo teacher.

## 4. Các điểm lệch giữa schema và code

Các điểm dưới đây nên được ghi rõ là "thực trạng code hiện tại", không nên mô tả như hành vi đã hoàn thiện:

- Schema `classes` không có cột `description`, nhưng controller/model tạo và cập nhật lớp lại dùng trường `description`.
- Schema `class_students.status` chỉ có `pending`, `active`, `blocked`, nhưng model `removeStudentFromClass` lại update thành `inactive`.
- Model `getClassStudents` truy vấn `u.fullname`, trong khi bảng `users` theo schema là `full_name`.
- Schema `documents.teacher_id` là `NOT NULL`, nhưng model `document.createDocument` không insert `teacher_id`.
- Model `lms.isStudentEnrolled` truy vấn cột `student_id` trong `course_enrollments`, trong khi schema dùng `user_id`.
- File `database.js` bật SSL cứng với `rejectUnauthorized: true`; điều này phù hợp kiểu TiDB Cloud hơn local MySQL thường.

## 5. Kết luận để dùng trong báo cáo

Nếu cần mô tả ở mức "thiết kế hệ thống", có thể nói:

- Hệ thống dùng cơ sở dữ liệu quan hệ MySQL.
- Dữ liệu được chuẩn hóa theo các thực thể người dùng, khóa học, nội dung học, đánh giá, ghi danh và lớp học.
- Có hỗ trợ theo dõi tiến độ học tập và quản lý lớp học bên cạnh quản lý khóa học.

Nếu cần mô tả ở mức "thực trạng triển khai", nên bổ sung:

- Schema đã khá đầy đủ, nhưng code vẫn còn một số chỗ chưa đồng bộ hoàn toàn với thiết kế dữ liệu.
