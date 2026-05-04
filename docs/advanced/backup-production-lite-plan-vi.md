# Kế Hoạch Triển Khai Backup Cho Chương 6

Tài liệu này dùng làm phần hướng dẫn kỹ thuật và checklist triển khai cho nội dung sao lưu, phục hồi dữ liệu ở Chương 6. Mục tiêu là chọn một phương án có tính thực tiễn, đủ gọn để có thể thực hiện và chụp minh chứng trong phạm vi môn học.

## 1. Mục tiêu kỹ thuật

Phương án được chốt gồm bốn lớp:

1. Tạo `full backup` định kỳ bằng `mysqldump`.
2. Bật `binary log` để lưu lại các thay đổi giữa hai lần full backup.
3. Kiểm tra khả năng phục hồi bằng cách restore sang một database khác.
4. Áp dụng `binary log` để chứng minh khả năng phục hồi tới trạng thái mới hơn sau thời điểm backup.

Những gì không đặt làm mục tiêu chính trong vòng này:

- tự động hóa lịch backup hoàn chỉnh bằng cron hoặc Task Scheduler;
- triển khai `point-in-time recovery` đầy đủ đến từng mốc thời gian;
- dùng công cụ `physical backup` như Percona XtraBackup;
- sao lưu ra cloud hoặc hệ thống lưu trữ ngoài máy chủ.

## 2. Lý do chọn phương án này

Phương án `full backup + binary log` phù hợp vì:

- dễ giải thích trong báo cáo;
- có chiều sâu kỹ thuật hơn so với chỉ dùng một file `mysqldump`;
- không cần thêm nhiều hạ tầng phụ trợ;
- đủ để minh họa tư duy sao lưu phần thay đổi trong MySQL.

Trong phạm vi đề tài, đây là phương án hợp lý giữa chiều sâu kỹ thuật, khả năng triển khai và mức độ thuyết phục của minh chứng thực tế.

## 3. Kiến trúc logic

Luồng sao lưu và phục hồi được hiểu như sau:

1. Tại một thời điểm xác định, tạo `full backup` của database `lms`.
2. Sau thời điểm đó, MySQL tiếp tục ghi các thay đổi vào `binary log`.
3. Khi cần phục hồi, nạp lại bản `full backup`.
4. Nếu cần tiến gần hơn tới thời điểm sự cố, áp dụng thêm thay đổi từ `binary log`.

Điểm cần nhấn mạnh khi viết báo cáo:

- `full backup` là mốc khôi phục nền;
- `binary log` là phần lưu thay đổi;
- restore test là bước xác nhận backup có giá trị sử dụng.

## 4. Các việc cần chuẩn bị

Trước khi triển khai minh chứng, cần có:

- MySQL đang chạy được trên máy hoặc trong môi trường demo;
- database `lms` đã được import từ `backend/lms.sql`;
- dữ liệu mẫu đã được nạp để backup có ý nghĩa minh họa;
- quyền truy cập để chạy `mysqldump`, `mysql` và kiểm tra file binlog.

Nếu cần dữ liệu mẫu, dùng:

- [seed.sql](/D:/lms-csdlnc/docs/sql/seed.sql)

## 5. Các bước triển khai

### 5.1. Bước 1: Tạo full backup

Ví dụ lệnh:

```powershell
mysqldump -u root -p --single-transaction --routines --triggers lms > lms_backup_2026_05_02.sql
```

Kết quả cần có:

- file backup được tạo thành công;
- dung lượng file hợp lý;
- có thể mở đầu file để thấy câu lệnh SQL được sinh ra.

### 5.2. Bước 2: Kiểm tra binary log

Mục tiêu của bước này là chứng minh MySQL đang ghi nhận thay đổi giữa hai lần backup.

Những gì cần xác nhận:

- MySQL đang bật `log_bin`;
- có file binlog xuất hiện trong thư mục dữ liệu hoặc danh sách log;
- sau khi thêm/sửa một ít dữ liệu, file binlog tiếp tục tăng hoặc xuất hiện log mới.

