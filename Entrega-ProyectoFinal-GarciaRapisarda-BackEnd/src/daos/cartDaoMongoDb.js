const Cart = require('../models/CartModel');


class CartDaoMongoDb {
    constructor() {
        this.carts = [];
    }

    async getAll() {
        return await Cart.find();
    }

    async getById(id) {
        return await Cart.findById(id);
    }

     async createCart(cart, userId) {
        cart.userId = userId;
        return await Cart.create(cart);
    }

    async addProductToCart(id, product) {
        return await Cart.findByIdAndUpdate(id, product);
    } 
    
      async addProductToCart(id, product) {
        return await Cart.findByIdAndUpdate(id, { $push: { products: product } });
      }

    async findByIdAndUpdate(id) {
        return await Cart.findByIdAndUpdate(id);
    }

    async deleteById(id) {
        return await Cart.findByIdAndDelete(id);
    }

    async updateById(id, cart) {
        return await Cart.findByIdAndUpdate(id, cart);
    }
}

module.exports = CartDaoMongoDb; 

