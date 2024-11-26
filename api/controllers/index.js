const { getAllCatsService, getCatService, getProductsService, getProductsCommentsService } = require("../services")


const getAllCats = async (req, res) => {
    try {
        const result = await getAllCatsService();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: "error en el servidor ", error})
    }
}

const getCats = async (req, res) => {
    const { id } = req.params;
    try {
        
        const result = await getCatService(id);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: "error en el servidor ", error})
    }
}

const getProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getProductsService(id);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: "error en el servidor ", error})
    }
}

const getProductComments = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getProductsCommentsService(id);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: "error en el servidor ", error})
    }
}



module.exports = {
    getAllCats,
    getCats,
    getProducts,
    getProductComments
}