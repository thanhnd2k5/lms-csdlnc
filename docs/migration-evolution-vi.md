# Mô Tả Quá Trình Phát Triển Schema Theo Từng Migration

Tài liệu này dùng để làm phần migration trong Chương 4 theo hướng sinh động hơn: mô phỏng quá trình phát triển cơ sở dữ liệu qua nhiều phiên bản thay vì chỉ coi `lms.sql` là một file tạo schema duy nhất.

## 1. Ý tưởng trình bày

Trong thực tế phát triển phần mềm, cơ sở dữ liệu hiếm khi được xây dựng đầy đủ ngay từ đầu. Thay vào đó, schema thường được mở rộng dần theo yêu cầu nghiệp vụ. Vì vậy, trong báo cáo có thể mô tả quá trình phát triển hệ thống LMS theo các giai đoạn:

1. Khởi tạo lõi người dùng và nội dung học tập
2. Bổ sung module bài kiểm tra
3. Bổ sung ghi danh, tiến độ học tập và tài liệu
4. Bổ sung quản lý lớp học

Cách trình bày này hợp lý hơn về mặt học thuật vì:

- phản ánh tư duy phát triển hệ thống
- cho thấy mối liên hệ giữa nghiệp vụ và thay đổi schema
- làm phần migration bớt khô, có diễn tiến rõ ràng

## 2. Các phiên bản migration đề xuất

### V1 - Khởi tạo lõi hệ thống

File:

- [V1__init_core.sql](/D:/lms-csdlnc/docs/sql/migrations/V1__init_core.sql)
- [V1__init_core_down.sql](/D:/lms-csdlnc/docs/sql/migrations/V1__init_core_down.sql)

Nội dung:

- tạo bảng `users`
- tạo bảng `courses`
- tạo bảng `chapters`
- tạo bảng `videos`

Ý nghĩa:

- đây là phiên bản đầu tiên của hệ thống
- hệ thống mới chỉ phục vụ việc quản lý người dùng, khóa học, chương và video
- phù hợp với giai đoạn đầu khi nền tảng chỉ cần đăng nội dung học tập

### V2 - Bổ sung module đánh giá

File:

- [V2__add_quiz_module.sql](/D:/lms-csdlnc/docs/sql/migrations/V2__add_quiz_module.sql)
- [V2__add_quiz_module_down.sql](/D:/lms-csdlnc/docs/sql/migrations/V2__add_quiz_module_down.sql)

Nội dung:

- thêm bảng `quizzes`
- thêm bảng `quiz_questions`
- thêm bảng `quiz_options`
- thêm bảng `quiz_attempts`
- thêm bảng `quiz_answers`

Ý nghĩa:

- hệ thống được mở rộng từ học nội dung sang đánh giá kết quả học tập
- cho phép tổ chức bài kiểm tra, lưu cấu trúc đề và lưu lịch sử làm bài

### V3 - Bổ sung ghi danh, tiến độ và tài liệu

File:

- [V3__add_enrollment_progress_documents.sql](/D:/lms-csdlnc/docs/sql/migrations/V3__add_enrollment_progress_documents.sql)
- [V3__add_enrollment_progress_documents_down.sql](/D:/lms-csdlnc/docs/sql/migrations/V3__add_enrollment_progress_documents_down.sql)

Nội dung:

- thêm bảng `course_enrollments`
- thêm bảng `video_completion`
- thêm bảng `documents`

Ý nghĩa:

- hệ thống chuyển từ mô hình “xem nội dung” sang mô hình “quản lý học tập”
- có thể theo dõi ai đăng ký khóa học
- có thể theo dõi tiến độ học tập ở mức video
- có thể gắn thêm học liệu cho quá trình học

### V4 - Bổ sung quản lý lớp học

File:

- [V4__add_class_management.sql](/D:/lms-csdlnc/docs/sql/migrations/V4__add_class_management.sql)
- [V4__add_class_management_down.sql](/D:/lms-csdlnc/docs/sql/migrations/V4__add_class_management_down.sql)

Nội dung:

- thêm bảng `classes`
- thêm bảng `class_courses`
- thêm bảng `class_students`
- thêm bảng `class_students_courses_approval`

Ý nghĩa:

- đây là giai đoạn hoàn thiện hơn của hệ thống
- từ quản lý khóa học đơn lẻ, hệ thống phát triển thành mô hình có lớp học
- cho phép giảng viên tổ chức nhiều học viên vào một lớp và gắn nhiều khóa học vào lớp đó

## 3. Cách viết phần này vào báo cáo

Anh có thể viết trong Chương 4 theo hướng:

“Để làm rõ quá trình phát triển cơ sở dữ liệu, báo cáo không chỉ xem schema hiện tại là kết quả cuối cùng, mà còn mô phỏng tiến trình hình thành schema thông qua các phiên bản migration. Mỗi migration phản ánh một giai đoạn mở rộng nghiệp vụ của hệ thống LMS, từ lõi quản lý người dùng và khóa học, đến bài kiểm tra, tiến độ học tập và cuối cùng là quản lý lớp học.”

Ngoài migration `up`, báo cáo cũng có thể nhấn mạnh việc chuẩn bị migration `down` tương ứng cho từng phiên bản. Điều này thể hiện khả năng hoàn tác schema khi triển khai thất bại hoặc khi cần quay lui về trạng thái trước đó, qua đó làm rõ hơn tư duy quản trị và vận hành cơ sở dữ liệu.

## 4. Cách chèn vào Chương 4

Nên thêm một mục:

- `4.x. Mô phỏng quá trình phát triển schema theo migration`

Trong mục này trình bày:

1. V1: khởi tạo lõi
2. V2: thêm quiz
3. V3: thêm ghi danh và tài liệu
4. V4: thêm lớp học
5. với mỗi phiên bản đều có `up` và `down`

## 5. Điều quan trọng cần giữ trung thực

Nên viết:

- “báo cáo mô phỏng quá trình migration”
- “các migration được xây dựng lại dựa trên schema hiện tại”

Không nên viết:

- “dự án đã quản lý migration theo các phiên bản này từ đầu”

vì hiện tại repo gốc của anh không có sẵn lịch sử migration thật theo từng version.
