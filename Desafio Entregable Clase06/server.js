const express = require('express');
const Contenedor = require('./Contenedor.js');
const fs = require('fs');

const productos = new Contenedor('./productos.txt');

productos.init();

const server = express();

const servidor = server.listen(8080, () => {
    console.log('Servidor levantado desde 8080');
    servidor.on('error', error => console.log('Error en servidor', error));
});

//Persistencia desde el servidor

server.get('/productosDesdeServidor', (req, res) => {
    res.send(productos.getAll());
});

server.get('/productosDesdeServidorRandom', (req, res) => {
    let array = productos.getAll();
    let random = Math.floor(Math.random() * array.length);
    res.send(array[random]);
    });

server.get('/productosDesdeServidor/:id', (req, res) => {
    let id = req.params.id;
    res.send(productos.getById(id));
});

//Persistencia de datos en memoria
const arreglo = [
    { id:1,
      producto: 'Coca Cola',
      precio: 10
    },
    { id:2,
        producto: 'Pepsi',
        precio: 15,
    },
    { id:3,
        producto: 'Fanta',
        precio: 20,
    }
];


server.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor');
});

server.get('/productos', (req, res) => {
    res.send(arreglo);
});

server.get('/productoRandom', (req, res) => {
    res.send(
        arreglo[Math.floor(Math.random() * arreglo.length)]

    );
});

server.get('/producto/:id', (req, res) => {
    const id = req.params.id;
    const producto = arreglo.find(p => p.id == id);
    res.send(producto);
});



