# Phụ lục

Phần phụ lục trình bày trực tiếp các tài liệu kỹ thuật đi kèm báo cáo, bao gồm schema SQL, dữ liệu mẫu, migration, truy vấn minh họa, lệnh sao lưu - phục hồi và tài liệu replication.

## Phụ lục A. Schema SQL hoàn chỉnh

Nội dung file `backend/lms.sql`:

```sql
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS = 0; 

-- 1. Bảng USERS
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) DEFAULT NULL,
  role ENUM('admin','student','teacher') DEFAULT 'student',
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  avatar VARCHAR(255) DEFAULT NULL,
  bio TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. Bảng COURSES
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

-- 3. Bảng CHAPTERS
CREATE TABLE IF NOT EXISTS chapters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_chapter_order (course_id, order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. Bảng VIDEOS
CREATE TABLE IF NOT EXISTS videos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  course_id INT NOT NULL,
  chapter_id INT DEFAULT NULL,
  video_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
  INDEX idx_video_chapter (chapter_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 5. Bảng QUIZZES
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

-- 6. Bảng CÂU HỎI & ĐÁP ÁN
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_id INT NOT NULL,
  question_text TEXT NOT NULL,
  points INT DEFAULT 1,
  allows_multiple_correct BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS quiz_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 7. Bảng LÀM BÀI KIỂM TRA
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  quiz_id INT NOT NULL,
  score INT NOT NULL,
  status ENUM('completed', 'failed') NOT NULL,
  end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
  INDEX idx_attempt_user_quiz (user_id, quiz_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS quiz_answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  attempt_id INT NOT NULL,
  question_id INT NOT NULL,
  selected_option_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attempt_id) REFERENCES quiz_attempts (id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES quiz_questions (id) ON DELETE CASCADE,
  FOREIGN KEY (selected_option_id) REFERENCES quiz_options (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 8. Bảng TIẾN ĐỘ HỌC TẬP
CREATE TABLE IF NOT EXISTS course_enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_enrollment (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS video_completion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  video_id INT NOT NULL,
  is_completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_completion (user_id, video_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 9. Bảng TÀI LIỆU
CREATE TABLE IF NOT EXISTS documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  course_id INT NOT NULL,
  chapter_id INT,
  video_id INT,
  teacher_id INT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 10. Bảng LỚP HỌC
CREATE TABLE IF NOT EXISTS classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    teacher_id INT NOT NULL,
    class_code VARCHAR(10) UNIQUE NOT NULL,
    password VARCHAR(255) DEFAULT NULL,
    requires_password BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    max_students INT DEFAULT 100,
    thumbnail VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id),
    INDEX idx_class_code (class_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 11. Bảng LIÊN KẾT LỚP - KHÓA HỌC - HỌC VIÊN
CREATE TABLE IF NOT EXISTS class_courses (
    class_id INT NOT NULL,
    course_id INT NOT NULL,
    requires_approval BOOLEAN DEFAULT FALSE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (class_id, course_id),
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS class_students (
    class_id INT NOT NULL,
    student_id INT NOT NULL,
    status ENUM('pending', 'active', 'blocked', 'inactive') DEFAULT 'active',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (class_id, student_id),
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS class_students_courses_approval (
    class_id INT NOT NULL,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'blocked') DEFAULT 'pending',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (class_id, student_id, course_id),
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 12. Bảng ĐÁNH GIÁ KHÓA HỌC
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

SET FOREIGN_KEY_CHECKS = 1;
```

## Phụ lục B. Dữ liệu mẫu khởi tạo

Nội dung file `docs/sql/seed.sql`:

