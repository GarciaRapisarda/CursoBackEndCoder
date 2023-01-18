const CartModel = require('../models/CartModel');

class CartController {

    async getCart(user) {
        try {
            let cart = await CartModel.find();
            cart = cart.filter(carrito => carrito.user.id === user.id);
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id_cart) {
        try {
            let cart = await CartModel.findById(id_cart);
            if (cart.length === 0) {
                return null;
            }
            return {status : 200, data : cart};
        } catch (error) {
            console.log(error);
        }
    }

    async addCart(prod, user) {
        try {
            let subTotal = prod.price * prod.quantity;
            let resultado = await CartModel.create({user, productos: prod, subTotal });
            return resultado;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id_cart) {
        try {
            let resultado = await CartModel.findByIdAndDelete(id_cart);
            return resultado;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(id_cart, producto) {
        try {
            let resultado = await CartModel.findById(id_cart);
            if (!resultado) {
                return {status : 404, data : 'No se encontro el carrito'};
            }
            let productos = resultado.productos 
            let itemToUpdate = productos.find(item => item.product_id === producto.product_id);
            if (!itemToUpdate) {
                resultado.productos.push(producto);
                resultado.subTotal += (producto.price * producto.quantity);
            } else {
                itemToUpdate.quantity = producto.quantity;  
                resultado.subTotal += (producto.price * producto.quantity);
            }
            let data = await CartModel.findByIdAndDelete({_id: id_cart}, {subTotal:resultado.subTotal, productos});
            return {status : 200, data : data};
        } catch (error) {
            console.log(error);
        }
    }

    async deleteItemFromCart(id_cart, id_item) {
        try {
            let cart = await CartModel.findById(id_cart);
            if (!cart) {
                return {status : 404, data : 'No se encontro el carrito'};
            }
            let items_cart = cart.productos;
            let itemToDelete = items_cart.find(item => item.product_id === id_item);
            if (!itemToDelete) {
                return {status : 404, data : 'No se encontro el item'};
            }
            let subTotal = cart.subTotal - (itemToDelete.price * itemToDelete.quantity);
            items_cart = items_cart.filter(item => item.product_id !== id_item);

            if (items_cart.length === 0) {
                let data = await CartModel.deleteCart(id_cart);
                return {status : 200, data : data};
            } else {
                let data = await CartModel.findByIdAndUpdate({_id: id_cart}, {subTotal, productos: items_cart});
                return {status : 200, data : data};
            }
        } catch (error) {
            console.log(error);
        }
    }
}



module.exports = new CartController();