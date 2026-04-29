# Trạng Thái Minh Chứng Thực Tế

Tài liệu này ghi rõ những minh chứng nào đã có sẵn trong repo và những minh chứng nào cần được tạo trên máy có MySQL.

## 1. Minh chứng đã hoàn thành trong repo

- Bộ nội dung báo cáo từ Chương 1 đến Chương 8
- Data Dictionary chi tiết
- Danh sách chỉ mục
- Truy vấn mẫu
- Hướng dẫn backup/restore
- Hướng dẫn EXPLAIN
- Sơ đồ ERD dạng Mermaid
- Ghi chú sai lệch schema-code
- Runbook triển khai replication trong [infra/mysql-replication/README-vi.md](/D:/lms-csdlnc/infra/mysql-replication/README-vi.md)
- Cấu hình Docker và script hỗ trợ cho `primary`, `replica`, `failover-manager`

## 2. Minh chứng đã được tạo trong quá trình thực nghiệm

Đã kiểm chứng được các nội dung sau trên môi trường MySQL Docker:

- khởi tạo hai node `primary` và `replica`
- bật `GTID replication` thành công
- kiểm tra `SHOW REPLICA STATUS` với `Replica_IO_Running = Yes` và `Replica_SQL_Running = Yes`
- kiểm chứng ghi dữ liệu ở primary và đọc được ở replica
- kiểm chứng backend tách truy vấn đọc và ghi qua log `[DB:read]` và `[DB:write]`
- kiểm chứng automatic failover bằng cách dừng primary, promote replica và tiếp tục ghi dữ liệu từ backend

## 3. Minh chứng vẫn nên bổ sung thêm khi dàn báo cáo

Để bản nộp hoàn thiện hơn, vẫn nên bổ sung các ảnh hoặc ảnh chụp màn hình sau:

- ảnh kết quả `SHOW REPLICA STATUS`
- ảnh log backend khi thực hiện `read/write split`
- ảnh log `Automatic failover completed`
- ảnh dữ liệu trước và sau failover
- ảnh kết quả chạy `EXPLAIN`
- ảnh kết quả backup bằng `mysqldump`
- ảnh kết quả restore

## 4. Cách bổ sung để báo cáo đạt mức hoàn chỉnh cao

Cần thực hiện trên một máy đã cài MySQL hoặc đang chạy Docker MySQL:

1. Tạo database `lms`
2. Chạy schema `backend/lms.sql`
3. Chạy seed SQL
4. Chạy các truy vấn trong `docs/sql/explain_queries.sql`
5. Chụp màn hình kết quả `EXPLAIN`
6. Chạy backup/restore và chụp minh chứng

## 5. Cách viết trung thực trong báo cáo

Đối với các nội dung replication đã chạy thật, có thể viết:

- “Nhóm đã triển khai mô hình replication `primary - replica` trên môi trường container.”
- “Backend đã được chỉnh sửa để tách truy vấn đọc và truy vấn ghi.”
- “Cơ chế automatic failover ở mức thực nghiệm đã được kiểm thử bằng cách dừng node primary và quan sát quá trình promote replica.”

Đối với các nội dung chưa có ảnh chụp hoặc phụ lục thao tác đầy đủ, nên viết:

- “Báo cáo đề xuất quy trình và lệnh thực hiện backup/restore.”
- “Các truy vấn EXPLAIN đã được chuẩn bị sẵn để thử nghiệm.”

Không nên viết:

- “Hệ thống đã được backup thành công.” nếu chưa có ảnh hoặc output thực tế
- “Đã triển khai EXPLAIN và đo được hiệu năng.” nếu chưa có kết quả chạy thật
