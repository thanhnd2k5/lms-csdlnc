# Chương 6. Sao lưu và phục hồi dữ liệu

## 6.1. Sự cần thiết của sao lưu và phục hồi

Sao lưu và phục hồi là nội dung quan trọng để đảm bảo an toàn dữ liệu người dùng, khóa học, kết quả học tập và dữ liệu hệ thống. Đối với một hệ thống LMS, dữ liệu không chỉ có giá trị quản trị mà còn gắn trực tiếp với quá trình học tập của người dùng. Nếu xảy ra sự cố làm mất dữ liệu, hệ thống có thể mất lịch sử ghi danh, tiến độ học tập, tài liệu hoặc kết quả làm bài.

Vì vậy, trong khuôn khổ môn học, việc trình bày một quy trình sao lưu và phục hồi cơ bản là cần thiết để cho thấy cơ sở dữ liệu không chỉ được thiết kế để lưu trữ, mà còn cần được chuẩn bị cho các tình huống rủi ro trong quá trình vận hành.

## 6.2. Chiến lược sao lưu đề xuất

Trong phạm vi đề tài, chiến lược sao lưu được lựa chọn là kết hợp `full backup` định kỳ với `binary log` để ghi nhận các thay đổi phát sinh giữa hai lần sao lưu đầy đủ. So với cách chỉ tạo một file SQL đơn lẻ, phương án này giúp giảm nguy cơ mất dữ liệu khi sự cố xảy ra giữa các mốc backup.

Chiến lược này hướng tới ba mục tiêu chính:

- giảm nguy cơ mất dữ liệu khi xảy ra lỗi thao tác, lỗi phần mềm hoặc hỏng môi trường chạy;
- bảo đảm có thể phục hồi lại trạng thái dữ liệu gần nhất trong thời gian ngắn;
- hỗ trợ phục hồi dữ liệu về trạng thái gần thời điểm xảy ra sự cố.

Trong ngữ cảnh hệ thống LMS, nhóm dữ liệu cần ưu tiên bảo vệ gồm:

- tài khoản người dùng, phân quyền và hồ sơ học viên;
- khóa học, bài học, tài liệu và metadata liên quan;
- dữ liệu ghi danh, tiến độ học tập, kết quả bài kiểm tra và lịch sử tương tác;
- các cấu hình nghiệp vụ quan trọng của hệ thống.

Về nguyên tắc, `full backup` cung cấp mốc khôi phục hoàn chỉnh, còn `binary log` lưu lại các thay đổi giao dịch sau thời điểm backup. Khi cần phục hồi, hệ thống có thể nạp lại bản sao lưu đầy đủ trước, sau đó áp dụng các thay đổi để đưa dữ liệu về gần thời điểm mong muốn hơn. Đây là cách tiếp cận cân bằng giữa mức độ an toàn dữ liệu, chi phí lưu trữ và khả năng triển khai thực tế trong đề tài.

Phương án áp dụng cho báo cáo được tóm tắt như sau:

| Thành phần | Phương án đề xuất |
| --- | --- |
| Kiểu sao lưu | Full backup bằng `mysqldump` kết hợp `binary log` |
| Tần suất full backup | 1 bản mỗi ngày hoặc trước các lần cập nhật dữ liệu lớn |
| Sao lưu thay đổi | MySQL ghi lại thay đổi liên tục thông qua `binary log` |
| Thời điểm | Thực hiện vào cuối ngày hoặc trước khi chạy migration |
| Nơi lưu | Lưu cục bộ và sao chép thêm sang thư mục/thiết bị khác |
| Lưu phiên bản | Giữ nhiều file backup theo ngày để tránh ghi đè |
| Kiểm tra | Định kỳ restore thử sang database khác để xác nhận file dùng được |

Ưu điểm của phương án này là có tính thực tiễn cao hơn so với backup thuần bằng file SQL, đồng thời vẫn có thể triển khai bằng các công cụ sẵn có của MySQL. Với hệ thống có quy mô lớn hơn, phương án này có thể được mở rộng bằng các công cụ `physical backup` chuyên dụng.

## 6.3. Lệnh backup

Trong môi trường MySQL, một bản sao lưu đầy đủ có thể được tạo bằng công cụ `mysqldump`. Ví dụ:

