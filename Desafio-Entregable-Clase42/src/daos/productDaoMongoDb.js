import Product from "./productModel.js";

export default class ProductDaoMongoDb {
    constructor() {
        this.products = [];
    }
    
    async getAll() {
        return await Product.find();
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
