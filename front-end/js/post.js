$(function(){
  var rec = getUrlParam("rec");
  //Get parameter from URL
  //alert (rec)

  let url = 'http://readymode.pythonanywhere.com/post/'+rec
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
    var basic_info = data.back
    console.log( basic_info)
    $("#username").text(basic_info.Poster)
    $("#title").text(basic_info.Title)
    $("#content").text(basic_info.Content)
    $('#img').attr("src", basic_info.Image[0].url);
    data.comments.forEach(element => {
      $("#comments").append(`
      <div class="container px-4 my-3">
        <div class="row">
          <div class="col-2"> <img class="img-fluid d-block rounded-circle" src="https://static.pingendo.com/img-placeholder-2.svg"> </div>
          <div class="col-10 ">
            <div class="row">
              <p class="">J. W. Goethe <i>CEO</i> </p>
            </div>
            <div class="row pr-3">
              <p class="">I throw myself down among the tall grass by the trickling stream;</p>
            </div>
          </div>
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