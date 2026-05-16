# Chương 8. Ứng dụng và ảnh minh họa giao diện

## 8.1. Mục đích minh họa giao diện

Phần này trình bày các màn hình tiêu biểu của ứng dụng LMS để thể hiện kết quả triển khai hệ thống trên nền tảng web. Các giao diện cho thấy dữ liệu SQL được khai thác trực tiếp trong những chức năng thực tế như xác thực tài khoản, quản lý khóa học, học video, làm bài kiểm tra, theo dõi tiến độ và quản lý lớp học.

Các hình ảnh được sắp xếp theo luồng sử dụng chính của hệ thống, bao gồm xác thực tài khoản, tra cứu khóa học, học tập, làm bài kiểm tra, quản lý lớp học và quản lý nội dung của giảng viên. Qua đó có thể thấy các nhóm dữ liệu như người dùng, khóa học, chương học, video, tài liệu, bài kiểm tra, ghi danh, tiến độ học tập và lớp học đều được khai thác trực tiếp từ cơ sở dữ liệu trong quá trình vận hành ứng dụng.

## 8.2. Nhóm chức năng xác thực tài khoản

Hệ thống cung cấp chức năng đăng ký tài khoản cho người dùng mới. Người dùng nhập các thông tin cơ bản như họ tên, tên đăng nhập, email và mật khẩu. Đây là bước khởi tạo dữ liệu người dùng trong hệ thống, đồng thời là cơ sở để phân quyền truy cập theo từng vai trò.

![Hình 8.1. Giao diện đăng ký tài khoản của hệ thống](images/web/Screenshot%202026-05-15%20002135.png)

Sau khi hoàn tất đăng ký, hệ thống yêu cầu người dùng kiểm tra hộp thư để xác thực tài khoản. Bước này giúp kiểm soát tính hợp lệ của địa chỉ email trước khi tài khoản được sử dụng đầy đủ.

![Hình 8.2. Màn hình thông báo kiểm tra hộp thư xác thực](images/web/Screenshot%202026-05-15%20002501.png)

Email xác thực được gửi tới địa chỉ mà người dùng đã đăng ký. Nội dung email có liên kết xác thực, cho phép hệ thống cập nhật trạng thái tài khoản sau khi người dùng xác nhận.

![Hình 8.3. Email xác thực tài khoản được gửi tới người dùng](images/web/Screenshot%202026-05-15%20002604.png)

Sau khi tài khoản hợp lệ, người dùng có thể đăng nhập vào hệ thống bằng email hoặc tên đăng nhập. Chức năng đăng nhập kết hợp dữ liệu tài khoản trong cơ sở dữ liệu với cơ chế xác thực ở backend để xác định danh tính, vai trò và quyền truy cập của người dùng.

![Hình 8.4. Giao diện đăng nhập vào hệ thống](images/web/Screenshot%202026-05-15%20002622.png)

## 8.3. Nhóm chức năng khóa học của học viên

Sau khi đăng nhập, học viên được chuyển tới trang chủ của hệ thống. Trang này hiển thị thanh điều hướng, khu vực tìm kiếm và các khóa học nổi bật. Đây là màn hình tổng quan giúp học viên tiếp cận nhanh với các nội dung học tập đang được công khai.

![Hình 8.5. Trang chủ của hệ thống sau khi học viên đăng nhập](images/web/Screenshot%202026-05-15%20002657.png)

Danh sách khóa học được trình bày theo dạng thẻ, bao gồm ảnh đại diện, tên khóa học, giảng viên và số lượng học viên. Các thông tin này được tổng hợp từ dữ liệu khóa học, dữ liệu người dùng ở vai trò giảng viên và dữ liệu ghi danh.

![Hình 8.6. Danh sách khóa học đề xuất cho học viên](images/web/Screenshot%202026-05-15%20002748.png)

Khi chọn một khóa học, hệ thống hiển thị trang chi tiết khóa học với các thông tin như mô tả, yêu cầu, giảng viên, nội dung học tập và thao tác đăng ký. Màn hình này thể hiện cách ứng dụng tổ chức dữ liệu khóa học thành một đơn vị học tập hoàn chỉnh.

![Hình 8.7. Trang chi tiết khóa học](images/web/Screenshot%202026-05-15%20002832.png)

