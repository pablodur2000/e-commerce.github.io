const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


//--------------------------------------------------MENU
const menuButton = document.querySelector('.menu-button');

window.addEventListener('resize', () => {
    chequeoVentana();
});

const chequeoVentana = () =>{
  const li = document.querySelector('.li')
  let liA = document.querySelectorAll('.li-a')

  if(window.innerWidth > 639){
    li.classList.remove("li-aplicated");
    liA.forEach(e =>{
      e.classList.remove("li-a-aplicated");
    })
  }else if (window.innerWidth < 639){
    liA.forEach(e =>{
      if (e.classList.contains("hidden")){
        e.classList.add("hidden");
      }
    })
  }
}

menuButton.addEventListener('click', () =>{

  const li = document.querySelector('.li')
  let liA = document.querySelectorAll('.li-a')

  li.classList.toggle("li-aplicated");
  liA.forEach(e =>{
    e.classList.toggle("hidden");
    e.classList.toggle("li-a-aplicated");
  })
  
})