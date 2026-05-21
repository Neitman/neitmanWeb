document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnClick');
    const msg = document.getElementById('message');

    btn.addEventListener('click', () => {
        // Tạo hiệu ứng hiển thị thông báo phản hồi từ client
        msg.textContent = "⚡ Xin chào! Bạn vừa kích hoạt một sự kiện JavaScript thành công trên giao diện.";
        msg.classList.remove('hidden');
        
        // Console log để kiểm tra trong DevTools (F12)
        console.log("Event triggered: User clicked the test button.");
    });
});