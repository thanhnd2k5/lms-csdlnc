# So Do ERD De Xuat

Tai lieu nay cung cap so do ERD duoi dang Mermaid de chen vao bao cao hoac xuat thanh hinh.

## 1. ERD tong the

```mermaid
erDiagram
    users ||--o{ courses : teaches
    users ||--o{ quizzes : creates
    users ||--o{ documents : uploads
    users ||--o{ classes : manages

    courses ||--o{ chapters : contains
    courses ||--o{ videos : has
    courses ||--o{ quizzes : scopes
    courses ||--o{ documents : includes
    courses ||--o{ course_enrollments : enrolls
    courses ||--o{ class_courses : grouped_in

    chapters ||--o{ videos : organizes
    chapters ||--o{ quizzes : scopes
    chapters ||--o{ documents : includes

    videos ||--o{ quizzes : attaches
    videos ||--o{ documents : includes
    videos ||--o{ video_completion : tracked_by

    quizzes ||--o{ quiz_questions : has
    quizzes ||--o{ quiz_attempts : attempted_in

    quiz_questions ||--o{ quiz_options : offers
    quiz_questions ||--o{ quiz_answers : answered_by

    quiz_options ||--o{ quiz_answers : selected_as
    quiz_attempts ||--o{ quiz_answers : contains

    users ||--o{ course_enrollments : makes
    users ||--o{ video_completion : completes
    users ||--o{ quiz_attempts : performs
    users ||--o{ class_students : joins
    users ||--o{ class_students_courses_approval : reviewed_for

    classes ||--o{ class_courses : contains
    classes ||--o{ class_students : has
    classes ||--o{ class_students_courses_approval : controls
```

Caption goi y:

- `Hinh 3.1. So do ERD tong the cua he thong LMS CSDLNC`

## 2. ERD nhom Quiz

```mermaid
erDiagram
    quizzes ||--o{ quiz_questions : has
    quiz_questions ||--o{ quiz_options : offers
    quizzes ||--o{ quiz_attempts : attempted_in
    quiz_attempts ||--o{ quiz_answers : contains
    quiz_questions ||--o{ quiz_answers : answered_by
    quiz_options ||--o{ quiz_answers : selected_as
    users ||--o{ quiz_attempts : performs
```

Caption goi y:

- `Hinh 3.2. So do quan he du lieu cua phan danh gia va quiz`

## 3. ERD nhom Class va Enrollment

```mermaid
erDiagram
    users ||--o{ classes : manages
    classes ||--o{ class_courses : contains
    classes ||--o{ class_students : has
    classes ||--o{ class_students_courses_approval : controls
    courses ||--o{ class_courses : belongs_to
    users ||--o{ class_students : joins
    users ||--o{ class_students_courses_approval : reviewed_for
    courses ||--o{ course_enrollments : enrolls
    users ||--o{ course_enrollments : makes
    videos ||--o{ video_completion : tracked_by
    users ||--o{ video_completion : completes
```

Caption goi y:

- `Hinh 3.3. So do quan he du lieu cua nhom lop hoc, ghi danh va tien do hoc tap`

## 4. ERD nhom Noi dung hoc tap

```mermaid
erDiagram
    users ||--o{ courses : teaches
    courses ||--o{ chapters : contains
    courses ||--o{ videos : has
    chapters ||--o{ videos : organizes
    courses ||--o{ documents : includes
    chapters ||--o{ documents : includes
    videos ||--o{ documents : includes
```

Caption goi y:

- `Hinh 3.4. So do quan he du lieu cua nhom noi dung hoc tap`
