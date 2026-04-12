# Chương 7. Kỹ thuật nâng cao

## 7.1. Replication

Replication là cơ chế sao chép dữ liệu từ máy chủ chính sang máy chủ phụ để:

- tăng tính sẵn sàng
- giảm tải truy vấn đọc
- hỗ trợ dự phòng

## 7.2. Sharding

Sharding là kỹ thuật phân tách dữ liệu thành nhiều phần trên nhiều máy chủ.

Trong hệ thống LMS, các bảng có thể xem xét sharding về mặt lý thuyết là:

- `course_enrollments`
- `video_completion`
- `quiz_attempts`
- `quiz_answers`

## 7.3. Đánh giá khả năng áp dụng

Trong giai đoạn hiện tại:

- replication là hướng nâng cấp thực tế hơn
- sharding là hướng nâng cấp cho quy mô lớn hơn

## 7.4. Kết luận

Hai kỹ thuật này được đưa vào báo cáo như nội dung mở rộng mang tính định hướng, không mô tả như đã triển khai thực tế.
