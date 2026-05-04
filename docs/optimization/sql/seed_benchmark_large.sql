-- =================================================================
-- SEED BENCHMARK QUY MO LON
-- Dung cho ca schema BEFORE va AFTER.
-- Hay chay "USE <ten_database>;" truoc khi chay file nay.
-- =================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET UNIQUE_CHECKS = 0;
SET autocommit = 0;
SET SESSION cte_max_recursion_depth = 1000000;

-- =================================================================
-- BUOC 1: USERS (5.050 rows)
-- 1..50 la teacher, 51..5050 la student
-- =================================================================
DROP PROCEDURE IF EXISTS sp_seed_users;
DELIMITER $$
CREATE PROCEDURE sp_seed_users()
BEGIN
  DECLARE i INT DEFAULT 1;

  WHILE i <= 5050 DO
    INSERT INTO users (
      id,
      username,
      email,
      password,
      full_name,
      role,
      email_verified,
      created_at
    )
    VALUES (
      i,
      CONCAT('user', i),
      CONCAT('user', i, '@lms.vn'),
      MD5('pass'),
      CONCAT(
        ELT(MOD(i, 20) + 1, 'Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Huynh', 'Phan', 'Vu', 'Vo', 'Dang', 'Bui', 'Do', 'Ho', 'Ngo', 'Duong', 'Ly', 'Trinh', 'Dinh', 'Mai', 'Tong'),
        ' ',
        ELT(MOD(i + 13, 20) + 1, 'An', 'Binh', 'Chi', 'Dung', 'Ha', 'Hung', 'Khanh', 'Lan', 'Minh', 'Nam', 'Phuc', 'Quan', 'Son', 'Tam', 'Uyen', 'Van', 'Xuan', 'Yen', 'Bao', 'Linh')
      ),
      IF(i <= 50, 'teacher', 'student'),
      1,
      DATE_ADD('2023-01-01', INTERVAL MOD(i, 700) DAY)
    );
    SET i = i + 1;
  END WHILE;

  COMMIT;
END$$
DELIMITER ;
CALL sp_seed_users();
DROP PROCEDURE IF EXISTS sp_seed_users;

-- =================================================================
-- BUOC 2: COURSES (1.000 rows)
-- =================================================================
INSERT INTO courses (id, title, is_public, teacher_id, level, created_at)
WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 1000
)
SELECT
  n,
  CONCAT('Khoa hoc ', n),
  IF(MOD(n, 10) < 7, 1, 0),
  MOD(n - 1, 50) + 1,
  ELT(MOD(n, 4) + 1, 'Beginner', 'Intermediate', 'Advanced', 'All Levels'),
  DATE_ADD('2023-01-01', INTERVAL MOD(n, 365) DAY)
FROM seq;

-- =================================================================
-- BUOC 3: CHAPTERS (~5.000 rows)
-- Moi khoa hoc co 4-6 chuong
-- =================================================================
INSERT INTO chapters (course_id, title, order_index, created_at)
SELECT
  c.id,
  CONCAT('Chuong ', nums.n, ' - Khoa hoc ', c.id),
  nums.n,
  DATE_ADD('2023-02-01', INTERVAL MOD(c.id + nums.n, 180) DAY)
FROM courses c
JOIN (
  SELECT 1 AS n
  UNION ALL SELECT 2
  UNION ALL SELECT 3
  UNION ALL SELECT 4
  UNION ALL SELECT 5
  UNION ALL SELECT 6
) nums
  ON nums.n <= (MOD(c.id, 3) + 4);

-- =================================================================
-- BUOC 4: VIDEOS (~17k rows)
-- Moi chuong co 3-4 video
-- =================================================================
INSERT INTO videos (title, course_id, chapter_id, video_url, created_at)
SELECT
  CONCAT('Video ', vnums.v, ' - Chuong ', ch.id),
  ch.course_id,
  ch.id,
  CONCAT('http://cdn.local/video/', ch.id, '/', vnums.v, '.mp4'),
  DATE_ADD('2023-03-01', INTERVAL MOD(ch.id + vnums.v, 180) DAY)
