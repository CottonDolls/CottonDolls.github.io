
$(document).ready(function(){
  let url = 'https://readymode.pythonanywhere.com/plaza'
  let h = new Headers()
  /*
  h.append('Authorization',auth)
  h.append('Accept','application/json')
  h.append('client-token', `${token}`)
  */

  let req_text = new Request(url,{
    method:'GET',
    headers:h,
    mode:'cors',
  })

  fetch(req_text)
  .then(response=>{
    if(response.ok) {
      return response.json();
      } else {
      throw new Error();
      }
  })
  .then((data)=>{   
    console.log(data.back)
    //console.log(data.back[0].fields.Title)
    data.back.forEach(element => {
      //element = element.fields
      $("#posts").append(
        `<div class="col-6 p-2">
          <a href="post.html?rec=${element.id}">
            <div class="card"> <img class="card-img-top" src="${element.fields.Image[0].url}" alt="Card image cap">
              <div class="card-body">
                <p class="card-text small">${element.fields.Title}</p>
                <div class="row">
                  <div class="col-4 d-flex align-items-center"> <img class="rounded-circle" src="./imgs/Cotton doll LOGO/photo.svg" width="30"> </div>
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
})
//////////////////////////////////////////
document.getElementById("town").addEventListener("click", function(){
  alert("Hello World!");
});

document.getElementById("group").addEventListener("click", test);

function test(){
  let i = new Headers()
  
  fetch('https://readymode.pythonanywhere.com/test',{
    method:'GET',
    mode: 'cors',
    headers: i,
  })
  .then((response)=>{
    if(response.ok) {
      return response.json();
      } else {
      throw new Error();
      }
  })
  .then((json)=>{
    alert("Greeting")
    console.log(json)
  })
  .catch((err)=>{
    console.log('Erro',err.massage)
  })
}

document.getElementById("crafter-copy").addEventListener("click", showTest);

function showTest(){
  let url = 'https://readymode.pythonanywhere.com/bktext'
  let h = new Headers()
  /*
  h.append('Authorization',auth)
  h.append('Accept','application/json')
  h.append('client-token', `${token}`)
  */

  let req_text = new Request(url,{
    method:'GET',
    headers:h,
    //body:JSON.stringify(body),
    mode:'cors',
  })

  fetch(req_text)
  .then(response=>{
    if(response.ok) {
      return response.json();
      } else {
      throw new Error();
      }
  })
  .then((data)=>{
    console.log(data.back)
    //console.log(data.back)
    var html = ''
    data.back.forEach(element => {
      //alert(element.title) 
      $("#posts").append(
        `<div class="col-6 p-2">
          <div class="card"> <img class="card-img-top" src="${element.img}" alt="Card image cap">
            <div class="card-body">
              <p class="card-text small">${element.title}</p>
              <div class="row">
                <div class="col-4 d-flex align-items-center"> <img class="rounded-circle" src="https://static.pingendo.com/img-placeholder-2.svg" width="30"> </div>
                <div class="col-8 d-flex align-items-center">
                  <p class="mt-2 small" >J. W. Goethe </p>
                </div>
              </div>
            </div>
          </div>
        </div>`)
    });
  })
  .catch((err)=>{
    console.log('Erro', err.massage);
  })
}
/******************************************* */
