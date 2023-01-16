const express = require('express');
const router = express.Router();
const Manager = require('../controllers/productMongoDbManager');
const manager = new Manager();


router.get('/products', (req, res) => {
    res.render('products', { products: manager.getProducts() });
});




module.exports = router;