//GET CARS
const spiner = document.querySelector("#spinner-wrapper");
const categoryID = localStorage.getItem("catID");

const dataOfCars = async () => {
  try {
    spiner.style.display = "flex";
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`
    );

    if (!response.ok) {
      throw new Error("No hay respuesta: " + response.statusText);
    }

    const data = await response.json();
    const products = data.products;

    console.log(products);

    const container = document.getElementById("carContainer");

    products.map((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "productCar";
      productDiv.dataset.id = product.id;

      productDiv.innerHTML = `
                <img src="${product.image}" class="product-image" alt="${product.name}"/ >
                <p class="title">${product.name}</h2>
                <p class="description model">${product.description}</p>
                <p class="description">Precio: ${product.currency} ${product.cost}</p>
                <p class="description">Vendidos: ${product.soldCount}</p>
            `;

      container.appendChild(productDiv);
      productDiv.style.cursor = "pointer";
      productDiv.addEventListener("click", () => {
        localStorage.setItem("product", JSON.stringify(product));
        window.location.href = "/product-info.html";
      });
    });

    let productImage = document.querySelectorAll(".product-image");
    productImage.forEach((img) => {
      let imgSrc = img.getAttribute("src");

      img.addEventListener("mouseover", () => {
        let imgSrcSecond = imgSrc.split("_").shift() + "_2.jpg";
        img.style.opacity = 0;

        setTimeout(() => {
          img.setAttribute("src", imgSrcSecond);
          img.style.opacity = 1;
        }, 200);
      });

      img.addEventListener("mouseout", () => {
        img.style.opacity = 0;

        setTimeout(() => {
          img.setAttribute("src", imgSrc);
          img.style.opacity = 1;
        }, 200);
      });
    });

    spiner.style.display = "none";
  } catch (error) {
    console.error("Error al traer los datos", error);
  }
};

document.addEventListener(
  "DOMContentLoaded",
  dataOfCars,
  localStorage.removeItem("productId")
);
