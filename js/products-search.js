    let input = document.getElementById('inputSearch');

    //agregamos un evento que escucha cuando se escribe en la barra de busqueda

    input.addEventListener('input', () => {
        
        // Seleccionamos los productos con clase productCar y lo convertimos a minusculas
        const productDivs = document.querySelectorAll('.productCar');
        const inputValue = input.value.toLowerCase();
        
        // Iteramos por cada producto para mostrar u ocultar según el filtro

        productDivs.forEach(product => {
            const titulo = product.querySelector('.title').textContent.toLowerCase(); //seleccionamos el titulo y convertimos a minusculas
            
            if (titulo.includes(inputValue)) { //si el titulo incluye el texto escrito en la barra de busqueda, se muestra el producto
                product.style.display = 'block';
            } else {
                product.style.display = 'none'; //oculta el producto
            }
        });
    });

    //funcion para obtener los datos de la api
    const dataOfProducts = async () => {
        try {
            const response = await fetch(`https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`)
            if (!response.ok) {
                throw new Error('No hay respuesta: ' + response.statusText); //verificamos si hubo respuesta
            }

            const data = await response.json(); //convertimos la respuesta a json para obtener los productos


            const carContainer = document.getElementById('carContainer'); //seleccionamos el contenedor donde se mostraran los productos

            // Iteramos por los productos y los añadimos al contenedor
            dataSorted.forEach(product => {
                const productDiv = document.createElement('div');
               ;
                carContainer.appendChild(productDiv); //ageregamos el div del producto al contenedor principal
            });
        } catch (error) {
            console.error('Error al cargar los productos:', error); //capturamos cualquier error que pueda ocurrir durante el fetch
        }
    };

    // Cargar los productos cuando el DOM esté listo
    document.addEventListener("DOMContentLoaded", dataOfProducts);


    console.log(carContainer);
   

