'use strict'


class User { //Định nghĩa lớp User
        constructor(firstname, lastname, username, password) { //Hàm tạo user dựa
            this.firstname=firstname; //Tên thật của user
            this.lastname=lastname; //Tên họ của user
            this.username=username; //Tên người dùng
            this.password=password; //Mật khẩu của người dùng
            this.API = new API(); //Tạo đối tượng API để thực hiện các công việc liên quan đến API
            this.todo = []; //Mảng các việc cần phải hoàn thành
        }        
}


//Đổi User dạng object sang dạng class
function parseUser(userObj) { //Vì localStorage chỉ lưu user dưới dạng object nên cần phải đôi sang class
    const user = new User(userObj.firstname, userObj.lastname, userObj.username, userObj.password); //Khởi tạo user
    user.API = userObj.API; //Khởi tạo API
    user.todo = userObj.todo; //Khởi tạo danh sách trống
    return user;
    }


class API { //Tạo ra lớp API để lưu các thông tin về API
    constructor() { //Hàm tạo
        this.country='us'; //Chọn country mặc định là us
        this.category='general'; //Chọn category mặc định là general
        this.pageSize=5; //Chọn kích thước trang (newsperpage) mặc định là 5
        this.APIkey='cd5419a738b94d96a931e8b82d81c05b'; //Lấy mã API người dùng đã đăng ký
    }
}


class todo { //Tạo lớp todo để lưu danh sách các công việc cần phải làm
    constructor() { //Hàm tạo todo
        this.task=''; //Nội dung của task
        this.owner=''; //User viết nội dung đó
        this.isDone=false; //Trạng thái của task đã hoàn thành hay chưa, mặc định là chưa hoàn thành
    }
}