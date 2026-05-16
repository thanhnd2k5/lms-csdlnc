# Chương 9. Kết luận và hướng phát triển

## 9.1. Kết quả đạt được

Báo cáo đã trình bày được các nội dung cốt lõi của một đề tài cơ sở dữ liệu gắn với hệ thống LMS. Cụ thể, báo cáo đã mô tả bài toán nghiệp vụ, xác định các thực thể dữ liệu chính, xây dựng lược đồ logic và lược đồ vật lý, phân tích mức độ chuẩn hóa, trình bày quá trình khởi tạo cơ sở dữ liệu, xem xét các yếu tố tối ưu truy vấn, đồng thời xây dựng được phần thực nghiệm kỹ thuật nâng cao với replication, tách truy vấn đọc và ghi ở backend, và cơ chế automatic failover được kiểm thử trong môi trường thực nghiệm.

## 9.2. Đánh giá tổng quát về lược đồ dữ liệu của hệ thống

Lược đồ dữ liệu của hệ thống có cấu trúc tương đối hợp lý và phản ánh được các nhóm nghiệp vụ chính của một hệ thống LMS như quản lý người dùng, nội dung học tập, đánh giá, ghi danh và lớp học. Các quan hệ dữ liệu được sử dụng trong nhiều chức năng thực tế của ứng dụng, từ hiển thị khóa học, ghi nhận tiến độ học tập đến quản lý lớp học và tổng hợp kết quả kiểm tra.

## 9.3. Hạn chế của đề tài

Bên cạnh các kết quả đã đạt được, đề tài vẫn còn một số điểm có thể tiếp tục hoàn thiện. Các phần thực nghiệm như `EXPLAIN`, sao lưu, phục hồi và replication đã được triển khai để chứng minh nguyên lý vận hành của hệ thống, tuy nhiên quy mô dữ liệu và môi trường kiểm thử vẫn còn giới hạn so với một hệ thống production thực tế.

Đối với phần replication, mô hình hiện tại sử dụng một node `primary`, một node `replica` và một thành phần `failover-manager`. Mô hình này đã thể hiện được cơ chế sao chép dữ liệu, tách truy vấn đọc/ghi và chuyển vai trò khi node chính gặp sự cố, nhưng vẫn có thể mở rộng thêm theo hướng nhiều replica, cơ chế giám sát chi tiết hơn và quy trình tự động đưa node cũ quay lại cụm sau failover.

Ngoài ra, bộ dữ liệu thử nghiệm và các kịch bản kiểm thử hiệu năng có thể tiếp tục được mở rộng để đánh giá rõ hơn khả năng vận hành của hệ thống khi số lượng người dùng, khóa học, bài kiểm tra và lượt ghi danh tăng lên.

## 9.4. Hướng phát triển

Trong thời gian tới, hệ thống có thể được hoàn thiện theo một số hướng chính. Thứ nhất là mở rộng bộ dữ liệu kiểm thử và đo đạc hiệu năng trên quy mô dữ liệu lớn hơn để đánh giá rõ hơn tác động của chỉ mục. Thứ hai là hoàn thiện hơn bộ migration, seed và dữ liệu mẫu để phục vụ kiểm thử và minh họa rõ hơn quá trình phát triển cơ sở dữ liệu. Thứ ba là mở rộng mô hình replication hiện tại theo hướng nhiều replica, cơ chế `automatic rejoin` hoặc `automatic failback` cho node cũ, và tích hợp monitoring đầy đủ hơn. Cuối cùng, khi quy mô hệ thống tiếp tục tăng mạnh, có thể nghiên cứu thêm các kỹ thuật phân tán sâu hơn như quorum, consensus hoặc sharding cho các bảng giao dịch lớn.

## 9.5. Kết luận chung

Qua đề tài này có thể thấy cơ sở dữ liệu SQL giữ vai trò trung tâm trong việc tổ chức và vận hành một hệ thống quản lý học tập trực tuyến. Việc xây dựng lược đồ phù hợp, thiết lập ràng buộc rõ ràng, chuẩn hóa dữ liệu và quan tâm tới tối ưu truy vấn là những yếu tố quyết định chất lượng của hệ thống. Trên cơ sở đó, đề tài đã đáp ứng được mục tiêu chính của học phần và tạo nền tảng để tiếp tục hoàn thiện trong các giai đoạn sau.
