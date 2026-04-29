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

Không chỉ đóng vai trò lưu trữ, cơ sở dữ liệu còn quyết định khả năng mở rộng, khả năng thống kê và độ nhất quán của hệ thống. Một thiết kế dữ liệu hợp lý sẽ giúp tránh trùng lặp thông tin, giảm sai lệch khi cập nhật và hỗ trợ tốt cho các nhu cầu truy vấn, báo cáo và tối ưu hiệu năng.

Trong đề tài này, cơ sở dữ liệu chính là nền tảng phản ánh trực tiếp cấu trúc và mức độ hoàn thiện của hệ thống LMS. Vì vậy, việc tập trung phân tích cơ sở dữ liệu là hoàn toàn phù hợp với yêu cầu của học phần và cũng là phần có giá trị kỹ thuật nổi bật nhất của hệ thống.

### 2.6. Luồng học tập điển hình của học viên

Một luồng sử dụng điển hình của hệ thống có thể bắt đầu từ việc học viên đăng nhập vào hệ thống, lựa chọn khóa học phù hợp và đăng ký tham gia học. Sau khi ghi danh thành công, học viên truy cập các chương học, xem video bài giảng, sử dụng tài liệu học tập liên quan và thực hiện các bài kiểm tra được gắn với nội dung tương ứng.

Trong quá trình đó, hệ thống cần lưu trữ đồng thời nhiều loại dữ liệu như thông tin người dùng, dữ liệu khóa học, trạng thái ghi danh, tiến độ xem video, nội dung bài kiểm tra và kết quả làm bài. Luồng sử dụng này cho thấy cơ sở dữ liệu không chỉ đóng vai trò lưu trữ riêng lẻ từng bảng dữ liệu, mà còn phải đảm bảo liên kết chặt chẽ giữa các thành phần để phản ánh đúng quá trình học tập của người dùng.

### 2.7. Ghi chú về phạm vi nghiên cứu trong báo cáo

Báo cáo này tập trung vào thành phần cơ sở dữ liệu SQL của hệ thống LMS CSDLNC. Phần frontend và backend chỉ được trình bày ở mức cần thiết nhằm làm rõ bài toán nghiệp vụ và vai trò của cơ sở dữ liệu trong toàn hệ thống.

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

Từ sơ đồ tổng thể, có thể tiếp tục phân tích sâu hơn các nhóm dữ liệu có vai trò trọng tâm trong hệ thống. Để thuận tiện cho việc theo dõi, báo cáo tách riêng ba nhóm dữ liệu chính gồm nhóm đánh giá và bài kiểm tra, nhóm lớp học và ghi danh, và nhóm nội dung học tập.

Hình 3.2 làm rõ mối quan hệ giữa bài kiểm tra, câu hỏi, đáp án và lịch sử làm bài của học viên.

`[Chèn Hình 3.2. Sơ đồ ERD nhóm đánh giá và bài kiểm tra tại đây]`

Hình 3.3 thể hiện nhóm dữ liệu phục vụ quản lý lớp học, ghi danh và theo dõi tiến độ học tập của học viên.

`[Chèn Hình 3.3. Sơ đồ ERD nhóm lớp học, ghi danh và tiến độ học tập tại đây]`

Hình 3.4 mô tả cấu trúc dữ liệu của nhóm nội dung học tập, gồm khóa học, chương học, video và tài liệu.

`[Chèn Hình 3.4. Sơ đồ ERD nhóm nội dung học tập tại đây]`

Cách trình bày này giúp người đọc vừa có cái nhìn tổng quan về toàn bộ hệ thống, vừa theo dõi được chi tiết của từng nhóm dữ liệu quan trọng mà không bị rối bởi một sơ đồ quá lớn.

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

Mục tiêu của giai đoạn khởi tạo cơ sở dữ liệu là xây dựng đầy đủ cấu trúc lưu trữ cho hệ thống LMS, bao gồm các bảng dữ liệu, khóa chính, khóa ngoại, ràng buộc toàn vẹn, chỉ mục cơ bản và dữ liệu mẫu ban đầu. Đây là bước cần thiết để hệ thống có thể lưu trữ thông tin người dùng, khóa học, nội dung học tập, bài kiểm tra, kết quả học tập và dữ liệu lớp học một cách nhất quán.

