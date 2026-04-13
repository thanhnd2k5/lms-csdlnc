# Mẫu Ghi Kết Quả Kiểm Tra Hiệu Năng

Anh có thể copy bảng này vào báo cáo sau khi chạy thực tế.

## 1. Truy vấn thống kê số học viên theo khóa học

| Tiêu chí | Trước tối ưu | Sau tối ưu |
|---|---|---|
| Chỉ mục sử dụng | ... | ... |
| Thời gian thực thi | ... ms | ... ms |
| Nhận xét `EXPLAIN` | ... | ... |

Nhận xét gợi ý:

- Trước tối ưu:
  - ...
- Sau tối ưu:
  - ...

## 2. Truy vấn tiến độ học tập của học viên

| Tiêu chí | Trước tối ưu | Sau tối ưu |
|---|---|---|
| Chỉ mục sử dụng | ... | ... |
| Thời gian thực thi | ... ms | ... ms |
| Nhận xét `EXPLAIN` | ... | ... |

Nhận xét gợi ý:

- Trước tối ưu:
  - ...
- Sau tối ưu:
  - ...

## 3. Kết luận chung

Có thể viết theo mẫu:

“Qua kết quả thực nghiệm, việc bổ sung chỉ mục giúp cải thiện kế hoạch thực thi truy vấn. Trên tập dữ liệu thử nghiệm hiện tại, mức chênh lệch thời gian có thể chưa lớn, nhưng sự thay đổi trong `EXPLAIN` cho thấy cơ sở dữ liệu đã sử dụng chỉ mục hiệu quả hơn. Điều này có ý nghĩa quan trọng khi hệ thống mở rộng về quy mô dữ liệu trong thực tế.”
