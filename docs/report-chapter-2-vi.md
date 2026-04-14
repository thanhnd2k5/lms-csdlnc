# Chương 2. Mô tả bài toán và chức năng hệ thống

## 2.1. Bài toán nghiệp vụ

Đề tài hướng tới bài toán xây dựng một hệ thống quản lý học tập trực tuyến trên nền tảng web. Hệ thống cần hỗ trợ việc tổ chức khóa học, quản lý nội dung học tập, theo dõi tiến độ, lưu kết quả kiểm tra và quản lý học viên theo từng lớp học.

Trong thực tế, nếu các thông tin này được quản lý rời rạc hoặc thủ công, dữ liệu sẽ khó đồng bộ, khó tổng hợp và dễ phát sinh sai lệch. Vì vậy, bài toán đặt ra không chỉ là xây dựng các chức năng phục vụ dạy và học, mà còn là tổ chức một mô hình dữ liệu đủ chặt chẽ để quản lý thống nhất toàn bộ thông tin của hệ thống.

## 2.2. Đối tượng sử dụng hệ thống

Hệ thống được xây dựng với ba nhóm người dùng chính:

- Quản trị viên
- Giảng viên
- Học viên

Mỗi nhóm người dùng có vai trò, quyền hạn và nhu cầu khai thác dữ liệu riêng.

Quản trị viên là nhóm người dùng chịu trách nhiệm quản lý tổng thể hệ thống. Nhóm này cần theo dõi thông tin người dùng, kiểm soát các thực thể dữ liệu quan trọng và hỗ trợ đảm bảo hệ thống vận hành ổn định. Từ góc độ cơ sở dữ liệu, vai trò quản trị viên liên quan trực tiếp đến việc quản lý dữ liệu người dùng và kiểm soát tính toàn vẹn của toàn hệ thống.

Giảng viên là nhóm người dùng trực tiếp tạo lập và quản lý nội dung đào tạo. Giảng viên có thể tạo khóa học, tổ chức chương học, đăng video, bổ sung tài liệu, tạo bài kiểm tra và theo dõi quá trình học tập của học viên. Vì vậy, dữ liệu gắn với giảng viên xuất hiện trong nhiều bảng quan trọng như khóa học, bài kiểm tra, tài liệu và lớp học.

Học viên là nhóm người dùng tham gia vào quá trình học tập. Học viên cần được hỗ trợ đăng ký khóa học, tham gia lớp học, xem nội dung học tập, làm bài kiểm tra và theo dõi kết quả. Điều này khiến cơ sở dữ liệu phải quản lý tốt các quan hệ giữa học viên với khóa học, video, bài kiểm tra và lớp học.

Việc phân chia rõ các nhóm người dùng nêu trên là cần thiết vì nó ảnh hưởng trực tiếp đến thiết kế dữ liệu, ràng buộc toàn vẹn và cơ chế phân quyền của hệ thống.

## 2.3. Chức năng chính của hệ thống

Từ yêu cầu của bài toán, hệ thống được tổ chức thành các nhóm chức năng chính sau:

- Quản lý tài khoản và xác thực
- Quản lý khóa học
- Quản lý chương học và video
- Quản lý tài liệu học tập
- Tổ chức đánh giá qua bài kiểm tra
- Đăng ký học và theo dõi tiến độ
- Quản lý lớp học

Chức năng quản lý tài khoản và xác thực cho phép người dùng đăng ký, đăng nhập, xác thực email và được phân quyền theo vai trò. Đây là nền tảng để hệ thống nhận diện đúng người dùng và giới hạn phạm vi truy cập dữ liệu tương ứng với từng vai trò.

Chức năng quản lý khóa học, chương học và video giúp hệ thống tổ chức nội dung đào tạo theo cấu trúc phân cấp. Mỗi khóa học có thể bao gồm nhiều chương, và mỗi chương có thể bao gồm nhiều video. Cách tổ chức này giúp dữ liệu được quản lý chặt chẽ và thuận lợi cho việc mở rộng nội dung.

Chức năng quản lý tài liệu học tập bổ sung thêm một lớp học liệu ngoài video bài giảng. Tài liệu có thể được gắn với khóa học, chương hoặc video, qua đó tăng tính linh hoạt trong việc phân phối nội dung học tập.

Chức năng tổ chức đánh giá qua bài kiểm tra giúp hệ thống lưu trữ đề kiểm tra, câu hỏi, đáp án và lịch sử làm bài của học viên. Đây là nhóm chức năng có ý nghĩa quan trọng vì nó tạo ra dữ liệu đánh giá, hỗ trợ chấm điểm và tổng hợp kết quả học tập.