FROM chapters ch
JOIN (
  SELECT 1 AS v
  UNION ALL SELECT 2
  UNION ALL SELECT 3
  UNION ALL SELECT 4
) vnums
  ON vnums.v <= (MOD(ch.id, 2) + 3);
COMMIT;

-- =================================================================
-- BUOC 5: QUIZZES (~5.000 rows)
-- Quan trong: quiz_type = 'chapter' va chapter_id phai hop le
-- de benchmark khong bi 0 rows.
-- =================================================================
INSERT INTO quizzes (
  title,
  course_id,
  chapter_id,
  video_id,
  duration_minutes,
  passing_score,
  quiz_type,
  teacher_id,
  created_at
)
SELECT
  CONCAT('Quiz chuong ', ch.id),
  ch.course_id,
  ch.id,
  NULL,
  15,
  60,
  'chapter',
  c.teacher_id,
  DATE_ADD('2023-04-01', INTERVAL MOD(ch.id, 180) DAY)
FROM chapters ch
JOIN courses c ON c.id = ch.course_id;

-- =================================================================
-- BUOC 6: QUESTIONS, OPTIONS
-- Moi quiz co 3 cau hoi, moi cau hoi co 4 lua chon
-- =================================================================
INSERT INTO quiz_questions (quiz_id, question_text, points, allows_multiple_correct)
SELECT
  q.id,
  CONCAT('Cau hoi ', nums.n, ' cua quiz ', q.id),
  1,
  0
FROM quizzes q
JOIN (
  SELECT 1 AS n
  UNION ALL SELECT 2
  UNION ALL SELECT 3
) nums;

INSERT INTO quiz_options (question_id, option_text, is_correct)
SELECT
  qq.id,
  CONCAT('Dap an ', nums.n, ' cua cau hoi ', qq.id),
  IF(nums.n = 1, 1, 0)
FROM quiz_questions qq
JOIN (
  SELECT 1 AS n
  UNION ALL SELECT 2
  UNION ALL SELECT 3
  UNION ALL SELECT 4
) nums;
COMMIT;

-- =================================================================
-- BUOC 7: ENROLLMENTS (~60.000 rows)
-- =================================================================
INSERT IGNORE INTO course_enrollments (user_id, course_id, enrolled_at)
SELECT
  u.id,
  c.id,
  DATE_ADD('2023-05-01', INTERVAL MOD(u.id + c.id, 300) DAY)
FROM users u
JOIN courses c
WHERE u.role = 'student'
  AND MOD(u.id + c.id, 83) = 0
LIMIT 60000;
COMMIT;

-- =================================================================
-- BUOC 8: VIDEO COMPLETION (~80.000 rows)
-- =================================================================
INSERT IGNORE INTO video_completion (user_id, video_id, is_completed, completed_at)
SELECT
  ce.user_id,
  v.id,
  1,
  DATE_ADD('2023-06-01', INTERVAL MOD(ce.user_id + v.id, 300) DAY)
FROM course_enrollments ce
JOIN videos v
  ON v.course_id = ce.course_id
WHERE MOD(ce.user_id + v.id, 3) <> 0
LIMIT 80000;
COMMIT;

-- =================================================================
-- BUOC 9: ATTEMPTS (~100.000 rows)
-- Quan trong: attempts duoc tao dua tren enrollment + quiz cung khoa hoc
-- de cac truy van benchmark chac chan co du lieu khop.
-- =================================================================
INSERT INTO quiz_attempts (user_id, quiz_id, score, status, end_time)
SELECT
  ce.user_id,
  q.id,
  20 + MOD(ce.user_id + q.id, 81),
  IF(20 + MOD(ce.user_id + q.id, 81) >= 60, 'completed', 'failed'),
  DATE_ADD('2023-07-01', INTERVAL MOD(ce.user_id + q.id, 300) DAY)
FROM course_enrollments ce
JOIN quizzes q
  ON q.course_id = ce.course_id
 AND q.quiz_type = 'chapter'
WHERE MOD(ce.user_id + q.id, 4) = 0
LIMIT 100000;

