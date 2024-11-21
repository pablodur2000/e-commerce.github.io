
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


const content1 = document.getElementById(`content-1`); 
const icon1 = document.getElementById(`icon-1`); 
content1.style.maxHeight = content1.scrollHeight + 'px';   //---Por defecto, el primer elemento con maxima altura
icon1.innerHTML = minusSVG;    //content 1 open default


//-----------------------------------Refresh the height of Content 3 - Acordeon
document.querySelectorAll('.pay-method-radio').forEach(radio => {
  radio.addEventListener('click', () =>{
    const content3 = document.getElementById(`content-3`);
    content3.style.maxHeight = content3.scrollHeight + 'px';
  })
});



function togglePaymentFields(type) {      //funcion para cambiar el front de tipo de pago, segun lo que el usuario elija
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

  resultCupon.innerHTML = `<img src="/e-commerce.github.io/img/spinner-gif.webp" alt="Imagen Descuento" class="w-auto h-10 object-cover rounded-lg">`  //spinner
 
  const input = cuponInput.value;

  let i = 0;
  setTimeout(() => {                      //---  Despues de animacion Spinner
    while (cupons[i] !== undefined) {     //---  recorro todos los cupones hasta que haya una undefined
      if (input === cupons[i].codigo) {   //--- Compara el cupon ingresado con el cupon seleccionado con la actual 'i'
        resultCupon.innerHTML = `
        <!-- Imagen a la derecha -->
        <img src="https://images.vexels.com/media/users/3/157932/isolated/preview/951a617272553f49e75548e212ed947f-icono-de-marca-de-verificacion-curvada.png" alt="Imagen Descuento" class="w-auto h-10 object-cover rounded-lg">
        <!-- Columna de texto a la izquierda -->
        <div class="mr-8">
            <div class="ml-3 mb-2 text-md font-semibold"><strong>${cupons[i].dueno}</strong> te brinda un cupón con <strong>${cupons[i].descuento * 100}%</strong> de descuento</div>
        </div>`;   
        activeCupon = true;  //si encuentra un cupon, setea la variable para indicar si hay cupon en true
        break;  
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


//----------------------------------------------------------------------------------------------------------------------Show products in resume

const productsContainer = document.getElementById("products-container");
const currencyPay = localStorage.getItem("curencyPay");   //Obtenemos la moneda en que se va a realizar el pago UYU o USD
const taxEstimate = localStorage.getItem("taxEstimated")   //Obtenemos el impuesto estimado del carrito actual

const showProducts = () =>{
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotalElement = document.getElementById('subtotal-amount');
  const impuestoElement = document.getElementById('impuesto-amount');
  const envioAmountElement = document.getElementById('envio-amount');
  let subtotal = 0;


  cart.forEach(product => {   //--- Recorro todo el carrito actual
    let price;

    if (currencyPay === "UYU"){
      price = product.cost;     //--- Si es en UYU
    }else{
      price = product.costUSD;  //--- Si es en USD
    }

    subtotal += price * product.productCountBuy;  //--- Multiplicamos el precio del prducto actual (product) por la cantidad comprada

    let div = document.createElement("div");

    div.className = 'flex items-center p-4 border border-gray-300 rounded-lg justify-between';
    div.innerHTML = `
                <img src="${product.image}" class="w-auto h-14 mr-3">
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-700">${product.name}</h3>
                  <p class="product-count border border-2 border-gray-950">${product.productCountBuy}</p>
                </div>
                <p class="text-lg font-semibold text-gray-700">${currencyPay} ${price}</p>`;
    
    productsContainer.appendChild(div);
    
  })

  subtotalElement.textContent = currencyPay + ' ' + subtotal;     //--- Actualizamos los números del resumen de compras
  impuestoElement.textContent = currencyPay + ' ' + taxEstimate;
  envioAmountElement.textContent = currencyPay + ' ' + '0.00';
}

//------------------------------------------------------........-----------------------------------------------------------------


function initializeScript() {

  const shippingOptions = document.querySelectorAll('input[name="tipo_envio"]');
  const subtotalElement = document.getElementById('subtotal-amount');
  const envioAmountElement = document.getElementById('envio-amount');
  const impuestoElement = document.getElementById('impuesto-amount');
  const cuponElement = document.getElementById('cupon-amount');
  const totalAmountElement = document.getElementById('total-amount');
  const tipoEnvioLabel = document.getElementById('tipo-envio-seleccionado');

  const cuponInput = document.getElementById('cupon-input');
  const applyCouponButton = document.getElementById('apply-coupon-button');
  const resultCupon = document.getElementById('result-cupon');

  let cuponDiscount = 0; 
  updateTotal()

  function updateTotal() {
    
    let subtotalText = subtotalElement.textContent;
    let subtotalAmount = parseFloat(subtotalText.replace(currencyPay, ''));
    console.log("SUBTTTT: "  + subtotalAmount);
  
    let envioText = envioAmountElement.textContent;
    let envioAmount = parseFloat(envioText.replace(currencyPay, ''));

  
    let impuestoAmount = parseFloat(impuestoElement.textContent.replace(currencyPay, ''));

    let cuponDiscountAmount = subtotalAmount * cuponDiscount;
    cuponElement.textContent = '- ' + currencyPay + " " + cuponDiscountAmount.toFixed(2);

 
    let totalAmount = subtotalAmount + envioAmount + impuestoAmount - cuponDiscountAmount;

   
    totalAmountElement.textContent = currencyPay + ' ' + totalAmount.toFixed(2);
  }

  function updateShippingCost() {
 
    let selectedOption = document.querySelector('input[name="tipo_envio"]:checked');
    if (selectedOption) {
      let value = selectedOption.value;
      let percentage = 0;
      let shippingType = '';

      if (value === 'premium') {
        percentage = 0.15;
        shippingType = 'Premium';
      } else if (value === 'express') {
        percentage = 0.07;
        shippingType = 'Express';
      } else if (value === 'standard') {
        percentage = 0.05;
        shippingType = 'Standard';
      }

      let subtotalText = subtotalElement.textContent;
      let subtotalAmount = parseFloat(subtotalText.replace(currencyPay, ''));

      let shippingCost = subtotalAmount * percentage;

      envioAmountElement.textContent = currencyPay + ' ' + shippingCost.toFixed(2);

      tipoEnvioLabel.textContent = shippingType;

      updateTotal();
    }
  }

  shippingOptions.forEach(function(option) {
    option.addEventListener('change', updateShippingCost);
  });


  function applyCoupon() {
    const enteredCode = cuponInput.value.trim().toUpperCase();
    const today = new Date();

    if (!cupons) {
      console.error('Coupons data not loaded');
      return;
    }

    const coupon = cupons.find(c => c.codigo === enteredCode);

    if (coupon) {
      const expirationDate = new Date(coupon.vencimiento);
      if (expirationDate >= today) {

        cuponDiscount = coupon.descuento;
        resultCupon.textContent = 'Cupón aplicado: ' + (cuponDiscount * 100) + '% de descuento.';
        resultCupon.style.color = 'green';

        updateTotal();
      } else {
      
        cuponDiscount = 0;
        resultCupon.textContent = 'El cupón ha expirado.';
        resultCupon.style.color = 'red';
        updateTotal();
      }
    } else {

      cuponDiscount = 0;
      resultCupon.textContent = 'El cupón no es válido.';
      resultCupon.style.color = 'red';

      updateTotal();
    }
  }


  applyCouponButton.addEventListener('click', applyCoupon);


  cuponInput.addEventListener('input', function() {
    if (cuponInput.value.trim() === '') {

      cuponDiscount = 0;
      cuponElement.textContent = '0.00';
      resultCupon.textContent = '';
      updateTotal();
    }
  });

  updateShippingCost();
}

showProducts();
initializeScript();



function toggleAccordion(index) {
  var content = document.getElementById("content-" + index);
  var icon = document.getElementById("icon-" + index);
  var canToggle = true;

  if (index > 1) {
      for (var i = 1; i < index; i++) {
          var prevContent = document.getElementById("content-" + i);
          var requiredFields = prevContent.querySelectorAll("input[required]");
          for (var j = 0; j < requiredFields.length; j++) {
              if (!requiredFields[j].value) {
                  canToggle = false;
                  break;
              }
          }
          if (!canToggle) {
              break;
          }
      }
  }

  if (canToggle) {
      if (content.style.maxHeight && content.style.maxHeight !== "0px") {
          content.style.maxHeight = "0px";
          icon.style.transform = "rotate(0deg)";
      } else {
          content.style.maxHeight = content.scrollHeight + "px";
          icon.style.transform = "rotate(45deg)";
      }
  } else {
      alert("Por favor, completa todos los campos requeridos en las secciones anteriores.");
  }
}

function togglePaymentFields(method) {
  const bankFields = document.getElementById("bankFields");
  const cardFields = document.getElementById("cardFields");

  if (method === "bank") {
      bankFields.classList.remove("hidden");
      bankFields.querySelectorAll("input, select").forEach(input => {
          input.disabled = false;
          input.required = true;
      });
      cardFields.classList.add("hidden");
      cardFields.querySelectorAll("input, select").forEach(input => {
          input.disabled = true;
          input.required = false;
          input.value = ""; 
      });
  } else if (method === "card") {
      cardFields.classList.remove("hidden");
      cardFields.querySelectorAll("input, select").forEach(input => {
          input.disabled = false;
          input.required = true;
      });
      bankFields.classList.add("hidden");
      bankFields.querySelectorAll("input, select").forEach(input => {
          input.disabled = true;
          input.required = false;
          input.value = "";
      });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const personalDataContainer = document.getElementById("content-1");
  const envioContainer = document.getElementById("content-2");
  const pagoContainer = document.getElementById("content-3");


  document.querySelector(".button-next-pay").addEventListener("click", function(event) {
      event.preventDefault();

      const requiredFields = personalDataContainer.querySelectorAll("input[required]");
      let allFieldsCompleted = true;
      requiredFields.forEach((field) => {
          if (!field.value) {
              allFieldsCompleted = false;
          }
      });

      if (allFieldsCompleted) {
          personalDataContainer.style.maxHeight = "0";
          envioContainer.style.maxHeight = envioContainer.scrollHeight + "px";
          document.getElementById("icon-1").style.transform = "rotate(0deg)";
          document.getElementById("icon-2").style.transform = "rotate(45deg)";
      } else {
          alert("Por favor, completa todos los campos requeridos.");
      }
  });

  document.getElementById("continuar-btn").addEventListener("click", function(event) {
      event.preventDefault();

      const envioFields = envioContainer.querySelectorAll("input[required]");
      let allEnvioFieldsCompleted = true;
      envioFields.forEach((field) => {
          if (!field.value) {
              allEnvioFieldsCompleted = false;
          }
      });

      if (allEnvioFieldsCompleted) {
          envioContainer.style.maxHeight = "0";
          pagoContainer.style.maxHeight = pagoContainer.scrollHeight + "px";
          document.getElementById("icon-2").style.transform = "rotate(0deg)";
          document.getElementById("icon-3").style.transform = "rotate(45deg)";
      } else {
          alert("Por favor, completa todos los campos requeridos en la sección de envío.");
      }
  });

  document.getElementById("finalizar-compra-btn").addEventListener("click", function(event) {
      event.preventDefault();


      const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

      if (!selectedPaymentMethod) {
          alert("Por favor, selecciona un método de pago.");
          return;
      }

      let allPagoFieldsCompleted = true;
      let pagoFields;

      if (selectedPaymentMethod.value === "bankTransfer") {
          // Validar campos de transferencia bancaria
          pagoFields = document.getElementById("bankFields").querySelectorAll("input[required]");
      } else if (selectedPaymentMethod.value === "creditCard") {
          // Validar campos de tarjeta de crédito
          pagoFields = document.getElementById("cardFields").querySelectorAll("input[required], select[required]");
      }

      pagoFields.forEach((field) => {
          if (!field.value) {
              allPagoFieldsCompleted = false;
          }
      });

      // Si todos los campos están completos, finalizar la compra
      if (allPagoFieldsCompleted) {
          alert("Compra finalizada");
      } else {
          alert("Por favor, completa todos los campos requeridos en la sección de pago.");
      }
  });
});

