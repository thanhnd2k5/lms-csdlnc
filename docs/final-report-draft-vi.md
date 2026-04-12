# BÁO CÁO BÀI TẬP LỚN
## Ứng dụng sử dụng cơ sở dữ liệu SQL cho hệ thống quản lý học tập trực tuyến LMS CSDLNC

## Chương 1. Giới thiệu đề tài

### 1.1. Lý do chọn đề tài

Trong xu thế chuyển đổi số hiện nay, ứng dụng công nghệ thông tin vào giáo dục và đào tạo đã trở thành một nhu cầu cấp thiết. Các hệ thống quản lý học tập trực tuyến, thường được gọi là Learning Management System, đóng vai trò quan trọng trong việc tổ chức, phân phối và theo dõi quá trình học tập của người học. Thông qua các hệ thống này, giảng viên có thể xây dựng nội dung giảng dạy, học viên có thể tiếp cận tài liệu học tập mọi lúc mọi nơi, trong khi nhà quản lý có thể theo dõi và đánh giá hiệu quả đào tạo dựa trên các dữ liệu cụ thể.

Tuy nhiên, để một hệ thống LMS có thể vận hành hiệu quả, nền tảng dữ liệu của nó cần được thiết kế khoa học, nhất quán và có khả năng mở rộng. Dữ liệu trong hệ thống LMS không đơn thuần là danh sách người dùng hay danh sách khóa học, mà còn bao gồm nhiều thành phần có quan hệ chặt chẽ như chương học, video bài giảng, tài liệu, bài kiểm tra, kết quả làm bài, lịch sử đăng ký học và thông tin lớp học. Nếu cơ sở dữ liệu được thiết kế không hợp lý, hệ thống sẽ gặp khó khăn trong quá trình truy vấn, cập nhật, bảo trì và mở rộng.

Xuất phát từ lý do trên, đề tài “Ứng dụng sử dụng cơ sở dữ liệu SQL cho hệ thống quản lý học tập trực tuyến LMS CSDLNC” được lựa chọn nhằm nghiên cứu và phân tích một bài toán gần với thực tế, đồng thời vẫn đảm bảo thể hiện rõ các kiến thức cốt lõi của môn Cơ sở dữ liệu, bao gồm phân tích thực thể, xây dựng lược đồ quan hệ, chuẩn hóa, tạo schema SQL, tối ưu truy vấn và đề xuất các giải pháp vận hành như sao lưu, phục hồi và mở rộng hệ thống.

### 1.2. Mục tiêu nghiên cứu

Đề tài hướng tới các mục tiêu chính sau:

- Phân tích bài toán quản lý học tập trực tuyến trên môi trường web.
- Xác định các thực thể dữ liệu, thuộc tính, quan hệ và ràng buộc cần thiết của hệ thống.
- Xây dựng cơ sở dữ liệu quan hệ sử dụng SQL phù hợp với bài toán.
- Đánh giá mức độ hợp lý của schema dữ liệu hiện có trong dự án LMS CSDLNC.
- Trình bày các nội dung liên quan đến khởi tạo, tối ưu, backup và restore cơ sở dữ liệu.
- Đề xuất một số hướng mở rộng nâng cao như replication và sharding ở mức độ lý thuyết.

### 1.3. Phạm vi đề tài

Về mặt phạm vi, đề tài được xây dựng dựa trên một dự án LMS full-stack đã có cấu trúc frontend, backend và schema SQL. Tuy nhiên, nội dung báo cáo chủ yếu tập trung vào thành phần cơ sở dữ liệu, cụ thể bao gồm:

- phân tích yêu cầu dữ liệu
- xác định thực thể, thuộc tính và quan hệ
- xây dựng lược đồ logic và vật lý
- mô tả data dictionary
- phân tích chuẩn hóa
- đánh giá index và hiệu năng truy vấn
- đề xuất backup, restore và mở rộng cơ sở dữ liệu

### 1.4. Phương pháp thực hiện

Báo cáo được thực hiện theo các bước cơ bản sau:

