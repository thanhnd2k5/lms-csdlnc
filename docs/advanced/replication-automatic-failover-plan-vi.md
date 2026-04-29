# Kế Hoạch Triển Khai Replication, Read/Write Split Và Automatic Failover

Tài liệu này dùng làm checklist triển khai kỹ thuật và cũng là khung nội dung để viết lại Chương 7 theo hướng đã triển khai thực tế.

## 1. Mục tiêu kỹ thuật

Phạm vi triển khai gồm ba lớp:

1. Replication `primary -> replica` chạy thật trong môi trường Docker.
2. Backend tách truy vấn đọc và ghi theo mô hình `read/write split`.
3. Hệ thống có cơ chế `automatic failover` ở mức thực nghiệm để chuyển vai trò ghi khi `primary` gặp sự cố.

Những gì không đặt làm mục tiêu chính trong vòng đầu:

- đa replica
- benchmark tải lớn
- monitoring/alerting hoàn chỉnh
- khôi phục tự động node cũ về replica

## 2. Kiến trúc đã chốt

Thành phần cần có:

- `mysql-primary`: tiếp nhận toàn bộ thao tác ghi
- `mysql-replica`: đồng bộ dữ liệu từ primary và phục vụ truy vấn đọc
- `backend`: ứng dụng Node.js
- `failover-manager`: tiến trình giám sát trạng thái DB và cập nhật vai trò active

Luồng hoạt động:

1. Backend đọc truy vấn từ replica, ghi truy vấn vào primary.
2. Primary ghi `binlog`, replica kéo và áp dụng log.
3. Failover manager kiểm tra sức khỏe primary theo chu kỳ.
4. Nếu primary lỗi liên tục vượt ngưỡng, manager promote replica thành primary mới.
5. Backend đọc trạng thái active writer và chuyển hướng ghi sang node mới.

## 3. Kế hoạch triển khai theo giai đoạn

### 3.1. Giai đoạn 1: Replication cơ bản

Việc cần làm:

- dựng `docker-compose.yml`
- cấu hình `server-id`, `log_bin`, `read_only`
- tạo `replication user`
- import `backend/lms.sql` vào primary
- thiết lập replica bám vào primary

Tiêu chí hoàn thành:

- `SHOW REPLICA STATUS` không báo lỗi
- dữ liệu tạo ở primary xuất hiện ở replica

Minh chứng cần chụp:

- danh sách container đang chạy
- `SHOW MASTER STATUS`
- `SHOW REPLICA STATUS`
- dữ liệu ở primary và replica

### 3.2. Giai đoạn 2: Read/Write Split

Việc cần làm:

- thay `backend/src/config/database.js` bằng lớp router
- tạo `writePool` và `readPool`
- mặc định:
  - `SELECT` đi replica
  - `INSERT`, `UPDATE`, `DELETE`, `DDL` đi primary
- cho phép `forcePrimary` với các truy vấn cần nhất quán ngay sau ghi

Tiêu chí hoàn thành:

- các API hiện tại vẫn hoạt động
- log thể hiện truy vấn đang đi `read` hoặc `write`
- các endpoint đọc không còn phụ thuộc trực tiếp vào primary

Minh chứng cần chụp:

- log backend khi gọi endpoint đọc
- log backend khi gọi endpoint ghi
- dữ liệu đọc được sau khi đồng bộ

### 3.3. Giai đoạn 3: Manual Failover

Việc cần làm:

- chuẩn bị script promote replica
- định nghĩa nơi lưu trạng thái `active primary`
- backend đọc active writer từ trạng thái này
- kiểm tra quy trình:
  - dừng primary
  - promote replica
  - backend đổi node ghi

Tiêu chí hoàn thành:

- hệ thống ghi được trở lại sau khi primary cũ dừng
- không còn gửi truy vấn ghi vào node cũ

### 3.4. Giai đoạn 4: Automatic Failover

Việc cần làm:

- viết `failover-manager`
- health check primary/replica theo chu kỳ
- chỉ failover sau nhiều lần lỗi liên tiếp
- promote replica tự động
- cập nhật trạng thái active writer
- ngăn failover lặp vô hạn

Tiêu chí hoàn thành:

