# Hướng Dẫn Kiểm Tra Hiệu Năng Trước và Sau Tối Ưu

Tài liệu này dùng để bổ sung phần thực nghiệm cho Chương 5, giúp báo cáo mạnh hơn về mặt kỹ thuật.

## 1. Mục tiêu

Mục tiêu là chứng minh việc bổ sung chỉ mục có tác động tích cực đến truy vấn thông qua:

- kế hoạch thực thi `EXPLAIN`
- thời gian thực thi trước tối ưu
- thời gian thực thi sau tối ưu

## 2. Nên chọn bao nhiêu truy vấn

Chỉ nên chọn 1 đến 2 truy vấn tiêu biểu để phần này gọn mà vẫn đủ mạnh.

Khuyến nghị:

1. Truy vấn thống kê số học viên theo khóa học
2. Truy vấn tiến độ học tập của học viên

## 3. Cách thực hiện

Với mỗi truy vấn, làm theo thứ tự:

1. Chạy truy vấn khi chưa thêm chỉ mục đề xuất
2. Ghi nhận thời gian thực thi
3. Chạy `EXPLAIN`
4. Thêm chỉ mục
5. Chạy lại truy vấn
6. Ghi nhận thời gian thực thi sau tối ưu
7. Chạy lại `EXPLAIN`
8. So sánh kết quả

## 4. Cách đo thời gian

Nếu dùng MySQL client, có thể:

- bật chế độ timing nếu công cụ hỗ trợ
- hoặc ghi lại thời gian thủ công từ giao diện DBMS

Nếu dùng các công cụ như MySQL Workbench, DBeaver hoặc phpMyAdmin:

- chụp ảnh phần execution time
- chụp ảnh bảng kết quả

## 5. Những gì cần chụp màn hình

Cho mỗi truy vấn nên có:

- ảnh truy vấn trước tối ưu
- ảnh thời gian trước tối ưu
- ảnh `EXPLAIN` trước tối ưu
- ảnh lệnh tạo index
- ảnh truy vấn sau tối ưu
- ảnh thời gian sau tối ưu
- ảnh `EXPLAIN` sau tối ưu

## 6. Cách trình bày trong báo cáo

Nên có một bảng so sánh:

| Truy vấn | Trạng thái | Chỉ mục sử dụng | Thời gian thực thi | Nhận xét |
|---|---|---|---|---|
| Thống kê học viên theo khóa học | Trước tối ưu | Chưa có | ... ms | Quét nhiều dữ liệu hơn |
| Thống kê học viên theo khóa học | Sau tối ưu | Có | ... ms | Kế hoạch truy vấn tốt hơn |

## 7. Nếu chênh lệch thời gian không lớn

Điều này hoàn toàn có thể xảy ra nếu dữ liệu mẫu nhỏ.

Khi đó nên viết:

- Trên tập dữ liệu thử nghiệm có kích thước nhỏ, sự khác biệt về thời gian chưa quá rõ rệt.
- Tuy nhiên, kết quả `EXPLAIN` cho thấy kế hoạch truy vấn đã được cải thiện nhờ hệ quản trị sử dụng chỉ mục thay vì quét toàn bảng hoặc giảm mức độ quét dữ liệu.

## 8. Kết luận gợi ý

Có thể viết:

“Qua thực nghiệm, việc bổ sung chỉ mục chưa chắc luôn tạo ra khác biệt lớn về thời gian trên tập dữ liệu nhỏ, nhưng đã cải thiện kế hoạch thực thi truy vấn. Điều này cho thấy việc thiết kế chỉ mục hợp lý là cần thiết, đặc biệt khi hệ thống mở rộng và dữ liệu tăng lên trong thực tế.”
