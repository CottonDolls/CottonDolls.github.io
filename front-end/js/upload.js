const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ready-mode/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'dolllls';
const image = document.querySelector('#fileupload');

let uploadedFileUrl = ''
image.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then((data) => {
    if (data.secure_url !== '') 
    {
      
      uploadedFileUrl = data.secure_url;
      ///localStorage.setItem('passportUrl', uploadedFileUrl);
      console.log(uploadedFileUrl)
    }
  })
    .catch(err => console.error(err));
});

function upload_doll(){
  let n= document.getElementById('doll_name').value
  let a = document.getElementById('doll_attribute').value

  //let t = $('input[name=r_type]:checked').val()

  let body = {
    doll_name: n,
    doll_attribute: a,
    doll_img: uploadedFileUrl
  }
  //console.log(body)
  
  let url = 'http://127.0.0.1:5000/upload/doll'
  let h = new Headers()
  h.append('Accept','application/json')
  h.append('Content-type', 'application/json')
  let req = new Request(url,{
    method:'POST',
    headers:h,
    body:JSON.stringify(body),
    mode:'cors',
  })

  fetch(req)
  .then(response=>{
    if(response.ok) {
      return response.json();
      } else {
      throw new Error();
      }
  })
  .then((data)=>{
    console.log(data)
  })
  .catch((err)=>{
    console.log('Erro', err.massage);
  })
}