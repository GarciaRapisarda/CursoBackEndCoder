const express = require('express');
const router = express.Router();

const Contenedor = require('../contenedor');
const contenedor = new Contenedor();

router.get('/', (req, res) => {
    res.render('home');
});
