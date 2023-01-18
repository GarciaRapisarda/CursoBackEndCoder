/* const { runDB } = require('../config/configMongoDb');
const client = runDB(); */

const ProductModel = require('../models/ProductModel');

class ProductController {

    async getProducts() {
        try {
            let products = await ProductModel.find();
            return products;
        } catch (error) {
            console.log(error);
        }
    }
    async getProduct(id) {
        try {
            let product = await ProductModel.findById(id);
            if (product.length === 0) {
                return null;
            }
            return product;
}
        catch (error) {
            console.log(error);
        }
    }
    async createProduct(product) {
        try {
            let resultado = await ProductModel.create(product);
            return resultado;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id) {
        try {
            let resultado = await ProductModel.findByIdAndDelete(id);
            return resultado;
        } catch (error) {
            console.log(error);
        }
    }
    async updateProduct(id, product) {
        try {
            let resultado = await ProductModel.findByIdAndUpdate
                (id, product, { new: true });
            return resultado;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProductController();

