const Product = require('../models/ProductModel');


class ProductDaoMongoDb {
  constructor() {
    this.products = [];
  }

  async getAll() {
    return await Product.find();
  }

    async getById(id) {
        return await Product.findById(id);
    }

  async create(product) {
    return await Product.create(product);
  }

  async deleteById(id) {
    return await Product.findByIdAndDelete(id);
  }

  async updateById(id, product) {
    return await Product.findByIdAndUpdate(id, product);
  }
}

module.exports = ProductDaoMongoDb;



