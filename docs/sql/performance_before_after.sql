USE lms;

-- =====================================================
-- 1. TRUY VAN 1 - THONG KE SO HOC VIEN THEO KHOA HOC
-- =====================================================

-- Chay truy van truoc toi uu
SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title
ORDER BY total_students DESC;

-- Xem ke hoach truy van truoc toi uu
EXPLAIN
SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title
ORDER BY total_students DESC;

-- Them index de xuat
CREATE INDEX idx_course_enrollments_course_id ON course_enrollments(course_id);

-- Chay lai truy van sau toi uu
SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title
ORDER BY total_students DESC;

-- Xem ke hoach truy van sau toi uu
EXPLAIN
SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title
ORDER BY total_students DESC;

-- =====================================================
-- 2. TRUY VAN 2 - TIEN DO HOC TAP CUA HOC VIEN
-- =====================================================

-- Chay truy van truoc toi uu
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

-- Xem ke hoach truy van truoc toi uu
EXPLAIN
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

-- Them cac index de xuat
CREATE INDEX idx_videos_course_id ON videos(course_id);
CREATE INDEX idx_video_completion_video_id ON video_completion(video_id);

-- Chay lai truy van sau toi uu
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

-- Xem ke hoach truy van sau toi uu
EXPLAIN
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

-- =====================================================
-- 3. TRUY VẤN 3 - CHI TIẾT KHÓA HỌC TỔNG HỢP (COMPLEX QUERY)
-- =====================================================

-- Truy vấn này lấy toàn bộ thông tin khóa học, rating, và thống kê của giảng viên
-- Đây là truy vấn thực tế dùng cho trang Course Info
SELECT 
    c.*,
    u.full_name as teacher_name,
    u.bio as teacher_bio,
    u.avatar as teacher_avatar,
    COUNT(DISTINCT ce.user_id) as total_students,
    (SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM course_reviews WHERE course_id = c.id) as avg_rating,
    (SELECT COUNT(*) FROM course_reviews WHERE course_id = c.id) as total_reviews,
    (SELECT COUNT(*) FROM courses WHERE teacher_id = c.teacher_id) as teacher_total_courses,
    (SELECT COUNT(DISTINCT user_id) FROM course_enrollments ce_inner JOIN courses c_inner ON ce_inner.course_id = c_inner.id WHERE c_inner.teacher_id = c.teacher_id) as teacher_total_students,
    (SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM course_reviews cr JOIN courses c_inner ON cr.course_id = c_inner.id WHERE c_inner.teacher_id = c.teacher_id) as teacher_avg_rating
FROM courses c
LEFT JOIN users u ON c.teacher_id = u.id
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
WHERE c.id = 101 -- Test với ID cụ thể
GROUP BY c.id, u.full_name, u.bio, u.avatar;

-- Xem kế hoạch truy vấn để đánh giá việc sử dụng Subquery và các Index
EXPLAIN
SELECT 
    c.*,
    u.full_name as teacher_name,
    u.bio as teacher_bio,
    u.avatar as teacher_avatar,
    COUNT(DISTINCT ce.user_id) as total_students,
    (SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM course_reviews WHERE course_id = c.id) as avg_rating,
    (SELECT COUNT(*) FROM course_reviews WHERE course_id = c.id) as total_reviews,
    (SELECT COUNT(*) FROM courses WHERE teacher_id = c.teacher_id) as teacher_total_courses,
    (SELECT COUNT(DISTINCT user_id) FROM course_enrollments ce_inner JOIN courses c_inner ON ce_inner.course_id = c_inner.id WHERE c_inner.teacher_id = c.teacher_id) as teacher_total_students,
    (SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM course_reviews cr JOIN courses c_inner ON cr.course_id = c_inner.id WHERE c_inner.teacher_id = c.teacher_id) as teacher_avg_rating
FROM courses c
LEFT JOIN users u ON c.teacher_id = u.id
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
WHERE c.id = 101
GROUP BY c.id, u.full_name, u.bio, u.avatar;
