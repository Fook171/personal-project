'use strict'

const user = getFromStorage('currentUser'); //Lấy thông tin người dùng đang đăng nhập
const newsList = document.getElementById('news-container'); //Lấy thẻ div trong file html chứa danh sách các tin tức
const category = user.API.category || 'General'; //Lấy category của người dùng
const newsperpage = user.API.pageSize || 5; //Lấy số tin tức mỗi trang, nếu không có thì mặc định là 5
const apiKey = user.API.APIkey; //Lấy mã API mà người dùng đã đăng ký
const country = user.API.country; //Lấy mã quốc gia của người dùng theo quy ước của API


const prevBtn = document.getElementById('btn-prev'); //Lấy nút previous
const nextBtn = document.getElementById('btn-next'); //Lấy nút next
const pageNum = document.getElementById('page-num'); //Lấy số thứ tự trang




let curPage = 1; //Lưu số trang hiện tại
getAPI(curPage); //Lấy thông tin từ API và hiển thị trang số 1 lên



//Xử lý sự kiện click chuột vào nút previous
prevBtn.addEventListener('click', function(){
    curPage--; //Giảm số trang đi 1
    getAPI(curPage); //Chỉ định API lấy thông tin API theo từ khóa và số trang hiện tại
});



//Xử lý sự kiện click chuột vào nút next
nextBtn.addEventListener('click', function(){
    curPage++; //Tăng số trang lên 1
    getAPI(curPage); //Chỉ định API lấy thông tin API theo từ khóa và số trang hiện tại
});



//Hàm lấy thông tin từ API
function getAPI(curPage) {
        const url='https://newsapi.org/v2/top-headlines?' + //Tạo ra chuỗi url lấy API, vì đây là tính năng điểm tin tức nổi bật nên chọn dạng top-headlines theo quy ước của API
                    `country=${country}&` + //Trường country để xác định quốc gia của người dùng
                    `category=${category}&` + //Trường category để xác định thể loại tin tức mà người dùng thích
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

