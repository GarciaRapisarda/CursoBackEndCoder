import FactoryDAO from "../daos/factory.js";

export default class ProductService {
    constructor() {
        this.productDao
        this.init();
    }

    async init() {
        this.productDao = await FactoryDAO.getPersistence();
    }

    async getAll() {
        return await this.productDao.getAll();
    }

    async create(product) {
        return await this.productDao.create(product);
    }

    async deleteById(id) {
        return await this.productDao.deleteById(id);
    }

    async updateById(id, product) {
        return await this.productDao.updateById(id, product);
    }
}

