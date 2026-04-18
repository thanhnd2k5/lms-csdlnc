# Hướng dẫn thực hiện phần ảnh minh chứng

Tài liệu này hướng dẫn cách tự chuẩn bị ảnh minh chứng để chèn vào báo cáo cuối kỳ. Mục tiêu là giúp phần hình ảnh đồng nhất, dễ chèn vào Word và đúng với nội dung từng chương.

## 1. Nguyên tắc chung khi chụp ảnh

- Chỉ chụp đúng phần màn hình cần minh họa, tránh để quá nhiều nội dung thừa.
- Nếu có thể, dùng cùng một độ phân giải hoặc cùng một tỉ lệ cửa sổ để ảnh nhìn đồng đều.
- Tên file ảnh nên đặt theo dạng dễ nhớ, ví dụ:
  - `hinh-2-1-dang-nhap.png`
  - `hinh-3-1-erd-tong-the.png`
  - `hinh-5-1-explain-truy-van-1.png`
- Nếu ảnh chứa dữ liệu thử nghiệm, nên giữ dữ liệu sạch và dễ đọc.
- Sau khi chụp, nên kiểm tra lại:
  - chữ có rõ không
  - ảnh có bị mờ không
  - nội dung chụp có đúng với chú thích hình không

## 2. Hướng dẫn theo từng chương

### Chương 2. Ảnh giao diện hệ thống

Ảnh nên chụp:
- màn hình đăng nhập
- trang chủ hoặc danh sách khóa học
- trang học video
- trang bài kiểm tra
- trang lớp học hoặc quản lý lớp học

Cách thực hiện:
1. Chạy hệ thống frontend và backend.
2. Đăng nhập bằng tài khoản phù hợp.
3. Mở đúng màn hình cần minh họa.
4. Chụp ảnh toàn bộ vùng nội dung chính của trang.
5. Lưu ảnh theo đúng số thứ tự hình dự kiến.

Gợi ý chú thích:
- Hình 2.1. Giao diện đăng nhập của hệ thống
- Hình 2.2. Giao diện danh sách khóa học
- Hình 2.3. Giao diện học tập theo video
- Hình 2.4. Giao diện bài kiểm tra trực tuyến
- Hình 2.5. Giao diện quản lý lớp học

### Chương 3. Ảnh sơ đồ ERD

Ảnh nên chuẩn bị:
- sơ đồ ERD tổng thể
- sơ đồ ERD nhóm đánh giá và bài kiểm tra
- sơ đồ ERD nhóm lớp học, ghi danh và tiến độ
- sơ đồ ERD nhóm nội dung học tập

Cách thực hiện:
1. Mở nội dung trong [erd-mermaid.md](/D:/lms-csdlnc/docs/erd-mermaid.md).
2. Xuất sơ đồ thành ảnh bằng Mermaid Live Editor hoặc công cụ tương đương.
3. Đặt tên ảnh theo số hình trong báo cáo.
4. Kiểm tra lại chữ trong sơ đồ có dễ đọc không trước khi chèn vào Word.

Gợi ý chú thích:
- Hình 3.1. Sơ đồ ERD tổng thể của hệ thống
- Hình 3.2. Sơ đồ ERD nhóm đánh giá và bài kiểm tra
- Hình 3.3. Sơ đồ ERD nhóm lớp học, ghi danh và tiến độ học tập
- Hình 3.4. Sơ đồ ERD nhóm nội dung học tập

### Chương 4. Ảnh khởi tạo cơ sở dữ liệu

Ảnh nên chụp:
- kết quả tạo database và chạy `lms.sql`
- danh sách bảng sau khi khởi tạo
- kết quả nạp dữ liệu mẫu bằng `seed.sql`

Cách thực hiện:
1. Mở MySQL Workbench, phpMyAdmin hoặc terminal MySQL.
2. Tạo database `lms`.
3. Chạy file `backend/lms.sql`.
4. Mở danh sách bảng và chụp ảnh.
5. Chạy `seed.sql`.
6. Chụp ảnh một vài bảng có dữ liệu mẫu.

Gợi ý chú thích:
- Hình 4.1. Kết quả khởi tạo lược đồ cơ sở dữ liệu
- Hình 4.2. Kết quả nạp dữ liệu mẫu vào hệ thống

### Chương 5. Ảnh tối ưu và EXPLAIN

Ảnh nên chụp:
- kết quả `SHOW INDEX`
- kết quả `EXPLAIN` của một hoặc hai truy vấn tiêu biểu
- nếu có, ảnh so sánh trước và sau khi thêm chỉ mục

Cách thực hiện:
1. Chạy các truy vấn trong [explain_queries.sql](/D:/lms-csdlnc/docs/sql/explain_queries.sql).
2. Chạy `SHOW INDEX FROM <ten_bang>;` với các bảng cần minh họa.
3. Nếu làm phần đo hiệu năng, chạy thêm script trong `performance_before_after.sql`.
4. Chụp ảnh vùng kết quả sao cho thấy rõ:
   - tên truy vấn
   - cột chỉ mục hoặc kế hoạch thực thi
   - thời gian nếu có đo trước/sau

Gợi ý chú thích:
- Hình 5.1. Kết quả phân tích truy vấn bằng lệnh EXPLAIN
- Hình 5.2. Danh sách chỉ mục của một bảng tiêu biểu

### Chương 6. Ảnh sao lưu và phục hồi

Ảnh nên chụp:
- lệnh backup
- file backup đã được tạo
- lệnh restore
- kết quả restore thành công

Cách thực hiện:
1. Chạy lệnh:
   - `mysqldump -u root -p lms > lms_backup.sql`
2. Chụp ảnh terminal sau khi chạy xong và thư mục có file `lms_backup.sql`.
3. Tạo một database mới, ví dụ `lms_restore`.
4. Chạy lệnh:
   - `mysql -u root -p lms_restore < lms_backup.sql`
5. Chụp ảnh terminal và danh sách bảng trong database phục hồi.

Gợi ý chú thích:
- Hình 6.1. Thực hiện sao lưu cơ sở dữ liệu bằng mysqldump
- Hình 6.2. Thực hiện phục hồi cơ sở dữ liệu từ file sao lưu

## 3. Thứ tự ưu tiên nếu thời gian ít

Nếu không có nhiều thời gian, nên làm theo thứ tự sau:
1. Ảnh ERD
2. Ảnh khởi tạo cơ sở dữ liệu
3. Ảnh EXPLAIN
4. Ảnh backup/restore
5. Ảnh giao diện hệ thống

## 4. Cách chèn vào Word

- Chèn ảnh ngay sau đoạn văn nhắc tới nội dung tương ứng.
- Mỗi ảnh phải có caption theo dạng:
  - `Hình x.y. ...`
- Nên căn giữa ảnh và caption để báo cáo đồng đều.
- Nếu ảnh quá dài, có thể giảm kích thước nhưng phải đảm bảo phần chữ vẫn đọc được.

## 5. Gợi ý kiểm tra trước khi nộp

Trước khi xuất PDF, kiểm tra lại:
- ảnh có đúng số thứ tự không
- caption có khớp với nội dung ảnh không
- ảnh trong Chương 4, 5, 6 có phản ánh đúng minh chứng thực tế không
- không dùng ảnh minh họa chung chung thay cho ảnh chạy thật ở các phần kỹ thuật
