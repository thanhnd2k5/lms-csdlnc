# Chương 7. Triển khai kỹ thuật nâng cao với replication

Chương này trình bày phần thực nghiệm kỹ thuật nâng cao đã được triển khai cho hệ thống LMS. Trọng tâm của nội dung là mô hình replication theo kiến trúc `primary - replica`, cơ chế tách truy vấn đọc và ghi ở backend, cơ chế `automatic failover` được kiểm thử trong môi trường thực nghiệm, cùng với quy trình `manual rejoin` để đưa node cũ quay lại hệ thống sau sự cố. Khác với cách trình bày thuần định hướng lý thuyết, nội dung trong chương này được xây dựng trên cơ sở các bước cấu hình, kiểm thử và quan sát trực tiếp từ môi trường chạy thực tế.

## 7.1. Mục tiêu triển khai

Phần thực nghiệm được xây dựng nhằm kiểm chứng ba khả năng chính:

- triển khai được replication dữ liệu giữa hai node cơ sở dữ liệu
- tách được truy vấn đọc và truy vấn ghi ở tầng ứng dụng
- tự động chuyển vai trò ghi sang node còn hoạt động khi node chính gặp sự cố

Trong phạm vi đề tài, mục tiêu của mô hình là chứng minh tính khả thi của hướng triển khai và làm rõ nguyên lý vận hành của hệ thống, chứ chưa hướng tới một cụm chịu lỗi hoàn chỉnh như trong môi trường production quy mô lớn.

## 7.2. Kiến trúc hệ thống thực nghiệm

Kiến trúc được triển khai gồm ba thành phần chính:

- `mysql-primary`: máy chủ cơ sở dữ liệu chính, tiếp nhận toàn bộ thao tác ghi
- `mysql-replica`: máy chủ cơ sở dữ liệu phụ, đồng bộ dữ liệu từ primary và phục vụ truy vấn đọc
- `failover-manager`: thành phần giám sát trạng thái node và hỗ trợ chuyển đổi vai trò ghi khi primary ngừng hoạt động

Ở tầng ứng dụng, backend được cấu hình theo mô hình `read/write split`:

- các truy vấn đọc như `SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN` được định tuyến sang replica
- các truy vấn ghi như `INSERT`, `UPDATE`, `DELETE` được định tuyến sang primary

Kiến trúc này cho phép hệ thống vừa tận dụng replica để giảm tải đọc, vừa tạo cơ sở để kiểm thử các tình huống failover trong quá trình vận hành.

## 7.3. Thiết lập replication primary - replica

Môi trường thực nghiệm được triển khai trên container với hai node MySQL riêng biệt. Node primary được cấu hình `server-id`, `log_bin`, `binlog_format = ROW` và `gtid_mode = ON`. Node replica được cấu hình `server-id` riêng, bật `relay_log` và đồng bộ với primary theo cơ chế `GTID auto-position`.

Quy trình thiết lập gồm các bước chính:

1. Khởi tạo hai container cơ sở dữ liệu.
2. Nạp schema `lms.sql` vào node primary.
3. Tạo tài khoản replication trên primary.
4. Cấu hình replica bám theo primary bằng `CHANGE REPLICATION SOURCE TO`.
5. Khởi động replication và kiểm tra trạng thái bằng `SHOW REPLICA STATUS`.

Kết quả kiểm tra cho thấy:

- `Replica_IO_Running = Yes`
- `Replica_SQL_Running = Yes`
- `Seconds_Behind_Source = 0` trong trạng thái ổn định

Các chỉ số trên xác nhận replica đã kết nối thành công tới primary và đang áp dụng log đồng bộ đúng cách.

## 7.4. Tách truy vấn đọc và ghi trong backend

Sau khi replication hoạt động ổn định, backend được điều chỉnh để không còn sử dụng một kết nối cơ sở dữ liệu duy nhất cho mọi loại truy vấn. Thay vào đó, hệ thống sử dụng một lớp điều phối truy vấn với hai đích kết nối:

- `writePool` trỏ tới node primary
- `readPool` trỏ tới node replica

Lớp điều phối này phân loại truy vấn dựa trên câu lệnh SQL:

- truy vấn đọc được gửi sang replica
- truy vấn ghi được gửi sang primary

Trong quá trình kiểm thử, log backend hiển thị rõ hướng đi của truy vấn dưới dạng:

- `[DB:read] ...`
- `[DB:write] ...`

Kết quả quan sát cho thấy:

- các endpoint lấy dữ liệu khóa học và thông tin người dùng được xử lý bởi replica
- các thao tác tạo người dùng, tạo khóa học hoặc cập nhật dữ liệu được xử lý bởi primary

Điều này chứng minh cơ chế `read/write split` đã được tích hợp thành công vào tầng ứng dụng, thay vì chỉ dừng ở mức cấu hình cơ sở dữ liệu.

## 7.5. Cơ chế automatic failover

Để nâng mức thực nghiệm vượt lên trên replication cơ bản, hệ thống được bổ sung thành phần `failover-manager`. Thành phần này định kỳ kiểm tra trạng thái kết nối tới node primary. Khi phát hiện primary mất kết nối liên tiếp vượt quá ngưỡng cấu hình, hệ thống thực hiện các bước sau:

1. xác nhận replica vẫn còn hoạt động
2. dừng cơ chế replica trên node phụ
3. hủy trạng thái chỉ đọc trên replica
4. cập nhật node ghi hiện tại cho backend

Sau khi quá trình trên hoàn tất, replica được promote thành primary mới và backend bắt đầu gửi các truy vấn ghi sang node mới này.

Trong thực nghiệm, khi dừng container `mysql-primary`, log hệ thống ghi nhận:

