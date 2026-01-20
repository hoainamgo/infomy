# 📖 HƯỚNG DẪN QUẢN TRỊ & VẬN HÀNH WEBSITE CONTACT.IO.VN

Chào mừng anh Nam! Đây là cuốn "bí kíp" ngắn gọn để anh làm chủ hoàn toàn ngôi nhà số của mình.

---

## 1. QUY TRÌNH LÀM VIỆC HÀNG NGÀY

Website của anh hoạt động theo mô hình: **Blogger (Dữ liệu) <---> GitHub (Giao diện)**.

### A. Đăng bài viết mới (News)
Anh không cần đụng vào code. Chỉ cần:
1. Truy cập [Blogger](https://www.blogger.com) -> Chọn blog `infohoainam.blogspot.com`.
2. Viết bài mới. Nhớ chèn ít nhất 1 hình ảnh đẹp để làm ảnh đại diện bài viết.
3. Xuất bản. 
4. **Kết quả:** Bài viết sẽ tự động hiện lên phần "Tin tức & Chia sẻ" trên `contact.io.vn` sau vài giây.

### B. Cập nhật Giao diện hoặc SEO
Nếu anh sửa file `index.html` ở máy tính (thêm kỹ năng, đổi thông tin liên hệ...), hãy dùng các lệnh Git sau:

**Lệnh cập nhật nhanh:**
```powershell
cd c:\Apps\myweb\buildwebnew\contact-io-vn
git add .
git commit -m "Cập nhật nội dung website"
git push -f origin main
```

---

## 2. CÁC LỆNH GIT QUAN TRỌNG

| Mục đích | Câu lệnh |
| :--- | :--- |
| **Kiểm tra trạng thái** | `git status` |
| **Lưu thay đổi** | `git add .` |
| **Ghi chú thay đổi** | `git commit -m "Lời nhắn của anh"` |
| **Đẩy lên mạng (Bình thường)** | `git push` |
| **Đẩy lên mạng (Cường chế/Ép buộc)** | `git push -f origin main` |
| **Lấy code từ mạng về máy** | `git pull` |

---

## 3. CẤU TRÚC THƯ MỤC DỰ ÁN

- `index.html`: File quan trọng nhất (chứa toàn bộ Giao diện, SEO và logic Tin tức).
- `core_logic.js`: Bộ não xử lý kết nối với Blogger (đừng sửa nếu không cần thiết).
- `assets/images/`: Nơi chứa ảnh chân dung (`profile.jpg`) và ảnh nền.
- `DEPLOY_GUIDE_CONTACT.md`: Hướng dẫn chi tiết cách cấu hình Domain & GitHub.

---

## 4. MỘT SỐ LƯU Ý KỸ THUẬT

- **SEO:** Anh hãy sửa các thẻ Meta trong `<head>` của `index.html` nếu muốn thay đổi cách Google hiển thị web.
- **Blogger Sync:** Nếu sau này anh đổi địa chỉ Blogger, hãy tìm dòng `const blogUrl = '...'` trong `index.html` để cập nhật.
- **HTTPS:** Luôn đảm bảo mục "Enforce HTTPS" trên GitHub Pages được tích xanh.

---

> **"Hôm nay là Quan Trọng!"** - Chúc anh vận hành ngôi nhà số thật thong dong và hạnh phúc! 🏠✨
