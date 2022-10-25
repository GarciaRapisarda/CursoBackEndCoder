const { Router } = require('express');
const mongoDbManager = require('../controllers/productMongoDbManager');


const routes = Router();

routes.get('/health', (req, res) => {
    return res.status(200).json({ status: 'OK' });
});
routes.get('/products', (req, res) => {
    mongoDbManager.getProducts()
        .then((productList) => {
            return res.status(200).json(productList);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});

routes.get('/products/:id', (req, res) => {
    const { id } = req.params;
    mongoDbManager.getProduct(id)
        .then((product) => {
            return res.status(200).json(product);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});

routes.post('/products', (req, res) => {
    const product = req.body;
    mongoDbManager.addProduct(product)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});

routes.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = req.body;
    mongoDbManager.updateProduct(id, product)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});

routes.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    mongoDbManager.deleteProduct(id)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});






module.exports = routes;