# Backend API Notes

Tài liệu này mô tả API theo đúng route hiện có trong `backend/src/routes`.

## 1. Auth

Base route: `/`

- `POST /register`: đăng ký tài khoản, tạo verification token, gửi email xác thực.
- `POST /login`: đăng nhập bằng `username` hoặc `email`; chỉ cho phép user đã xác thực email.
- `GET /verify-email/:token`: xác thực email rồi redirect về frontend.
- `GET /users`: chỉ `admin`, lấy danh sách user.

## 2. Course, Chapter, Video

Base route: `/`

- `GET /courses`: lấy tất cả khóa học.
- `GET /courses/:courseId`: lấy chi tiết một khóa học.
- `POST /courses`: `admin` hoặc `teacher`, tạo khóa học.
- `PUT /courses/:courseId`: `admin` hoặc teacher sở hữu khóa học, cập nhật khóa học.
- `DELETE /courses/:courseId`: `admin` hoặc teacher sở hữu khóa học, xóa khóa học.
- `PUT /courses/:courseId/visibility`: cập nhật trạng thái public/private.
- `POST /courses/upload-thumbnail`: upload thumbnail khóa học.
- `GET /courses/:courseId/students`: lấy danh sách học viên của khóa học.
- `DELETE /courses/:courseId/students/:userId`: xóa học viên khỏi khóa học.

- `GET /courses/:courseId/chapters`: lấy danh sách chương theo khóa học.
- `POST /courses/:courseId/chapters`: tạo chương.
- `PUT /chapters/:chapterId`: cập nhật chương.
- `DELETE /chapters/:chapterId`: xóa chương.

- `GET /videos`: lấy tất cả video.
- `GET /videos/:videoId`: lấy chi tiết video.
- `GET /courses/:courseId/videos`: lấy video theo khóa học.
- `GET /chapters/:chapterId/videos`: lấy video theo chương.
- `POST /chapters/:chapterId/videos`: tạo video.
- `PUT /videos/:videoId`: cập nhật video.
- `DELETE /videos/:videoId`: xóa video.
- `POST /videos/:videoId/mark-watched`: đánh dấu video đã xem.
- `GET /videos/completed`: lấy danh sách video đã hoàn thành của user hiện tại.

## 3. Quiz

Base route: `/`

- `GET /quizzes`: lấy tất cả quiz.
- `GET /quizzes/unassigned`: lấy quiz chưa gán video/chương.
- `GET /quizzes/:quizId`: lấy chi tiết quiz.
- `POST /quizzes`: tạo quiz.
- `PUT /quizzes/:quizId`: cập nhật metadata quiz.
- `DELETE /quizzes/:quizId`: xóa quiz.
- `PUT /quizzes/:quizId/questions`: thay toàn bộ câu hỏi của quiz.
- `PUT /quizzes/:quizId/assign`: gán quiz vào video hoặc chương.
- `PUT /quizzes/:quizId/unassign`: bỏ gán quiz.
- `POST /quizzes/:quizId/submit`: nộp bài quiz.
- `POST /quizzes/:quizId/reset`: reset attempt gần nhất của user hiện tại.
- `GET /quizzes/:quizId/result`: lấy kết quả lần làm gần nhất.

- `GET /videos/:videoId/quizzes`: lấy quiz cho video.
- `GET /videos/:videoId/available-quizzes`: tương tự route trên, frontend teacher/admin dùng để chọn quiz gán cho video.
- `GET /chapters/:chapterId/quizzes`: lấy quiz của chương.
- `GET /courses/:courseId/quizzes`: lấy quiz của khóa học.

## 4. Teacher Read APIs

Base route: `/teacher`

Các route này đều chạy qua middleware `authMiddleware + authorizeTeacher`.

- `GET /teacher/courses`: khóa học của teacher hiện tại.
- `GET /teacher/courses/:id`: chi tiết khóa học của teacher, kèm chapters/videos/documents/quizzes.
- `GET /teacher/courses/:courseId/chapters`: chương của khóa học.
- `GET /teacher/courses/:courseId/videos`: video của khóa học.
- `GET /teacher/courses/:courseId/documents`: tài liệu của khóa học.
- `GET /teacher/quizzes`: toàn bộ quiz của teacher.
- `GET /teacher/quizzes/:id`: chi tiết một quiz của teacher.
- `GET /teacher/videos/:videoId/available-quizzes`: quiz khả dụng để gán cho video.
- `GET /teacher/quizzes/:quizId/questions`: câu hỏi của quiz.