1. Khảo sát cấu trúc dự án và file schema SQL.
2. Phân tích bài toán nghiệp vụ của hệ thống LMS.
3. Xác định các thực thể và quan hệ dữ liệu.
4. Đối chiếu schema với mã nguồn backend để đánh giá tính phù hợp.
5. Mô tả lược đồ dữ liệu ở hai mức logic và vật lý.
6. Phân tích các ràng buộc, index và truy vấn tiêu biểu.
7. Xây dựng nội dung backup, restore và các hướng mở rộng nâng cao.

### 1.5. Ý nghĩa của đề tài

Đề tài có ý nghĩa ở hai khía cạnh.

Về mặt học thuật, đề tài giúp vận dụng các kiến thức trong môn Cơ sở dữ liệu vào một bài toán cụ thể và có tính thực tế cao. Các nội dung như phân tích thực thể, lược đồ quan hệ, chuẩn hóa, index hay backup không được trình bày một cách lý thuyết đơn lẻ, mà được gắn trực tiếp với một hệ thống ứng dụng cụ thể.

Về mặt ứng dụng, đề tài cho thấy tầm quan trọng của việc thiết kế cơ sở dữ liệu đúng ngay từ đầu đối với các hệ thống phần mềm có nghiệp vụ phức tạp.

## Chương 2. Mô tả bài toán và chức năng hệ thống

### 2.1. Bài toán nghiệp vụ

Hệ thống LMS CSDLNC hướng tới bài toán quản lý học tập trực tuyến trên nền tảng web. Hệ thống không chỉ hỗ trợ phân phối nội dung học tập, mà còn hỗ trợ quản lý khóa học, theo dõi tiến độ học tập, tổ chức đánh giá kết quả học tập và quản lý học viên theo từng lớp học hoặc nhóm học tập cụ thể.

### 2.2. Đối tượng sử dụng hệ thống

Hệ thống được xây dựng với ba nhóm người dùng chính:

- Quản trị viên
- Giảng viên
- Học viên

### 2.3. Chức năng chính của hệ thống

Căn cứ vào mã nguồn ứng dụng và schema SQL hiện có, hệ thống bao gồm các nhóm chức năng chính sau:

- Quản lý tài khoản và xác thực
- Quản lý khóa học
- Quản lý chương học và video
- Quản lý tài liệu học tập
- Tổ chức đánh giá qua bài kiểm tra
- Đăng ký học và theo dõi tiến độ
- Quản lý lớp học

### 2.4. Kiến trúc tổng quan của ứng dụng

Hệ thống được xây dựng theo mô hình client-server gồm:

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

Schema hiện tại bao gồm các thực thể chính:

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

Chi tiết từng bảng được mô tả trong [Data Dictionary chi tiết](/D:/lms-csdlnc/docs/data-dictionary-detailed-vi.md).

### 3.3. Quan hệ và ràng buộc giữa các thực thể

Hệ thống có các quan hệ một-nhiều và nhiều-nhiều rõ ràng:

- `users` - `courses`
- `courses` - `chapters`
- `chapters` - `videos`
- `users` - `courses` qua `course_enrollments`
- `users` - `videos` qua `video_completion`
- `classes` - `courses` qua `class_courses`
- `classes` - `users` qua `class_students`

Schema sử dụng:

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

Sơ đồ ERD đề xuất:

- [erd-mermaid.md](/D:/lms-csdlnc/docs/erd-mermaid.md)

`[Chèn Hình 3.1. Sơ đồ ERD tổng thể tại đây]`

### 3.5. Lược đồ vật lý

Về mặt vật lý, schema được cài đặt trên MySQL với:

- `INT AUTO_INCREMENT`
- `TIMESTAMP`
- `BOOLEAN`
- `ENUM`
- `InnoDB`
- `utf8mb4`

### 3.6. Chuẩn hóa lược đồ

Schema hiện tại đạt mức chuẩn hóa tốt, có thể trình bày là đạt đến mức 3NF ở phần lớn các bảng:

