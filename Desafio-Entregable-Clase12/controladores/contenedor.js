let productos = require("../products.js");
const fs = require("fs");

class Contenedor {
    create = (product) => {
        let id
        if (productos.length === 0) id = 1
        else id = productos[productos.length-1].id+1
        product.price = parseInt(product.price)
        product = {
            id,
            ...product
        }
        productos.push(product)
        return productos
    }

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