Trong phạm vi báo cáo, phần khởi tạo cơ sở dữ liệu không chỉ nhằm tạo được các bảng cần thiết, mà còn nhằm chứng minh rằng lược đồ dữ liệu đã được tổ chức theo một trình tự hợp lý, có thể triển khai, có thể mở rộng và có thể hoàn tác khi cần thiết.

### 4.2. Script tạo bảng

Trong đề tài này, file `backend/lms.sql` được sử dụng làm script lược đồ chính. Có thể hiểu đây là file SQL tổng hợp dùng để khởi tạo phiên bản hoàn chỉnh của cơ sở dữ liệu ở trạng thái cuối cùng. File này chứa toàn bộ các câu lệnh `CREATE TABLE`, định nghĩa khóa chính, khóa ngoại, chỉ mục và các ràng buộc cơ bản của hệ thống.

Nói cách khác, nếu người triển khai muốn tạo nhanh toàn bộ cơ sở dữ liệu của hệ thống LMS trong một lần, chỉ cần tạo cơ sở dữ liệu rỗng và chạy file `lms.sql`. Sau bước này, toàn bộ cấu trúc bảng cần thiết của hệ thống sẽ được hình thành.

Trong Chương 4, báo cáo chỉ cần trích dẫn một số đoạn lệnh SQL tiêu biểu để minh họa cách cài đặt lược đồ ở mức vật lý. Toàn bộ script chi tiết được trình bày ở phần phụ lục để thuận tiện tra cứu.

### 4.3. Mô tả các script khởi tạo

Để phần khởi tạo cơ sở dữ liệu được trình bày rõ ràng hơn, báo cáo sử dụng ba nhóm script với vai trò khác nhau:

- Nhóm thứ nhất là script lược đồ tổng thể `lms.sql`. Đây là script dùng để tạo toàn bộ cơ sở dữ liệu ở trạng thái đầy đủ nhất.
- Nhóm thứ hai là script `seed.sql`. Script này dùng để nạp dữ liệu mẫu ban đầu nhằm phục vụ kiểm thử, minh họa truy vấn và kiểm tra các quan hệ giữa các bảng.
- Nhóm thứ ba là bộ migration mô phỏng quá trình phát triển cơ sở dữ liệu theo từng phiên bản. Nhóm script này không thay thế `lms.sql`, mà được dùng để trình bày quá trình cơ sở dữ liệu được mở rộng dần theo nhu cầu nghiệp vụ.

Việc tách riêng ba nhóm script nêu trên giúp phần trình bày trong báo cáo rõ hơn về mặt học thuật: `lms.sql` đại diện cho lược đồ hoàn chỉnh, `seed.sql` đại diện cho dữ liệu mẫu, còn bộ migration thể hiện tư duy quản lý phiên bản và phát triển hệ thống theo từng giai đoạn.

### 4.4. Mô phỏng quá trình phát triển lược đồ theo migration

Trong thực tế phát triển phần mềm, cơ sở dữ liệu thường không xuất hiện đầy đủ ngay từ đầu. Khi nghiệp vụ mở rộng, cơ sở dữ liệu cũng được bổ sung dần các bảng và ràng buộc tương ứng. Vì vậy, để phần Chương 4 không chỉ dừng ở việc “chạy một file SQL”, báo cáo mô phỏng quá trình phát triển lược đồ dữ liệu qua nhiều phiên bản migration.

Trong báo cáo này, ký hiệu `V1`, `V2`, `V3`, `V4` được dùng để chỉ bốn giai đoạn phát triển giả lập của cơ sở dữ liệu.

### Phiên bản V1 - Khởi tạo lõi hệ thống

Đây là phiên bản đầu tiên, đại diện cho giai đoạn hệ thống mới chỉ cần các chức năng cốt lõi nhất. Ở giai đoạn này, cơ sở dữ liệu tập trung vào bốn nhóm dữ liệu nền tảng là người dùng, khóa học, chương học và video bài giảng. Đây là cấu trúc tối thiểu để hình thành một hệ thống học tập trực tuyến cơ bản.

