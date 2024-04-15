'use strict';


//Lấy các element trong trang web
const searchInput = document.getElementById('input-query'); //Lấy từ khóa người dùng nhập vào
const searchBtn = document.getElementById('btn-submit'); //Lấy nút search
const newsList = document.getElementById('news-container'); //Lấy thẻ div trong file html chứa danh sách các tin tức
let curPage = 1; //Biến curPage để lưu số trang hiện tại
const user = getFromStorage('currentUser'); //Lấy thông tin người dùng hiện tại
const apiKey = user.API.APIkey; //Lấy API key mà người dùng đã đăng ký
const newsperpage = user.API.pageSize || 5; //Lấy số tin tức mỗi trang, nếu không có thì mặc định là 5

const prevBtn = document.getElementById('btn-prev'); //Lấy nút previous
const nextBtn = document.getElementById('btn-next'); //Lấy nút next
const pageNum = document.getElementById('page-num'); //Lấy số thứ tự trang


//Thêm sự kiện click chuột vào nút search
searchBtn.addEventListener('click', function() {
    let keyword = searchInput.value; //Lấy từ khóa người dùng nhập vào
    if (!keyword) { //Nếu người dùng không nhập gì vào thì yêu cầu người dùng nhập từ khóa vào
        window.alert('Please input for search keyword');
    } else if (keyword.length>500) { //Giới hạn số ký tự là 500, điều này do API yêu cầu
        window.alert('The maximum length of your keyword is 500 characters');
    } else {
    curPage = 1; //Bắt đầu từ trang số 1
    getAPI(keyword, curPage); //Chỉ định API lấy thông tin API theo từ khóa và số trang hiện tại
    }
});


//Thêm sự kiện click chuột vào nút previous
prevBtn.addEventListener('click', function(){
    curPage--; //Giảm số trạng hiện tại đi 1
    let keyword = searchInput.value; //Lấy từ khóa người dùng đã nhập
    getAPI(keyword, curPage); //Chỉ định API lấy thông tin API theo từ khóa và số trang hiện tại
});



//Thêm sự kiện click chuột vào nút next
nextBtn.addEventListener('click', function(){
    curPage++; //Tăng số trạng hiện tại lên 1
    let keyword = searchInput.value; //Lấy từ khóa người dùng đã nhập
    getAPI(keyword, curPage); //Chỉ định API lấy thông tin API theo từ khóa và số trang hiện tại
});




//Hàm lấy thông tin từ API
function getAPI(keyword, curPage) {
        const url='https://newsapi.org/v2/everything?' + //Tạo ra chuỗi url lấy API, vì đây là tính năng tìm kiếm nên chọn dạng everything theo quy ước của API
                    `q=${keyword}&` + //Trường q để chỉ định từ khóa cần tìm
                    `pageSize=${newsperpage}&` + //Trường pageSize để chỉ định số news mỗi trang
                    `page=${curPage}&`+ //Trường page để chỉ định số thứ tự của trang hiện tại
                    `apiKey=${apiKey}`; //Trường apiKey để chỉ định mã API mà người dùng đã đăng ký
        async function getNews() { 
            let res = await fetch (url); //Gửi request đến API
            let datas = await res.json(); //Chuyển sang định dạng json để lấy dữ liệu
            return datas;
        }
        getNews().then(function(datas) {
            const newsArr = datas.articles; //Lấy danh sách các tin tức
            let maxPage = 0; //Biến maxPage để lưu số trang tối đa, giá trị khởi tạo tạm thời là 0
            // const maxPage = Math.ceil(datas.totalResults/newsperpage); //Cách tính số trang tối đa cho tài khoản news API trả phí
            if (datas.totalResults>=100) { //Cách tính số trang tối đa cho tài khoản news API miễn phí
                maxPage = Math.floor(100/newsperpage); //Nếu tổng số kết quả nhận được nhỏ hơn 100 thì lấy 100 chia cho số news mỗi trang rồi làm tròn xuống
            } else {
                maxPage = Math.ceil(datas.totalResults/newsperpage); //Nếu tổng số kết quả nhận được lớn hơn 100 thì lấy số trang chia cho số news mỗi trang rồi làm tròn lên
            }
            prevnextDisplay(prevBtn, nextBtn, maxPage); //Điều chỉnh nút previous và nút next
            newsListRender(newsList, newsArr); //Hiển thị các tin tức theo danh sách
            pageNum.text=curPage; //Cập nhật số trang lên màn hình
        }).catch(function(error) {
            console.error(error); //Bắt lỗi và thông báo lỗi lên console
        })
}


function newsListRender(newsList, newsArr) { //Render danh sách các news được chỉ định
    newsList.innerHTML=''; //Xóa hết các tin tức đang hiển thị
    for (let i=0; i < newsperpage;i++) {
    if (newsArr[i]) { //Kiểm tra xem news đó có tồn tại hay không vì cụm (newsperpage) cuối cùng thường bị thiếu không đủ số news mỗi trang
    let newsForm = newsRender(newsArr[i]); //Render news đó lên trang web
    newsList.appendChild(newsForm); //Rồi thêm vào danh sách news cần hiển thị
    }
    }
}


function newsRender(news) { //Render từng news trong mảng
    const newsForm = document.createElement('div'); //Tạo ra phần tử div, trong div này có hình ảnh, tiêu đề, nội dung vắn tắt và nút view để dẫn đến nguồn tin
    newsForm.innerHTML = //Edit nội dung của element newsForm
    ` 
    <img src="${news.urlToImage}" class="col-lg-4">
    <div class="col-lg-8">
    <h1 style="font-size:large;">${news.title}</h1>
    <p>${news.content}</p>
    <button class="btn btn-primary" onclick="window.open('${news.url}')">View</button>
    `;
    newsForm.classList.add('form-inline'); //Thêm class để định dạng news
    newsForm.style.borderStyle = "inset"; //Chọn kiểu border cho news
    newsForm.style.padding = "15px"; //Cài đặt kích vùng đệm cho mỗi news
    newsForm.style.margin = "15px"; //Cài đặt kích thước lề cho mỗi news
    return newsForm;
}



function prevnextDisplay(prevBtn, nextBtn, maxPage) { //Điều chỉnh nút previous và nút next
    if (curPage == 1) { //Nếu trang hiện tại là 1
        prevBtn.classList.add('toast'); //Ẩn nút previous đi
        prevBtn.classList.add('disabled'); //Hủy luôn cả hiệu ứng khi rê chuột vào
    } 
    if (curPage == maxPage) { //Nếu trang hiện tại là maxPage
        nextBtn.classList.add('toast'); //Ẩn nút next đi
        nextBtn.classList.add('disabled'); //Hủy luôn cả hiệu ứng khi rê chuột vào
    }
    if (curPage > 1 && curPage < maxPage) { //Nếu trang hiện tại nằm giữa 1 và maxPage thì hiện cả 2 nút previous và next lên cũng như khôi hiệu ứng cho chúng
        nextBtn.classList.remove('toast'); 
        nextBtn.classList.remove('disabled');
        prevBtn.classList.remove('disabled');
        prevBtn.classList.remove('toast');
    }
}