Phần nội dung khóa học hiển thị các chương, bài giảng, tài liệu và bài kiểm tra đi kèm. Đây là minh chứng trực quan cho cấu trúc phân cấp của dữ liệu học tập, trong đó một khóa học có thể gồm nhiều chương, mỗi chương có thể chứa nhiều bài học và tài nguyên liên quan.

![Hình 8.8. Cấu trúc nội dung khóa học gồm chương, bài giảng, tài liệu và bài kiểm tra](images/web/Screenshot%202026-05-15%20002857.png)

## 8.4. Nhóm chức năng học tập và kiểm tra

Sau khi tham gia khóa học, học viên có thể truy cập màn hình học video. Giao diện gồm vùng phát video và danh sách bài học theo chương, giúp người học theo dõi nội dung một cách có trình tự.

![Hình 8.9. Giao diện học video và danh sách bài học](images/web/Screenshot%202026-05-15%20002955.png)

Trước khi làm bài kiểm tra, hệ thống hiển thị các thông tin như thời gian làm bài, số câu hỏi và điểm đạt yêu cầu. Các thông tin này giúp người học nắm được điều kiện hoàn thành trước khi bắt đầu.

![Hình 8.10. Thông tin bài kiểm tra trước khi học viên làm bài](images/web/Screenshot%202026-05-15%20003050.png)

Khi bắt đầu làm bài, hệ thống hiển thị danh sách câu hỏi, các phương án trả lời, tiến độ làm bài và thời gian còn lại. Màn hình này thể hiện quá trình học viên tương tác trực tiếp với dữ liệu câu hỏi và đáp án của bài kiểm tra.

![Hình 8.11. Giao diện làm bài kiểm tra của học viên](images/web/Screenshot%202026-05-15%20003059.png)

Sau khi nộp bài, hệ thống hiển thị điểm số và trạng thái đạt hoặc không đạt. Kết quả này phản ánh dữ liệu lượt làm bài của học viên, đồng thời là cơ sở để hệ thống theo dõi quá trình học tập.

![Hình 8.12. Kết quả hoàn thành bài kiểm tra của học viên](images/web/Screenshot%202026-05-15%20003137.png)

Người học có thể xem lại chi tiết bài làm sau khi hoàn thành. Màn hình này hiển thị đáp án đã chọn, đáp án đúng và trạng thái đúng sai của từng câu hỏi, giúp minh họa rõ hơn dữ liệu câu trả lời sau khi hệ thống chấm điểm.

![Hình 8.13. Chi tiết bài làm và đáp án sau khi hoàn thành bài kiểm tra](images/web/Screenshot%202026-05-15%20003156.png)

Hệ thống cũng cung cấp màn hình danh sách khóa học đã đăng ký. Màn hình này giúp học viên theo dõi các khóa học đang tham gia và thể hiện quan hệ giữa học viên với các khóa học đã ghi danh.

![Hình 8.14. Danh sách khóa học đã đăng ký của học viên](images/web/Screenshot%202026-05-15%20003314.png)

## 8.5. Nhóm chức năng lớp học của học viên

Bên cạnh việc học theo các khóa học công khai, hệ thống hỗ trợ học viên tham gia lớp học bằng mã lớp. Chức năng này cho phép tổ chức người học theo nhóm, phù hợp với mô hình lớp học do giảng viên quản lý.

![Hình 8.15. Giao diện tham gia lớp học bằng mã lớp](images/web/Screenshot%202026-05-15%20104438.png)

Sau khi tham gia lớp, học viên có thể xem danh sách lớp học của mình. Màn hình này thể hiện dữ liệu lớp học, thông tin giảng viên và thời điểm học viên tham gia lớp.

![Hình 8.16. Danh sách lớp học của học viên](images/web/Screenshot%202026-05-15%20112559.png)

## 8.6. Nhóm chức năng hồ sơ người dùng

Màn hình hồ sơ cá nhân cho phép người dùng xem và cập nhật các thông tin tài khoản như tên đăng nhập, email, họ tên và phần giới thiệu. Đây là nhóm chức năng hỗ trợ quản lý dữ liệu cá nhân của người dùng trong hệ thống.

![Hình 8.17. Giao diện hồ sơ cá nhân của người dùng](images/web/Screenshot%202026-05-15%20120426.png)

