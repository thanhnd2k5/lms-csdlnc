# Chương 4. Khởi tạo và triển khai cơ sở dữ liệu

## 4.1. Mục tiêu khởi tạo cơ sở dữ liệu

Mục tiêu là tạo đầy đủ bảng, ràng buộc, khóa, chỉ mục và dữ liệu mẫu để phục vụ thử nghiệm và minh họa hệ thống.

## 4.2. Script tạo bảng

File `backend/lms.sql` đóng vai trò là script schema chính, tạo toàn bộ bảng và ràng buộc theo thứ tự phù hợp.

## 4.3. Mô tả các script khởi tạo

Phần triển khai cơ sở dữ liệu sử dụng:

- script schema: `lms.sql`

Để phục vụ việc trình bày trong báo cáo, bộ script mẫu được tổ chức như sau:

- [seed.sql](/D:/lms-csdlnc/docs/sql/seed.sql)
- bộ migration giả lập theo từng phiên bản:
  - [V1__init_core.sql](/D:/lms-csdlnc/docs/sql/migrations/V1__init_core.sql)
  - [V1__init_core_down.sql](/D:/lms-csdlnc/docs/sql/migrations/V1__init_core_down.sql)
  - [V2__add_quiz_module.sql](/D:/lms-csdlnc/docs/sql/migrations/V2__add_quiz_module.sql)
  - [V2__add_quiz_module_down.sql](/D:/lms-csdlnc/docs/sql/migrations/V2__add_quiz_module_down.sql)
  - [V3__add_enrollment_progress_documents.sql](/D:/lms-csdlnc/docs/sql/migrations/V3__add_enrollment_progress_documents.sql)
  - [V3__add_enrollment_progress_documents_down.sql](/D:/lms-csdlnc/docs/sql/migrations/V3__add_enrollment_progress_documents_down.sql)
  - [V4__add_class_management.sql](/D:/lms-csdlnc/docs/sql/migrations/V4__add_class_management.sql)
  - [V4__add_class_management_down.sql](/D:/lms-csdlnc/docs/sql/migrations/V4__add_class_management_down.sql)

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

Chi tiết cách trình bày được mô tả trong:

- [migration-evolution-vi.md](/D:/lms-csdlnc/docs/migration-evolution-vi.md)

Như vậy, phần migration trong báo cáo không chỉ dừng ở việc tạo schema, mà còn thể hiện được tư duy quản lý phiên bản và khả năng rollback của cơ sở dữ liệu.

## 4.5. Quy trình khởi tạo cơ sở dữ liệu

1. Tạo database `lms`
2. Chạy `lms.sql`
3. Kiểm tra danh sách bảng
4. Nạp dữ liệu seed
5. Kiểm tra số lượng bản ghi

`[Chèn Hình 4.1. Kết quả tạo schema tại đây]`

`[Chèn Hình 4.2. Kết quả nạp dữ liệu seed tại đây]`

## 4.6. Nhận xét

Schema của hệ thống tương đối dễ khởi tạo và thuận lợi cho việc trình bày trong báo cáo. Tuy nhiên, trong các giai đoạn phát triển tiếp theo, hệ thống nên tiếp tục hoàn thiện migration và seed theo hướng tách riêng, quản lý rõ phiên bản để phục vụ vận hành chuyên nghiệp hơn.
