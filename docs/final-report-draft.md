# BAO CAO BAI TAP LON
## Ung dung su dung co so du lieu SQL cho he thong quan ly hoc tap truc tuyen LMS CSDLNC

## Chuong 1. Gioi thieu de tai

### 1.1. Ly do chon de tai

Trong xu the chuyen doi so hien nay, ung dung cong nghe thong tin vao giao duc va dao tao da tro thanh mot nhu cau cap thiet. Cac he thong quan ly hoc tap truc tuyen, thuong duoc goi la Learning Management System, dong vai tro quan trong trong viec to chuc, phan phoi va theo doi qua trinh hoc tap cua nguoi hoc. Thong qua cac he thong nay, giang vien co the xay dung noi dung giang day, hoc vien co the tiep can tai lieu hoc tap moi luc moi noi, trong khi nha quan ly co the theo doi va danh gia hieu qua dao tao dua tren cac du lieu cu the.

Tuy nhien, de mot he thong LMS co the van hanh hieu qua, nen tang du lieu cua no can duoc thiet ke khoa hoc, nhat quan va co kha nang mo rong. Du lieu trong he thong LMS khong don thuan la danh sach nguoi dung hay danh sach khoa hoc, ma con bao gom nhieu thanh phan co quan he chat che nhu chuong hoc, video bai giang, tai lieu, quiz, ket qua lam bai, lich su dang ky hoc va thong tin lop hoc. Neu co so du lieu duoc thiet ke khong hop ly, he thong se gap kho khan trong qua trinh truy van, cap nhat, bao tri va mo rong.

Xuat phat tu ly do tren, de tai "Ung dung su dung co so du lieu SQL cho he thong quan ly hoc tap truc tuyen LMS CSDLNC" duoc lua chon nham nghien cuu va phan tich mot bai toan gan voi thuc te, dong thoi van dam bao the hien ro cac kien thuc cot loi cua mon Co so du lieu, bao gom phan tich thuc the, xay dung luoc do quan he, chuan hoa, tao schema SQL, toi uu truy van va de xuat cac giai phap van hanh nhu sao luu, phuc hoi va mo rong he thong.

### 1.2. Muc tieu nghien cuu

De tai huong toi cac muc tieu chinh sau:

- Phan tich bai toan quan ly hoc tap truc tuyen tren moi truong web.
- Xac dinh cac thuc the du lieu, thuoc tinh, quan he va rang buoc can thiet cua he thong.
- Xay dung co so du lieu quan he su dung SQL phu hop voi bai toan.
- Danh gia muc do hop ly cua schema du lieu hien co trong du an LMS CSDLNC.
- Trinh bay cac noi dung lien quan den khoi tao, toi uu, backup va restore co so du lieu.
- De xuat mot so huong mo rong nang cao nhu replication va sharding o muc do ly thuyet.

### 1.3. Pham vi de tai

Ve mat pham vi, de tai duoc xay dung dua tren mot du an LMS full-stack da co cau truc frontend, backend va schema SQL. Tuy nhien, noi dung bao cao chu yeu tap trung vao thanh phan co so du lieu, cu the bao gom:

- phan tich yeu cau du lieu
- xac dinh thuc the, thuoc tinh va quan he
- xay dung luoc do logic va vat ly
- mo ta data dictionary
- phan tich chuan hoa
- danh gia index va hieu nang truy van
- de xuat backup, restore va mo rong co so du lieu

### 1.4. Phuong phap thuc hien

Bao cao duoc thuc hien theo cac buoc co ban sau:

1. Khao sat cau truc du an va file schema SQL.
2. Phan tich bai toan nghiep vu cua he thong LMS.
3. Xac dinh cac thuc the va quan he du lieu.
4. Doi chieu schema voi ma nguon backend de danh gia tinh phu hop.
5. Mo ta luoc do du lieu o hai muc logic va vat ly.
6. Phan tich cac rang buoc, index va truy van tieu bieu.
7. Xay dung noi dung backup, restore va cac huong mo rong nang cao.

### 1.5. Y nghia cua de tai

De tai co y nghia o hai khia canh.

Ve mat hoc thuat, de tai giup van dung cac kien thuc trong mon Co so du lieu vao mot bai toan cu the va co tinh thuc te cao. Cac noi dung nhu phan tich thuc the, luoc do quan he, chuan hoa, index hay backup khong duoc trinh bay mot cach ly thuyet don le, ma duoc gan truc tiep voi mot he thong ung dung cu the.

