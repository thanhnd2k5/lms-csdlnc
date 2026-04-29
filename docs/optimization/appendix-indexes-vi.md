# Phụ Lục - Danh Sách Chỉ Mục và Mục Đích

Nguồn đối chiếu chính: `backend/lms.sql`

## 1. Các chỉ mục có sẵn trong schema

| Bảng | Tên chỉ mục | Cột | Mục đích |
|---|---|---|---|
| `users` | `idx_user_role` | `role` | Lọc người dùng theo vai trò |
| `courses` | `idx_course_public` | `is_public` | Tìm kiếm và hiển thị khóa học công khai |
| `chapters` | `idx_chapter_order` | `course_id, order_index` | Lấy và sắp xếp chương theo khóa học |
| `videos` | `idx_video_chapter` | `chapter_id` | Lấy video theo chương |
| `quizzes` | `idx_quiz_type` | `quiz_type` | Lọc bài kiểm tra theo phạm vi gắn |
| `quiz_attempts` | `idx_attempt_user_quiz` | `user_id, quiz_id` | Tra cứu kết quả bài làm theo học viên và bài kiểm tra |
| `classes` | `idx_class_code` | `class_code` | Tìm lớp học theo mã lớp |
| `course_reviews` | `idx_course_rating` | `course_id, rating` | Tối ưu tính toán điểm trung bình và lọc rating |

## 2. Unique key có tác dụng như chỉ mục

| Bảng | Ràng buộc | Ý nghĩa |
|---|---|---|
| `users` | `username UNIQUE` | Tránh trùng tên đăng nhập |
| `users` | `email UNIQUE` | Tránh trùng email |
| `classes` | `class_code UNIQUE` | Tránh trùng mã lớp |
| `course_enrollments` | `UNIQUE (user_id, course_id)` | Tránh đăng ký khóa học trùng |
| `video_completion` | `UNIQUE (user_id, video_id)` | Tránh đánh dấu hoàn thành trùng |
| `course_reviews` | `unique_user_course_review (user_id, course_id)` | Mỗi học viên chỉ đánh giá một khóa học một lần |

## 3. Các chỉ mục có trong lược đồ chính thức nhưng không có trong cấu hình before

| Bảng | Cột | Lý do |
|---|---|---|
| `users` | `role` | Hỗ trợ lọc người dùng theo vai trò |
| `courses` | `is_public` | Hỗ trợ lọc khóa học công khai |
| `chapters` | `course_id, order_index` | Hỗ trợ lấy và sắp xếp chương theo khóa học |
| `videos` | `chapter_id` | Hỗ trợ lấy video theo chương |
| `quizzes` | `quiz_type` | Hỗ trợ lọc bài kiểm tra theo phạm vi gắn |
| `quiz_attempts` | `user_id, quiz_id` | Hỗ trợ tra cứu bài làm theo học viên và bài kiểm tra |
| `classes` | `class_code` | Hỗ trợ tìm lớp theo mã lớp |
| `course_reviews` | `course_id, rating` | Hỗ trợ truy vấn thống kê đánh giá |

## 4. Cách viết vào báo cáo

Có thể trình bày:

“Để đánh giá tác động của chỉ mục đối với hiệu năng truy vấn, báo cáo sử dụng hai cấu hình thực nghiệm: cấu hình before với lược đồ giản lược chỉ mục và cấu hình after là lược đồ chính thức của hệ thống. Việc so sánh hai cấu hình này giúp làm rõ vai trò của các chỉ mục đã được thiết kế trong schema hiện tại.”
