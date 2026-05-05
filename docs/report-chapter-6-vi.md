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

Về nguyên tắc, `full backup` và `binary log` đảm nhiệm hai vai trò khác nhau trong chiến lược sao lưu. Trong khi `full backup` lưu lại toàn bộ trạng thái của cơ sở dữ liệu tại một thời điểm xác định, `binary log` ghi nhận liên tục các thay đổi phát sinh trong quá trình hệ thống vận hành. Nhờ đó, khi xảy ra sự cố, hệ thống có thể nạp lại bản sao lưu toàn phần làm mốc phục hồi ban đầu, sau đó tiếp tục áp dụng các thay đổi được lưu trong log để đưa dữ liệu về trạng thái mới hơn. Đây là cách tiếp cận cân bằng giữa mức độ an toàn dữ liệu, chi phí lưu trữ và khả năng triển khai thực tế trong đề tài. Các file `binary log` được giữ lại trong một khoảng thời gian nhất định theo chính sách lưu trữ, sau đó có thể được loại bỏ để tránh tăng dung lượng lưu trữ không cần thiết.

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

## 6.3. Sao lưu dữ liệu

Trong môi trường MySQL, một bản sao lưu đầy đủ có thể được tạo bằng công cụ `mysqldump`. Ví dụ:

```powershell
mysqldump -u root -p --single-transaction --routines --triggers --result-file=lms_backup_2026_05_05.sql lms
```

Trong đó, tùy chọn `--single-transaction` giúp hạn chế rủi ro dữ liệu không nhất quán đối với các bảng InnoDB, còn `--routines` và `--triggers` bảo đảm các thành phần logic liên quan cũng được đưa vào file sao lưu. Để thuận tiện cho việc lưu phiên bản, tên file backup nên gắn kèm thời gian tạo.

Bên cạnh bản full backup, hệ thống cần bật `binary log` để lưu lại các thay đổi phát sinh sau thời điểm sao lưu. Đây là cơ sở để phục hồi dữ liệu ở mức gần thời gian xảy ra sự cố hơn so với việc chỉ có một file backup tĩnh.

`[Chèn Hình 6.1. Lệnh backup và file backup tại đây]`

Kết quả cho thấy hệ thống đã tạo được file sao lưu toàn phần của cơ sở dữ liệu tại thời điểm thực hiện backup. File này đóng vai trò là mốc phục hồi nền trong quy trình sao lưu.

`[Chèn Hình 6.2. Cấu hình hoặc danh sách file binary log tại đây]`

Kết quả kiểm tra cho thấy `binary log` đã được bật và MySQL đang duy trì các file log tương ứng trong quá trình vận hành hệ thống.

## 6.4. Phục hồi dữ liệu

Trong trường hợp cần khôi phục dữ liệu, quá trình phục hồi có thể được thực hiện theo hai bước. Trước hết, bản `full backup` được nạp lại vào một cơ sở dữ liệu phục hồi riêng để tái tạo trạng thái dữ liệu tại thời điểm sao lưu. Ví dụ:

```cmd
mysql -u root -p lms_restore < lms_backup_2026_05_05.sql
```

Trong trường hợp cần phục hồi dữ liệu tới trạng thái gần hơn với thời điểm xảy ra sự cố, sau khi nạp lại bản sao lưu toàn phần, hệ thống có thể tiếp tục áp dụng các thay đổi được lưu trong `binary log` bằng công cụ `mysqlbinlog`. Cơ chế này cho phép phục hồi dữ liệu theo mốc thời gian mong muốn, thay vì chỉ khôi phục về đúng trạng thái tại thời điểm tạo `full backup`. Xét về nguyên tắc, `full backup` cung cấp nền dữ liệu nhất quán tại một thời điểm xác định, trong khi `binary log` ghi nhận liên tục các thay đổi phát sinh sau thời điểm đó. Nhờ vậy, việc kết hợp `full backup` và `binary log` giúp nâng cao khả năng phục hồi dữ liệu, đồng thời hạn chế mức độ mất mát thông tin khi hệ thống gặp sự cố.

Ví dụ, sau khi đã restore `full backup` vào `lms_restore`, có thể áp dụng thêm phần log phát sinh sau thời điểm backup bằng lệnh dạng:

```powershell
mysqlbinlog --read-from-remote-server --host=127.0.0.1 --user=root --password --start-position=157 --stop-position=639 --rewrite-db="lms->lms_restore" THANH-bin.000005 | mysql --binary-mode -u root -p lms_restore
```

Trong đó, `--start-position` và `--stop-position` được dùng để giới hạn chính xác đoạn log cần phục hồi, còn `--rewrite-db` cho phép phát lại thay đổi từ cơ sở dữ liệu gốc sang cơ sở dữ liệu phục hồi.

Sau khi restore, cần kiểm tra lại:

- các bảng quan trọng đã xuất hiện đầy đủ;
- số lượng bản ghi của một số bảng chính như `users`, `courses`, `course_enrollments`, `lessons`;
- dữ liệu tiếng Việt hoặc dữ liệu có dấu không bị lỗi mã hóa;
- các truy vấn nghiệp vụ cơ bản vẫn thực thi được trên cơ sở dữ liệu đã phục hồi.

Việc kiểm tra restore là bước quan trọng vì một bản sao lưu chỉ thực sự có giá trị khi có thể khôi phục thành công. Do đó, chiến lược sao lưu không chỉ dừng ở bước tạo file backup mà còn phải bao gồm kiểm tra khả năng phục hồi định kỳ, cũng như khả năng tái áp dụng các thay đổi mới hơn từ `binary log` khi cần.

`[Chèn Hình 6.3. Khôi phục dữ liệu từ full backup tại đây]`

Kết quả restore cho thấy file sao lưu có thể được sử dụng để tái tạo lại cơ sở dữ liệu trên một môi trường phục hồi riêng.

`[Chèn Hình 6.4. Kiểm tra dữ liệu sau khi restore full backup tại đây]`

Dữ liệu trong `lms_restore` sau khi nạp `full backup` vẫn phản ánh trạng thái tại thời điểm sao lưu, tức là chưa bao gồm thay đổi phát sinh sau mốc backup.

`[Chèn Hình 6.5. Áp dụng binary log và kiểm tra dữ liệu sau phục hồi tại đây]`

Sau khi áp dụng `binary log`, dữ liệu trong `lms_restore` đã được đưa tiến gần hơn tới thời điểm xảy ra sự cố, qua đó minh họa khả năng phục hồi dữ liệu theo mốc thời gian mong muốn.

## 6.5. Kết luận

Phương án kết hợp `full backup` định kỳ với `binary log` là cách tiếp cận phù hợp cho bài toán sao lưu của hệ thống LMS trong đề tài. Cách tiếp cận này cho thấy cơ sở dữ liệu của hệ thống đã được xem xét không chỉ ở góc độ lưu trữ, mà còn ở góc độ vận hành và an toàn dữ liệu.

Dù chưa phải giải pháp sao lưu chuyên sâu cho hệ thống lớn, nội dung này vẫn là nền tảng phù hợp để phát triển lên các hướng nâng cao hơn như tự động hóa backup, sao lưu mã hóa, `point-in-time recovery` hoàn chỉnh và kết hợp với replication trong môi trường triển khai thực tế.