- các lần kiểm tra sức khỏe thất bại liên tiếp
- thông báo `Automatic failover completed`
- địa chỉ node ghi mới được cập nhật sang `127.0.0.1:3308`

Sau thời điểm đó, backend vẫn tiếp tục thực hiện được các thao tác `INSERT`, trong khi các truy vấn đọc vẫn hoạt động bình thường. Kết quả này cho thấy cơ chế automatic failover đã vận hành đúng theo thiết kế trong môi trường kiểm thử.

Về mặt triển khai, quy trình promote replica được thực hiện bằng script kết hợp với logic điều phối ở tầng backend. Trong nội dung chính của chương, báo cáo tập trung vào cơ chế hoạt động, quy trình xử lý và kết quả kiểm thử, còn phần script chi tiết được đưa xuống phụ lục để tránh làm rối mạch trình bày.

## 7.6. Rejoin primary cũ

Sau khi automatic failover hoàn tất, node primary cũ không tự động giành lại vai trò ghi. Thay vào đó, hệ thống được bổ sung quy trình `manual rejoin` nhằm đưa node này quay trở lại cụm ở vai trò replica của primary mới. Quy trình này gồm các bước chính:

1. khởi động lại node primary cũ
2. reset trạng thái replication cũ trên node đó
3. cấu hình node cũ bám theo primary mới
4. bật lại chế độ `read_only`

Nhờ vậy, sau failover hệ thống vẫn có thể đưa node cũ quay trở lại cụm mà không gây xung đột vai trò ghi. Đây chưa phải là `automatic failback`, nhưng là một bước hoàn thiện quan trọng, giúp mô hình chặt chẽ hơn và dễ bảo vệ hơn về mặt kỹ thuật.

Tương tự như phần promote replica, quy trình `manual rejoin` cũng được hiện thực bằng script hỗ trợ cấu hình lại node cũ để bám theo primary mới. Việc tách phần script xuống phụ lục giúp nội dung chính của chương gọn hơn và giữ được trọng tâm phân tích kỹ thuật.

## 7.7. Kết quả kiểm thử

Phần triển khai đã cho ra các kết quả chính sau:

- replication dữ liệu giữa primary và replica hoạt động ổn định
- dữ liệu được ghi từ ứng dụng vào primary và xuất hiện ở replica sau khi đồng bộ
- backend tách được đọc và ghi sang hai node khác nhau
- khi primary dừng hoạt động, failover-manager promote replica và backend tiếp tục ghi được dữ liệu
- sau failover, node primary cũ có thể được đưa trở lại làm replica theo quy trình `manual rejoin`

Một minh chứng tiêu biểu là thao tác tạo mới người dùng hoặc khóa học tại backend. Log hệ thống ghi nhận truy vấn `INSERT` với nhãn `[DB:write]`, sau đó bản ghi tương ứng được truy vấn thấy trên replica. Trong kịch bản gây lỗi node primary, hệ thống vẫn tiếp tục thực hiện được thao tác ghi sau khi failover hoàn tất, cho thấy luồng vận hành không bị dừng hẳn.

## 7.8. Đánh giá và hạn chế

So với replication cơ bản, mô hình này có ba điểm nâng cao rõ rệt:

- bổ sung tách tải đọc và ghi ở tầng ứng dụng
- bổ sung khả năng chuyển đổi node ghi tự động khi primary gặp lỗi
- bổ sung quy trình đưa node primary cũ quay lại làm replica sau sự cố

Tuy vậy, mô hình vẫn còn một số giới hạn:

- chỉ có một replica, chưa hỗ trợ nhiều node đọc
- quy trình rejoin của primary cũ vẫn là thủ công, chưa tự động hoàn toàn
- chưa triển khai cơ chế quorum hoặc consensus để xử lý các tình huống phân hoạch mạng phức tạp
- chưa tích hợp monitoring và alerting ở mức production

Vì vậy, mô hình này phù hợp để minh họa nguyên lý vận hành và khả năng mở rộng của hệ thống trong khuôn khổ học phần, nhưng vẫn cần tiếp tục hoàn thiện nếu muốn áp dụng cho môi trường thực tế quy mô lớn.

## 7.9. Liên hệ với sharding

Trong khi replication giải quyết tốt bài toán tăng khả năng sẵn sàng và tách tải đọc, sharding hướng tới bài toán phân tán dữ liệu khi quy mô tăng rất lớn. Với hệ thống LMS hiện tại, replication là bước triển khai thực tế và phù hợp hơn. Ngược lại, sharding vẫn nên được xem là hướng nghiên cứu tiếp theo cho các bảng phát sinh giao dịch lớn như:

- `course_enrollments`
- `video_completion`
- `quiz_attempts`
- `quiz_answers`

Do đó, trong phạm vi đề tài, replication đã được triển khai thực nghiệm, còn sharding tiếp tục được giữ ở mức định hướng mở rộng trong tương lai.

## 7.10. Kết luận

Phần thực nghiệm kỹ thuật nâng cao đã cho thấy hệ thống LMS có thể được mở rộng theo hướng replication một cách khả thi. Không chỉ dừng ở việc sao chép dữ liệu giữa hai node cơ sở dữ liệu, mô hình còn tích hợp được cơ chế tách đọc và ghi ở backend, automatic failover được kiểm thử trong môi trường thực nghiệm và quy trình `manual rejoin` cho node primary cũ. Kết quả này có giá trị vì vừa thể hiện hiểu biết về cơ sở dữ liệu nâng cao, vừa chứng minh được khả năng triển khai và kiểm chứng giải pháp trên môi trường chạy thực tế.
