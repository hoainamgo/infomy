# 🎨 Hướng dẫn Phát triển UI/UX dành cho Theme Mới

Chào mừng bạn đến với giai đoạn sáng tạo! Sau khi đã có bộ Core Logic xử lý dữ liệu, nhiệm vụ của bạn bây giờ là "vẽ" nên một giao diện tuyệt vời. Dưới đây là các kỹ thuật UI/UX chuyên sâu dành cho hệ thống Headless Blogger này.

---

## 1. Tư duy Thiết kế theo Thành phần (Component-based)
Đừng viết một trang HTML khổng lồ. Hãy chia giao diện thành các hàm render nhỏ trong JavaScript:

```javascript
// Ví dụ: Render một Badge trạng thái
function renderBadge(type, text) {
    const colors = {
        'hot': 'background: #fee2e2; color: #ef4444;',
        'new': 'background: #dcfce7; color: #22c55e;'
    };
    return `<span style="padding: 2px 8px; border-radius: 4px; font-size: 11px; ${colors[type]}">${text}</span>`;
}
```

## 2. Hệ thống Màu sắc & Typography (CSS Variables)
Sử dụng `:root` để quản lý thương hiệu của dự án mới. Bạn có thể đổi toàn bộ màu sắc website chỉ bằng 1 dòng code:

```css
:root {
    --primary: #2d3dcc;      /* Màu chủ đạo */
    --accent: #f59e0b;       /* Màu nhấn (nút bấm, badge) */
    --font-heading: 'Inter'; /* Font tiêu đề */
    --radius-card: 12px;     /* Độ bo góc */
}
```

## 3. UX: Skeleton Loading (Trải nghiệm tức thì)
Thay vì để màn hình trắng khi đang load dữ liệu từ API, hãy dùng các khối màu xám mô phỏng hình dáng của Card (như mình đã làm trong `ai-tools-directory.xml`). Điều này giúp người dùng cảm thấy web load nhanh hơn thực tế.

## 4. Khai thác sức mạnh của Metadata
Đây là phần thú vị nhất! Bạn có thể thêm bất kỳ trường dữ liệu nào bạn muốn. 
- **Bước 1:** Viết vào nội dung Blogger với định dạng `KEY: VALUE`.
- **Bước 2:** Dùng `BloggerCore.extractMeta(content, 'KEY')` để lấy dữ liệu.

**Gợi ý các trường Metadata phổ biến:**
- `STARS: 4.5` (Để hiển thị đánh giá sao)
- `DOWNLOAD_COUNT: 1.2k` (Hiển thị lượt tải)
- `COLOR_THEME: #ff0000` (Để đổi màu bài viết theo chủ đề)

## 5. Mobile-First (Bắt buộc)
Luôn kiểm tra giao diện trên màn hình 375px (iPhone 12/13/14). Sử dụng Flexbox (`display: flex`) và Grid (`display: grid`) để các thành phần tự động co dãn:

```css
.items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
```

---

> [!IMPORTANT]
> **Quy trình làm việc an toàn:** 
> 1. Thiết kế UI tĩnh trong `starter_template.html`.
> 2. Đổ dữ liệu từ `BloggerCore` vào.
> 3. Khi mọi thứ đã hoàn hảo, hãy copy CSS vào thẻ `<b:skin>` và HTML vào `<body>` của file XML Blogger.

Chúc bạn build được những theme tuyệt đẹp! Nếu cần mình tư vấn về một Layout cụ thể nào (như Slider, Popup...), hãy gọi mình nhé.
