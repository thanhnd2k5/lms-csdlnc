# Chương 8. Kết luận và hướng phát triển

## 8.1. Kết quả đạt được

Báo cáo đã trình bày được các nội dung cốt lõi của một đề tài cơ sở dữ liệu gắn với hệ thống LMS. Cụ thể, báo cáo đã mô tả bài toán nghiệp vụ, xác định các thực thể dữ liệu chính, xây dựng lược đồ logic và lược đồ vật lý, phân tích mức độ chuẩn hóa, trình bày quá trình khởi tạo cơ sở dữ liệu, xem xét các yếu tố tối ưu truy vấn, đồng thời đề xuất quy trình sao lưu, phục hồi và các hướng mở rộng nâng cao.

## 8.2. Đánh giá tổng quát về lược đồ dữ liệu của hệ thống

Lược đồ dữ liệu của hệ thống có cấu trúc tương đối hợp lý và phản ánh được các nhóm nghiệp vụ chính của một hệ thống LMS như quản lý người dùng, nội dung học tập, đánh giá, ghi danh và lớp học. Bên cạnh đó, quá trình đối chiếu với phần triển khai backend cũng cho thấy vẫn còn một số điểm cần tiếp tục đồng bộ để hệ thống hoàn thiện hơn.

## 8.3. Hạn chế của đề tài

Bên cạnh các kết quả đã đạt được, đề tài vẫn còn một số hạn chế. Trước hết, phần minh chứng thực nghiệm cho `EXPLAIN`, sao lưu và phục hồi còn phụ thuộc vào môi trường MySQL thực tế nên chưa thể hoàn thiện đầy đủ ngay trong toàn bộ tài liệu. Ngoài ra, một số nội dung nâng cao như replication và sharding mới được phân tích ở mức định hướng, chưa có điều kiện triển khai thực tế. Bên cạnh đó, giữa lược đồ dữ liệu và phần triển khai backend vẫn còn một vài điểm chưa đồng bộ và cần tiếp tục chỉnh sửa trong giai đoạn sau.

## 8.4. Hướng phát triển

Trong thời gian tới, hệ thống có thể được hoàn thiện theo một số hướng chính. Thứ nhất là tiếp tục đồng bộ giữa lược đồ dữ liệu và mã nguồn backend để giảm sai lệch trong quá trình triển khai. Thứ hai là bổ sung đầy đủ minh chứng thực nghiệm cho `EXPLAIN`, sao lưu và phục hồi khi có môi trường MySQL phù hợp. Thứ ba là hoàn thiện hơn bộ migration, seed và dữ liệu mẫu để phục vụ kiểm thử và minh họa rõ hơn quá trình phát triển cơ sở dữ liệu. Cuối cùng, nếu hệ thống được mở rộng trong tương lai, có thể nghiên cứu triển khai replication ở mức cơ bản như một bước đi thực tế trước khi xem xét các kỹ thuật phân tán phức tạp hơn.

## 8.5. Kết luận chung

Qua đề tài này có thể thấy cơ sở dữ liệu SQL giữ vai trò trung tâm trong việc tổ chức và vận hành một hệ thống quản lý học tập trực tuyến. Việc xây dựng lược đồ phù hợp, thiết lập ràng buộc rõ ràng, chuẩn hóa dữ liệu và quan tâm tới tối ưu truy vấn là những yếu tố quyết định chất lượng của hệ thống. Trên cơ sở đó, đề tài đã đáp ứng được mục tiêu chính của học phần và tạo nền tảng để tiếp tục hoàn thiện trong các giai đoạn sau.
