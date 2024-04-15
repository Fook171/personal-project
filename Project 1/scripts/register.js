'use strict'

const KEY = "USER_ARRAY"; //Key trong localStorage danh sách các user
const userArr = getFromStorage(KEY) || []; //Lấy danh sách user từ localStorage

const subBtn = document.getElementById('btn-submit'); //Lấy nút submit
const firstInput = document.getElementById('input-firstname'); //Lấy ô nhập tên thật user
const lastInput = document.getElementById('input-lastname'); //Lấy ô nhập tên họ user
const userInput = document.getElementById('input-username'); //Lấy ô nhập tên người dùng
const passInput= document.getElementById('input-password'); //Lấy ô nhập mật khẩu
const confirmInput = document.getElementById('input-password-confirm'); //Lấy ô nhập xác nhận mật khẩu

// Xử lý sự kiện click chuột vào nút Register
subBtn.addEventListener('click', function(){
    const data = new User(firstInput.value,lastInput.value,userInput.value,passInput.value); //Khởi tạo user từ thông tin đã nhập

    const validated = validate(data); //Kiểm tra dữ liệu người dùng nhập có thỏa mãn không
    if (validated.ok) { //Nếu có
        userArr.push(data); //Thêm vào danh sách người dùng 
        deleteStorage(KEY); //Xóa danh sách hiện tại ở localStorage
        saveToStorage(KEY, userArr); //Rồi thêm danh sách mới với người dùng mới vào localStorage
        window.location.href = '../pages/login.html'; //Chuyển tiếp tới trang login
    } else { //Nếu không
        window.alert(validated.message); //Hiển thị lỗi tương ứng cho user
    }
    
});


// Hàm kiểm tra input có hợp lệ không
function validate(data) {
    let validated = {}; //Biến kiểm tra
    validated.ok=false; //Mặc định là không hợp lệ
    validated.message=''; //Khởi tạo thông báo
    if (!data.firstname) { //Nếu ô firstname trống
        validated.message = 'Please input for first name';
    } else if (!data.lastname) { //Nếu lastname trống
        validated.message = 'Please input for last name';
    } else if (!data.username) { //Nếu ô username trống
        validated.message = 'Please input for user name';
    } else if (isUnique(data)) { //Nếu tên username bị trùng với username khác
        validated.message = 'Your user name must be unique';
    } else if (!data.password) { //Nếu ô mật khẩu trống
        validated.message = 'Please input for password';
    } else if ((data.password).length <= 8) { //Nếu mật khẩu ngắn hơn 8 ký tự
        validated.message = "Your password must be greater than 8 characters";
    } else if (!confirmInput.value) { //Nếu ô xác nhận mật khẩu trống
        validated.message = 'Please input confirm password';
    } else if (data.password !== confirmInput.value) { //Nếu xác nhận mật khẩu không trúng với mật khẩu ban đầu 
        validated.message = "Your password and confirmed password aren't the same";
    } else {
        validated.ok = true; //Nếu dữ liệu thỏa mãn thì chuển ok thành true
    }

    return validated;
}


// Hàm kiểm tra username có bị trùng hay không
function isUnique(data) {
    for (let i=0; i<userArr.length; i++) {
        if (userArr[i].username == data.username) return true; //Nếu phát hiện thấy trùng thì trả giá trị true về
    }
    return false; //Nếu không phát hiện ra thì trả về false
}