```sql
-- 1. BẢNG users 
INSERT INTO `users` (`id`, `username`, `email`, `password`, `full_name`, `role`, `email_verified`, `bio`) VALUES
(10, 'admin', 'admin@ptit.edu.vn', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Admin', 'admin', 1, 'Hệ thống quản trị viên LMS.'),
(11, 'gv_quang', 'quang.gv@ptit.edu.vn', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Trần Văn Quang', 'teacher', 1, 'Chuyên gia lập trình Frontend với hơn 10 năm kinh nghiệm làm việc với React và các framework hiện đại.'),
(12, 'gv_lan', 'lan.gv@ptit.edu.vn', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Lê Thị Lan', 'teacher', 1, 'Tiến sĩ chuyên ngành Cơ sở dữ liệu, chuyên nghiên cứu về tối ưu hóa truy vấn và bảo mật hệ thống.'),
(13, 'gv_minh', 'minh.gv@ptit.edu.vn', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Nguyễn Công Minh', 'teacher', 1, 'Kỹ sư phần mềm cao cấp, đam mê phát triển các ứng dụng Java quy mô lớn và kiến trúc Microservices.'),
(21, 'sv_nam', 'nam.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Nguyễn Văn Nam', 'student', 1, NULL),
(22, 'sv_linh', 'linh.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Mai Diệu Linh', 'student', 1, NULL),
(23, 'sv_bach', 'bach.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Lê Xuân Bách', 'student', 1, NULL),
(24, 'sv_an', 'an.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Phan Thiên An', 'student', 1, NULL),
(25, 'sv_quynh', 'quynh.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Đặng Thúy Quỳnh', 'student', 1, NULL),
(26, 'sv_tu', 'tu.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Hoàng Anh Tú', 'student', 1, NULL),
(27, 'sv_hoa', 'hoa.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Lê Thị Hoa', 'student', 1, NULL);

-- 2. CÁC BẢNG NỘI DUNG 
-- Bảng Classes 
INSERT INTO `classes` (`id`, `name`, `teacher_id`, `class_code`, `status`, `max_students`, `thumbnail`) VALUES
(501, 'Lớp React N01', 11, 'RE01', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'), 
(502, 'Lớp React N02', 11, 'RE02', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'),
(503, 'Lớp SQL N01', 12, 'SQL01', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'), 
(504, 'Lớp SQL N02', 12, 'SQL02', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'),
(505, 'Lớp Java N01', 13, 'JAVA01', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'), 
(506, 'Lớp Java N02', 13, 'JAVA02', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg');

-- Bảng Course
INSERT INTO `courses` (`id`, `title`, `description`, `is_public`, `teacher_id`, `thumbnail`, `level`, `requirements`, `highlights`) VALUES
(101, 'ReactJS Cơ Bản', 'Học React từ đầu', 1, 11, 'https://files.f8.edu.vn/f8-prod/courses/13/13.png', 'Beginner', '["Cơ bản về HTML, CSS", "Nắm vững JavaScript cơ bản (ES6+)"]', '["Hiểu tư duy Component-based", "Sử dụng Hooks căn bản (useState, useEffect)", "Quản lý Props và State hiệu quả"]'),
(102, 'ReactJS Nâng Cao', 'Redux và Performance', 1, 11, 'https://khoahochatde.com/wp-content/uploads/2025/07/reactjs-co-ban-den-nang-cao-1.jpg', 'Advanced', '["Hoàn thành khóa ReactJS Cơ Bản", "Hiểu về Asynchronous JavaScript"]', '["Làm chủ Redux Toolkit", "Tối ưu hóa Performance với useMemo, useCallback", "Xây dựng Custom Hooks phức tạp"]'),
(103, 'Truy vấn SQL', 'Làm chủ SQL Server', 1, 12, 'https://cdn.mcivietnam.com/nhanvien/media/Blog/cau-lenh-sql-jpegdctc5c.jpeg', 'Beginner', '["Biết sử dụng máy tính cơ bản", "Tư duy logic tốt"]', '["Viết thành thạo các câu lệnh SELECT, JOIN", "Sử dụng các hàm Aggregate", "Thiết kế database chuẩn hóa"]'),
(104, 'Tối ưu Database', 'Index và Tuning', 1, 12, 'https://s3-hfx03.fptcloud.com/codelearnstorage/Upload/Blog/toi-uu-truy-van-co-so-du-lieu-63729006273.3198.jpg', 'Intermediate', '["Hiểu cơ bản về SQL", "Đã từng làm việc với một hệ quản trị CSDL bất kỳ"]', '["Hiểu cơ chế Indexing (B-Tree, Hash)", "Phân tích Execution Plan", "Kỹ thuật tối ưu hóa câu lệnh SQL phức tạp"]'),
(105, 'Java Core', 'Lập trình hướng đối tượng', 1, 13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ_nXs841cpPlRyc3rQUVAqF8bN_EJT9IDww&s', 'Beginner', '["Không yêu cầu kiến thức lập trình trước đó"]', '["Nắm vững 4 tính chất của OOP", "Sử dụng thành thạo Java Collections", "Xử lý ngoại lệ (Exceptions) chuyên nghiệp"]'),
(106, 'Spring Boot', 'Backend Framework', 1, 13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTov1bHkTXIMbor4TWVnrQN0PjohxY5FsxCsg&s', 'Intermediate', '["Nắm vững Java Core", "Hiểu cơ bản về HTTP/REST"]', '["Xây dựng RESTful API chuẩn chỉnh", "Tích hợp Spring Security & JWT", "Làm việc với Spring Data JPA"]');

-- Bảng Chapter
INSERT INTO `chapters` (`id`, `course_id`, `title`, `order_index`) VALUES
(1,101,'Chương 1: Giới thiệu tổng quan về React và cách hoạt động',1),
(2,101,'Chương 2: Tìm hiểu JSX và cách viết giao diện trong React',2),
(3,101,'Chương 3: Props và cách truyền dữ liệu giữa các component',3),
(4,102,'Chương 1: Hooks trong React và cách sử dụng useState, useEffect',1),
(5,102,'Chương 2: Context API và quản lý state toàn cục',2),
(6,102,'Chương 3: Redux và quản lý trạng thái nâng cao trong ứng dụng',3),
(7,103,'Chương 1: Câu lệnh SELECT và truy vấn dữ liệu cơ bản trong SQL',1),
(8,103,'Chương 2: JOIN và cách kết hợp dữ liệu từ nhiều bảng',2),
(9,103,'Chương 3: Hàm Aggregate và xử lý dữ liệu tổng hợp',3),
(10,104,'Chương 1: Index trong database và tối ưu tốc độ truy vấn',1),
(11,104,'Chương 2: Sử dụng Profiler để phân tích hiệu năng truy vấn',2),
(12,104,'Chương 3: Execution Plan và cách đọc kế hoạch thực thi SQL',3),
(13,105,'Chương 1: Lập trình hướng đối tượng với Class trong Java',1),
(14,105,'Chương 2: Interface và cách thiết kế hệ thống linh hoạt',2),
(15,105,'Chương 3: Collection Framework và quản lý dữ liệu trong Java',3),
(16,106,'Chương 1: Bean trong Spring và quản lý đối tượng',1),
(17,106,'Chương 2: Controller và xử lý request trong Spring MVC',2),
(18,106,'Chương 3: Security và bảo mật ứng dụng với Spring Security',3);

-- Bảng Video
INSERT INTO `videos` (`id`, `title`, `course_id`, `chapter_id`, `video_url`) VALUES
(1,'Video 1.1: Giới thiệu React',101,1,'https://www.youtube.com/watch?v=Tn6-PIqc4UM'),
(2,'Video 1.2: React hoạt động như thế nào',101,1,'https://www.youtube.com/watch?v=Ke90Tje7VS0'),
(3,'Video 2.1: JSX là gì',101,2,'https://www.youtube.com/watch?v=7fPXI_MnBOY'),
(4,'Video 2.2: Cách sử dụng JSX',101,2,'https://www.youtube.com/watch?v=SqcY0GlETPk'),
(5,'Video 3.1: Props trong React',101,3,'https://www.youtube.com/watch?v=PHaECbrKgs0'),
(6,'Video 3.2: Truyền dữ liệu giữa component',101,3,'https://www.youtube.com/watch?v=IYvD9oBCuJI'),
(7,'Video 1.1: useState Hook',102,4,'https://www.youtube.com/watch?v=O6P86uwfdR0'),
(8,'Video 1.2: useEffect Hook',102,4,'https://www.youtube.com/watch?v=0ZJgIjIuY7U'),
(9,'Video 2.1: Context API',102,5,'https://www.youtube.com/watch?v=35lXWvCuM8o'),
(10,'Video 2.2: Global state với Context',102,5,'https://www.youtube.com/watch?v=5LrDIWkK_Bc'),
(11,'Video 3.1: Redux cơ bản',102,6,'https://www.youtube.com/watch?v=93p3LxR9xfM'),
(12,'Video 3.2: Redux nâng cao',102,6,'https://www.youtube.com/watch?v=zrs7u6bdbUw'),
(13,'Video 1.1: SELECT trong SQL',103,7,'https://www.youtube.com/watch?v=HXV3zeQKqGY'),
(14,'Video 1.2: WHERE và ORDER BY',103,7,'https://www.youtube.com/watch?v=7S_tz1z_5bA'),
(15,'Video 2.1: JOIN cơ bản',103,8,'https://www.youtube.com/watch?v=9yeOJ0ZMUYw'),
(16,'Video 2.2: INNER JOIN vs LEFT JOIN',103,8,'https://www.youtube.com/watch?v=2HVMiPPuPIM'),
(17,'Video 3.1: COUNT, SUM, AVG',103,9,'https://www.youtube.com/watch?v=9Pzj7Aj25lw'),
(18,'Video 3.2: GROUP BY & HAVING',103,9,'https://www.youtube.com/watch?v=7sG7A7K4Gjw'),
(19,'Video 1.1: Index là gì',104,10,'https://www.youtube.com/watch?v=FSg9Pz4o6uY'),
(20,'Video 1.2: Tối ưu query with index',104,10,'https://www.youtube.com/watch?v=0oD9P7sH5Yc'),
(21,'Video 2.1: SQL Profiler',104,11,'https://www.youtube.com/watch?v=Q6kY6F7sQ1c'),
(22,'Video 2.2: Phân tích hiệu năng',104,11,'https://www.youtube.com/watch?v=6PBt6hR4pYc'),
(23,'Video 3.1: Execution Plan',104,12,'https://www.youtube.com/watch?v=2eHf7n7ZP1Q'),
(24,'Video 3.2: Đọc execution plan',104,12,'https://www.youtube.com/watch?v=8Z8r7p7yY3M'),
(25,'Video 1.1: Class và Object',105,13,'https://www.youtube.com/watch?v=grEKMHGYyns'),
(26,'Video 1.2: Constructor trong Java',105,13,'https://www.youtube.com/watch?v=TBWX97e1E9g'),
(27,'Video 2.1: Interface Java',105,14,'https://www.youtube.com/watch?v=RBSGKlAvoiM'),
(28,'Video 2.2: Abstraction',105,14,'https://www.youtube.com/watch?v=3jZ5vnv-LZc'),
(29,'Video 3.1: ArrayList',105,15,'https://www.youtube.com/watch?v=3dE9qk8gVYc'),
(30,'Video 3.2: Collection Framework',105,15,'https://www.youtube.com/watch?v=rzA7UJ-hQn4'),
(31,'Video 1.1: Spring Bean',106,16,'https://www.youtube.com/watch?v=vtPkZShrvXQ'),
(32,'Video 1.2: Dependency Injection',106,16,'https://www.youtube.com/watch?v=8p9jSRx0lC8'),
(33,'Video 2.1: Spring Controller',106,17,'https://www.youtube.com/watch?v=9SGDpanrc8U'),
(34,'Video 2.2: REST API Spring',106,17,'https://www.youtube.com/watch?v=5rNk7m_zlAg'),
(35,'Video 3.1: Spring Security cơ bản',106,18,'https://www.youtube.com/watch?v=sm6Nn0dF3I8'),
(36,'Video 3.2: Authentication & Authorization',106,18,'https://www.youtube.com/watch?v=her_7pa0vrg');

-- 3. CÁC BẢNG THI CỬ
-- Bảng Quizzes
INSERT INTO `quizzes` (`id`, `title`, `course_id`, `chapter_id`, `duration_minutes`, `passing_score`, `quiz_type`, `teacher_id`) VALUES
(301,'Quiz Chương 1: React',101,1,10,80,'chapter',11),(302,'Quiz Chương 2: JSX',101,2,10,80,'chapter',11),
(303,'Quiz Chương 3: Props',101,3,10,80,'chapter',11),(304,'Quiz Chương 1: Hooks',102,4,10,80,'chapter',11),
(305,'Quiz Chương 2: Context',102,5,10,80,'chapter',11),(306,'Quiz Chương 3: Redux',102,6,10,80,'chapter',11),
(307,'Quiz Chương 1: SELECT',103,7,10,80,'chapter',12),(308,'Quiz Chương 2: JOIN',103,8,10,80,'chapter',12),
(309,'Quiz Chương 3: Aggregate',103,9,10,80,'chapter',12),(310,'Quiz Chương 1: Index',104,10,10,80,'chapter',12),
(311,'Quiz Chương 2: Profiler',104,11,10,80,'chapter',12),(312,'Quiz Chương 3: Plan',104,12,10,80,'chapter',12),
(313,'Quiz Chương 1: Class',105,13,10,80,'chapter',13),(314,'Quiz Chương 2: Interface',105,14,10,80,'chapter',13),
(315,'Quiz Chương 3: Collection',105,15,10,80,'chapter',13),(316,'Quiz Chương 1: Bean',106,16,10,80,'chapter',13),
(317,'Quiz Chương 2: Controller',106,17,10,80,'chapter',13),(318,'Quiz Chương 3: Security',106,18,10,80,'chapter',13);

-- Bảng Quiz Questions
INSERT INTO `quiz_questions` (`id`, `quiz_id`, `question_text`, `points`, `allows_multiple_correct`) VALUES
(401,301,'React là gì?',2.5,0),(402,301,'SPA là gì?',2.5,0),
(413,307,'SELECT làm gì?',2.5,0),(414,307,'WHERE làm gì?',2.5,0),
(425,313,'Class là gì?',2.5,0),(426,313,'Object là gì?',2.5,0),
(431,316,'Bean là gì?',2.5,0),(432,316,'DI là gì?',2.5,0),
(405,303,'Props trong React là gì?',5,0),
(406,303,'Có thể thay đổi giá trị của Props bên trong component con không?',5,0),
(407,304,'useState dùng để làm gì?',5,0),
(408,304,'useEffect chạy khi nào?',5,0),
(409,305,'Context API dùng để giải quyết vấn đề gì?',5,0),
(410,305,'Để sử dụng Context, ta dùng Hook nào?',5,0),
(411,306,'Redux Store là gì?',5,0),
(412,306,'Reducer có nhiệm vụ gì?',5,0),
(415,308,'INNER JOIN trả về kết quả gì?',5,0),
(417,309,'Hàm COUNT(*) trong SQL dùng để làm gì?',5,0);

-- Bảng Quiz Options
INSERT INTO quiz_options (id, question_id, option_text, is_correct) VALUES
(1,401,'Thư viện UI JS',1),
(2,401,'Database',0),
(3,401,'Hệ điều hành',0),
(4,401,'Mạng',0),
(5,402,'Single Page App',1),
(6,402,'Multi Page App',0),
(7,402,'API',0),
(8,402,'Server',0),
(17,405,'Dữ liệu truyền từ component cha xuống component con',1),
(18,405,'Một loại database trong React',0),
(19,406,'Không, props là read-only',1),
(20,406,'Có, thoải mái thay đổi',0),
(25,407,'Quản lý trạng thái trong component',1),
(26,407,'Để gọi API backend',0),
(29,408,'Sau mỗi lần component render hoặc khi dependencies thay đổi',1),
(30,408,'Chỉ chạy 1 lần duy nhất trong mọi trường hợp',0),
(33,409,'Tránh việc truyền props qua nhiều cấp',1),
(34,409,'Để tăng tốc độ load CSS',0),
(37,410,'useContext',1),
(38,410,'useState',0),
(41,411,'Nơi lưu trữ state toàn cục',1),
(42,411,'Một loại CSS framework',0),
(45,412,'Xử lý và cập nhật state',1),
(46,412,'Dùng để render UI',0),
(49,413,'Lấy dữ liệu',1),
(50,413,'Xóa bảng',0),
(51,413,'Tạo DB',0),
(52,413,'Code',0),
(53,414,'Lọc dữ liệu',1),
(54,414,'Sắp xếp',0),
(55,414,'Join',0),
(56,414,'Mảng',0),
(61,415,'Các bản ghi có giá trị khớp ở cả hai bảng',1),
(62,415,'Tất cả bản ghi của bảng trái dù có khớp hay không',0),
(65,417,'Đếm tổng số dòng',1),
(66,417,'Tính tổng giá trị số',0),
(97,425,'Khuôn mẫu Object',1),
(98,425,'Biến tĩnh',0),
(101,426,'Thể hiện của Class',1),
(102,426,'Hàm con',0),
(121,431,'Đối tượng Spring',1),
(122,431,'File cấu hình',0),
(125,432,'Tiêm phụ thuộc',1),
(126,432,'Tạo DB',0);

-- 4. CÁC BẢNG QUẢN LÝ LỚP & TIẾN ĐỘ
INSERT INTO `class_students` (`class_id`, `student_id`, `status`) VALUES
(501,21,'active'), (501,22,'active'), (502,23,'active'), (502,24,'active'),
(503,21,'active'), (503,23,'active'), (504,22,'active'), (504,25,'active'),
(505,26,'active'), (505,27,'active'), (506,21,'active'), (506,25,'active');

INSERT INTO `class_courses` (`class_id`, `course_id`, `requires_approval`) VALUES
(501,101,0),(502,102,1),(503,103,0),(504,104,1),(505,105,0),(506,106,1);

INSERT INTO `course_enrollments` (`user_id`, `course_id`) VALUES (21,101),(22,101),(23,102),(21,103);

INSERT INTO `video_completion` (`user_id`, `video_id`, `is_completed`) VALUES (21,1,1), (21,2,1), (22,1,1);

INSERT INTO `quiz_attempts` (`id`, `user_id`, `quiz_id`, `score`, `status`) VALUES 
(1,21,301,10,'completed'), (2,22,301,10,'completed'), (3,23,301,5,'completed');

INSERT INTO `quiz_answers` (`attempt_id`, `question_id`, `selected_option_id`) VALUES
(1,401,1), (1,402,5), (2,401,1), (2,402,5), (3,401,2), (3,402,5);

INSERT INTO `class_students_courses_approval` (`class_id`, `student_id`, `course_id`, `status`) VALUES
(502,21,102,'pending'), (504,26,104,'pending');

INSERT INTO `course_reviews` (`course_id`, `user_id`, `rating`, `comment`) VALUES
(101,21,5,'Khóa học tuyệt vời!'),
(101,22,4,'Nội dung rất chi tiết'),
(102,21,5,'Rất dễ hiểu'),
(102,23,5,'Giảng viên nhiệt tình');
```

