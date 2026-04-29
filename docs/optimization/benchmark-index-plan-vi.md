# Kế hoạch thực nghiệm before/after cho chỉ mục

Tài liệu này chốt cách thực hiện phần benchmark chỉ mục trong Chương 5 để tránh nhầm lẫn giữa lược đồ chính thức và cấu hình thực nghiệm.

## 1. Nguyên tắc chung

- Lược đồ chính thức của đề tài vẫn là [backend/lms.sql](/D:/lms-csdlnc/backend/lms.sql).
- Cấu hình `after` trong thực nghiệm chính là lược đồ chính thức này.
- Không tự bổ sung thêm chỉ mục ngoài những gì đã có trong `lms.sql`.
- Cấu hình `before` chỉ dùng cho mục đích benchmark, được xây dựng bằng cách bỏ các chỉ mục tối ưu tường minh nhưng vẫn giữ `PRIMARY KEY`, `UNIQUE` và `FOREIGN KEY` cần thiết.

## 2. Hai cấu hình dùng để đo hiệu năng

### Cấu hình before

Dùng file:
- [schema_benchmark_before.sql](/D:/lms-csdlnc/docs/optimization/sql/schema_benchmark_before.sql)

Đặc điểm:
- giữ nguyên cấu trúc bảng, cột và ràng buộc quan trọng
- bỏ các chỉ mục tối ưu khai báo tường minh như `idx_user_role`, `idx_course_public`, `idx_chapter_order`, `idx_video_chapter`, `idx_quiz_type`, `idx_attempt_user_quiz`, `idx_class_code`, `idx_course_rating`

### Cấu hình after

Dùng file:
- [lms.sql](/D:/lms-csdlnc/backend/lms.sql)

Đặc điểm:
- là lược đồ chính thức của hệ thống
- bao gồm các chỉ mục đã được thiết kế trong phiên bản hiện tại

## 3. Cách thực hiện benchmark

1. Tạo database thử nghiệm thứ nhất.
2. Import `schema_benchmark_before.sql`.
3. Nạp dữ liệu mẫu bằng `seed.sql`.
4. Chạy các truy vấn benchmark và chụp:
   - kết quả truy vấn
   - `EXPLAIN`
   - thời gian thực thi
5. Tạo database thử nghiệm thứ hai.
6. Import `backend/lms.sql`.
7. Nạp lại cùng bộ dữ liệu mẫu.
8. Chạy lại đúng các truy vấn benchmark như ở bước 4.
9. So sánh kết quả giữa hai cấu hình.

## 4. Ý nghĩa học thuật của cách làm này

Cách so sánh này giúp làm rõ tác động của các chỉ mục đã có trong lược đồ chính thức của hệ thống. Nói cách khác, phần benchmark không nhằm tạo ra một phiên bản tối ưu hóa nhân tạo mới, mà nhằm chứng minh rằng các chỉ mục trong thiết kế hiện tại thực sự có giá trị đối với hiệu năng truy vấn.

## 5. Cách viết vào báo cáo

Có thể trình bày theo hướng:

“Để đánh giá tác động của chỉ mục đối với hiệu năng truy vấn, báo cáo sử dụng hai cấu hình thực nghiệm. Cấu hình thứ nhất là lược đồ giản lược chỉ mục, chỉ giữ các ràng buộc nền tảng cần thiết để hệ thống hoạt động đúng. Cấu hình thứ hai là lược đồ chính thức của hệ thống, được lấy từ file `lms.sql`, trong đó đã bao gồm các chỉ mục phục vụ truy vấn nghiệp vụ. Việc so sánh hai cấu hình này giúp làm rõ vai trò của các chỉ mục trong thiết kế cơ sở dữ liệu hiện tại.”
