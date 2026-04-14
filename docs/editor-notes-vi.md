# Ghi chú biên tập riêng

File này tách riêng các nhận xét và đề xuất biên tập khỏi thân báo cáo chính để tiện theo dõi khi chỉnh sửa.

## 1. Mục đích của file

Các ý trong file này không phải là nội dung bắt buộc phải giữ nguyên trong báo cáo. Đây là phần ghi chú riêng nhằm chỉ ra:

- chỗ nào trong báo cáo có thể viết mạnh hơn hoặc mềm hơn
- chỗ nào nên thêm minh chứng thực tế
- chỗ nào là nhận xét biên tập, không nên chèn thẳng vào thân bài nếu chưa cân nhắc

## 2. Các điểm nên giữ nguyên trong báo cáo

- Cách viết về chuẩn hóa ở mức thận trọng, không khẳng định tuyệt đối toàn bộ lược đồ đạt 3NF.
- Cách trình bày replication và sharding ở mức định hướng lý thuyết, không mô tả như đã triển khai thực tế.
- Cách tách riêng phần nhận xét về sai lệch giữa schema và backend để tránh làm lẫn với phần thiết kế cơ sở dữ liệu.

## 3. Các điểm có thể cân nhắc chỉnh tay khi dàn Word

- Nếu giảng viên thích văn phong thuần Việt hơn, có thể đổi thêm một số chỗ còn giữ thuật ngữ tiếng Anh như `frontend`, `backend`, `migration`, `seed`, `EXPLAIN`.
- Nếu muốn báo cáo nhìn học thuật hơn, có thể đổi một số danh sách bullet ngắn thành bảng, đặc biệt ở phần mục tiêu, phạm vi và kết quả đạt được.

Gợi ý cụ thể:

- Chương 1, mục 1.2: có thể đổi danh sách mục tiêu nghiên cứu thành bảng 2 cột gồm `STT` và `Mục tiêu`.
- Chương 1, mục 1.3: có thể đổi phần phạm vi đề tài thành bảng 2 cột gồm `Nội dung` và `Mô tả`.
- Chương 8, mục 8.1: có thể đổi phần kết quả đạt được thành bảng 2 cột gồm `Nội dung` và `Kết quả chính`.

- Nếu muốn phần Chương 2 dày hơn, có thể bổ sung 1 đoạn ngắn mô tả luồng học tập điển hình của học viên từ lúc đăng nhập đến khi hoàn thành bài kiểm tra.

Trạng thái hiện tại:

- Đoạn “Luồng học tập điển hình của học viên” đã được bổ sung vào Chương 2 của bản tổng và chương riêng.

## 4. Các điểm bắt buộc nên bổ sung trước khi nộp

- Ảnh ERD sau khi xuất từ Mermaid hoặc công cụ vẽ sơ đồ.
- Ảnh kết quả tạo cơ sở dữ liệu và nạp dữ liệu mẫu.
- Ảnh `EXPLAIN` hoặc bảng kết quả thực thi truy vấn.
- Ảnh minh chứng sao lưu và phục hồi dữ liệu.
- Ảnh giao diện ứng dụng nếu giảng viên yêu cầu phần minh họa hệ thống.

## 5. Gợi ý sử dụng

- Dùng [final-report-draft-vi.md](/D:/lms-csdlnc/docs/final-report-draft-vi.md) làm bản báo cáo chính.
- Dùng file này như một checklist biên tập riêng.
- Không nên sao chép nguyên văn các gạch đầu dòng trong file này vào thân báo cáo nếu chưa xem lại ngữ cảnh.