Trong phiên bản này:

- script `V1__init_core.sql` đóng vai trò migration `up`, dùng để tạo các bảng lõi
- script `V1__init_core_down.sql` đóng vai trò migration `down`, dùng để xóa các bảng lõi theo thứ tự ngược nhằm đảm bảo rollback an toàn

### Phiên bản V2 - Bổ sung module bài kiểm tra

Sau khi đã có phần nội dung học tập, hệ thống được mở rộng thêm chức năng đánh giá kết quả học tập. Vì vậy, phiên bản V2 bổ sung nhóm bảng liên quan đến bài kiểm tra, câu hỏi, phương án trả lời và lịch sử làm bài của học viên.

Trong phiên bản này:

- script `V2__add_quiz_module.sql` dùng để thêm toàn bộ nhóm bảng quiz
- script `V2__add_quiz_module_down.sql` dùng để xóa các bảng này theo thứ tự phụ thuộc dữ liệu

### Phiên bản V3 - Bổ sung ghi danh, tiến độ và tài liệu

Ở giai đoạn tiếp theo, cơ sở dữ liệu được mở rộng để quản lý việc học viên đăng ký khóa học, theo dõi tiến độ hoàn thành nội dung học tập và lưu trữ thêm tài liệu học tập. Giai đoạn này cho thấy hệ thống đã chuyển từ mức “cung cấp nội dung” sang mức “quản lý quá trình học tập”.

Trong phiên bản này:

- script `V3__add_enrollment_progress_documents.sql` bổ sung các bảng ghi danh, tiến độ và tài liệu
- script `V3__add_enrollment_progress_documents_down.sql` dùng để hoàn tác các thay đổi nếu cần quay lui

### Phiên bản V4 - Bổ sung quản lý lớp học

Ở phiên bản cuối, hệ thống được mở rộng sang mô hình quản lý lớp học. Đây là giai đoạn thể hiện mức độ hoàn thiện cao hơn của hệ thống, vì ngoài việc quản lý khóa học riêng lẻ, cơ sở dữ liệu còn phải hỗ trợ việc tổ chức học viên thành lớp, gắn khóa học với lớp và theo dõi tình trạng tham gia của học viên trong từng lớp.

Trong phiên bản này:

- script `V4__add_class_management.sql` dùng để thêm nhóm bảng lớp học
- script `V4__add_class_management_down.sql` dùng để xóa nhóm bảng lớp học theo thứ tự phụ thuộc

Như vậy, các ký hiệu `V1` đến `V4` trong báo cáo không phải là tên ngẫu nhiên, mà là cách đánh số các phiên bản phát triển của cơ sở dữ liệu. Mỗi phiên bản phản ánh một bước mở rộng nghiệp vụ của hệ thống. Bên cạnh đó, việc chuẩn bị cả script `up` và `down` cho từng phiên bản còn giúp làm rõ khái niệm triển khai và hoàn tác thay đổi trong quản lý cơ sở dữ liệu.

### 4.5. Quy trình khởi tạo cơ sở dữ liệu

Trong trường hợp cần khởi tạo nhanh cơ sở dữ liệu hoàn chỉnh, quy trình có thể thực hiện theo các bước sau:

1. Tạo cơ sở dữ liệu rỗng với tên `lms`.
2. Chạy file `lms.sql` để tạo toàn bộ các bảng, khóa và ràng buộc.
3. Kiểm tra lại danh sách bảng đã được tạo để đảm bảo lược đồ hình thành đầy đủ.
4. Chạy script `seed.sql` để nạp dữ liệu mẫu ban đầu.
5. Kiểm tra số lượng bản ghi và thử một số truy vấn cơ bản nhằm xác nhận dữ liệu đã liên kết đúng.

Trong trường hợp muốn trình bày theo tư duy migration, có thể thay bước 2 bằng việc chạy lần lượt các script `V1`, `V2`, `V3`, `V4`. Cách làm này phù hợp hơn khi muốn minh họa quá trình phát triển của cơ sở dữ liệu theo từng giai đoạn.

