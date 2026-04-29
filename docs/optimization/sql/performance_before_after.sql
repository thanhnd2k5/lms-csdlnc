USE lms;

-- =====================================================
-- SCRIPT TRUY VAN BENCHMARK DUNG CHUNG CHO BEFORE/AFTER
-- =====================================================
--
-- Cach dung:
-- 1. Import docs/optimization/sql/schema_benchmark_before.sql, nap seed, chay script nay va chup ket qua
-- 2. Import backend/lms.sql, nap lai cung bo seed, chay lai script nay va chup ket qua
--
-- Luu y:
-- Script nay KHONG tu tao them index.
-- Phan so sanh before/after duoc thuc hien bang hai cau hinh schema khac nhau.

-- =====================================================
-- 1. TRUY VAN THONG KE SO HOC VIEN THEO KHOA HOC
-- =====================================================

SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title
ORDER BY total_students DESC;

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
-- 2. TRUY VAN TIEN DO HOC TAP CUA HOC VIEN
-- =====================================================

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
