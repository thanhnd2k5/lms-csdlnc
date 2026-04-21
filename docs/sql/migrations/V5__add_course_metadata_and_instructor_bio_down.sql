-- Migration Down: Add course metadata and instructor bio
-- Description: Hoàn tác các thay đổi của bản migration V5 (Rollback)

-- 1. Xóa các trường metadata đã thêm vào bảng 'courses'
-- Thao tác này sẽ loại bỏ dữ liệu về trình độ, yêu cầu và điểm nổi bật của khóa học
ALTER TABLE courses DROP COLUMN level, DROP COLUMN requirements, DROP COLUMN highlights;

-- 2. Xóa trường 'bio' đã thêm vào bảng 'users'
-- Thao tác này sẽ loại bỏ thông tin tiểu sử của giảng viên
ALTER TABLE users DROP COLUMN bio;

