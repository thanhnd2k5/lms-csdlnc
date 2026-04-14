# BÁO CÁO BÀI TẬP LỚN
## Ứng dụng sử dụng cơ sở dữ liệu SQL cho hệ thống quản lý học tập trực tuyến LMS CSDLNC

## Chương 1. Giới thiệu đề tài

### 1.1. Lý do chọn đề tài

Trong những năm gần đây, nhu cầu học tập trực tuyến tăng nhanh và kéo theo sự phát triển của các hệ thống quản lý học tập, thường được gọi là Learning Management System. Một hệ thống LMS không chỉ giúp cung cấp nội dung học tập, mà còn hỗ trợ quản lý người học, tổ chức bài kiểm tra, theo dõi tiến độ và tổng hợp kết quả học tập.

Để các chức năng đó vận hành ổn định, cơ sở dữ liệu giữ vai trò rất quan trọng. Dữ liệu trong hệ thống LMS không chỉ dừng ở thông tin tài khoản hay danh sách khóa học, mà còn bao gồm chương học, video, tài liệu, bài kiểm tra, kết quả làm bài, lịch sử ghi danh và thông tin lớp học. Nếu mô hình dữ liệu được thiết kế thiếu chặt chẽ, hệ thống sẽ dễ gặp vấn đề về trùng lặp dữ liệu, khó truy vấn, khó mở rộng và khó bảo trì.

Từ yêu cầu đó, đề tài “Ứng dụng sử dụng cơ sở dữ liệu SQL cho hệ thống quản lý học tập trực tuyến LMS CSDLNC” được thực hiện nhằm xây dựng và phân tích một bài toán có tính thực tế, qua đó vận dụng các nội dung trọng tâm của học phần Cơ sở dữ liệu như phân tích thực thể, thiết kế lược đồ quan hệ, chuẩn hóa, khởi tạo cơ sở dữ liệu, tối ưu truy vấn và đề xuất các phương án sao lưu, phục hồi dữ liệu.

### 1.2. Mục tiêu nghiên cứu

Đề tài hướng tới các mục tiêu chính sau:

- Phân tích bài toán quản lý học tập trực tuyến trên môi trường web.
- Xác định các thực thể dữ liệu, thuộc tính, quan hệ và ràng buộc cần thiết của hệ thống.
- Xây dựng cơ sở dữ liệu quan hệ sử dụng SQL phù hợp với bài toán.
- Đánh giá mức độ hợp lý của lược đồ dữ liệu được xây dựng cho hệ thống LMS CSDLNC.
- Trình bày các nội dung liên quan đến khởi tạo, tối ưu, sao lưu và phục hồi cơ sở dữ liệu.
- Đề xuất một số hướng mở rộng nâng cao như replication và sharding ở mức độ lý thuyết.

### 1.3. Phạm vi đề tài

Đề tài hướng tới việc xây dựng một hệ thống LMS gồm giao diện người dùng, tầng xử lý nghiệp vụ và cơ sở dữ liệu SQL. Tuy nhiên, do trọng tâm của học phần là Cơ sở dữ liệu, nội dung báo cáo chủ yếu tập trung trình bày thành phần cơ sở dữ liệu của hệ thống, cụ thể bao gồm:

- phân tích yêu cầu dữ liệu
- xác định thực thể, thuộc tính và quan hệ
- xây dựng lược đồ logic và vật lý
- mô tả từ điển dữ liệu (Data Dictionary)
- phân tích chuẩn hóa
- đánh giá chỉ mục và hiệu năng truy vấn
- đề xuất sao lưu, phục hồi và mở rộng cơ sở dữ liệu

### 1.4. Phương pháp thực hiện

Báo cáo được thực hiện theo các bước chính sau:

1. Phân tích bài toán nghiệp vụ của hệ thống LMS.
2. Khảo sát lược đồ SQL và xác định các thực thể dữ liệu chính.
3. Mô tả quan hệ, ràng buộc và lược đồ dữ liệu ở mức logic và vật lý.
4. Đánh giá mức độ chuẩn hóa của lược đồ.
5. Xây dựng các nội dung về migration, seed, chỉ mục, truy vấn mẫu và `EXPLAIN`.
6. Đề xuất phương án sao lưu, phục hồi và các hướng mở rộng nâng cao.

