# Chuong 2. Mo ta bai toan va chuc nang he thong

## 2.1. Bai toan nghiep vu

Trong boi canh chuyen doi so trong giao duc, nhu cau xay dung cac he thong ho tro day va hoc truc tuyen ngay cang tro nen pho bien. Cac nen tang hoc tap truc tuyen khong chi can dap ung viec phan phoi noi dung hoc tap, ma con phai ho tro qua trinh quan ly khoa hoc, theo doi tien do hoc tap, to chuc danh gia ket qua hoc tap va quan ly nguoi hoc theo tung lop hoc hoac nhom hoc tap cu the.

Tu yeu cau thuc tien do, de tai xay dung he thong LMS CSDLNC huong toi bai toan quan ly hoc tap truc tuyen tren nen tang web. He thong duoc thiet ke de phuc vu dong thoi nhieu doi tuong su dung khac nhau, bao gom quan tri vien, giang vien va hoc vien. Moi nhom doi tuong co vai tro, quyen han va nhu cau khai thac du lieu rieng, tu do dat ra yeu cau phai xay dung mot co so du lieu quan he co cau truc hop ly, bao toan duoc tinh toan ven du lieu va ho tro mo rong trong qua trinh van hanh.

Ve mat nghiep vu, he thong can giai quyet cac bai toan chinh sau:

- Quan ly thong tin nguoi dung va phan quyen theo vai tro.
- Quan ly noi dung hoc tap theo cau truc khoa hoc, chuong va video.
- Quan ly tai lieu hoc tap gan voi khoa hoc, chuong hoc hoac video.
- To chuc cac bai kiem tra trac nghiem de danh gia ket qua hoc tap.
- Ghi nhan viec dang ky hoc, tien do hoan thanh video va ket qua lam bai.
- Quan ly lop hoc nham tap hop nhieu hoc vien va nhieu khoa hoc trong mot don vi to chuc hoc tap.

Co the thay rang bai toan cua de tai khong chi don thuan la luu tru danh sach khoa hoc, ma con bao gom cac moi quan he phuc hop giua nguoi dung, noi dung hoc tap, hoat dong hoc tap va ket qua hoc tap. Do do, viec phan tich va thiet ke co so du lieu giu vai tro trung tam trong toan bo he thong.

## 2.2. Doi tuong su dung he thong

He thong duoc xay dung voi ba nhom nguoi dung chinh:

### 2.2.1. Quan tri vien

Quan tri vien la doi tuong co quyen quan ly toan he thong. Nhom nay co the theo doi danh sach nguoi dung, quan ly du lieu o muc tong quan va can thiep vao qua trinh quan ly khoa hoc khi can thiet. Trong mo hinh du lieu, vai tro nay duoc bieu dien thong qua truong `role` trong bang `users` voi gia tri `admin`.

### 2.2.2. Giang vien

Giang vien la doi tuong tao lap va quan ly noi dung dao tao. Nguoi dung thuoc nhom nay co the tao khoa hoc, them chuong hoc, them video, tao quiz, theo doi tinh hinh dang ky va quan ly lop hoc. Trong schema, giang vien la chu so huu cua `courses`, `quizzes`, `documents` va `classes` thong qua cac khoa ngoai lien ket den bang `users`.

### 2.2.3. Hoc vien

Hoc vien la doi tuong tham gia hoc tap tren he thong. Hoc vien co the dang ky khoa hoc, tham gia lop hoc, xem video, lam quiz, cap nhat ho so ca nhan va theo doi qua trinh hoc tap cua minh. Trong co so du lieu, nhom nguoi dung nay tham gia vao cac bang lien ket nhu `course_enrollments`, `video_completion`, `quiz_attempts` va `class_students`.

## 2.3. Chuc nang chinh cua he thong

Can cu vao ma nguon ung dung va schema SQL hien co, he thong bao gom cac nhom chuc nang chinh sau.

### 2.3.1. Quan ly tai khoan va xac thuc

He thong cho phep nguoi dung dang ky tai khoan, dang nhap va xac thuc email. Moi tai khoan duoc luu trong bang `users` voi cac thong tin nhu ten dang nhap, email, mat khau da ma hoa, vai tro va trang thai xac thuc email.

Chuc nang nay dam bao moi nguoi dung khi tham gia he thong deu co danh tinh ro rang va duoc cap quyen phu hop voi vai tro cua minh.

### 2.3.2. Quan ly khoa hoc

He thong ho tro tao va quan ly khoa hoc thong qua bang `courses`. Moi khoa hoc co tieu de, mo ta, anh dai dien, trang thai cong khai va thong tin giang vien phu trach. Khoa hoc la thuc the trung tam cua he thong, tu do lien ket den chuong hoc, video, tai lieu, quiz va hoc vien dang ky.

### 2.3.3. Quan ly chuong hoc va video

Noi dung hoc tap duoc phan cap theo hai muc:

- Chuong hoc, duoc luu trong bang `chapters`
- Video bai giang, duoc luu trong bang `videos`

