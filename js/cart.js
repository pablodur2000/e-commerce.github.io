const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");
const orderSummary = document.getElementById("order-summary");
const noItemsDiv = document.getElementById("no-items")
function renderCart() {
    noItemsDiv.innerHTML = "";
    cartContainer.innerHTML = "";
    if (cartItems.length === 0) {
        noItemsDiv.innerHTML = `
                <div class="text-center my-6">
                    <h2 class="text-xl font-semibold text-gray-800">Su carrito está vacío</h2>
                    <p class="text-gray-600 mt-2">Para seguir comprando, navegar por las categorías en el sitio, o busque su producto.</p>
                    <a href="http://127.0.0.1:5500/categories.html" class="inline-block mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
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
                        <img src="${item.image}" alt="${item.name}" class="w-24 h-24 rounded-md object-cover">
                        <div class="flex-1 ml-4">
                            <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                            <p class="text-gray-600">${item.description}</p>
                        </div>
                        <div class="flex flex-col items-center ml-4">
                            ${item.originalCost ? `<span class="text-sm text-gray-400 line-through">UYU ${item.originalCost.toFixed(2)}</span>` : ''}
                            <span class="text-lg font-bold text-gray-800">UYU ${item.cost.toFixed(2)}</span>
                        </div>
                        <div class="flex items-center ml-4">
                            <button class="quantity-btn bg-gray-200 px-2 py-1 rounded-l-lg" onclick="updateQuantity(${index}, ${item.productCountBuy - 1})">-</button>
                            <span class="px-4">${item.productCountBuy}</span>
                            <button class="quantity-btn bg-gray-200 px-2 py-1 rounded-r-lg" onclick="updateQuantity(${index}, ${item.productCountBuy + 1})">+</button>
                        </div>
                        <button class="ml-4 text-gray-400 hover:text-red-600" onclick="removeFromCart(${index})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
    </button>
                    </div>
                `;;
            cartContainer.appendChild(card);
        });
        renderSummary();
    } 
}

function renderSummary() {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.cost * item.productCountBuy), 0);
    const taxEstimate = subtotal * 0.01;
    const orderTotal = subtotal + taxEstimate;

    orderSummary.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md border">
                <h3 class="text-xl font-semibold mb-4">Resumen de compra</h3>
                <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="text-gray-800 font-semibold">UYU ${subtotal.toFixed(2)}</span>
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
                <a href="http://127.0.0.1:5500/categories.html" class="block text-center mt-4 text-gray-600 hover:text-gray-800">Seguir comprando</a>
            </div>`;
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
}

function updateQuantity(index, quantity) {
    cartItems[index].productCountBuy = parseInt(quantity, 10);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderSummary();
}

renderCart();