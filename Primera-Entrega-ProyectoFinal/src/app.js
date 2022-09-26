const express = require('express');
const productRouter = require('./router/productRouter');
const cartRouter = require('./router/cartRouter');
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => { 
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
