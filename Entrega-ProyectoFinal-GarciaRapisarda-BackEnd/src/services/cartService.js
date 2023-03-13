const CartDaoMongoDb = require('../daos/cartDaoMongoDb');

    class CartService {
        constructor() {
            this.cartDaoMongoDb = new CartDaoMongoDb();
        }

    async getAll() {
        return await this.cartDaoMongoDb.getAll();
    }

    async getById(id) {
        return await this.cartDaoMongoDb.getById(id);
    }
  
   async createCart(product) {
        return await this.cartDaoMongoDb.createCart(product);
    }
    
      async addProductToCart(id, product) {
        return await this.cartDaoMongoDb.addProductToCart(id, product);
      }

    async addProductToCart(id, product) {
        return await this.cartDaoMongoDb.addProductToCart(id, product);
    }

    async findByIdAndUpdate(id) {
        return await this.cartDaoMongoDb.findByIdAndUpdate(id);
    }


    async deleteById(id) {
        return await this.cartDaoMongoDb.deleteById(id);
    }

    async updateById(id, product) {
        return await this.cartDaoMongoDb.updateById(id, product);
      }
}

module.exports = CartService; 


