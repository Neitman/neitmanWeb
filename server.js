const http = require('http');
const fs = require('fs');
const path = require('path');

// Cấu hình Port để chạy (Render yêu cầu dùng process.env.PORT)
const PORT = process.env.PORT || 8088;

const server = http.createServer((req, res) => {
    // 1. Định tuyến: Nếu truy cập trang chủ '/', mặc định lấy file index.html
    let filePath = req.url === '/' 
        ? path.join(__dirname, 'public', 'index.html') 
        : path.join(__dirname, 'public', req.url);

    // 2. Xác định kiểu file (Content-Type) để trình duyệt hiểu
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
    }

    // 3. Đọc file từ ổ cứng và trả về cho Client
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Không tìm thấy file (Lỗi 404)
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                // Lỗi hệ thống server (Lỗi 500)
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Trả file thành công (Status 200)
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Kích hoạt server lắng nghe
server.listen(PORT, () => {
    console.log(`Server thuần đang chạy tại port: ${PORT}`);
});