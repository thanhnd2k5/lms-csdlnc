# Chương 6. Sao lưu và phục hồi dữ liệu

## 6.1. Sự cần thiết của sao lưu và phục hồi

Backup và restore là nội dung quan trọng để đảm bảo an toàn dữ liệu người dùng, khóa học, kết quả học tập và dữ liệu hệ thống.

## 6.2. Chiến lược sao lưu đề xuất

Trong phạm vi môn học, có thể sử dụng backup mức file bằng `mysqldump`.

## 6.3. Lệnh backup

```powershell
mysqldump -u root -p lms > lms_backup.sql
```

`[Chèn Hình 6.1. Lệnh backup và file backup tại đây]`

## 6.4. Lệnh restore

```powershell
mysql -u root -p lms_restore < lms_backup.sql
```

`[Chèn Hình 6.2. Lệnh restore và kết quả tại đây]`

## 6.5. Ghi chú minh chứng

Tình trạng minh chứng thực tế được ghi rõ trong:

- [evidence-status-vi.md](/D:/lms-csdlnc/docs/evidence-status-vi.md)

## 6.6. Kết luận

Chiến lược backup bằng file SQL là hợp lý trong phạm vi đề tài môn học, đồng thời dễ minh họa và dễ thực hiện khi có môi trường MySQL phù hợp.
