USE lms;

INSERT INTO users (username, email, password, full_name, role, email_verified)
VALUES
('admin01', 'admin01@example.com', 'hashed_password', 'Quan Tri Vien', 'admin', TRUE),
('teacher01', 'teacher01@example.com', 'hashed_password', 'Nguyen Van Giang', 'teacher', TRUE),
('teacher02', 'teacher02@example.com', 'hashed_password', 'Tran Thi Giang', 'teacher', TRUE),
('student01', 'student01@example.com', 'hashed_password', 'Le Van Hoc', 'student', TRUE),
('student02', 'student02@example.com', 'hashed_password', 'Pham Thi Hoc', 'student', TRUE),
('student03', 'student03@example.com', 'hashed_password', 'Hoang Minh Hoc', 'student', TRUE);

INSERT INTO courses (title, description, thumbnail, is_public, teacher_id)
VALUES
('Co so du lieu nang cao', 'Khoa hoc ve SQL, schema va truy van', '/uploads/thumbnails/db.png', TRUE, 2),
('Lap trinh Web co ban', 'Khoa hoc nhap mon phat trien web', '/uploads/thumbnails/web.png', TRUE, 3);

INSERT INTO chapters (course_id, title, order_index)
VALUES
(1, 'Tong quan co so du lieu', 1),
(1, 'Truy van SQL', 2),
(2, 'HTML CSS co ban', 1),
(2, 'JavaScript nhap mon', 2);

INSERT INTO videos (title, course_id, chapter_id, video_url)
VALUES
('Gioi thieu he quan tri CSDL', 1, 1, 'https://example.com/video1'),
('Lenh SELECT co ban', 1, 2, 'https://example.com/video2'),
('Cau truc trang HTML', 2, 3, 'https://example.com/video3'),
('Bien va ham trong JavaScript', 2, 4, 'https://example.com/video4');

INSERT INTO quizzes (title, course_id, chapter_id, video_id, duration_minutes, passing_score, quiz_type, teacher_id)
VALUES
('Quiz SQL co ban', 1, 2, 2, 20, 60, 'video', 2),
('Quiz HTML nhap mon', 2, 3, 3, 15, 50, 'video', 3);

INSERT INTO quiz_questions (quiz_id, question_text, points, allows_multiple_correct)
VALUES
(1, 'SQL viet tat cua cum tu nao?', 1, FALSE),
(1, 'Lenh nao dung de lay du lieu?', 1, FALSE),
(2, 'The nao tao tieu de cap 1 trong HTML?', 1, FALSE);

INSERT INTO quiz_options (question_id, option_text, is_correct)
VALUES
(1, 'Structured Query Language', TRUE),
(1, 'Simple Query Language', FALSE),
(2, 'SELECT', TRUE),
(2, 'UPDATE', FALSE),
(3, '<h1>', TRUE),
(3, '<p>', FALSE);

INSERT INTO course_enrollments (user_id, course_id)
VALUES
(4, 1),
(5, 1),
(6, 2);

INSERT INTO video_completion (user_id, video_id, is_completed)
VALUES
(4, 1, TRUE),
(4, 2, TRUE),
(5, 1, TRUE),
(6, 3, TRUE);

INSERT INTO documents (title, file_path, file_type, course_id, chapter_id, video_id, teacher_id)
VALUES
('Tai lieu SQL tong quan', '/uploads/documents/sql-overview.pdf', 'pdf', 1, 1, NULL, 2),
('Tai lieu HTML can ban', '/uploads/documents/html-basic.pdf', 'pdf', 2, 3, NULL, 3);

INSERT INTO classes (name, teacher_id, class_code, password, requires_password, status, max_students, thumbnail)
VALUES
('Lop CSDL K17', 2, 'CSDL17', NULL, FALSE, 'active', 100, '/uploads/class-thumbnails/class1.png'),
('Lop WEB K17', 3, 'WEBK17', '123456', TRUE, 'active', 80, '/uploads/class-thumbnails/class2.png');

INSERT INTO class_courses (class_id, course_id, requires_approval)
VALUES
(1, 1, FALSE),
(2, 2, FALSE);

INSERT INTO class_students (class_id, student_id, status)
VALUES
(1, 4, 'active'),
(1, 5, 'active'),
(2, 6, 'active');

INSERT INTO class_students_courses_approval (class_id, student_id, course_id, status)
VALUES
(1, 4, 1, 'approved'),
(1, 5, 1, 'approved'),
(2, 6, 2, 'approved');
