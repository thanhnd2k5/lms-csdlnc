# Data Dictionary Chi Tiet

Tai lieu nay mo ta chi tiet cac bang va cac cot trong schema `backend/lms.sql`.

## 1. Bang `users`

Muc dich: Luu thong tin tai khoan nguoi dung trong he thong.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma dinh danh duy nhat cua nguoi dung |
| `username` | `VARCHAR(50)` | `UNIQUE`, `NOT NULL` | Ten dang nhap cua nguoi dung |
| `email` | `VARCHAR(100)` | `UNIQUE`, `NOT NULL` | Dia chi email cua nguoi dung |
| `password` | `VARCHAR(255)` | `NOT NULL` | Mat khau da ma hoa |
| `full_name` | `VARCHAR(100)` | `DEFAULT NULL` | Ho va ten nguoi dung |
| `role` | `ENUM('admin','student','teacher')` | `DEFAULT 'student'` | Vai tro cua nguoi dung |
| `email_verified` | `BOOLEAN` | `DEFAULT FALSE` | Trang thai xac thuc email |
| `verification_token` | `VARCHAR(255)` | Nullable | Ma token phuc vu xac thuc email |
| `avatar` | `VARCHAR(255)` | `DEFAULT NULL` | Duong dan anh dai dien |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem tao tai khoan |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thoi diem cap nhat gan nhat |

## 2. Bang `courses`

Muc dich: Luu thong tin khoa hoc.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma khoa hoc |
| `title` | `VARCHAR(200)` | `NOT NULL` | Ten khoa hoc |
| `description` | `TEXT` | `DEFAULT NULL` | Mo ta khoa hoc |
| `thumbnail` | `VARCHAR(255)` | `DEFAULT NULL` | Anh dai dien khoa hoc |
| `is_public` | `BOOLEAN` | `DEFAULT FALSE` | Trang thai cong khai cua khoa hoc |
| `teacher_id` | `INT` | `FOREIGN KEY -> users(id)` | Giang vien phu trach khoa hoc |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem tao khoa hoc |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thoi diem cap nhat khoa hoc |

## 3. Bang `chapters`

Muc dich: Luu thong tin cac chuong trong khoa hoc.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma chuong |
| `course_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> courses(id)` | Ma khoa hoc ma chuong thuoc ve |
| `title` | `VARCHAR(255)` | `NOT NULL` | Ten chuong |
| `order_index` | `INT` | `DEFAULT 0` | Thu tu sap xep chuong trong khoa hoc |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem tao chuong |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thoi diem cap nhat chuong |

## 4. Bang `videos`

Muc dich: Luu bai giang video.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma video |
| `title` | `VARCHAR(200)` | `NOT NULL` | Tieu de video |
| `course_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> courses(id)` | Khoa hoc ma video thuoc ve |
| `chapter_id` | `INT` | `FOREIGN KEY -> chapters(id)` | Chuong ma video thuoc ve |
| `video_url` | `VARCHAR(255)` | `NOT NULL` | Duong dan video |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem tao video |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thoi diem cap nhat video |

## 5. Bang `quizzes`

Muc dich: Luu thong tin bai kiem tra trac nghiem.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma quiz |
| `title` | `VARCHAR(255)` | `NOT NULL` | Tieu de quiz |
| `course_id` | `INT` | `FOREIGN KEY -> courses(id)` | Khoa hoc lien quan |
| `chapter_id` | `INT` | `FOREIGN KEY -> chapters(id)` | Chuong lien quan |
| `video_id` | `INT` | `FOREIGN KEY -> videos(id)` | Video lien quan |
| `duration_minutes` | `INT` | `DEFAULT 30` | Thoi luong lam bai |
| `passing_score` | `INT` | `DEFAULT 60` | Diem dat toi thieu |
| `quiz_type` | `ENUM('video', 'chapter', 'course')` | `DEFAULT 'video'` | Loai quiz theo pham vi gan |
| `teacher_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Giang vien tao quiz |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem tao quiz |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thoi diem cap nhat quiz |

## 6. Bang `quiz_questions`

Muc dich: Luu cau hoi cua bai quiz.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma cau hoi |
| `quiz_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quizzes(id)` | Ma quiz ma cau hoi thuoc ve |
| `question_text` | `TEXT` | `NOT NULL` | Noi dung cau hoi |
| `points` | `INT` | `DEFAULT 1` | So diem cua cau hoi |
| `allows_multiple_correct` | `BOOLEAN` | `DEFAULT FALSE` | Cho phep nhieu dap an dung hay khong |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem tao cau hoi |

## 7. Bang `quiz_options`

Muc dich: Luu cac phuong an tra loi cua cau hoi.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma dap an |
| `question_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quiz_questions(id)` | Ma cau hoi tuong ung |
| `option_text` | `TEXT` | `NOT NULL` | Noi dung dap an |
| `is_correct` | `BOOLEAN` | `DEFAULT FALSE` | Xac dinh dap an dung hay sai |

## 8. Bang `quiz_attempts`

Muc dich: Luu thong tin lan lam bai quiz cua hoc vien.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma lan lam bai |
| `user_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Hoc vien thuc hien bai lam |
| `quiz_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quizzes(id)` | Quiz duoc thuc hien |
| `score` | `INT` | `NOT NULL` | Diem so cua bai lam |
| `status` | `ENUM('completed', 'failed')` | `NOT NULL` | Trang thai ket qua bai lam |
| `end_time` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem ket thuc bai lam |