- dữ liệu lặp được tách ra bảng riêng
- quan hệ nhiều-nhiều được tách qua bảng trung gian
- thông tin mô tả thực thể không lặp lại không cần thiết

### 3.7. Data Dictionary

Data Dictionary chi tiết được trình bày trong:

- [data-dictionary-detailed-vi.md](/D:/lms-csdlnc/docs/data-dictionary-detailed-vi.md)

`[Chèn Bảng Data Dictionary chi tiết tại đây hoặc đưa vào Phụ lục B]`

### 3.8. Nhận xét

Schema hiện tại của hệ thống LMS CSDLNC là nền tảng hợp lý để phân tích trong môn Cơ sở dữ liệu. Tuy nhiên, quá trình đối chiếu với backend cho thấy một số điểm chưa đồng bộ, được ghi chú trong:

- [schema-gap-notes.md](/D:/lms-csdlnc/docs/schema-gap-notes.md)

## Chương 4. Khởi tạo và triển khai cơ sở dữ liệu

### 4.1. Mục tiêu khởi tạo cơ sở dữ liệu

Mục tiêu là tạo đầy đủ bảng, ràng buộc, khóa, chỉ mục và dữ liệu mẫu để phục vụ thử nghiệm và minh họa hệ thống.

### 4.2. Script tạo bảng

File `backend/lms.sql` đóng vai trò là script schema chính, tạo toàn bộ bảng và ràng buộc theo thứ tự phù hợp.

### 4.3. Mô tả các script khởi tạo

Hệ thống hiện có:

- script schema: `lms.sql`

Hệ thống đã được bổ sung script mẫu:

- [migration_up.sql](/D:/lms-csdlnc/docs/sql/migration_up.sql)
- [migration_down.sql](/D:/lms-csdlnc/docs/sql/migration_down.sql)
- [seed.sql](/D:/lms-csdlnc/docs/sql/seed.sql)
- bộ migration giả lập theo từng phiên bản:
  - [V1__init_core.sql](/D:/lms-csdlnc/docs/sql/migrations/V1__init_core.sql)
  - [V2__add_quiz_module.sql](/D:/lms-csdlnc/docs/sql/migrations/V2__add_quiz_module.sql)
  - [V3__add_enrollment_progress_documents.sql](/D:/lms-csdlnc/docs/sql/migrations/V3__add_enrollment_progress_documents.sql)
  - [V4__add_class_management.sql](/D:/lms-csdlnc/docs/sql/migrations/V4__add_class_management.sql)

### 4.4. Mô phỏng quá trình phát triển schema theo migration

Để phần migration sinh động và hợp lý hơn về mặt học thuật, báo cáo có thể mô tả cơ sở dữ liệu được phát triển dần qua nhiều phiên bản thay vì xuất hiện hoàn chỉnh ngay từ đầu.

Các giai đoạn phát triển đề xuất:

- V1: khởi tạo lõi người dùng, khóa học, chương và video
- V2: bổ sung module bài kiểm tra
- V3: bổ sung ghi danh, tiến độ học tập và tài liệu
- V4: bổ sung quản lý lớp học

Tài liệu mô tả chi tiết:

- [migration-evolution-vi.md](/D:/lms-csdlnc/docs/migration-evolution-vi.md)

### 4.5. Quy trình khởi tạo cơ sở dữ liệu

1. Tạo database `lms`
2. Chạy `lms.sql`
3. Kiểm tra danh sách bảng
4. Nạp dữ liệu seed
5. Kiểm tra số lượng bản ghi

`[Chèn Hình 4.1. Kết quả tạo schema tại đây]`

`[Chèn Hình 4.2. Kết quả nạp dữ liệu seed tại đây]`

## Chương 5. Tối ưu và vận hành cơ sở dữ liệu

### 5.1. Vai trò của tối ưu cơ sở dữ liệu

Tối ưu cơ sở dữ liệu nhằm đảm bảo hệ thống có thể truy vấn dữ liệu nhanh, nhất là khi số lượng học viên, khóa học và dữ liệu học tập tăng lên.