## Phụ lục C. Bộ migration theo phiên bản

### C.1. `V1__init_core.sql`

```sql
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) DEFAULT NULL,
  role ENUM('admin','student','teacher') DEFAULT 'student',
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  avatar VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT DEFAULT NULL,
  thumbnail VARCHAR(255) DEFAULT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  teacher_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_course_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS chapters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_chapter_order (course_id, order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS videos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  course_id INT NOT NULL,
  chapter_id INT DEFAULT NULL,
  video_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
  INDEX idx_video_chapter (chapter_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

### C.2. `V1__init_core_down.sql`

```sql
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;
```

### C.3. `V2__add_quiz_module.sql`

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

CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_id INT NOT NULL,
  question_text TEXT NOT NULL,
  points INT DEFAULT 1,
  allows_multiple_correct BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS quiz_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  quiz_id INT NOT NULL,
  score INT NOT NULL,
  status ENUM('completed', 'failed') NOT NULL,
  end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
  INDEX idx_attempt_user_quiz (user_id, quiz_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS quiz_answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  attempt_id INT NOT NULL,
  question_id INT NOT NULL,
  selected_option_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE,
  FOREIGN KEY (selected_option_id) REFERENCES quiz_options(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

### C.4. `V2__add_quiz_module_down.sql`

```sql
DROP TABLE IF EXISTS quiz_answers;
DROP TABLE IF EXISTS quiz_attempts;
DROP TABLE IF EXISTS quiz_options;
DROP TABLE IF EXISTS quiz_questions;
DROP TABLE IF EXISTS quizzes;
```

### C.5. `V3__add_enrollment_progress_documents.sql`

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

CREATE TABLE IF NOT EXISTS video_completion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  video_id INT NOT NULL,
  is_completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_completion (user_id, video_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  course_id INT NOT NULL,
  chapter_id INT,
  video_id INT,
  teacher_id INT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

### C.6. `V3__add_enrollment_progress_documents_down.sql`

```sql
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS video_completion;
DROP TABLE IF EXISTS course_enrollments;
```

### C.7. `V4__add_class_management.sql`

```sql
CREATE TABLE IF NOT EXISTS classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  teacher_id INT NOT NULL,
  class_code VARCHAR(10) UNIQUE NOT NULL,
  password VARCHAR(255) DEFAULT NULL,
  requires_password BOOLEAN DEFAULT FALSE,
  status ENUM('active', 'inactive') DEFAULT 'active',
  max_students INT DEFAULT 100,
  thumbnail VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES users(id),
  INDEX idx_class_code (class_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS class_courses (
  class_id INT NOT NULL,
  course_id INT NOT NULL,
  requires_approval BOOLEAN DEFAULT FALSE,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (class_id, course_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS class_students (
  class_id INT NOT NULL,
  student_id INT NOT NULL,
  status ENUM('pending', 'active', 'blocked') DEFAULT 'active',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (class_id, student_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS class_students_courses_approval (
  class_id INT NOT NULL,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'blocked') DEFAULT 'pending',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (class_id, student_id, course_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

### C.8. `V4__add_class_management_down.sql`

```sql
DROP TABLE IF EXISTS class_students_courses_approval;
DROP TABLE IF EXISTS class_students;
DROP TABLE IF EXISTS class_courses;
DROP TABLE IF EXISTS classes;
```

### C.9. `V5__add_course_metadata_and_instructor_bio.sql`

```sql
ALTER TABLE users ADD COLUMN bio TEXT DEFAULT NULL;

ALTER TABLE courses ADD COLUMN level ENUM('Beginner', 'Intermediate', 'Advanced', 'All Levels') DEFAULT 'All Levels';

ALTER TABLE courses ADD COLUMN requirements TEXT DEFAULT NULL COMMENT 'Mảng JSON lưu các yêu cầu';

ALTER TABLE courses ADD COLUMN highlights TEXT DEFAULT NULL COMMENT 'Mảng JSON lưu mục tiêu - Bạn sẽ học được gì';
```

### C.10. `V5__add_course_metadata_and_instructor_bio_down.sql`

```sql
ALTER TABLE courses DROP COLUMN level, DROP COLUMN requirements, DROP COLUMN highlights;

ALTER TABLE users DROP COLUMN bio;
```

### C.11. `V6__add_course_reviews.sql`

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

### C.12. `V6__add_course_reviews_down.sql`

```sql
DROP TABLE IF EXISTS course_reviews;
```

## Phụ lục D. Danh sách chỉ mục

| Bảng | Tên chỉ mục | Cột |
| --- | --- | --- |
| `users` | `idx_user_role` | `role` |
| `courses` | `idx_course_public` | `is_public` |
| `chapters` | `idx_chapter_order` | `course_id, order_index` |
| `videos` | `idx_video_chapter` | `chapter_id` |
| `quizzes` | `idx_quiz_type` | `quiz_type` |
| `quiz_attempts` | `idx_attempt_user_quiz` | `user_id, quiz_id` |
| `classes` | `idx_class_code` | `class_code` |
| `course_reviews` | `idx_course_rating` | `course_id, rating` |

| Bảng | Ràng buộc duy nhất |
| --- | --- |
| `users` | `username UNIQUE` |
| `users` | `email UNIQUE` |
| `classes` | `class_code UNIQUE` |
| `course_enrollments` | `UNIQUE (user_id, course_id)` |
| `video_completion` | `UNIQUE (user_id, video_id)` |
| `course_reviews` | `UNIQUE (user_id, course_id)` |

## Phụ lục E. Truy vấn mẫu và EXPLAIN

### E.1. Thống kê số học viên đăng ký theo khóa học

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

### E.2. Theo dõi tiến độ học tập của học viên

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

### E.3. Thống kê số câu hỏi theo quiz

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

### E.4. Tìm lớp học theo mã lớp

```sql
SELECT *
FROM classes
WHERE class_code = 'RE01';
```

```sql
EXPLAIN
SELECT *
FROM classes
WHERE class_code = 'RE01';
```

## Phụ lục F. Lệnh sao lưu và phục hồi

### F.1. Lệnh sao lưu dữ liệu

```powershell
mysqldump -u root -p --single-transaction --routines --triggers --result-file=lms_backup_2026_05_05.sql lms
```

### F.2. Lệnh phục hồi từ bản sao lưu đầy đủ

```cmd
mysql -u root -p lms_restore < lms_backup_2026_05_05.sql
```

### F.3. Lệnh áp dụng thay đổi từ binary log

```powershell
mysqlbinlog --read-from-remote-server --host=127.0.0.1 --user=root --password --start-position=157 --stop-position=639 --rewrite-db="lms->lms_restore" THANH-bin.000005 | mysql --binary-mode -u root -p lms_restore
```

### F.4. Nội dung file `pitr_replay.sql`

```sql
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 157
#260505 17:54:17 server id 1  end_log_pos 0 CRC32 0x485f4a9e  Start: binlog v 4, server v 8.0.46 created 260505 17:54:17
BINLOG '
Wcz5aQ8BAAAAegAAAAAAAAAAAAQAOC4wLjQ2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAEwANAAgAAAAABAAEAAAAYgAEGggAAAAICAgCAAAACgoKKioAEjQA
CigAAZ5KX0g=
'/*!*/;
# at 157
#260505 18:00:11 server id 1  end_log_pos 236 CRC32 0x5f9480a5  Anonymous_GTID last_committed=0 sequence_number=1 rbr_only=yes original_committed_timestamp=1777978811953206 immediate_commit_timestamp=1777978811953206 transaction_length=482
/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;
/*!80001 SET @@session.original_commit_timestamp=1777978811953206*//*!*/;
/*!80014 SET @@session.original_server_version=80046*//*!*/;
/*!80014 SET @@session.immediate_server_version=80046*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
SET TIMESTAMP=1777978811/*!*/;
BEGIN
/*!*/;
BINLOG '
u835aRMBAAAAWgAAAJMBAAAAAFUAAAAAAAMAC2xtc19yZXN0b3JlAAV1c2VycwAMAw8PDw/+AQ8P
/BEREcgAkAH8A5AB9wH8A/wDAgAA8A8BAQACAS1Eu30q
u835aR8BAAAAzQAAAGACAAAAAFUAAAAAAAEAAgAM/////4ADAQAAAAV1c2VyMQwAdXNlcjFAbG1z
LnZuIAAxYTFkYzkxYzkwNzMyNWM2OTI3MWRkZjBjOTQ0YmM3MgkAVHJhbiBVeWVuAwFjsh6Aafjk
CYADAQAAAAV1c2VyMQwAdXNlcjFAbG1zLnZuIAAxYTFkYzkxYzkwNzMyNWM2OTI3MWRkZjBjOTQ0
YmM3Mg4AVHJhbiBVeWVuIFBJVFIDAWOyHoBp+c274Ctc4Q==
'/*!*/;
COMMIT/*!*/;
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /*!*/;
DELIMITER ;
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
```

## Phụ lục G. Minh chứng replication và failover

Tài liệu liên quan đến replication và failover được lưu trong:

- `infra/mysql-replication/README-vi.md`
- `docs/advanced/replication-automatic-failover-plan-vi.md`

Các nội dung minh chứng chính:

- cấu hình `primary - replica`;
- trạng thái `SHOW REPLICA STATUS`;
- log backend với nhãn `[DB:read]` và `[DB:write]`;
- log thông báo `Automatic failover completed`;
- quy trình `manual rejoin` cho primary cũ.