Moi khoa hoc co the gom nhieu chuong, moi chuong co the gom nhieu video. Cach to chuc nay giup cau truc noi dung duoc sap xep co he thong, de dang mo rong va phu hop voi mo hinh hoc tap truc tuyen.

### 2.3.4. Quan ly tai lieu hoc tap

He thong cho phep upload va quan ly tai lieu qua bang `documents`. Tai lieu co the duoc gan voi khoa hoc, chuong hoc hoac video tuy theo muc dich su dung. Chuc nang nay bo sung cho video bai giang, giup giang vien cung cap them hoc lieu cho nguoi hoc.

### 2.3.5. To chuc danh gia qua quiz

He thong ho tro to chuc danh gia ket qua hoc tap thong qua module quiz. Cau truc quiz duoc tach thanh nhieu bang chuyen biet:

- `quizzes`: thong tin bai quiz
- `quiz_questions`: cau hoi
- `quiz_options`: dap an lua chon
- `quiz_attempts`: lich su lam bai
- `quiz_answers`: dap an da chon

Thiet ke nay cho phep he thong luu tru duoc ca cau truc de thi va lich su thuc hien cua hoc vien, tu do ho tro thong ke va danh gia ket qua hoc tap.

### 2.3.6. Dang ky hoc va theo doi tien do

Hoc vien co the dang ky hoc mot khoa hoc thong qua bang `course_enrollments`. Sau khi dang ky, qua trinh hoc tap tiep tuc duoc ghi nhan thong qua bang `video_completion`, trong do luu thong tin video nao da duoc hoc vien hoan thanh.

Chuc nang nay la nen tang de he thong co the xay dung cac bao cao thong ke ve muc do tham gia va tien do hoc tap cua hoc vien.

### 2.3.7. Quan ly lop hoc

Diem mo rong quan trong cua he thong la chuc nang quan ly lop hoc. Thay vi chi quan ly khoa hoc don le, he thong con co bang `classes` de dai dien cho mot lop hoc do giang vien tao. Lop hoc co the chua nhieu khoa hoc thong qua bang `class_courses`, dong thoi chua nhieu hoc vien thong qua bang `class_students`.

Chuc nang nay giup he thong phu hop hon voi moi truong day hoc thuc te, noi mot giang vien co the quan ly mot nhom hoc vien cu the va phan bo nhieu khoa hoc cho nhom nay.

## 2.4. Kien truc tong quan cua ung dung

He thong duoc xay dung theo mo hinh client-server gom hai thanh phan chinh:

- Frontend su dung React de xay dung giao dien nguoi dung.
- Backend su dung Node.js va Express de cung cap API va xu ly nghiep vu.

Co so du lieu su dung mo hinh quan he tren MySQL. Backend dong vai tro trung gian giua giao dien va co so du lieu, thuc hien cac thao tac truy van, cap nhat va kiem tra rang buoc du lieu.

Xet tren goc do co so du lieu, mo hinh kien truc nay giup tach biet ro:

- tang giao dien
- tang xu ly nghiep vu
- tang du lieu

Su tach biet nay tao dieu kien thuan loi cho viec phan tich schema, kiem soat tinh toan ven va toi uu hoa he quan tri co so du lieu.

## 2.5. Vai tro cua co so du lieu trong he thong

Trong de tai nay, co so du lieu khong chi la noi luu tru thong tin, ma con la thanh phan trung tam giup he thong van hanh dung logic nghiep vu. Toan bo cac quan he giua nguoi dung, noi dung hoc tap, quiz, ket qua hoc tap va lop hoc deu duoc bieu dien thong qua cac bang va cac rang buoc tham chieu.

Mot so yeu cau quan trong ma co so du lieu can dap ung bao gom:

- Luu tru du lieu nhat quan va han che trung lap.
- Ho tro truy van thong ke phuc vu quan ly hoc tap.
- Dam bao moi lien ket giua cac thuc the duoc bieu dien ro rang.
- Ho tro mo rong du lieu khi so luong hoc vien, khoa hoc va ket qua hoc tap tang len.

Do vay, viec phan tich va thiet ke co so du lieu la noi dung cot loi cua de tai, dong thoi la co so de danh gia tinh hoan chinh cua he thong LMS.

## 2.6. Ghi chu ve pham vi nghien cuu trong bao cao

Bao cao nay tap trung vao phan tich co so du lieu SQL cua he thong LMS CSDLNC. Mặc du ung dung bao gom ca frontend va backend, phan mem duoc de cap trong bao cao chu yeu nham lam ro bai toan nghiep vu va minh hoa boi canh su dung co so du lieu.

Trong pham vi mon hoc, trong tam duoc dat vao:

- phan tich mo hinh du lieu
- xay dung luoc do quan he
- mo ta rang buoc va chuan hoa
- danh gia kha nang khoi tao, toi uu, sao luu va phuc hoi du lieu

Phan giao dien ung dung chi dong vai tro minh hoa cho kha nang van hanh cua he thong, khong phai noi dung phan tich chinh.
