let productos = require("./productos.json");
const fs = require("fs");

class Contenedor {
    createProduct(producto) {
        let newProduct = {
            id: producto.id,
            nombre: producto.title, 
            precio: producto.price,
            imagen: producto.thumbnail,
        };
        productos.push(newProduct);
        return productos;
    }
       saveProduct(producto) {
        let id = productos.length + 1;
        producto.id = id;
        this.createProduct(producto);
        return id;
    }
    getAll = () => {
        return productos;
    };
    
    }

module.exports = Contenedor;