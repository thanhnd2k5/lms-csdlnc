# Phần Ứng dụng. Ảnh minh họa giao diện hệ thống

## Kế hoạch triển khai

Phần ảnh minh họa được triển khai như một phụ lục hoặc một mục cuối của báo cáo nhằm chứng minh ứng dụng LMS đã có giao diện vận hành thực tế, có dữ liệu mẫu và có luồng sử dụng gắn với cơ sở dữ liệu SQL. Sau khi rà soát toàn bộ 31 ảnh trong thư mục `docs/images/web`, bộ ảnh nên được chia thành hai nhóm:

- Bộ ảnh chính dùng trong báo cáo: các màn hình rõ nghiệp vụ, có dữ liệu thực tế, liên hệ tốt với thiết kế CSDL.
- Bộ ảnh dự phòng: các màn hình cùng luồng nhưng trùng ý, dùng khi cần minh họa chi tiết hơn trong Word/PDF.

Tiêu chí chọn ảnh:

- Ưu tiên ảnh thể hiện chức năng, dữ liệu và quan hệ nghiệp vụ thay vì chỉ đẹp giao diện.
- Ưu tiên ảnh có thông tin như khóa học, học viên, lớp học, bài học, quiz, tiến độ hoặc trạng thái.
- Bảo đảm đủ ba nhóm ngữ cảnh: người dùng chưa đăng nhập, học viên và giảng viên.
- Sắp xếp ảnh theo luồng sử dụng tự nhiên: xác thực tài khoản, khám phá khóa học, học tập, kiểm tra, quản lý lớp học.
- Không đưa quá nhiều ảnh gần giống nhau vào thân báo cáo để tránh loãng nội dung.

## 9.1. Rà soát toàn bộ ảnh hiện có

| File ảnh | Nội dung nhận diện | Đánh giá sử dụng |
| --- | --- | --- |
| `Screenshot 2026-05-15 002135.png` | Đăng ký tài khoản bước nhập thông tin | Dùng chính |
| `Screenshot 2026-05-15 002238.png` | Đăng ký bước nhập mật khẩu | Dự phòng |
| `Screenshot 2026-05-15 002333.png` | Đăng ký bước chọn vai trò học viên/giảng viên | Dự phòng |
| `Screenshot 2026-05-15 002501.png` | Màn hình yêu cầu kiểm tra hộp thư | Dùng chính |
| `Screenshot 2026-05-15 002604.png` | Email xác thực trong Gmail | Dùng chính nếu cần chứng minh email thật |
| `Screenshot 2026-05-15 002622.png` | Đăng nhập tài khoản | Dùng chính |
| `Screenshot 2026-05-15 002657.png` | Trang chủ sau đăng nhập | Dùng chính |
| `Screenshot 2026-05-15 002730.png` | Khu vực khóa học nổi bật | Dự phòng |
| `Screenshot 2026-05-15 002748.png` | Danh sách khóa học đề xuất | Dùng chính |
| `Screenshot 2026-05-15 002832.png` | Trang chi tiết khóa học, phần đầu | Dùng chính |
| `Screenshot 2026-05-15 002857.png` | Nội dung khóa học gồm chương, bài giảng, tài liệu, quiz | Dùng chính |
| `Screenshot 2026-05-15 002910.png` | Yêu cầu khóa học và thông tin giảng viên | Dự phòng |
| `Screenshot 2026-05-15 002955.png` | Màn hình học video | Dùng chính |
| `Screenshot 2026-05-15 003021.png` | Quiz liên quan đang khóa trong màn hình học | Dự phòng |
| `Screenshot 2026-05-15 003050.png` | Thông tin bài kiểm tra trước khi làm | Dùng chính |
| `Screenshot 2026-05-15 003137.png` | Kết quả hoàn thành bài kiểm tra | Dùng chính |
| `Screenshot 2026-05-15 003156.png` | Xem lại bài làm và đáp án đúng | Dùng chính |
| `Screenshot 2026-05-15 003231.png` | AI Gemini giải thích câu hỏi | Dùng chính nếu muốn nhấn tính năng nâng cao |
| `Screenshot 2026-05-15 003314.png` | Danh sách khóa học đã đăng ký của học viên | Dùng chính |
| `Screenshot 2026-05-15 104438.png` | Modal tham gia lớp bằng mã lớp | Dùng chính |
| `Screenshot 2026-05-15 112559.png` | Lớp học của tôi | Dùng chính |
| `Screenshot 2026-05-15 112631.png` | Chi tiết lớp học và khóa học trong lớp | Dùng chính |
| `Screenshot 2026-05-15 120426.png` | Hồ sơ cá nhân | Dùng chính |
| `Screenshot 2026-05-15 120509.png` | Thống kê tổng quan của giảng viên | Dùng chính |
| `Screenshot 2026-05-15 120528.png` | Quản lý khóa học của giảng viên | Dùng chính |
| `Screenshot 2026-05-15 120553.png` | Xây dựng nội dung khóa học | Dùng chính |
| `Screenshot 2026-05-15 120612.png` | Quản lý quiz | Dùng chính |
| `Screenshot 2026-05-15 120638.png` | Chỉnh sửa câu hỏi và đáp án quiz | Dùng chính |
| `Screenshot 2026-05-15 120740.png` | Quản lý học viên và tiến độ | Dùng chính |
| `Screenshot 2026-05-15 120802.png` | Quản lý lớp học | Dùng chính |
| `Screenshot 2026-05-15 120816.png` | Quản lý khóa học trong lớp | Dùng chính |