`[Chèn Hình 4.1. Kết quả tạo schema tại đây]`

`[Chèn Hình 4.2. Kết quả nạp dữ liệu seed tại đây]`

`[Chèn một đoạn SQL minh họa ngắn, ví dụ lệnh CREATE TABLE users hoặc courses, tại đây]`

### 4.6. Nhận xét

Nhìn chung, phần khởi tạo cơ sở dữ liệu của hệ thống tương đối rõ ràng và phù hợp để trình bày trong báo cáo môn học. Việc tồn tại đồng thời file `lms.sql` và bộ migration mô phỏng giúp báo cáo vừa bám sát trạng thái hiện có của hệ thống, vừa thể hiện được tư duy phát triển cơ sở dữ liệu theo phiên bản. Tuy nhiên, nếu triển khai ở quy mô thực tế lớn hơn, hệ thống vẫn nên tiếp tục hoàn thiện bộ migration và seed theo hướng chuẩn hóa hơn để phục vụ vận hành lâu dài.

## Chương 5. Tối ưu và vận hành cơ sở dữ liệu

### 5.1. Vai trò của tối ưu cơ sở dữ liệu

Tối ưu cơ sở dữ liệu nhằm đảm bảo hệ thống có thể truy vấn dữ liệu nhanh, ổn định và duy trì được hiệu năng khi khối lượng dữ liệu tăng lên. Đối với hệ thống LMS, dữ liệu phát sinh không chỉ nằm ở bảng người dùng hay khóa học, mà còn tăng liên tục ở các bảng ghi danh, tiến độ học tập, lịch sử làm bài và câu trả lời của học viên.

Nếu không quan tâm đến tối ưu truy vấn ngay từ giai đoạn thiết kế, hệ thống có thể gặp tình trạng truy vấn chậm, thời gian phản hồi tăng cao và khó mở rộng khi số lượng học viên tham gia học tập ngày càng lớn. Vì vậy, việc xem xét chỉ mục, truy vấn tiêu biểu và kế hoạch thực thi truy vấn là nội dung cần thiết trong báo cáo.

### 5.2. Danh sách chỉ mục trong lược đồ

Trong lược đồ của hệ thống đã có một số chỉ mục cơ bản nhằm hỗ trợ truy vấn trên các cột khóa chính, khóa ngoại và các trường thường xuyên tham gia liên kết. Các chỉ mục này có vai trò rút ngắn thời gian tìm kiếm bản ghi, giảm số lượng dòng phải quét và hỗ trợ tốt hơn cho các phép nối giữa các bảng.

Khi trình bày trong báo cáo, có thể tổng hợp các chỉ mục này thành một bảng riêng để nêu rõ tên chỉ mục, bảng áp dụng và mục đích sử dụng. Cách trình bày này giúp người đọc dễ liên hệ giữa cấu trúc lược đồ và các truy vấn thực tế của hệ thống.

### 5.3. Các truy vấn tiêu biểu và EXPLAIN

Để đánh giá hiệu năng của cơ sở dữ liệu, báo cáo lựa chọn một số truy vấn tiêu biểu gắn trực tiếp với nghiệp vụ của hệ thống như thống kê số học viên theo khóa học, theo dõi tiến độ học tập, đếm số câu hỏi theo bài kiểm tra và tìm kiếm lớp học theo mã lớp. Đây đều là các truy vấn có khả năng xuất hiện thường xuyên trong quá trình vận hành hệ thống.

Trong số đó, lệnh `EXPLAIN` được sử dụng để phân tích cách hệ quản trị cơ sở dữ liệu xây dựng kế hoạch thực thi truy vấn. Nói cách khác, `EXPLAIN` giúp người thực hiện biết được hệ quản trị đang quét bảng như thế nào, có sử dụng chỉ mục hay không và truy vấn có dấu hiệu kém hiệu quả ở đâu. Vì vậy, đây là công cụ phù hợp để minh chứng cho phần tối ưu trong báo cáo môn học.

