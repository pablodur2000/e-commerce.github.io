const fs = require('fs').promises;
const path = require('path');

const getAllCatsService = async () =>{
    try {
        let result = "";
        // Construir la ruta absoluta del archivo
        const filePath = path.resolve(__dirname, '../db/cats/cat.json');
        
        // Leer el archivo
        const data = await fs.readFile(filePath, 'utf8');
        
        // Parsear el contenido a JSON
        const cats = JSON.parse(data);
        
        if(!cats){
            result = "No existen las categorias"
        }else{
            result = cats;
            console.log(result);
        }


        return result;
    } catch (error) {
        // Manejar el error si el archivo no existe
        if (error.code === 'ENOENT') {
            console.error(`Archivo no encontrado`);
            return { error: `Las categorias no existen.` }; // Devuelve un mensaje claro
        } else {
            // Si es otro tipo de error, lanzarlo
            console.error('Error al obtener las categorias:', error);
            throw error;
        }
    }
}

const getCatService = async (id) =>{
    try {
        let result = "";
        // Construir la ruta absoluta del archivo
        const filePath = path.resolve(__dirname, `../db/cats_products/${id}.json`);
        
        // Leer el archivo
        const data = await fs.readFile(filePath, 'utf8');
        
        // Parsear el contenido a JSON
        const cats = JSON.parse(data);
        
        if(!cats){
            result = "No existen las categorias"
        }else{
            result = cats;
            console.log(result);
        }

        return result;
    } catch (error) {
        // Manejar el error si el archivo no existe
        if (error.code === 'ENOENT') {
            console.error(`Archivo no encontrado para id: ${id}`);
            return { error: `La categoria con id ${id} no existe.` }; // Devuelve un mensaje claro
        } else {
            // Si es otro tipo de error, lanzarlo
            console.error('Error al obtener la categoria:', error);
            throw error;
        }
    }
}

const getProductsService = async (id) =>{
    
    try {
        // Construir la ruta absoluta del archivo
        const filePath = path.resolve(__dirname, `../db/products/${id}.json`);
        
        const data = await fs.readFile(filePath, 'utf8');   // Leer el archivo

        if(!data){
            throw new Error("No existe el producto");
        }else{
            // Parsear el contenido a JSON
            const products = JSON.parse(data);

            return products;
        }
        
    } catch (error) {
        // Manejar el error si el archivo no existe
        if (error.code === 'ENOENT') {
            console.error(`Archivo no encontrado para id: ${id}`);
            return { error: `El producto con id ${id} no existe.` }; // Devuelve un mensaje claro
        } else {
            // Si es otro tipo de error, lanzarlo
            console.error('Error al obtener el producto:', error);
            throw error;
        }
    }
}

const getProductsCommentsService = async (id) =>{
    
    try {
        // Construir la ruta absoluta del archivo
        const filePath = path.resolve(__dirname, `../db/products_comments/${id}.json`);
        
        const data = await fs.readFile(filePath, 'utf8');   // Leer el archivo

        if(!data){
            throw new Error("No existen los comentarios");
        }else{
            // Parsear el contenido a JSON
            const comments = JSON.parse(data);

            return comments;
        }
        
    } catch (error) {
        // Manejar el error si el archivo no existe
        if (error.code === 'ENOENT') {
            console.error(`Archivo no encontrado para id: ${id}`);
            return { error: `Los comentarios del producto con id ${id} no existen.` }; // Devuelve un mensaje claro
        } else {
            // Si es otro tipo de error, lanzarlo
            console.error('Error al obtener los comentarios del producto:', error);
            throw error;
        }
    }
}

module.exports = {
    getAllCatsService,
    getCatService,
    getProductsService,
    getProductsCommentsService
}