Nếu báo cáo cần gọn, nên chọn khoảng 16-20 ảnh chính. Nếu muốn trình bày thật đầy đủ trong phụ lục, có thể dùng toàn bộ nhóm "Dùng chính" và bỏ các ảnh dự phòng bị trùng ý.

## 9.2. Bộ ảnh đề xuất đưa vào báo cáo

| Số hình | Nội dung minh họa | File ảnh |
| --- | --- | --- |
| Hình 9.1 | Đăng ký tài khoản | `Screenshot 2026-05-15 002135.png` |
| Hình 9.2 | Thông báo kiểm tra hộp thư | `Screenshot 2026-05-15 002501.png` |
| Hình 9.3 | Email xác thực tài khoản | `Screenshot 2026-05-15 002604.png` |
| Hình 9.4 | Đăng nhập hệ thống | `Screenshot 2026-05-15 002622.png` |
| Hình 9.5 | Trang chủ học viên | `Screenshot 2026-05-15 002657.png` |
| Hình 9.6 | Danh sách khóa học | `Screenshot 2026-05-15 002748.png` |
| Hình 9.7 | Chi tiết khóa học | `Screenshot 2026-05-15 002832.png` |
| Hình 9.8 | Cấu trúc nội dung khóa học | `Screenshot 2026-05-15 002857.png` |
| Hình 9.9 | Màn hình học video | `Screenshot 2026-05-15 002955.png` |
| Hình 9.10 | Thông tin bài kiểm tra | `Screenshot 2026-05-15 003050.png` |
| Hình 9.11 | Kết quả bài kiểm tra | `Screenshot 2026-05-15 003137.png` |
| Hình 9.12 | Danh sách khóa học đã đăng ký | `Screenshot 2026-05-15 003314.png` |
| Hình 9.13 | Tham gia lớp học bằng mã lớp | `Screenshot 2026-05-15 104438.png` |
| Hình 9.14 | Lớp học của học viên | `Screenshot 2026-05-15 112559.png` |
| Hình 9.15 | Hồ sơ cá nhân | `Screenshot 2026-05-15 120426.png` |
| Hình 9.16 | Thống kê tổng quan của giảng viên | `Screenshot 2026-05-15 120509.png` |
| Hình 9.17 | Quản lý khóa học | `Screenshot 2026-05-15 120528.png` |
| Hình 9.18 | Xây dựng nội dung khóa học | `Screenshot 2026-05-15 120553.png` |
| Hình 9.19 | Quản lý quiz | `Screenshot 2026-05-15 120612.png` |
| Hình 9.20 | Quản lý học viên và tiến độ | `Screenshot 2026-05-15 120740.png` |
| Hình 9.21 | Quản lý lớp học | `Screenshot 2026-05-15 120802.png` |
| Hình 9.22 | Quản lý khóa học trong lớp | `Screenshot 2026-05-15 120816.png` |

## 9.3. Mục đích của phần ảnh minh họa

