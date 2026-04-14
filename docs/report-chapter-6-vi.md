# Chương 6. Sao lưu và phục hồi dữ liệu

## 6.1. Sự cần thiết của sao lưu và phục hồi

Sao lưu và phục hồi là nội dung quan trọng để đảm bảo an toàn dữ liệu người dùng, khóa học, kết quả học tập và dữ liệu hệ thống. Đối với một hệ thống LMS, dữ liệu không chỉ có giá trị quản trị mà còn gắn trực tiếp với quá trình học tập của người dùng. Nếu xảy ra sự cố làm mất dữ liệu, hệ thống có thể mất lịch sử ghi danh, tiến độ học tập, tài liệu hoặc kết quả làm bài.

Vì vậy, trong khuôn khổ môn học, việc trình bày một quy trình sao lưu và phục hồi cơ bản là cần thiết để cho thấy cơ sở dữ liệu không chỉ được thiết kế để lưu trữ, mà còn cần được chuẩn bị cho các tình huống rủi ro trong quá trình vận hành.

## 6.2. Chiến lược sao lưu đề xuất

Trong phạm vi môn học, có thể sử dụng phương án sao lưu mức file bằng `mysqldump`. Đây là cách làm tương đối đơn giản, dễ minh họa và phù hợp với một hệ cơ sở dữ liệu MySQL triển khai trên một máy chủ hoặc một môi trường thử nghiệm.

Ưu điểm của phương án này là dễ thực hiện, dễ phục hồi và dễ lưu thành file để phục vụ minh chứng trong báo cáo. Tuy nhiên, báo cáo cũng cần nêu rõ rằng đây là giải pháp phù hợp với quy mô học tập và thử nghiệm, chưa phải chiến lược sao lưu toàn diện cho hệ thống lớn.

## 6.3. Lệnh backup

Sau khi đã có cơ sở dữ liệu hoàn chỉnh và dữ liệu mẫu ban đầu, có thể thực hiện sao lưu bằng lệnh sau:

```powershell
mysqldump -u root -p lms > lms_backup.sql
```

`[Chèn Hình 6.1. Lệnh backup và file backup tại đây]`

## 6.4. Lệnh restore

Trong trường hợp cần khôi phục dữ liệu, file sao lưu có thể được nạp trở lại vào một cơ sở dữ liệu khác bằng lệnh sau:

```powershell
mysql -u root -p lms_restore < lms_backup.sql
```

`[Chèn Hình 6.2. Lệnh restore và kết quả tại đây]`

## 6.5. Ghi chú minh chứng

Trong quá trình hoàn thiện báo cáo, phần sao lưu và phục hồi nên đi kèm ảnh minh họa hoặc kết quả thực thi thực tế để tăng tính thuyết phục. Nếu tại thời điểm viết báo cáo chưa có đủ môi trường để chạy lệnh MySQL, cần nêu rõ đây là quy trình đề xuất có thể áp dụng trên MySQL và sẽ được bổ sung minh chứng khi có điều kiện triển khai thực tế.

## 6.6. Kết luận

Phương án sao lưu bằng file SQL là cách tiếp cận phù hợp trong phạm vi đề tài môn học vì dễ trình bày, dễ thử nghiệm và đủ để minh họa quy trình phục hồi dữ liệu cơ bản. Dù chưa phải giải pháp sao lưu chuyên sâu cho hệ thống lớn, nội dung này vẫn cho thấy cơ sở dữ liệu của hệ thống đã được xem xét dưới góc độ vận hành và an toàn dữ liệu.
