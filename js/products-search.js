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

   

