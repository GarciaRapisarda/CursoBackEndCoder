const {Router} = require('express');
const mongoDbManager = require('../controllers/productMongoDbManager');

const routes = Router();

routes.get('/products', (req, res) => {
    mongoDbManager.getProducts()
        .then((productList) => {
            return res.status(200).json(productList);
        })
        .catch((err) => {
            return res.status(500).json({error: err});
        });
});

module.exports = routes;