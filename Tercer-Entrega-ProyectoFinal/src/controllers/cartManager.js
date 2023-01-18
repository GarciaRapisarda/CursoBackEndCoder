/* const { runDB } = require('../config/configMongoDb');
const client = runDB(); */

const CartModel = require('../controllers/cartManager');

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

    async addCart(item, user) {
        try {
            let subTotal = item.price * item.quantity;
            let resultado = await CartModel.addCart({items: item, user, subTotal});
            return resultado;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id_cart) {
        try {
            let resultado = await CartModel.deleteCart(id_cart);
            return resultado;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(id_cart, item) {
        try {
            let resultado = await CartModel.findById(id_cart);
            if (!resultado) {
                return {status : 404, data : 'No se encontro el carrito'};
            }
            let items = resultado.item 
            let itemToUpdate = items.find(item => item.id === item.id);
            if (!itemToUpdate) {
                resultado.items.push(item);
                resultado.subTotal += item.price * item.quantity;
            } else {
                itemToUpdate.quantity = item.quantity;
                resultado.subTotal += item.price * item.quantity;
            }
            let data = await CartModel.findByIdAndUpdate({_id: id_cart}, {subTotal:resultado.subTotal, items});
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
            let items = cart.items;
            let itemToDelete = items.find(item => item.id === id_item);
            if (!itemToDelete) {
                return {status : 404, data : 'No se encontro el item'};
            }
            let index = items.indexOf(itemToDelete);
            items.splice(index, 1);
            let data = await CartModel.findByIdAndUpdate({_id: id_cart}, {items});
            return {status : 200, data : data};
        } catch (error) {
            console.log(error);
        }
    }
}



module.exports = new CartController();