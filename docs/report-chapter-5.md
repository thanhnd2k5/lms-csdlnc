# Chuong 5. Toi uu va van hanh co so du lieu

## 5.1. Vai tro cua toi uu co so du lieu

Trong cac he thong quan ly hoc tap truc tuyen, so luong du lieu phat sinh co the tang nhanh theo thoi gian, bao gom du lieu khoa hoc, tai lieu, lich su dang ky hoc, lich su hoan thanh bai hoc va ket qua quiz. Vi vay, ben canh thiet ke dung va day du, co so du lieu con can duoc xem xet duoi goc do hieu nang truy van va kha nang van hanh o quy mo lon hon.

Noi dung toi uu trong de tai nay tap trung vao:

- danh sach chi muc da duoc tao
- muc dich cua tung chi muc
- cac truy van tieu bieu
- phan tich `EXPLAIN`
- mot so de xuat cai tien

## 5.2. Danh sach index trong schema

Can cu vao file `lms.sql`, schema hien tai da dinh nghia mot so index ro rang nhu sau:

### 5.2.1. Index tren bang `users`

- `idx_user_role (role)`

Muc dich:

- ho tro cac truy van loc user theo vai tro
- phuc vu quan ly nguoi dung theo nhom `admin`, `teacher`, `student`

### 5.2.2. Index tren bang `courses`

- `idx_course_public (is_public)`

Muc dich:

- ho tro cac truy van tim kiem va hien thi khoa hoc cong khai
- phuc vu module search va hien thi danh sach khoa hoc

### 5.2.3. Index tren bang `chapters`

- `idx_chapter_order (course_id, order_index)`

Muc dich:

- toi uu truy van lay danh sach chuong theo tung khoa hoc
- ho tro sap xep chuong theo thu tu trinh bay

### 5.2.4. Index tren bang `videos`

- `idx_video_chapter (chapter_id)`

Muc dich:

- toi uu truy van lay video theo chuong

### 5.2.5. Index tren bang `quizzes`

- `idx_quiz_type (quiz_type)`

Muc dich:

- ho tro loc quiz theo loai gan voi `video`, `chapter` hoac `course`

### 5.2.6. Index tren bang `quiz_attempts`

- `idx_attempt_user_quiz (user_id, quiz_id)`

Muc dich:

- toi uu truy van lay lich su lam quiz theo hoc vien va bai quiz
- phuc vu chuc nang xem ket qua bai lam

### 5.2.7. Index tren bang `classes`

- `idx_class_code (class_code)`

Muc dich:

- toi uu thao tac tim lop theo ma lop
- phuc vu chuc nang hoc vien tham gia lop hoc

## 5.3. Cac rang buoc unique co tac dung toi uu

Ngoai cac index khai bao ro rang, schema con co mot so unique key va khoa chinh cung ho tro truy van:

- `users.username`
- `users.email`
- `classes.class_code`
- `course_enrollments(user_id, course_id)`
- `video_completion(user_id, video_id)`

Nhung rang buoc nay vua dam bao tinh toan ven, vua giup he thong truy cap nhanh cac thao tac tim kiem, kiem tra trung lap va join.

## 5.4. Cac truy van tieu bieu trong he thong

Duoi day la mot so truy van tieu bieu co y nghia nghiep vu va phu hop de phan tich toi uu.

### 5.4.1. Thong ke so hoc vien dang ky theo khoa hoc

```sql
SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title
ORDER BY total_students DESC;
```

Y nghia:

- phuc vu thong ke quy mo khoa hoc
- ho tro giang vien va quan tri vien theo doi muc do tham gia

### 5.4.2. Truy van tien do hoc tap cua hoc vien

```sql
SELECT
  u.full_name,
  c.title AS course_title,
  COUNT(DISTINCT v.id) AS total_videos,
  COUNT(DISTINCT vc.video_id) AS completed_videos
FROM users u
JOIN course_enrollments ce ON u.id = ce.user_id
JOIN courses c ON c.id = ce.course_id
LEFT JOIN videos v ON v.course_id = c.id
LEFT JOIN video_completion vc
  ON vc.video_id = v.id
 AND vc.user_id = u.id
WHERE u.role = 'student'
GROUP BY u.id, c.id, u.full_name, c.title;
```

Y nghia:

- phuc vu bao cao tien do hoc tap
- cho thay kha nang join giua cac bang nghiep vu

### 5.4.3. Liet ke quiz va so cau hoi

```sql
SELECT
  q.id,
  q.title,
  COUNT(qq.id) AS total_questions
FROM quizzes q
LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
GROUP BY q.id, q.title;
```

Y nghia:

- phuc vu thong ke bai kiem tra
- ho tro kiem tra cau truc quiz

### 5.4.4. Tim lop hoc theo ma lop

```sql
SELECT *
FROM classes
WHERE class_code = 'ABC123';
```

Y nghia:

- phuc vu chuc nang hoc vien tham gia lop
- la truy van huong diem cho index `idx_class_code`

## 5.5. Phan tich EXPLAIN

De minh chung cho viec toi uu truy van, can su dung lenh `EXPLAIN` truoc cac truy van tieu bieu.

Vi du:

```sql
EXPLAIN
SELECT
  c.id,
  c.title,
  COUNT(ce.user_id) AS total_students
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
GROUP BY c.id, c.title;
```

Khi phan tich ket qua `EXPLAIN`, can chu y:

- bang nao duoc truy cap truoc
- kieu truy cap (`ALL`, `ref`, `eq_ref`, ...)
- index nao duoc su dung
- so dong du kien phai quet

Neu truy van su dung index hop ly, he quan tri se giam duoc so luong dong phai doc, tu do cai thien hieu nang.

`[Chen hinh ket qua EXPLAIN tai day]`

## 5.6. Nhan xet ve hieu nang schema hien tai

Schema hien tai da co mot so diem tot ve hieu nang:

- co index tren mot so cot loc va cot sap xep quan trong
- bang lien ket duoc to chuc ro rang, han che lap du lieu
- unique key giup tang toc do kiem tra ton tai va chong trung lap

Tuy nhien, van con co the de xuat bo sung index o mot so vi tri:

- `courses.teacher_id`
- `videos.course_id`
- `documents.course_id`
- `course_enrollments.course_id`
- `video_completion.video_id`

Nhung de xuat tren co y nghia boi day la cac cot thuong xuyen xuat hien trong:

- dieu kien join
- dieu kien loc
- truy van thong ke

## 5.7. De xuat huong toi uu tiep theo

Ben canh viec bo sung chi muc, he thong co the duoc toi uu them theo cac huong sau:

- toi uu cau truc truy van join phuc tap
- tach truy van thong ke nang thanh view hoac materialized strategy trong tuong lai
- bo sung migration quan ly index theo phien ban
- ket hop replication de tach tai doc va tai ghi neu he thong mo rong

Trong pham vi mon hoc, viec phan tich index va su dung `EXPLAIN` da du de chung minh nhom da co xem xet den van de toi uu co so du lieu.

## 5.8. Ket luan

Toi uu co so du lieu trong de tai LMS CSDLNC duoc the hien qua viec su dung cac index phu hop voi truy van nghiep vu va qua viec thiet ke schema theo huong chuan hoa. Mặc du he thong chua trien khai nhieu ky thuat toi uu chuyen sau, schema hien tai da dat nen tang tot cho viec truy van va thong ke. Viec bo sung phan tich `EXPLAIN` va de xuat them index se giup bao cao hoan chinh hon ve mat hoc thuat.
