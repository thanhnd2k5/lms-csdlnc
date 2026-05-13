# Phụ lục

Phần phụ lục trình bày các tài liệu kỹ thuật cần thiết để đối chiếu với nội dung chính của báo cáo. Do báo cáo được in, phụ lục được viết theo hướng tự chứa: có đủ bảng tóm tắt, trích đoạn SQL và lệnh kiểm thử tiêu biểu để hiểu cách triển khai, nhưng không in toàn bộ dữ liệu mẫu, toàn bộ migration `down` hoặc raw binary log vì các phần này dài và ít giá trị đọc.

## Phụ lục A. Schema SQL hoàn chỉnh

Phụ lục này tóm tắt schema SQL ở trạng thái triển khai cuối cùng của hệ thống LMS. Nội dung tập trung vào danh sách bảng, thuộc tính chính, khóa ngoại, ràng buộc duy nhất và các chỉ mục phục vụ truy vấn.

### A.1. Lệnh khởi tạo

```sql
CREATE DATABASE lms CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

```powershell
mysql -u root -p lms < backend/lms.sql
mysql -u root -p lms < docs/sql/seed.sql
```

### A.2. Nhóm bảng chính trong schema

| Nhóm dữ liệu | Bảng tiêu biểu | Vai trò |
| --- | --- | --- |
| Người dùng và phân quyền | `users` | Lưu tài khoản, vai trò, thông tin hồ sơ và tiểu sử giảng viên. |
| Nội dung khóa học | `courses`, `chapters`, `videos`, `documents` | Lưu khóa học, chương học, video và tài liệu học tập. |
| Kiểm tra đánh giá | `quizzes`, `quiz_questions`, `quiz_options`, `quiz_attempts`, `quiz_answers` | Lưu cấu trúc bài kiểm tra, câu hỏi, phương án trả lời và lịch sử làm bài. |
| Tiến độ học tập | `course_enrollments`, `video_completion` | Theo dõi ghi danh khóa học và trạng thái hoàn thành video. |
| Lớp học | `classes`, `class_courses`, `class_students`, `class_students_courses_approval` | Quản lý lớp học, gán khóa học cho lớp và trạng thái tham gia của học viên. |
| Phản hồi khóa học | `course_reviews` | Lưu đánh giá, nhận xét và hỗ trợ thống kê điểm đánh giá khóa học. |

### A.3. Danh sách bảng và thuộc tính chính

| Bảng | Thuộc tính chính | Quan hệ/ràng buộc đáng chú ý |
| --- | --- | --- |
| `users` | `id`, `username`, `email`, `password`, `full_name`, `role`, `bio` | `username UNIQUE`, `email UNIQUE`, `idx_user_role(role)` |
| `courses` | `id`, `title`, `description`, `is_public`, `teacher_id`, `level`, `requirements`, `highlights` | `teacher_id` tham chiếu `users(id)`, `idx_course_public(is_public)` |
| `chapters` | `id`, `course_id`, `title`, `order_index` | `course_id` tham chiếu `courses(id)`, `idx_chapter_order(course_id, order_index)` |
| `videos` | `id`, `course_id`, `chapter_id`, `title`, `video_url` | `course_id` tham chiếu `courses(id)`, `chapter_id` tham chiếu `chapters(id)`, `idx_video_chapter(chapter_id)` |
| `documents` | `id`, `title`, `file_path`, `file_type`, `course_id`, `chapter_id`, `video_id`, `teacher_id` | Liên kết tài liệu với khóa học, chương, video và giảng viên |
| `quizzes` | `id`, `title`, `course_id`, `chapter_id`, `video_id`, `quiz_type`, `teacher_id` | Liên kết bài kiểm tra với khóa học/chương/video, `idx_quiz_type(quiz_type)` |
| `quiz_questions` | `id`, `quiz_id`, `question_text`, `points`, `allows_multiple_correct` | `quiz_id` tham chiếu `quizzes(id)` |
| `quiz_options` | `id`, `question_id`, `option_text`, `is_correct` | `question_id` tham chiếu `quiz_questions(id)` |
| `quiz_attempts` | `id`, `user_id`, `quiz_id`, `score`, `status`, `end_time` | `user_id` tham chiếu `users(id)`, `quiz_id` tham chiếu `quizzes(id)`, `idx_attempt_user_quiz(user_id, quiz_id)` |
| `quiz_answers` | `id`, `attempt_id`, `question_id`, `selected_option_id` | Liên kết lượt làm bài, câu hỏi và phương án đã chọn |
| `course_enrollments` | `id`, `user_id`, `course_id`, `enrolled_at` | `UNIQUE(user_id, course_id)` để tránh ghi danh trùng |
| `video_completion` | `id`, `user_id`, `video_id`, `is_completed`, `completed_at` | `UNIQUE(user_id, video_id)` để tránh ghi nhận trùng tiến độ |
| `classes` | `id`, `name`, `teacher_id`, `class_code`, `status`, `max_students` | `class_code UNIQUE`, `idx_class_code(class_code)` |
| `class_courses` | `class_id`, `course_id`, `requires_approval`, `added_at` | Khóa chính ghép `(class_id, course_id)` |
| `class_students` | `class_id`, `student_id`, `status`, `joined_at` | Khóa chính ghép `(class_id, student_id)` |
| `class_students_courses_approval` | `class_id`, `student_id`, `course_id`, `status`, `updated_at` | Khóa chính ghép `(class_id, student_id, course_id)` |
| `course_reviews` | `id`, `course_id`, `user_id`, `rating`, `comment`, `created_at` | `UNIQUE(user_id, course_id)`, `idx_course_rating(course_id, rating)` |

### A.4. Một số ràng buộc và chỉ mục tiêu biểu

```sql
CREATE TABLE IF NOT EXISTS courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT DEFAULT NULL,
  thumbnail VARCHAR(255) DEFAULT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  teacher_id INT,
  level ENUM('Beginner', 'Intermediate', 'Advanced', 'All Levels') DEFAULT 'All Levels',
  requirements TEXT DEFAULT NULL,
  highlights TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_course_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```sql
CREATE TABLE IF NOT EXISTS course_enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_enrollment (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```sql
CREATE TABLE IF NOT EXISTS course_reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  user_id INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_course_review (user_id, course_id),
  INDEX idx_course_rating (course_id, rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

Các đoạn trên được chọn vì thể hiện ba nhóm kỹ thuật quan trọng của schema: khóa ngoại, ràng buộc duy nhất và chỉ mục phục vụ tối ưu truy vấn. Bảng danh sách ở mục A.3 giúp người đọc nắm được toàn bộ cấu trúc mà không cần tra cứu tài liệu ngoài.

## Phụ lục B. Dữ liệu mẫu khởi tạo

Phần này tóm tắt bộ dữ liệu mẫu dùng để kiểm thử quan hệ dữ liệu và các truy vấn minh họa. Phụ lục chỉ trình bày vai trò và một số dòng đại diện, vì in toàn bộ `INSERT` sẽ làm phụ lục dài nhưng không bổ sung nhiều giá trị phân tích.

| Nhóm dữ liệu mẫu | Bảng liên quan | Mục đích |
| --- | --- | --- |
| Tài khoản | `users` | Tạo tài khoản admin, giảng viên và học viên để kiểm thử phân quyền. |
| Nội dung học tập | `courses`, `chapters`, `videos`, `documents` | Tạo khóa học, chương học, video và tài liệu để kiểm tra quan hệ dữ liệu. |
| Kiểm tra đánh giá | `quizzes`, `quiz_questions`, `quiz_options`, `quiz_attempts`, `quiz_answers` | Tạo dữ liệu cho truy vấn điểm số, lịch sử làm bài và phân tích kết quả học tập. |
| Lớp học | `classes`, `class_courses`, `class_students`, `class_students_courses_approval` | Tạo dữ liệu lớp học, gán khóa học và trạng thái tham gia. |
| Phản hồi | `course_reviews` | Tạo dữ liệu đánh giá khóa học để kiểm tra thống kê rating. |

Ví dụ dữ liệu mẫu:

```sql
INSERT INTO `users`
  (`id`, `username`, `email`, `password`, `full_name`, `role`, `email_verified`, `bio`)
VALUES
  (11, 'gv_quang', 'quang.gv@ptit.edu.vn', '...', 'Trần Văn Quang', 'teacher', 1,
   'Chuyên gia lập trình Frontend với hơn 10 năm kinh nghiệm.'),
  (21, 'sv_nam', 'nam.sv@gmail.com', '...', 'Nguyễn Văn Nam', 'student', 1, NULL);
```

```sql
INSERT INTO `course_enrollments` (`user_id`, `course_id`)
VALUES (21, 101), (22, 101), (23, 102), (21, 103);
```

```sql
INSERT INTO `course_reviews` (`course_id`, `user_id`, `rating`, `comment`)
VALUES
  (101, 21, 5, 'Khóa học dễ hiểu'),
  (102, 23, 5, 'Giảng viên nhiệt tình');
```

## Phụ lục C. Bộ migration theo phiên bản

Bộ migration dùng để mô phỏng quá trình schema được mở rộng theo từng giai đoạn nghiệp vụ. Để báo cáo không bị tách vụn, phần phụ lục trình bày theo bốn giai đoạn chính thay vì in toàn bộ nội dung từng migration `up` và `down`.

| Giai đoạn | Nội dung chính | Tác động đến schema |
| --- | --- | --- |
| `V1` | Khởi tạo lõi hệ thống | Tạo `users`, `courses`, `chapters`, `videos`. |
| `V2` | Bổ sung kiểm tra đánh giá | Tạo `quizzes`, `quiz_questions`, `quiz_options`, `quiz_attempts`, `quiz_answers`. |
| `V3` | Bổ sung ghi danh, tiến độ và tài liệu | Tạo `course_enrollments`, `video_completion`, `documents`. |
| `V4` | Bổ sung quản lý lớp học và phản hồi khóa học | Tạo `classes`, `class_courses`, `class_students`, `class_students_courses_approval`, `course_reviews`. |

Ví dụ migration tiêu biểu:

```sql
CREATE TABLE IF NOT EXISTS quizzes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  course_id INT,
  chapter_id INT,
  video_id INT,
  duration_minutes INT DEFAULT 30,
  passing_score INT DEFAULT 60,
  quiz_type ENUM('video', 'chapter', 'course') DEFAULT 'video',
  teacher_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE SET NULL,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE SET NULL,
  FOREIGN KEY (teacher_id) REFERENCES users(id),
  INDEX idx_quiz_type (quiz_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

Mỗi migration đều có chiều `down` tương ứng để thể hiện khả năng hoàn tác khi cần quay lui schema. Trong báo cáo in, chỉ cần trình bày nguyên tắc này và một migration tiêu biểu; không cần in toàn bộ lệnh `DROP TABLE` vì phần đó chủ yếu là thao tác kỹ thuật lặp lại.

## Phụ lục D. Danh sách chỉ mục

| Bảng | Tên chỉ mục | Cột | Mục đích |
| --- | --- | --- | --- |
| `users` | `idx_user_role` | `role` | Lọc người dùng theo vai trò. |
| `courses` | `idx_course_public` | `is_public` | Lọc khóa học công khai. |
| `chapters` | `idx_chapter_order` | `course_id`, `order_index` | Lấy chương theo khóa học và đúng thứ tự. |
| `videos` | `idx_video_chapter` | `chapter_id` | Lấy video theo chương. |
| `quizzes` | `idx_quiz_type` | `quiz_type` | Lọc bài kiểm tra theo phạm vi. |
| `quiz_attempts` | `idx_attempt_user_quiz` | `user_id`, `quiz_id` | Tra cứu kết quả làm bài theo học viên và bài kiểm tra. |
| `classes` | `idx_class_code` | `class_code` | Tìm lớp học theo mã lớp. |
| `course_reviews` | `idx_course_rating` | `course_id`, `rating` | Thống kê đánh giá theo khóa học. |

## Phụ lục E. Truy vấn benchmark và EXPLAIN

Phần chính của Chương 5 đã phân tích kết quả before/after bằng query cost và kế hoạch thực thi. Phụ lục này chỉ giữ lại truy vấn gốc để người đọc có thể đối chiếu.

### E.1. Báo cáo kết quả học tập của học viên

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
JOIN course_enrollments ce ON ce.user_id = u.id
JOIN courses c ON c.id = ce.course_id
LEFT JOIN quizzes q ON q.course_id = c.id AND q.quiz_type = 'chapter'
LEFT JOIN quiz_attempts qa ON qa.user_id = u.id AND qa.quiz_id = q.id
WHERE u.role = 'student'
  AND c.is_public = 1
GROUP BY u.id, u.full_name, c.id, c.title
HAVING COUNT(DISTINCT qa.id) > 0
ORDER BY avg_score DESC, latest_attempt DESC;
```

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
JOIN course_enrollments ce ON ce.user_id = u.id
JOIN courses c ON c.id = ce.course_id
LEFT JOIN quizzes q ON q.course_id = c.id AND q.quiz_type = 'chapter'
LEFT JOIN quiz_attempts qa ON qa.user_id = u.id AND qa.quiz_id = q.id
WHERE u.role = 'student'
  AND c.is_public = 1
GROUP BY u.id, u.full_name, c.id, c.title
HAVING COUNT(DISTINCT qa.id) > 0
ORDER BY avg_score DESC, latest_attempt DESC;
```

### E.2. Phân rã tiến độ học tập theo chương

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
JOIN course_enrollments ce ON ce.user_id = u.id
JOIN courses c ON c.id = ce.course_id
JOIN chapters ch ON ch.course_id = c.id
LEFT JOIN videos v ON v.chapter_id = ch.id
LEFT JOIN video_completion vc ON vc.user_id = u.id AND vc.video_id = v.id
WHERE u.role = 'student'
  AND c.is_public = 1
GROUP BY
  u.id, u.full_name,
  c.id, c.title,
  ch.id, ch.title, ch.order_index
ORDER BY u.id, c.id, ch.order_index;
```

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
JOIN course_enrollments ce ON ce.user_id = u.id
JOIN courses c ON c.id = ce.course_id
JOIN chapters ch ON ch.course_id = c.id
LEFT JOIN videos v ON v.chapter_id = ch.id
LEFT JOIN video_completion vc ON vc.user_id = u.id AND vc.video_id = v.id
WHERE u.role = 'student'
  AND c.is_public = 1
GROUP BY
  u.id, u.full_name,
  c.id, c.title,
  ch.id, ch.title, ch.order_index
ORDER BY u.id, c.id, ch.order_index;
```

## Phụ lục F. Lệnh sao lưu và phục hồi

### F.1. Lệnh sao lưu dữ liệu

```powershell
mysqldump -u root -p --single-transaction --routines --triggers --result-file=lms_backup_2026_05_05.sql lms
```

### F.2. Lệnh phục hồi từ bản sao lưu đầy đủ

```powershell
mysql -u root -p lms_restore < lms_backup_2026_05_05.sql
```

### F.3. Lệnh áp dụng thay đổi từ binary log

```powershell
mysqlbinlog --read-from-remote-server --host=127.0.0.1 --user=root --password --start-position=157 --stop-position=639 --rewrite-db="lms->lms_restore" THANH-bin.000005 | mysql --binary-mode -u root -p lms_restore
```

Raw binary log không đưa toàn bộ vào phụ lục vì chứa nhiều nội dung mã hóa khó đọc. Báo cáo chỉ cần giữ lệnh replay và kết quả kiểm tra sau phục hồi để chứng minh quy trình có thể thực hiện.

## Phụ lục G. Minh chứng replication và failover

### G.1. Cấu hình Docker Compose chính

```yaml
services:
  mysql-primary:
    image: mysql:8.0
    container_name: lms-mysql-primary
    command:
      - --server-id=1
      - --log-bin=mysql-bin
      - --binlog-format=ROW
      - --gtid-mode=ON
      - --enforce-gtid-consistency=ON
      - --bind-address=0.0.0.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: lms
    ports:
      - "3307:3306"

  mysql-replica:
    image: mysql:8.0
    container_name: lms-mysql-replica
    command:
      - --server-id=2
      - --log-bin=mysql-bin
      - --relay-log=mysql-relay-bin
      - --gtid-mode=ON
      - --enforce-gtid-consistency=ON
      - --bind-address=0.0.0.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: lms
    ports:
      - "3308:3306"
```

### G.2. Script khởi tạo replica

```powershell
$sql = @"
STOP REPLICA;
RESET REPLICA ALL;
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='mysql-primary',
  SOURCE_PORT=3306,
  SOURCE_USER='repl',
  SOURCE_PASSWORD='replpass',
  SOURCE_AUTO_POSITION=1,
  GET_SOURCE_PUBLIC_KEY=1;
START REPLICA;
SET GLOBAL read_only = ON;
SET GLOBAL super_read_only = ON;
SHOW REPLICA STATUS\G
"@

docker exec -i lms-mysql-replica mysql -uroot -proot -e $sql
```

### G.3. Trích đoạn tách truy vấn đọc/ghi trong backend

```javascript
function getSqlType(sql) {
  if (!sql || typeof sql !== "string") {
    return "write";
  }

  const withoutBlockComments = sql.trim().replace(/\/\*[\s\S]*?\*\//g, "").trim();
  const firstWord = withoutBlockComments.split(/\s+/)[0]?.toUpperCase() || "";

  if (["SELECT", "SHOW", "DESCRIBE", "EXPLAIN"].includes(firstWord)) {
    return "read";
  }

  return "write";
}
```

### G.4. Trích đoạn automatic failover

```javascript
if (this.failureCount >= this.failureThreshold) {
  await this.promoteReplica();
}

const promoteResult = await runAdminSql({
  host: topology.standby.host,
  port: topology.standby.port,
  user: topology.admin.user,
  password: topology.admin.password,
  useSsl: topology.admin.useSsl,
  statements: `
    STOP REPLICA;
    RESET REPLICA ALL;
    SET GLOBAL read_only = OFF;
    SET GLOBAL super_read_only = OFF;
  `,
});
```

### G.5. Lệnh kiểm thử tiêu biểu

```powershell
cd D:\lms-csdlnc\infra\mysql-replication
docker compose up -d
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\infra\mysql-replication\scripts\init-replica.ps1
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\infra\mysql-replication\scripts\show-status.ps1
```

```powershell
docker exec -it lms-mysql-primary mysql -uroot -proot lms -e "INSERT INTO courses (title, description, is_public, level) VALUES ('Replication Demo', 'Test dong bo du lieu', 1, 'Beginner');"
docker exec -it lms-mysql-replica mysql -uroot -proot lms -e "SELECT id, title, level, is_public, created_at FROM courses WHERE title = 'Replication Demo';"
docker stop lms-mysql-primary
docker start lms-mysql-primary
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\infra\mysql-replication\scripts\rejoin-old-primary.ps1
```

| Nội dung đối chiếu | Giá trị/kết quả |
| --- | --- |
| Container | `lms-mysql-primary`, `lms-mysql-replica` đang chạy |
| Trạng thái replication | `Replica_IO_Running: Yes`, `Replica_SQL_Running: Yes` |
| Kiểm thử đồng bộ | Dữ liệu ghi ở primary đọc được ở replica |
| Kiểm thử read-only | Replica từ chối ghi trực tiếp khi đang ở vai trò đọc |
| Kiểm thử failover | Khi primary dừng, replica được promote để tiếp tục ghi |
| Kiểm thử rejoin | Primary cũ được đưa lại cụm ở vai trò replica |

Các đoạn cấu hình, lệnh kiểm thử và bảng đối chiếu ở trên đủ để người đọc hiểu quy trình replication/failover khi xem bản in, trong khi vẫn tránh biến phụ lục thành danh sách script dài.
