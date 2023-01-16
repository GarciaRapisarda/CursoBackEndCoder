const express = require('express');
const router = express.Router();
const Manager = require('../controllers/productMongoDbManager');
const manager = new Manager();




router.get('/products', (req, res) => {
    manager.getProducts()
        .then((productsList) => {
            return res.status(200).json(productsList);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});

router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    manager.getProduct(id)
        .then((product) => {
            return res.status(200).json(product);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});


router.post('/products', (req, res) => {
    const product = req.body;
    manager.addProduct(product)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});

router.delete('/products/:id', (req, res) => {
    manager.deleteProduct(req.params.id)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });

});





module.exports = router;