const express = require('express');
const router = express.Router();

const Contenedor = require('../contenedor');
const contenedor = new Contenedor();

router.get('/', (req, res) => {
    let resultado = contenedor.getAll();
    res.send(resultado);
    });

router.get('/:id', (req, res) => {
    let resultado = contenedor.getById(req.params.id -1);
    res.send(resultado);
    });

router.post('/', (req, res) => {
    if (req.body.title && req.body.price && req.body.thumbnail) {
        let resultado = contenedor.create(req.body);
        res.send(resultado);
    } else {
        res.send({error: 'No se pudo crear el producto'});
    }
});

router.put('/:id', (req, res) => {
    if (req.body.title && req.body.price && req.body.thumbnail) {
        let resultado = contenedor.updateById(req.params.id, req.body);
        res.send(resultado);
    } else {
        res.send({error: 'No se pudo actualizar el producto'});
    }
});


router.delete('/:id', (req, res) => {
    let resultado = contenedor.deleteById(req.params.id);
    res.send(resultado);
});

module.exports = router;

