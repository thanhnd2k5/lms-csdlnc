USE lms;

EXPLAIN
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
  q.id,
  q.title,
  COUNT(qq.id) AS total_questions
FROM quizzes q
LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
GROUP BY q.id, q.title
ORDER BY q.id;

EXPLAIN
SELECT *
FROM classes
WHERE class_code = 'CSDL17';

EXPLAIN
SELECT 
    c.*,
    u.full_name as teacher_name,
    (SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM course_reviews WHERE course_id = c.id) as avg_rating,
    (SELECT COUNT(*) FROM course_reviews WHERE course_id = c.id) as total_reviews
FROM courses c
LEFT JOIN users u ON c.teacher_id = u.id
WHERE c.id = 101
GROUP BY c.id, u.full_name;
