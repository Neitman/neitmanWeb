const http = require('http');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
    
    let filePath = req.url === '/' 
        ? path.join(__dirname, 'public', 'index.html') 
        : path.join(__dirname, 'public', req.url);


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


server.listen(PORT, () => {
    console.log(`Server thuần đang chạy tại port: ${PORT}`);
});