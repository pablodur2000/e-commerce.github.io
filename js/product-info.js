const title = document.getElementById("title");
const price = document.getElementById("price");
const sold = document.getElementById("sold");
const nameProduct = document.getElementById("nameProduct");
const listComment = document.getElementById("listComment");
const descriptions = document.getElementById("descriptions");
const commentTitle = document.getElementById("commentTitle");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const main = document.getElementById("main");
const images = [img1, img2, img3, img4];



const productData = async () => {
  const product = localStorage.getItem("product");

  const data = JSON.parse(product);
  console.log(data);
  nameProduct.innerHTML = data.name;
  title.innerHTML = data.name;
  price.innerHTML = data.currency + " " + data.cost;
  descriptions.innerHTML = data.description;
  sold.innerHTML = "Vendidos:" + " " + data.soldCount;
  images.forEach((img, index) => {
    const _number = index + 1;
    img.src = `/e-commerce.github.io/img/prod${data.id}_${_number}.jpg`;
  });

  const response = await fetch(
    `https://japceibal.github.io/emercado-api/products_comments/${data.id}.json`
  );

  if (!response.ok) {
    throw new Error("No hay respuesta: " + response.statusText);
  }

  const dataOfComments = await response.json();
  commentTitle.innerHTML =
    "Dejaras el comentario como:" + localStorage.getItem("user");
  dataOfComments.forEach((comment) => {
    addNewComment(comment);
  });

  function generateVisualStars(rating) {
    const divStars = document.createElement("div");
    divStars.className = "rating xl:pt-2 xl:pb-2";
    divStars.id = "visualRating";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = "star-visual";
      if (i <= rating) {
        star.classList.add("filled");
      }
      divStars.appendChild(star);
    }
    return divStars;
  }

  function addNewComment(comment) {
    const li = document.createElement("li");
    li.className = "li-commentary flex justify-between gap-x-6 py-1";
    li.style.backgroundColor = "#e9e9e9";

    const divDetails = document.createElement("div");
    divDetails.className = "flex min-w-0 gap-x-4";

    const divInfo = document.createElement("div");
    divInfo.className = "min-w-0 flex-auto";

    const name = document.createElement("p");
    name.className = "text-sm font-semibold leading-6 text-gray-900";
    name.textContent = comment.user;

    const description = document.createElement("p");
    description.className = "mt-1 truncate text-xs leading-5 text-gray-500";
    description.textContent = comment.description;

    const ratingDiv = document.createElement("div");
    ratingDiv.className = "rating xl:pt-2 xl:pb-2 flex";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = i <= comment.score ? "text-yellow-500" : "text-gray-300";

      const ratingLocal = localStorage.getItem("rating");
      if (ratingLocal) {
        console.log(ratingLocal);
        star.className = i <= ratingLocal ? "text-yellow-500" : "text-gray-300";
      } else {
      }

      star.textContent = "★";
      ratingDiv.appendChild(star);
    }

    divInfo.appendChild(name);
    divInfo.appendChild(description);
    divInfo.appendChild(ratingDiv);
    divDetails.appendChild(divInfo);

    const divExtra = document.createElement("div");
    divExtra.className = "hidden shrink-0 sm:flex sm:flex-col sm:items-end";

    const user = document.createElement("p");
    user.className = "text-sm leading-6 text-gray-900";
    user.textContent = comment.user;

    const timeInfo = document.createElement("p");
    timeInfo.className = "mt-1 text-xs leading-5 text-gray-500";
    timeInfo.innerHTML = `Fecha <time datetime="${comment.dateTime}">${new Date(
      comment.dateTime
    ).toLocaleDateString()}</time>`;

    divExtra.appendChild(user);
    divExtra.appendChild(timeInfo);
    li.appendChild(divDetails);
    li.appendChild(divExtra);

    listComment.appendChild(li);
  }

  /*
  function addNewComment(comment) {
    const li = document.createElement("li");
    li.className = "li-commentary flex justify-between gap-x-6";
    li.style.backgroundColor = '#e9e9e9';

    const divDetails = document.createElement("div");
    divDetails.className = "flex min-w-0 gap-x-4";

    const divInfo = document.createElement("div");
    divInfo.className = "min-w-0 flex-auto";

    const stars = generateVisualStars(comment.rating);

    const user = document.createElement("p");
    user.className = "text-sm leading-6 text-gray-900";
    user.textContent = comment.user;

    const description = document.createElement("p");
    description.className = "mt-1 truncate text-xs leading-5 text-gray-500";
    description.textContent = comment.description;                                        //SACAR TRES PUNTITOS EN COMENTARIOS

    divInfo.appendChild(user);
    divInfo.appendChild(description);
    divDetails.appendChild(divInfo);
    divInfo.appendChild(stars);

    const divExtra = document.createElement("div");
    divExtra.className = "hidden shrink-0 sm:flex sm:flex-col sm:items-end";

    

    const timeInfo = document.createElement("p");
    timeInfo.className = "mt-1 text-xs leading-5 text-gray-500";
    timeInfo.innerHTML = `Fecha <time datetime="${comment.dateTime}">${new Date(
      comment.dateTime
    ).toLocaleDateString()}</time>`;

    divExtra.appendChild(user);
    divExtra.appendChild(timeInfo);
    li.appendChild(divDetails);
    li.appendChild(divExtra);

    listComment.prepend(li);
  }*/

  document
    .getElementById("submitComment")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const inputComment = document.getElementById("inputComment").value;
      const radioButtons = document.querySelectorAll('input[name="rate"]');
      const stars = document.querySelectorAll("#visualRating .star-visual");
      let rankingSeleccionado = null;

      radioButtons.forEach((radio) => {
        if (radio.checked) {
          rankingSeleccionado = radio.value;
        }
      });

      if (rankingSeleccionado) {
        stars.forEach((star, index) => {
          if (index < parseInt(rankingSeleccionado)) {
            star.classList.add("filled");
          } else {
            star.classList.remove("filled");
          }
        });
      } else {
        alert("Por favor selecciona una calificación.");
      }
      if (inputComment.trim() === "") {
        alert("Por favor, escribe un comentario antes de enviar.");
        return;
      }

      const newComment = {
        user: localStorage.getItem("user") || "Usuario Anónimo",
        description: inputComment,
        dateTime: new Date().toISOString(),
        rating: rankingSeleccionado,
      };
      addNewComment(newComment);

      document.getElementById("inputComment").value = "";
    });
};

