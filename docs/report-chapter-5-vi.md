# Chương 5. Tối ưu và vận hành cơ sở dữ liệu

## 5.1. Vai trò của tối ưu cơ sở dữ liệu

Tối ưu cơ sở dữ liệu nhằm đảm bảo hệ thống có thể truy vấn dữ liệu nhanh, nhất là khi số lượng học viên, khóa học và dữ liệu học tập tăng lên.

## 5.2. Danh sách chỉ mục trong schema

Chi tiết được trình bày trong:

- [appendix-indexes-vi.md](/D:/lms-csdlnc/docs/appendix-indexes-vi.md)

## 5.3. Các truy vấn tiêu biểu và EXPLAIN

Các truy vấn mẫu và lệnh `EXPLAIN` được tổng hợp trong:

- [appendix-queries-vi.md](/D:/lms-csdlnc/docs/appendix-queries-vi.md)
- [explain_queries.sql](/D:/lms-csdlnc/docs/sql/explain_queries.sql)

`[Chèn Hình 5.1. Kết quả EXPLAIN tại đây]`

## 5.4. Nhận xét về hiệu năng schema hiện tại

Schema đã có nền tảng tối ưu cơ bản, nhưng vẫn có thể bổ sung thêm chỉ mục trên các cột join và cột lọc như:

- `courses.teacher_id`
- `videos.course_id`
- `documents.course_id`
- `course_enrollments.course_id`

## 5.5. Kết luận

Schema hiện tại đã có một số chỉ mục quan trọng và có thể tiếp tục được cải thiện để phục vụ hệ thống ở quy mô lớn hơn.
