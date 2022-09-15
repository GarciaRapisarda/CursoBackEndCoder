const express = require('express');
const app = express();

const server = app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const Contenedor = require('./contenedor');
const contenedor = new Contenedor();

app.get('/', (req, res) => {
    res.render('home');
}
);

app.get('/productos', (req, res) => {
    let productos = contenedor.getAll();
    res.render('productos', {productos: productos});
    }
);

app.post('/productos', (req, res) => {
    if (req.body.nombre && req.body.precio && req.body.imagen) {
        let resultado = contenedor.create(req.body);
        contenedor.saveProduct();
        res.render('productos', {productos: resultado});
    } else {
        res.send({error: 'No se pudo crear el producto'});
    }
});



