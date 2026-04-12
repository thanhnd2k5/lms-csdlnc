# Chương 4. Khởi tạo và triển khai cơ sở dữ liệu

## 4.1. Mục tiêu khởi tạo cơ sở dữ liệu

Mục tiêu là tạo đầy đủ bảng, ràng buộc, khóa, chỉ mục và dữ liệu mẫu để phục vụ thử nghiệm và minh họa hệ thống.

## 4.2. Script tạo bảng

File `backend/lms.sql` đóng vai trò là script schema chính, tạo toàn bộ bảng và ràng buộc theo thứ tự phù hợp.

## 4.3. Mô tả các script khởi tạo

Hệ thống hiện có:

- script schema: `lms.sql`

Hệ thống đã được bổ sung script mẫu:

- [migration_up.sql](/D:/lms-csdlnc/docs/sql/migration_up.sql)
- [migration_down.sql](/D:/lms-csdlnc/docs/sql/migration_down.sql)
- [seed.sql](/D:/lms-csdlnc/docs/sql/seed.sql)
- bộ migration giả lập theo từng phiên bản:
  - [V1__init_core.sql](/D:/lms-csdlnc/docs/sql/migrations/V1__init_core.sql)
  - [V2__add_quiz_module.sql](/D:/lms-csdlnc/docs/sql/migrations/V2__add_quiz_module.sql)
  - [V3__add_enrollment_progress_documents.sql](/D:/lms-csdlnc/docs/sql/migrations/V3__add_enrollment_progress_documents.sql)
  - [V4__add_class_management.sql](/D:/lms-csdlnc/docs/sql/migrations/V4__add_class_management.sql)

## 4.4. Mô phỏng quá trình phát triển schema theo migration

Để phần khởi tạo cơ sở dữ liệu sinh động hơn, báo cáo có thể mô tả schema không xuất hiện hoàn chỉnh ngay từ đầu, mà được phát triển dần theo nhu cầu nghiệp vụ.

Tiến trình đề xuất gồm:

### Phiên bản V1 - Khởi tạo lõi hệ thống

Ở giai đoạn đầu, hệ thống chỉ cần quản lý người dùng, khóa học, chương học và video. Đây là phần lõi tối thiểu để xây dựng một nền tảng học tập trực tuyến cơ bản.

### Phiên bản V2 - Bổ sung module bài kiểm tra

Khi hệ thống phát triển hơn, chức năng đánh giá kết quả học tập được bổ sung thông qua các bảng bài kiểm tra, câu hỏi, đáp án và lịch sử làm bài.

### Phiên bản V3 - Bổ sung ghi danh, tiến độ và tài liệu

Ở giai đoạn tiếp theo, hệ thống được mở rộng để quản lý việc học viên đăng ký khóa học, theo dõi tiến độ hoàn thành video và lưu trữ tài liệu học tập.

### Phiên bản V4 - Bổ sung quản lý lớp học

Giai đoạn sau cùng bổ sung mô hình lớp học, cho phép giảng viên tổ chức học viên thành từng lớp, phân bổ khóa học vào lớp và quản lý học viên theo từng khóa học trong lớp.

Chi tiết cách trình bày được mô tả trong:

- [migration-evolution-vi.md](/D:/lms-csdlnc/docs/migration-evolution-vi.md)

## 4.5. Quy trình khởi tạo cơ sở dữ liệu

1. Tạo database `lms`
2. Chạy `lms.sql`
3. Kiểm tra danh sách bảng
4. Nạp dữ liệu seed
5. Kiểm tra số lượng bản ghi

`[Chèn Hình 4.1. Kết quả tạo schema tại đây]`

`[Chèn Hình 4.2. Kết quả nạp dữ liệu seed tại đây]`

## 4.6. Nhận xét

Schema hiện tại dễ khởi tạo và dễ trình bày trong báo cáo. Tuy nhiên, hệ thống nên tiếp tục hoàn thiện migration và seed tách riêng để phục vụ vận hành chuyên nghiệp hơn.
