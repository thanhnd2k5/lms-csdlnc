# Data Dictionary Chi Tiết

Tài liệu này mô tả chi tiết các bảng và các cột trong schema `backend/lms.sql`.

## 1. Bảng `users`

Mục đích: Lưu thông tin tài khoản người dùng trong hệ thống.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã định danh duy nhất của người dùng |
| `username` | `VARCHAR(50)` | `UNIQUE`, `NOT NULL` | Tên đăng nhập của người dùng |
| `email` | `VARCHAR(100)` | `UNIQUE`, `NOT NULL` | Địa chỉ email của người dùng |
| `password` | `VARCHAR(255)` | `NOT NULL` | Mật khẩu đã mã hóa |
| `full_name` | `VARCHAR(100)` | `DEFAULT NULL` | Họ và tên người dùng |
| `role` | `ENUM('admin','student','teacher')` | `DEFAULT 'student'` | Vai trò của người dùng |
| `email_verified` | `BOOLEAN` | `DEFAULT FALSE` | Trạng thái xác thực email |
| `verification_token` | `VARCHAR(255)` | Nullable | Mã token phục vụ xác thực email |
| `avatar` | `VARCHAR(255)` | `DEFAULT NULL` | Đường dẫn ảnh đại diện |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo tài khoản |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thời điểm cập nhật gần nhất |

## 2. Bảng `courses`

Mục đích: Lưu thông tin khóa học.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã khóa học |
| `title` | `VARCHAR(200)` | `NOT NULL` | Tên khóa học |
| `description` | `TEXT` | `DEFAULT NULL` | Mô tả khóa học |
| `thumbnail` | `VARCHAR(255)` | `DEFAULT NULL` | Ảnh đại diện khóa học |
| `is_public` | `BOOLEAN` | `DEFAULT FALSE` | Trạng thái công khai của khóa học |
| `teacher_id` | `INT` | `FOREIGN KEY -> users(id)` | Giảng viên phụ trách khóa học |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo khóa học |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thời điểm cập nhật khóa học |

## 3. Bảng `chapters`

Mục đích: Lưu thông tin các chương trong khóa học.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã chương |
| `course_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> courses(id)` | Mã khóa học mà chương thuộc về |
| `title` | `VARCHAR(255)` | `NOT NULL` | Tên chương |
| `order_index` | `INT` | `DEFAULT 0` | Thứ tự sắp xếp chương trong khóa học |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo chương |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thời điểm cập nhật chương |

## 4. Bảng `videos`

Mục đích: Lưu bài giảng video.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã video |
| `title` | `VARCHAR(200)` | `NOT NULL` | Tiêu đề video |
| `course_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> courses(id)` | Khóa học mà video thuộc về |
| `chapter_id` | `INT` | `FOREIGN KEY -> chapters(id)` | Chương mà video thuộc về |
| `video_url` | `VARCHAR(255)` | `NOT NULL` | Đường dẫn video |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo video |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thời điểm cập nhật video |

## 5. Bảng `quizzes`

Mục đích: Lưu thông tin bài kiểm tra trắc nghiệm.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã bài kiểm tra |
| `title` | `VARCHAR(255)` | `NOT NULL` | Tiêu đề bài kiểm tra |
| `course_id` | `INT` | `FOREIGN KEY -> courses(id)` | Khóa học liên quan |
| `chapter_id` | `INT` | `FOREIGN KEY -> chapters(id)` | Chương liên quan |
| `video_id` | `INT` | `FOREIGN KEY -> videos(id)` | Video liên quan |
| `duration_minutes` | `INT` | `DEFAULT 30` | Thời lượng làm bài |
| `passing_score` | `INT` | `DEFAULT 60` | Điểm đạt tối thiểu |
| `quiz_type` | `ENUM('video', 'chapter', 'course')` | `DEFAULT 'video'` | Loại bài kiểm tra theo phạm vi gắn |
| `teacher_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Giảng viên tạo bài kiểm tra |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo bài kiểm tra |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thời điểm cập nhật bài kiểm tra |

## 6. Bảng `quiz_questions`

Mục đích: Lưu câu hỏi của bài kiểm tra.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã câu hỏi |
| `quiz_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quizzes(id)` | Mã bài kiểm tra mà câu hỏi thuộc về |
| `question_text` | `TEXT` | `NOT NULL` | Nội dung câu hỏi |
| `points` | `INT` | `DEFAULT 1` | Số điểm của câu hỏi |
| `allows_multiple_correct` | `BOOLEAN` | `DEFAULT FALSE` | Cho phép nhiều đáp án đúng hay không |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo câu hỏi |

## 7. Bảng `quiz_options`

Mục đích: Lưu các phương án trả lời của câu hỏi.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã đáp án |
| `question_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quiz_questions(id)` | Mã câu hỏi tương ứng |
| `option_text` | `TEXT` | `NOT NULL` | Nội dung đáp án |
| `is_correct` | `BOOLEAN` | `DEFAULT FALSE` | Xác định đáp án đúng hay sai |

## 8. Bảng `quiz_attempts`

Mục đích: Lưu thông tin lần làm bài kiểm tra của học viên.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã lần làm bài |
| `user_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Học viên thực hiện bài làm |
| `quiz_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quizzes(id)` | Bài kiểm tra được thực hiện |
| `score` | `INT` | `NOT NULL` | Điểm số của bài làm |
| `status` | `ENUM('completed', 'failed')` | `NOT NULL` | Trạng thái kết quả bài làm |
| `end_time` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm kết thúc bài làm |

