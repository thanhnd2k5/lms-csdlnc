# Chương 8. Kết luận và hướng phát triển

## 8.1. Kết quả đạt được

Báo cáo đã phân tích được:

- bài toán nghiệp vụ
- mô hình dữ liệu
- lược đồ logic và vật lý
- chuẩn hóa
- khởi tạo CSDL
- tối ưu
- backup/restore
- hướng mở rộng nâng cao

## 8.2. Đánh giá tổng quát về schema của hệ thống

Schema của hệ thống có cấu trúc hợp lý, thể hiện đầy đủ các nhóm nghiệp vụ chính của hệ thống LMS. Tuy nhiên, vẫn còn một số điểm chưa đồng bộ với phần triển khai backend.

## 8.3. Hạn chế của đề tài

- chưa có migration tách riêng theo phiên bản
- chưa có seed chuẩn hóa trong bộ mã nguồn chính thức của dự án
- chưa có minh chứng triển khai thực tế cho replication, sharding

## 8.4. Hướng phát triển

- hoàn thiện tính đồng bộ giữa schema và code
- bổ sung migration và seed
- bổ sung minh chứng `EXPLAIN`
- mở rộng backup và replication

## 8.5. Kết luận chung

Đề tài đã cho thấy vai trò trung tâm của cơ sở dữ liệu SQL trong việc xây dựng hệ thống quản lý học tập trực tuyến. Schema của LMS CSDLNC là nền tảng phù hợp để trình bày trong môn Cơ sở dữ liệu và có khả năng tiếp tục hoàn thiện trong các giai đoạn sau.
