# Chương 3. Phân tích và thiết kế cơ sở dữ liệu

## 3.1. Yêu cầu dữ liệu

Cơ sở dữ liệu của hệ thống cần đáp ứng các nhóm yêu cầu:

- Lưu trữ thông tin người dùng và phân quyền
- Lưu trữ cấu trúc nội dung học tập
- Lưu trữ tài liệu, bài kiểm tra và kết quả học tập
- Lưu trữ ghi danh, tiến độ học tập và lớp học
- Đảm bảo tính toàn vẹn tham chiếu

## 3.2. Phân tích thực thể

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

Trong báo cáo chính, các thực thể trên sẽ được phân tích theo nhóm chức năng để làm rõ vai trò của từng thành phần dữ liệu trong hệ thống. Phần mô tả chi tiết tên bảng, tên cột, kiểu dữ liệu và ràng buộc có thể trình bày ở mục Từ điển dữ liệu hoặc đưa xuống phần phụ lục để thuận tiện theo dõi.

## 3.3. Quan hệ và ràng buộc giữa các thực thể

Quan hệ giữa các thực thể trong hệ thống LMS không chỉ phản ánh cách tổ chức dữ liệu về mặt kỹ thuật mà còn thể hiện trực tiếp cấu trúc nghiệp vụ của bài toán. Từ lược đồ quan hệ có thể thấy các thực thể được liên kết theo hai nhóm chính là quan hệ một-nhiều và quan hệ nhiều-nhiều. Việc phân tách rõ hai nhóm này giúp mô tả chính xác hơn cách dữ liệu được tạo ra, được phụ thuộc lẫn nhau và được sử dụng trong các chức năng cốt lõi của hệ thống.

Có thể tóm tắt các quan hệ và ràng buộc chính của hệ thống như sau:

- Quan hệ một-nhiều: `users -> courses`, `courses -> chapters`, `chapters -> videos`, `quizzes -> quiz_questions`, `quiz_questions -> quiz_options`, `quizzes -> quiz_attempts`.
- Quan hệ nhiều-nhiều: `users <-> courses` qua `course_enrollments`, `users <-> videos` qua `video_completion`, `classes <-> courses` qua `class_courses`, `classes <-> users` qua `class_students`.
- Quan hệ mở rộng theo nghiệp vụ: `class_students_courses_approval` lưu trạng thái phê duyệt học viên theo từng khóa học trong lớp.
- Ràng buộc toàn vẹn chính: `PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL`, `UNIQUE`, `ENUM`.
- Quy tắc tham chiếu khi xóa dữ liệu: kết hợp `ON DELETE CASCADE` và `ON DELETE SET NULL` tùy tính chất phụ thuộc giữa các bảng.

Trước hết, hệ thống có nhiều quan hệ một-nhiều mang tính phân cấp rõ ràng. Một người dùng có vai trò giảng viên trong bảng `users` có thể phụ trách nhiều khóa học trong bảng `courses`, được thể hiện thông qua khóa ngoại `teacher_id`. Từ mỗi khóa học, dữ liệu tiếp tục được mở rộng theo chiều nội dung: một khóa học có thể bao gồm nhiều chương trong bảng `chapters`, và mỗi chương có thể chứa nhiều video trong bảng `videos`. Cấu trúc này cho thấy dữ liệu học tập được tổ chức theo mô hình từ tổng quát đến chi tiết, phù hợp với cách triển khai nội dung trong các nền tảng LMS thực tế.

Ngoài nhóm nội dung học tập, mô hình một-nhiều còn xuất hiện rõ trong nhóm đánh giá. Một bài kiểm tra trong bảng `quizzes` có thể bao gồm nhiều câu hỏi trong `quiz_questions`, và mỗi câu hỏi lại có nhiều phương án lựa chọn trong `quiz_options`. Tương tự, một bài kiểm tra cũng có thể phát sinh nhiều lần làm bài trong bảng `quiz_attempts`, còn mỗi lần làm bài có thể gồm nhiều bản ghi trả lời trong `quiz_answers`. Cách tổ chức này cho phép hệ thống theo dõi đồng thời cả cấu trúc của đề kiểm tra lẫn lịch sử làm bài của học viên, từ đó phục vụ các chức năng chấm điểm, thống kê và đánh giá tiến độ học tập.