- dừng container primary
- manager tự phát hiện lỗi
- replica được promote
- backend ghi tiếp được mà không cần sửa tay cấu hình

Trạng thái hiện tại:

- đã hoàn thành trong môi trường thực nghiệm
- log đã xác nhận quá trình phát hiện lỗi, promote replica và tiếp tục ghi dữ liệu

### 3.5. Giai đoạn 5: Ổn định hóa

Việc nên làm thêm:

- log rõ sự kiện failover
- bổ sung script reset môi trường
- viết kịch bản demo ổn định
- chốt bộ ảnh minh chứng cho báo cáo

Trạng thái hiện tại:

- đã có runbook trong `infra/mysql-replication/README-vi.md`
- vẫn nên bổ sung bộ ảnh minh chứng đẹp để chèn Word/PDF

## 4. Cây file hiện tại

```text
infra/
  mysql-replication/
    docker-compose.yml
    README-vi.md
    primary/
      conf.d/my.cnf
      init/01-create-replication-user.sql
    replica/
      conf.d/my.cnf
    scripts/
      init-replica.ps1
      promote-replica.ps1
      reset-demo.ps1
      show-status.ps1

backend/
  src/
    config/
      database.js
      dbRoleStore.js
      dbRouter.js
      dbHealth.js
    services/
      failoverManager.js

Lưu ý:

- hai file `conf.d/my.cnf` còn tồn tại trong repo nhưng không còn được mount vào container
- cấu hình MySQL hiện đang được truyền trực tiếp qua `docker-compose`
```

## 5. Kịch bản kiểm thử bắt buộc

### 5.1. Kiểm thử replication

1. Ghi dữ liệu mới ở primary.
2. Đọc dữ liệu tương ứng ở replica.
3. Xác nhận `Seconds_Behind_Source` ổn định nếu có.

### 5.2. Kiểm thử read/write split

1. Gọi endpoint đọc và kiểm tra log backend.
2. Gọi endpoint ghi và kiểm tra log backend.
3. Xác nhận dữ liệu mới được đọc ở replica sau khi đồng bộ.

### 5.3. Kiểm thử automatic failover

1. Khởi tạo trạng thái bình thường.
2. Dừng `mysql-primary`.
3. Theo dõi log `failover-manager`.
4. Xác nhận replica được promote.
5. Gọi lại endpoint ghi.

### 5.4. Kiểm thử sau failover

1. Kiểm tra endpoint đọc.
2. Kiểm tra endpoint ghi.
3. Xác nhận backend không còn trỏ sang primary cũ.

## 6. Kế hoạch sửa báo cáo

### 6.1. Chương 7

Sửa [report-chapter-7-vi.md](/D:/lms-csdlnc/docs/report-chapter-7-vi.md) theo cấu trúc:

1. Mục tiêu triển khai
2. Kiến trúc mô hình replication
3. Quy trình cấu hình primary-replica
4. Cơ chế read/write split trong backend
5. Cơ chế automatic failover
6. Kết quả kiểm thử
7. Đánh giá và hạn chế

### 6.2. Chương 8

Sửa [final-report-draft-vi.md](/D:/lms-csdlnc/docs/final-report-draft-vi.md) để:

- cập nhật kết quả đạt được
- bỏ mô tả “replication chưa triển khai thực tế”
- thêm hạn chế đúng với mô hình đã làm

### 6.3. Hình minh chứng cần có

- sơ đồ kiến trúc mô hình
- danh sách container
- trạng thái replication
- log read/write split
- log failover
- truy vấn kiểm chứng trước và sau failover

## 7. Nguyên tắc viết báo cáo

- viết là `đã triển khai thực nghiệm`
- không viết là `production-ready`
- không mô tả các tính năng chưa kiểm chứng
- giữ rõ ràng ranh giới giữa:
  - replication cơ bản
  - tách đọc/ghi
  - failover tự động

## 8. Thứ tự triển khai khuyến nghị

1. Dựng replication cơ bản.
2. Chứng minh replication chạy ổn.
3. Cấy read/write split vào backend.
4. Chạy manual failover.
5. Tự động hóa bằng failover manager.
6. Chụp minh chứng.
7. Viết lại Chương 7 và cập nhật Chương 8.