Ghi chú:

- Nhiều thao tác create/update/delete của teacher không đi qua prefix `/teacher`, mà dùng route chung ở phần course/video/quiz.

## 5. Enrollment

Base route: `/courseEnroll`

- `GET /courseEnroll/enrolled-courses`: danh sách khóa học học viên đã đăng ký.
- `POST /courseEnroll/enroll`: đăng ký học một khóa học.
- `GET /courseEnroll/check/:courseId`: kiểm tra đã đăng ký hay chưa.
- `GET /courseEnroll/stats`: thống kê số học viên theo khóa học của teacher hiện tại.
- `GET /courseEnroll/courses/:courseId/details`: chi tiết khóa học công khai, bao gồm: Metadata (level, requirements, highlights), thông tin giảng viên (bio, avatar), Rating trung bình, và các thống kê tổng quát của giảng viên.
- `GET /courseEnroll/teacher/student-enrollment-details`: teacher xem tiến độ học viên theo khóa học.

## 6. Documents

Base route: `/`

- `POST /documents`: upload tài liệu.
- `GET /documents?courseId=...&chapterId=...&videoId=...`: lấy tài liệu theo ngữ cảnh.
- `GET /documents/:id/download`: tải file.
- `DELETE /documents/:id`: xóa tài liệu.

## 7. Search

Base route: `/search`

- `GET /search/courses`: tìm kiếm khóa học public.

Query params đang hỗ trợ:

- `keyword`
- `teacher`
- `sortBy`
- `sortOrder`
- `page`
- `limit`

## 8. User Profile

Base route: `/users`

- `GET /users/profile`: lấy hồ sơ user hiện tại.
- `PUT /users/profile`: cập nhật `full_name`.
- `POST /users/upload-avatar`: tải avatar.

## 9. Class Management

Base route: `/`

### Teacher class routes

- `POST /teacher/classes/upload-thumbnail`: upload thumbnail lớp.
- `GET /teacher/classes`: lấy danh sách lớp của teacher.
- `GET /teacher/classes/:classId`: lấy chi tiết lớp.
- `POST /teacher/classes`: tạo lớp.
- `PUT /teacher/classes/:classId`: sửa lớp.
- `DELETE /teacher/classes/:classId`: xóa lớp.
- `GET /teacher/classes/:classId/courses`: lấy khóa học trong lớp.
- `POST /teacher/classes/:classId/courses`: thêm khóa học vào lớp.
- `DELETE /teacher/classes/:classId/courses/:courseId`: gỡ khóa học khỏi lớp.

### Student class routes

- `GET /student/enrolled-classes`: lớp học viên đã tham gia.
- `POST /student/join-class`: tham gia lớp bằng mã lớp.
- `DELETE /student/classes/:classId/leave`: rời lớp.
- `GET /student/classes/:classId/courses`: xem khóa học thuộc lớp đã tham gia.

## 10. Middleware và quyền

Hiện có 2 file middleware khác nhau:

- `src/middleware/auth.js`
- `src/middleware/authMiddleware.js`

Thực tế code đang dùng cả hai tùy route:

- `auth.js`: dùng cho auth/course/quiz/document/enrollment/teacher routes
- `authMiddleware.js`: dùng cho class routes và user routes

Điều này quan trọng khi đọc code vì tên export không đồng nhất:

- Có chỗ import `{ authMiddleware }`
- Có chỗ import module rồi gọi `authMiddleware.authMiddleware`

## 11. Lưu ý quan trọng

- Một số route nhạy cảm chưa được bảo vệ chặt chẽ như kỳ vọng, ví dụ `DELETE /documents/:id` hiện không gắn middleware auth trong route.
- Một số chức năng teacher/admin dựa vào kiểm tra quyền trong controller thay vì route-level middleware.
- Muốn mô tả chính xác trong báo cáo, nên nói rằng hệ thống dùng mô hình REST phân tán theo module, nhưng quy ước route chưa hoàn toàn đồng nhất.
