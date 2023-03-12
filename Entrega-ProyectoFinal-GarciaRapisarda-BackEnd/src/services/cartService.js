const CartDaoMongoDb = require('../daos/cartDaoMongoDb');


    class CartService {
        constructor() {
            this.cartDaoMongoDb = new CartDaoMongoDb();
        }

    async getAll() {
        return await this.cartDaoMongoDb.getAll();
    }

    async create(product) {
        return await this.cartDaoMongoDb.create(product);
    }

    async deleteById(id) {
        return await this.cartDaoMongoDb.deleteById(id);
    }

    async updateById(id, product) {
        return await this.cartDaoMongoDb.updateById(id, product);
    }
}

module.exports = CartService;