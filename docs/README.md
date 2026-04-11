# LMS CSDLNC - Project Knowledge Base

## 1. Tổng quan

Đây là dự án LMS full-stack theo mô hình client-server:

- `frontend/`: ứng dụng React cho học viên, giảng viên, quản trị viên.
- `backend/`: API Node.js/Express xử lý nghiệp vụ và kết nối MySQL.
- `backend/lms.sql`: schema dữ liệu chính của hệ thống.
- `backend/uploads/`: nơi lưu avatar, thumbnail lớp, thumbnail khóa học và tài liệu tải lên.

Phạm vi nghiệp vụ đang có trong code:

- Đăng ký, đăng nhập, xác thực email.
- Phân quyền `admin`, `teacher`, `student`.
- Quản lý khóa học, chương, video.
- Gán quiz cho video/chương/khóa học và chấm điểm quiz.
- Đăng ký khóa học và theo dõi tiến độ xem video.
- Quản lý lớp học bằng mã lớp.
- Tải lên và tải xuống tài liệu học tập.
- Hồ sơ người dùng và avatar.
- Tìm kiếm khóa học public.

## 2. Kiến trúc kỹ thuật

### Backend

- Runtime: Node.js
- Framework: Express 4
- Database driver chính: `mysql2`
- Auth: `jsonwebtoken`, `bcrypt`
- Upload: `multer`
- Email: `nodemailer`
- Config: `dotenv`

Entrypoint backend là `backend/index.js`.

API được mount theo nhóm:

- `/teacher`
- `/courseEnroll`
- `/search`
- `/users`
- các route gốc như `/login`, `/courses`, `/videos`, `/documents`, `/quizzes`, `/teacher/classes`

Backend dùng mô hình gần MVC:

- `src/routes/`: khai báo endpoint
- `src/controllers/`: xử lý request/response
- `src/models/`: truy vấn DB
- `src/config/`: cấu hình DB
- `src/middleware/`: middleware xác thực/phân quyền

### Frontend

- React 18
- React Router DOM 7
- Axios
- Material UI
- Ant Design
- Có cài Tailwind CSS nhưng phần code đang thấy chủ yếu dùng CSS thường + UI libraries

Entrypoint frontend là `frontend/src/App.js`.

Frontend chia khu vực theo vai trò:

- `components/admin`
- `components/teacher`
- `components/user`
- `components/auth`
- `components/common`

## 3. Cấu trúc chạy hệ thống

### Biến môi trường

Backend cần tối thiểu:

- `PORT`
- `JWT_SECRET`
- `FRONTEND_URL`
- `BASE_URL`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USER`
- `MAIL_PASS`

Frontend cần:

- `REACT_APP_API_URL`

### Script chạy

Backend:

- `npm start`

Frontend:

- `npm start`
- `npm build`
- `npm test`

### Luồng khởi động

1. Frontend gọi API qua `REACT_APP_API_URL`.
2. Backend mở server ở `PORT` mặc định `5000`.
3. Backend kết nối MySQL qua pool trong `src/config/database.js`.
4. JWT được gửi qua header `Authorization: Bearer <token>`.
5. Static files được public qua `/uploads`.

## 4. Bản đồ tính năng theo vai trò

### Student

- Đăng ký tài khoản và xác thực email.
- Đăng nhập.
- Xem khóa học.
- Đăng ký khóa học.
- Xem khóa học đã đăng ký.
- Học theo video.
- Đánh dấu video đã xem.
- Làm quiz và xem kết quả lần gần nhất.
- Tham gia lớp bằng mã lớp.
- Xem các lớp đã tham gia.
- Xem các khóa học thuộc lớp mình tham gia.
- Cập nhật hồ sơ và avatar.

### Teacher

- Tạo và quản lý khóa học của mình.
- Tạo chương và video trong khóa học.
- Upload thumbnail khóa học.
- Tạo quiz, sửa quiz, sửa câu hỏi quiz.
- Gán quiz vào video hoặc chương.
- Xem thống kê ghi danh và tiến độ học viên.
- Tạo lớp học, sửa lớp, xóa lớp.
- Thêm khóa học của mình vào lớp học.
- Upload thumbnail lớp.
- Xem tài liệu theo khóa học.

### Admin

- Đăng nhập với quyền `admin`.
- Quản lý toàn bộ khóa học không phụ thuộc chủ sở hữu.
- Xem danh sách user qua route admin-protected.
- Quản lý quiz giống teacher nhưng ở phạm vi toàn hệ thống.

## 5. Frontend route chính

Từ `frontend/src/App.js`, các route chính gồm:

- `/`: trang chủ
- `/login`, `/register`
- `/verify-email/:token`
- `/course-info/:courseId`
- `/course/:courseId`
- `/enrolled-courses`
- `/enrolled-classes`
- `/student/classes/:classId/courses`
- `/profile`
- `/search`
- `/admin/*`
- `/teacher/*`

Các guard chính:

- `PrivateRoute`: yêu cầu đăng nhập
- `PrivateRouteTeacher`: yêu cầu teacher
- `AdminRoute`: yêu cầu admin

## 6. Điểm cần nhớ khi làm báo cáo

- Dự án đang dùng MySQL về mặt code và schema thực tế. Gói `pg` có trong `package.json` nhưng chưa thấy được dùng.
- Chức năng xác thực email là một phần thật của hệ thống, không chỉ ở UI.
- Mô hình dữ liệu có cả `course` và `class`. `class` là không gian gom nhiều khóa học cho một nhóm học viên.
- Teacher có nhiều thao tác tạo/sửa/xóa nhưng phần lớn lại đi qua route chung như `/courses`, `/chapters`, `/videos`, `/quizzes`, không phải toàn bộ đều nằm dưới `/teacher`.
- Quiz hỗ trợ cả câu hỏi một đáp án đúng và nhiều đáp án đúng.

## 7. Tài liệu liên quan

- API: [backend-api.md](/D:/lms-csdlnc/docs/backend-api.md)
- Database: [database-notes.md](/D:/lms-csdlnc/docs/database-notes.md)
