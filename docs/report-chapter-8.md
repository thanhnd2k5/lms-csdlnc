# Chuong 8. Ket luan va huong phat trien

## 8.1. Ket qua dat duoc

Qua qua trinh nghien cuu va phan tich, de tai da xay dung duoc mot bo noi dung tuong doi day du cho viec danh gia co so du lieu SQL cua he thong quan ly hoc tap truc tuyen LMS CSDLNC. Cac ket qua chinh dat duoc bao gom:

- Phan tich duoc bai toan nghiep vu cua he thong LMS.
- Xac dinh duoc cac doi tuong du lieu trung tam gom nguoi dung, khoa hoc, chuong hoc, video, quiz, tai lieu, dang ky hoc va lop hoc.
- Trinh bay duoc cac quan he va rang buoc giua cac thuc the duoi dang mo hinh quan he.
- Mo ta duoc luoc do logic, luoc do vat ly va dinh huong chuan hoa schema.
- Danh gia duoc cac chi muc da co va cac truy van tieu bieu phuc vu nghiep vu.
- De xuat duoc quy trinh backup, restore va cac huong mo rong nang cao nhu replication, sharding.

Qua cac noi dung tren, co the thay rang co so du lieu cua he thong khong chi dap ung viec luu tru thong tin co ban, ma con co kha nang ho tro cac thao tac nghiep vu phuc tap nhu theo doi tien do hoc tap, quan ly bai kiem tra va quan ly lop hoc.

## 8.2. Danh gia tong quat ve schema hien tai

Schema hien tai cua he thong LMS CSDLNC co nhieu diem tich cuc:

- To chuc du lieu theo huong chuan hoa kha tot.
- Su dung hop ly khoa chinh, khoa ngoai, unique key va enum.
- The hien ro cac quan he 1-n va n-n.
- Co kha nang mo hinh hoa duoc ca noi dung hoc tap va hoat dong hoc tap.

Ben canh do, qua trinh doi chieu schema voi ma nguon backend cho thay van ton tai mot so diem chua dong bo, chu yeu lien quan den:

- ten cot
- mien gia tri enum
- tham so insert du lieu

Nhung van de nay mang tinh trien khai ky thuat, khong lam thay doi cau truc nen tang cua mo hinh du lieu. Vi vay, schema hien tai van hoan toan phu hop de lam nen tang cho bao cao mon Co so du lieu, dong thoi cung mo ra co hoi cai tien he thong trong cac giai doan tiep theo.

## 8.3. Han che cua de tai

Mặc du dat duoc mot so ket qua quan trong, de tai van con mot so han che:

- Chua to chuc day du he thong migration theo phien ban mot cach doc lap.
- Chua co bo script seed du lieu chuan hoa tach rieng trong repo.
- Chua co minh chung thuc nghiem thuc te cho replication hoac sharding.
- Phan danh gia hieu nang moi dung o muc index va truy van tieu bieu, chua co tai du lieu lon de benchmark sau.

Nhung han che nay la phu hop voi pham vi cua mot bai tap lon mon hoc, nhung dong thoi cung la co so de de xuat huong phat trien tiep theo.

## 8.4. Huong phat trien

Trong tuong lai, he thong co the duoc phat trien theo cac huong sau:

### 8.4.1. Hoan thien tinh dong bo giua schema va code

Can uu tien sua cac diem lech giua schema SQL va backend code de:

- dam bao he thong van hanh on dinh
- tranh loi khi thao tac insert, update, truy van
- nang cao tinh toan ven khi trien khai thuc te

### 8.4.2. Bo sung migration va seed chuyen nghiep

Can tach:

- script tao schema
- script thay doi schema theo phien ban
- script seed du lieu mau

Vie c nay se giup he thong de bao tri, de nang cap va de tai lap moi truong phat trien.

### 8.4.3. Bo sung minh chung toi uu hieu nang

Trong cac giai doan tiep theo, co the:

- bo sung them index cho cac cot join va cot loc thuong xuyen
- thu nghiem `EXPLAIN` tren tap du lieu lon hon
- do thoi gian truy van truoc va sau khi toi uu

### 8.4.4. Nang cao van hanh he thong

Neu he thong duoc dua vao moi truong co quy mo lon, co the can xem xet:

- replication de tach tai doc va tai ghi
- sharding cho cac bang giao dich lon
- co che backup tu dong theo lich

## 8.5. Ket luan chung

De tai "Ung dung su dung co so du lieu SQL cho he thong quan ly hoc tap truc tuyen LMS CSDLNC" da cho thay vai tro trung tam cua co so du lieu trong viec xay dung va van hanh mot he thong thong tin. Thong qua viec phan tich schema, chuan hoa du lieu, danh gia truy van va de xuat cac giai phap van hanh, bao cao da the hien duoc su ket hop giua ly thuyet co so du lieu va bai toan ung dung thuc te.

Tu ket qua nghien cuu co the khang dinh rang mot schema duoc thiet ke hop ly se tao nen nen tang vung chac cho toan bo he thong. Day cung chinh la gia tri cot loi ma de tai huong toi khi van dung SQL vao bai toan quan ly hoc tap truc tuyen.
