'use strict'

// Lấy các thẻ div và tin nhắn chào mừng
const login = document.getElementById('login-modal'); //Lấy nút login
const logout = document.getElementById('main-content'); //Lấy thẻ div bao gồm nút logout và câu chào
const welcome = document.getElementById('welcome-message'); //Lấy câu chào
const logoutBtn = document.getElementById('btn-logout'); //Lấy nút logout
const userArr = getFromStorage('USER_ARRAY'); //Lấy danh sách người dùng từ localStorage


// Kiểm tra người dùng hiện tại và điều chỉnh cách hiển thị menu
const user = getFromStorage('currentUser'); //Lấy thông tin người dùng hiện tại

if (user) { //Nếu có người đang đăng nhập
    login.innerHTML=''; //Xóa câu chào
    welcome.textContent = `Welcome ${user.firstname}`; //Viết câu chào mừng người đó
} else { //Nếu không
    logout.innerHTML=''; //Xóa câu chào
}

// Xử lý sự kiện click nút logout
logoutBtn.addEventListener('click', function() {
    for (let i=0; i<userArr.length; i++) {
        if (userArr[i].username==user.username) { //Tìm người dùng hiện tại trong danh sách
            userArr[i]=user;
        }
    }
    saveToStorage('USER_ARRAY', userArr); //Cập nhật thông tin của currentUser vào danh sách trước khi xóa vì trong quá trình sử dụng user có thể đã sửa đổi todo list, newsperpage và category
    deleteStorage('currentUser'); //Xóa currentUser đưa trang web vào trạng thái chưa có người đăng nhập
    window.location.href = 'pages/login.html'; //Chuyển tiếp đến trang login
});