Bên cạnh các quan hệ một-nhiều, hệ thống còn có nhiều quan hệ nhiều-nhiều cần được tách ra bằng các bảng trung gian. Quan hệ giữa học viên và khóa học là ví dụ điển hình: một học viên có thể đăng ký nhiều khóa học, đồng thời một khóa học cũng có thể có nhiều học viên tham gia. Quan hệ này được cài đặt qua bảng `course_enrollments`. Theo cách tương tự, quan hệ giữa học viên và video được quản lý qua bảng `video_completion`, cho phép hệ thống lưu trạng thái hoàn thành của từng học viên đối với từng video cụ thể. Đây là cơ sở dữ liệu quan trọng để tính tiến độ học tập và tổng hợp mức độ tham gia của người học.

Trong phạm vi quản lý lớp học, quan hệ nhiều-nhiều còn được mở rộng thêm một tầng nghiệp vụ. Một lớp học trong bảng `classes` có thể gắn với nhiều khóa học khác nhau thông qua bảng `class_courses`, và một khóa học cũng có thể được sử dụng trong nhiều lớp khác nhau. Đồng thời, một lớp có thể có nhiều học viên và một học viên cũng có thể tham gia nhiều lớp, được biểu diễn qua bảng `class_students`. Đặc biệt, bảng `class_students_courses_approval` đóng vai trò mở rộng để theo dõi trạng thái phê duyệt của từng học viên đối với từng khóa học trong một lớp. Sự xuất hiện của bảng này cho thấy mô hình dữ liệu không chỉ phục vụ việc lưu trữ quan hệ cơ bản mà còn hướng đến hỗ trợ các quy trình quản lý linh hoạt và chi tiết hơn.

Về mặt ràng buộc, lược đồ sử dụng đồng thời nhiều cơ chế để đảm bảo tính toàn vẹn dữ liệu. Trước hết, toàn vẹn thực thể được đảm bảo thông qua khóa chính ở tất cả các bảng. Phần lớn các bảng thực thể chính như `users`, `courses`, `chapters`, `videos` hay `quizzes` sử dụng khóa chính đơn kiểu tự tăng để định danh mỗi bản ghi. Trong khi đó, các bảng liên kết như `class_courses`, `class_students` và `class_students_courses_approval` sử dụng khóa chính ghép để xác định duy nhất một quan hệ cụ thể giữa các thực thể tham gia. Việc dùng khóa chính ghép ở các bảng này là hợp lý vì bản thân ý nghĩa nghiệp vụ của bản ghi nằm ở tổ hợp khóa chứ không nằm ở một mã định danh độc lập.

Toàn vẹn tham chiếu được duy trì thông qua hệ thống khóa ngoại giữa các bảng. Các khóa ngoại như `chapters.course_id`, `videos.chapter_id`, `course_enrollments.user_id`, `course_enrollments.course_id`, `class_students.student_id` hay `class_courses.class_id` bảo đảm rằng mọi bản ghi ở bảng con đều phải tham chiếu tới một bản ghi hợp lệ ở bảng cha. Bên cạnh đó, lược đồ còn kết hợp các quy tắc xử lý khi xóa dữ liệu như `ON DELETE CASCADE` và `ON DELETE SET NULL`. Với những quan hệ phụ thuộc chặt, chẳng hạn chương phụ thuộc vào khóa học hoặc câu hỏi phụ thuộc vào bài kiểm tra, việc xóa bản ghi cha sẽ kéo theo việc xóa các bản ghi con để tránh dữ liệu mồ côi. Ngược lại, với các quan hệ mang tính liên kết ngữ cảnh như `courses.teacher_id` hoặc các liên kết từ `quizzes` đến `courses`, `chapters`, `videos`, hệ thống chọn đặt giá trị về `NULL` để vẫn giữ lại bản ghi chính khi cần thiết.

Ngoài khóa chính và khóa ngoại, hệ thống còn sử dụng các ràng buộc miền giá trị như `NOT NULL`, `ENUM` và `UNIQUE`. Các cột quan trọng mang ý nghĩa bắt buộc như tên khóa học, tiêu đề video, vai trò người dùng hay mã lớp học đều được khai báo `NOT NULL` để hạn chế dữ liệu thiếu. Các trường trạng thái và phân loại như `users.role`, `quizzes.quiz_type`, `quiz_attempts.status` hay `classes.status` được biểu diễn bằng `ENUM`, giúp kiểm soát tập giá trị hợp lệ ngay tại mức cơ sở dữ liệu. Đối với các quan hệ không được phép trùng lặp, hệ thống bổ sung thêm ràng buộc duy nhất, điển hình là `UNIQUE(user_id, course_id)` trong `course_enrollments`, `UNIQUE(user_id, video_id)` trong `video_completion` và `UNIQUE(user_id, course_id)` trong `course_reviews`. Những ràng buộc này giúp tránh phát sinh các bản ghi lặp, đồng thời góp phần bảo vệ tính nhất quán của dữ liệu nghiệp vụ.

