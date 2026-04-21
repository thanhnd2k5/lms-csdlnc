-- Migration: Add course metadata and instructor bio
-- Description: Cập nhật cấu trúc bảng cho trang chi tiết khóa học hiện đại

-- 1. Thêm trường 'bio' vào bảng 'users' để lưu tiểu sử của giảng viên
-- Trường này cho phép mô tả kinh nghiệm và thông tin cá nhân của người dạy
ALTER TABLE users ADD COLUMN bio TEXT DEFAULT NULL;

-- 2. Cập nhật bảng 'courses' với các trường metadata bổ sung
-- level: Trình độ của khóa học (Cơ bản, Trung cấp, Cao cấp, Mọi trình độ)
ALTER TABLE courses ADD COLUMN level ENUM('Beginner', 'Intermediate', 'Advanced', 'All Levels') DEFAULT 'All Levels';

-- requirements: Lưu trữ danh sách các yêu cầu đầu vào dưới dạng JSON string
ALTER TABLE courses ADD COLUMN requirements TEXT DEFAULT NULL COMMENT 'Mảng JSON lưu các yêu cầu';

-- highlights: Lưu trữ các điểm nổi bật/kết quả đạt được sau khóa học dưới dạng JSON string
ALTER TABLE courses ADD COLUMN highlights TEXT DEFAULT NULL COMMENT 'Mảng JSON lưu mục tiêu - Bạn sẽ học được gì';