Trong phần thực nghiệm, báo cáo sử dụng hai cấu hình để so sánh. Cấu hình thứ nhất là lược đồ giản lược chỉ mục, chỉ giữ các ràng buộc nền tảng cần thiết để hệ thống hoạt động đúng. Cấu hình thứ hai là lược đồ chính thức của hệ thống, được lấy từ file `lms.sql`, trong đó đã bao gồm các chỉ mục phục vụ truy vấn nghiệp vụ. Việc so sánh hai cấu hình này giúp làm rõ vai trò của các chỉ mục trong thiết kế hiện tại mà không cần tự tạo thêm một bộ chỉ mục ngoài schema chuẩn.

`[Chèn Hình 5.1. Kết quả EXPLAIN tại đây]`

### 5.4. Nhận xét về hiệu năng của lược đồ

Từ góc độ thiết kế, lược đồ hiện đã có nền tảng tối ưu cơ bản nhờ việc xác định khóa chính, khóa ngoại và một số chỉ mục quan trọng ngay trong quá trình tạo bảng. Tuy nhiên, khi đặt trong bối cảnh vận hành thực tế, vẫn có thể xem xét bổ sung thêm chỉ mục trên các cột thường xuyên tham gia phép nối và điều kiện lọc như:

- `courses.teacher_id`
- `videos.course_id`
- `documents.course_id`
- `course_enrollments.course_id`

### 5.5. Kết luận

Nhìn chung, lược đồ hiện đã có nền tảng tối ưu cơ bản và có thể đáp ứng tốt nhu cầu truy vấn ở mức thông thường. Tuy nhiên, khi số lượng người dùng và dữ liệu tăng lên, việc bổ sung chỉ mục phù hợp, đối chiếu truy vấn với `EXPLAIN` và đánh giá định kỳ hiệu năng truy vấn vẫn là cần thiết để duy trì khả năng vận hành ổn định của hệ thống.

## Chương 6. Sao lưu và phục hồi dữ liệu

### 6.1. Sự cần thiết của sao lưu và phục hồi

Sao lưu và phục hồi là nội dung quan trọng để đảm bảo an toàn dữ liệu người dùng, khóa học, kết quả học tập và dữ liệu hệ thống. Đối với một hệ thống LMS, dữ liệu không chỉ có giá trị quản trị mà còn gắn trực tiếp với quá trình học tập của người dùng. Nếu xảy ra sự cố làm mất dữ liệu, hệ thống có thể mất lịch sử ghi danh, tiến độ học tập, tài liệu hoặc kết quả làm bài.

Vì vậy, trong khuôn khổ môn học, việc trình bày một quy trình sao lưu và phục hồi cơ bản là cần thiết để cho thấy cơ sở dữ liệu không chỉ được thiết kế để lưu trữ, mà còn cần được chuẩn bị cho các tình huống rủi ro trong quá trình vận hành.

### 6.2. Chiến lược sao lưu đề xuất

Trong phạm vi môn học, có thể sử dụng phương án sao lưu mức file bằng `mysqldump`. Đây là cách làm tương đối đơn giản, dễ minh họa và phù hợp với một hệ cơ sở dữ liệu MySQL triển khai trên một máy chủ hoặc một môi trường thử nghiệm.

Ưu điểm của phương án này là dễ thực hiện, dễ phục hồi và dễ lưu thành file để phục vụ minh chứng trong báo cáo. Tuy nhiên, báo cáo cũng cần nêu rõ rằng đây là giải pháp phù hợp với quy mô học tập và thử nghiệm, chưa phải chiến lược sao lưu toàn diện cho hệ thống lớn.

### 6.3. Lệnh backup

Sau khi đã có cơ sở dữ liệu hoàn chỉnh và dữ liệu mẫu ban đầu, có thể thực hiện sao lưu bằng lệnh sau:

```powershell
mysqldump -u root -p lms > lms_backup.sql
```

`[Chèn Hình 6.1. Lệnh backup và file backup tại đây]`

### 6.4. Lệnh restore

Trong trường hợp cần khôi phục dữ liệu, file sao lưu có thể được nạp trở lại vào một cơ sở dữ liệu khác bằng lệnh sau:

```powershell
mysql -u root -p lms_restore < lms_backup.sql
```

`[Chèn Hình 6.2. Lệnh restore và kết quả tại đây]`

