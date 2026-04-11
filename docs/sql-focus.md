# SQL Focus - Notes for Report

Tài liệu này chỉ tập trung vào phần SQL của dự án LMS.

## 1. Hệ quản trị và kiểu dữ liệu

Schema trong `backend/lms.sql` đang viết cho MySQL/InnoDB:

- Dùng `AUTO_INCREMENT`
- Dùng `ENUM`
- Dùng `TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
- Dùng `ON DELETE CASCADE` và `ON DELETE SET NULL`
- Charset: `utf8mb4`

Vì vậy trong báo cáo nên mô tả:

- Hệ quản trị cơ sở dữ liệu: MySQL
- Mô hình dữ liệu: quan hệ
- Cơ chế đảm bảo toàn vẹn: primary key, foreign key, unique key, enum, not null

## 2. Nhóm bảng theo chức năng

### Nhóm người dùng và phân quyền

- `users`

### Nhóm nội dung học tập

- `courses`
- `chapters`
- `videos`
- `documents`

### Nhóm đánh giá

- `quizzes`
- `quiz_questions`
- `quiz_options`
- `quiz_attempts`
- `quiz_answers`

### Nhóm ghi danh và tiến độ học

- `course_enrollments`
- `video_completion`

### Nhóm lớp học

- `classes`
- `class_courses`
- `class_students`
- `class_students_courses_approval`

## 3. Khóa chính và khóa ngoại

### Primary key

Các bảng thực thể chính dùng khóa chính đơn:

- `users(id)`
- `courses(id)`
- `chapters(id)`
- `videos(id)`
- `quizzes(id)`
- `quiz_questions(id)`
- `quiz_options(id)`
- `quiz_attempts(id)`
- `quiz_answers(id)`
- `course_enrollments(id)`
- `video_completion(id)`
- `documents(id)`
- `classes(id)`

Các bảng liên kết dùng khóa chính ghép:

- `class_courses(class_id, course_id)`
- `class_students(class_id, student_id)`
- `class_students_courses_approval(class_id, student_id, course_id)`

### Foreign key

Các liên kết chính:

- `courses.teacher_id -> users.id`
- `chapters.course_id -> courses.id`
- `videos.course_id -> courses.id`
- `videos.chapter_id -> chapters.id`
- `quizzes.course_id -> courses.id`
- `quizzes.chapter_id -> chapters.id`
- `quizzes.video_id -> videos.id`
- `quizzes.teacher_id -> users.id`
- `quiz_questions.quiz_id -> quizzes.id`
- `quiz_options.question_id -> quiz_questions.id`
- `quiz_attempts.user_id -> users.id`
- `quiz_attempts.quiz_id -> quizzes.id`
- `quiz_answers.attempt_id -> quiz_attempts.id`
- `quiz_answers.question_id -> quiz_questions.id`
- `quiz_answers.selected_option_id -> quiz_options.id`
- `course_enrollments.user_id -> users.id`
- `course_enrollments.course_id -> courses.id`
- `video_completion.user_id -> users.id`
- `video_completion.video_id -> videos.id`
- `documents.course_id -> courses.id`
- `documents.chapter_id -> chapters.id`
- `documents.video_id -> videos.id`
- `documents.teacher_id -> users.id`
- `classes.teacher_id -> users.id`
- `class_courses.class_id -> classes.id`
- `class_courses.course_id -> courses.id`
- `class_students.class_id -> classes.id`
- `class_students.student_id -> users.id`
- `class_students_courses_approval.class_id -> classes.id`
- `class_students_courses_approval.student_id -> users.id`
- `class_students_courses_approval.course_id -> courses.id`

## 4. Toàn vẹn dữ liệu

### Toàn vẹn thực thể

Được đảm bảo nhờ:

- mỗi bảng đều có primary key
- phần lớn ID là `INT AUTO_INCREMENT`

### Toàn vẹn tham chiếu

Được đảm bảo nhờ foreign key.

Các chiến lược xóa đang dùng:

- `ON DELETE CASCADE`: dùng khi bản ghi con không còn ý nghĩa nếu bản ghi cha bị xóa
  - ví dụ `chapters` theo `courses`, `quiz_questions` theo `quizzes`
- `ON DELETE SET NULL`: dùng khi vẫn muốn giữ bản ghi nhưng ngắt liên kết
  - ví dụ `quizzes.course_id`, `quizzes.chapter_id`, `quizzes.video_id`

### Toàn vẹn miền giá trị

Được đảm bảo bằng:

- `ENUM`
- `BOOLEAN`
- `NOT NULL`
- `UNIQUE`

Ví dụ:

- `users.role IN ('admin','student','teacher')`
- `quiz_attempts.status IN ('completed','failed')`
- `classes.status IN ('active','inactive')`
- `course_enrollments(user_id, course_id)` là duy nhất

## 5. Chỉ mục đã có trong schema

Các index khai báo rõ trong file SQL:

- `idx_user_role`
- `idx_course_public`
- `idx_chapter_order`
- `idx_video_chapter`
- `idx_quiz_type`
- `idx_attempt_user_quiz`
- `idx_class_code`

Ngoài ra:

- `UNIQUE` cũng tạo index logic cho `username`, `email`, `class_code`
- khóa chính ghép ở các bảng liên kết cũng hỗ trợ truy vấn join

## 6. Nhận xét thiết kế

### Điểm tốt

- Tách bảng hợp lý theo nghiệp vụ.
- Dùng bảng liên kết cho các quan hệ n-n.
- Có tách riêng phần quiz thành nhiều bảng, đúng tư duy chuẩn hóa.
- Có ràng buộc unique để tránh đăng ký trùng khóa học hoặc đánh dấu hoàn thành trùng video.
- Có lưu `created_at`, `updated_at`, thuận lợi cho audit và báo cáo.

### Điểm có thể nêu trong báo cáo như hướng cải tiến

- Một số bảng liên kết như `course_enrollments`, `video_completion` vừa có khóa chính surrogate `id`, vừa có unique key tự nhiên; có thể giữ như hiện tại nhưng cần giải thích lý do.
- Một số cột trạng thái dùng `ENUM`, tiện cho dự án nhỏ nhưng sẽ kém linh hoạt hơn bảng danh mục nếu hệ thống mở rộng.
- Chưa thấy index riêng cho một số foreign key hay cột lọc thường xuyên như `courses.teacher_id`, `documents.course_id`, `videos.course_id`.
- Có bảng `class_students_courses_approval` nhưng logic ứng dụng chưa khai thác hết.

## 7. Mức chuẩn hóa

Có thể trình bày ngắn gọn như sau:

- Hệ thống đạt mức chuẩn hóa tốt, phần lớn ở khoảng 3NF về mặt thiết kế logic.
- Dữ liệu người dùng, khóa học, nội dung học, bài kiểm tra, kết quả làm bài và lớp học đã được tách thành các thực thể riêng.
- Các thuộc tính lặp và đa trị đã được tách sang bảng quan hệ con, ví dụ:
  - câu hỏi và đáp án của quiz
  - ghi danh khóa học
  - tiến độ hoàn thành video
  - quan hệ lớp học - khóa học - học viên

Ví dụ giải thích 3NF dễ đưa vào báo cáo:

- Thông tin course không lặp trực tiếp trong bảng enrollment.
- Thông tin question không nhúng trực tiếp trong bảng quiz.
- Thông tin đáp án không lưu chung một cột trong bảng question.

## 8. Truy vấn mẫu có thể đưa vào báo cáo

### 8.1. Liệt kê khóa học và số học viên đăng ký

```sql
SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title
ORDER BY total_students DESC;
```

### 8.2. Liệt kê tiến độ học của học viên trong từng khóa

```sql
SELECT
  u.full_name,
  c.title AS course_title,
  COUNT(DISTINCT v.id) AS total_videos,
  COUNT(DISTINCT vc.video_id) AS completed_videos
