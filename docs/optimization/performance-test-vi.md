# Hướng Dẫn Kiểm Tra Hiệu Năng Trước và Sau Tối Ưu

Tài liệu này dùng để bổ sung phần thực nghiệm cho Chương 5, giúp báo cáo mạnh hơn về mặt kỹ thuật.

## 1. Mục tiêu

Mục tiêu là chứng minh các chỉ mục trong lược đồ chính thức của hệ thống có tác động tích cực đến truy vấn thông qua:

- kế hoạch thực thi `EXPLAIN`
- thời gian thực thi trên cấu hình before
- thời gian thực thi trên cấu hình after

## 2. Nên chọn bao nhiêu truy vấn

Chỉ nên chọn 1 đến 2 truy vấn tiêu biểu để phần này gọn mà vẫn đủ mạnh.

Khuyến nghị:

1. Truy vấn báo cáo kết quả học tập của học viên theo khóa học công khai
2. Truy vấn phân rã tiến độ học tập của học viên theo từng chương

Có thể dùng thêm truy vấn phân bố đánh giá theo `course_id` và `rating` như ví dụ bổ sung để chụp rất rõ tác dụng của composite index.

## 3. Cách thực hiện

Với mỗi truy vấn, làm theo thứ tự:

1. Tạo database thử nghiệm `before`
2. Import `docs/optimization/sql/schema_benchmark_before.sql`
3. Nạp dữ liệu mẫu
4. Chạy các truy vấn trong `docs/optimization/sql/performance_before_after.sql`
5. Ghi nhận thời gian thực thi và `EXPLAIN`
6. Tạo database thử nghiệm `after`
7. Import `backend/lms.sql`
8. Nạp lại cùng bộ dữ liệu mẫu
9. Chạy lại đúng các truy vấn trong `docs/optimization/sql/performance_before_after.sql`
10. Ghi nhận thời gian thực thi và `EXPLAIN`
11. So sánh kết quả giữa hai cấu hình

## 4. Cách đo thời gian

Nếu dùng MySQL client, có thể:

- bật chế độ timing nếu công cụ hỗ trợ
- hoặc ghi lại thời gian thủ công từ giao diện DBMS

Nếu dùng các công cụ như MySQL Workbench, DBeaver hoặc phpMyAdmin:

- chụp ảnh phần execution time
- chụp ảnh bảng kết quả

## 5. Những gì cần chụp màn hình

Cho mỗi truy vấn nên có:

- ảnh truy vấn trên cấu hình before
- ảnh thời gian thực thi trên cấu hình before
- ảnh `EXPLAIN` trên cấu hình before
- ảnh truy vấn trên cấu hình after
- ảnh thời gian thực thi trên cấu hình after
- ảnh `EXPLAIN` trên cấu hình after

## 6. Cách trình bày trong báo cáo

Nên có một bảng so sánh:

| Truy vấn | Trạng thái | Chỉ mục sử dụng | Thời gian thực thi | Nhận xét |
|---|---|---|---|---|
| Báo cáo kết quả học tập của học viên | Before | ... | ... ms | Quét và nối nhiều dữ liệu hơn |
| Báo cáo kết quả học tập của học viên | After | ... | ... ms | Tận dụng tốt hơn các chỉ mục lọc và nối |

## 7. Nếu chênh lệch thời gian không lớn

Điều này hoàn toàn có thể xảy ra nếu dữ liệu mẫu nhỏ.

Khi đó nên viết:

- Trên tập dữ liệu thử nghiệm có kích thước nhỏ, sự khác biệt về thời gian có thể chưa quá rõ rệt.
- Tuy nhiên, kết quả `EXPLAIN` vẫn có ý nghĩa nếu cho thấy hệ quản trị giảm `filesort`, giảm mức độ quét dữ liệu, hoặc sử dụng composite index đúng với cột lọc và sắp xếp.
- Nếu mục tiêu là chứng minh chênh lệch thời gian rõ ràng, nên tăng thêm dữ liệu ở các bảng `quiz_attempts`, `course_enrollments`, `video_completion`, `course_reviews` trước khi chạy benchmark.

## 8. Kết luận gợi ý

Có thể viết:

“Qua thực nghiệm, cấu hình lược đồ chính thức với các chỉ mục đã thiết kế cho kết quả thực thi tốt hơn hoặc cho thấy kế hoạch truy vấn hợp lý hơn so với cấu hình before. Điều này cho thấy các chỉ mục trong thiết kế hiện tại có vai trò thực sự đối với hiệu năng truy vấn, đặc biệt khi hệ thống mở rộng và dữ liệu tăng lên trong thực tế.”
