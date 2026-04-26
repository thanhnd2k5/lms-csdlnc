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

## 3. Các chỉ mục đề xuất bổ sung

| Bảng | Cột | Lý do |
|---|---|---|
| `courses` | `teacher_id` | Thường xuyên join và lọc theo giảng viên |
| `videos` | `course_id` | Thường xuyên lấy video theo khóa học |
| `documents` | `course_id` | Thường xuyên lấy tài liệu theo khóa học |
| `course_enrollments` | `course_id` | Hỗ trợ thống kê số học viên theo khóa học |
| `video_completion` | `video_id` | Hỗ trợ thống kê tiến độ học tập |

## 4. Cách viết vào báo cáo

Có thể trình bày:

“Schema hiện tại đã có một số chỉ mục cơ bản phục vụ các truy vấn nghiệp vụ quan trọng. Tuy nhiên, để nâng cao hiệu năng khi dữ liệu tăng lên, hệ thống có thể bổ sung thêm một số chỉ mục trên các cột join và cột lọc thường xuyên, đặc biệt trong các bảng giao dịch và thống kê.”
