
//------------------------------------FETCH A CUPONES
let cupons;
fetch('https://pablodur2000.github.io/e-commerce.github.io/cupons.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
    }
    return response.json();
})
.then(data => {
    // Mostramos los datos del JSON en la página
    cupons = data.cupones;
    console.log("DATA FETCH : " + data.cupones[1].dueno)
})
.catch(error => {
    console.error('Error:', error);
});
//--------------------........--------------------------


//--------------------------------------------------------------------------------------------------------------Acordion
// SVG for Minus icon
const minusSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
  </svg>
`;
// SVG for Plus icon
const plusSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
  </svg>
`;

let lastIndexAcordion = 1;
const content1 = document.getElementById(`content-1`); 
const icon1 = document.getElementById(`icon-1`); 
content1.style.maxHeight = content1.scrollHeight + 'px';
icon1.innerHTML = minusSVG;    //content 1 open default

function toggleAccordion(index) {


  const content = document.getElementById(`content-${index}`);
  const icon = document.getElementById(`icon-${index}`);

  // Toggle the content's max-height for smooth opening and closing
  if (content.style.maxHeight && content.style.maxHeight !== '0px') {
    content.style.maxHeight = '0';
    icon.innerHTML = plusSVG;
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.innerHTML = minusSVG;
  }

  //--------------Hide last windows of acordion
    
  const lastContent = document.getElementById(`content-${lastIndexAcordion}`);
  const lastIcon = document.getElementById(`icon-${lastIndexAcordion}`);
  lastContent.style.maxHeight = '0';
  lastIcon.innerHTML = plusSVG;
  lastIndexAcordion = index;
}

//-----------------------------------Refresh the height of Content 3 - Acordeon
document.querySelectorAll('.pay-method-radio').forEach(radio => {
  radio.addEventListener('click', () =>{
    const content3 = document.getElementById(`content-3`);
    content3.style.maxHeight = content3.scrollHeight + 'px';
  })
});



function togglePaymentFields(type) {
  document.getElementById("bankFields").classList.add("hidden");
  document.getElementById("cardFields").classList.add("hidden");
  if (type === "bank") {
    document.getElementById("bankFields").classList.remove("hidden");
  } else if (type === "card") {
    document.getElementById("cardFields").classList.remove("hidden");
  }
}

//---------------------------------------------------------.....-------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------Cupons
const cuponInput = document.getElementById("cupon-input");
const resultCupon = document.getElementById("result-cupon");

let activeCupon = false;

cuponInput.addEventListener('input', () =>{

  resultCupon.innerHTML = `<img src="/e-commerce.github.io/img/spinner-gif.webp" alt="Imagen Descuento" class="w-auto h-10 object-cover rounded-lg">`

 
  const input = cuponInput.value;

  let i = 0;
  setTimeout(() => {
    while (cupons[i] !== undefined) {
      if (input === cupons[i].codigo) {
        resultCupon.innerHTML = `
        <!-- Imagen a la derecha -->
        <img src="https://images.vexels.com/media/users/3/157932/isolated/preview/951a617272553f49e75548e212ed947f-icono-de-marca-de-verificacion-curvada.png" alt="Imagen Descuento" class="w-auto h-10 object-cover rounded-lg">
        <!-- Columna de texto a la izquierda -->
        <div class="mr-8">
            <div class="ml-3 mb-2 text-md font-semibold"><strong>${cupons[i].dueno}</strong> te brinda un cupón con <strong>${cupons[i].descuento * 100}%</strong> de descuento</div>
        </div>`;   
        activeCupon = true;
        break;  // Sale del bucle cuando i es 5
      }else{
        resultCupon.innerHTML = `
        <!-- Imagen a la derecha -->
        <img src="https://cdn.pixabay.com/photo/2012/04/13/00/22/red-31226_1280.png" alt="Imagen Descuento" class="w-auto h-10 object-cover rounded-lg">
        <!-- Columna de texto a la izquierda -->
        <div class="mr-8">
            <div class="ml-3 mb-2 text-md font-semibold"><strong>${input}</strong> es un código incorrecto</div>
        </div>`;
        activeCupon = false;
      }
      i++
    }
  }, 1200);
})

//------------------------------------------------------........-----------------------------------------------------------------


const currencyPay = localStorage.getItem("currencyPay");   //Obtenemos la moneda en que se va a realizar el pago UYU o USD
const taxEstimate = localStorage.getItem("taxEstimated")   //Obtenemos el impuesto estimado del carrito actual
// 'cuponInput.value' ----->                                 Para obtener el cupon, en caso de que 'activeCupon' es true




//----------------------------------------------------------------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function() {
  const personalDataContainer = document.getElementById("content-1");
  const envioContainer = document.getElementById("content-2");
  const pagoContainer = document.getElementById("content-3"); // Sección de pago

  // boton de continuar
  document.querySelector(".button-next-pay").addEventListener("click", function(event) {
      event.preventDefault();
      
      // se verifica si los campos fueron completados
      const requiredFields = personalDataContainer.querySelectorAll("input[required]");
      let allFieldsCompleted = true;
      requiredFields.forEach((field) => {
          if (!field.value) {
              allFieldsCompleted = false;
          }
      });

      // si se completan los campos se pasa a la parte de datos de envio
      if (allFieldsCompleted) {
          personalDataContainer.style.maxHeight = "0"; // ocultar datos personales
          envioContainer.style.maxHeight = "fit-content"; // mostrar seccion de envío
      } else {
          alert("Por favor, completa todos los campos requeridos.");
      }
  });

  // boton continuar
  document.getElementById("continuar-btn").addEventListener("click", function(event) {
      event.preventDefault();
      
      // se verifica que se hayan completado los campos
      const envioFields = envioContainer.querySelectorAll("input[required]");
      let allEnvioFieldsCompleted = true;
      envioFields.forEach((field) => {
          if (!field.value) {
              allEnvioFieldsCompleted = false;
          }
      });

      // si todos los campos fueron completados, se pasa a la seccion de pago
      if (allEnvioFieldsCompleted) {
          envioContainer.style.maxHeight = "0"; 
          pagoContainer.style.maxHeight = "fit-content"; 
      } else {
          alert("Por favor, completa todos los campos requeridos en la sección de envío.");
      }
  });

  // boton para finalizar compra en la seccion de pago
  document.getElementById("finalizar-compra-btn").addEventListener("click", function(event) {
    event.preventDefault();
    
    // se verifica si al menos un campo de pago fue completado
    const tarjetaField = pagoContainer.querySelector("input[name='tarjeta']"); 
    const transferenciaField = pagoContainer.querySelector("input[name='transferencia']"); 
    let metodoSeleccionado = false;
    
    // verificamos si al menos uno de los campos de pago tiene valor
    if ((tarjetaField && tarjetaField.value) || (transferenciaField && transferenciaField.value)) {
        metodoSeleccionado = true;
    }

    if (metodoSeleccionado) {
        alert("Compra finalizada");
    } else {
        alert("Por favor, completa al menos una sección de pago (tarjeta o transferencia bancaria).");
    }
});
});