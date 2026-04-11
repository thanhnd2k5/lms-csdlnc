# Chuong 4. Khoi tao va trien khai co so du lieu

## 4.1. Muc tieu khoi tao co so du lieu

Sau khi hoan thanh qua trinh phan tich va thiet ke, buoc tiep theo la chuyen luoc do du lieu thanh mot co so du lieu co the su dung trong thuc te. Doi voi de tai nay, muc tieu cua giai doan khoi tao co so du lieu bao gom:

- Tao day du cac bang theo schema da thiet ke.
- Thiet lap khoa chinh, khoa ngoai va cac rang buoc can thiet.
- Tao bo du lieu ban dau phuc vu viec thu nghiem va minh hoa ung dung.
- Tao co so cho cac thao tac truy van, thong ke, backup va toi uu sau nay.

Trong du an LMS CSDLNC, file `backend/lms.sql` dong vai tro la script khoi tao co so du lieu chinh.

## 4.2. Script tao bang

He thong su dung file SQL tong hop de tao toan bo schema. Noi dung script bao gom cac lenh:

- thiet lap `SQL_MODE`
- tam thoi tat kiem tra khoa ngoai
- tao tung bang theo thu tu phu hop
- khai bao khoa chinh
- khai bao khoa ngoai
- khai bao index va unique key
- mo lai che do kiem tra khoa ngoai

Thu tu tao bang trong file SQL duoc to chuc hop ly theo logic phu thuoc tham chieu:

1. `users`
2. `courses`
3. `chapters`
4. `videos`
5. `quizzes`
6. `quiz_questions`
7. `quiz_options`
8. `quiz_attempts`
9. `quiz_answers`
10. `course_enrollments`
11. `video_completion`
12. `documents`
13. `classes`
14. `class_courses`
15. `class_students`
16. `class_students_courses_approval`

Thu tu nay giup han che loi trong qua trinh tao khoa ngoai, do bang cha luon duoc tao truoc bang con.

## 4.3. Mo ta cac script khoi tao

Trong pham vi hien tai cua repo, co the phan tach logic khoi tao thanh hai nhom:

### 4.3.1. Script schema

Script schema la file `lms.sql`, co nhiem vu:

- tao cau truc bang
- dinh nghia kieu du lieu
- tao rang buoc toan ven
- tao index can thiet

Day la phan script quan trong nhat doi voi mon hoc Co so du lieu, vi no the hien truc tiep ket qua cua qua trinh phan tich va thiet ke.

### 4.3.2. Script du lieu ban dau

Trong repo hien tai chua thay mot file seed duoc tach rieng. Tuy nhien, ve mat hoc thuat va trien khai, he thong nen co script seed de phuc vu:

- tao mot so tai khoan mau
- tao mot so khoa hoc mau
- tao chuong hoc, video va quiz mau
- tao du lieu dang ky hoc de phuc vu thong ke

Viec tach rieng schema va seed la can thiet vi:

- de quan ly du lieu mau de dang hon
- de reset he thong nhanh khi test
- de phuc vu minh chung trong bao cao

## 4.4. Huong xay dung migration

Mặc du du an hien tai chua to chuc he thong migration theo framework chuyen biet, ve mat ky thuat co so du lieu van co the mo ta migration theo tu duy `up/down`.

### 4.4.1. Migration up

Migration `up` duoc hieu la tap lenh dung de:

- tao moi bang
- them cot
- them khoa ngoai
- them index

Trong de tai nay, file `lms.sql` co the duoc xem nhu mot migration `up` tong hop.

### 4.4.2. Migration down

Migration `down` duoc hieu la tap lenh hoan tac, vi du:

- xoa bang
- xoa cot
- xoa index

Neu trien khai day du hon, he thong nen co file migration `down` de:

- phuc hoi trang thai truoc khi thay doi schema
- de dang kiem thu cac phien ban CSDL
- ho tro bao tri va mo rong he thong

Vi du ly thuyet:

```sql
DROP TABLE IF EXISTS class_students_courses_approval;
DROP TABLE IF EXISTS class_students;
DROP TABLE IF EXISTS class_courses;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS video_completion;
DROP TABLE IF EXISTS course_enrollments;
DROP TABLE IF EXISTS quiz_answers;
DROP TABLE IF EXISTS quiz_attempts;
DROP TABLE IF EXISTS quiz_options;
DROP TABLE IF EXISTS quiz_questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;
```

Doan script tren can duoc thuc hien theo thu tu nguoc voi thu tu tao bang de tranh vi pham rang buoc tham chieu.

## 4.5. De xuat script seed du lieu

De phuc vu bao cao va thu nghiem, co the xay dung script seed gom cac nhom du lieu sau:

- 1 tai khoan admin
- 2 tai khoan teacher
- 3 den 5 tai khoan student
- 2 den 3 khoa hoc
- moi khoa hoc co 2 chuong
- moi chuong co 2 den 3 video
- moi khoa hoc co 1 den 2 quiz
- mot so ban ghi dang ky hoc
- mot so ban ghi tien do xem video
- 1 den 2 lop hoc mau

Bo du lieu nay du de:

- demo chuc nang he thong
- viet truy van thong ke
- kiem tra join giua cac bang
- chup anh minh hoa cho bao cao

## 4.6. Quy trinh khoi tao co so du lieu de trinh bay trong bao cao

Quy trinh khoi tao co so du lieu co the mo ta theo cac buoc sau:

1. Tao moi mot database, vi du `lms`.
2. Chon database vua tao.
3. Chay script `lms.sql` de tao toan bo schema.
4. Kiem tra danh sach bang sau khi import.
5. Chay script seed de bo sung du lieu ban dau.
6. Kiem tra so luong ban ghi tren mot so bang chinh.

Dang trinh bay hoc thuat co the viet:

"Qua trinh khoi tao co so du lieu duoc thuc hien theo huong tach biet giua cau truc schema va du lieu mau. Schema duoc tao tu file SQL tong hop, sau do du lieu khoi tao duoc nap vao he thong de phuc vu muc dich kiem thu va minh hoa. Cach to chuc nay giup qua trinh trien khai de dang lap lai, dong thoi tao thuan loi cho viec bao tri va mo rong ve sau."

## 4.7. Kiem thu sau khi khoi tao

Sau khi tao schema va nap du lieu mau, can thuc hien mot so buoc kiem tra co ban:

- kiem tra tat ca bang da duoc tao
- kiem tra khoa ngoai da duoc ap dung
- kiem tra unique key hoat dong dung
- kiem tra co the chen du lieu vao cac bang lien ket
- kiem tra cac truy van join co tra ve ket qua hop ly

Mot so truy van kiem thu co the su dung:

```sql
SHOW TABLES;
```

```sql
DESCRIBE users;
```

```sql
DESCRIBE courses;
```

```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM courses;
SELECT COUNT(*) FROM quizzes;
```

`[Chen hinh ket qua tao bang va seed du lieu tai day]`

## 4.8. Nhan xet

Co so du lieu cua he thong LMS CSDLNC co the duoc khoi tao tu mot script SQL tap trung va co cau truc ro rang. Day la mot uu diem trong pham vi de tai mon hoc, vi giup de dang trinh bay, kiem tra va danh gia schema. Tuy nhien, de nang cao tinh chuyen nghiep trong trien khai, he thong nen duoc bo sung them migration tach biet theo phien ban va script seed chuan hoa de ho tro reset du lieu va tai lap moi truong mot cach thuan tien.
