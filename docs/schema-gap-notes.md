# Schema-Code Gap Notes

Tai lieu nay dung de note cac diem lech giua schema SQL va backend code.

Muc dich:

- Giup bao cao van viet theo schema hien co.
- Tach rieng cac van de trien khai de tranh lam roi phan thiet ke CSDL.
- Lam danh sach sua code/schema sau nay.

## Danh gia chung

Schema hien tai du tot de lam bao cao mon Co so du lieu:

- Co day du bang thuc the va bang lien ket.
- Co khoa chinh, khoa ngoai, unique key, enum, timestamp.
- Co the hien duoc cac quan he 1-n va n-n ro rang.
- Co logic theo doi tien do hoc va quan ly lop hoc.

Van de hien tai nam o tinh dong bo voi code backend.

## Danh sach sai lech can note

### 1. Bang `classes`

Schema hien tai:

- khong co cot `description`

Code backend:

- `classController.createClass`
- `classController.updateClass`
- `classModel.createClass`
- `classModel.updateClass`

deu co xu ly `description`.

Huong sua de xuat:

- cach 1: bo `description` khoi code neu khong can
- cach 2: them cot `description TEXT NULL` vao bang `classes`

Khuyen nghi:

- neu muon bao cao dep hon va nghiep vu lop hoc day du hon, nen them `description`

### 2. Bang `class_students.status`

Schema hien tai:

- `ENUM('pending', 'active', 'blocked')`

Code backend:

- `classModel.removeStudentFromClass` update gia tri `inactive`

Van de:

- `inactive` khong nam trong enum

Huong sua de xuat:

- cach 1: doi code thanh `blocked` hoac xoa ban ghi
- cach 2: mo rong enum thanh `('pending', 'active', 'blocked', 'inactive')`

Khuyen nghi:

- nen them `inactive` neu muon luu lich su roi lop ma khong xoa ban ghi

### 3. Truong ten day du cua user

Schema hien tai:

- bang `users` dung cot `full_name`

Code backend:

- `classModel.getClassStudents` truy van `u.fullname`

Van de:

- sai ten cot, truy van se loi

Huong sua de xuat:

- sua `u.fullname` thanh `u.full_name`

### 4. Bang `documents.teacher_id`

Schema hien tai:

- `teacher_id INT NOT NULL`

Code model:

- `src/models/document.js` khi insert document khong truyen `teacher_id`

Van de:

- insert co the fail neu schema duoc ap dung dung nhu file SQL

Huong sua de xuat:

- bo sung `teacher_id` vao du lieu insert
- truyen tu user dang dang nhap

### 5. Bang `course_enrollments`

Schema hien tai:

- cot lien ket user la `user_id`

Code backend:

- `lms.isStudentEnrolled` truy van `student_id`

Van de:

- sai ten cot

Huong sua de xuat:

- sua thanh `user_id`

### 6. Cau hinh SSL DB

Schema khong van de, nhung code `database.js` dang bat:

- `ssl.minVersion = TLSv1.2`
- `rejectUnauthorized = true`

Tac dong:

- phu hop voi cloud database
- co the gay loi khi chay MySQL local thong thuong

Huong xu ly:

- dua SSL thanh tuy chon theo bien moi truong

## Cach viet vao bao cao

Khong dua cac loi nay vao phan "thiet ke CSDL" chinh.

Nen dua vao mot muc rieng:

- "Nhan xet ve muc do dong bo giua schema va ung dung"

Noi dung nen viet:

- Thiet ke schema da tuong doi day du va hop ly.
- Tuy nhien, qua trinh doi chieu voi ma nguon backend cho thay mot so diem chua dong bo ve ten cot, mien gia tri va tham so insert.
- Cac sai lech nay khong lam thay doi ban chat cua mo hinh du lieu, nhung anh huong den tinh toan ven khi trien khai he thong.
