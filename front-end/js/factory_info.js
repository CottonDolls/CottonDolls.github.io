$(function(){
  var rec = getUrlParam("rec");
  //Get parameter from URL
  //alert (rec)

  let url = 'http://127.0.0.1:5000/factoryInfo/'+rec
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
    //console.log(data.back)
    var basic_info = data.back
    console.log( basic_info)
    $("#title").text(basic_info.FactoryName)
    $("#rate").text(basic_info.Rate)
    $("#remark").text(basic_info.Remark)   

  })
  .catch((err)=>{
    console.log('Erro', err.massage);
  })
});

function getUrlParam (param){
  var urlParams = new URLSearchParams(window.location.search);
  return (urlParams.get(param)) 
}

