# Chuong 6. Sao luu va phuc hoi du lieu

## 6.1. Su can thiet cua sao luu va phuc hoi

Trong moi he thong thong tin co su dung co so du lieu, sao luu va phuc hoi la mot noi dung quan trong nham dam bao tinh san sang va an toan du lieu. Doi voi he thong LMS, du lieu luu tru bao gom thong tin nguoi dung, khoa hoc, tien do hoc tap, bai quiz va ket qua hoc tap. Day deu la nhung du lieu co gia tri va can duoc bao ve truoc cac su co nhu:

- mat du lieu do loi he thong
- loi thao tac cua nguoi quan tri
- hu hong thiet bi luu tru
- loi trong qua trinh nang cap hoac thay doi schema

Do vay, viec xay dung chien luoc backup va restore la noi dung can thiet trong bao cao ky thuat cua he thong.

## 6.2. Muc tieu cua chien luoc backup

Chien luoc sao luu trong de tai huong toi cac muc tieu sau:

- Bao toan du lieu nghiep vu quan trong.
- Ho tro phuc hoi he thong khi co su co.
- Ho tro tai lap moi truong demo va nghien cuu.
- Ho tro kiem thu cac thay doi lien quan den schema va du lieu.

## 6.3. Chien luoc sao luu de xuat

Trong pham vi de tai mon hoc, co the de xuat chien luoc sao luu theo huong don gian va kha thi:

### 6.3.1. Sao luu toan bo co so du lieu theo dinh ky

Toan bo database duoc xuat ra file SQL bang cong cu `mysqldump`. Cach nay phu hop voi he thong co quy mo vua va nho, dong thoi de thuc hien trong moi truong hoc tap.

### 6.3.2. Sao luu truoc khi thay doi schema

Moi khi can:

- them bang
- sua cot
- thay doi khoa ngoai
- thu nghiem migration

can tao ban sao luu truoc do de dam bao co the quay lui khi xay ra loi.

### 6.3.3. Sao luu du lieu mau va schema tach biet

De phuc vu hoc tap va bao cao, nen luu tru rieng:

- file schema
- file seed
- file backup thuc te

Vie c tach biet nay giup de dang:

- tai lap moi truong
- doi chieu thay doi
- phuc hoi tung muc tieu cu the

## 6.4. Quy trinh sao luu

Neu he thong duoc trien khai tren MySQL thong thuong, quy trinh sao luu co the thuc hien nhu sau:

### Buoc 1. Xuat du lieu

```powershell
mysqldump -u root -p lms > lms_backup.sql
```

Lenh tren tao mot file `lms_backup.sql` chua toan bo schema va du lieu cua database `lms`.

### Buoc 2. Kiem tra file backup

Sau khi xuat, can kiem tra:

- file backup da duoc tao
- kich thuoc file hop ly
- noi dung file co chua lenh `CREATE TABLE` va `INSERT`

### Buoc 3. Luu tru file backup

File backup nen duoc luu:

- tai thu muc rieng
- co dat ten theo ngay gio
- neu can co the copy sang mot vi tri khac de du phong

## 6.5. Quy trinh phuc hoi

Khi can phuc hoi du lieu, co the thuc hien nhu sau:

### Buoc 1. Tao moi database dich

```sql
CREATE DATABASE lms_restore;
```

### Buoc 2. Nap file backup vao database moi

```powershell
mysql -u root -p lms_restore < lms_backup.sql
```

### Buoc 3. Kiem tra ket qua phuc hoi

Sau khi restore, can:

- kiem tra danh sach bang
- kiem tra so luong ban ghi
- kiem tra mot so truy van quan trong

Vi du:

```sql
SHOW TABLES;
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM courses;
SELECT COUNT(*) FROM quizzes;
```

`[Chen hinh backup va restore tai day]`

## 6.6. Danh gia chien luoc de xuat

Chien luoc sao luu va phuc hoi bang `mysqldump` co cac uu diem sau:

- de thuc hien
- phu hop voi quy mo de tai mon hoc
- khong yeu cau ha tang phuc tap
- de minh hoa trong bao cao

Tuy nhien, chien luoc nay cung co mot so han che:

- chua ho tro phuc hoi theo tung thoi diem tinh vi
- chua toi uu cho he thong co quy mo lon
- thoi gian backup va restore co the tang khi du lieu lon

Do do, trong pham vi de tai, day la giai phap hop ly va kha thi. Trong thuc te, neu he thong mo rong, co the can ket hop them replication, incremental backup hoac backup theo lich tu dong.

## 6.7. Lien he voi phan toi uu va van hanh

Backup va restore khong ton tai tach roi ma lien ket chat che voi van hanh co so du lieu. Mot co so du lieu duoc xem la van hanh tot khi:

- co schema hop ly
- co index phu hop
- co quy trinh backup on dinh
- co kha nang phuc hoi khi su co xay ra

Tu goc do nay, phan sao luu va phuc hoi la bo sung can thiet cho cac noi dung phan tich va toi uu o chuong truoc, giup bao cao co tinh day du hon ve mat quan tri co so du lieu.

## 6.8. Ket luan

He thong LMS CSDLNC can mot chien luoc sao luu va phuc hoi du lieu de dam bao an toan thong tin va kha nang khoi phuc khi xay ra su co. Trong pham vi de tai mon hoc, viec su dung cong cu backup muc file nhu `mysqldump` la phu hop, de thuc hien va de minh chung. Cach tiep can nay vua dap ung yeu cau hoc thuat, vua phu hop voi dieu kien trien khai cua de tai.
