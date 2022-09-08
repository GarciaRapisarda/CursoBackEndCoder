const express = require('express');
const routerProductos = require('./routes/productos');
const app = express();

const server = app.listen(8080, () => {
    console.log('Servidor levantado desde 8080');
    server.on('error', error => console.log('Error en servidor', error));
});

app.use(express.json());
app.use('/api/productos', routerProductos);
app.use('/', express.static('public'));