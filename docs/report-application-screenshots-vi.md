# Phần Ứng dụng. Ảnh minh họa giao diện hệ thống

## Kế hoạch triển khai

Phần ảnh minh họa được triển khai như một phụ lục hoặc một mục cuối của báo cáo nhằm chứng minh ứng dụng LMS đã có giao diện vận hành thực tế, có dữ liệu mẫu và có luồng sử dụng gắn với cơ sở dữ liệu SQL. Các ảnh được chọn từ thư mục `docs/images/web`, ưu tiên những màn hình thể hiện rõ nghiệp vụ chính và quan hệ dữ liệu đã phân tích trong các chương trước.

Các tiêu chí chọn ảnh gồm:

- Ảnh phải thể hiện được một chức năng cụ thể của hệ thống, không chỉ là ảnh trang trí.
- Ảnh nên có dữ liệu hiển thị thực tế như khóa học, học viên, lớp học, tiến độ hoặc nội dung bài học.
- Ảnh cần đại diện cho đủ ba nhóm người dùng chính: học viên, giảng viên và người dùng chưa đăng nhập.
- Thứ tự ảnh nên đi theo luồng sử dụng tự nhiên: đăng ký, xác thực, đăng nhập, xem khóa học, học tập, làm bài kiểm tra, quản lý lớp học.

Danh mục ảnh dự kiến sử dụng:

| Số hình | Nội dung minh họa | File ảnh |
| --- | --- | --- |
| Hình 9.1 | Giao diện đăng ký tài khoản | `Screenshot 2026-05-15 002135.png` |
| Hình 9.2 | Email xác thực tài khoản | `Screenshot 2026-05-15 002604.png` |
| Hình 9.3 | Giao diện đăng nhập | `Screenshot 2026-05-15 002622.png` |
| Hình 9.4 | Trang chủ và danh sách khóa học nổi bật | `Screenshot 2026-05-15 002657.png` |
| Hình 9.5 | Danh sách khóa học đề xuất | `Screenshot 2026-05-15 002748.png` |
| Hình 9.6 | Trang chi tiết khóa học | `Screenshot 2026-05-15 002832.png` |
| Hình 9.7 | Màn hình học video | `Screenshot 2026-05-15 002955.png` |
| Hình 9.8 | Màn hình quản lý câu hỏi/bài kiểm tra | `Screenshot 2026-05-15 120638.png` |
| Hình 9.9 | Hồ sơ cá nhân người dùng | `Screenshot 2026-05-15 120426.png` |
| Hình 9.10 | Quản lý học viên của giảng viên | `Screenshot 2026-05-15 120740.png` |
| Hình 9.11 | Quản lý lớp học của giảng viên | `Screenshot 2026-05-15 120802.png` |
| Hình 9.12 | Quản lý khóa học trong lớp | `Screenshot 2026-05-15 120816.png` |

Khi ghép vào báo cáo Word/PDF, có thể giữ toàn bộ 12 hình nếu cần minh chứng đầy đủ. Nếu muốn rút gọn, nên giữ tối thiểu các hình 9.1, 9.3, 9.4, 9.6, 9.7, 9.8, 9.10 và 9.11.

## 9.1. Mục đích của phần ảnh minh họa

Phần ảnh minh họa giao diện được dùng để làm rõ kết quả triển khai ứng dụng trên nền tảng web. Trong phạm vi đề tài, trọng tâm báo cáo là cơ sở dữ liệu SQL, tuy nhiên giao diện ứng dụng giúp chứng minh rằng các bảng dữ liệu, quan hệ và ràng buộc đã được sử dụng trong các chức năng thực tế như đăng ký tài khoản, đăng nhập, quản lý khóa học, học video, làm bài kiểm tra, theo dõi tiến độ và quản lý lớp học.

