let minPrice = undefined;
let maxPrice = undefined;
//GET CARS
const spiner = document.querySelector("#spinner-wrapper");
const categoryID = localStorage.getItem("catID");

let currentProductsArray = [];

const ORDER_ASC_BY_PRICE = "ASC_PRICE";
const ORDER_DESC_BY_PRICE = "DESC_PRICE";
const ORDER_DESC_BY_RELEVANCE = "DESC_RELEVANCE";


const fetchProducts = async () => {
    try {
        spiner.style.display = 'flex';
        const response = await fetch(`https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`);

         if (!response.ok) {
            throw new Error('No hay respuesta: ' + response.statusText);
        }

        const data = await response.json();
        currentProductsArray = data.products;

        console.log(currentProductsArray);

        showProducts(currentProductsArray);
      
        spiner.style.display = 'none';
    } catch (error) {
        console.error('Error al traer los datos', error);
    }
}

const showProducts = (products) => {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    const currentProduct = JSON.parse(localStorage.getItem("product"));   //Current product from local storage

    products.filter(product => {
        if (minPrice === undefined && maxPrice === undefined) {
            return true;
        }
        return (
            (minPrice === undefined || parseInt(product.cost) >= minPrice) &&
            (maxPrice === undefined || parseInt(product.cost) <= maxPrice)
        );
    }).forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'productCar';

        productDiv.innerHTML = `
            <img src="${product.image}" class="product-image" alt="${product.name}"/>
            <p class="title">${product.name}</p>
            <p class="description model">${product.description}</p>
            <p class="description">Precio: ${product.currency} ${product.cost}</p>
            <p class="description">Vendidos: ${product.soldCount}</p>
        `;

        if (window.location.href.includes("/product-info.html")){   //if the current html is product-info do:
            if (!(product.id == currentProduct.id)){                //check that the current product id and the product to append id are different 
                document.getElementById("p-similar-products").innerHTML = '';
                container.appendChild(productDiv);
            }
        }else{
            container.appendChild(productDiv);                      //if the current html is products.html, add the products without filter
        }

        productDiv.style.cursor = "pointer";
        productDiv.addEventListener("click", () => {
          localStorage.setItem("product", JSON.stringify(product));
          if (window.location.hostname !== 'pablodur2000.github.io'){
              window.location.href = "/e-commerce.github.io/product-info.html";
        } else {
              window.location.href = "/e-commerce.github.io/product-info.html";
          }
        });
    });

    let productImage = document.querySelectorAll('.product-image');
    productImage.forEach(img => {
        let imgSrc = img.getAttribute('src');

        img.addEventListener('mouseover', () => {
            let imgSrcSecond = imgSrc.split("_").shift() + "_2.jpg";
            img.style.opacity = 0;

            setTimeout(() => {
                img.setAttribute("src", imgSrcSecond);
                img.style.opacity = 1;
            }, 200); 
        });

        img.addEventListener('mouseout', () => {
            img.style.opacity = 0;

            setTimeout(() => {
                img.setAttribute("src", imgSrc);
                img.style.opacity = 1;
            }, 200); 
        });
    });
}

document.addEventListener('DOMContentLoaded', fetchProducts);

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minPrice = document.getElementById("rangeFilterPriceMin").value;
    maxPrice = document.getElementById("rangeFilterPriceMax").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }

    showProducts(currentProductsArray);
});
document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;
    showProducts(currentProductsArray);
});

const sortProducts = (criteria, productsArray) => {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = productsArray.sort((a, b) => a.cost - b.cost);
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = productsArray.sort((a, b) => b.cost - a.cost);
    } else if (criteria === ORDER_DESC_BY_RELEVANCE) {
        result = productsArray.sort((a, b) => b.soldCount - a.soldCount);
    }
    return result;
}

const sortAndShowProducts = (sortCriteria) => {
    currentSortCriteria = sortCriteria;
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(currentProductsArray);
}

const dropdown = document.getElementById('sortOptions');

dropdown.addEventListener('change', function(e) {
    const selectedValue = e.target.value;

    if (selectedValue === 'price-asc') {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    } else if (selectedValue === 'price-desc') {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    } else if (selectedValue === 'relevance') {
        sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
    }
});

document.addEventListener(
  "DOMContentLoaded",
  fetchProducts,
  localStorage.removeItem("productId")
);