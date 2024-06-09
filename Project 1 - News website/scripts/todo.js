'use strict'


const user = getFromStorage('currentUser'); //Lấy thông tin người dùng đang đăng nhập từ localStorage
const taskInput = document.getElementById('input-task'); //Lấy ô nhập nội dụng task
const addBtn = document.getElementById('btn-add'); //Lấy nút add
const todoList = document.getElementById('todo-list'); //Lấy dang sách các task
todoListRender(user.todo, todoList); //Hiện thị todoList lên trang web


//Thêm sự kiện click chuột vào nút add
addBtn.addEventListener('click', function() {
    if (!taskInput.value) { //Nếu nội dung ô task trống thì thông báo người dùng nhập vào
        window.alert('Please input task');
    } else if (!isDuplicate(taskInput.value)) { //Nếu nội dung ô task bị trùng lặp thì nhắc người dùng sửa
        window.alert('Your task is duplicated');
    } else { //Khi nội dung task thỏa mãn
    const toDo = new todo(); //Khởi tạo lớp todo mới
    toDo.task=taskInput.value; //Gán nội dung task vào class
    toDo.owner=user.username; //Gán User vào
    user.todo.push(toDo); //Thêm vào danh sách các task của user
    todoListRender(user.todo, todoList); //Render danh sách todo list
    saveToStorage('currentUser', user); //Cập nhật thông tin người dùng vào localStorage
    taskInput.value=''; //Khôi phục trạng thái nhập liệu của ô task
    }
})


function todoListRender(todoArr, todoList) { //render danh sách task
    todoList.innerHTML = ''; //Xóa danh sách todo đang hiển thị
    for (let i=0; i<todoArr.length; i++) {
        todoRender(todoArr[i], todoList); //render từng todo trong danh sách
    }
}


function todoRender(toDo, todoList) { //render từng todo trong danh sách
    const todoLabel = document.createElement('li'); //tạo ra thẻ li hiển thị 1 task
    if (toDo.isDone) { //Kiểm tra task đó đã hoàn thành chưa
        todoLabel.classList.add('checked'); //Nếu rồi thì thêm class checked vào để gạch task đó đi
    }
    todoLabel.innerHTML= //Edit nội dung của task
    `
    ${toDo.task}<span class="close" onclick="removeTask('${toDo.task}')">x</span>
    `;
    todoLabel.setAttribute('onclick', `completeTask(event)`); //Cài đặt thuộc tính onclick cho task
    todoList.appendChild(todoLabel); //Thêm task vào danh sách
}


function completeTask(event) { //Người dùng nhấn vô task để chỉ định task đó đã hoàn thành
    const task =((event.target.textContent).replace(/\s/g,'')).slice(0,-1); //Lấy nội dung của task dựa vào trong element
    event.target.classList.add('checked'); //Thêm class checked vào để gạch task đi
    for (let i=0; i<user.todo.length; i++) {
        if (user.todo[i].task == task) { //Tìm kiếm task có nội dụng như trên trong mảng todo của user
            user.todo[i].isDone = true; //Cập nhật trạng thái đã hoàn thành
            saveToStorage('currentUser', user); //Cập nhật dữ liệu vào localStorage
        }
    }
}


function removeTask(task) { //Xóa 1 task ra khỏi danh sách khi người dùng click vào dấu x
    for (let i=0; i<user.todo.length; i++) {
        if (task == user.todo[i].task) { //Tìm kiếm task trong mảng todo của user
            user.todo.splice(i, 1); //Xóa bỏ phẩn tử đó ra khỏi mảng
            todoListRender(user.todo, todoList); //Hiển thị lại danh sách các todo
            saveToStorage('currentUser', user); //Cập nhật vào localStorage
            return; //Ngưng vòng lặp và hàm ngay lập tức
        }
    }
}

function isDuplicate(task) { //Kiểm tra xem task có bị trùng lặp
    for (let i=0; i < user.todo.length; i++) {
        if (task == user.todo[i].task) { //Nếu phát hiện có 1 task trong mảng có nội dung giống như task đang định thêm thì trả về kết quả false
            return false;
        }
    }
    return true; //Nếu không phát hiện ra thì trả về true
}