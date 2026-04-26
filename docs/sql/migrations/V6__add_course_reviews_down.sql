-- Migration Down: Add course reviews table
-- Description: Hoàn tác các thay đổi của bản migration V6 (Rollback) - Xóa bảng đánh giá khóa học

-- 1. Xóa bảng 'course_reviews'
-- Thao tác này sẽ loại bỏ hoàn toàn dữ liệu về đánh giá và nhận xét của học viên
DROP TABLE IF EXISTS course_reviews;
