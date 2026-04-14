# Chương 4. Khởi tạo và triển khai cơ sở dữ liệu

## 4.1. Mục tiêu khởi tạo cơ sở dữ liệu

Mục tiêu là tạo đầy đủ bảng, ràng buộc, khóa, chỉ mục và dữ liệu mẫu để phục vụ thử nghiệm và minh họa hệ thống.

## 4.2. Script tạo bảng

Trong đề tài này, file `backend/lms.sql` được sử dụng làm script schema chính. File này chứa toàn bộ câu lệnh tạo bảng, khóa chính, khóa ngoại và các ràng buộc cơ bản của hệ thống.

## 4.3. Mô tả các script khởi tạo

Phần khởi tạo cơ sở dữ liệu của báo cáo được xây dựng từ ba nhóm script chính:

- script schema tổng thể `lms.sql`
- script seed dữ liệu mẫu
- bộ migration mô phỏng quá trình phát triển cơ sở dữ liệu theo từng phiên bản

Bộ migration được tổ chức thành các phiên bản từ V1 đến V4, và mỗi phiên bản đều có cặp script `up` và `down` để thể hiện khả năng triển khai cũng như hoàn tác thay đổi khi cần thiết.

## 4.4. Mô phỏng quá trình phát triển schema theo migration

Để phần khởi tạo cơ sở dữ liệu sinh động hơn, báo cáo có thể mô tả schema không xuất hiện hoàn chỉnh ngay từ đầu, mà được phát triển dần theo nhu cầu nghiệp vụ.

Tiến trình đề xuất gồm:

### Phiên bản V1 - Khởi tạo lõi hệ thống

Ở giai đoạn đầu, hệ thống chỉ cần quản lý người dùng, khóa học, chương học và video. Đây là phần lõi tối thiểu để xây dựng một nền tảng học tập trực tuyến cơ bản.

Ở phiên bản này:

- migration `up` tạo các bảng lõi
- migration `down` xóa các bảng lõi theo thứ tự ngược để đảm bảo rollback an toàn

### Phiên bản V2 - Bổ sung module bài kiểm tra

Khi hệ thống phát triển hơn, chức năng đánh giá kết quả học tập được bổ sung thông qua các bảng bài kiểm tra, câu hỏi, đáp án và lịch sử làm bài.

Ở phiên bản này:

- migration `up` thêm toàn bộ nhóm bảng quiz
- migration `down` xóa các bảng quiz theo thứ tự phụ thuộc dữ liệu

### Phiên bản V3 - Bổ sung ghi danh, tiến độ và tài liệu

Ở giai đoạn tiếp theo, hệ thống được mở rộng để quản lý việc học viên đăng ký khóa học, theo dõi tiến độ hoàn thành video và lưu trữ tài liệu học tập.

Ở phiên bản này:

- migration `up` bổ sung các bảng ghi danh, tiến độ và tài liệu
- migration `down` cho phép quay lui nếu việc mở rộng thất bại

### Phiên bản V4 - Bổ sung quản lý lớp học

Giai đoạn sau cùng bổ sung mô hình lớp học, cho phép giảng viên tổ chức học viên thành từng lớp, phân bổ khóa học vào lớp và quản lý học viên theo từng khóa học trong lớp.

Ở phiên bản này:

- migration `up` thêm nhóm bảng lớp học
- migration `down` xóa nhóm bảng lớp học theo thứ tự phụ thuộc

Như vậy, phần migration trong báo cáo không chỉ dừng ở việc tạo schema ban đầu, mà còn thể hiện được tư duy quản lý phiên bản và khả năng rollback của cơ sở dữ liệu trong quá trình phát triển.

## 4.5. Quy trình khởi tạo cơ sở dữ liệu

1. Tạo cơ sở dữ liệu `lms`.
2. Chạy file `lms.sql` để khởi tạo toàn bộ schema.
3. Kiểm tra danh sách bảng và các ràng buộc đã được tạo.
4. Nạp dữ liệu mẫu bằng script seed.
5. Kiểm tra số lượng bản ghi và khả năng liên kết dữ liệu giữa các bảng.

`[Chèn Hình 4.1. Kết quả tạo schema tại đây]`

`[Chèn Hình 4.2. Kết quả nạp dữ liệu seed tại đây]`

## 4.6. Nhận xét

Schema của hệ thống tương đối dễ khởi tạo và thuận lợi cho việc trình bày trong báo cáo. Tuy nhiên, trong các giai đoạn phát triển tiếp theo, hệ thống nên tiếp tục hoàn thiện migration và seed theo hướng tách riêng, quản lý rõ phiên bản để phục vụ vận hành chuyên nghiệp hơn.
