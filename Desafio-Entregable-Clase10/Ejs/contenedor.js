let productos = require("./products.js");
const fs = require("fs");

class Contenedor {
    create = (product) => {
        let newProduct = {
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        };
        productos.push(newProduct);
        return productos;
    };
    saveProduct = () => {
        fs.writeFileSync(
        "./products.js",
        `let productos = ${JSON.stringify(
            productos
        )}\n\nmodule.exports = productos;`
        );
    };
    getAll = () => {
        return productos;
    };
    
    }

module.exports = Contenedor;