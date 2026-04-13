# Chương 2. Mô tả bài toán và chức năng hệ thống

## 2.1. Bài toán nghiệp vụ

Trong bối cảnh chuyển đổi số trong giáo dục, nhu cầu xây dựng các hệ thống hỗ trợ dạy và học trực tuyến ngày càng trở nên phổ biến. Các nền tảng học tập trực tuyến không chỉ cần đáp ứng việc phân phối nội dung học tập, mà còn phải hỗ trợ quá trình quản lý khóa học, theo dõi tiến độ học tập, tổ chức đánh giá kết quả học tập và quản lý người học theo từng lớp học hoặc nhóm học tập cụ thể.

Từ yêu cầu thực tiễn đó, đề tài xây dựng hệ thống LMS CSDLNC hướng tới bài toán quản lý học tập trực tuyến trên nền tảng web. Hệ thống được thiết kế để phục vụ đồng thời nhiều đối tượng sử dụng khác nhau, bao gồm quản trị viên, giảng viên và học viên.

Nếu quản lý theo cách thủ công hoặc phân tán trên nhiều công cụ riêng lẻ, dữ liệu về người học, khóa học, kết quả bài kiểm tra và tiến độ học tập sẽ rất khó đồng bộ. Điều này dẫn đến các vấn đề như trùng lặp dữ liệu, khó tổng hợp báo cáo, khó kiểm soát quyền truy cập và khó mở rộng hệ thống khi số lượng người dùng tăng lên.

Do đó, bài toán đặt ra không chỉ là xây dựng giao diện để hiển thị nội dung học tập, mà còn là xây dựng một hệ thống dữ liệu đủ chặt chẽ để quản lý toàn bộ vòng đời của hoạt động học tập, từ khâu tạo khóa học, tham gia học, làm bài kiểm tra cho đến thống kê và theo dõi kết quả.

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

Trên cơ sở bài toán quản lý học tập trực tuyến và cấu trúc hệ thống đã xây dựng, hệ thống bao gồm các nhóm chức năng chính sau:

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

Hệ thống được xây dựng theo mô hình client-server gồm:

- Frontend sử dụng React
- Backend sử dụng Node.js và Express
- Cơ sở dữ liệu sử dụng MySQL

Trong mô hình này, frontend đảm nhiệm vai trò giao tiếp với người dùng thông qua các giao diện chức năng như đăng nhập, xem khóa học, học video, làm bài kiểm tra và quản lý lớp học. Backend chịu trách nhiệm xử lý nghiệp vụ, kiểm tra quyền truy cập, nhận yêu cầu từ frontend và thực hiện các thao tác đọc ghi dữ liệu.

Cơ sở dữ liệu MySQL giữ vai trò lưu trữ tập trung toàn bộ dữ liệu của hệ thống. Mọi hoạt động như tạo khóa học, đăng ký học, lưu kết quả bài kiểm tra hay theo dõi tiến độ học tập đều được phản ánh thông qua các bảng dữ liệu và các quan hệ tham chiếu tương ứng.

Luồng xử lý cơ bản của hệ thống có thể mô tả như sau: người dùng thao tác trên giao diện frontend, yêu cầu được gửi đến backend, backend xử lý nghiệp vụ và truy vấn cơ sở dữ liệu, sau đó kết quả được trả về frontend để hiển thị. Cách tổ chức này giúp tách biệt rõ ràng giữa giao diện, nghiệp vụ và dữ liệu, đồng thời tạo điều kiện thuận lợi cho việc phân tích cơ sở dữ liệu trong báo cáo.

## 2.5. Vai trò của cơ sở dữ liệu trong hệ thống

Cơ sở dữ liệu là thành phần trung tâm giúp hệ thống vận hành đúng logic nghiệp vụ. Toàn bộ các quan hệ giữa người dùng, nội dung học tập, bài kiểm tra, kết quả học tập và lớp học đều được biểu diễn thông qua các bảng và các ràng buộc tham chiếu.

Không chỉ đóng vai trò lưu trữ, cơ sở dữ liệu còn quyết định khả năng mở rộng, khả năng thống kê và độ nhất quán của hệ thống. Một thiết kế dữ liệu hợp lý sẽ giúp tránh trùng lặp thông tin, giảm sai lệch khi cập nhật và hỗ trợ tốt cho các nhu cầu truy vấn, báo cáo và tối ưu hiệu năng.

Trong đề tài này, cơ sở dữ liệu chính là nền tảng phản ánh trực tiếp cấu trúc và mức độ hoàn thiện của hệ thống LMS. Vì vậy, việc tập trung phân tích cơ sở dữ liệu là hoàn toàn phù hợp với yêu cầu của học phần và cũng là phần có giá trị kỹ thuật nổi bật nhất của hệ thống.

## 2.6. Ghi chú về phạm vi nghiên cứu trong báo cáo

Báo cáo này tập trung vào phân tích cơ sở dữ liệu SQL của hệ thống LMS CSDLNC. Phần frontend và backend chỉ đóng vai trò minh họa cho bài toán nghiệp vụ và tính ứng dụng của cơ sở dữ liệu.
