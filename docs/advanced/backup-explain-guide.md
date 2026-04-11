# Huong Dan Lam Phan Backup, Restore va EXPLAIN

Tai lieu nay dung de anh co the tu tao minh chung sau.

## 1. Backup va restore

Neu dung MySQL local, co the dung `mysqldump`.

### Backup

```powershell
mysqldump -u root -p lms > lms_backup.sql
```

Noi dung can chup man hinh:

- lenh backup
- file `lms_backup.sql` da duoc tao

### Restore

```powershell
mysql -u root -p lms_restore < lms_backup.sql
```

Noi dung can chup man hinh:

- lenh restore
- ket qua cac bang xuat hien trong DB moi

## 2. EXPLAIN query

Nen chon 2-3 truy van tieu bieu:

- thong ke so hoc vien theo khoa hoc
- tra cuu tien do hoc vien
- tim kiem khoa hoc public

Mau:

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

Can chup:

- cau lenh truy van
- bang ket qua `EXPLAIN`

## 3. Cach viet nhan xet

Co the viet theo khuon:

- Truy van co su dung chi muc/khong su dung chi muc.
- So dong du kien duoc quet.
- Kha nang toi uu tiep theo la bo sung index cho cot join/cot loc.

## 4. Neu giang vien hoi "toi uu o dau"

Co the tra loi:

- toi uu o muc thiet ke schema
- toi uu bang chi muc
- toi uu bang giam du lieu lap qua bang lien ket
- toi uu bang phan tich `EXPLAIN` tren truy van tieu bieu
