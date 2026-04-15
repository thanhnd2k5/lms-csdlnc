# Chương 4. Khởi tạo và triển khai cơ sở dữ liệu

## 4.1. Mục tiêu khởi tạo cơ sở dữ liệu

Mục tiêu của giai đoạn khởi tạo cơ sở dữ liệu là xây dựng đầy đủ cấu trúc lưu trữ cho hệ thống LMS, bao gồm các bảng dữ liệu, khóa chính, khóa ngoại, ràng buộc toàn vẹn, chỉ mục cơ bản và dữ liệu mẫu ban đầu. Đây là bước cần thiết để hệ thống có thể lưu trữ thông tin người dùng, khóa học, nội dung học tập, bài kiểm tra, kết quả học tập và dữ liệu lớp học một cách nhất quán.

Trong phạm vi báo cáo, phần khởi tạo cơ sở dữ liệu không chỉ nhằm tạo được các bảng cần thiết, mà còn nhằm chứng minh rằng lược đồ dữ liệu đã được tổ chức theo một trình tự hợp lý, có thể triển khai, có thể mở rộng và có thể hoàn tác khi cần thiết.

## 4.2. Script tạo bảng

Trong đề tài này, file `backend/lms.sql` được sử dụng làm script lược đồ chính. Có thể hiểu đây là file SQL tổng hợp dùng để khởi tạo phiên bản hoàn chỉnh của cơ sở dữ liệu ở trạng thái cuối cùng. File này chứa toàn bộ các câu lệnh `CREATE TABLE`, định nghĩa khóa chính, khóa ngoại, chỉ mục và các ràng buộc cơ bản của hệ thống.

Nói cách khác, nếu người triển khai muốn tạo nhanh toàn bộ cơ sở dữ liệu của hệ thống LMS trong một lần, chỉ cần tạo cơ sở dữ liệu rỗng và chạy file `lms.sql`. Sau bước này, toàn bộ cấu trúc bảng cần thiết của hệ thống sẽ được hình thành.

Trong Chương 4, báo cáo chỉ cần trích dẫn một số đoạn lệnh SQL tiêu biểu để minh họa cách cài đặt lược đồ ở mức vật lý. Toàn bộ script chi tiết được trình bày ở phần phụ lục để thuận tiện tra cứu.

## 4.3. Mô tả các script khởi tạo

Để phần khởi tạo cơ sở dữ liệu được trình bày rõ ràng hơn, báo cáo sử dụng ba nhóm script với vai trò khác nhau:

- Nhóm thứ nhất là script lược đồ tổng thể `lms.sql`. Đây là script dùng để tạo toàn bộ cơ sở dữ liệu ở trạng thái đầy đủ nhất.
- Nhóm thứ hai là script `seed.sql`. Script này dùng để nạp dữ liệu mẫu ban đầu nhằm phục vụ kiểm thử, minh họa truy vấn và kiểm tra các quan hệ giữa các bảng.
- Nhóm thứ ba là bộ migration mô phỏng quá trình phát triển cơ sở dữ liệu theo từng phiên bản. Nhóm script này không thay thế `lms.sql`, mà được dùng để trình bày quá trình cơ sở dữ liệu được mở rộng dần theo nhu cầu nghiệp vụ.

Việc tách riêng ba nhóm script nêu trên giúp phần trình bày trong báo cáo rõ hơn về mặt học thuật: `lms.sql` đại diện cho lược đồ hoàn chỉnh, `seed.sql` đại diện cho dữ liệu mẫu, còn bộ migration thể hiện tư duy quản lý phiên bản và phát triển hệ thống theo từng giai đoạn.

## 4.4. Mô phỏng quá trình phát triển lược đồ theo migration

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

## 4.5. Quy trình khởi tạo cơ sở dữ liệu

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

## 4.6. Nhận xét

Nhìn chung, phần khởi tạo cơ sở dữ liệu của hệ thống tương đối rõ ràng và phù hợp để trình bày trong báo cáo môn học. Việc tồn tại đồng thời file `lms.sql` và bộ migration mô phỏng giúp báo cáo vừa bám sát trạng thái hiện có của hệ thống, vừa thể hiện được tư duy phát triển cơ sở dữ liệu theo phiên bản. Tuy nhiên, nếu triển khai ở quy mô thực tế lớn hơn, hệ thống vẫn nên tiếp tục hoàn thiện bộ migration và seed theo hướng chuẩn hóa hơn để phục vụ vận hành lâu dài.