-- =================================================================
-- BUOC 10: ANSWERS (~200.000 rows)
-- =================================================================
INSERT INTO quiz_answers (attempt_id, question_id, selected_option_id, created_at)
SELECT
  a.id,
  qq.id,
  (
    SELECT qo.id
    FROM quiz_options qo
    WHERE qo.question_id = qq.id
      AND qo.is_correct = IF(a.score >= 60, 1, 0)
    ORDER BY qo.id
    LIMIT 1
  ),
  DATE_ADD('2023-08-01', INTERVAL MOD(a.id + qq.id, 300) DAY)
FROM quiz_attempts a
JOIN quiz_questions qq
  ON qq.quiz_id = a.quiz_id
LIMIT 200000;
COMMIT;

-- =================================================================
-- BUOC 11: CLASSES (200 rows)
-- =================================================================
INSERT INTO classes (id, name, teacher_id, class_code, status, created_at)
WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 200
)
SELECT
  n,
  CONCAT('Lop ', n),
  MOD(n - 1, 50) + 1,
  CONCAT('CLS', LPAD(n, 5, '0')),
  'active',
  DATE_ADD('2023-09-01', INTERVAL MOD(n, 180) DAY)
FROM seq;

-- =================================================================
-- BUOC 12: CLASS_COURSES
-- =================================================================
INSERT IGNORE INTO class_courses (class_id, course_id, requires_approval, added_at)
SELECT
  c.id,
  MOD(c.id * 7, 1000) + 1,
  IF(MOD(c.id, 3) = 0, 1, 0),
  DATE_ADD('2023-10-01', INTERVAL MOD(c.id, 180) DAY)
FROM classes c;

-- =================================================================
-- BUOC 13: CLASS_STUDENTS (~8.000 rows)
-- =================================================================
INSERT IGNORE INTO class_students (class_id, student_id, status, joined_at)
SELECT
  c.id,
  u.id,
  'active',
  DATE_ADD('2023-11-01', INTERVAL MOD(c.id + u.id, 180) DAY)
FROM classes c
JOIN users u
WHERE u.role = 'student'
  AND MOD(c.id + u.id, 47) = 0
LIMIT 8000;
COMMIT;

-- =================================================================
-- BUOC 14: APPROVALS (~10.000 rows)
-- =================================================================
INSERT IGNORE INTO class_students_courses_approval (
  class_id,
  student_id,
  course_id,
  status,
  updated_at
)
SELECT
  cs.class_id,
  cs.student_id,
  cc.course_id,
  'approved',
  DATE_ADD('2023-12-01', INTERVAL MOD(cs.class_id + cs.student_id + cc.course_id, 180) DAY)
FROM class_students cs
JOIN class_courses cc
  ON cc.class_id = cs.class_id
LIMIT 10000;
COMMIT;

-- =================================================================
-- BUOC 15: DOCUMENTS (3.000 rows)
-- =================================================================
INSERT INTO documents (title, file_path, file_type, course_id, teacher_id, uploaded_at)
WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < 3000
)
SELECT
  CONCAT('Tai lieu ', n),
  CONCAT('/doc_', n, '.pdf'),
  'pdf',
  MOD(n - 1, 1000) + 1,
  MOD(n - 1, 50) + 1,
  DATE_ADD('2024-01-01', INTERVAL MOD(n, 180) DAY)
FROM seq;
COMMIT;

-- =================================================================
-- BUOC 16: REVIEWS (~10.000 rows)
-- Sửa 2 lỗi của bản cũ:
-- 1. rating khong the deu bang 5
-- 2. course_id khong nen chi quanh 1..10
-- =================================================================
INSERT IGNORE INTO course_reviews (course_id, user_id, rating, comment, created_at)
SELECT
  ce.course_id,
  ce.user_id,
  1 + MOD(ce.user_id + ce.course_id, 5),
  CONCAT('Danh gia cho khoa hoc ', ce.course_id, ' boi hoc vien ', ce.user_id),
  DATE_ADD('2024-02-01', INTERVAL MOD(ce.user_id + ce.course_id, 180) DAY)
FROM course_enrollments ce
WHERE MOD(ce.user_id + ce.course_id, 6) = 0
LIMIT 10000;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
SET UNIQUE_CHECKS = 1;
SET autocommit = 1;

SELECT 'SUCCESS: Seed benchmark quy mo lon da hoan tat.' AS Status;
