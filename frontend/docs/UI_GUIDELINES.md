# 🎨 LMS UI/UX Development Guidelines & Troubleshooting

Tài liệu này đúc kết các kinh nghiệm xử lý giao diện thực tế trong quá trình hiện đại hóa hệ thống LMS, đặc biệt tập trung vào việc tối ưu hóa thư viện **Ant Design**.

## 1. Nguyên tắc căn chỉnh Icon & Chữ (Vertical Alignment)

Đây là vấn đề phổ biến nhất khiến giao diện trông thiếu chuyên nghiệp (lệch trục, chữ bị đè).

### ✅ Cách làm chuẩn (Recommended)
Thay vì dùng prop `icon` của Ant Design, hãy tự bọc nội dung bằng một `Flex Wrapper`:

```jsx
// Không nên:
<Button icon={<PlusOutlined />}>Thêm mới</Button>

// Nên làm:
<Button>
  <div className="btn-content-wrapper">
    <PlusOutlined />
    <span>Thêm mới</span>
  </div>
</Button>
```

**CSS tương ứng:**
```css
.btn-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Khoảng cách hoàn hảo giữa icon và chữ */
  line-height: 1; /* Triệt tiêu khoảng trống thừa của font */
}
```

## 2. Xử lý "Lỗi 2 viền" (Double Borders)

Khi áp dụng CSS tùy chỉnh lên các Component phức tạp (Input, Select, TextArea), Ant Design thường bọc chúng trong nhiều lớp thẻ con, dẫn đến việc viền bị chồng nhau.

### 🛠 Cách sửa:
Target trực tiếp vào lớp bọc nội dung của Ant Design để xóa viền mặc định trước khi áp dụng viền tùy chỉnh:

```css
/* Fix lỗi 2 viền cho Input/TextArea trong Form */
.modern-form .ant-form-item-control-input-content > .ant-input-affix-wrapper {
  border: none !important;
  padding: 0 !important;
  box-shadow: none !important;
}
```

## 3. Tối ưu hóa Khu vực Upload (Thumbnail 16:9)

Mặc định `listType="picture-card"` của Ant Design luôn ép về hình vuông 102x102, gây vỡ bố cục khi làm Thumbnail video/khóa học.

### 🛠 Cách sửa:
Sử dụng một Container tùy chỉnh thay thế cho `picture-card`:

```jsx
<Upload showUploadList={false} ...>
  <div className="premium-upload-container">
    {imageUrl ? <img src={imageUrl} /> : <UploadPlaceholder />}
  </div>
</Upload>
```

**CSS tương ứng:**
```css
.premium-upload-container {
  width: 100%;
  aspect-ratio: 16 / 9; /* Ép tỷ lệ màn hình rộng chuyên nghiệp */
  border: 2px dashed #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
```

## 4. Cấu trúc Modal "Premium"

Để Modal không bị trống trải và chuyên nghiệp:
1. **Vị trí**: Đẩy Modal lên gần Top màn hình (`style={{ top: 40 }}`).
2. **Khoảng cách**: Giảm `padding-top` của Body và Header để nội dung cô đọng.
3. **Bố cục Form**: Luôn chia 2 cột (Thông tin văn bản | Hình ảnh) để tận dụng chiều ngang màn hình.

---
*Người viết: Antigravity AI Assistant*