## 9. Bảng `quiz_answers`

Mục đích: Lưu đáp án mà học viên đã chọn trong mỗi lần làm bài.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã câu trả lời |
| `attempt_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quiz_attempts(id)` | Lần làm bài tương ứng |
| `question_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quiz_questions(id)` | Câu hỏi tương ứng |
| `selected_option_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quiz_options(id)` | Đáp án được chọn |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm ghi nhận câu trả lời |

## 10. Bảng `course_enrollments`

Mục đích: Lưu thông tin học viên đăng ký khóa học.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã đăng ký |
| `user_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Học viên đăng ký |
| `course_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> courses(id)` | Khóa học được đăng ký |
| `enrolled_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm đăng ký |

Ràng buộc bổ sung:

- `UNIQUE KEY unique_enrollment (user_id, course_id)`

## 11. Bảng `video_completion`

Mục đích: Lưu tiến độ hoàn thành video của học viên.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã bản ghi tiến độ |
| `user_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Học viên thực hiện |
| `video_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> videos(id)` | Video được đánh dấu |
| `is_completed` | `BOOLEAN` | `DEFAULT TRUE` | Trạng thái hoàn thành |
| `completed_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm hoàn thành |

Ràng buộc bổ sung:

- `UNIQUE KEY unique_completion (user_id, video_id)`

## 12. Bảng `documents`

Mục đích: Lưu tài liệu học tập đính kèm.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã tài liệu |
| `title` | `VARCHAR(255)` | `NOT NULL` | Tiêu đề tài liệu |
| `file_path` | `VARCHAR(255)` | `NOT NULL` | Đường dẫn lưu file |
| `file_type` | `VARCHAR(50)` | `NOT NULL` | Định dạng file |
| `course_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> courses(id)` | Khóa học liên quan |
| `chapter_id` | `INT` | `FOREIGN KEY -> chapters(id)` | Chương liên quan |
| `video_id` | `INT` | `FOREIGN KEY -> videos(id)` | Video liên quan |
| `teacher_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Giảng viên tải lên tài liệu |
| `uploaded_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tải lên |

## 13. Bảng `classes`

Mục đích: Lưu thông tin lớp học.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Mã lớp học |
| `name` | `VARCHAR(255)` | `NOT NULL` | Tên lớp học |
| `teacher_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Giảng viên quản lý lớp |
| `class_code` | `VARCHAR(10)` | `UNIQUE`, `NOT NULL` | Mã lớp để học viên tham gia |
| `password` | `VARCHAR(255)` | `DEFAULT NULL` | Mật khẩu lớp học nếu có |
| `requires_password` | `BOOLEAN` | `DEFAULT FALSE` | Xác định lớp có yêu cầu mật khẩu hay không |
| `status` | `ENUM('active', 'inactive')` | `DEFAULT 'active'` | Trạng thái hoạt động của lớp |
| `max_students` | `INT` | `DEFAULT 100` | Số học viên tối đa |
| `thumbnail` | `VARCHAR(255)` | `DEFAULT NULL` | Ảnh đại diện lớp học |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo lớp |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thời điểm cập nhật lớp |

## 14. Bảng `class_courses`

Mục đích: Liên kết lớp học với khóa học.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `class_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> classes(id)` | Mã lớp học |
| `course_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> courses(id)` | Mã khóa học |
| `requires_approval` | `BOOLEAN` | `DEFAULT FALSE` | Xác định có cần phê duyệt học viên hay không |
| `added_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm thêm khóa học vào lớp |

## 15. Bảng `class_students`

Mục đích: Liên kết lớp học với học viên.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `class_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> classes(id)` | Mã lớp học |
| `student_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> users(id)` | Mã học viên |
| `status` | `ENUM('pending', 'active', 'blocked')` | `DEFAULT 'active'` | Trạng thái tham gia lớp |
| `joined_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tham gia lớp |

## 16. Bảng `class_students_courses_approval`

Mục đích: Lưu thông tin phê duyệt học viên theo từng khóa học trong lớp.

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `class_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> classes(id)` | Mã lớp học |
| `student_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> users(id)` | Mã học viên |
| `course_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> courses(id)` | Mã khóa học |
| `status` | `ENUM('pending', 'approved', 'rejected', 'blocked')` | `DEFAULT 'pending'` | Trạng thái phê duyệt |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thời điểm cập nhật trạng thái |