Các màn hình được chọn không chỉ minh họa giao diện người dùng mà còn phản ánh trực tiếp các nhóm dữ liệu chính trong cơ sở dữ liệu. Ví dụ, màn hình danh sách khóa học sử dụng dữ liệu từ nhóm bảng `courses`, màn hình học video liên quan đến `chapters`, `videos` và `video_completion`, còn màn hình quản lý lớp học sử dụng các bảng `classes`, `class_courses` và `class_students`.

## 9.2. Nhóm chức năng xác thực tài khoản

Hệ thống hỗ trợ người dùng đăng ký tài khoản mới với thông tin cơ bản như họ tên, tên đăng nhập, email, mật khẩu và vai trò sử dụng. Đây là bước đầu tiên để tạo dữ liệu người dùng trong bảng `users`, đồng thời phục vụ phân quyền giữa học viên và giảng viên trong các chức năng phía sau.

![Hình 9.1. Giao diện đăng ký tài khoản của hệ thống](images/web/Screenshot%202026-05-15%20002135.png)

Sau khi đăng ký, hệ thống gửi email xác thực để kiểm tra tính hợp lệ của địa chỉ email. Cơ chế này giúp hạn chế tài khoản không hợp lệ và bổ sung một bước kiểm soát trước khi người dùng sử dụng đầy đủ các chức năng của hệ thống.

![Hình 9.2. Email xác thực tài khoản được gửi tới người dùng](images/web/Screenshot%202026-05-15%20002604.png)

Sau khi tài khoản hợp lệ, người dùng có thể đăng nhập bằng email hoặc tên đăng nhập. Chức năng đăng nhập kết hợp giữa dữ liệu tài khoản trong cơ sở dữ liệu và cơ chế xác thực ở backend để xác định danh tính, vai trò và quyền truy cập của người dùng.

![Hình 9.3. Giao diện đăng nhập vào hệ thống](images/web/Screenshot%202026-05-15%20002622.png)

## 9.3. Nhóm chức năng khóa học của học viên

Sau khi đăng nhập, học viên được chuyển tới trang chủ của hệ thống. Trang này hiển thị các thông tin giới thiệu, thanh điều hướng, khu vực tìm kiếm và danh sách khóa học nổi bật. Đây là màn hình tổng quan giúp học viên tiếp cận nhanh với nội dung học tập đang được công khai trên hệ thống.

![Hình 9.4. Trang chủ của hệ thống sau khi học viên đăng nhập](images/web/Screenshot%202026-05-15%20002657.png)

Danh sách khóa học đề xuất cho thấy dữ liệu khóa học được trình bày theo dạng thẻ, bao gồm ảnh đại diện, tên khóa học, giảng viên và số lượng học viên. Các thông tin này liên quan trực tiếp đến bảng `courses`, bảng `users` ở vai trò giảng viên và dữ liệu ghi danh của học viên.

![Hình 9.5. Danh sách khóa học đề xuất cho học viên](images/web/Screenshot%202026-05-15%20002748.png)

Khi chọn một khóa học, hệ thống hiển thị trang chi tiết khóa học với mô tả, yêu cầu, giảng viên, nội dung chương học và nút đăng ký. Màn hình này minh họa rõ cấu trúc phân cấp của nội dung học tập: một khóa học gồm nhiều chương, mỗi chương có thể chứa bài giảng video, tài liệu và bài kiểm tra liên quan.

![Hình 9.6. Trang chi tiết khóa học và nội dung học tập](images/web/Screenshot%202026-05-15%20002832.png)

## 9.4. Nhóm chức năng học tập và kiểm tra

Sau khi đã tham gia khóa học, học viên có thể truy cập màn hình học video. Giao diện gồm vùng phát video ở bên trái và danh sách bài học ở bên phải, giúp người học di chuyển giữa các chương và bài giảng. Đây là chức năng sử dụng dữ liệu từ các bảng `courses`, `chapters`, `videos` và có thể ghi nhận tiến độ học tập thông qua bảng `video_completion`.

![Hình 9.7. Giao diện học video và danh sách bài học](images/web/Screenshot%202026-05-15%20002955.png)

