# Checklist Minh Chứng Cho Chương 6

Tài liệu này là checklist ngắn để anh tự chạy và chụp minh chứng cho phần sao lưu và phục hồi dữ liệu.

## 1. Những gì cần có trước

- MySQL chạy được
- database `lms` đã import
- có dữ liệu mẫu trong database

Nếu chưa có dữ liệu mẫu, chạy:

- [seed.sql](/D:/lms-csdlnc/docs/sql/seed.sql)

## 2. Minh chứng cần chụp

### 2.1. Full backup

Chụp:

- lệnh `mysqldump`
- file `lms_backup_yyyy_mm_dd.sql` được tạo

Ví dụ:

```powershell
mysqldump -u root -p --single-transaction --routines --triggers lms > lms_backup_2026_05_02.sql
```

### 2.2. Binary log

Chụp một trong các dạng sau:

- cấu hình cho thấy MySQL bật `log_bin`
- danh sách file binlog
- trạng thái log sau khi có thêm dữ liệu mới

Mục tiêu:

- chứng minh hệ thống có lưu phần thay đổi giữa hai lần full backup

### 2.3. Restore

Chụp:

- lệnh restore vào `lms_restore`
- danh sách bảng hoặc dữ liệu sau khi restore full backup

Ví dụ:

```powershell
mysql -u root -p lms_restore < lms_backup_2026_05_02.sql
```

### 2.4. Áp dụng binary log

Chụp:

- thay đổi dữ liệu trên `lms` sau thời điểm backup;
- lệnh hoặc kết quả áp dụng `binary log` vào `lms_restore`;
- dữ liệu kiểm tra trên `lms_restore` sau khi áp dụng log.

Mục tiêu:

- chứng minh thay đổi phát sinh sau full backup có thể được khôi phục lại.

### 2.5. Kiểm tra sau phục hồi

Chụp 1 đến 2 truy vấn như:

- đếm số bản ghi bảng `users`
- đếm số bản ghi bảng `courses`
- đếm số bản ghi bảng `course_enrollments`

## 3. Caption gợi ý cho báo cáo

- Hình 6.1. Thực hiện full backup cơ sở dữ liệu bằng `mysqldump`
- Hình 6.2. Kiểm tra trạng thái bật binary log và danh sách file log trong MySQL
- Hình 6.3. Binary log ghi nhận thay đổi sau thao tác cập nhật dữ liệu
- Hình 6.4. Khôi phục dữ liệu từ full backup sang cơ sở dữ liệu `lms_restore`
- Hình 6.5. Áp dụng binary log và kiểm tra dữ liệu sau phục hồi

## 4. Ghi chú ngắn khi chèn báo cáo

Sau hình backup:

- File backup được tạo thành công và lưu theo tên có gắn thời gian để thuận tiện quản lý phiên bản.

Sau hình binary log:

- `Binary log` giúp ghi nhận các thay đổi phát sinh giữa hai lần full backup, làm giảm nguy cơ mất dữ liệu khi xảy ra sự cố.

Sau hình restore:

- Kết quả restore cho thấy file sao lưu có thể được sử dụng để khôi phục dữ liệu trên một cơ sở dữ liệu khác.

Sau hình áp dụng binary log:

- Dữ liệu sau phục hồi cho thấy các thay đổi phát sinh sau thời điểm tạo full backup có thể được tái áp dụng từ `binary log`.
