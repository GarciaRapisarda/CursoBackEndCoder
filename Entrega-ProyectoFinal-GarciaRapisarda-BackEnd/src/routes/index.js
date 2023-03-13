/* const express = require('express');
const router = express.Router();

const productRouter = require('./productRouter')
const logRouter = require('./logRouter')
const chatRouter = require('./chatRouter')
const cartRouter = require('./cartRouter')
const infoRouter = require('./infoRouter')
const apiRandomsRouter = require('./apiRandomsRouter')

const products = productRouter();
const logs = logRouter();
const chat = chatRouter();
const cart = cartRouter();
const info = infoRouter();
const apiRandoms = apiRandomsRouter();

router.use('/products', products);
router.use('/', logs);
router.use('/chat', chat);
router.use('/cart', cart);
router.use('/info', info);
router.use('/api/randoms', apiRandoms);

module.exports = router; */