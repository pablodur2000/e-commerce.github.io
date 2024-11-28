
const footerARelevant = document.querySelectorAll('.footer-a-relevant');
const footerACategories = document.querySelectorAll('.footer-a-categories');
const buttonNewsletter = document.getElementById("newsletter-button");
const pNewsletter = document.getElementById("p-newsletter");
const inputNewsletter = document.getElementById("form-newsletter");
const textConfirmed = document.getElementById("container-confirmed-suscription");
const spiner = document.getElementById("spinner-wrapper");

let currentProductsArray2 = [];

const fetchCategories = async () => {
    try {
        const categoryID = localStorage.getItem('catID')
        const response = await fetch(CATEGORIES_URL, {
            method: 'GET', // o 'POST', 'PUT', etc., según lo que necesites
            headers: {
                'Authorization': token, // Agrega el token al header
                'Content-Type': 'application/json'  // Asegura que el contenido es JSON
            }
        });

        if (!response.ok) {
            throw new Error('No hay respuesta: ' + response.statusText);
        }

        const data = await response.json();
        currentProductsArray2 = data;
        console.log(data);

        let productsFooterName = []
        let counter = 0;
        data.forEach((date,index) =>{
            if(date.productCount > 0){
                if (counter <5){
                    footerACategories[counter].innerHTML = date.name;
                    footerACategories[counter].setAttribute('alt', date.id)
                    counter ++;
                }
            }else{

            }
        });

        

       
      
    } catch (error) {
        console.error('Error al traer los datos', error);
    }
}

fetchCategories();

footerACategories.forEach(a => {
    a.addEventListener('click', () =>{
        const catID = a.getAttribute('alt');
        localStorage.setItem('catID', catID)
        window.location = "products.html";
    })
});

buttonNewsletter.addEventListener('click', (e) =>{
    e.preventDefault();
    const textInputNewsletter = document.getElementById("input-newsletter").value;
    console.log("VALORRRR: " + textInputNewsletter)
    if(!(textInputNewsletter == "") && textInputNewsletter.includes("@") && textInputNewsletter.includes(".com")){
        spiner.style.display = "flex";
        setTimeout(() =>{
            spiner.style.display = "none";
            pNewsletter.style.display = "none";
            inputNewsletter.style.display = "none";
            textConfirmed.style.display = "block";
        },1000)
    }else{
        alert("Ingrese un email correcto");
    }
});


