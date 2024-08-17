//GET CARS

const dataOfCars = async () => {
    try {
        const response = await fetch('https://japceibal.github.io/emercado-api/cats_products/101.json');

        if (!response.ok) {
            throw new Error('No hay respuesta: ' + response.statusText);
        }

        const data = await response.json();
        const products = data.products;

        console.log(products)

        const container = document.getElementById('carContainer');

        products.map(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'productCar';

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}"/ >
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Precio: ${product.currency} ${product.cost}</p>
                <p>Vendidos: ${product.soldCount}</p>
            `;

            container.appendChild(productDiv);
        });

    } catch (error) {
        console.error('Error al traer los datos', error);
    }
}

document.addEventListener('DOMContentLoaded', dataOfCars);
