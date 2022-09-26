const fs = require('fs');
const express = require('express');
const http = require('http');
const { engine } = require('express-handlebars');
const Contenedor = require('../contenedor');
const Handlebars = require('handlebars');

let path_file = './productos.json';
async function get_products (path_file) {
    const container = new Contenedor(path_file);
    const prods = await container.getAll();
    return prods;
}

async function post_product (path_file, newProduct) {
    const container = new Contenedor(path_file);
    const prod = await container.save(newProduct);
    return prod;
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname);
app.set('view engine', 'hbs');

app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: false,
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
}));


Handlebars.registerPartial('nav', fs.readFileSync(__dirname + '/partials/nav.hbs', 'utf8'));
Handlebars.registerPartial('products', fs.readFileSync(__dirname + '/partials/products.hbs', 'utf8'));
Handlebars.registerPartial('chat', fs.readFileSync(__dirname + '/partials/chat.hbs', 'utf8'));

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

const today = new Date();
const time = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

const messages = [
    {
        email: "pastillaAzul5",
        datemessage: time,
        text: "Hola, soy el administrador del chat"
    },
];

get_products().then(products_stream => {
    io.on('connection', (socket) => {
    io.sockets.emit("messageBack", messages)
    io.sockets.emit("messageBackProds", products_stream)
    
    socket.on ("messageFront", (data) => {
        messages.push(data);
        io.sockets.emit("messageBack", messages)
        })
        
    socket.on ("messageFrontProds", (data) => {
        post_product(path_file, data);
        products_stream.push(data);
        io.sockets.emit("messageBackProds", products_stream)
        })
        })
    })
    
    const router_products = express.Router();

    app.get('/', (req, res) => {
        res.render('index', {})
        });
    
    app.get('/formulario', async (req, res) => {
        const products = await get_products(path_file);
        res.render('form', {
            products, 
            exist_products: products.length > 0
        })
        });
    
    router_products.get('/', async (req, res) => {
        const products = await get_products(path_file);
        res.render('products', {
            products,
            exist_products: products.length > 0
         })
         });

    router_products.post('/', async (req, res) => {
        const { body } = req;
        await post_product(path_file, body);
    });

    app.get('/chat', (req, res) => {
        res.render('chat', {})
        });

    app.use('/productos', router_products);

    const PORT = 8080;
    server.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${PORT}`);
    });