### 5.2. Danh sách chỉ mục trong schema

Chi tiết được trình bày trong:

- [appendix-indexes-vi.md](/D:/lms-csdlnc/docs/appendix-indexes-vi.md)

### 5.3. Các truy vấn tiêu biểu và EXPLAIN

Các truy vấn mẫu và lệnh `EXPLAIN` được tổng hợp trong:

- [appendix-queries-vi.md](/D:/lms-csdlnc/docs/appendix-queries-vi.md)
- [explain_queries.sql](/D:/lms-csdlnc/docs/sql/explain_queries.sql)

`[Chèn Hình 5.1. Kết quả EXPLAIN tại đây]`

### 5.4. Nhận xét về hiệu năng schema hiện tại

Schema đã có nền tảng tối ưu cơ bản, nhưng vẫn có thể bổ sung thêm chỉ mục trên các cột join và cột lọc như:

- `courses.teacher_id`
- `videos.course_id`
- `documents.course_id`
- `course_enrollments.course_id`

## Chương 6. Sao lưu và phục hồi dữ liệu

### 6.1. Sự cần thiết của sao lưu và phục hồi

Backup và restore là nội dung quan trọng để đảm bảo an toàn dữ liệu người dùng, khóa học, kết quả học tập và dữ liệu hệ thống.

### 6.2. Chiến lược sao lưu đề xuất

Trong phạm vi môn học, có thể sử dụng backup mức file bằng `mysqldump`.

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

Tình trạng minh chứng thực tế được ghi rõ trong:

- [evidence-status-vi.md](/D:/lms-csdlnc/docs/evidence-status-vi.md)

## Chương 7. Kỹ thuật nâng cao

### 7.1. Replication

Replication là cơ chế sao chép dữ liệu từ máy chủ chính sang máy chủ phụ để:

- tăng tính sẵn sàng
- giảm tải truy vấn đọc
- hỗ trợ dự phòng

### 7.2. Sharding

Sharding là kỹ thuật phân tách dữ liệu thành nhiều phần trên nhiều máy chủ.

Trong hệ thống LMS, các bảng có thể xem xét sharding về mặt lý thuyết là:

- `course_enrollments`
- `video_completion`
- `quiz_attempts`
- `quiz_answers`

### 7.3. Kết luận

Hai kỹ thuật này được đưa vào báo cáo như nội dung mở rộng mang tính định hướng, không mô tả như đã triển khai thực tế.

## Chương 8. Kết luận và hướng phát triển

### 8.1. Kết quả đạt được

Báo cáo đã phân tích được:

- bài toán nghiệp vụ
- mô hình dữ liệu
- lược đồ logic và vật lý
- chuẩn hóa
- khởi tạo CSDL
- tối ưu
- backup/restore
- hướng mở rộng nâng cao

### 8.2. Đánh giá tổng quát về schema hiện tại

Schema hiện tại có cấu trúc hợp lý, thể hiện đầy đủ các nhóm nghiệp vụ chính của hệ thống LMS. Tuy nhiên, vẫn còn một số điểm chưa đồng bộ với backend code.

### 8.3. Hạn chế của đề tài

- chưa có migration tách riêng theo phiên bản
- chưa có seed chuẩn hóa trong repo gốc
- chưa có minh chứng triển khai thực tế cho replication, sharding

### 8.4. Hướng phát triển

- hoàn thiện tính đồng bộ giữa schema và code
- bổ sung migration và seed
- bổ sung minh chứng `EXPLAIN`
- mở rộng backup và replication

### 8.5. Kết luận chung

Đề tài đã cho thấy vai trò trung tâm của cơ sở dữ liệu SQL trong việc xây dựng hệ thống quản lý học tập trực tuyến. Schema hiện tại của LMS CSDLNC là nền tảng phù hợp để phân tích trong môn Cơ sở dữ liệu và có khả năng tiếp tục hoàn thiện trong các giai đoạn sau.
