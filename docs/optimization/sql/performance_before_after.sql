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
-- 1. TRUY VAN BAO CAO KET QUA HOC TAP CUA HOC VIEN
-- =====================================================

SELECT
  u.id AS student_id,
  u.full_name,
  c.id AS course_id,
  c.title AS course_title,
  COUNT(DISTINCT qa.id) AS total_attempts,
  ROUND(AVG(qa.score), 2) AS avg_score,
  MAX(qa.end_time) AS latest_attempt
FROM users u
JOIN course_enrollments ce
  ON ce.user_id = u.id
JOIN courses c
  ON c.id = ce.course_id
LEFT JOIN quizzes q
  ON q.course_id = c.id
 AND q.quiz_type = 'chapter'
LEFT JOIN quiz_attempts qa
  ON qa.user_id = u.id
 AND qa.quiz_id = q.id
WHERE u.role = 'student'
  AND c.is_public = 1
GROUP BY u.id, u.full_name, c.id, c.title
HAVING COUNT(DISTINCT qa.id) > 0
ORDER BY avg_score DESC, latest_attempt DESC;

EXPLAIN
SELECT
  u.id AS student_id,
  u.full_name,
  c.id AS course_id,
  c.title AS course_title,
  COUNT(DISTINCT qa.id) AS total_attempts,
  ROUND(AVG(qa.score), 2) AS avg_score,
  MAX(qa.end_time) AS latest_attempt
FROM users u
JOIN course_enrollments ce
  ON ce.user_id = u.id
JOIN courses c
  ON c.id = ce.course_id
LEFT JOIN quizzes q
  ON q.course_id = c.id
 AND q.quiz_type = 'chapter'
LEFT JOIN quiz_attempts qa
  ON qa.user_id = u.id
 AND qa.quiz_id = q.id
WHERE u.role = 'student'
  AND c.is_public = 1
GROUP BY u.id, u.full_name, c.id, c.title
HAVING COUNT(DISTINCT qa.id) > 0
ORDER BY avg_score DESC, latest_attempt DESC;

-- =====================================================
-- 2. TRUY VAN PHAN RA TIEN DO HOC TAP THEO CHUONG
-- =====================================================

SELECT
  u.id AS student_id,
  u.full_name,
  c.id AS course_id,
  c.title AS course_title,
  ch.id AS chapter_id,
  ch.title AS chapter_title,
  ch.order_index,
  COUNT(v.id) AS total_videos,
  COUNT(vc.video_id) AS completed_videos
FROM users u
JOIN course_enrollments ce
  ON ce.user_id = u.id
JOIN courses c
  ON c.id = ce.course_id
JOIN chapters ch
  ON ch.course_id = c.id
LEFT JOIN videos v
  ON v.chapter_id = ch.id
LEFT JOIN video_completion vc
  ON vc.user_id = u.id
 AND vc.video_id = v.id
WHERE u.role = 'student'
  AND c.is_public = 1
GROUP BY
  u.id,
  u.full_name,
  c.id,
  c.title,
  ch.id,
  ch.title,
  ch.order_index
ORDER BY u.id, c.id, ch.order_index;

EXPLAIN
SELECT
  u.id AS student_id,
  u.full_name,
  c.id AS course_id,
  c.title AS course_title,
  ch.id AS chapter_id,
  ch.title AS chapter_title,
  ch.order_index,
  COUNT(v.id) AS total_videos,
  COUNT(vc.video_id) AS completed_videos
FROM users u
JOIN course_enrollments ce
  ON ce.user_id = u.id
JOIN courses c
  ON c.id = ce.course_id
JOIN chapters ch
  ON ch.course_id = c.id
LEFT JOIN videos v
  ON v.chapter_id = ch.id
LEFT JOIN video_completion vc
  ON vc.user_id = u.id
 AND vc.video_id = v.id
WHERE u.role = 'student'
  AND c.is_public = 1
GROUP BY
  u.id,
  u.full_name,
  c.id,
  c.title,
  ch.id,
  ch.title,
  ch.order_index
ORDER BY u.id, c.id, ch.order_index;