FROM users u
JOIN course_enrollments ce ON u.id = ce.user_id
JOIN courses c ON c.id = ce.course_id
LEFT JOIN videos v ON v.course_id = c.id
LEFT JOIN video_completion vc
  ON vc.video_id = v.id
 AND vc.user_id = u.id
WHERE u.role = 'student'
GROUP BY u.id, c.id, u.full_name, c.title;
```

### 8.3. Liệt kê quiz và số câu hỏi

```sql
SELECT
  q.id,
  q.title,
  COUNT(qq.id) AS total_questions
FROM quizzes q
LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
GROUP BY q.id, q.title
ORDER BY q.id;
```

### 8.4. Kết quả làm quiz của học viên

```sql
SELECT
  u.full_name,
  q.title AS quiz_title,
  qa.score,
  qa.status,
  qa.end_time
FROM quiz_attempts qa
JOIN users u ON qa.user_id = u.id
JOIN quizzes q ON qa.quiz_id = q.id
ORDER BY qa.end_time DESC;
```

### 8.5. Liệt kê lớp học và số khóa học bên trong

```sql
SELECT
  cl.id,
  cl.name,
  COUNT(cc.course_id) AS total_courses
FROM classes cl
LEFT JOIN class_courses cc ON cl.id = cc.class_id
GROUP BY cl.id, cl.name;
```

## 9. Các điểm cần nói chính xác khi thuyết trình

- CSDL trung tâm của dự án là MySQL, không phải PostgreSQL.
- `class` và `course` là hai khái niệm khác nhau.
- Quan hệ nhiều-nhiều xuất hiện ở nhiều nơi và được giải quyết bằng bảng trung gian.
- Quiz được thiết kế đủ để lưu cả cấu trúc đề và lịch sử làm bài.
- Tiến độ học được lưu ở mức video, không phải chỉ ở mức khóa học.

## 10. Các lỗi lệch schema-code đáng chú ý

Nếu giảng viên hỏi về tính nhất quán triển khai, đây là các điểm có thể nêu:

- `classes` thiếu cột `description` nhưng code backend có dùng.
- `class_students.status` trong schema không có giá trị `inactive`, nhưng code lại cập nhật sang `inactive`.
- `documents.teacher_id` là `NOT NULL`, nhưng phần insert document trong model chưa truyền giá trị này.
- Một số truy vấn trong code không khớp tên cột schema, ví dụ `fullname` thay vì `full_name`.

Nói ngắn gọn: thiết kế schema tốt hơn mức đồng bộ triển khai hiện tại.
