# Phụ Lục - Truy Vấn Mẫu và EXPLAIN

## 1. Báo cáo kết quả học tập của học viên theo khóa học công khai

```sql
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
```

### EXPLAIN

```sql
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
```

Chú thích gợi ý:

- `Hình 5.1. Kết quả EXPLAIN cho truy vấn báo cáo kết quả học tập của học viên`
- Truy vấn này cố ý kết hợp nhiều điều kiện và phép nối để tận dụng các chỉ mục chỉ có ở cấu hình `after` như `idx_user_role`, `idx_course_public`, `idx_quiz_type`, `idx_attempt_user_quiz`.

## 2. Phân rã tiến độ học tập của học viên theo từng chương

```sql
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
```

### EXPLAIN

```sql
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
```

Chú thích gợi ý:

- `Hình 5.2. Kết quả EXPLAIN cho truy vấn phân rã tiến độ học tập theo chương`
- Truy vấn này phù hợp để so sánh `before/after` vì cấu hình `after` có thể tận dụng `idx_user_role`, `idx_course_public`, `idx_chapter_order (course_id, order_index)` trong khi cấu hình `before` không có các chỉ mục tối ưu tương ứng.

## 3. Truy vấn bổ sung để chụp rõ tác dụng của chỉ mục trên đánh giá

```sql
SELECT
  course_id,
  rating,
  COUNT(*) AS total_reviews
FROM course_reviews
WHERE course_id = 101
GROUP BY course_id, rating
ORDER BY rating;
```

### EXPLAIN

```sql
EXPLAIN
SELECT
  course_id,
  rating,
  COUNT(*) AS total_reviews
FROM course_reviews
WHERE course_id = 101
GROUP BY course_id, rating
ORDER BY rating;
```

Chú thích gợi ý:

- `Hình 5.3. Kết quả EXPLAIN cho truy vấn phân bố đánh giá theo mức sao`
- Đây là truy vấn bổ sung có cấu trúc gọn hơn, rất phù hợp để chụp riêng tác dụng của `idx_course_rating (course_id, rating)`.

## 4. Ghi chú lựa chọn truy vấn benchmark

- Không nên dùng truy vấn `WHERE class_code = ...` làm ví dụ benchmark chính, vì cột `class_code` đã có ràng buộc `UNIQUE` ngay cả trong cấu hình `before`, nên rất khó thể hiện rõ tác động của chỉ mục bổ sung.
- Cũng không nên ưu tiên truy vấn tiến độ học tập cũ với `COUNT(DISTINCT ...)` làm ví dụ benchmark chính, vì chi phí của truy vấn tập trung nhiều ở bước `GROUP BY`, `tmp table`, `filesort`, nên khác biệt về chỉ mục dễ bị che khuất trên tập dữ liệu nhỏ.
- Nếu muốn tạo khác biệt rõ ràng về thời gian, cần tăng quy mô dữ liệu thử nghiệm. Với bộ seed hiện tại chỉ có vài dòng ở các bảng giao dịch, truy vấn sẽ đúng về logic nhưng chênh lệch thời gian chưa đủ lớn để “đẹp” trong báo cáo.
