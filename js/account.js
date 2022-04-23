///////////////////////Register////////////////////////////////
function register(){
  let n= document.getElementById('r_name').value
  let e = document.getElementById('r_email').value
  let p = document.getElementById('r_password').value
  //let t = document.getElementsByName('r_type').value
  let t = $('input[name=r_type]:checked').val()

  let body = {
    name: n,
    email: e,
    password : p,
    type: t
  }
  console.log(body)
  
  let url = 'https://readymode.pythonanywhere.com/register'
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
    window.location.href = 'login.html';
  })
  .catch((err)=>{
    console.log('Erro', err.massage);
  })
}

///////////////////////Login////////////////////////////////
function login(){
  let n = document.getElementById('l_name').value
  let p = document.getElementById('l_password').value
  console.log(n,p)
  base64 = btoa(n + ":" + p);
  let auth = 'Basic ' + base64;
  localStorage.setItem('BA', JSON.stringify(auth));
  console.log(auth);

  let url = 'https://readymode.pythonanywhere.com/login'
  let h = new Headers();
  h.append('Authorization',auth);
  h.append('Accept','application/json');
  let req = new Request(url,{
    method:'GET',
    headers:h,
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
    console.log(data);
    localStorage.setItem('token', JSON.stringify(data.token));
    window.location.href = 'index.html';
  })
  .catch((err)=>{
    console.log('Erro', err.massage);
    $("#loginForm").append(`<h5>Erro! Please try again</h5>`)
  })
}

///////////////////////Get User Information////////////////////////////////
function get_user(){
  let token = localStorage.getItem('token')
  if (token != null){
    console.log(token)

    let url = 'https://readymode.pythonanywhere.com/user'
    
    let h = new Headers()
    h.append('Accept','application/json')
    h.append('client-token', `${token}`)

    let req_user = new Request(url,{
      method:'GET',
      headers:h,
      mode:'cors',
    })

    fetch(req_user)
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
  else{
    alert('You are not login!')
  }
  
}

///////////////////////Logout////////////////////////////////
function logout(){
  localStorage.removeItem("BA");
  localStorage.removeItem("token");
  //window.location.href = 'index.html';
}

