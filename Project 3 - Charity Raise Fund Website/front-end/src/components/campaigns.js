import * as React from 'react';
import defaultImg from '../default-poster.png';
import {makeStyles} from "@material-ui/core/styles";
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//Định nghĩa kiều dáng bằng React
const useStyles = makeStyles((theme) => ({
  imgInput: {
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  },
}));

//Khai báo tài khoản Cloudinary
const cloudinaryConfig = {
  cloudName: 'dywskhd9f',
  apiKey: '318491751267724',
  apiSecret: 'sAm2dtyggd1cKm15y6bPX9hFFLY'
};

//Nội dung component
export default function CampaignForm() {
  //Khai báo đối tượng Chiến dịch cần nhập
  const [campaign, setCampaign] = React.useState({
    nameVN: '',
    nameEN: '',
    poster: '',
    descriptionVN: '',
    descriptionEN: '',
    creator:'tuannt@gmail.com.vn',
    startingDate: null,
    endingDate: null,
    addingDate: new Date(),
    targetAmount: '',
    currentAmount: 814212,
  });
  var posterImg = new FormData(); //Lưu ảnh poster
  const classes = useStyles();
  const [imagePreview, setImagePreview] = React.useState(null); //Hiển thị ảnh Poster đã được tải lên

  //Các biến tham chiếu đến phần tử ReactQuill
  const reactRefVN = React.useRef(null);
  const reactRefEN = React.useRef(null);

  //Hàm xử lý việc chèn hình ảnh vào phần tử ReactQuill
  const handleQuillUpload = async (reactRef) => {
    //Tạo phần tử <input type='file'> ảo và nhấn nó cùng lúc với khi nhấn phần tử image trên thanh công cụ của thanh Toolbar
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    //Xử lý sự kiện khi có sự thay đổi giá trị của thẻ <input type='file'> ảo trên
    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        //Gửi ảnh và lưu vào Cloudinary
        const formImg = new FormData();
        formImg.append('file', file);
        formImg.append('upload_preset', 'oefitcbc');
        fetch('https://api.cloudinary.com/v1_1/' + cloudinaryConfig.cloudName + '/image/upload', {
            method: 'POST',
            body: formImg
        })
        .then(response => response.json())
        .then(data => {
           const imgHtml = `<p class="ql-align-center"><img src="${data.url}" width="${80}%" height="auto" /></p>`;
           const quill = reactRef.current;
          if (quill) {
            const range = quill.getEditorSelection();
            quill.getEditor().pasteHTML(range.index, imgHtml);
          }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
      }
    });
  }

  //Tạo mô đun cho phần tử ReactQuill Tiếng Việt
  const modulesVN = React.useMemo(()=>({
    toolbar: {
      container: [
        [{ 'header': '1'}, {'header': '2'}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean']
      ],
      handlers: {
        image: () => handleQuillUpload(reactRefVN)
      }
    }
  }), [])

  //Tạo mô đun cho phần tử ReactQuill Tiếng Anh
  const modulesEN = React.useMemo(()=>({
    toolbar: {
      container: [
        [{ 'header': '1'}, {'header': '2'}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean']
      ],
      handlers: {
        image: () => handleQuillUpload(reactRefEN)
      }
    }
  }), [])

  //Hàm xử lý cập nhật dữ liệu vào đối tượng "Chiến dịch" khi có sự thay đổi giá trị các trường
  const handleChange = (event) => {
    const { id, value } = event.target;
    setCampaign({ ...campaign, [id]: value });
  };

  //Hàm xử lý tải ảnh Poster lên máy chủ
  const handlePosterUpload = (event)=> {
    var file = event.target.files[0]

    //Tạo tên tệp ảnh kèm dãy số ngẫu nhiên đằng sau để tránh trùng tên tệp ở máy chủ
    var fileName = file.name
    const namePart = fileName.substring(0, fileName.lastIndexOf('.'))
    const extensionPart = fileName.substring(fileName.lastIndexOf('.'))
    fileName = namePart + '-' + uuidv4() + extensionPart 

    //Cập nhật giá trị và hiển thị ảnh lên khuôn
    setCampaign({ ...campaign, poster: fileName})
    setImagePreview(URL.createObjectURL(file))
  }

  //Hàm xử lý nộp biểu mẫu
  const handleSubmit = (event) => {
      event.preventDefault();

      //Lấy hình ảnh trong phần tử <input type='file'>
      const posterImgInput = document.querySelector('input[type="file"]');
      const file = posterImgInput.files[0];
      posterImg.append('file', file);
      posterImg.append('name', campaign.poster);

      console.log(campaign.descriptionVN)
      console.log(campaign.descriptionEN)

      // setCampaign({ ...campaign, addingDate: new Date() });

      //Gửi hình ảnh Poster về máy chủ
      fetch('http://localhost:8080/addCampaign', {
        method: 'POST',
        headers: {'Content-Type' :'application/json'},
        body: JSON.stringify(campaign),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error(error);
      });
  
      fetch('http://localhost:8080/posterUpload', {
        method: 'POST',
        body: posterImg,
      })
      .catch(error => {
      console.error('Error:', error);
      });
};


  return (

    //Tạo biểu mẫu
    <Box
      component="form"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      sx={{
        width:'80%',
        display: 'block',
        margin:'auto',
        marginTop:'50px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
          <Typography variant="h4" component="h2">Add new campaign</Typography>
          
          {/* Trường nhập tên Chiến dịch Tiếng Việt */}
          <TextField
            required
            id="nameVN"
            label="Campaign Name (Vietnamese)"
            sx={{width:'60%', margin: '20px'}}
            variant="filled"
            value={campaign.nameVN}
            onChange={handleChange}
          />


          {/* Trường nhập tên Chiến dịch Tiếng Anh */}
          <TextField
            required
            id="nameEN"
            label="Campaign Name (English)"
            sx={{width:'60%', margin: '20px'}}
            variant="filled"
            value={campaign.nameEN}
            onChange={handleChange}
          />

          {/* Trường tải ảnh Poster */}
          <Box>
            <Typography>Poster</Typography>
            <input
              type="file"
              accept="image/*"
              id="upload-image"
              onChange = {handlePosterUpload}
              style = {{display:'none'}}
            />
            <Card className={classes.imgInput} sx={{width:'60%', margin:'auto'}}>
            <label htmlFor='upload-image'>
              <CardMedia
                component="img"
                src={imagePreview != null ? imagePreview : defaultImg}
                alt="Poster"
                sx={{width:'100%'}}
              />
            </label>
            </Card>
          

          </Box>
          <Grid container sx={{width:'100%', margin: '20px'}}>
          
          {/* Trường nhập số tiền quyên góp mục tiêu */}
          <Grid item md={4} sm={12} xs={12} sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
              <TextField
                required
                id="targetAmount"
                label="Target Amount ($)"
                sx={{width:'90%'}}
                variant="filled"
                value={campaign.targetAmount}
                onChange={handleChange}
              />
            </Grid>

            {/* Trường nhập ngày bắt đầu chiến dịch */}
            <Grid item md={4} sm={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']} sx={{alignItems: 'center'}}>
                  <DateTimePicker
                  label="Starting Date"
                  value={campaign.startingDate}
                  sx={{ width: '90%', padding:'auto'}}
                  onChange={(value) => setCampaign({ ...campaign, startingDate: value })}
                  // minDateTime = {dayjs().add(1, 'day').startOf('day')}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            {/* Trường nhập ngày kết thúc chiến dịch */}
            <Grid item md={4} sm={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']} sx={{alignItems: 'center'}}>
                  <DateTimePicker
                  label="Ending Date"
                  value={campaign.endingDate}
                  sx={{ width: '90%', padding:'auto' }}
                  onChange={(value) => setCampaign({ ...campaign, endingDate: value })}
                  required
                  minDateTime = {campaign.startingDate ? dayjs(campaign.startingDate).add(1, 'day').startOf('day') : dayjs().add(1, 'day').startOf('day')}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          {/* Trường nhập nội dung chiến dịch Tiếng Việt */}
          <Box sx={{width:'100%'}}>
            <Typography>Description (Vietnamese)</Typography>
            <ReactQuill 
                  ref = {reactRefVN}
                  aria-label="Custom Label"
                  theme="snow"
                  value={campaign.descriptionVN} 
                  style={{width:'100%', margin:'20px', marginTop:'0px'}}
                  onChange={(value) => setCampaign({...campaign, descriptionVN: value})} 
                  modules={modulesVN}
              />
          </Box>

          {/* Trường nhập nội dung chiến dịch Tiếng Anh */}
          <Box sx={{width:'100%', marginTop:'20px'}}>
            <Typography>Description (English)</Typography>
            <ReactQuill 
                  ref = {reactRefEN}
                  aria-label="Custom Label"
                  theme="snow"
                  value={campaign.descriptionEN} 
                  style={{width:'100%', margin:'20px', marginTop:'0px'}}
                  onChange={(value) => setCampaign({...campaign, descriptionEN: value})} 
                  modules={modulesEN}
              />
          </Box>

          <Button type="submit" variant="contained" sx={{margin:5}}>Submit</Button>

    </Box>
  );
}