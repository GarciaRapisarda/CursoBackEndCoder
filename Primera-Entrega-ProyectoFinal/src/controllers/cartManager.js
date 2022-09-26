const fs = require('fs');

const cartFilePath = './src/data/cart.json';

class CartManager {
     createCart() { 
         return new Promise((resolve, reject) => {
             fs.readFile(cartFilePath, (err, data) => {
                 if (err) {
                     reject(err);
                 } else {
                     const cart = JSON.parse(data);
                     cart.push({ id: cart.length + 1, timestamp: Date.now(), products: [] });
                     fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2), (err) => {
                         if (err) {
                             reject(err);
                         } else {
                             resolve(cart);
                         }
                     });
                 }
             });
         });
     }
     deleteCart = async (id) => {
            if (!id) return { status: "error", message: "Id no encontrado" };
            if (fs.existsSync(cartFilePath)) {
                let data = await fs.promises.readFile(cartFilePath, 'utf-8');
                let carts = JSON.parse(data);
                let index = carts.findIndex(cart => cart.id == id);
                if (index > -1) {
                    carts.splice(index, 1);
                    await fs.promises.writeFile(cartFilePath, JSON.stringify(carts, null, '\t'));
                    return { status: "success", data: carts };
                } else return { status: "error", message: "Carrito no encontrado" };
            } else return { status: "error", message: "No hay carritos cargados" };
        }
    addProductToCart = async (id, product) => {
        if (!id) return { status: "error", message: "Id no encontrado" };
        if (fs.existsSync(cartFilePath)) {
            let data = await fs.promises.readFile(cartFilePath, 'utf-8');
            let carts = JSON.parse(data);
            let index = carts.findIndex(cart => cart.id == id);
            if (index > -1) {
                carts[index].products.push(product);
                await fs.promises.writeFile(cartFilePath, JSON.stringify(carts, null, '\t'));
                return { status: "success", data: carts[index] };
            } else return { status: "error", message: "Carrito no encontrado" };
        } else return { status: "error", message: "No hay carritos cargados" };
    }
    deleteProductFromCart = async (id, productId) => {
        if (!id) return { status: "error", message: "Id no encontrado" };
        if (fs.existsSync(cartFilePath)) {
            let data = await fs.promises.readFile(cartFilePath, 'utf-8');
            let carts = JSON.parse(data);
            let index = carts.findIndex(cart => cart.id == id);
            if (index > -1) {
                let productIndex = carts[index].products.findIndex(product => product.id == productId);
                if (productIndex > -1) {
                    carts[index].products.splice(productIndex, 1);
                    await fs.promises.writeFile(cartFilePath, JSON.stringify(carts, null, '\t'));
                    return { status: "success", data: carts[index] };
                } else return { status: "error", message: "Producto no encontrado" };
            } else return { status: "error", message: "Carrito no encontrado" };
        } else return { status: "error", message: "No hay carritos cargados" };
    }   
}

module.exports = CartManager;

