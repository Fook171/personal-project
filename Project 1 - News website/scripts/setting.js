'use strict'

const user = getFromStorage('currentUser'); //Lấy thông tin người dùng hiện tại từ localStorage

const newsperpageInput = document.getElementById('input-page-size'); //Lấy ô nhập số news mỗi trang
const newscategoryInput = document.getElementById('input-category'); //Lấy ô nhập thể loại news
const saveBtn = document.getElementById('btn-submit'); //Lấy nút save


//Xử lý sự kiện click chuột vào nút save =
saveBtn.addEventListener('click', function(){
    if (!newsperpageInput.value) { //Nếu người dùng chưa nhập số news mỗi trang thì thông báo người dùng
        window.alert('Please input for the news per page');
    } else if (newsperpageInput.value<1) { //Nếu số trang nhỏ hơn 1 thì yêu cầu người dùng chọn số khác
        window.alert('News per page must be greater than 0');
    } else {
        user.API.pageSize = newsperpageInput.value; //Gán số news mỗi trang
        user.API.category = newscategoryInput.value; //Gán thể loại
        saveToStorage('currentUser', user); //Cập nhật vào localStorage
    newsperpageInput.value=''; //Khôi phục lại trạng thái nhập liệu cho ô newsperpage
    newscategoryInput.value='General'; //Quay trở về giá trị mặc định General
    }
});


