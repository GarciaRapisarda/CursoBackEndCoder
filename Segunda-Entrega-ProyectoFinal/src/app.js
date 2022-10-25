const express = require('express');
const routes = require('./router/productRouterMongo');
const carritosRouterFireStore = require('./router/carritosRouterFireStore');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)
app.use('/carritos', carritosRouterFireStore);

module.exports = app;