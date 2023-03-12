const express = require('express');
const router = express.Router();
const Manager = require('../controllers/productMongoDbManager');


router.get('/', async (req, res) => {
    try {
        const data = await Manager.getProducts()
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        const data = await Manager.getProduct(id)
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await Manager.createProduct(req.body)
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        const data = await Manager.deleteProduct(id)
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let product = req.body;
    try {
        const data = await Manager.updateProduct(id, product)
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

module.exports = router;