Trong quá trình thực hiện, đề tài kết hợp giữa phân tích lý thuyết và đối chiếu với phần triển khai thực tế của hệ thống. Cách tiếp cận này giúp nội dung báo cáo vừa bám sát yêu cầu của môn học, vừa phản ánh đúng cách cơ sở dữ liệu được sử dụng trong ứng dụng.

### 1.5. Ý nghĩa của đề tài

Đề tài có ý nghĩa ở cả mặt học thuật và thực tiễn.

Về mặt học thuật, đề tài tạo điều kiện vận dụng các kiến thức cốt lõi của môn Cơ sở dữ liệu vào một bài toán cụ thể, từ phân tích thực thể và quan hệ cho đến chuẩn hóa, tối ưu truy vấn và tổ chức dữ liệu. Nhờ vậy, các khái niệm của môn học không chỉ được trình bày ở mức lý thuyết mà còn gắn với một hệ thống có nghiệp vụ rõ ràng.

Về mặt thực tiễn, đề tài cho thấy cơ sở dữ liệu là nền tảng quyết định khả năng vận hành của hệ thống LMS. Một thiết kế dữ liệu hợp lý sẽ hỗ trợ tốt cho việc quản lý người dùng, tổ chức nội dung học tập, lưu kết quả đánh giá và theo dõi tiến độ học tập một cách nhất quán.

## Chương 2. Mô tả bài toán và chức năng hệ thống

### 2.1. Bài toán nghiệp vụ

Đề tài hướng tới bài toán xây dựng một hệ thống quản lý học tập trực tuyến trên nền tảng web. Hệ thống cần hỗ trợ việc tổ chức khóa học, quản lý nội dung học tập, theo dõi tiến độ, lưu kết quả kiểm tra và quản lý học viên theo từng lớp học.

Trong thực tế, nếu các thông tin này được quản lý rời rạc hoặc thủ công, dữ liệu sẽ khó đồng bộ, khó tổng hợp và dễ phát sinh sai lệch. Vì vậy, bài toán đặt ra không chỉ là xây dựng các chức năng phục vụ dạy và học, mà còn là tổ chức một mô hình dữ liệu đủ chặt chẽ để quản lý thống nhất toàn bộ thông tin của hệ thống.

### 2.2. Đối tượng sử dụng hệ thống

Hệ thống được xây dựng với ba nhóm người dùng chính:

- Quản trị viên
- Giảng viên
- Học viên

### 2.3. Chức năng chính của hệ thống

Từ yêu cầu của bài toán, hệ thống được tổ chức thành các nhóm chức năng chính sau:

- Quản lý tài khoản và xác thực
- Quản lý khóa học
- Quản lý chương học và video
- Quản lý tài liệu học tập
- Tổ chức đánh giá qua bài kiểm tra
- Đăng ký học và theo dõi tiến độ
- Quản lý lớp học

### 2.4. Kiến trúc tổng quan của ứng dụng

Hệ thống được xây dựng theo mô hình client-server, gồm ba thành phần chính:

- Frontend sử dụng React
- Backend sử dụng Node.js và Express
- Cơ sở dữ liệu sử dụng MySQL

### 2.5. Vai trò của cơ sở dữ liệu trong hệ thống

Cơ sở dữ liệu là thành phần trung tâm giúp hệ thống vận hành đúng logic nghiệp vụ. Toàn bộ các quan hệ giữa người dùng, nội dung học tập, bài kiểm tra, kết quả học tập và lớp học đều được biểu diễn thông qua các bảng và các ràng buộc tham chiếu.

## Chương 3. Phân tích và thiết kế cơ sở dữ liệu

### 3.1. Yêu cầu dữ liệu

Cơ sở dữ liệu của hệ thống cần đáp ứng các nhóm yêu cầu:

- Lưu trữ thông tin người dùng và phân quyền
- Lưu trữ cấu trúc nội dung học tập
- Lưu trữ tài liệu, bài kiểm tra và kết quả học tập
- Lưu trữ ghi danh, tiến độ học tập và lớp học
- Đảm bảo tính toàn vẹn tham chiếu

### 3.2. Phân tích thực thể

Lược đồ dữ liệu của hệ thống được tổ chức quanh các thực thể chính sau:

