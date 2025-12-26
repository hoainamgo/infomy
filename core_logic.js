/**
 * Blogger Headless Core Logic v1.0
 * Bộ công cụ trích xuất và xử lý dữ liệu từ Blogger JSON API
 */

const BloggerCore = {
    /**
     * Trích xuất Metadata từ nội dung bài viết
     * Quy ước: KEY: VALUE (ví dụ: PRICE: Free)
     */
    extractMeta(content, key) {
        if (!content) return '';
        const regex = new RegExp(key + ':\\s*([^\\n]+)', 'i');
        const match = content.match(regex);
        return match ? match[1].trim() : '';
    },

    /**
     * Trích xuất mô tả ngắn (Snippet)
     * Ưu tiên nội dung trước khi gặp marker ---META---
     */
    extractDescription(content, summary, length = 200) {
        if (!content) return '';
        const metaIndex = content.indexOf('---META---');
        let text = '';
        if (metaIndex > 0) {
            text = content.substring(0, metaIndex).trim();
        } else {
            text = (summary || content).replace(/<[^>]*>/g, '').trim();
        }
        return text.substring(0, length) + (text.length > length ? '...' : '');
    },

    /**
     * Lấy hình ảnh (Ưu tiên HERO_IMAGE trong Meta, sau đó mới đến ảnh đầu tiên)
     */
    getHeroImage(content) {
        if (!content) return '';
        // 1. Thử lấy từ Meta HERO_IMAGE
        const metaImg = this.extractMeta(content, 'HERO_IMAGE');
        if (metaImg && metaImg.startsWith('http')) return metaImg;

        // 2. Nếu không có, lấy ảnh đầu tiên trong bài
        return this.extractFirstImage(content);
    },

    /**
     * Lấy URL ảnh đầu tiên trong bài viết
     */
    extractFirstImage(content) {
        if (!content) return '';
        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        return imgMatch ? imgMatch[1] : '';
    },

    /**
     * Xử lý nội dung bài viết sạch (Xóa Metadata, Auto-format HTML)
     */
    extractFullContent(content) {
        if (!content) return '';
        let text = content;

        // Loại bỏ các khối Metadata quy chuẩn
        const blocks = ['---META---', '---SCREENSHOTS---', '---RELATED---', '---NOTE---'];
        blocks.forEach(block => {
            const regex = new RegExp(block + '[\\s\\S]*?---END---', 'g');
            text = text.replace(regex, '');
        });

        text = text.trim();

        // Auto-format cơ bản cho Markdown-like syntax
        text = text.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
        text = text.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
        text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        // Chuyển đổi xuống dòng thành <p> và <br>
        const paragraphs = text.split(/\n\s*\n/);
        return paragraphs.map(para => {
            para = para.trim();
            if (!para || para.startsWith('<h') || para.startsWith('<div')) return para;
            return `<p>${para.replace(/\n/g, '<br>')}</p>`;
        }).filter(p => p).join('\n');
    },

    /**
     * Trích xuất danh sách Screenshots
     */
    extractScreenshots(content) {
        const match = content.match(/---SCREENSHOTS---([\s\S]*?)---END---/);
        if (match) {
            return match[1].trim().split('\n').map(url => url.trim()).filter(url => url);
        }
        return [];
    },

    /**
     * Xử lý xóa dấu tiếng Việt (Hỗ trợ Search)
     */
    removeAccents(str) {
        if (!str) return '';
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d").replace(/Đ/g, "D");
    },

    /**
     * Fetch dữ liệu từ Blogger API sử dụng JSONP (Vượt rào CORS 100%)
     */
    fetchFeed(blogUrl, maxResults = 999) {
        return new Promise((resolve) => {
            const callbackName = 'bloggerCallback_' + Math.floor(Math.random() * 1000000);

            // Tạo function callback toàn cục
            window[callbackName] = function (data) {
                console.log("Blogger Data Received via JSONP");
                delete window[callbackName];
                const scriptNode = document.getElementById(callbackName);
                if (scriptNode) scriptNode.remove();
                resolve(data.feed.entry || []);
            };

            // Chuẩn hóa URL
            let cleanUrl = blogUrl.replace(/\/$/, "");
            if (!cleanUrl.startsWith('http')) cleanUrl = 'https://' + cleanUrl;

            // Tạo thẻ script để gọi API (JSONP)
            const script = document.createElement('script');
            script.id = callbackName;
            script.src = `${cleanUrl}/feeds/posts/default?alt=json-in-script&callback=${callbackName}&max-results=${maxResults}`;

            script.onerror = () => {
                console.error("Blogger API JSONP Load Error");
                delete window[callbackName];
                resolve([]);
            };

            document.body.appendChild(script);
        });
    },

    /**
     * Lấy thông tin Định tuyến từ URL Hash
     * Trả về { type: 'home|label|post', value: '...' }
     */
    getRoute() {
        const hash = window.location.hash || '#/';
        if (hash.startsWith('#/label/')) {
            return { type: 'label', value: decodeURIComponent(hash.replace('#/label/', '')) };
        } else if (hash.startsWith('#/post/')) {
            return { type: 'post', value: decodeURIComponent(hash.replace('#/post/', '')) };
        }
        return { type: 'home', value: '' };
    },

    /**
     * Tạo Slug từ tiêu đề (Dùng cho URL bài viết)
     */
    generateSlug(title) {
        return this.removeAccents(title.toLowerCase())
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
};

// Hỗ trợ cả ES Modules và Global Window
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BloggerCore;
} else {
    window.BloggerCore = BloggerCore;
}
