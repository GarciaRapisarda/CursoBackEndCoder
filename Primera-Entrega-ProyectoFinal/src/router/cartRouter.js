const express = require('express');
const Manager = require('../controllers/cartManager');
const router = express.Router();
const manager = new Manager();
 
router.post('/', (req, res) => {
    manager.createCart(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

router.post('/:id/productos', (req, res) => {
    manager.addProductToCart(req.params.id, req.body)
        .then((data) => {
            res.send(data);
            })
            .catch((err) => {
                res.status(404).send(err);
                });
                });
                
router.delete('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({ error: 'El id debe ser un número' });
    } else {
        manager.deleteCart(req.params.id)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    }

});
router.delete('/:id/productos/:productId', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({ error: 'El id debe ser un número' });
    } else {
        manager.deleteProductFromCart(req.params.id, req.params.productId)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    }
});

module.exports = router;