- `users`
- `courses`
- `chapters`
- `videos`
- `quizzes`
- `quiz_questions`
- `quiz_options`
- `quiz_attempts`
- `quiz_answers`
- `course_enrollments`
- `video_completion`
- `documents`
- `classes`
- `class_courses`
- `class_students`
- `class_students_courses_approval`

Trong báo cáo chính, các thực thể trên sẽ được phân tích theo nhóm chức năng để làm rõ vai trò của từng thành phần dữ liệu trong hệ thống. Phần mô tả chi tiết tên bảng, tên cột, kiểu dữ liệu và ràng buộc có thể được đưa về mục Từ điển dữ liệu hoặc phụ lục để bố cục báo cáo gọn hơn.

### 3.3. Quan hệ và ràng buộc giữa các thực thể

Hệ thống có các quan hệ một-nhiều và nhiều-nhiều rõ ràng:

- `users` - `courses`
- `courses` - `chapters`
- `chapters` - `videos`
- `users` - `courses` qua `course_enrollments`
- `users` - `videos` qua `video_completion`
- `classes` - `courses` qua `class_courses`
- `classes` - `users` qua `class_students`

Để đảm bảo tính toàn vẹn dữ liệu, lược đồ sử dụng các cơ chế ràng buộc sau:

- khóa chính
- khóa ngoại
- unique key
- enum
- not null

### 3.4. Lược đồ logic

Về mặt logic, hệ thống được chia thành các cụm dữ liệu:

- quản lý người dùng
- quản lý nội dung học tập
- quản lý đánh giá
- quản lý tham gia học tập
- quản lý lớp học

Để làm rõ quan hệ giữa các thực thể, báo cáo sử dụng sơ đồ ERD ở cả mức tổng thể và mức nhóm chức năng. Trước hết, Hình 3.1 trình bày sơ đồ ERD tổng thể của toàn bộ hệ thống, qua đó cho thấy mối liên hệ giữa người dùng, khóa học, nội dung học tập, bài kiểm tra, tiến độ học tập và lớp học.

`[Chèn Hình 3.1. Sơ đồ ERD tổng thể của hệ thống tại đây]`

Sau sơ đồ tổng thể, báo cáo tiếp tục trình bày các sơ đồ chi tiết theo từng nhóm nghiệp vụ để người đọc dễ theo dõi hơn. Cách sắp xếp phù hợp trong Chương 3 như sau:

- đặt Hình 3.1 ngay sau phần giới thiệu lược đồ logic tổng thể
- đặt Hình 3.2 sau đoạn mô tả nhóm dữ liệu đánh giá và bài kiểm tra
- đặt Hình 3.3 sau đoạn mô tả nhóm dữ liệu lớp học, ghi danh và tiến độ
- đặt Hình 3.4 sau đoạn mô tả nhóm dữ liệu nội dung học tập

Với cách trình bày này, phần ERD vừa đảm bảo tính tổng quan, vừa tránh cảm giác dồn toàn bộ thông tin vào một sơ đồ duy nhất.

### 3.5. Lược đồ vật lý

Về mặt vật lý, lược đồ được cài đặt trên MySQL với:

- `INT AUTO_INCREMENT`
- `TIMESTAMP`
- `BOOLEAN`
- `ENUM`
- `InnoDB`
- `utf8mb4`

Ở mức vật lý, mỗi bảng được cài đặt bằng các câu lệnh `CREATE TABLE`, trong đó xác định rõ khóa chính, khóa ngoại, kiểu dữ liệu, giá trị mặc định và các chỉ mục cần thiết. Việc mô tả lược đồ vật lý giúp làm rõ cách mô hình dữ liệu logic được chuyển thành cấu trúc cụ thể trong hệ quản trị cơ sở dữ liệu MySQL.

### 3.6. Chuẩn hóa lược đồ

Lược đồ của hệ thống được thiết kế theo hướng chuẩn hóa tốt. Nhìn chung, các thực thể chính và các quan hệ trung gian đã được tách tương đối rõ, giúp hạn chế trùng lặp dữ liệu và thuận lợi cho việc cập nhật, truy vấn cũng như mở rộng hệ thống.

Ở mức chuẩn thứ nhất, các bảng đều có khóa chính rõ ràng và các thuộc tính được tổ chức theo dạng giá trị nguyên tử. Hệ thống không lưu nhiều giá trị trong cùng một cột, đồng thời các nhóm dữ liệu lặp đã được tách thành các bảng riêng như `quiz_questions`, `quiz_options`, `course_enrollments` hay `class_students`.