Chức năng đăng ký học và theo dõi tiến độ cho phép hệ thống ghi nhận học viên nào đã tham gia khóa học nào, đồng thời theo dõi các video mà học viên đã hoàn thành. Nhóm chức năng này là cơ sở để xây dựng các thống kê về tiến độ học tập và mức độ tham gia của người học.

Chức năng quản lý lớp học giúp hệ thống không chỉ quản lý khóa học đơn lẻ, mà còn tổ chức học viên theo từng lớp. Mỗi lớp có thể chứa nhiều học viên và nhiều khóa học, tạo nên mô hình quản lý phù hợp hơn với thực tế đào tạo.

## 2.4. Kiến trúc tổng quan của ứng dụng

Hệ thống được xây dựng theo mô hình client-server, gồm ba thành phần chính:

- Frontend sử dụng React
- Backend sử dụng Node.js và Express
- Cơ sở dữ liệu sử dụng MySQL

Trong mô hình này, frontend đảm nhiệm vai trò giao tiếp với người dùng thông qua các giao diện chức năng như đăng nhập, xem khóa học, học video, làm bài kiểm tra và quản lý lớp học. Backend chịu trách nhiệm xử lý nghiệp vụ, kiểm tra quyền truy cập, nhận yêu cầu từ frontend và thực hiện các thao tác đọc ghi dữ liệu.

Cơ sở dữ liệu MySQL giữ vai trò lưu trữ tập trung toàn bộ dữ liệu của hệ thống. Mọi hoạt động như tạo khóa học, đăng ký học, lưu kết quả bài kiểm tra hay theo dõi tiến độ học tập đều được phản ánh thông qua các bảng dữ liệu và các quan hệ tham chiếu tương ứng.

Luồng xử lý cơ bản của hệ thống có thể mô tả như sau: người dùng thao tác trên giao diện frontend, yêu cầu được gửi đến backend, backend xử lý nghiệp vụ và thực hiện truy vấn cơ sở dữ liệu, sau đó kết quả được trả về frontend để hiển thị. Cách tổ chức này giúp tách biệt tương đối rõ giữa giao diện, xử lý nghiệp vụ và dữ liệu.

## 2.5. Vai trò của cơ sở dữ liệu trong hệ thống

Cơ sở dữ liệu là thành phần trung tâm giúp hệ thống vận hành đúng logic nghiệp vụ. Toàn bộ các quan hệ giữa người dùng, nội dung học tập, bài kiểm tra, kết quả học tập và lớp học đều được biểu diễn thông qua các bảng và các ràng buộc tham chiếu.

Không chỉ đóng vai trò lưu trữ, cơ sở dữ liệu còn quyết định khả năng mở rộng, khả năng thống kê và độ nhất quán của hệ thống. Một thiết kế dữ liệu hợp lý sẽ giúp tránh trùng lặp thông tin, giảm sai lệch khi cập nhật và hỗ trợ tốt cho các nhu cầu truy vấn, báo cáo và tối ưu hiệu năng.

Trong đề tài này, cơ sở dữ liệu chính là nền tảng phản ánh trực tiếp cấu trúc và mức độ hoàn thiện của hệ thống LMS. Vì vậy, việc tập trung phân tích cơ sở dữ liệu là hoàn toàn phù hợp với yêu cầu của học phần và cũng là phần có giá trị kỹ thuật nổi bật nhất của hệ thống.

## 2.6. Luồng học tập điển hình của học viên

Một luồng sử dụng điển hình của hệ thống có thể bắt đầu từ việc học viên đăng nhập vào hệ thống, lựa chọn khóa học phù hợp và đăng ký tham gia học. Sau khi ghi danh thành công, học viên truy cập các chương học, xem video bài giảng, sử dụng tài liệu học tập liên quan và thực hiện các bài kiểm tra được gắn với nội dung tương ứng.

Trong quá trình đó, hệ thống cần lưu trữ đồng thời nhiều loại dữ liệu như thông tin người dùng, dữ liệu khóa học, trạng thái ghi danh, tiến độ xem video, nội dung bài kiểm tra và kết quả làm bài. Luồng sử dụng này cho thấy cơ sở dữ liệu không chỉ đóng vai trò lưu trữ riêng lẻ từng bảng dữ liệu, mà còn phải đảm bảo liên kết chặt chẽ giữa các thành phần để phản ánh đúng quá trình học tập của người dùng.

## 2.7. Ghi chú về phạm vi nghiên cứu trong báo cáo

Báo cáo này tập trung vào thành phần cơ sở dữ liệu SQL của hệ thống LMS CSDLNC. Phần frontend và backend chỉ được trình bày ở mức cần thiết nhằm làm rõ bài toán nghiệp vụ và vai trò của cơ sở dữ liệu trong toàn hệ thống.
