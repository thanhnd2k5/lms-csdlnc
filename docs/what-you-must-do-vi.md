# Những Việc Anh Cần Tự Làm Trước Khi Nộp Bài

Tài liệu này liệt kê chính xác các việc anh cần tự thực hiện để bộ báo cáo đạt mức hoàn chỉnh cao nhất.

## 1. Những việc bắt buộc nên làm

### 1.1. Chạy schema trên MySQL

Anh cần:

1. Tạo database `lms`
2. Import file `backend/lms.sql`
3. Kiểm tra các bảng đã được tạo thành công

Mục đích:

- Có minh chứng ảnh cho phần khởi tạo CSDL
- Có cơ sở để chạy seed, truy vấn và `EXPLAIN`

### 1.2. Chạy seed dữ liệu mẫu

Anh cần chạy:

- [seed.sql](/D:/lms-csdlnc/docs/sql/seed.sql)

Mục đích:

- Có dữ liệu để minh họa truy vấn
- Có dữ liệu để chụp ảnh các bảng
- Có dữ liệu để chạy `EXPLAIN`

### 1.3. Chạy các truy vấn mẫu và `EXPLAIN`

Anh cần chạy:

- [explain_queries.sql](/D:/lms-csdlnc/docs/sql/explain_queries.sql)

Mục đích:

- Chụp minh chứng cho Chương 5
- Có cơ sở nhận xét về index và tối ưu

### 1.4. Chạy backup và restore

Anh cần tự chạy trên máy có MySQL:

```powershell
mysqldump -u root -p lms > lms_backup.sql
```

```powershell
mysql -u root -p lms_restore < lms_backup.sql
```

Mục đích:

- Chụp minh chứng cho Chương 6
- Làm phần backup/restore thuyết phục hơn

### 1.5. Chụp ảnh giao diện ứng dụng

Anh nên chụp:

- trang đăng nhập
- trang danh sách khóa học
- trang học video
- trang quiz
- trang lớp học

Mục đích:

- Đáp ứng phần “Ứng dụng - Ảnh minh họa”
- Làm báo cáo bớt khô

## 2. Những việc nên làm để bài đẹp hơn

### 2.1. Xuất sơ đồ ERD thành ảnh

Anh nên dùng:

- [erd-mermaid.md](/D:/lms-csdlnc/docs/erd-mermaid.md)

để xuất thành ảnh PNG hoặc SVG rồi chèn vào báo cáo.

### 2.2. Dàn lại báo cáo trong Word

Anh nên:

- thêm trang bìa
- thêm mục lục
- thêm danh mục hình
- thêm đánh số bảng/hình
- căn lề, font và giãn dòng

### 2.3. Kiểm tra lỗi chính tả cuối

Đặc biệt nên rà:

- tên bảng
- tên cột
- caption hình
- tên chương

## 3. Những việc không bắt buộc nhưng rất có lợi

### 3.1. Chỉnh lại một vài chỗ lệch giữa schema và code

Tham khảo:

- [schema-gap-notes.md](/D:/lms-csdlnc/docs/schema-gap-notes.md)

Nếu anh sửa được vài chỗ rồi chụp minh chứng, phần trao đổi với giảng viên sẽ chắc hơn.

### 3.2. Viết thêm một đoạn “đóng góp cá nhân”

Nếu cần, anh có thể thêm cuối báo cáo:

- những gì đã làm được
- khó khăn khi đối chiếu schema và code
- định hướng hoàn thiện hệ thống

## 4. Thứ tự làm nhanh nhất

Nếu anh muốn đi nhanh, làm theo đúng thứ tự này:

1. Dùng [final-report-draft-vi.md](/D:/lms-csdlnc/docs/final-report-draft-vi.md) làm bản chính
2. Import `backend/lms.sql`
3. Chạy [seed.sql](/D:/lms-csdlnc/docs/sql/seed.sql)
4. Chạy [explain_queries.sql](/D:/lms-csdlnc/docs/sql/explain_queries.sql)
5. Chạy backup/restore
6. Chụp ảnh ứng dụng
7. Chèn hình vào báo cáo
8. Dàn trang Word/PDF

## 5. Kết luận ngắn

Phần nội dung tôi đã chuẩn bị gần đầy đủ. Phần anh cần tự làm chủ yếu là phần minh chứng thực tế và phần trình bày cuối cùng.
