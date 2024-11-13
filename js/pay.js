
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






// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  let couponsData = null;

  // Fetch the coupons data
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
      // Optionally, display an error message to the user
    });

  function initializeScript() {
    // Get references to the elements
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

    let cuponDiscount = 0; // Global variable to store the coupon discount

    function updateTotal() {
      // Get the subtotal amount
      let subtotalText = subtotalElement.textContent;
      let subtotalAmount = parseFloat(subtotalText.replace('$', ''));

      // Get the shipping cost
      let envioText = envioAmountElement.textContent;
      let envioAmount = parseFloat(envioText.replace('$', ''));

      // Get the impuesto amount
      let impuestoAmount = parseFloat(impuestoElement.textContent.replace('$', ''));

      // Calculate the coupon discount amount
      let cuponDiscountAmount = subtotalAmount * cuponDiscount;
      cuponElement.textContent = '- $' + cuponDiscountAmount.toFixed(2);

      // Calculate the total amount
      let totalAmount = subtotalAmount + envioAmount + impuestoAmount - cuponDiscountAmount;

      // Update the "Total" amount
      totalAmountElement.textContent = '$' + totalAmount.toFixed(2);
    }

    function updateShippingCost() {
      // Get the selected shipping option
      let selectedOption = document.querySelector('input[name="tipo_envio"]:checked');
      if (selectedOption) {
        let value = selectedOption.value;
        let percentage = 0;
        let shippingType = '';

        // Determine the percentage based on the selected option
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

        // Get the subtotal amount
        let subtotalText = subtotalElement.textContent;
        let subtotalAmount = parseFloat(subtotalText.replace('$', ''));

        // Calculate the shipping cost
        let shippingCost = subtotalAmount * percentage;

        // Update the "Envío" amount
        envioAmountElement.textContent = '$' + shippingCost.toFixed(2);

        // Update the selected shipping type label
        tipoEnvioLabel.textContent = shippingType;

        // Update the total amount
        updateTotal();
      }
    }

    // Add event listeners to the shipping options
    shippingOptions.forEach(function(option) {
      option.addEventListener('change', updateShippingCost);
    });

    // Function to validate and apply coupon
    function applyCoupon() {
      const enteredCode = cuponInput.value.trim().toUpperCase();
      const today = new Date();

      // Ensure couponsData is loaded
      if (!couponsData) {
        console.error('Coupons data not loaded');
        return;
      }

      // Find the coupon in the data
      const coupon = couponsData.cupones.find(c => c.codigo === enteredCode);

      if (coupon) {
        const expirationDate = new Date(coupon.vencimiento);
        if (expirationDate >= today) {
          // Coupon is valid
          cuponDiscount = coupon.descuento;
          resultCupon.textContent = 'Cupón aplicado: ' + (cuponDiscount * 100) + '% de descuento.';
          resultCupon.style.color = 'green';

          // Update the total amount
          updateTotal();
        } else {
          // Coupon is expired
          cuponDiscount = 0;
          resultCupon.textContent = 'El cupón ha expirado.';
          resultCupon.style.color = 'red';

          // Update the total amount
          updateTotal();
        }
      } else {
        // Coupon not found
        cuponDiscount = 0;
        resultCupon.textContent = 'El cupón no es válido.';
        resultCupon.style.color = 'red';

        // Update the total amount
        updateTotal();
      }
    }

    // Event listener for the Apply Coupon button
    applyCouponButton.addEventListener('click', applyCoupon);

    // **New Event Listener for Coupon Input Changes**
    cuponInput.addEventListener('input', function() {
      if (cuponInput.value.trim() === '') {
        // Coupon code is empty, reset the discount
        cuponDiscount = 0;
        cuponElement.textContent = '- $0.00';
        resultCupon.textContent = ''; // Clear any messages
        updateTotal();
      }
    });

    // Initialize the amounts on page load
    updateShippingCost();
  }
});

