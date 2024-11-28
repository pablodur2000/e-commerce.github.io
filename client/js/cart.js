const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");
const orderSummary = document.getElementById("order-summary");
const noItemsDiv = document.getElementById("no-items");

let oneItemWithUSDPrice = false;
let currencyCart = "UYU";
let priceConverted;

const convertUyuToUsd =  (price) =>{
  const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_v0H2LFSA40iUuqsoqe47BzEWIPuHcVNiH9DawmK3`;
  priceConverted = '';
  try {
    /*const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la solicitud");

    const data = await response.json();
    const tasaCambio = data.data.UYU.value;


    console.log(`1 UYU equivale a ${tasaCambio} USD`);
*/
    priceConverted = price / 41;
    console.log("PRECIO DENTRO DE ASYN: " + priceConverted);
    
  } catch (error) {
    console.error("Error al obtener el tipo de cambio:", error);
  }

};

for (let i = 0; i < cartItems.length; i++) {      //for para detectar si hay al menos un producto cen dolares en el carrito
  if (cartItems[i].currency === "USD") {
    console.log("SI hay item en USD")
    oneItemWithUSDPrice = true;         //si si hay, setea oneItemWithUSDPrice
    break; // Detenemos el for aquí
  }
}


function renderCart() {

  if(oneItemWithUSDPrice === true){ //antes de renderizar el cart, pregunta que currency (USD o UYU) hay que poner
    currencyCart = "USD";   //si hay al menos un producto cen dolares en el carrito
    localStorage.setItem("curencyPay", "USD");
  }else{
    currencyCart = "UYU";   //s NOi hay al menos un producto cen dolares en el carrito  
    localStorage.setItem("curencyPay", "UYU");
  }

  noItemsDiv.innerHTML = "";
  cartContainer.innerHTML = "";
  if (cartItems.length === 0) {
    noItemsDiv.innerHTML = `
            <div class="text-center my-6">
                <h2 class="text-xl font-semibold text-gray-800">Su carrito está vacío</h2>
                <p class="text-gray-600 mt-2">Para seguir comprando, navegue por las categorías en el sitio, o busque su producto.</p>
                <a href="categories.html" class="inline-block mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
                    SEGUIR COMPRANDO
                </a>
            </div>
        `;
    orderSummary.innerHTML = "";
    return;
  } else {
    cartItems.forEach((item, index) => {

      let priceProduct;
      if(item.isPriceConverted === true && oneItemWithUSDPrice === true){     //seleccionamos que precio usar en el render dependiendo si el producto tiene el precio convertido y si hay al menos un producto en dolares en el cart
        priceProduct = item.costUSD;      //Si si cumple, que use el precio en USD
      }else{
        priceProduct = item.cost;     //de lo contrario, el precio en UYU
      }

      const card = document.createElement("div");
      card.innerHTML = `
                <div class="flex items-center bg-white p-6 rounded-lg shadow-md border">
                    <img src="${item.image}" alt="${
        item.name
      }" class="w-24 h-24 rounded-md object-cover">
                    <div class="flex-1 ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">${
                          item.name
                        }</h3>
                        <p class="text-gray-600">${item.description}</p>
                    </div>
                    <div class="flex flex-col items-center ml-4">
                        ${
                          item.originalCost
                            ? `<span class="text-sm text-gray-400 line-through">${currencyCart} ${priceProduct.toFixed(
                                2
                              )}</span>`
                            : ""
                        }
                        <span class="text-lg font-bold text-gray-800">${currencyCart} ${priceProduct.toFixed(2)}</span>
                    </div>
                    <div class="flex items-center ml-4">
                        <button class="quantity-btn bg-gray-200 px-2 py-1 rounded-l-lg" onclick="updateQuantity(${index}, ${
        item.productCountBuy - 1
      })" ${item.productCountBuy}>-</button>
                        <span class="px-4">${item.productCountBuy}</span>
                        <button class="quantity-btn bg-gray-200 px-2 py-1 rounded-r-lg" onclick="updateQuantity(${index}, ${
        item.productCountBuy + 1
      })">+</button>
                    </div>
                    <button class="ml-4 text-gray-400 hover:text-red-600" onclick="removeFromCart(${index})">
                        <!-- Icono de eliminar -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h12M9 6v12M15 6v12M3 6h18M4 6l1 14c0 .55.45 1 1 1h12c.55 0 1-.45 1-1l1-14" />
                        </svg>
                    </button>
                </div>
            `;
      cartContainer.appendChild(card);
    });
    renderSummary();
  }
}



function renderSummary() {

const subtotal = cartItems.reduce(
  (acc, item) => acc + (item.isPriceConverted  && oneItemWithUSDPrice ? item.costUSD : item.cost) * item.productCountBuy,   //checkea si el precio del item es convertido y si existe un item con USD en el carrito
  0
);

const taxEstimate = oneItemWithUSDPrice ? subtotal * 0.01 : subtotal * 0.1; 
localStorage.setItem("taxEstimated", taxEstimate.toFixed(2)); 

const orderTotal = subtotal + taxEstimate;

orderSummary.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-md border">
          <h3 class="text-xl font-semibold mb-4">Resumen de compra</h3>
          <div class="flex justify-between mb-2">
              <span class="text-gray-600">Subtotal</span>
              <span class="text-gray-800 font-semibold">${currencyCart} ${subtotal.toFixed(
                2
              )}</span>
          </div>
          <div class="flex justify-between mb-4">
              <span class="text-gray-600">Impuesto estimado</span>
              <span class="text-gray-800">${currencyCart} ${taxEstimate.toFixed(2)}</span>
          </div>
          <div class="flex justify-between text-lg font-semibold border-t pt-4">
              <span>Total</span>
              <span>${currencyCart} ${orderTotal.toFixed(2)}</span>
          </div>
          <a><button style="display: flex; justify-content: center;" class="w-full mt-6 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors" onclick="startPay()" id="start-pay">Iniciar pago</button></a>
          <a href="categories.html" class="block text-center mt-4 text-gray-600 hover:text-gray-800">Seguir comprando</a>
      </div>`;
}

function removeFromCart(index) { //href="e-commerce.github.io/pay.html"
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCount();
  renderCart();
}

//lo que se hace es volver a renderizar el carro para llamando a la funcion renderCart(),
//se evita que que quantity sea menor a 1, que en ese caso si lo es, se borra del carrito.
//Sino es menor a 1 se actualiza en el array del carrito segun quantity
//se guardan los cambios en el localstorage y se renderiza el cart.

function updateQuantity(index, quantity) {
  quantity = Math.round(quantity);

  if (quantity < 1) {
    cartItems.splice(index, 1);
  } else {
    cartItems[index].productCountBuy = quantity;
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));

  updateCartCount();
  renderCart();
}

renderCart();



function startPay() {

  const button = document.getElementById("start-pay");

  button.innerHTML = `<img src="img/spinner-gif.webp" style="height: 30px;" alt="">`;

  setTimeout(() => {
    button.innerHTML = 'Ingresando...'
    Swal.fire({
      icon: 'success',
      title: 'Conexión segura para el pago.',
      text: 'Redireccionando...',
      showConfirmButton: false,
      timer: 3000 // Tiempo en milisegundos antes de que la alerta se cierre automáticamente
    });
    setTimeout(() => {
      window.location.href = '/e-commerce.github.io/client/pay.html'
    }, 2000);
  }, 1400);
}
