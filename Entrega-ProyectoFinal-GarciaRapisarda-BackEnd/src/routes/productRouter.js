const express = require('express');
const router = express.Router();
const Manager = require('../controllers/productMongoDbManager');


router.get('/', async (req, res) => {
    try {
        const data = await Manager.getProducts()
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send({message: 'No hay productos'});
    }
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        const data = await Manager.getProduct(id)
        if (!data) {
            res.status(404).send({message: 'El producto no existe'});
        }
        res.send(data);
    } catch (err) {
        res.status(404).send({message: 'El producto no existe'});
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await Manager.createProduct(req.body)
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send({message: 'No se pudo crear el producto'});
    }
});

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        const data = await Manager.deleteProduct(id)
        res.send(data);
    } catch (err) {
        res.status(404).send({message: 'El producto no existe'});
    }
});

router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let { item } = req.body;
    try {
        const data = await Manager.updateProduct(id, item)
        res.send(data);
    } catch (err) {
        res.status(404).send({message: 'No se pudo actualizar el producto'});
    }
});

router.get('/categoria/:tipo', async (req, res) => {
    let { tipo } = req.params;
    try {
        const data = await Manager.getProductsByCategory(tipo);
        res.send(data);
    } catch (err) {
        res.status(404).send({message: 'categoria no encontrada'});
    }
});

module.exports = router;