Trong báo cáo không cần đi sâu vào toàn bộ cấu hình máy chủ, nhưng nên có ít nhất một minh chứng cho thấy `binary log` đang tồn tại.

### 5.3. Bước 3: Restore test

Ví dụ lệnh:

```powershell
mysql -u root -p lms_restore < lms_backup_2026_05_02.sql
```

Sau khi restore, nên kiểm tra:

- database `lms_restore` đã có đủ bảng chính;
- số lượng bản ghi ở một vài bảng tiêu biểu;
- dữ liệu tiếng Việt không bị lỗi mã hóa;
- truy vấn nghiệp vụ cơ bản vẫn chạy được.

### 5.4. Bước 4: Áp dụng binary log sau full restore

Sau khi restore `full backup` vào `lms_restore`, có thể áp dụng thêm các thay đổi phát sinh sau thời điểm backup bằng công cụ `mysqlbinlog`.

Ý tưởng thực hiện:

- xác định `File` và `Position` của `SHOW MASTER STATUS` ngay sau thời điểm backup;
- tạo một thay đổi dữ liệu nhỏ sau backup trên database `lms`;
- restore `full backup` vào `lms_restore`;
- dùng `mysqlbinlog` để phát lại các thay đổi sau mốc backup vào `lms_restore`;
- kiểm tra lại dữ liệu để xác nhận thay đổi đã được khôi phục.

Ví dụ dạng lệnh:

```powershell
mysqlbinlog --start-position=BACKUP_LOG_POSITION BACKUP_LOG_FILE | mysql -u root -p lms_restore
```

Trong đó:

- `BACKUP_LOG_POSITION` là vị trí log được ghi nhận ngay sau khi tạo `full backup`;
- `BACKUP_LOG_FILE` là file binlog tương ứng tại thời điểm đó.

## 6. Minh chứng cần chụp

Bộ ảnh nên chuẩn bị gồm:

- lệnh `mysqldump` và file `.sql` sau khi backup;
- cấu hình hoặc danh sách file `binary log`;
- thay đổi dữ liệu phát sinh sau thời điểm backup;
- lệnh restore vào `lms_restore`;
- danh sách bảng hoặc dữ liệu kiểm tra trong `lms_restore` sau full restore;
- kết quả sau khi áp dụng `binary log` vào `lms_restore`.

Nếu muốn bài nhìn gọn và chắc, có thể dùng 5 hình chính:

1. Hình backup thành công
2. Hình kiểm tra binary log
3. Hình thay đổi dữ liệu sau backup
4. Hình restore full backup
5. Hình áp dụng binary log và kiểm tra kết quả

## 7. Cách viết lại vào báo cáo

Khi đưa vào Chương 6, chỉ nên giữ:

- lý do cần backup;
- chiến lược `full backup + binary log`;
- một ví dụ backup;
- quy trình phục hồi gồm restore full backup và áp dụng `binary log`;
- kết luận ngắn về ưu điểm và giới hạn.

Không nên đưa toàn bộ checklist triển khai, vì phần đó thuộc tài liệu hỗ trợ chứ không phải văn bản báo cáo.

## 8. Giới hạn cần nêu rõ

Để trình bày trung thực, nên nêu các giới hạn sau:

- đây là phương án triển khai ở mức cơ bản, chưa phải mô hình backup enterprise hoàn chỉnh;
- chưa dùng incremental physical backup chuyên dụng;
- chưa tự động hóa hoàn toàn lịch backup;
- chưa triển khai phục hồi đầy đủ đến từng mốc thời gian cụ thể.

## 9. Thứ tự làm nhanh nhất

1. Import schema và seed dữ liệu.
2. Tạo full backup bằng `mysqldump`.
3. Kiểm tra `binary log`.
4. Restore sang `lms_restore`.
5. Áp dụng `binary log` vào `lms_restore`.
6. Chụp hình minh chứng.
7. Chèn hình vào Chương 6 trong báo cáo.
