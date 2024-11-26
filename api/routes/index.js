const express = require('express');
const { getAllCats, getCats, getProducts, getProductComments } = require('../controllers');
const router = express.Router();

//const { authenticateUser } = require('../middlewares')

router.get('/cats', getAllCats);

router.get('/cat/:id', getCats);

router.get('/products/:id', getProducts);

router.get('/productsComments/:id', getProductComments);

module.exports = { router };