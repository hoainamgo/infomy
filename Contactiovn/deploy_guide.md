# 🚀 Hướng dẫn Triển khai GitHub Pages (Lên sóng trong 5 phút)

Dưới đây là các bước để đưa bộ code trong thư mục `buildwebnew` lên GitHub Pages để chạy thực tế.

## Bước 1: Chuẩn bị trên GitHub
1. Truy cập [github.com](https://github.com/) và đăng nhập.
2. Nhấn nút **New** để tạo Repository mới.
3. Đặt tên (ví dụ: `my-headless-web`), chọn **Public**.
4. **KHÔNG** tích chọn "Add a README file" hay bất kỳ file nào khác.
5. Nhấn **Create repository**. Copy đoạn link HTTPS (có dạng: `https://github.com/user/my-headless-web.git`).

## Bước 2: Đẩy code từ máy tính lên GitHub
Mở terminal (PowerShell hoặc CMD) tại thư mục `C:\Apps\myweb\buildwebnew` và chạy lần lượt các lệnh sau:

```powershell
# 1. Khởi tạo Git
git init

# 2. Thêm tất cả file
git add .

# 3. Tạo bản lưu đầu tiên
git commit -m "First deploy"

# 4. Đổi tên nhánh chính thành main
git branch -M main

# 5. Kết nối với GitHub (Dán link bạn vừa copy ở Bước 1 vào đây)
git remote add origin https://github.com/USER_CUA_BAN/my-headless-web.git

# 6. Đẩy code lên
git push -u origin main
```

## Bước 3: Kích hoạt Website
1. Quay lại trình duyệt tại trang Repository của bạn trên GitHub.
2. Vào mục **Settings** (bánh răng) -> **Pages**.
3. Tại phần **Build and deployment**, đảm bảo:
   - Source: `Deploy from a branch`
   - Branch: `main` / `/(root)`
4. Nhấn **Save**.
5. Đợi khoảng 1-2 phút, bạn sẽ thấy một link hiện ra ở phía trên (ví dụ: `https://user.github.io/my-headless-web/`). 

---

## 🛠️ Một vài lưu ý quan trọng:
- **Cấu hình Blog URL:** Trong file `starter_template.html`, hãy đảm bảo bạn đã thay `window.location.origin` bằng URL blog thật của bạn (ví dụ: `https://aihayiovn.blogspot.com`) để code có thể lấy được dữ liệu khi chạy trên GitHub.
- **Tên file:** GitHub chọn file `index.html` làm trang chủ. Bạn nên đổi tên file `starter_template.html` thành `index.html` trước khi đẩy lên GitHub.

Chúc bạn lên sóng thành công! Nếu gặp lỗi lúc chạy lệnh `git push`, hãy bảo mình nhé.
