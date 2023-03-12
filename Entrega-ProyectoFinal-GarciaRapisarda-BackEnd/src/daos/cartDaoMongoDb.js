const Cart = require('../models/CartModel');


class CartDaoMongoDb {
  constructor() {
    this.products = [];
  }

  async getAll() {
    return await Cart.find();
  }

  async create(cart) {
    return await Cart.create(product);
  }

  async deleteById(id) {
    return await Cart.findByIdAndDelete(id);
  }

  async updateById(id, cart) {
    return await Cart.findByIdAndUpdate(id, cart);
  }
}

module.exports = CartDaoMongoDb;