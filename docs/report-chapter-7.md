# Chuong 7. Ky thuat nang cao

## 7.1. Dat van de

Trong cac he thong thong tin hien dai, dac biet la cac he thong phuc vu so luong nguoi dung lon, viec chi xay dung mot co so du lieu quan he dung ve mat logic la chua du. Khi quy mo nguoi dung, luong truy cap va khoi luong du lieu tang len, he thong can duoc xem xet o muc do van hanh nang cao hon, bao gom:

- nang cao tinh san sang
- mo rong kha nang xu ly
- giam tai cho may chu co so du lieu chinh
- dam bao kha nang phuc hoi khi co su co

Trong pham vi de tai nay, hai ky thuat nang cao duoc xem xet la replication va sharding. Day la hai huong ky thuat thuong duoc de cap khi he thong can mo rong vuot qua gioi han cua mo hinh co so du lieu tap trung truyen thong.

## 7.2. Replication

### 7.2.1. Khai niem

Replication la co che sao chep du lieu tu mot may chu co so du lieu chinh sang mot hoac nhieu may chu phu. Qua trinh nay nham muc dich tao ra cac ban sao dong bo cua du lieu, tu do nang cao tinh san sang va ho tro phan bo tai truy van.

Trong mo hinh thong thuong:

- `Primary` chiu trach nhiem xu ly cac thao tac ghi
- `Replica` xu ly mot phan hoac toan bo thao tac doc

### 7.2.2. Loi ich cua replication

Viec ap dung replication mang lai mot so loi ich ro rang:

- Tang tinh san sang cua he thong khi may chu chinh gap su co.
- Ho tro du phong du lieu.
- Giam tai truy van doc tren may chu chinh.
- Phu hop voi cac chuc nang thong ke, bao cao va tra cuu du lieu.

### 7.2.3. Kha nang ap dung vao he thong LMS

Doi voi he thong LMS, replication co the duoc ap dung theo huong:

- May chu chinh tiep nhan cac thao tac ghi nhu dang ky khoa hoc, nop quiz, cap nhat tien do hoc tap.
- May chu phu phuc vu cac truy van doc nhu hien thi danh sach khoa hoc, thong ke hoc vien, tra cuu ket qua.

Huong ap dung nay phu hop voi dac thu cua he thong, trong do:

- thao tac doc thuong xuyen xay ra nhieu
- thao tac ghi co tinh chat tap trung hon

### 7.2.4. Han che

Ben canh loi ich, replication cung dat ra mot so van de:

- co do tre dong bo giua primary va replica
- can xu ly van de nhat quan du lieu
- tang do phuc tap trong van hanh va giam sat

Do vay, trong pham vi de tai mon hoc, replication duoc xem nhu mot huong phat trien trong tuong lai, chua phai mot thanh phan da duoc trien khai thuc te.

## 7.3. Sharding

### 7.3.1. Khai niem

Sharding la ky thuat phan tach du lieu thanh nhieu phan va phan bo tren nhieu may chu khac nhau. Moi shard chi chua mot tap con du lieu, tu do giup he thong mo rong theo chieu ngang thay vi phu thuoc vao mot may chu duy nhat.

### 7.3.2. Dong co ap dung sharding

Trong he thong LMS, mot so bang co the tang nhanh theo thoi gian, dac biet la:

- `course_enrollments`
- `video_completion`
- `quiz_attempts`
- `quiz_answers`

Day la cac bang phat sinh du lieu giao dich lien tuc tu qua trinh hoc tap cua nguoi dung. Neu so luong hoc vien tang lon, cac bang nay co the tro thanh diem nong ve dung luong va hieu nang.

### 7.3.3. Huong sharding co the de xuat

Ve mat ly thuyet, sharding co the thuc hien theo mot trong cac truong:

- `user_id`
- `course_id`
- `teacher_id`

Trong de tai nay, huong hop ly nhat de phan tich la sharding theo `user_id` doi voi cac bang giao dich cua hoc vien. Cach tiep can nay co uu diem:

- phu hop voi kieu truy van theo hoc vien
- phan bo tai du lieu tuong doi dong deu
- de tach nho cac bang co tan suat cap nhat cao

### 7.3.4. Han che cua sharding

So voi replication, sharding phuc tap hon ro ret:

- kho thuc hien join giua cac shard
- kho dam bao giao dich phan tan
- tang do phuc tap trong thiet ke va trien khai ung dung
- can co co che dinh tuyen truy van

Do do, sharding thuong chi phu hop khi he thong dat quy mo rat lon. Trong pham vi de tai mon hoc, noi dung nay nen duoc trinh bay o muc de xuat ly thuyet va kha nang ap dung trong tuong lai.

## 7.4. Danh gia kha nang ap dung vao de tai

Tu goc do hien trang du an, co the nhan xet:

- He thong hien tai phu hop voi mo hinh co so du lieu tap trung.
- Schema va truy van hien tai chua dat muc do phuc tap bat buoc phai dung replication hay sharding.
- Tuy nhien, viec phan tich cac ky thuat nay giup cho thay kha nang mo rong cua he thong neu quy mo nguoi dung tang manh trong tuong lai.

Vi vay, trong bao cao co the dua ra ket luan:

- replication la huong nang cap hop ly hon trong giai doan dau
- sharding la huong nang cap o quy mo lon hon va phuc tap hon

## 7.5. Ket luan

Ky thuat nang cao la noi dung bo sung nham mo rong tam nhin ve quan tri va phat trien co so du lieu. Trong he thong LMS CSDLNC, replication va sharding chua phai yeu cau bat buoc o giai doan hien tai, nhung la hai huong mo rong co gia tri ly thuyet va thuc tien. Viec dua cac noi dung nay vao bao cao giup de tai day du hon, dong thoi the hien nhan thuc ve kha nang phat trien he thong trong moi truong van hanh quy mo lon.