### 6.5. Ghi chú minh chứng

Trong quá trình hoàn thiện báo cáo, phần sao lưu và phục hồi nên đi kèm ảnh minh họa hoặc kết quả thực thi thực tế để tăng tính thuyết phục. Nếu tại thời điểm viết báo cáo chưa có đủ môi trường để chạy lệnh MySQL, cần nêu rõ đây là quy trình đề xuất có thể áp dụng trên MySQL và sẽ được bổ sung minh chứng khi có điều kiện triển khai thực tế.

### 6.6. Kết luận

Phương án sao lưu bằng file SQL là cách tiếp cận phù hợp trong phạm vi đề tài môn học vì dễ trình bày, dễ thử nghiệm và đủ để minh họa quy trình phục hồi dữ liệu cơ bản. Dù chưa phải giải pháp sao lưu chuyên sâu cho hệ thống lớn, nội dung này vẫn cho thấy cơ sở dữ liệu của hệ thống đã được xem xét dưới góc độ vận hành và an toàn dữ liệu.

## Chương 7. Kỹ thuật nâng cao

Phần kỹ thuật nâng cao trong báo cáo không chỉ dừng ở mức định hướng lý thuyết mà đã được triển khai thực nghiệm trên môi trường container. Trọng tâm của phần này là mô hình replication `primary - replica`, cơ chế `read/write split` ở backend và `automatic failover` thông qua một thành phần `failover-manager`.

### 7.1. Mục tiêu triển khai

Phần thực nghiệm hướng tới ba mục tiêu chính:

- triển khai được replication dữ liệu giữa hai node cơ sở dữ liệu
- tách được truy vấn đọc và truy vấn ghi ở tầng ứng dụng
- tự động chuyển vai trò ghi sang node còn sống khi primary gặp sự cố

### 7.2. Kiến trúc thực nghiệm

Mô hình được triển khai gồm ba thành phần:

- `mysql-primary` tiếp nhận thao tác ghi
- `mysql-replica` đồng bộ dữ liệu và phục vụ truy vấn đọc
- `failover-manager` giám sát trạng thái node và hỗ trợ failover tự động

Ở tầng backend, các truy vấn `SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN` được định tuyến sang replica, trong khi `INSERT`, `UPDATE`, `DELETE` được gửi tới primary.

### 7.3. Kết quả replication và read/write split

Replication được cấu hình theo `GTID auto-position`. Trạng thái kiểm tra cho thấy `Replica_IO_Running = Yes`, `Replica_SQL_Running = Yes` và độ trễ đồng bộ ở mức ổn định. Trong quá trình chạy thử, dữ liệu được ghi từ ứng dụng vào primary và truy vấn thấy ở replica sau khi đồng bộ.

Log backend cũng ghi nhận rõ hai hướng truy vấn:

- `[DB:read]` cho các truy vấn đọc
- `[DB:write]` cho các truy vấn ghi

Điều này xác nhận cơ chế `read/write split` đã được tích hợp thành công vào backend.

### 7.4. Automatic failover

Khi dừng node `mysql-primary`, `failover-manager` phát hiện lỗi kết nối sau nhiều lần kiểm tra liên tiếp, sau đó promote replica thành primary mới. Log hệ thống ghi nhận thông báo hoàn tất failover và cập nhật node ghi sang `127.0.0.1:3308`. Sau khi quá trình này kết thúc, backend vẫn tiếp tục thực hiện thành công các truy vấn ghi và đọc.

### 7.5. Liên hệ với sharding

So với replication, sharding vẫn được giữ ở mức định hướng nghiên cứu. Các bảng như `course_enrollments`, `video_completion`, `quiz_attempts` và `quiz_answers` là nhóm có thể xem xét sharding khi hệ thống đạt quy mô lớn hơn. Tuy nhiên, trong phạm vi hiện tại, replication là hướng triển khai phù hợp và thực tế hơn.

### 7.6. Kết luận

Phần kỹ thuật nâng cao đã được kiểm chứng trong môi trường thực nghiệm với mô hình `primary - replica`, `read/write split` và `automatic failover`. Kết quả này cho thấy hệ thống LMS có thể được mở rộng theo hướng tăng tính sẵn sàng và tăng khả năng chịu lỗi mà không cần thay đổi toàn bộ kiến trúc nghiệp vụ hiện có.

