
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




document.addEventListener('DOMContentLoaded', function() {
  let couponsData = null;

  fetch('../cupons.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      couponsData = data;
      initializeScript();
    })
    .catch(error => {
      console.error('Error fetching coupons data:', error);
    });

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

    function updateTotal() {
      
      let subtotalText = subtotalElement.textContent;
      let subtotalAmount = parseFloat(subtotalText.replace('$', ''));

    
      let envioText = envioAmountElement.textContent;
      let envioAmount = parseFloat(envioText.replace('$', ''));

    
      let impuestoAmount = parseFloat(impuestoElement.textContent.replace('$', ''));

      let cuponDiscountAmount = subtotalAmount * cuponDiscount;
      cuponElement.textContent = '- $' + cuponDiscountAmount.toFixed(2);

   
      let totalAmount = subtotalAmount + envioAmount + impuestoAmount - cuponDiscountAmount;

     
      totalAmountElement.textContent = '$' + totalAmount.toFixed(2);
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
        let subtotalAmount = parseFloat(subtotalText.replace('$', ''));

        let shippingCost = subtotalAmount * percentage;

        envioAmountElement.textContent = '$' + shippingCost.toFixed(2);

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

      if (!couponsData) {
        console.error('Coupons data not loaded');
        return;
      }

      const coupon = couponsData.cupones.find(c => c.codigo === enteredCode);

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
        cuponElement.textContent = '- $0.00';
        resultCupon.textContent = '';
        updateTotal();
      }
    });

    updateShippingCost();
  }
});


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

<<<<<<< HEAD
      // si todos los campos fueron completados, se pasa a la seccion de pago
      if (allEnvioFieldsCompleted) {
          envioContainer.style.maxHeight = "0"; 
          pagoContainer.style.maxHeight = "fit-content"; 
=======
      if (allEnvioFieldsCompleted) {
          envioContainer.style.maxHeight = "0";
          pagoContainer.style.maxHeight = pagoContainer.scrollHeight + "px";
          document.getElementById("icon-2").style.transform = "rotate(0deg)";
          document.getElementById("icon-3").style.transform = "rotate(45deg)";
>>>>>>> 2e303f63f8d45e2e89c2edb8bb7c944dbe379d16
      } else {
          alert("Por favor, completa todos los campos requeridos en la sección de envío.");
      }
  });

<<<<<<< HEAD
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
=======
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

>>>>>>> 2e303f63f8d45e2e89c2edb8bb7c944dbe379d16
