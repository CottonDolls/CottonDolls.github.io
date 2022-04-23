$("#unlogged_content").hide()
$("#logged_content").hide()

$(document).ready(function(){
  let token = localStorage.getItem('token')
  if (token != null){
    get_dolls(token);
    $("#logged_content").show()
    //get_post();
  }
  else{
    $("#unlogged_content").show()
  }
})
///////////////////////Get User Information////////////////////////////////
function get_dolls(token){
  console.log(token)

  let url = 'https://readymode.pythonanywhere.com/user_doll'
  
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
    data.back.forEach(element => {
      element = element.fields
      $("#dolls").append(
        `<div class="col-6 p-2">
          <div class="card"> <img class="card-img-top" src="${element.Image[0].url}" alt="Card image cap">
            <div class="card-body">
              <p class="card-text small text-center">${element.DollName}</p>
              <p class="card-text small text-center">${element.Attribute}</p>
            </div>
          </div>
      </div>`)
    });
  })
  .catch((err)=>{
    console.log('Erro', err.massage);
  })
  
}