Ở mức chuẩn thứ hai, các bảng liên kết sử dụng khóa ghép như `class_courses`, `class_students` và `class_students_courses_approval` được tổ chức tương đối hợp lý. Các thuộc tính không khóa trong các bảng này nhìn chung phụ thuộc vào toàn bộ khóa chính, thay vì chỉ phụ thuộc vào một phần của khóa.

Ở mức chuẩn thứ ba, phần lớn các bảng có thể xem là đạt mức chuẩn hóa tốt vì thông tin mô tả thực thể đã được đặt đúng vào bảng tương ứng. Ví dụ, thông tin giảng viên không lặp lại trong bảng `courses`, mà được liên kết qua khóa ngoại `teacher_id`; thông tin câu hỏi và đáp án cũng được tách khỏi bảng `quizzes` để tránh phụ thuộc bắc cầu không cần thiết.

Tuy nhiên, xét một cách chặt chẽ theo lý thuyết, vẫn có một số bảng được thiết kế theo hướng phục vụ nghiệp vụ và thuận tiện cho truy vấn nên có thể tiếp tục được xem xét, tinh chỉnh nếu cần chuẩn hóa sâu hơn trong tương lai. Vì vậy, có thể kết luận rằng lược đồ của hệ thống đạt mức chuẩn hóa tốt, trong đó phần lớn các bảng có thể trình bày ở mức gần hoặc đạt chuẩn 3NF.

### 3.7. Từ điển dữ liệu

Sau khi phân tích thực thể và quan hệ, bước tiếp theo là mô tả chi tiết từng bảng dữ liệu thông qua Từ điển dữ liệu (Data Dictionary). Nội dung này bao gồm tên bảng, mục đích sử dụng, tên cột, kiểu dữ liệu, khóa chính, khóa ngoại và các ràng buộc quan trọng. Nếu phần này quá dài, có thể chuyển xuống phụ lục để báo cáo chính gọn và dễ theo dõi hơn.

`[Chèn Bảng Data Dictionary chi tiết tại đây hoặc chuyển xuống Phụ lục B]`

### 3.8. Nhận xét

Nhìn chung, lược đồ dữ liệu của hệ thống LMS CSDLNC đủ rõ ràng để trình bày trong khuôn khổ môn Cơ sở dữ liệu. Tuy nhiên, khi đối chiếu giữa thiết kế dữ liệu và phần triển khai backend, vẫn có một số điểm chưa đồng bộ. Các điểm này nên được ghi nhận ở một mục riêng hoặc phụ lục nhận xét để tránh nhầm lẫn giữa thiết kế cơ sở dữ liệu và hiện trạng triển khai mã nguồn.

## Chương 4. Khởi tạo và triển khai cơ sở dữ liệu

### 4.1. Mục tiêu khởi tạo cơ sở dữ liệu

Mục tiêu là tạo đầy đủ bảng, ràng buộc, khóa, chỉ mục và dữ liệu mẫu để phục vụ thử nghiệm và minh họa hệ thống.

### 4.2. Script tạo bảng

Trong đề tài này, file `backend/lms.sql` được sử dụng làm script lược đồ chính. File này chứa toàn bộ câu lệnh tạo bảng, khóa chính, khóa ngoại và các ràng buộc cơ bản của hệ thống.

### 4.3. Mô tả các script khởi tạo

Phần khởi tạo cơ sở dữ liệu của báo cáo được xây dựng từ ba nhóm script chính:

- script lược đồ tổng thể `lms.sql`
- script seed dữ liệu mẫu
- bộ migration mô phỏng quá trình phát triển cơ sở dữ liệu theo từng phiên bản

Bộ migration được tổ chức thành các phiên bản từ V1 đến V4, và mỗi phiên bản đều có cặp script `up` và `down` để thể hiện khả năng triển khai cũng như hoàn tác thay đổi khi cần thiết.

### 4.4. Mô phỏng quá trình phát triển schema theo migration

Để phần migration sinh động và hợp lý hơn về mặt học thuật, báo cáo có thể mô tả cơ sở dữ liệu được phát triển dần qua nhiều phiên bản thay vì xuất hiện hoàn chỉnh ngay từ đầu.

Các giai đoạn phát triển đề xuất:

