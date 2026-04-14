# Chương 7. Kỹ thuật nâng cao

Phần kỹ thuật nâng cao được đưa vào báo cáo nhằm mở rộng góc nhìn từ một hệ cơ sở dữ liệu phục vụ học tập sang khả năng vận hành ở quy mô lớn hơn trong tương lai. Trong đó, replication và sharding là hai hướng thường được nhắc đến khi hệ thống cần tăng khả năng sẵn sàng, mở rộng tải hoặc phục vụ số lượng người dùng lớn.

Trong phạm vi đề tài này, hai kỹ thuật trên được phân tích ở mức định hướng lý thuyết. Mục tiêu của phần này là chỉ ra khả năng áp dụng đối với hệ thống LMS, không phải mô tả một giải pháp đã được triển khai và kiểm chứng thực tế.

## 7.1. Replication

Replication là cơ chế sao chép dữ liệu từ máy chủ chính sang một hoặc nhiều máy chủ phụ nhằm tăng độ sẵn sàng của hệ thống. Đối với bài toán LMS, replication phù hợp trong trường hợp cần tăng khả năng dự phòng và phân tách tải đọc khỏi máy chủ xử lý ghi chính.

Những lợi ích chính của replication có thể kể đến:

- tăng tính sẵn sàng
- giảm tải truy vấn đọc
- hỗ trợ dự phòng

## 7.2. Sharding

Sharding là kỹ thuật phân tách dữ liệu thành nhiều phần và lưu trữ trên nhiều máy chủ khác nhau. So với replication, sharding không chỉ sao chép dữ liệu mà còn phân chia dữ liệu để phục vụ hệ thống ở quy mô rất lớn.

Trong hệ thống LMS, các bảng có thể xem xét sharding về mặt lý thuyết là:

- `course_enrollments`
- `video_completion`
- `quiz_attempts`
- `quiz_answers`

## 7.3. Đánh giá khả năng áp dụng

Trong giai đoạn hiện tại của đề tài, replication là hướng nâng cấp thực tế hơn vì có thể áp dụng sớm để tăng khả năng dự phòng và hỗ trợ phân tải truy vấn đọc. Trong khi đó, sharding chỉ thực sự cần thiết khi hệ thống đạt đến quy mô dữ liệu rất lớn và phát sinh yêu cầu phân tán dữ liệu trên nhiều máy chủ.

## 7.4. Kết luận

Hai kỹ thuật trên được đưa vào báo cáo như nội dung mở rộng mang tính định hướng. Trong phạm vi hiện tại, hệ thống chưa triển khai thực tế replication hoặc sharding, do đó phần này chỉ dừng ở mức đề xuất khả năng áp dụng và phân tích lý thuyết.