## 9. Bang `quiz_answers`

Muc dich: Luu dap an ma hoc vien da chon trong moi lan lam bai.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma cau tra loi |
| `attempt_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quiz_attempts(id)` | Lan lam bai tuong ung |
| `question_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quiz_questions(id)` | Cau hoi tuong ung |
| `selected_option_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> quiz_options(id)` | Dap an duoc chon |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem ghi nhan cau tra loi |

## 10. Bang `course_enrollments`

Muc dich: Luu thong tin hoc vien dang ky khoa hoc.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma dang ky |
| `user_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Hoc vien dang ky |
| `course_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> courses(id)` | Khoa hoc duoc dang ky |
| `enrolled_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem dang ky |

Rang buoc bo sung:

- `UNIQUE KEY unique_enrollment (user_id, course_id)`

## 11. Bang `video_completion`

Muc dich: Luu tien do hoan thanh video cua hoc vien.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma ban ghi tien do |
| `user_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Hoc vien thuc hien |
| `video_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> videos(id)` | Video duoc danh dau |
| `is_completed` | `BOOLEAN` | `DEFAULT TRUE` | Trang thai hoan thanh |
| `completed_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem hoan thanh |

Rang buoc bo sung:

- `UNIQUE KEY unique_completion (user_id, video_id)`

## 12. Bang `documents`

Muc dich: Luu tai lieu hoc tap dinh kem.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma tai lieu |
| `title` | `VARCHAR(255)` | `NOT NULL` | Tieu de tai lieu |
| `file_path` | `VARCHAR(255)` | `NOT NULL` | Duong dan luu file |
| `file_type` | `VARCHAR(50)` | `NOT NULL` | Dinh dang file |
| `course_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> courses(id)` | Khoa hoc lien quan |
| `chapter_id` | `INT` | `FOREIGN KEY -> chapters(id)` | Chuong lien quan |
| `video_id` | `INT` | `FOREIGN KEY -> videos(id)` | Video lien quan |
| `teacher_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Giang vien tai len tai lieu |
| `uploaded_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem tai len |

## 13. Bang `classes`

Muc dich: Luu thong tin lop hoc.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Ma lop hoc |
| `name` | `VARCHAR(255)` | `NOT NULL` | Ten lop hoc |
| `teacher_id` | `INT` | `NOT NULL`, `FOREIGN KEY -> users(id)` | Giang vien quan ly lop |
| `class_code` | `VARCHAR(10)` | `UNIQUE`, `NOT NULL` | Ma lop de hoc vien tham gia |
| `password` | `VARCHAR(255)` | `DEFAULT NULL` | Mat khau lop hoc neu co |
| `requires_password` | `BOOLEAN` | `DEFAULT FALSE` | Xac dinh lop co yeu cau mat khau hay khong |
| `status` | `ENUM('active', 'inactive')` | `DEFAULT 'active'` | Trang thai hoat dong cua lop |
| `max_students` | `INT` | `DEFAULT 100` | So hoc vien toi da |
| `thumbnail` | `VARCHAR(255)` | `DEFAULT NULL` | Anh dai dien lop hoc |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem tao lop |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thoi diem cap nhat lop |

## 14. Bang `class_courses`

Muc dich: Lien ket lop hoc voi khoa hoc.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `class_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> classes(id)` | Ma lop hoc |
| `course_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> courses(id)` | Ma khoa hoc |
| `requires_approval` | `BOOLEAN` | `DEFAULT FALSE` | Xac dinh co can phe duyet hoc vien hay khong |
| `added_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem them khoa hoc vao lop |

## 15. Bang `class_students`

Muc dich: Lien ket lop hoc voi hoc vien.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `class_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> classes(id)` | Ma lop hoc |
| `student_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> users(id)` | Ma hoc vien |
| `status` | `ENUM('pending', 'active', 'blocked')` | `DEFAULT 'active'` | Trang thai tham gia lop |
| `joined_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thoi diem tham gia lop |

## 16. Bang `class_students_courses_approval`

Muc dich: Luu thong tin phe duyet hoc vien theo tung khoa hoc trong lop.

| Ten cot | Kieu du lieu | Rang buoc | Mo ta |
|---|---|---|---|
| `class_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> classes(id)` | Ma lop hoc |
| `student_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> users(id)` | Ma hoc vien |
| `course_id` | `INT` | `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY -> courses(id)` | Ma khoa hoc |
| `status` | `ENUM('pending', 'approved', 'rejected', 'blocked')` | `DEFAULT 'pending'` | Trang thai phe duyet |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Thoi diem cap nhat trang thai |
