# Chuong 3. Phan tich va thiet ke co so du lieu

## 3.1. Yeu cau du lieu

Can cu vao bai toan quan ly hoc tap truc tuyen da neu o Chuong 2, co so du lieu cua he thong can dap ung cac nhom yeu cau du lieu sau:

- Luu tru thong tin nguoi dung va phan biet vai tro su dung.
- Luu tru cau truc noi dung hoc tap theo khoa hoc, chuong va video.
- Luu tru tai lieu hoc tap phuc vu tung don vi noi dung.
- Luu tru cau truc quiz va ket qua lam bai cua hoc vien.
- Luu tru thong tin dang ky hoc, tien do hoc tap va thong tin lop hoc.
- Dam bao rang cac moi quan he giua cac doi tuong nghiep vu duoc mo hinh hoa bang rang buoc tham chieu ro rang.

Tu nhung yeu cau tren, he thong duoc thiet ke theo mo hinh co so du lieu quan he gom nhieu bang lien ket voi nhau thong qua khoa chinh va khoa ngoai.

## 3.2. Phan tich thuc the

Trong schema hien tai, co the xac dinh cac thuc the chinh sau.

### 3.2.1. Thuc the User

Thuc the `users` dai dien cho nguoi dung trong he thong. Day la thuc the nen tang, boi vi moi hoat dong nghiep vu deu gan voi mot loai nguoi dung cu the.

Thuoc tinh chinh:

- `id`
- `username`
- `email`
- `password`
- `full_name`
- `role`
- `email_verified`
- `verification_token`
- `avatar`
- `created_at`
- `updated_at`

Rang buoc:

- `id` la khoa chinh
- `username` la duy nhat
- `email` la duy nhat
- `role` thuoc mien gia tri `admin`, `student`, `teacher`

Quan he:

- mot giang vien co the so huu nhieu khoa hoc
- mot giang vien co the tao nhieu quiz
- mot giang vien co the tao nhieu lop hoc
- mot hoc vien co the dang ky nhieu khoa hoc
- mot hoc vien co the tham gia nhieu lop hoc
- mot hoc vien co the co nhieu lan lam quiz

### 3.2.2. Thuc the Course

Thuc the `courses` luu thong tin khoa hoc. Day la don vi noi dung hoc tap co vai tro trung tam trong he thong.

Thuoc tinh chinh:

- `id`
- `title`
- `description`
- `thumbnail`
- `is_public`
- `teacher_id`
- `created_at`
- `updated_at`

Rang buoc:

- `id` la khoa chinh
- `teacher_id` la khoa ngoai tham chieu `users(id)`

Quan he:

- mot khoa hoc thuoc ve mot giang vien
- mot khoa hoc co nhieu chuong
- mot khoa hoc co nhieu video
- mot khoa hoc co nhieu quiz
- mot khoa hoc co nhieu tai lieu
- mot khoa hoc co nhieu hoc vien dang ky
- mot khoa hoc co the thuoc nhieu lop hoc

### 3.2.3. Thuc the Chapter

Thuc the `chapters` mo ta cac chuong trong mot khoa hoc.

Thuoc tinh:

- `id`
- `course_id`
- `title`
- `order_index`
- `created_at`
- `updated_at`

Quan he:

- mot chuong thuoc mot khoa hoc
- mot chuong co the chua nhieu video
- mot chuong co the co nhieu quiz
- mot chuong co the co nhieu tai lieu

### 3.2.4. Thuc the Video

Thuc the `videos` luu cac bai giang video.

Thuoc tinh:

- `id`
- `title`
- `course_id`
- `chapter_id`
- `video_url`
- `created_at`
- `updated_at`

Quan he:

- mot video thuoc mot khoa hoc
- mot video co the thuoc mot chuong
- mot video co the duoc gan quiz
- mot video co the gan tai lieu
- mot video co the duoc nhieu hoc vien hoan thanh

### 3.2.5. Thuc the Quiz

Thuc the `quizzes` mo ta bai kiem tra trong he thong.

Thuoc tinh:

- `id`
- `title`
- `course_id`
- `chapter_id`
- `video_id`
- `duration_minutes`
- `passing_score`
- `quiz_type`
- `teacher_id`
- `created_at`
- `updated_at`

Quan he:

- mot quiz do mot giang vien tao
- mot quiz co the gan voi khoa hoc, chuong hoc hoac video
- mot quiz co nhieu cau hoi
- mot quiz co nhieu lan lam bai