Phần ảnh minh họa giao diện được dùng để làm rõ kết quả triển khai ứng dụng trên nền tảng web. Trong phạm vi đề tài, trọng tâm báo cáo là cơ sở dữ liệu SQL, tuy nhiên giao diện ứng dụng giúp chứng minh rằng các bảng dữ liệu, quan hệ và ràng buộc đã được sử dụng trong các chức năng thực tế như đăng ký tài khoản, đăng nhập, quản lý khóa học, học video, làm bài kiểm tra, theo dõi tiến độ và quản lý lớp học.

Các màn hình được chọn không chỉ minh họa giao diện người dùng mà còn phản ánh trực tiếp các nhóm dữ liệu chính trong cơ sở dữ liệu. Ví dụ, màn hình danh sách khóa học sử dụng dữ liệu từ nhóm bảng `courses`, màn hình học video liên quan đến `chapters`, `videos` và `video_completion`, màn hình bài kiểm tra liên quan đến `quizzes`, `quiz_questions`, `quiz_options`, còn màn hình quản lý lớp học sử dụng các bảng `classes`, `class_courses` và `class_students`.

## 9.4. Nhóm chức năng xác thực tài khoản

Hệ thống hỗ trợ người dùng đăng ký tài khoản mới với thông tin cơ bản như họ tên, tên đăng nhập, email, mật khẩu và vai trò sử dụng. Đây là bước đầu tiên để tạo dữ liệu người dùng trong bảng `users`, đồng thời phục vụ phân quyền giữa học viên và giảng viên trong các chức năng phía sau.

![Hình 9.1. Giao diện đăng ký tài khoản của hệ thống](images/web/Screenshot%202026-05-15%20002135.png)

Sau khi đăng ký, hệ thống yêu cầu người dùng kiểm tra hộp thư để xác thực tài khoản. Màn hình này cho thấy ứng dụng không chỉ lưu tài khoản vào cơ sở dữ liệu mà còn có bước kiểm soát trạng thái xác thực email trước khi tài khoản được sử dụng đầy đủ.

![Hình 9.2. Màn hình thông báo kiểm tra hộp thư xác thực](images/web/Screenshot%202026-05-15%20002501.png)

Email xác thực được gửi tới địa chỉ mà người dùng đã đăng ký. Ảnh minh họa trong Gmail giúp chứng minh luồng xác thực email được triển khai thực tế, có liên kết xác thực và nội dung hướng dẫn rõ ràng cho người dùng.

![Hình 9.3. Email xác thực tài khoản được gửi tới người dùng](images/web/Screenshot%202026-05-15%20002604.png)

Sau khi tài khoản hợp lệ, người dùng có thể đăng nhập bằng email hoặc tên đăng nhập. Chức năng đăng nhập kết hợp giữa dữ liệu tài khoản trong cơ sở dữ liệu và cơ chế xác thực ở backend để xác định danh tính, vai trò và quyền truy cập của người dùng.

![Hình 9.4. Giao diện đăng nhập vào hệ thống](images/web/Screenshot%202026-05-15%20002622.png)

## 9.5. Nhóm chức năng khóa học của học viên

Sau khi đăng nhập, học viên được chuyển tới trang chủ của hệ thống. Trang này hiển thị các thông tin giới thiệu, thanh điều hướng, khu vực tìm kiếm và danh sách khóa học nổi bật. Đây là màn hình tổng quan giúp học viên tiếp cận nhanh với nội dung học tập đang được công khai trên hệ thống.

![Hình 9.5. Trang chủ của hệ thống sau khi học viên đăng nhập](images/web/Screenshot%202026-05-15%20002657.png)

Danh sách khóa học đề xuất cho thấy dữ liệu khóa học được trình bày theo dạng thẻ, bao gồm ảnh đại diện, tên khóa học, giảng viên và số lượng học viên. Các thông tin này liên quan trực tiếp đến bảng `courses`, bảng `users` ở vai trò giảng viên và dữ liệu ghi danh của học viên.

![Hình 9.6. Danh sách khóa học đề xuất cho học viên](images/web/Screenshot%202026-05-15%20002748.png)

Khi chọn một khóa học, hệ thống hiển thị trang chi tiết khóa học với mô tả, yêu cầu, giảng viên, nội dung chương học và nút đăng ký. Màn hình này minh họa rõ cấu trúc phân cấp của nội dung học tập: một khóa học gồm nhiều chương, mỗi chương có thể chứa bài giảng video, tài liệu và bài kiểm tra liên quan.