- V1: khởi tạo lõi người dùng, khóa học, chương và video
- V2: bổ sung module bài kiểm tra
- V3: bổ sung ghi danh, tiến độ học tập và tài liệu
- V4: bổ sung quản lý lớp học

Mỗi phiên bản đều có:

- migration `up` để thêm cấu trúc mới
- migration `down` để hoàn tác thay đổi khi cần rollback

Như vậy, phần migration trong báo cáo không chỉ dừng ở việc tạo lược đồ ban đầu, mà còn thể hiện được tư duy quản lý phiên bản và khả năng rollback của cơ sở dữ liệu trong quá trình phát triển.

### 4.5. Quy trình khởi tạo cơ sở dữ liệu

1. Tạo cơ sở dữ liệu `lms`.
2. Chạy file `lms.sql` để khởi tạo toàn bộ lược đồ.
3. Kiểm tra danh sách bảng và các ràng buộc đã được tạo.
4. Nạp dữ liệu mẫu bằng script seed.
5. Kiểm tra số lượng bản ghi và khả năng liên kết dữ liệu giữa các bảng.

`[Chèn Hình 4.1. Kết quả tạo schema tại đây]`

`[Chèn Hình 4.2. Kết quả nạp dữ liệu seed tại đây]`

## Chương 5. Tối ưu và vận hành cơ sở dữ liệu

### 5.1. Vai trò của tối ưu cơ sở dữ liệu

Tối ưu cơ sở dữ liệu nhằm đảm bảo hệ thống có thể truy vấn dữ liệu nhanh, nhất là khi số lượng học viên, khóa học và dữ liệu học tập tăng lên.

### 5.2. Danh sách chỉ mục trong lược đồ

Trong lược đồ của hệ thống đã có một số chỉ mục cơ bản nhằm hỗ trợ truy vấn trên các cột khóa chính, khóa ngoại và các trường thường xuyên tham gia liên kết. Khi trình bày trong báo cáo, có thể tổng hợp các chỉ mục này thành một bảng riêng để nêu rõ tên chỉ mục, bảng áp dụng và mục đích sử dụng.

### 5.3. Các truy vấn tiêu biểu và EXPLAIN

Để đánh giá hiệu năng của cơ sở dữ liệu, báo cáo lựa chọn một số truy vấn tiêu biểu gắn trực tiếp với nghiệp vụ của hệ thống như thống kê số học viên theo khóa học, theo dõi tiến độ học tập, đếm số câu hỏi theo bài kiểm tra và tìm kiếm lớp học theo mã lớp. Các truy vấn này có thể được kiểm tra bằng lệnh `EXPLAIN` để quan sát cách hệ quản trị sử dụng chỉ mục và xây dựng kế hoạch thực thi.

`[Chèn Hình 5.1. Kết quả EXPLAIN tại đây]`

### 5.4. Nhận xét về hiệu năng của lược đồ

Lược đồ hiện đã có nền tảng tối ưu cơ bản, nhưng vẫn có thể bổ sung thêm chỉ mục trên các cột join và cột lọc như:

- `courses.teacher_id`
- `videos.course_id`
- `documents.course_id`
- `course_enrollments.course_id`

## Chương 6. Sao lưu và phục hồi dữ liệu

### 6.1. Sự cần thiết của sao lưu và phục hồi

Sao lưu và phục hồi là nội dung quan trọng để đảm bảo an toàn dữ liệu người dùng, khóa học, kết quả học tập và dữ liệu hệ thống.

### 6.2. Chiến lược sao lưu đề xuất

Trong phạm vi môn học, có thể sử dụng phương án sao lưu mức file bằng `mysqldump`.

### 6.3. Lệnh backup

```powershell
mysqldump -u root -p lms > lms_backup.sql
```

`[Chèn Hình 6.1. Lệnh backup và file backup tại đây]`

### 6.4. Lệnh restore

```powershell
mysql -u root -p lms_restore < lms_backup.sql
```

`[Chèn Hình 6.2. Lệnh restore và kết quả tại đây]`

### 6.5. Ghi chú minh chứng

Trong quá trình hoàn thiện báo cáo, phần sao lưu và phục hồi nên đi kèm ảnh minh họa hoặc kết quả thực thi thực tế để tăng tính thuyết phục. Nếu tại thời điểm viết báo cáo chưa có đủ môi trường để chạy lệnh MySQL, cần nêu rõ đây là quy trình đề xuất và sẽ được bổ sung minh chứng khi có điều kiện triển khai.

