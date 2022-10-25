const express = require('express');
const routes = require('./router/productRouterMongo');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)

module.exports = app;