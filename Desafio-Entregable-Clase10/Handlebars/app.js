const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const router = require('./routes/rutas');
const server = app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);