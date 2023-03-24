const express = require('express');
const Manager = require('../controllers/cartManager');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const data = await Manager.getCart(req.user)
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.get('/:id/products', async (req, res) => {
    let { id } = req.params;
    try {
        const data = await Manager.getCartById(id)
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.post('/', async (req, res) => {
    let { productos, email, direccionDeEnvio } = req.body;
    try {
        const data = await Manager.addCart(productos, email, direccionDeEnvio)
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});
   
router.post('/', async (req, res) => {
    let { producto, id_cart } = req.body;
    try {
        const data = await Manager.updateCart(producto, id_cart)
        res.status(200).send(data);
    } catch (err) {
        res
        .status(404)
        .send
        (err);
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
