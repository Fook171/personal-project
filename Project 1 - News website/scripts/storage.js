'use strict'

function getFromStorage(key) { //Lấy thông tin từ localStorage đồng thời chuyển nó sang dạng array hoặc object
    return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, value) { //Chuyển thông tin sang dạng JSON string rồi lưu xuống localStorage
    localStorage.setItem(key, JSON.stringify(value));
}

function deleteStorage(key) { //Xóa 1 phần tử trong localStorage đi
    localStorage.removeItem(key);
}