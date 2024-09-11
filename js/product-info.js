const title = document.getElementById("title");
const price = document.getElementById("price");
const sold = document.getElementById("sold");
const nameProduct = document.getElementById("nameProduct");
const descriptions = document.getElementById("descriptions");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const images = [img1, img2, img3, img4];

const productData = () => {
  const product = localStorage.getItem("product");

  const data = JSON.parse(product);
  nameProduct.innerHTML = data.name
  title.innerHTML = data.name;
  price.innerHTML = data.currency + " " + data.cost;
  descriptions.innerHTML = data.description;
  sold.innerHTML = "Vendidos" + " " + data.soldCount;
  images.forEach((img, index) => {
    const _number = index + 1;
    img.src = `../e-commerce.github.io/img/prod${data.id}_${_number}.jpg`;
  });
};

document.addEventListener("DOMContentLoaded", productData);