## Chương 8. Kết luận và hướng phát triển

### 8.1. Kết quả đạt được

Báo cáo đã trình bày được các nội dung cốt lõi của một đề tài cơ sở dữ liệu gắn với hệ thống LMS. Cụ thể, báo cáo đã mô tả bài toán nghiệp vụ, xác định các thực thể dữ liệu chính, xây dựng lược đồ logic và lược đồ vật lý, phân tích mức độ chuẩn hóa, trình bày quá trình khởi tạo cơ sở dữ liệu, xem xét các yếu tố tối ưu truy vấn, đồng thời triển khai được phần thực nghiệm kỹ thuật nâng cao với replication, tách truy vấn đọc và ghi ở backend, và automatic failover được kiểm thử trong môi trường thực nghiệm.

### 8.2. Đánh giá tổng quát về lược đồ dữ liệu của hệ thống

Lược đồ dữ liệu của hệ thống có cấu trúc tương đối hợp lý và phản ánh được các nhóm nghiệp vụ chính của một hệ thống LMS như quản lý người dùng, nội dung học tập, đánh giá, ghi danh và lớp học. Bên cạnh đó, quá trình đối chiếu với phần triển khai backend cũng cho thấy vẫn còn một số điểm cần tiếp tục đồng bộ để hệ thống hoàn thiện hơn.

### 8.3. Hạn chế của đề tài

Bên cạnh các kết quả đã đạt được, đề tài vẫn còn một số hạn chế. Trước hết, phần minh chứng thực nghiệm cho `EXPLAIN`, sao lưu và phục hồi cần được bổ sung đầy đủ hơn dưới dạng ảnh chụp và phụ lục thao tác. Đối với phần replication, mô hình hiện tại mới dừng ở một `primary`, một `replica` và một `failover-manager`, chưa có nhiều replica, chưa có cơ chế quorum hoặc consensus, và quy trình đưa primary cũ quay lại làm replica vẫn là `manual rejoin` chứ chưa tự động hoàn toàn. Bên cạnh đó, giữa lược đồ dữ liệu và phần triển khai backend vẫn còn một vài điểm chưa đồng bộ và cần tiếp tục chỉnh sửa trong giai đoạn sau.

### 8.4. Hướng phát triển

Trong thời gian tới, hệ thống có thể được hoàn thiện theo một số hướng chính. Thứ nhất là tiếp tục đồng bộ giữa lược đồ dữ liệu và mã nguồn backend để giảm sai lệch trong quá trình triển khai. Thứ hai là bổ sung đầy đủ minh chứng thực nghiệm cho `EXPLAIN`, sao lưu và phục hồi khi có môi trường MySQL phù hợp. Thứ ba là hoàn thiện hơn bộ migration, seed và dữ liệu mẫu để phục vụ kiểm thử và minh họa rõ hơn quá trình phát triển cơ sở dữ liệu. Thứ tư là mở rộng mô hình replication hiện tại theo hướng nhiều replica, cơ chế `automatic rejoin` hoặc `automatic failback` cho node cũ và monitoring đầy đủ hơn. Cuối cùng, khi hệ thống đạt quy mô lớn hơn, có thể nghiên cứu thêm các kỹ thuật phân tán sâu hơn như quorum, consensus hoặc sharding cho các bảng giao dịch lớn.

### 8.5. Kết luận chung

Qua đề tài này có thể thấy cơ sở dữ liệu SQL giữ vai trò trung tâm trong việc tổ chức và vận hành một hệ thống quản lý học tập trực tuyến. Việc xây dựng lược đồ phù hợp, thiết lập ràng buộc rõ ràng, chuẩn hóa dữ liệu và quan tâm tới tối ưu truy vấn là những yếu tố quyết định chất lượng của hệ thống. Trên cơ sở đó, đề tài đã đáp ứng được mục tiêu chính của học phần và tạo nền tảng để tiếp tục hoàn thiện trong các giai đoạn sau.