//../e-commerce.github.io

document.addEventListener("DOMContentLoaded", productData);
//e-commerce.github.io/

const rateInputs = document.querySelectorAll(".rate-input");

// Agregamos un event listener a cada uno
rateInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    // Guardamos el valor seleccionado en localStorage
    localStorage.setItem("rating", event.target.value);
    console.log(`Rating guardado: ${event.target.value}`);
  });
});

/**ACTIVAR DESACTIVAR DARK MODE */

const toggleSwitch = document.querySelector(".checkbox");
const mainElement = document.getElementById("main");
const textElements = document.querySelectorAll(
  "p:not(footer p), h1:not(footer h1), h2:not(footer h2), h3:not(footer h3), h4:not(footer h4), h5:not(footer h5), h6:not(footer h6), span:not(footer span), small:not(footer small), a:not(footer a)"
);
const imgsProductsDetails = document.querySelectorAll('.product-details-imgs');

 
function enableDarkMode() {
  const similarProductsP = document.querySelectorAll('.productCar p');
  imgsProductsDetails.forEach(img => {
    img.style.filter = "invert()";
  });
  similarProductsP.forEach(p => {
    p.style.color = "white";
  })
  mainElement.style.backgroundColor = "#2b2b2b";
  textElements.forEach(function (element) {
    element.style.color = "white";
  });
  localStorage.setItem("darkMode", "enabled");
}

function disableDarkMode() {
  const similarProductsP = document.querySelectorAll('.productCar p');
  imgsProductsDetails.forEach(img => {
    img.style.filter = "none";
  });
  similarProductsP.forEach(p => {
    p.style.color = "black";
  });
  mainElement.style.backgroundColor = "white";
  textElements.forEach(function (element) {
    element.style.color = "#2b2b2b";
  });
  localStorage.setItem("darkMode", "disabled");
}

const darkMode = localStorage.getItem("darkMode");

if (darkMode === "enabled") {
  toggleSwitch.checked = true;
  enableDarkMode();
} else {
  toggleSwitch.checked = false;
  disableDarkMode();
}

toggleSwitch.addEventListener("change", function () {
  if (this.checked) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});


//-------------------------------------------------------------------------------------------BUY AND ADD TO CART
const buttonsBuy = document.querySelectorAll('.buttons-buy');

buttonsBuy.forEach(button => {
  button.addEventListener('click', () =>{
    let product = JSON.parse(localStorage.getItem("product"));
    let cart = JSON.parse(localStorage.getItem("cart"));
  
    const productCountBuy = document.getElementById("input-quantity").value;

    product.productCountBuy = parseInt(productCountBuy);

    if(!cart){
      cart = [product];
      localStorage.setItem("cart", JSON.stringify(cart));
    }else{
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    

    if(!button.classList.contains("add-to-cart")){
      window.location.href = "/cart.html"
    }
  });
});
