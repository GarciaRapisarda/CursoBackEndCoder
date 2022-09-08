let productos = require('./products.js');

class Contenedor {
    create = (product) => {
        let id = productos.length + 1;
        let newProduct = {
            id: id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail
}
        productos.push(newProduct);
        return id;
    }
    getById = (id) => {
        if (productos[id]) {
            return productos[id];
        } else {
            return ({error: 'Producto no encontrado'});
        }
    }
    getAll = () => {
        return productos;
    }   
    deleteById = (id) => {
        let producto = productos.find(producto => producto.id == id);
        let index = productos.indexOf(producto);
        productos.splice(index, 1);
        return producto;
    }   
    updateById = (id, product) => {
        let producto = productos.find(producto => producto.id == id);
        let index = productos.indexOf(producto);
        productos[index].title = product.title;
        productos[index].price = product.price;
        productos[index].thumbnail = product.thumbnail;
        return productos[index];
    }
}

module.exports = Contenedor;
    
