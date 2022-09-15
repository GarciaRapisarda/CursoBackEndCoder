const express = require('express');
const router = express.Router();

const Contenedor = require('../contenedor');
const contenedor = new Contenedor();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/productos', (req, res) => {
    let productos = contenedor.getAll();
    res.render('productos', {productos: productos});
    }
);

router.post('/productos', (req, res) => {
    if (req.body.nombre && req.body.precio && req.body.imagen) {
        let resultado = contenedor.create(req.body);
        contenedor.saveProduct();
        res.render('productos', {productos: resultado});       
    } else {
        res.send({error: 'No se pudo crear el producto'});
    }
});

module.exports = router;