![Hình 9.7. Trang chi tiết khóa học](images/web/Screenshot%202026-05-15%20002832.png)

Phần nội dung khóa học hiển thị các chương, bài giảng, tài liệu và quiz đi kèm. Đây là ảnh rất nên dùng vì thể hiện trực tiếp quan hệ giữa `courses`, `chapters`, `videos`, `documents` và `quizzes`.

![Hình 9.8. Cấu trúc nội dung khóa học gồm chương, bài giảng, tài liệu và quiz](images/web/Screenshot%202026-05-15%20002857.png)

## 9.6. Nhóm chức năng học tập và kiểm tra

Sau khi đã tham gia khóa học, học viên có thể truy cập màn hình học video. Giao diện gồm vùng phát video ở bên trái và danh sách bài học ở bên phải, giúp người học di chuyển giữa các chương và bài giảng. Đây là chức năng sử dụng dữ liệu từ các bảng `courses`, `chapters`, `videos` và có thể ghi nhận tiến độ học tập thông qua bảng `video_completion`.

![Hình 9.9. Giao diện học video và danh sách bài học](images/web/Screenshot%202026-05-15%20002955.png)

Trước khi làm bài kiểm tra, hệ thống hiển thị thông tin về thời gian, số câu hỏi và điểm đạt yêu cầu. Dữ liệu này tương ứng với cấu hình của bài kiểm tra trong bảng `quizzes`, đồng thời giúp người học hiểu điều kiện hoàn thành trước khi bắt đầu.

![Hình 9.10. Thông tin bài kiểm tra trước khi học viên làm bài](images/web/Screenshot%202026-05-15%20003050.png)

Sau khi nộp bài, hệ thống hiển thị điểm số và trạng thái đạt/không đạt. Kết quả này phản ánh dữ liệu lượt làm bài trong bảng `quiz_attempts`, là cơ sở để theo dõi kết quả học tập của học viên.

![Hình 9.11. Kết quả hoàn thành bài kiểm tra của học viên](images/web/Screenshot%202026-05-15%20003137.png)

Hệ thống cũng cung cấp màn hình các khóa học học viên đã đăng ký, giúp người học theo dõi hành trình học tập của mình. Chức năng này gắn với bảng `course_enrollments` và thể hiện quan hệ nhiều-nhiều giữa học viên và khóa học.

![Hình 9.12. Danh sách khóa học đã đăng ký của học viên](images/web/Screenshot%202026-05-15%20003314.png)

## 9.7. Nhóm chức năng lớp học của học viên

Bên cạnh việc học theo khóa học công khai, hệ thống hỗ trợ học viên tham gia lớp học bằng mã lớp. Màn hình nhập mã lớp thể hiện cách hệ thống kiểm soát việc tham gia lớp dựa trên `class_code`, đồng thời mở rộng mô hình học tập từ khóa học đơn lẻ sang lớp học có tổ chức.

![Hình 9.13. Giao diện tham gia lớp học bằng mã lớp](images/web/Screenshot%202026-05-15%20104438.png)

Sau khi tham gia lớp, học viên có thể xem danh sách lớp học của mình. Màn hình này sử dụng dữ liệu từ nhóm bảng `classes` và `class_students`, qua đó thể hiện quan hệ giữa người học và lớp học.

![Hình 9.14. Danh sách lớp học của học viên](images/web/Screenshot%202026-05-15%20112559.png)

## 9.8. Nhóm chức năng hồ sơ người dùng

Màn hình hồ sơ cá nhân cho phép người dùng xem và cập nhật thông tin tài khoản như tên đăng nhập, email, họ tên và phần giới thiệu. Chức năng này giúp hoàn thiện dữ liệu trong bảng `users`, đồng thời cung cấp thông tin hiển thị cho các màn hình khác như trang khóa học, thông tin giảng viên và khu vực tài khoản cá nhân.

![Hình 9.15. Giao diện hồ sơ cá nhân của người dùng](images/web/Screenshot%202026-05-15%20120426.png)

## 9.9. Nhóm chức năng quản lý của giảng viên

