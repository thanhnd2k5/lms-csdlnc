# Mẫu Ghi Kết Quả Kiểm Tra Hiệu Năng

Anh có thể copy bảng này vào báo cáo sau khi chạy thực tế.

## 1. Truy vấn thống kê số học viên theo khóa học

| Tiêu chí | Before | After |
|---|---|---|
| Chỉ mục sử dụng | ... | ... |
| Thời gian thực thi | ... ms | ... ms |
| Nhận xét `EXPLAIN` | ... | ... |

Nhận xét gợi ý:

- Before:
  - ...
- After:
  - ...

## 2. Truy vấn tiến độ học tập của học viên

| Tiêu chí | Before | After |
|---|---|---|
| Chỉ mục sử dụng | ... | ... |
| Thời gian thực thi | ... ms | ... ms |
| Nhận xét `EXPLAIN` | ... | ... |

Nhận xét gợi ý:

- Before:
  - ...
- After:
  - ...

## 3. Kết luận chung

Có thể viết theo mẫu:

“Qua kết quả thực nghiệm, cấu hình lược đồ chính thức cho thấy kế hoạch thực thi truy vấn hợp lý hơn so với cấu hình before. Trên tập dữ liệu thử nghiệm hiện tại, mức chênh lệch thời gian có thể chưa lớn, nhưng sự thay đổi trong `EXPLAIN` cho thấy các chỉ mục trong thiết kế hiện tại đã hỗ trợ truy vấn hiệu quả hơn. Điều này có ý nghĩa quan trọng khi hệ thống mở rộng về quy mô dữ liệu trong thực tế.”
