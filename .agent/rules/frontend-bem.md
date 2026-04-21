# Frontend Naming Convention & Guidelines

Để tránh xung đột CSS (CSS Collision) trong React khi sử dụng các file `.css` dạng Global, project bắt buộc tuân thủ phương pháp đặt tên **BEM (Block Element Modifier)**.

## 1. Cấu trúc đặt tên
Cú pháp chuẩn: `.block__element--modifier`

- **Block**: Tên của Component (ví dụ: `stats-section`). Nên đặt trùng với tên file hoặc tên Component ở dạng kebab-case. Một file CSS nên bắt đầu bằng 1 Block chính.
- **Element**: Thành phần con bên trong Block, cách nhau bởi `__` (ví dụ: `stats-section__container`).
- **Modifier**: Biến thể hoặc trạng thái của Block/Element, cách nhau bởi `--` (ví dụ: `stats-section__item--active` hoặc `stats-section--dark`).

## 2. Quy tắc áp dụng cho dự án
1. **Không sử dụng class ngắn, chung chung**: Thay vì `.container`, `.wrapper`, `.title`, hãy dùng `.stats-section__container`, `.stats-section__wrapper`, `.stats-section__title`.
2. **Tính đóng gói**: Mọi class trong một file CSS cụ thể phải bắt đầu bằng tiền tố cùng tên với Component/Block (ví dụ file `StatsSection.css` thì tất cả class bắt đầu bằng `stats-section`).
3. **Phân cấp**: Không lồng các Element quá sâu (ví dụ: tránh `.block__element1__element2`, chỉ nên dùng `.block__element2` hoặc tách thành block mới nếu cần).
4. **Viết bằng kebab-case**: Các từ trong block, element, modifier luôn được nối với nhau bằng dấu gạch ngang (ví dụ: `.my-component__sub-title--is-active`).

## 3. Ví dụ mẫu

### CSS (`StatsSection.css`)
```css
.stats-section {
  display: flex;
}
.stats-section__glass-bar {
  background: rgba(255, 255, 255, 0.1);
}
.stats-section__item {
  padding: 1rem;
}
.stats-section__icon {
  width: 24px;
}
.stats-section__icon--highlight {
  color: gold;
}
```

### React (`StatsSection.js`)
```jsx
<section className="stats-section">
  <div className="stats-section__glass-bar">
    <div className="stats-section__item">
      <div className="stats-section__icon stats-section__icon--highlight">
        <Icon />
      </div>
    </div>
  </div>
</section>
```

> **IMPORTANT:**
> Khi AI Agent (Antigravity) làm việc với các file CSS và component của React trong project này, PHẢI LUÔN đọc và áp dụng rule BEM này để refactor hoặc viết mới class, đảm bảo tuyệt đối không có conflict global CSS.
