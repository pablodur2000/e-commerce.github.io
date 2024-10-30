const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");
const orderSummary = document.getElementById("order-summary");
const noItemsDiv = document.getElementById("no-items");

function renderCart() {
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
                            ? `<span class="text-sm text-gray-400 line-through">UYU ${item.originalCost.toFixed(
                                2
                              )}</span>`
                            : ""
                        }
                        <span class="text-lg font-bold text-gray-800">UYU ${item.cost.toFixed(
                          2
                        )}</span>
                    </div>
                    <div class="flex items-center ml-4">
                        <button class="quantity-btn bg-gray-200 px-2 py-1 rounded-l-lg" onclick="updateQuantity(${index}, ${
        item.productCountBuy - 1
      })" ${item.productCountBuy <= 1 ? "disabled" : ""}>-</button>
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
    (acc, item) => acc + item.cost * item.productCountBuy,
    0
  );
  const taxEstimate = subtotal * 0.01;
  const orderTotal = subtotal + taxEstimate;

  orderSummary.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md border">
            <h3 class="text-xl font-semibold mb-4">Resumen de compra</h3>
            <div class="flex justify-between mb-2">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-800 font-semibold">UYU ${subtotal.toFixed(
                  2
                )}</span>
            </div>
            <div class="flex justify-between mb-4">
                <span class="text-gray-600">Impuesto estimado</span>
                <span class="text-gray-800">UYU ${taxEstimate.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-lg font-semibold border-t pt-4">
                <span>Total</span>
                <span>UYU ${orderTotal.toFixed(2)}</span>
            </div>
            <button class="w-full mt-6 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors">Iniciar pago</button>
            <a href="categories.html" class="block text-center mt-4 text-gray-600 hover:text-gray-800">Seguir comprando</a>
        </div>`;
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
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


  renderCart();
}

renderCart();
