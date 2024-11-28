const CATEGORIES_URL = "https://e-commerce-server-eight-mu.vercel.app/api/cats";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://e-commerce-server-eight-mu.vercel.app/api/cat/";
const PRODUCT_INFO_URL = "https://e-commerce-server-eight-mu.vercel.app/api/products";
const PRODUCT_INFO_COMMENTS_URL = "https://e-commerce-server-eight-mu.vercel.app/api/productsComments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const token = localStorage.getItem("token");

let userLogged = '';
let isUserLogged = false;

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url, token){
    let result = {};
    showSpinner();
    return fetch(url, {
      method: 'GET', // o 'POST', 'PUT', etc., según lo que necesites
      headers: {
          'Authorization': token, // Agrega el token al header
          'Content-Type': 'application/json'  // Asegura que el contenido es JSON
      }
    })
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


//-----------------------------------------------------------------------------------------------------------------MENU
const menuButton = document.querySelector('.menu-button');
const li = document.getElementById("li-id")
let liA = document.querySelectorAll('.li-a')

const containerLoginMenuItem = document.getElementById("login-item-container");
const containerHiddenMenu = document.getElementById("hidden-user-menu");          
const closeSessionButton = document.getElementById("close-session-a");
const loginNavItem = document.getElementById("login-a");
const arrow = document.getElementById("img-arrow-menu-id");

//-----------------------------------------------------------------------------Responsive menú
window.addEventListener('resize', () => {
    chequeoVentana();

    if(window.innerWidth > 639){
      arrow.style.display = 'flex';                
    }else{
      arrow.style.display = 'none'; 
    }
});

const chequeoVentana = () =>{   //funcion para ocultar o mostrar el menu en linea o el menu en hamburguesa

  if(window.innerWidth > 639){
    
    li.classList.remove("li-aplicated");    //remuevo clase li-aplicated y li-a-aplicated, clase que se utiliza cuando el menu está en forma de haburguesa
    liA.forEach(e =>{
      e.classList.remove("li-a-aplicated");
    })
    li.style.display = 'flex';              //Muestro todo el menú, ya que estoy con un window.innerWidth mayor a 639
  
  }else if (window.innerWidth < 639){
    
    liA.forEach(e =>{                       //check si los elementos del menu (a) contienen la clase hidden, en caso de no tenerla, se aplica, ya que está el menu hamburguesa
      if (e.classList.contains("hidden")){
        e.classList.add("hidden");
      }
    })
    li.style.display = 'none';             //Oculto todo el menu, hasta que el usuario el de click para desplegarlo
  
  }
}

menuButton.addEventListener('click', () =>{

  checkArrow();     //checkeo si la flechita al lado del usuario se está mostrando o no. Si el menú está oculto, la flecha debe de estar oculta
  containerHiddenMenu.style.display = 'none';

  li.style.display = 'flex';   
  li.classList.toggle("li-aplicated");
  liA.forEach(e =>{
    e.classList.toggle("hidden");
    e.classList.toggle("li-a-aplicated");
  })
});

function checkArrow() {
  const computedStyle = window.getComputedStyle(arrow);
  if(computedStyle.display === 'none'){
    arrow.style.display = 'flex';
  }else if(computedStyle.display === 'flex'){
    arrow.style.display = 'none';
  }
}

//-----------------------------------------------------------------------------Login menú

document.addEventListener('DOMContentLoaded', () =>{
  
  chequeoVentana();

  userLogged = localStorage.getItem("token")
  console.log("USER LOGDED ", userLogged);
  if(!userLogged){
    window.location.href = '/login.html';
  }
  
  if(userLogged && (window.innerWidth > 639)){
    arrow.style.display = 'flex';                 //Si el usuario está ingresado y la ventana es mayor que 639, mostrar la flechita al lado del usuario
  }
});

function showMenu() {
  containerHiddenMenu.style.display = 'flex';
  setTimeout(() => {
    containerHiddenMenu.style.opacity = '1';
  }, 100);
}

function hideMenu() {
  containerHiddenMenu.style.opacity = '0';
  setTimeout(() => {
    containerHiddenMenu.style.display = 'none';
  }, 200);
}

function clickMenu(){
  const computedStyle = window.getComputedStyle(containerHiddenMenu);
  if(computedStyle.display === 'none'){
    showMenu();
  }else if(computedStyle.display === 'flex'){
    hideMenu();
  }
}

containerLoginMenuItem.addEventListener("click", clickMenu);
containerHiddenMenu.addEventListener("click", clickMenu);



closeSessionButton.addEventListener('click', (e) => {   //evento para cerrar sesion
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.href = '/login.html';
});




loginNavItem.addEventListener('click', (e) => {         //evento para redireccionar a login si el usuario no está ingresado
  e.preventDefault();
  if(!userLogged){
    window.location.href = '/login.html';
  }
});