Bên cạnh nội dung video, hệ thống còn hỗ trợ tạo và quản lý bài kiểm tra. Màn hình quản lý câu hỏi cho phép giảng viên nhập câu hỏi, các phương án lựa chọn và đánh dấu đáp án đúng. Chức năng này tương ứng với nhóm bảng `quizzes`, `quiz_questions` và `quiz_options` trong cơ sở dữ liệu.

![Hình 9.8. Giao diện quản lý câu hỏi và đáp án của bài kiểm tra](images/web/Screenshot%202026-05-15%20120638.png)

## 9.5. Nhóm chức năng hồ sơ người dùng

Màn hình hồ sơ cá nhân cho phép người dùng xem và cập nhật thông tin tài khoản như tên đăng nhập, email, họ tên và phần giới thiệu. Chức năng này giúp hoàn thiện dữ liệu trong bảng `users`, đồng thời cung cấp thông tin hiển thị cho các màn hình khác như trang khóa học, thông tin giảng viên và khu vực tài khoản cá nhân.

![Hình 9.9. Giao diện hồ sơ cá nhân của người dùng](images/web/Screenshot%202026-05-15%20120426.png)

## 9.6. Nhóm chức năng quản lý của giảng viên

Đối với vai trò giảng viên, hệ thống cung cấp các màn hình quản lý phục vụ theo dõi học viên, khóa học và lớp học. Màn hình quản lý học viên hiển thị danh sách học viên đã tham gia khóa học, ngày đăng ký, tiến độ học tập và trạng thái hoàn thành. Đây là ví dụ cho việc tổng hợp dữ liệu từ nhiều bảng như `users`, `courses`, `course_enrollments` và `video_completion`.

![Hình 9.10. Giao diện quản lý học viên của giảng viên](images/web/Screenshot%202026-05-15%20120740.png)

Màn hình quản lý lớp học cho phép giảng viên xem danh sách lớp, số lượng học viên, số khóa học được gán và trạng thái hoạt động của lớp. Chức năng này minh họa nhóm dữ liệu lớp học trong cơ sở dữ liệu, đặc biệt là các bảng `classes`, `class_students` và `class_courses`.

![Hình 9.11. Giao diện quản lý lớp học của giảng viên](images/web/Screenshot%202026-05-15%20120802.png)

Khi truy cập chi tiết một lớp học, giảng viên có thể quản lý các khóa học được gán cho lớp. Màn hình này thể hiện quan hệ nhiều-nhiều giữa lớp học và khóa học thông qua bảng trung gian `class_courses`, đồng thời cho thấy hệ thống có thể tổ chức nội dung học tập theo từng nhóm học viên thay vì chỉ theo danh sách khóa học công khai.

![Hình 9.12. Giao diện quản lý khóa học trong một lớp học](images/web/Screenshot%202026-05-15%20120816.png)

## 9.7. Nhận xét chung

Các ảnh minh họa cho thấy ứng dụng đã có đầy đủ các màn hình chính phục vụ một hệ thống LMS cơ bản. Ở phía học viên, hệ thống hỗ trợ đăng ký, đăng nhập, xem danh sách khóa học, xem chi tiết khóa học, học video và quản lý hồ sơ cá nhân. Ở phía giảng viên, hệ thống hỗ trợ quản lý học viên, quản lý bài kiểm tra, quản lý lớp học và gán khóa học cho lớp.

Về mặt cơ sở dữ liệu, các màn hình này chứng minh rằng lược đồ SQL không tồn tại độc lập mà được sử dụng trực tiếp trong các chức năng của ứng dụng. Dữ liệu người dùng, khóa học, chương học, video, bài kiểm tra, ghi danh, tiến độ học tập và lớp học đều được thể hiện qua giao diện, qua đó củng cố tính thực tế của phần phân tích và thiết kế cơ sở dữ liệu đã trình bày trong các chương trước.
