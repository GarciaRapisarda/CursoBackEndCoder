const express = require('express');
const {Server} = require('socket.io');
const handlebars = require('express-handlebars');
const router = require('./routes/rutas');
const app = express();
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server levantado en el puerto ${PORT}`))
const io = new Server(server);
app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/content', express.static('./public'));

app.use('/', router);
let historial = require('./chat.json');
let productos = require('./products.js');
io.on('connection', socket => {
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    socket.emit('listaProductos', productos);
    socket.on('producto', (producto) => {
        productos.push(producto);
        io.emit('listaProductos', productos);
    });
    socket.on('mensaje', (data) => {
        console.log(data);
        historial.push(data);
        io.emit('historial', historial);
        console.log(historial);
    });
});

       