Ve mat ung dung, de tai cho thay tam quan trong cua viec thiet ke co so du lieu dung ngay tu dau doi voi cac he thong phan mem co nghiep vu phuc tap.

### 1.6. Cau truc bao cao

Noi dung bao cao duoc to chuc thanh cac chuong tu Chuong 1 den Chuong 8, bao quat tu gioi thieu de tai, mo ta bai toan, thiet ke co so du lieu, khoi tao, toi uu, backup, ky thuat nang cao cho den ket luan va huong phat trien.

## Chuong 2. Mo ta bai toan va chuc nang he thong

### 2.1. Bai toan nghiep vu

Trong boi canh chuyen doi so trong giao duc, nhu cau xay dung cac he thong ho tro day va hoc truc tuyen ngay cang tro nen pho bien. Cac nen tang hoc tap truc tuyen khong chi can dap ung viec phan phoi noi dung hoc tap, ma con phai ho tro qua trinh quan ly khoa hoc, theo doi tien do hoc tap, to chuc danh gia ket qua hoc tap va quan ly nguoi hoc theo tung lop hoc hoac nhom hoc tap cu the.

Tu yeu cau thuc tien do, de tai xay dung he thong LMS CSDLNC huong toi bai toan quan ly hoc tap truc tuyen tren nen tang web. He thong duoc thiet ke de phuc vu dong thoi nhieu doi tuong su dung khac nhau, bao gom quan tri vien, giang vien va hoc vien.

### 2.2. Doi tuong su dung he thong

He thong duoc xay dung voi ba nhom nguoi dung chinh:

- Quan tri vien
- Giang vien
- Hoc vien

Moi nhom nguoi dung co vai tro, quyen han va nhu cau khai thac du lieu rieng.

### 2.3. Chuc nang chinh cua he thong

Can cu vao ma nguon ung dung va schema SQL hien co, he thong bao gom cac nhom chuc nang chinh sau:

- Quan ly tai khoan va xac thuc
- Quan ly khoa hoc
- Quan ly chuong hoc va video
- Quan ly tai lieu hoc tap
- To chuc danh gia qua quiz
- Dang ky hoc va theo doi tien do
- Quan ly lop hoc

### 2.4. Kien truc tong quan cua ung dung

He thong duoc xay dung theo mo hinh client-server gom:

- Frontend su dung React
- Backend su dung Node.js va Express
- Co so du lieu su dung MySQL

### 2.5. Vai tro cua co so du lieu trong he thong

Co so du lieu la thanh phan trung tam giup he thong van hanh dung logic nghiep vu. Toan bo cac quan he giua nguoi dung, noi dung hoc tap, quiz, ket qua hoc tap va lop hoc deu duoc bieu dien thong qua cac bang va cac rang buoc tham chieu.

### 2.6. Ghi chu ve pham vi nghien cuu trong bao cao

Bao cao nay tap trung vao phan tich co so du lieu SQL cua he thong LMS CSDLNC. Phan frontend va backend chi dong vai tro minh hoa cho bai toan nghiep vu va tinh ung dung cua co so du lieu.

## Chuong 3. Phan tich va thiet ke co so du lieu

### 3.1. Yeu cau du lieu

Co so du lieu cua he thong can dap ung cac nhom yeu cau:

- Luu tru thong tin nguoi dung va phan quyen
- Luu tru cau truc noi dung hoc tap
- Luu tru tai lieu, quiz va ket qua hoc tap
- Luu tru ghi danh, tien do hoc tap va lop hoc
- Dam bao tinh toan ven tham chieu

### 3.2. Phan tich thuc the

Schema hien tai bao gom cac thuc the chinh:

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

Moi thuc the da duoc mo ta chi tiet trong [report-chapter-3.md](/D:/lms-csdlnc/docs/report-chapter-3.md) va Data Dictionary chi tiet o [data-dictionary-detailed.md](/D:/lms-csdlnc/docs/data-dictionary-detailed.md).

### 3.3. Quan he va rang buoc giua cac thuc the

He thong co cac quan he 1-n va n-n ro rang:

- `users` - `courses`
- `courses` - `chapters`
- `chapters` - `videos`
- `users` - `courses` qua `course_enrollments`
- `users` - `videos` qua `video_completion`
- `classes` - `courses` qua `class_courses`
- `classes` - `users` qua `class_students`

Schema su dung:

- primary key
- foreign key
- unique key
- enum
- not null

### 3.4. Xay dung luoc do logic

Ve mat logic, he thong duoc chia thanh cac cum du lieu:

- quan ly nguoi dung
- quan ly noi dung hoc tap
- quan ly danh gia
- quan ly tham gia hoc tap
- quan ly lop hoc

So do ERD de xuat duoc chuan bi trong:

- [erd-mermaid.md](/D:/lms-csdlnc/docs/erd-mermaid.md)

`[Chen Hinh 3.1. So do ERD tong the tai day]`

### 3.5. Xay dung luoc do vat ly

Ve mat vat ly, schema duoc cai dat tren MySQL voi:

- `INT AUTO_INCREMENT`
- `TIMESTAMP`
- `BOOLEAN`
- `ENUM`
- `InnoDB`
- `utf8mb4`

### 3.6. Chuan hoa luoc do

Schema hien tai dat muc chuan hoa tot, co the trinh bay la dat den muc 3NF o phan lon cac bang:

- du lieu lap duoc tach ra bang rieng
- quan he n-n duoc tach qua bang trung gian
- thong tin mo ta thuc the khong lap lai khong can thiet

### 3.7. Data Dictionary

Data Dictionary chi tiet duoc trinh bay trong file:

- [data-dictionary-detailed.md](/D:/lms-csdlnc/docs/data-dictionary-detailed.md)

`[Chen bang Data Dictionary chi tiet tai day hoac dua vao Phu luc B]`

### 3.8. Nhan xet

Schema hien tai cua he thong LMS CSDLNC la nen tang hop ly de phan tich trong mon Co so du lieu. Tuy nhien, qua trinh doi chieu voi backend cho thay mot so diem chua dong bo, duoc ghi chu trong:

- [schema-gap-notes.md](/D:/lms-csdlnc/docs/schema-gap-notes.md)

## Chuong 4. Khoi tao va trien khai co so du lieu

### 4.1. Muc tieu khoi tao co so du lieu

Muc tieu la tao day du bang, rang buoc, khoa, index va du lieu mau de phuc vu thu nghiem va minh hoa he thong.

### 4.2. Script tao bang

File `backend/lms.sql` dong vai tro la script schema chinh, tao toan bo bang va rang buoc theo thu tu phu hop.

### 4.3. Mo ta cac script khoi tao

He thong hien co:

- script schema: `lms.sql`

He thong nen bo sung:

- script seed du lieu ban dau
- script migration `up/down`

Bo script mau da duoc chuan bi trong:

- [migration_up.sql](/D:/lms-csdlnc/docs/sql/migration_up.sql)
- [migration_down.sql](/D:/lms-csdlnc/docs/sql/migration_down.sql)
- [seed.sql](/D:/lms-csdlnc/docs/sql/seed.sql)

### 4.4. Huong xay dung migration

Trong giai doan hien tai, `lms.sql` co the duoc xem nhu migration `up` tong hop. Bao cao co the de xuat tach rieng migration `up/down` de nang cao tinh chuyen nghiep trong trien khai.

### 4.5. De xuat script seed du lieu

Nen co:

- tai khoan admin
- tai khoan teacher
- tai khoan student
- du lieu khoa hoc
- du lieu quiz
- du lieu ghi danh
- du lieu lop hoc

### 4.6. Quy trinh khoi tao co so du lieu

1. Tao database `lms`
2. Chay `lms.sql`
3. Kiem tra danh sach bang
4. Nap du lieu seed
5. Kiem tra so luong ban ghi

### 4.7. Kiem thu sau khi khoi tao

Co the su dung:

```sql
SHOW TABLES;
DESCRIBE users;
SELECT COUNT(*) FROM courses;
```

`[Chen Hinh 4.1. Ket qua tao schema tai day]`

`[Chen Hinh 4.2. Ket qua nap du lieu seed tai day]`

### 4.8. Nhan xet

Schema hien tai de khoi tao va de trinh bay trong bao cao. Tuy nhien, he thong nen bo sung migration va seed tach rieng de phuc vu van hanh chuyen nghiep hon.

