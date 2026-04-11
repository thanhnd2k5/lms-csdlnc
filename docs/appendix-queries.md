# Phu Luc - Truy Van Mau va EXPLAIN

## 1. Thong ke so hoc vien dang ky theo khoa hoc

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

Caption goi y:

- `Hinh 5.1. Ket qua EXPLAIN cho truy van thong ke so hoc vien theo khoa hoc`

## 2. Tien do hoc tap cua hoc vien theo khoa hoc

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

Caption goi y:

- `Hinh 5.2. Ket qua EXPLAIN cho truy van tien do hoc tap cua hoc vien`

## 3. Liet ke quiz va so cau hoi

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

Caption goi y:

- `Hinh 5.3. Ket qua EXPLAIN cho truy van thong ke so cau hoi theo quiz`

## 4. Tim lop hoc theo ma lop

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

Caption goi y:

- `Hinh 5.4. Ket qua EXPLAIN cho truy van tim lop hoc theo ma lop`
