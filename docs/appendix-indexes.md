# Phu Luc - Danh Sach Index va Muc Dich

Nguon doi chieu chinh: `backend/lms.sql`

## 1. Cac index co san trong schema

| Bang | Ten index | Cot | Muc dich |
|---|---|---|---|
| `users` | `idx_user_role` | `role` | Loc user theo vai tro |
| `courses` | `idx_course_public` | `is_public` | Tim kiem va hien thi khoa hoc cong khai |
| `chapters` | `idx_chapter_order` | `course_id, order_index` | Lay va sap xep chuong theo khoa hoc |
| `videos` | `idx_video_chapter` | `chapter_id` | Lay video theo chuong |
| `quizzes` | `idx_quiz_type` | `quiz_type` | Loc quiz theo pham vi gan |
| `quiz_attempts` | `idx_attempt_user_quiz` | `user_id, quiz_id` | Tra cuu ket qua bai lam theo hoc vien va quiz |
| `classes` | `idx_class_code` | `class_code` | Tim lop hoc theo ma lop |

## 2. Unique key co tac dung index

| Bang | Rang buoc | Y nghia |
|---|---|---|
| `users` | `username UNIQUE` | Tranh trung ten dang nhap |
| `users` | `email UNIQUE` | Tranh trung email |
| `classes` | `class_code UNIQUE` | Tranh trung ma lop |
| `course_enrollments` | `UNIQUE (user_id, course_id)` | Tranh dang ky khoa hoc trung |
| `video_completion` | `UNIQUE (user_id, video_id)` | Tranh danh dau hoan thanh trung |

## 3. Index de xuat bo sung

| Bang | Cot | Ly do |
|---|---|---|
| `courses` | `teacher_id` | Thuong xuyen join va loc theo giang vien |
| `videos` | `course_id` | Thuong xuyen lay video theo khoa hoc |
| `documents` | `course_id` | Thuong xuyen lay tai lieu theo khoa hoc |
| `course_enrollments` | `course_id` | Ho tro thong ke so hoc vien theo khoa hoc |
| `video_completion` | `video_id` | Ho tro thong ke tien do hoc tap |

## 4. Cach viet vao bao cao

Co the ket luan:

"Schema hien tai da co mot so chi muc co ban phuc vu cac truy van nghiep vu quan trong. Tuy nhien, de nang cao hieu nang khi du lieu tang len, he thong co the bo sung them mot so index tren cac cot join va cot loc thuong xuyen, dac biet trong cac bang giao dich va thong ke."