Nhìn tổng thể, các quan hệ và ràng buộc trong lược đồ được thiết kế theo hướng khá chặt chẽ và phù hợp với đặc trưng của hệ thống LMS. Các thực thể chính được tách riêng, các quan hệ nhiều-nhiều được giải quyết bằng bảng trung gian, còn các quy tắc toàn vẹn được triển khai ngay từ mức lược đồ để giảm nguy cơ sai lệch dữ liệu trong quá trình vận hành. Đây cũng là nền tảng quan trọng để các phần phân tích chuẩn hóa, tối ưu truy vấn và xây dựng từ điển dữ liệu ở các mục sau có thể được trình bày nhất quán.

Bảng dưới đây tóm tắt các quan hệ chính giữa các thực thể để làm rõ hơn ý nghĩa của sơ đồ ERD ở phần tiếp theo:

| Quan hệ | Kiểu quan hệ | Ý nghĩa nghiệp vụ |
| --- | --- | --- |
| `users` - `courses` | Một-nhiều | Một giảng viên có thể phụ trách nhiều khóa học, mỗi khóa học gắn với một giảng viên phụ trách. |
| `courses` - `chapters` | Một-nhiều | Một khóa học gồm nhiều chương học, giúp nội dung được chia theo cấu trúc học tập rõ ràng. |
| `chapters` - `videos` | Một-nhiều | Một chương có thể chứa nhiều video bài giảng, phục vụ việc tổ chức nội dung theo từng bài học. |
| `courses` - `documents` | Một-nhiều hoặc liên kết tùy ngữ cảnh | Tài liệu học tập có thể được gắn với khóa học, chương hoặc video để bổ sung học liệu cho người học. |
| `quizzes` - `quiz_questions` | Một-nhiều | Một bài kiểm tra gồm nhiều câu hỏi. |
| `quiz_questions` - `quiz_options` | Một-nhiều | Mỗi câu hỏi có nhiều phương án lựa chọn, trong đó có thể đánh dấu đáp án đúng. |
| `users` - `courses` qua `course_enrollments` | Nhiều-nhiều | Một học viên có thể đăng ký nhiều khóa học và một khóa học có thể có nhiều học viên tham gia. |
| `users` - `videos` qua `video_completion` | Nhiều-nhiều | Hệ thống theo dõi trạng thái hoàn thành từng video của từng học viên. |
| `classes` - `courses` qua `class_courses` | Nhiều-nhiều | Một lớp có thể được gán nhiều khóa học và một khóa học có thể được dùng cho nhiều lớp. |
| `classes` - `users` qua `class_students` | Nhiều-nhiều | Một lớp có nhiều học viên và một học viên có thể tham gia nhiều lớp. |
| `users` - `quizzes` qua `quiz_attempts` | Một-nhiều theo lượt làm bài | Một học viên có thể thực hiện nhiều lượt làm bài, mỗi lượt ghi nhận điểm số và trạng thái làm bài. |
| `users` - `courses` qua `course_reviews` | Nhiều-nhiều có ràng buộc duy nhất | Học viên có thể đánh giá khóa học, nhưng mỗi học viên chỉ được đánh giá một khóa học một lần. |

## 3.4. Lược đồ logic

Về mặt logic, hệ thống được chia thành các cụm dữ liệu:

- quản lý người dùng
- quản lý nội dung học tập
- quản lý đánh giá
- quản lý tham gia học tập
- quản lý lớp học

Từ các cụm dữ liệu trên, các thực thể trong ERD được ánh xạ thành lược đồ quan hệ. Mỗi thực thể chính được chuyển thành một bảng, các quan hệ một-nhiều được biểu diễn bằng khóa ngoại, còn các quan hệ nhiều-nhiều được tách thành bảng trung gian. Bảng dưới đây trình bày lược đồ quan hệ rút gọn của hệ thống:

| Quan hệ | Thuộc tính chính | Khóa và ràng buộc chính |
| --- | --- | --- |
| `users` | `id`, `username`, `email`, `password`, `full_name`, `role`, `email_verified`, `avatar`, `bio` | PK: `id`; UNIQUE: `username`, `email`; INDEX: `idx_user_role(role)` |
| `courses` | `id`, `title`, `description`, `thumbnail`, `is_public`, `teacher_id`, `level`, `requirements`, `highlights` | PK: `id`; FK: `teacher_id -> users(id)`; INDEX: `idx_course_public(is_public)` |
| `chapters` | `id`, `course_id`, `title`, `order_index` | PK: `id`; FK: `course_id -> courses(id)`; INDEX: `idx_chapter_order(course_id, order_index)` |
| `videos` | `id`, `course_id`, `chapter_id`, `title`, `video_url` | PK: `id`; FK: `course_id -> courses(id)`, `chapter_id -> chapters(id)`; INDEX: `idx_video_chapter(chapter_id)` |
| `documents` | `id`, `title`, `file_path`, `file_type`, `course_id`, `chapter_id`, `video_id`, `teacher_id` | PK: `id`; FK: `course_id -> courses(id)`, `chapter_id -> chapters(id)`, `video_id -> videos(id)`, `teacher_id -> users(id)` |
| `quizzes` | `id`, `title`, `course_id`, `chapter_id`, `video_id`, `quiz_type`, `teacher_id` | PK: `id`; FK: `course_id -> courses(id)`, `chapter_id -> chapters(id)`, `video_id -> videos(id)`, `teacher_id -> users(id)`; INDEX: `idx_quiz_type(quiz_type)` |
| `quiz_questions` | `id`, `quiz_id`, `question_text`, `points`, `allows_multiple_correct` | PK: `id`; FK: `quiz_id -> quizzes(id)` |
| `quiz_options` | `id`, `question_id`, `option_text`, `is_correct` | PK: `id`; FK: `question_id -> quiz_questions(id)` |
| `quiz_attempts` | `id`, `user_id`, `quiz_id`, `score`, `status`, `end_time` | PK: `id`; FK: `user_id -> users(id)`, `quiz_id -> quizzes(id)`; INDEX: `idx_attempt_user_quiz(user_id, quiz_id)` |
| `quiz_answers` | `id`, `attempt_id`, `question_id`, `selected_option_id` | PK: `id`; FK: `attempt_id -> quiz_attempts(id)`, `question_id -> quiz_questions(id)`, `selected_option_id -> quiz_options(id)` |
| `course_enrollments` | `id`, `user_id`, `course_id`, `enrolled_at` | PK: `id`; FK: `user_id -> users(id)`, `course_id -> courses(id)`; UNIQUE: `(user_id, course_id)` |
| `video_completion` | `id`, `user_id`, `video_id`, `is_completed`, `completed_at` | PK: `id`; FK: `user_id -> users(id)`, `video_id -> videos(id)`; UNIQUE: `(user_id, video_id)` |
| `classes` | `id`, `name`, `teacher_id`, `class_code`, `status`, `max_students` | PK: `id`; FK: `teacher_id -> users(id)`; UNIQUE: `class_code`; INDEX: `idx_class_code(class_code)` |
| `class_courses` | `class_id`, `course_id`, `requires_approval`, `added_at` | PK: `(class_id, course_id)`; FK: `class_id -> classes(id)`, `course_id -> courses(id)` |
| `class_students` | `class_id`, `student_id`, `status`, `joined_at` | PK: `(class_id, student_id)`; FK: `class_id -> classes(id)`, `student_id -> users(id)` |
| `class_students_courses_approval` | `class_id`, `student_id`, `course_id`, `status`, `updated_at` | PK: `(class_id, student_id, course_id)`; FK: `class_id -> classes(id)`, `student_id -> users(id)`, `course_id -> courses(id)` |
| `course_reviews` | `id`, `course_id`, `user_id`, `rating`, `comment`, `created_at` | PK: `id`; FK: `course_id -> courses(id)`, `user_id -> users(id)`; UNIQUE: `(user_id, course_id)`; INDEX: `idx_course_rating(course_id, rating)` |