## 8.7. Nhóm chức năng quản lý của giảng viên

Đối với vai trò giảng viên, hệ thống cung cấp màn hình thống kê tổng quan để theo dõi số khóa học, số video, tổng số học viên và tiến độ trung bình. Màn hình này cho thấy dữ liệu trong hệ thống không chỉ được lưu trữ riêng lẻ mà còn được tổng hợp để phục vụ quản lý.

![Hình 8.18. Màn hình thống kê tổng quan của giảng viên](images/web/Screenshot%202026-05-15%20120509.png)

Màn hình quản lý khóa học cho phép giảng viên xem các khóa học mình phụ trách, trạng thái công khai, số học viên và số lượng nội dung đã có. Đây là chức năng phục vụ quá trình tổ chức và duy trì nội dung giảng dạy.

![Hình 8.19. Giao diện quản lý khóa học của giảng viên](images/web/Screenshot%202026-05-15%20120528.png)

Trong màn hình xây dựng nội dung khóa học, giảng viên có thể quản lý chương, bài học, tài liệu và bài kiểm tra. Chức năng này phản ánh trực tiếp cấu trúc nội dung học tập đã được thiết kế trong cơ sở dữ liệu.

![Hình 8.20. Giao diện xây dựng nội dung khóa học](images/web/Screenshot%202026-05-15%20120553.png)

Màn hình quản lý bài kiểm tra hiển thị danh sách quiz, khóa học liên quan, vị trí gán, số câu hỏi, thời gian làm bài và điểm đạt. Chức năng này phục vụ việc tổ chức đánh giá năng lực học viên theo từng nội dung học tập.

![Hình 8.21. Giao diện quản lý bài kiểm tra của giảng viên](images/web/Screenshot%202026-05-15%20120612.png)

Màn hình quản lý học viên hiển thị danh sách học viên đã tham gia khóa học, ngày đăng ký, tiến độ học tập và trạng thái hoàn thành. Đây là ví dụ cho việc tổng hợp dữ liệu học viên, khóa học, ghi danh và tiến độ để hỗ trợ giảng viên theo dõi quá trình học.

![Hình 8.22. Giao diện quản lý học viên và tiến độ học tập](images/web/Screenshot%202026-05-15%20120740.png)

Màn hình quản lý lớp học cho phép giảng viên xem danh sách lớp, số lượng học viên, số khóa học được gán và trạng thái hoạt động của lớp. Chức năng này minh họa nhóm nghiệp vụ quản lý lớp học của hệ thống.

![Hình 8.23. Giao diện quản lý lớp học của giảng viên](images/web/Screenshot%202026-05-15%20120802.png)

Khi truy cập chi tiết một lớp học, giảng viên có thể quản lý các khóa học được gán cho lớp. Màn hình này thể hiện quan hệ giữa lớp học và khóa học, qua đó cho thấy hệ thống có thể tổ chức nội dung học tập theo từng nhóm học viên thay vì chỉ theo danh sách khóa học công khai.

![Hình 8.24. Giao diện quản lý khóa học trong một lớp học](images/web/Screenshot%202026-05-15%20120816.png)

## 8.8. Nhận xét chung

Các màn hình minh họa cho thấy ứng dụng đã triển khai được các chức năng chính của một hệ thống quản lý học tập trực tuyến. Ở phía học viên, hệ thống hỗ trợ đăng ký, đăng nhập, xem khóa học, học video, làm bài kiểm tra, theo dõi khóa học đã đăng ký, tham gia lớp học và quản lý hồ sơ cá nhân. Ở phía giảng viên, hệ thống hỗ trợ thống kê tổng quan, quản lý khóa học, xây dựng nội dung học tập, quản lý bài kiểm tra, quản lý học viên, quản lý lớp học và gán khóa học cho lớp.

Về mặt cơ sở dữ liệu, các giao diện trên cho thấy lược đồ SQL được sử dụng trực tiếp trong quá trình vận hành ứng dụng. Dữ liệu người dùng, khóa học, chương học, video, tài liệu, bài kiểm tra, ghi danh, tiến độ học tập và lớp học đều được thể hiện qua các chức năng cụ thể. Điều này góp phần chứng minh tính thực tế của phần phân tích và thiết kế cơ sở dữ liệu đã trình bày trong các chương trước.
