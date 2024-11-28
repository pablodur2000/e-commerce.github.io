function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  let totalCount = 0;

  for (let i = 0; i < cartItems.length; i++) {
    totalCount += cartItems[i].productCountBuy;
  }
  
  const cartLink = document.getElementById("cart-link");

  if (cartLink) {
    let existingBadge = cartLink.querySelector(".cart-count-badge");
    if (existingBadge) {
      existingBadge.remove();
    }

    if (totalCount > 0) {
      let badge = document.createElement("span");
      badge.className =
        "cart-count-badge inline-block ml-1 px-2 py-1 text-xs font-bold leading-none text-white bg-black rounded-full";
      badge.textContent = totalCount;
      cartLink.appendChild(badge);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});