## Chuong 5. Toi uu va van hanh co so du lieu

### 5.1. Vai tro cua toi uu co so du lieu

Toi uu co so du lieu nham dam bao he thong co the truy van du lieu nhanh, nhat la khi so luong hoc vien, khoa hoc va du lieu hoc tap tang len.

### 5.2. Danh sach index trong schema

Schema hien co cac index:

- `idx_user_role`
- `idx_course_public`
- `idx_chapter_order`
- `idx_video_chapter`
- `idx_quiz_type`
- `idx_attempt_user_quiz`
- `idx_class_code`

Bang chi tiet va de xuat mo rong duoc tong hop trong:

- [appendix-indexes.md](/D:/lms-csdlnc/docs/appendix-indexes.md)

### 5.3. Cac rang buoc unique co tac dung toi uu

Ngoai index, schema con co:

- unique `username`
- unique `email`
- unique `class_code`
- unique `(user_id, course_id)`
- unique `(user_id, video_id)`

### 5.4. Cac truy van tieu bieu trong he thong

Bao cao co the minh hoa bang cac truy van:

- thong ke hoc vien theo khoa hoc
- tien do hoc tap cua hoc vien
- so cau hoi trong moi quiz
- tim lop theo ma lop

Toan bo truy van mau va lenh `EXPLAIN` da duoc chuan bi trong:

- [appendix-queries.md](/D:/lms-csdlnc/docs/appendix-queries.md)
- [explain_queries.sql](/D:/lms-csdlnc/docs/sql/explain_queries.sql)

### 5.5. Phan tich EXPLAIN

Co the dung `EXPLAIN` de minh chung cho viec toi uu truy van. Huong dan chi tiet duoc ghi trong:

- [backup-explain-guide.md](/D:/lms-csdlnc/docs/advanced/backup-explain-guide.md)

Tinh trang minh chung thuc te trong workspace hien tai duoc ghi ro trong:

- [evidence-status.md](/D:/lms-csdlnc/docs/evidence-status.md)

`[Chen Hinh 5.1. Ket qua EXPLAIN tai day]`

### 5.6. Nhan xet ve hieu nang schema hien tai

Schema da co nen tang toi uu co ban, nhung van co the bo sung them index tren cac cot join va cot loc nhu:

- `courses.teacher_id`
- `videos.course_id`
- `documents.course_id`
- `course_enrollments.course_id`

### 5.7. De xuat huong toi uu tiep theo

- bo sung index
- phan tich `EXPLAIN`
- toi uu truy van thong ke
- tach tai doc va tai ghi neu he thong mo rong

### 5.8. Ket luan

Schema hien tai da co mot so chi muc quan trong va co the tiep tuc duoc cai thien de phuc vu he thong o quy mo lon hon.

## Chuong 6. Sao luu va phuc hoi du lieu

### 6.1. Su can thiet cua sao luu va phuc hoi

Backup va restore la noi dung quan trong de dam bao an toan du lieu nguoi dung, khoa hoc, ket qua hoc tap va du lieu he thong.

### 6.2. Muc tieu cua chien luoc backup

- bao toan du lieu
- ho tro phuc hoi khi su co
- ho tro tai lap moi truong

### 6.3. Chien luoc sao luu de xuat

Trong pham vi mon hoc, co the su dung backup muc file bang `mysqldump`.

### 6.4. Quy trinh sao luu

```powershell
mysqldump -u root -p lms > lms_backup.sql
```

`[Chen Hinh 6.1. Lenh backup va file backup tai day]`

### 6.5. Quy trinh phuc hoi

```powershell
mysql -u root -p lms_restore < lms_backup.sql
```

`[Chen Hinh 6.2. Lenh restore va ket qua tai day]`

### 6.6. Danh gia chien luoc de xuat

Day la giai phap don gian, phu hop voi bai tap lon, de minh hoa va de thuc hien.

### 6.7. Lien he voi phan toi uu va van hanh

Backup va restore la mot phan cua qua trinh van hanh co so du lieu ben canh schema, index va truy van.

### 6.8. Ket luan

Chien luoc backup bang file SQL la hop ly trong pham vi de tai mon hoc.

## Chuong 7. Ky thuat nang cao

### 7.1. Dat van de

