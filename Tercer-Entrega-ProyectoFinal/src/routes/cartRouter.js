const express = require('express');
const Manager = require('../controllers/cartManager');
const user = require('../models/user');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const data = await Manager.getCart(user)
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.get('/:id/products', async (req, res) => {
    try {
        const data = await Manager.getById(req.params.id)
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.post('/', async (req, res) => {
    let { item, user } = req.body;
    try {
        const data = await Manager.addProduct(item, user)
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.post('/:id/products', async (req, res) => {
    let { id } = req.params;
    let { item } = req.body;
    try {
        const data = await Manager.addProduct(id, item)
        res.send(data);
        } catch (err) {
            res.status(404).send(err);
            }
            });
            
router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        const data = await Manager.deleteCart(id)
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.delete('/:id_cart/products/:id_product', async (req, res) => {
    let { id_cart, id_product } = req.params;
    try {
        const data = await Manager.deleteProduct(id_cart, id_product)
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

module.exports = router;
