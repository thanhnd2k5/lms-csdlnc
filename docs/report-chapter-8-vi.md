# Chương 8. Kết luận và hướng phát triển

## 8.1. Kết quả đạt được

Báo cáo đã trình bày được các nội dung chính của một đề tài cơ sở dữ liệu gắn với hệ thống LMS, bao gồm:

- bài toán nghiệp vụ
- mô hình dữ liệu
- lược đồ logic và vật lý
- chuẩn hóa
- khởi tạo CSDL
- tối ưu
- backup/restore
- hướng mở rộng nâng cao

## 8.2. Đánh giá tổng quát về schema của hệ thống

Lược đồ dữ liệu của hệ thống có cấu trúc tương đối hợp lý và phản ánh được các nhóm nghiệp vụ chính của một hệ thống LMS như quản lý người dùng, nội dung học tập, đánh giá, ghi danh và lớp học. Bên cạnh đó, quá trình đối chiếu với phần triển khai backend cũng cho thấy vẫn còn một số điểm cần tiếp tục đồng bộ để hệ thống hoàn thiện hơn.

## 8.3. Hạn chế của đề tài

- phần minh chứng thực nghiệm cho `EXPLAIN`, backup và restore còn phụ thuộc vào môi trường MySQL thực tế
- một số nội dung nâng cao như replication và sharding mới dừng ở mức định hướng
- giữa schema và phần triển khai backend vẫn còn một vài điểm chưa đồng bộ cần tiếp tục chỉnh sửa

## 8.4. Hướng phát triển

- tiếp tục hoàn thiện tính đồng bộ giữa schema và mã nguồn backend
- bổ sung đầy đủ minh chứng thực nghiệm cho `EXPLAIN`, backup và restore
- hoàn thiện hơn bộ migration, seed và dữ liệu mẫu phục vụ kiểm thử
- nghiên cứu triển khai replication ở mức cơ bản nếu hệ thống được mở rộng trong tương lai

## 8.5. Kết luận chung

Qua đề tài này có thể thấy cơ sở dữ liệu SQL giữ vai trò trung tâm trong việc tổ chức và vận hành một hệ thống quản lý học tập trực tuyến. Việc xây dựng schema phù hợp, thiết lập ràng buộc rõ ràng, chuẩn hóa dữ liệu và quan tâm tới tối ưu truy vấn là những yếu tố quyết định chất lượng của hệ thống. Trên cơ sở đó, đề tài đã đáp ứng được mục tiêu chính của học phần và tạo nền tảng để tiếp tục hoàn thiện trong các giai đoạn sau.
