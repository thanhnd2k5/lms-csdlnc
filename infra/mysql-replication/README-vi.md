# Hướng Dẫn Chạy Replication, Failover Và Rejoin

Tài liệu này là runbook thao tác nhanh cho mô hình:

- `mysql-primary`
- `mysql-replica`
- backend kết nối theo hướng `read/write split`
- `failover-manager` đã được tích hợp trong backend để kiểm thử `automatic failover`

Mục tiêu của file này là giúp chạy lại môi trường, test replication, test failover, rejoin node cũ và chụp minh chứng mà không cần nhớ lại toàn bộ lệnh.

## 1. Khởi động môi trường

Từ thư mục:

```powershell
cd D:\lms-csdlnc\infra\mysql-replication
```

Khởi động:

```powershell
docker compose up -d
```

Nếu cần reset sạch hoàn toàn:

```powershell
docker compose down -v --remove-orphans
docker compose up -d
```

## 2. Kiểm tra cấu hình MySQL

Kiểm tra `primary`:

```powershell
docker exec -it lms-mysql-primary mysql -uroot -proot -e "SHOW VARIABLES LIKE 'server_id'; SHOW VARIABLES LIKE 'log_bin'; SHOW VARIABLES LIKE 'gtid_mode';"
```

Kết quả mong đợi:

- `server_id = 1`
- `log_bin = ON`
- `gtid_mode = ON`

Kiểm tra `replica`:

```powershell
docker exec -it lms-mysql-replica mysql -uroot -proot -e "SHOW VARIABLES LIKE 'server_id'; SHOW VARIABLES LIKE 'gtid_mode';"
```

Kết quả mong đợi:

- `server_id = 2`
- `gtid_mode = ON`

## 3. Nạp schema vào primary

```powershell
Get-Content D:\lms-csdlnc\backend\lms.sql | docker exec -i lms-mysql-primary mysql -uroot -proot lms
```

Kiểm tra bảng:

```powershell
docker exec -it lms-mysql-primary mysql -uroot -proot lms -e "SHOW TABLES;"
docker exec -it lms-mysql-replica mysql -uroot -proot lms -e "SHOW TABLES;"
```

## 4. Khởi tạo replication

```powershell
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\infra\mysql-replication\scripts\init-replica.ps1
```

Xem trạng thái:

```powershell
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\infra\mysql-replication\scripts\show-status.ps1
```

Kết quả mong đợi:

- `Replica_IO_Running: Yes`
- `Replica_SQL_Running: Yes`
- `Seconds_Behind_Source: 0` hoặc rất nhỏ

## 5. Test đồng bộ dữ liệu

### 5.1. Kiểm tra cấu trúc bảng `courses`

```powershell
docker exec -it lms-mysql-primary mysql -uroot -proot lms -e "DESCRIBE courses;"
```

### 5.2. Ghi dữ liệu ở primary

```powershell
docker exec -it lms-mysql-primary mysql -uroot -proot lms -e "INSERT INTO courses (title, description, is_public, level) VALUES ('Replication Demo', 'Test dong bo du lieu', 1, 'Beginner');"
```

### 5.3. Đọc dữ liệu ở replica

```powershell
docker exec -it lms-mysql-replica mysql -uroot -proot lms -e "SELECT id, title, level, is_public, created_at FROM courses WHERE title = 'Replication Demo';"
```

Nếu thấy bản ghi ở replica thì replication đã hoạt động đúng.

## 6. Kiểm tra replica ở chế độ chỉ đọc

Sau khi chạy `init-replica.ps1`, replica sẽ được bật `read_only`.

Thử ghi trực tiếp vào replica:

```powershell
docker exec -it lms-mysql-replica mysql -uroot -proot lms -e "INSERT INTO courses (title) VALUES ('Should Fail');"
```

Kết quả mong đợi:

- thao tác bị từ chối vì replica không cho ghi trực tiếp

## 7. Promote replica thủ công

Dùng khi cần kiểm thử failover bằng tay:

```powershell
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\infra\mysql-replication\scripts\promote-replica.ps1
```

Sau đó thử ghi vào replica:

```powershell
docker exec -it lms-mysql-replica mysql -uroot -proot lms -e "INSERT INTO courses (title, description, is_public, level) VALUES ('Promoted Replica Demo', 'Replica da duoc promote', 1, 'Advanced');"
```

## 8. Kịch bản test automatic failover

Kịch bản test chuẩn hiện tại là:

1. Khởi động `primary`, `replica`, backend.
2. Xác nhận backend đọc/ghi bình thường.
3. Bật preset backend cho MySQL replication:

```powershell
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\backend\use-env.ps1 -Mode mysql-replication
```

4. Restart backend và xác nhận log:

```text
Automatic failover manager is enabled
```

5. Dừng `primary`.
6. Theo dõi log `failover-manager`.
7. Xác nhận `replica` được promote.
8. Gọi lại API ghi từ backend.
9. Kiểm tra dữ liệu mới tồn tại trên node primary mới.

Kết quả mong đợi trong log:

- `Primary health check failed ...`
- `Automatic failover completed. New primary: 127.0.0.1:3308`
- sau đó backend vẫn ghi được với log `[DB:write] ...`

## 9. Rejoin primary cũ thành replica

Sau khi `automatic failover` hoàn tất, node `mysql-primary` cũ không tự động quay lại làm replica. Để đưa node này trở lại cụm ở vai trò replica, thực hiện theo hướng thủ công có kiểm soát.

### 9.1. Khởi động lại node primary cũ

```powershell
docker start lms-mysql-primary
```

Kiểm tra node đã sống lại:

```powershell
docker exec -it lms-mysql-primary mysql -uroot -proot -e "SELECT 1;"
```

### 9.2. Chạy script rejoin

```powershell
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\infra\mysql-replication\scripts\rejoin-old-primary.ps1
```

Script này sẽ:

- reset trạng thái replica cũ trên node `lms-mysql-primary`
- cấu hình node này bám theo primary mới tại `mysql-replica:3306`
- bật lại `read_only`
- hiển thị `SHOW REPLICA STATUS`

### 9.3. Kiểm tra kết quả

Kết quả mong đợi:

- `Replica_IO_Running: Yes`
- `Replica_SQL_Running: Yes`
- node `lms-mysql-primary` đã trở lại vai trò replica

### 9.4. Ghi chú kỹ thuật

- đây là quy trình `manual rejoin`, chưa phải `automatic failback`
- primary mới vẫn tiếp tục là `lms-mysql-replica`
- node cũ chỉ quay lại với vai trò replica để tránh ghi lệch dữ liệu

## 10. Minh chứng nên chụp cho báo cáo

- `docker ps`
- kết quả `SHOW REPLICA STATUS`
- `INSERT` ở primary
- `SELECT` ở replica
- lỗi ghi vào replica khi còn ở chế độ `read_only`
- kết quả promote replica
- log `Automatic failover completed`
- truy vấn ghi thành công sau khi primary cũ dừng
- kết quả `SHOW REPLICA STATUS` sau khi rejoin primary cũ

## 11. Lưu ý

- Cảnh báo `Using a password on the command line interface can be insecure` là bình thường trong môi trường lab.
- Không dùng file `conf.d` cũ để debug nữa vì cấu hình MySQL hiện được truyền qua `docker-compose`.
- Hai file `primary/conf.d/my.cnf` và `replica/conf.d/my.cnf` hiện chỉ còn giá trị tham chiếu lịch sử, không còn được mount vào container.
- Để chuyển nhanh backend giữa `TiDB` và `MySQL replication`, dùng:

```powershell
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\backend\use-env.ps1 -Mode tidb
```

hoặc:

```powershell
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\backend\use-env.ps1 -Mode mysql-replication
```

- Nếu thấy trạng thái lạ, hãy reset bằng:

```powershell
docker compose down -v --remove-orphans
docker compose up -d
```

- Nếu muốn quay lại TiDB để chạy app theo môi trường cũ:

```powershell
powershell -ExecutionPolicy Bypass -File D:\lms-csdlnc\backend\use-env.ps1 -Mode tidb
```

và restart backend.