Khi he thong mo rong quy mo, co the can xem xet cac ky thuat nang cao nhu replication va sharding.

### 7.2. Replication

Replication la co che sao chep du lieu tu may chu chinh sang may chu phu de:

- tang tinh san sang
- giam tai truy van doc
- ho tro du phong

Trong he thong LMS, replication phu hop voi mo hinh:

- primary xu ly ghi
- replica xu ly doc va thong ke

### 7.3. Sharding

Sharding la ky thuat phan tach du lieu thanh nhieu phan tren nhieu may chu.

Trong he thong LMS, cac bang co the xem xet sharding ve mat ly thuyet la:

- `course_enrollments`
- `video_completion`
- `quiz_attempts`
- `quiz_answers`

Huong shard co the de xuat la theo `user_id`.

### 7.4. Danh gia kha nang ap dung vao de tai

Trong giai doan hien tai:

- replication la huong nang cap thuc te hon
- sharding la huong nang cap cho quy mo lon hon

### 7.5. Ket luan

Hai ky thuat nay duoc dua vao bao cao nhu noi dung mo rong mang tinh dinh huong.

## Chuong 8. Ket luan va huong phat trien

### 8.1. Ket qua dat duoc

Bao cao da phan tich duoc:

- bai toan nghiep vu
- mo hinh du lieu
- luoc do logic va vat ly
- chuan hoa
- khoi tao CSDL
- toi uu
- backup/restore
- huong mo rong nang cao

### 8.2. Danh gia tong quat ve schema hien tai

Schema hien tai co cau truc hop ly, the hien day du cac nhom nghiep vu chinh cua he thong LMS. Nhung van con mot so diem chua dong bo voi backend code.

### 8.3. Han che cua de tai

- chua co migration tach rieng theo phien ban
- chua co seed chuan hoa trong repo
- chua co minh chung trien khai thuc te cho replication, sharding

### 8.4. Huong phat trien

- hoan thien tinh dong bo giua schema va code
- bo sung migration va seed
- bo sung minh chung `EXPLAIN`
- mo rong backup va replication

### 8.5. Ket luan chung

De tai da cho thay vai tro trung tam cua co so du lieu SQL trong viec xay dung he thong quan ly hoc tap truc tuyen. Schema hien tai cua LMS CSDLNC la nen tang phu hop de phan tich trong mon Co so du lieu va co kha nang tiep tuc hoan thien trong cac giai doan sau.

## Tai lieu ho tro trong repo

- De cuong: [report-outline.md](/D:/lms-csdlnc/docs/report-outline.md)
- Chuong 1: [report-chapter-1.md](/D:/lms-csdlnc/docs/report-chapter-1.md)
- Chuong 2: [report-chapter-2.md](/D:/lms-csdlnc/docs/report-chapter-2.md)
- Chuong 3: [report-chapter-3.md](/D:/lms-csdlnc/docs/report-chapter-3.md)
- Chuong 4: [report-chapter-4.md](/D:/lms-csdlnc/docs/report-chapter-4.md)
- Chuong 5: [report-chapter-5.md](/D:/lms-csdlnc/docs/report-chapter-5.md)
- Chuong 6: [report-chapter-6.md](/D:/lms-csdlnc/docs/report-chapter-6.md)
- Chuong 7: [report-chapter-7.md](/D:/lms-csdlnc/docs/report-chapter-7.md)
- Chuong 8: [report-chapter-8.md](/D:/lms-csdlnc/docs/report-chapter-8.md)
- Data Dictionary: [data-dictionary-detailed.md](/D:/lms-csdlnc/docs/data-dictionary-detailed.md)
- ERD: [erd-mermaid.md](/D:/lms-csdlnc/docs/erd-mermaid.md)
- Phu luc index: [appendix-indexes.md](/D:/lms-csdlnc/docs/appendix-indexes.md)
- Phu luc truy van: [appendix-queries.md](/D:/lms-csdlnc/docs/appendix-queries.md)
- Ghi chu sai lech schema-code: [schema-gap-notes.md](/D:/lms-csdlnc/docs/schema-gap-notes.md)
- Checklist anh: [image-checklist.md](/D:/lms-csdlnc/docs/image-checklist.md)
- Tinh trang minh chung: [evidence-status.md](/D:/lms-csdlnc/docs/evidence-status.md)
