const ProductDaoMongoDb = require('../daos/productDaoMongoDb');


    class ProductService {
        constructor() {
            this.productDaoMongoDb = new ProductDaoMongoDb();
        }

    async getAll() {
        return await this.productDaoMongoDb.getAll();
    }

    async create(product) {
        return await this.productDaoMongoDb.create(product);
    }

    async deleteById(id) {
        return await this.productDaoMongoDb.deleteById(id);
    }

    async updateById(id, product) {
        return await this.productDaoMongoDb.updateById(id, product);
    }
}

module.exports = ProductService;