## Chương 7. Kỹ thuật nâng cao

### 7.1. Replication

Replication là cơ chế sao chép dữ liệu từ máy chủ chính sang một hoặc nhiều máy chủ phụ nhằm tăng độ sẵn sàng của hệ thống. Đối với bài toán LMS, replication phù hợp trong trường hợp cần tăng khả năng dự phòng và phân tách tải đọc khỏi máy chủ xử lý ghi chính.

Những lợi ích chính của replication có thể kể đến:

- tăng tính sẵn sàng
- giảm tải truy vấn đọc
- hỗ trợ dự phòng

### 7.2. Sharding

Sharding là kỹ thuật phân tách dữ liệu thành nhiều phần và lưu trữ trên nhiều máy chủ khác nhau. So với replication, sharding không chỉ sao chép dữ liệu mà còn phân chia dữ liệu để phục vụ hệ thống ở quy mô rất lớn.

Trong hệ thống LMS, các bảng có thể xem xét sharding về mặt lý thuyết là:

- `course_enrollments`
- `video_completion`
- `quiz_attempts`
- `quiz_answers`

### 7.3. Đánh giá khả năng áp dụng

Trong giai đoạn hiện tại của đề tài:

- replication là hướng nâng cấp thực tế hơn
- sharding là hướng nâng cấp cho quy mô lớn hơn

### 7.4. Kết luận

Hai kỹ thuật trên được đưa vào báo cáo như nội dung mở rộng mang tính định hướng. Trong phạm vi hiện tại, hệ thống chưa triển khai thực tế replication hoặc sharding, do đó phần này chỉ dừng ở mức đề xuất khả năng áp dụng và phân tích lý thuyết.

## Chương 8. Kết luận và hướng phát triển

### 8.1. Kết quả đạt được

Báo cáo đã trình bày được các nội dung chính của một đề tài cơ sở dữ liệu gắn với hệ thống LMS, bao gồm:

- bài toán nghiệp vụ
- mô hình dữ liệu
- lược đồ logic và vật lý
- chuẩn hóa
- khởi tạo CSDL
- tối ưu
- backup/restore
- hướng mở rộng nâng cao

### 8.2. Đánh giá tổng quát về schema của hệ thống

Schema của hệ thống có cấu trúc tương đối hợp lý và phản ánh được các nhóm nghiệp vụ chính của một hệ thống LMS như quản lý người dùng, nội dung học tập, đánh giá, ghi danh và lớp học. Bên cạnh đó, quá trình đối chiếu với phần triển khai backend cũng cho thấy vẫn còn một số điểm cần tiếp tục đồng bộ để hệ thống hoàn thiện hơn.

### 8.3. Hạn chế của đề tài

- phần minh chứng thực nghiệm cho `EXPLAIN`, sao lưu và phục hồi còn phụ thuộc vào môi trường MySQL thực tế
- một số nội dung nâng cao như replication và sharding mới dừng ở mức định hướng
- giữa schema và phần triển khai backend vẫn còn một vài điểm chưa đồng bộ cần tiếp tục chỉnh sửa

### 8.4. Hướng phát triển

- tiếp tục hoàn thiện tính đồng bộ giữa schema và mã nguồn backend
- bổ sung đầy đủ minh chứng thực nghiệm cho `EXPLAIN`, backup và restore
- hoàn thiện hơn bộ migration, seed và dữ liệu mẫu phục vụ kiểm thử
- nghiên cứu triển khai replication ở mức cơ bản nếu hệ thống được mở rộng trong tương lai

### 8.5. Kết luận chung

Qua đề tài này có thể thấy cơ sở dữ liệu SQL giữ vai trò trung tâm trong việc tổ chức và vận hành một hệ thống quản lý học tập trực tuyến. Việc xây dựng lược đồ phù hợp, thiết lập ràng buộc rõ ràng, chuẩn hóa dữ liệu và quan tâm tới tối ưu truy vấn là những yếu tố quyết định chất lượng của hệ thống. Trên cơ sở đó, đề tài đã đáp ứng được mục tiêu chính của học phần và tạo nền tảng để tiếp tục hoàn thiện trong các giai đoạn sau.