### 3.2.6. Thuc the Quiz Question

Thuc the `quiz_questions` luu noi dung cau hoi cua mot quiz.

Thuoc tinh:

- `id`
- `quiz_id`
- `question_text`
- `points`
- `allows_multiple_correct`
- `created_at`

Quan he:

- mot cau hoi thuoc mot quiz
- mot cau hoi co nhieu lua chon dap an

### 3.2.7. Thuc the Quiz Option

Thuc the `quiz_options` luu cac phuong an tra loi.

Thuoc tinh:

- `id`
- `question_id`
- `option_text`
- `is_correct`

Quan he:

- mot dap an thuoc mot cau hoi

### 3.2.8. Thuc the Quiz Attempt

Thuc the `quiz_attempts` luu ket qua lam quiz cua hoc vien.

Thuoc tinh:

- `id`
- `user_id`
- `quiz_id`
- `score`
- `status`
- `end_time`

Quan he:

- mot hoc vien co the co nhieu attempt
- mot quiz co the duoc lam nhieu lan boi nhieu hoc vien

### 3.2.9. Thuc the Quiz Answer

Thuc the `quiz_answers` luu lua chon dap an cua hoc vien trong moi lan lam bai.

Thuoc tinh:

- `id`
- `attempt_id`
- `question_id`
- `selected_option_id`
- `created_at`

Quan he:

- mot attempt co nhieu cau tra loi
- moi cau tra loi gan voi mot cau hoi va mot dap an cu the

### 3.2.10. Thuc the Course Enrollment

Thuc the `course_enrollments` luu thong tin dang ky khoa hoc cua hoc vien.

Thuoc tinh:

- `id`
- `user_id`
- `course_id`
- `enrolled_at`

Rang buoc:

- cap `(user_id, course_id)` la duy nhat

Quan he:

- day la bang lien ket n-n giua `users` va `courses`

### 3.2.11. Thuc the Video Completion

Thuc the `video_completion` luu thong tin video da hoan thanh.

Thuoc tinh:

- `id`
- `user_id`
- `video_id`
- `is_completed`
- `completed_at`

Rang buoc:

- cap `(user_id, video_id)` la duy nhat

Quan he:

- day la bang lien ket n-n giua hoc vien va video, co them thuoc tinh nghiep vu ve tien do

### 3.2.12. Thuc the Document

Thuc the `documents` luu tai lieu hoc tap.

Thuoc tinh:

- `id`
- `title`
- `file_path`
- `file_type`
- `course_id`
- `chapter_id`
- `video_id`
- `teacher_id`
- `uploaded_at`

Quan he:

- mot tai lieu thuoc mot khoa hoc
- tai lieu co the lien ket them voi chuong hoac video
- tai lieu do mot giang vien tai len

### 3.2.13. Thuc the Class

Thuc the `classes` dai dien cho lop hoc.

Thuoc tinh:

- `id`
- `name`
- `teacher_id`
- `class_code`
- `password`
- `requires_password`
- `status`
- `max_students`
- `thumbnail`
- `created_at`
- `updated_at`

Quan he:

- mot lop hoc thuoc mot giang vien
- mot lop hoc co nhieu hoc vien
- mot lop hoc co nhieu khoa hoc

### 3.2.14. Thuc the Class Course

Thuc the `class_courses` la bang lien ket giua lop hoc va khoa hoc.

Thuoc tinh:

- `class_id`
- `course_id`
- `requires_approval`
- `added_at`

Rang buoc:

- khoa chinh ghép `(class_id, course_id)`

### 3.2.15. Thuc the Class Student

Thuc the `class_students` la bang lien ket giua lop hoc va hoc vien.

Thuoc tinh:

- `class_id`
- `student_id`
- `status`
- `joined_at`

Rang buoc:

- khoa chinh ghép `(class_id, student_id)`

### 3.2.16. Thuc the Class Student Course Approval

Thuc the `class_students_courses_approval` duoc thiet ke de mo rong cho quy trinh phe duyet hoc vien theo tung khoa hoc trong lop.

Thuoc tinh:

- `class_id`
- `student_id`
- `course_id`
- `status`
- `updated_at`

Rang buoc:

- khoa chinh ghép `(class_id, student_id, course_id)`

## 3.3. Quan he va rang buoc giua cac thuc the

Tong hop lai, he thong bao gom cac kieu quan he chinh sau:

- Quan he 1-n:
  - `users` - `courses`
  - `courses` - `chapters`
  - `chapters` - `videos`
  - `quizzes` - `quiz_questions`
  - `quiz_questions` - `quiz_options`
  - `quizzes` - `quiz_attempts`

- Quan he n-n:
  - `users` - `courses` thong qua `course_enrollments`
  - `users` - `videos` thong qua `video_completion`
  - `classes` - `courses` thong qua `class_courses`
  - `classes` - `users` thong qua `class_students`

Ben canh do, schema con su dung cac rang buoc sau:

- `UNIQUE` de tranh trung lap tai khoan va dang ky hoc
- `ENUM` de gioi han mien gia tri
- `NOT NULL` de dam bao cac thuoc tinh bat buoc
- `ON DELETE CASCADE` va `ON DELETE SET NULL` de dam bao tinh toan ven tham chieu

## 3.4. Xay dung luoc do logic

Ve mat logic, he thong co the duoc nhom thanh cac cum du lieu lon nhu sau:

### Cum 1. Quan ly nguoi dung

- `users`

### Cum 2. Quan ly noi dung hoc tap

- `courses`
- `chapters`
- `videos`
- `documents`

### Cum 3. Quan ly danh gia

- `quizzes`
- `quiz_questions`
- `quiz_options`
- `quiz_attempts`
- `quiz_answers`

### Cum 4. Quan ly tham gia hoc tap

- `course_enrollments`
- `video_completion`

### Cum 5. Quan ly lop hoc

- `classes`
- `class_courses`
- `class_students`
- `class_students_courses_approval`

Luoc do logic the hien duoc dau vao, dau ra va cac moi quan he nghiep vu can thiet de van hanh he thong LMS.

`[Chen hinh so do ERD tong the tai day]`

## 3.5. Xay dung luoc do vat ly

Ve mat vat ly, co so du lieu duoc cai dat tren MySQL voi cac dac diem sau:

- Moi bang duoc dinh nghia bang `CREATE TABLE IF NOT EXISTS`
- Khoa chinh chu yeu dung `INT AUTO_INCREMENT`
- Cac khoa ngoai duoc khai bao ro rang
- Bo ma ky tu la `utf8mb4`, phu hop voi viec luu tru du lieu tieng Viet
- Engine su dung `InnoDB`, ho tro transaction va foreign key

Mot so dac diem vat ly quan trong:

- Su dung `TIMESTAMP` cho cac cot thoi gian
- Su dung `BOOLEAN` cho cac co trang thai don gian
- Su dung `ENUM` cho cac cot trang thai va phan quyen
- Su dung `INDEX` tren mot so cot phuc vu truy van thuong xuyen

Do du an hien tai da co file `lms.sql`, co the xem day la luoc do vat ly duoc trien khai truc tiep.

## 3.6. Chuan hoa luoc do

Qua phan tich schema hien tai, co the nhan thay co so du lieu duoc thiet ke theo huong chuan hoa tuong doi tot.

### 3.6.1. Dang chuan thu nhat

He thong dat dang chuan thu nhat vi:

- moi bang deu co khoa chinh
- cac cot deu chua gia tri nguyen to
- khong luu danh sach nhieu gia tri trong cung mot cot

Vi du:

- bang `quiz_questions` khong luu tat ca dap an trong mot cot duy nhat, ma tach sang bang `quiz_options`
- bang `courses` khong luu danh sach hoc vien, ma tach sang bang `course_enrollments`

### 3.6.2. Dang chuan thu hai

He thong co the xem la dat dang chuan thu hai do:

- cac bang co khoa chinh don hoac khoa chinh ghep
- cac thuoc tinh khong khoa phu thuoc day du vao khoa chinh

Vi du:

- trong bang `class_courses`, thuoc tinh `requires_approval` phu thuoc vao cap `(class_id, course_id)`
- trong bang `class_students`, thuoc tinh `status`, `joined_at` phu thuoc vao cap `(class_id, student_id)`

### 3.6.3. Dang chuan thu ba

Schema hien tai phan lon dat dang chuan thu ba vi:

- cac thuoc tinh mo ta thuc the duoc tach ve dung bang cua no
- han che tinh phu thuoc bac cau giua cac thuoc tinh khong khoa

Vi du:

- thong tin giang vien khong lap lai trong bang `courses`, ma thong qua khoa ngoai `teacher_id`
- thong tin cau hoi va dap an khong dua vao bang `quizzes`
- thong tin tien do hoc tap khong dua truc tiep vao bang `users` hoac `videos`, ma tach thanh bang `video_completion`

Do do, co the ket luan rang schema cua he thong duoc thiet ke theo huong chuan hoa tot, giup giam trung lap du lieu va tang tinh nhat quan trong qua trinh cap nhat.

## 3.7. Data Dictionary tom tat

Trong bao cao hoan chinh, Data Dictionary nen trinh bay duoi dang bang. O giai doan nay, co the tom tat nhu sau:

### Bang `users`

- Muc dich: luu thong tin tai khoan nguoi dung
- Khoa chinh: `id`
- Rang buoc quan trong: `username` unique, `email` unique, `role` enum

### Bang `courses`

- Muc dich: luu thong tin khoa hoc
- Khoa chinh: `id`
- Khoa ngoai: `teacher_id -> users.id`

### Bang `chapters`

- Muc dich: luu thong tin chuong hoc
- Khoa chinh: `id`
- Khoa ngoai: `course_id -> courses.id`

### Bang `videos`

- Muc dich: luu bai giang video
- Khoa chinh: `id`
- Khoa ngoai: `course_id`, `chapter_id`

### Bang `quizzes`

- Muc dich: luu bai kiem tra
- Khoa chinh: `id`
- Khoa ngoai: `course_id`, `chapter_id`, `video_id`, `teacher_id`

### Bang `quiz_questions`

- Muc dich: luu cau hoi cua quiz
- Khoa chinh: `id`
- Khoa ngoai: `quiz_id`

### Bang `quiz_options`

- Muc dich: luu dap an lua chon
- Khoa chinh: `id`
- Khoa ngoai: `question_id`

### Bang `quiz_attempts`

- Muc dich: luu ket qua lam quiz
- Khoa chinh: `id`
- Khoa ngoai: `user_id`, `quiz_id`

### Bang `quiz_answers`

- Muc dich: luu dap an da chon trong moi attempt
- Khoa chinh: `id`
- Khoa ngoai: `attempt_id`, `question_id`, `selected_option_id`

### Bang `course_enrollments`

- Muc dich: luu dang ky khoa hoc
- Khoa chinh: `id`
- Rang buoc dac biet: unique `(user_id, course_id)`

### Bang `video_completion`

- Muc dich: luu tien do hoan thanh video
- Khoa chinh: `id`
- Rang buoc dac biet: unique `(user_id, video_id)`

### Bang `documents`

- Muc dich: luu tai lieu hoc tap
- Khoa chinh: `id`
- Khoa ngoai: `course_id`, `chapter_id`, `video_id`, `teacher_id`

### Bang `classes`

- Muc dich: luu thong tin lop hoc
- Khoa chinh: `id`
- Khoa ngoai: `teacher_id`
- Rang buoc dac biet: `class_code` unique

### Bang `class_courses`

- Muc dich: lien ket lop hoc va khoa hoc
- Khoa chinh: `(class_id, course_id)`

### Bang `class_students`

- Muc dich: lien ket lop hoc va hoc vien
- Khoa chinh: `(class_id, student_id)`

### Bang `class_students_courses_approval`

- Muc dich: mo rong phe duyet hoc vien theo tung khoa hoc trong lop
- Khoa chinh: `(class_id, student_id, course_id)`

## 3.8. Nhan xet ve thiet ke co so du lieu

Co the danh gia schema hien tai cua he thong LMS CSDLNC la mot mo hinh quan he duoc xay dung kha day du va hop ly doi voi bai toan quan ly hoc tap truc tuyen. He thong da phan tach ro cac nhom du lieu ve nguoi dung, noi dung hoc tap, bai kiem tra, tien do hoc tap va lop hoc. Cac rang buoc khoa ngoai va khoa duy nhat duoc su dung hop ly, giup bao toan tinh nhat quan du lieu.

Ben canh nhung uu diem tren, qua trinh doi chieu voi ma nguon backend cho thay van con mot so diem chua dong bo giua schema va trien khai. Tuy nhien, cac sai lech nay chu yeu mang tinh ky thuat trien khai, khong anh huong den cau truc co ban cua mo hinh du lieu. Vi vay, schema hien tai van hoan toan co the duoc su dung lam nen tang chinh cho bao cao mon Co so du lieu.

`[Chen bang Data Dictionary chi tiet tai phu luc hoac chuong nay]`