Lược đồ quan hệ trên là cơ sở để triển khai lược đồ vật lý trong MySQL. Các bảng trung gian như `course_enrollments`, `video_completion`, `class_courses`, `class_students` và `class_students_courses_approval` giúp chuyển các quan hệ nhiều-nhiều trong ERD thành các quan hệ có khóa chính, khóa ngoại và ràng buộc rõ ràng.

Để làm rõ quan hệ giữa các thực thể, báo cáo sử dụng sơ đồ ERD ở cả mức tổng thể và mức nhóm chức năng. Trước hết, Hình 3.1 trình bày sơ đồ ERD tổng thể của toàn bộ hệ thống, qua đó cho thấy mối liên hệ giữa người dùng, khóa học, nội dung học tập, bài kiểm tra, tiến độ học tập và lớp học.

`[Chèn Hình 3.1. Sơ đồ ERD tổng thể của hệ thống tại đây]`

Sơ đồ ERD tổng thể cho thấy bức tranh liên kết dữ liệu của toàn hệ thống. Trong đó, nhóm người dùng là điểm xuất phát của nhiều nghiệp vụ như giảng dạy, ghi danh, làm bài kiểm tra và đánh giá khóa học. Các nhóm khóa học, nội dung học tập, bài kiểm tra, tiến độ và lớp học được tách thành các cụm riêng nhưng vẫn liên kết bằng khóa ngoại, giúp dữ liệu vừa dễ mở rộng vừa bảo đảm toàn vẹn tham chiếu.

Từ sơ đồ tổng thể, có thể tiếp tục phân tích sâu hơn các nhóm dữ liệu có vai trò trọng tâm trong hệ thống. Để thuận tiện cho việc theo dõi, báo cáo tách riêng ba nhóm dữ liệu chính gồm nhóm đánh giá và bài kiểm tra, nhóm lớp học và ghi danh, và nhóm nội dung học tập.

Hình 3.2 làm rõ mối quan hệ giữa bài kiểm tra, câu hỏi, đáp án và lịch sử làm bài của học viên.

`[Chèn Hình 3.2. Sơ đồ ERD nhóm đánh giá và bài kiểm tra tại đây]`

Hình này làm rõ cấu trúc dữ liệu cho chức năng kiểm tra đánh giá. Một bài kiểm tra có nhiều câu hỏi, mỗi câu hỏi có nhiều phương án trả lời, còn kết quả làm bài của học viên được lưu thông qua các bảng lịch sử làm bài và câu trả lời chi tiết. Cách tách bảng như vậy giúp hệ thống lưu được cả cấu trúc đề, đáp án đúng và quá trình làm bài của từng học viên.

Hình 3.3 thể hiện nhóm dữ liệu phục vụ quản lý lớp học, ghi danh và theo dõi tiến độ học tập của học viên.

`[Chèn Hình 3.3. Sơ đồ ERD nhóm lớp học, ghi danh và tiến độ học tập tại đây]`

Nhóm ERD này thể hiện cách hệ thống tổ chức học viên theo lớp, gắn lớp với khóa học và theo dõi trạng thái tham gia học tập. Các bảng trung gian như `class_courses`, `class_students` và `course_enrollments` giúp biểu diễn quan hệ nhiều-nhiều một cách rõ ràng. Nhờ đó, hệ thống có thể quản lý đồng thời lớp học, khóa học được phân cho lớp và tiến độ của từng học viên.

Hình 3.4 mô tả cấu trúc dữ liệu của nhóm nội dung học tập, gồm khóa học, chương học, video và tài liệu.

`[Chèn Hình 3.4. Sơ đồ ERD nhóm nội dung học tập tại đây]`

Sơ đồ nhóm nội dung học tập mô tả cấu trúc phân cấp từ khóa học đến chương, video và tài liệu. Mỗi khóa học có thể gồm nhiều chương, mỗi chương có nhiều video, còn tài liệu có thể được dùng để bổ sung học liệu cho quá trình học. Cấu trúc này phù hợp với nghiệp vụ LMS vì nội dung được tổ chức theo thứ tự học tập rõ ràng và dễ truy vấn.

Cách trình bày này giúp người đọc vừa có cái nhìn tổng quan về toàn bộ hệ thống, vừa theo dõi được chi tiết của từng nhóm dữ liệu quan trọng mà không bị rối bởi một sơ đồ quá lớn.

## 3.5. Lược đồ vật lý

Về mặt vật lý, lược đồ được cài đặt trên MySQL với:

- `INT AUTO_INCREMENT`
- `TIMESTAMP`
- `BOOLEAN`
- `ENUM`
- `InnoDB`
- `utf8mb4`

Ở mức vật lý, mỗi bảng được cài đặt bằng các câu lệnh `CREATE TABLE`, trong đó xác định rõ khóa chính, khóa ngoại, kiểu dữ liệu, giá trị mặc định và các chỉ mục cần thiết. Việc mô tả lược đồ vật lý giúp làm rõ cách mô hình dữ liệu logic được chuyển thành cấu trúc cụ thể trong hệ quản trị cơ sở dữ liệu MySQL.

## 3.6. Chuẩn hóa lược đồ

Lược đồ của hệ thống được thiết kế theo hướng chuẩn hóa tốt. Nhìn chung, các thực thể chính và các quan hệ trung gian đã được tách tương đối rõ, giúp hạn chế trùng lặp dữ liệu và thuận lợi cho việc cập nhật, truy vấn cũng như mở rộng hệ thống.

Ở mức chuẩn thứ nhất, các bảng đều có khóa chính rõ ràng và các thuộc tính được tổ chức theo dạng giá trị nguyên tử. Hệ thống không gộp các nhóm dữ liệu lặp vào một bảng lớn; thay vào đó, các nhóm dữ liệu có khả năng phát sinh nhiều bản ghi đã được tách thành các bảng riêng như `quiz_questions`, `quiz_options`, `course_enrollments` hay `class_students`. Riêng các trường `requirements` và `highlights` trong bảng `courses` được sử dụng như metadata mô tả khóa học; nếu cần chuẩn hóa nghiêm ngặt hơn, hai nhóm thông tin này có thể tiếp tục tách thành các bảng riêng như `course_requirements` và `course_highlights`.

Ở mức chuẩn thứ hai, các bảng liên kết sử dụng khóa ghép như `class_courses`, `class_students` và `class_students_courses_approval` được tổ chức tương đối hợp lý. Các thuộc tính không khóa trong các bảng này nhìn chung phụ thuộc vào toàn bộ khóa chính, thay vì chỉ phụ thuộc vào một phần của khóa.

Ở mức chuẩn thứ ba, phần lớn các bảng có thể xem là đạt mức chuẩn hóa tốt vì thông tin mô tả thực thể đã được đặt đúng vào bảng tương ứng. Ví dụ, thông tin giảng viên không lặp lại trong bảng `courses`, mà được liên kết qua khóa ngoại `teacher_id`; thông tin câu hỏi và đáp án cũng được tách khỏi bảng `quizzes` để tránh phụ thuộc bắc cầu không cần thiết.

Tuy nhiên, xét một cách chặt chẽ theo lý thuyết, vẫn có một số bảng được thiết kế theo hướng phục vụ nghiệp vụ và thuận tiện cho truy vấn nên có thể tiếp tục được xem xét, tinh chỉnh nếu cần chuẩn hóa sâu hơn trong tương lai. Vì vậy, có thể kết luận rằng lược đồ của hệ thống đạt mức chuẩn hóa tốt, trong đó phần lớn các bảng có thể trình bày ở mức gần hoặc đạt chuẩn 3NF.

## 3.7. Từ điển dữ liệu

Sau khi phân tích thực thể và quan hệ, bước tiếp theo là mô tả chi tiết từng bảng dữ liệu thông qua Từ điển dữ liệu (Data Dictionary). Nội dung này bao gồm tên bảng, mục đích sử dụng, tên cột, kiểu dữ liệu, khóa chính, khóa ngoại và các ràng buộc quan trọng. Nếu phần này quá dài, có thể chuyển xuống phụ lục để báo cáo chính gọn và dễ theo dõi hơn.

`[Chèn Bảng Data Dictionary chi tiết tại đây hoặc chuyển xuống Phụ lục B]`

## 3.8. Nhận xét

Nhìn chung, lược đồ dữ liệu của hệ thống LMS CSDLNC đủ rõ ràng để trình bày trong khuôn khổ môn Cơ sở dữ liệu. Tuy nhiên, khi đối chiếu giữa thiết kế dữ liệu và phần triển khai backend, vẫn có một số điểm chưa đồng bộ. Các điểm này nên được ghi nhận ở một mục riêng hoặc phụ lục nhận xét để tránh nhầm lẫn giữa thiết kế cơ sở dữ liệu và hiện trạng triển khai mã nguồn.
