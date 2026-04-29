# Phụ Lục - Truy Vấn Mẫu và EXPLAIN

## 1. Thống kê số học viên đăng ký theo khóa học

```sql
SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title
ORDER BY total_students DESC;
```

### EXPLAIN

```sql
EXPLAIN
SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title
ORDER BY total_students DESC;
```

Chú thích gợi ý:

- `Hình 5.1. Kết quả EXPLAIN cho truy vấn thống kê số học viên theo khóa học`

## 2. Tiến độ học tập của học viên theo khóa học

```sql
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
```

### EXPLAIN

```sql
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
```

Chú thích gợi ý:

- `Hình 5.2. Kết quả EXPLAIN cho truy vấn tiến độ học tập của học viên`

## 3. Liệt kê bài kiểm tra và số câu hỏi

```sql
SELECT
  q.id,
  q.title,
  COUNT(qq.id) AS total_questions
FROM quizzes q
LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
GROUP BY q.id, q.title
ORDER BY q.id;
```

### EXPLAIN

```sql
EXPLAIN
SELECT
  q.id,
  q.title,
  COUNT(qq.id) AS total_questions
FROM quizzes q
LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
GROUP BY q.id, q.title
ORDER BY q.id;
```

Chú thích gợi ý:

- `Hình 5.3. Kết quả EXPLAIN cho truy vấn thống kê số câu hỏi theo bài kiểm tra`

## 4. Tìm lớp học theo mã lớp

```sql
SELECT *
FROM classes
WHERE class_code = 'ABC123';
```

### EXPLAIN

```sql
EXPLAIN
SELECT *
FROM classes
WHERE class_code = 'ABC123';
```

Chú thích gợi ý:

- `Hình 5.4. Kết quả EXPLAIN cho truy vấn tìm lớp học theo mã lớp`
