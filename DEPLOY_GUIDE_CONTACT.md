# 🚀 Hướng dẫn Triển khai contact.io.vn

Dưới đây là các bước để đưa website cá nhân của anh lên GitHub Pages với tên miền **contact.io.vn**.

## Bước 1: Chuẩn bị trên GitHub
1. Truy cập [github.com](https://github.com/) và đăng nhập.
2. Tạo Repository mới đặt tên là `contact-io-vn`.
3. Chọn **Public** và **KHÔNG** tạo README hay bất kỳ file nào.
4. Copy link HTTPS (ví dụ: `https://github.com/your-user/contact-io-vn.git`).

## Bước 2: Đẩy code từ máy tính lên GitHub
Mở terminal tại thư mục `C:\Apps\myweb\buildwebnew\contact-io-vn` và chạy:

```powershell
# 1. Khởi tạo Git
git init

# 2. Thêm tất cả file
git add .

# 3. Commit
git commit -m "Deploy contact.io.vn - Hôm nay là Quan Trọng!"

# 4. Đổi nhánh thành main
git branch -M main

# 5. Kết nối Repo (Dán link đã copy vào đây)
git remote add origin https://github.com/your-user/contact-io-vn.git

# 6. Push
git push -u origin main
```

## Bước 3: Cấu hình Tên miền contact.io.vn
1. Trên GitHub Repository: Vào **Settings** -> **Pages**.
2. Tại **Custom domain**, nhập `contact.io.vn` và nhấn **Save**.
3. Tại trình quản lý tên miền (nhà cung cấp domain), anh cấu hình các bản ghi (DNS Records) sau:

   | Loại (Type) | Tên (Host) | Giá trị (Value) |
   | :--- | :--- | :--- |
   | **A** | `@` | `185.199.108.153` |
   | **A** | `@` | `185.199.109.153` |
   | **A** | `@` | `185.199.110.153` |
   | **A** | `@` | `185.199.111.153` |
   | **CNAME** | `www` | `hoainamgo.github.io` |

   *Lưu ý: Nếu nhà cung cấp yêu cầu tên, hãy điền `@` hoặc để trống cho các bản ghi A.*

4. Chờ DNS cập nhật (thường từ 15 phút đến vài tiếng).
5. Quay lại GitHub Pages settings, tích chọn **Enforce HTTPS** ngay khi domain đã active (nút này sẽ sáng lên).

---
🚀 **Chúc mừng anh! Website "Hôm nay là Quan Trọng!" đã sẵn sàng.**
