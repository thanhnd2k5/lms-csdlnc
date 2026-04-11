# Huong Dan Viet Phan Sharding

Tai lieu nay dung cho chuong ky thuat nang cao. Day la phan khong bat buoc, nen muc tieu la viet dung chat hoc thuat, ngan gon va co tinh de xuat.

## 1. Nen viet theo huong nao

Khong nen khang dinh du an da trien khai sharding thuc te neu chua co minh chung.

Nen viet theo cong thuc:

- trinh bay khai niem
- muc tieu cua sharding
- khao sat kha nang ap dung vao LMS
- de xuat mo hinh phan manh phu hop
- neu ro uu, nhuoc diem

## 2. Noi dung de xuat dua vao bao cao

### 2.1. Khai niem

Sharding la ky thuat phan tach du lieu tren nhieu node hoac nhieu co so du lieu khac nhau, moi node chi luu tru mot phan tap du lieu, nham giam tai va tang kha nang mo rong ngang.

### 2.2. Ly do can xem xet

He thong LMS co the phat sinh du lieu lon theo thoi gian:

- nhieu hoc vien
- nhieu khoa hoc
- lich su lam quiz tang nhanh
- du lieu tien do hoc tap tang lien tuc

Trong truong hop quy mo lon, mot co so du lieu don le co the tro thanh diem nghen.

### 2.3. Huong sharding co the ap dung

Co the de xuat sharding theo:

- `user_id`
- `course_id`
- `teacher_id`

Trong de tai nay, huong hop ly nhat de phan tich ly thuyet la sharding theo `user_id` doi voi cac bang:

- `course_enrollments`
- `video_completion`
- `quiz_attempts`
- `quiz_answers`

Ly do:

- day la cac bang co toc do tang nhanh
- du lieu thuong duoc truy cap theo nguoi dung

### 2.4. Uu diem

- tang kha nang mo rong ngang
- giam tai tren mot server
- cai thien toc do xu ly khi du lieu lon

### 2.5. Han che

- tang do phuc tap khi join du lieu giua cac shard
- kho giao dich toan cuc
- kho backup va dong bo hon
- can middleware dinh tuyen truy van

### 2.6. Ket luan de xuat

Sharding phu hop khi he thong dat quy mo lon. Doi voi pham vi hien tai cua de tai, giai phap nay duoc xem la huong mo rong trong tuong lai, chua can thiet phai trien khai thuc te.

## 3. Mau doan van co the dua thang vao bao cao

"Trong giai doan hien tai, he thong duoc trien khai tren mo hinh co so du lieu tap trung. Tuy nhien, khi quy mo nguoi dung va du lieu hoc tap tang manh, ky thuat sharding co the duoc xem xet nhu mot giai phap mo rong ngang. Doi voi bai toan LMS, cac bang phat sinh giao dich lon nhu `quiz_attempts`, `quiz_answers`, `video_completion` va `course_enrollments` la nhom doi tuong phu hop de nghien cuu phan manh. Trong do, huong shard theo `user_id` duoc danh gia la hop ly hon ca vi no phu hop voi kieu truy van phat sinh theo hoc vien va giup phan bo tai du lieu tot hon." 
