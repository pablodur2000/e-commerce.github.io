let minPrice = undefined;
let maxPrice = undefined;
//GET CARS
const spiner = document.querySelector('#spinner-wrapper');
const categoryID = localStorage.getItem("catID");

const dataOfCars = async () => {
    try {
        spiner.style.display = 'flex';
        const response = await fetch(`https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`);

        if (!response.ok) {
            throw new Error('No hay respuesta: ' + response.statusText);
        };

        const data = await response.json();
        const products = data.products;

        console.log(products);

        const container = document.getElementById('carContainer');
               // limpio el contenedor antes de hacer el filtro porque esta funcion ya se ejecuto al cargar el documento 
                container.innerHTML = ''
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
                
                    container.appendChild(productDiv);
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

                spiner.style.display = 'none';
    
    } catch (error) {
        console.error('Error al traer los datos', error);
    };
}
document.addEventListener('DOMContentLoaded', dataOfCars);

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

    dataOfCars();
});
document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;
    dataOfCars();
});