```powershell
mysqldump -u root -p --single-transaction --routines --triggers lms > lms_backup_2026_05_02.sql
```

Trong đó, tùy chọn `--single-transaction` giúp hạn chế rủi ro dữ liệu không nhất quán đối với các bảng InnoDB, còn `--routines` và `--triggers` bảo đảm các thành phần logic liên quan cũng được đưa vào file sao lưu. Để thuận tiện cho việc lưu phiên bản, tên file backup nên gắn kèm thời gian tạo.

Bên cạnh bản full backup, hệ thống cần bật `binary log` để lưu lại các thay đổi phát sinh sau thời điểm sao lưu. Đây là cơ sở để phục hồi dữ liệu ở mức gần thời gian xảy ra sự cố hơn so với việc chỉ có một file backup tĩnh.

`[Chèn Hình 6.1. Lệnh backup và file backup tại đây]`

`[Chèn Hình 6.2. Cấu hình hoặc danh sách file binary log tại đây]`

## 6.4. Lệnh restore

Trong trường hợp cần khôi phục dữ liệu, bản full backup có thể được nạp lại vào một cơ sở dữ liệu phục hồi riêng để kiểm tra trước khi áp dụng cho môi trường chính. Ví dụ:

```powershell
mysql -u root -p lms_restore < lms_backup_2026_05_02.sql
```

Nếu cần phục hồi đến thời điểm gần hơn với lúc xảy ra sự cố, có thể áp dụng thêm các thay đổi được lưu trong `binary log`. Trong phạm vi báo cáo, không nhất thiết phải trình diễn toàn bộ quy trình `point-in-time recovery`, nhưng cần nêu rõ đây là thành phần giúp chiến lược sao lưu có chiều sâu hơn so với restore từ một file SQL đơn lẻ.

Sau khi restore, cần kiểm tra lại:

- các bảng quan trọng đã xuất hiện đầy đủ;
- số lượng bản ghi của một số bảng chính như `users`, `courses`, `course_enrollments`, `lessons`;
- dữ liệu tiếng Việt hoặc dữ liệu có dấu không bị lỗi mã hóa;
- các truy vấn nghiệp vụ cơ bản vẫn thực thi được trên cơ sở dữ liệu đã phục hồi.

Việc kiểm tra restore là bước quan trọng vì một bản sao lưu chỉ thực sự có giá trị khi có thể khôi phục thành công. Do đó, chiến lược sao lưu không chỉ dừng ở bước tạo file backup mà còn phải bao gồm kiểm tra khả năng phục hồi định kỳ.

`[Chèn Hình 6.3. Lệnh restore và kết quả tại đây]`

## 6.5. Ghi chú minh chứng

Để phần trình bày thuyết phục hơn, báo cáo nên bổ sung các minh chứng sau:

- ảnh chụp lệnh backup và file `.sql` được tạo ra;
- ảnh chụp cấu hình hoặc danh sách file `binary log`;
- ảnh chụp lệnh restore vào cơ sở dữ liệu mới;
- kết quả liệt kê các bảng hoặc truy vấn đếm số bản ghi sau khi phục hồi;
- mô tả ngắn về nơi lưu file backup và số phiên bản được giữ lại.

Nếu tại thời điểm hoàn thiện báo cáo chưa có đủ môi trường để chạy lệnh MySQL, cần nêu rõ đây là quy trình có thể áp dụng trực tiếp trên MySQL và sẽ được bổ sung minh chứng khi có điều kiện triển khai thực tế.

## 6.6. Kết luận

Phương án kết hợp `full backup` định kỳ với `binary log` là cách tiếp cận phù hợp cho bài toán sao lưu của hệ thống LMS trong đề tài. Cách tiếp cận này cho thấy cơ sở dữ liệu của hệ thống đã được xem xét không chỉ ở góc độ lưu trữ, mà còn ở góc độ vận hành và an toàn dữ liệu.

Dù chưa phải giải pháp sao lưu chuyên sâu cho hệ thống lớn, nội dung này vẫn là nền tảng phù hợp để phát triển lên các hướng nâng cao hơn như tự động hóa backup, sao lưu mã hóa, `point-in-time recovery` hoàn chỉnh và kết hợp với replication trong môi trường triển khai thực tế.
