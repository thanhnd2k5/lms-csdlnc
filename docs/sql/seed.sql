-
-- 1. BẢNG users 
INSERT INTO `users` (`id`, `username`, `email`, `password`, `full_name`, `role`, `email_verified`) VALUES
(10, 'admin', 'admin@ptit.edu.vn', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Admin', 'admin', 1),
(11, 'gv_quang', 'quang.gv@ptit.edu.vn', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Trần Văn Quang', 'teacher', 1),
(12, 'gv_lan', 'lan.gv@ptit.edu.vn', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Lê Thị Lan', 'teacher', 1),
(13, 'gv_minh', 'minh.gv@ptit.edu.vn', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Nguyễn Công Minh', 'teacher', 1),
(21, 'sv_nam', 'nam.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Nguyễn Văn Nam', 'student', 1),
(22, 'sv_linh', 'linh.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Mai Diệu Linh', 'student', 1),
(23, 'sv_bach', 'bach.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Lê Xuân Bách', 'student', 1),
(24, 'sv_an', 'an.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Phan Thiên An', 'student', 1),
(25, 'sv_quynh', 'quynh.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Đặng Thúy Quỳnh', 'student', 1),
(26, 'sv_tu', 'tu.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Hoàng Anh Tú', 'student', 1),
(27, 'sv_hoa', 'hoa.sv@gmail.com', '$2b$10$cabE/OIv3HqEoRr/GLo75eGm6d6GxeOl8ZewdQzbxLx051FElnJqK', 'Lê Thị Hoa', 'student', 1);


-- 2. CÁC BẢNG NỘI DUNG 
--Bảng Classes 
INSERT INTO `classes` (`id`, `name`, `teacher_id`, `class_code`, `status`, `max_students`, 'thumbnail') VALUES
(501, 'Lớp React N01', 11, 'RE01', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'), 
(502, 'Lớp React N02', 11, 'RE02', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'),
(503, 'Lớp SQL N01', 12, 'SQL01', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'), 
(504, 'Lớp SQL N02', 12, 'SQL02', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'),
(505, 'Lớp Java N01', 13, 'JAVA01', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg'), 
(506, 'Lớp Java N02', 13, 'JAVA02', 'active', 30, 'https://png.pngtree.com/png-vector/20210906/ourlarge/pngtree-school-classroom-png-image_3867854.jpg');

--Bảng Course
INSERT INTO `courses` (`id`, `title`, `description`, `is_public`, `teacher_id`, `thumbnail`) VALUES
(101, 'ReactJS Cơ Bản', 'Học React từ đầu', 1, 11, 'https://files.f8.edu.vn/f8-prod/courses/13/13.png'),
(102, 'ReactJS Nâng Cao', 'Redux và Performance', 1, 11, 'https://khoahochatde.com/wp-content/uploads/2025/07/reactjs-co-ban-den-nang-cao-1.jpg'),
(103, 'Truy vấn SQL', 'Làm chủ SQL Server', 1, 12, 'https://cdn.mcivietnam.com/nhanvien/media/Blog/cau-lenh-sql-jpegdctc5c.jpeg'),
(104, 'Tối ưu Database', 'Index và Tuning', 1, 12, 'https://s3-hfx03.fptcloud.com/codelearnstorage/Upload/Blog/toi-uu-truy-van-co-so-du-lieu-63729006273.3198.jpg'),
(105, 'Java Core', 'Lập trình hướng đối tượng', 1, 13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ_nXs841cpPlRyc3rQUVAqF8bN_EJT9IDww&s'),
(106, 'Spring Boot', 'Backend Framework', 1, 13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTov1bHkTXIMbor4TWVnrQN0PjohxY5FsxCsg&s');

--Bảng Chapter
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

--Bảng Video
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
(20,'Video 1.2: Tối ưu query với index',104,10,'https://www.youtube.com/watch?v=0oD9P7sH5Yc'),
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
--Bảng Quizzes
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

--Bảng Quiz Questions---------
INSERT INTO `quiz_questions` (`id`, `quiz_id`, `question_text`, `points`, `allows_multiple_correct`) VALUES
(401,301,'React là gì?',2.5,0),(402,301,'SPA là gì?',2.5,0)
(413,307,'SELECT làm gì?',2.5,0),(414,307,'WHERE làm gì?',2.5,0),
(425,313,'Class là gì?',2.5,0),(426,313,'Object là gì?',2.5,0),
(431,316,'Bean là gì?',2.5,0),(432,316,'DI là gì?',2.5,0),
(405, 303, 'Props trong React là gì?', 5, 0),
(406, 303, 'Có thể thay đổi giá trị của Props bên trong component con không?', 5, 0),
(407, 304, 'useState dùng để làm gì?', 5, 0),
(408, 304, 'useEffect chạy khi nào?', 5, 0),
(409, 305, 'Context API dùng để giải quyết vấn đề gì?', 5, 0),
(410, 305, 'Để sử dụng Context, ta dùng Hook nào?', 5, 0),
(411, 306, 'Redux Store là gì?', 5, 0),
(412, 306, 'Reducer có nhiệm vụ gì?', 5, 0),
(415, 308, 'INNER JOIN trả về kết quả gì?', 5, 0),
(417, 309, 'Hàm COUNT(*) trong SQL dùng để làm gì?', 5, 0);

--Bảng Quiz Options----------
INSERT INTO quiz_options (id, question_id, option_text, is_correct) VALUES
-- Câu hỏi 401
(1, 401, 'Thư viện UI JS', 1),
(2, 401, 'Database', 0),
(3, 401, 'Hệ điều hành', 0),
(4, 401, 'Mạng', 0),
-- Câu hỏi 402
(5, 402, 'Single Page App', 1),
(6, 402, 'Multi Page App', 0),
(7, 402, 'API', 0),
(8, 402, 'Server', 0),
-- Câu hỏi 405, 406
(17, 405, 'Dữ liệu truyền từ...', 1),
(18, 405, 'Một loại databas...', 0),
(19, 406, 'Không, props là r...', 1),
(20, 406, 'Có, thoải mái tha...', 0),
-- Câu hỏi 407, 408
(25, 407, 'Quản lý trạng th...', 1),
(26, 407, 'Để gọi API backe...', 0),
(29, 408, 'Sau mỗi lần com...', 1),
(30, 408, 'Chỉ chạy 1 lần du...', 0),
-- Câu hỏi 409, 410
(33, 409, 'Tránh việc truyền...', 1),
(34, 409, 'Để tăng tốc độ l...', 0),
(37, 410, 'useContext', 1),
(38, 410, 'useState', 0),
-- Câu hỏi 411, 412
(41, 411, 'Nơi lưu trữ state ...', 1),
(42, 411, 'Một loại CSS fra...', 0),
(45, 412, 'Xử lý và cập nhật...', 1),
(46, 412, 'Dùng để render ...', 0),
-- Câu hỏi 413 (Nhiều lựa chọn)
(49, 413, 'Lấy dữ liệu', 1),
(50, 413, 'Xóa bảng', 0),
(51, 413, 'Tạo DB', 0),
(52, 413, 'Code', 0),
-- Câu hỏi 414
(53, 414, 'Lọc dữ liệu', 1),
(54, 414, 'Sắp xếp', 0),
(55, 414, 'Join', 0),
(56, 414, 'Mảng', 0),
-- Câu hỏi 415, 417
(61, 415, 'Các bản ghi có g...', 1),
(62, 415, 'Tất cả bản ghi củ...', 0),
(65, 417, 'Đếm tổng số dòn...', 1),
(66, 417, 'Tính tổng giá trị ...', 0),
-- Câu hỏi 425, 426
(97, 425, 'Khuôn mẫu Object', 1),
(98, 425, 'Biến tĩnh', 0),
(101, 426, 'Thể hiện Class', 1),
(102, 426, 'Hàm con', 0),
-- Câu hỏi 431, 432
(121, 431, 'Đối tượng Spring', 1),
(122, 431, 'File cấu hình', 0),
(125, 432, 'Tiêm phụ thuộc', 1),
(126, 432, 'Tạo DB', 0),


-- 4. CÁC BẢNG QUẢN LÝ LỚP & TIẾN ĐỘ
--Bảng Class Students
INSERT INTO `class_students` (`class_id`, `student_id`, `status`) VALUES
(501, 21, 'active'), (501, 22, 'active'), (502, 23, 'active'), (502, 24, 'active'),
(503, 21, 'active'), (503, 23, 'active'), (504, 22, 'active'), (504, 25, 'active'),
(505, 26, 'active'), (505, 27, 'active'), (506, 21, 'active'), (506, 25, 'active');

--Bảng Class Courses
INSERT INTO `class_courses` (`class_id`, `course_id`, `requires_approval`) VALUES
(501,101,0),(502,102,1),(503,103,0),(504,104,1),(505,105,0),(506,106,1);

--Bảng Course Enrollments
INSERT INTO `course_enrollments` (`user_id`, `course_id`) VALUES (21,101),(22,101),(23,102),(21,103);

--Bảng Video Completion
INSERT INTO `video_completion` (`user_id`, `video_id`, `is_completed`) VALUES (21, 1, 1), (21, 2, 1), (22, 1, 1);

-- Kết quả thi: Sửa selected_option_id khớp với quiz_options ở trên
INSERT INTO `quiz_attempts` (`id`, `user_id`, `quiz_id`, `score`, `status`) VALUES 
(1, 21, 301, 10, 'completed'), (2, 22, 301, 10, 'completed'), (3, 23, 301, 5, 'completed');

INSERT INTO `quiz_answers` (`attempt_id`, `question_id`, `selected_option_id`) VALUES
(1, 401, 1), (1, 402, 5), (2, 401, 1), (2, 402, 5), (3, 401, 2), (3, 402, 5);










