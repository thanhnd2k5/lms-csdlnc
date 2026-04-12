# Chương 2. Mô tả bài toán và chức năng hệ thống

## 2.1. Bài toán nghiệp vụ

Trong bối cảnh chuyển đổi số trong giáo dục, nhu cầu xây dựng các hệ thống hỗ trợ dạy và học trực tuyến ngày càng trở nên phổ biến. Các nền tảng học tập trực tuyến không chỉ cần đáp ứng việc phân phối nội dung học tập, mà còn phải hỗ trợ quá trình quản lý khóa học, theo dõi tiến độ học tập, tổ chức đánh giá kết quả học tập và quản lý người học theo từng lớp học hoặc nhóm học tập cụ thể.

Từ yêu cầu thực tiễn đó, đề tài xây dựng hệ thống LMS CSDLNC hướng tới bài toán quản lý học tập trực tuyến trên nền tảng web. Hệ thống được thiết kế để phục vụ đồng thời nhiều đối tượng sử dụng khác nhau, bao gồm quản trị viên, giảng viên và học viên.

## 2.2. Đối tượng sử dụng hệ thống

Hệ thống được xây dựng với ba nhóm người dùng chính:

- Quản trị viên
- Giảng viên
- Học viên

Mỗi nhóm người dùng có vai trò, quyền hạn và nhu cầu khai thác dữ liệu riêng.

## 2.3. Chức năng chính của hệ thống

Căn cứ vào mã nguồn ứng dụng và schema SQL hiện có, hệ thống bao gồm các nhóm chức năng chính sau:

- Quản lý tài khoản và xác thực
- Quản lý khóa học
- Quản lý chương học và video
- Quản lý tài liệu học tập
- Tổ chức đánh giá qua bài kiểm tra
- Đăng ký học và theo dõi tiến độ
- Quản lý lớp học

## 2.4. Kiến trúc tổng quan của ứng dụng

Hệ thống được xây dựng theo mô hình client-server gồm:

- Frontend sử dụng React
- Backend sử dụng Node.js và Express
- Cơ sở dữ liệu sử dụng MySQL

## 2.5. Vai trò của cơ sở dữ liệu trong hệ thống

Cơ sở dữ liệu là thành phần trung tâm giúp hệ thống vận hành đúng logic nghiệp vụ. Toàn bộ các quan hệ giữa người dùng, nội dung học tập, bài kiểm tra, kết quả học tập và lớp học đều được biểu diễn thông qua các bảng và các ràng buộc tham chiếu.

## 2.6. Ghi chú về phạm vi nghiên cứu trong báo cáo

Báo cáo này tập trung vào phân tích cơ sở dữ liệu SQL của hệ thống LMS CSDLNC. Phần frontend và backend chỉ đóng vai trò minh họa cho bài toán nghiệp vụ và tính ứng dụng của cơ sở dữ liệu.
