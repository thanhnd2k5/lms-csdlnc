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

## 2. Minh chứng chưa thể tạo trong workspace hiện tại

Môi trường hiện tại không có:

- lệnh `mysql`
- lệnh `mysqldump`

Do đó, các minh chứng sau chưa thể tạo trực tiếp trong workspace này:

- ảnh kết quả chạy `EXPLAIN`
- ảnh kết quả backup bằng `mysqldump`
- ảnh kết quả restore
- ảnh import schema vào DBMS
- ảnh dữ liệu seed sau khi nạp vào database

## 3. Cách bổ sung để báo cáo đạt mức hoàn chỉnh cao

Cần thực hiện trên một máy đã cài MySQL:

1. Tạo database `lms`
2. Chạy schema `backend/lms.sql`
3. Chạy seed SQL
4. Chạy các truy vấn trong `docs/sql/explain_queries.sql`
5. Chụp màn hình kết quả `EXPLAIN`
6. Chạy backup/restore và chụp minh chứng

## 4. Cách viết trung thực trong báo cáo

Nếu chưa bổ sung minh chứng thực tế, nên viết:

- “Báo cáo đề xuất quy trình và lệnh thực hiện backup/restore.”
- “Các truy vấn EXPLAIN đã được chuẩn bị sẵn để thử nghiệm.”

Không nên viết:

- “Hệ thống đã được backup thành công.” nếu chưa có ảnh hoặc output thực tế
- “Đã triển khai EXPLAIN và đo được hiệu năng.” nếu chưa có kết quả chạy thật
