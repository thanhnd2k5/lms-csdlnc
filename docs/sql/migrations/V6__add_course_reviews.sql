-- Migration: Add course reviews table
-- Description: Tạo bảng lưu trữ đánh giá và nhận xét của học viên cho các khóa học

-- 1. Tạo bảng 'course_reviews'
-- Bảng này lưu trữ điểm đánh giá (1-5 sao) và bình luận của sinh viên
-- Bao gồm các Index để tối ưu hiệu năng tính toán rating trung bình
CREATE TABLE IF NOT EXISTS course_reviews (
  id INT PRIMARY KEY AUTO_INCREMENT, -- ID định danh duy nhất cho mỗi đánh giá
  course_id INT NOT NULL,            -- ID của khóa học được học viên đánh giá
  user_id INT NOT NULL,              -- ID của học viên thực hiện gửi đánh giá
  rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5), -- Điểm xếp hạng từ 1 đến 5 sao
  comment TEXT DEFAULT NULL,         -- Nội dung nhận xét, ý kiến chi tiết của học viên
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian hệ thống ghi nhận đánh giá
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_course_review (user_id, course_id),
  INDEX idx_course_rating (course_id, rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
