
var user_post = [];
$(document).ready(function(){
  let token = localStorage.getItem('token')
  if (token != null){
    get_user(token);
    //get_post();
    $("#basic_info").append(`<a class="btn btn-light" href="login.html" onclick="logout()">登出</a> `)
  }
  else{
    $("#UserName").text('未登录，请登录！')
    $("#basic_info").append(`<a class="btn btn-light" href="login.html">登录</a>`)
  }
})
///////////////////////Get User Information////////////////////////////////
function get_user(token){
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
    $("#UserType").text(data.Type)
    $("#UserName").text(data.UserName)
    //console.log(data.Post,typeof(data.Post))
    user_post = data.Post
    //console.log(user_post)
    get_post(token)
  })
  .catch((err)=>{
    console.log('Erro', err.massage);
  })
  
}

///////////////////////Logout////////////////////////////////
function logout(){
  localStorage.removeItem("BA");
  localStorage.removeItem("token");
  //window.location.href = 'index.html';
}
///////////////////////Logout////////////////////////////////
function get_post(token){
  if (user_post == false){
    console.log ('no posts')
    $("tabone_text").text('尚未发布帖子')
  }
  else{
    console.log(user_post,typeof(user_post))
    
    let url = 'https://readymode.pythonanywhere.com/user_post'
  
    let h = new Headers()
    h.append('Accept','application/json')
    h.append('client-token', `${token}`)
  
    let req_post = new Request(url,{
      method:'GET',
      headers:h,
      mode:'cors',
    })
  
    fetch(req_post)
    .then(response=>{
      if(response.ok) {
        return response.json();
        } else {
        throw new Error();
        }
    })
    .then((data)=>{
      console.log(data)
      data.back.forEach(element => {
        //element = element.fields
        $("#tab1").append(
          `<div class="col-6 p-2">
            <a href="post.html?rec=${element.id}">
              <div class="card"> <img class="card-img-top" src="${element.fields.Image[0].url}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text small">${element.fields.Title}</p>
                  <div class="row">
                    <div class="col-4 d-flex align-items-center"> <img class="rounded-circle" src="https://static.pingendo.com/img-placeholder-2.svg" width="30"> </div>
                    <div class="col-8 d-flex align-items-center">
                      <p class="mt-2 small" >${element.fields.Poster} </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>`)
      });
    })
    .catch((err)=>{
      console.log('Erro', err.massage);
    })
  }
}
///////////////////////Tab control////////////////////////////////
$('#myTab a:first').click(function (e) {
  e.preventDefault()
  //console.log(user_post)

})

$('#myTab li:eq(1) a').click(function (e) {
  e.preventDefault()
  console.log('tab2')
})


$('#myTab a:last').click(function (e) {
  e.preventDefault()
  console.log('tab3')
})