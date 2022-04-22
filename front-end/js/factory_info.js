$(function(){
  var rec = getUrlParam("rec");
  //Get parameter from URL
  //alert (rec)

  let url = 'http://readymode.pythonanywhere.com/factoryInfo/'+rec
  let h = new Headers()

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
    console.log(data)    
    //console.log(data.comments)
    var basic_info = data.back
    //console.log( basic_info)
    $("#title").text(basic_info.FactoryName)
    $("#rate").text(basic_info.Rate)
    $("#remark").text(basic_info.Remark)
    $('#img').attr("src", basic_info.Image[0].url);
    //$("#img").src(basic_info.Image[0].url)
    alert(typeof(data.comments))
    data.comments.forEach(element => {//for element in data.comment:
      $("#comments").append(`
        <div class="container px-4 my-3">
          <div class="row">
            <div class="col-2"> <img class="img-fluid d-block rounded-circle" src="https://static.pingendo.com/img-placeholder-2.svg"> </div>
            <div class="col-10 d-flex align-items-center">
              <p class="my-2">${element.UserName[0]} <i>CEO</i> </p>
            </div>
          </div>
          <div class="row">
            <div class="card border-0">
              <div class="card-body p-4" >
                <p class="mb-3">${element.Content}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 p-3"> <img class="img-fluid d-block" src="https://static.pingendo.com/cover-bubble-light.svg"> </div>
            <div class="col-6 p-3"> <img class="img-fluid d-block" src="https://static.pingendo.com/cover-bubble-dark.svg"> </div>
          </div>
        </div>
      `)
    })

  })
  .catch((err)=>{
    console.log('Erro', err.massage);
  })
});

function getUrlParam (param){
  var urlParams = new URLSearchParams(window.location.search);
  return (urlParams.get(param)) 
}


