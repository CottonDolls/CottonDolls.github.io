$(document).ready(function(){
  //alert('document ready')
  let url = 'http://readymode.pythonanywhere.com/factory'
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
    console.log(data.back)
    //console.log(data.back[0].fields.Title)
    console.log(typeof(data.back))
    data.back.forEach(element => {
      $("#posts").append(
        `<a href="factory_info.html?rec=${element.id}">
          <div class="card px-4 py-2">
            <div class="row no-gutters">
              <div class="col-4">
                <img class="img-fluid d-block" src="${element.fields.Image[0].url}">
              </div>
              <div class="col-8">
                <div class="card-body">
                  <h5 class="card-title">${element.fields.FactoryName}</h5>
                  <p class="card-text">${element.fields.Rate}</p>
                  <p class="card-text"><small class="text-muted">${element.fields.Price}</small></p>
                </div>
              </div>
            </div>
          </div> 
        </a>`)
    })
  })
  .catch((err)=>{
    console.log('Erro', err.massage);
  })
})