Đối với vai trò giảng viên, hệ thống cung cấp màn hình thống kê tổng quan để theo dõi số khóa học, số video, tổng học viên và tiến độ trung bình. Đây là màn hình tổng hợp dữ liệu từ nhiều nhóm bảng, giúp chứng minh dữ liệu SQL được sử dụng để tạo thông tin quản trị chứ không chỉ lưu trữ riêng lẻ.

![Hình 9.16. Màn hình thống kê tổng quan của giảng viên](images/web/Screenshot%202026-05-15%20120509.png)

Màn hình quản lý khóa học cho phép giảng viên xem các khóa học mình phụ trách, trạng thái công khai, số học viên và số nội dung đã có. Chức năng này liên quan đến bảng `courses`, `users`, `course_enrollments`, `videos` và `documents`.

![Hình 9.17. Giao diện quản lý khóa học của giảng viên](images/web/Screenshot%202026-05-15%20120528.png)

Trong màn hình xây dựng nội dung khóa học, giảng viên có thể quản lý chương, bài học, tài liệu và quiz. Đây là ảnh minh họa quan trọng cho cấu trúc phân cấp của nội dung học tập trong cơ sở dữ liệu.

![Hình 9.18. Giao diện xây dựng nội dung khóa học](images/web/Screenshot%202026-05-15%20120553.png)

Màn hình quản lý quiz hiển thị danh sách bài kiểm tra, khóa học liên quan, vị trí gán, số câu hỏi, thời gian và điểm đạt. Chức năng này sử dụng dữ liệu từ nhóm bảng `quizzes`, `quiz_questions` và quan hệ gắn quiz với khóa học, chương hoặc video.

![Hình 9.19. Giao diện quản lý quiz của giảng viên](images/web/Screenshot%202026-05-15%20120612.png)

Màn hình quản lý học viên hiển thị danh sách học viên đã tham gia khóa học, ngày đăng ký, tiến độ học tập và trạng thái hoàn thành. Đây là ví dụ cho việc tổng hợp dữ liệu từ nhiều bảng như `users`, `courses`, `course_enrollments` và `video_completion`.

![Hình 9.20. Giao diện quản lý học viên và tiến độ học tập](images/web/Screenshot%202026-05-15%20120740.png)

Màn hình quản lý lớp học cho phép giảng viên xem danh sách lớp, số lượng học viên, số khóa học được gán và trạng thái hoạt động của lớp. Chức năng này minh họa nhóm dữ liệu lớp học trong cơ sở dữ liệu, đặc biệt là các bảng `classes`, `class_students` và `class_courses`.

![Hình 9.21. Giao diện quản lý lớp học của giảng viên](images/web/Screenshot%202026-05-15%20120802.png)

Khi truy cập chi tiết một lớp học, giảng viên có thể quản lý các khóa học được gán cho lớp. Màn hình này thể hiện quan hệ nhiều-nhiều giữa lớp học và khóa học thông qua bảng trung gian `class_courses`, đồng thời cho thấy hệ thống có thể tổ chức nội dung học tập theo từng nhóm học viên thay vì chỉ theo danh sách khóa học công khai.

![Hình 9.22. Giao diện quản lý khóa học trong một lớp học](images/web/Screenshot%202026-05-15%20120816.png)

## 9.10. Nhận xét chung

Các ảnh minh họa cho thấy ứng dụng đã có đầy đủ các màn hình chính phục vụ một hệ thống LMS cơ bản. Ở phía học viên, hệ thống hỗ trợ đăng ký, đăng nhập, xem danh sách khóa học, xem chi tiết khóa học, học video, làm bài kiểm tra, theo dõi khóa học đã đăng ký, tham gia lớp học và quản lý hồ sơ cá nhân. Ở phía giảng viên, hệ thống hỗ trợ thống kê tổng quan, quản lý khóa học, xây dựng nội dung học tập, quản lý quiz, quản lý học viên, quản lý lớp học và gán khóa học cho lớp.

Về mặt cơ sở dữ liệu, các màn hình này chứng minh rằng lược đồ SQL không tồn tại độc lập mà được sử dụng trực tiếp trong các chức năng của ứng dụng. Dữ liệu người dùng, khóa học, chương học, video, tài liệu, bài kiểm tra, ghi danh, tiến độ học tập và lớp học đều được thể hiện qua giao diện, qua đó củng cố tính thực tế của phần phân tích và thiết kế cơ sở dữ liệu đã trình bày trong các chương trước.
