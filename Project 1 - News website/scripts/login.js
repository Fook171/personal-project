'use strict'


const userInput = document.getElementById('input-username'); //Lấy ô nhập username
const passInput = document.getElementById('input-password'); //Lấy ô nhập mật khẩu
const subBtn = document.getElementById('btn-submit'); //Lấy nút submit



const userArr = []; //Khởi tạo mảng user
const objArr = getFromStorage('USER_ARRAY'); //Lấy dữ liệu từ localStorage dưới dạng obj
for (let i=0; i<objArr.length; i++) { //Đổi user ở dạng Object sang Class
    const userClass = parseUser(objArr[i]);
    userArr.push(userClass); //Sau khi đổi thì thêm vào mảng useArr
}



// Xử lý sự kiện click chuột vào nút Login
subBtn.addEventListener('click', function(){
    
    const user = checkUser(); //Kiểm tra xem người dùng đã có trong danh sách chưa

    if (!user) { //Nếu chưa thì thông báo cho user
        window.alert("User doesn't exists");
    } else { //Nếu có
        if (passInput.value !== user.password) { //Kiểm tra xem mật khẩu có đúng không, nếu sau thì thông báo
        window.alert("The password is wrong");
        } else { //Nếu đúng thì cập nhật vòa currentUser
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = '../index.html'; //Chuyển tiếp đến trang chủ
        }
    }

});


//Kiểm tra người dùng đã có trong danh sách chưa
function checkUser() {
    for (let i=0; i<userArr.length; i++) {
    if (userInput.value == userArr[i].username) {
        return userArr[i]; //Nếu có thì trả về người dùng đó
    }
    }
    return null; //Nếu không thì trả về null
}
