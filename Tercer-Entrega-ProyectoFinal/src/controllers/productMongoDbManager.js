const { runDB } = require('../config/configMongoDb');
const client = runDB();

class ProductManager {
    constructor() {
        this.products = client;
    }

   async getProducts() {
        await client.connect();
        const db = client.db('ecommerce');
        const productCollection = db.collection('productos');
        const search = productCollection.find({});
        const productList = await search.toArray();
        
        return productList;
    }

    async getProduct(id) {
        await client.connect();
        const db = client.db('ecommerce');
        const productCollection = db.collection('productos');
        const search = productCollection
            .find({id});
        const product = await search.toArray();
        return product;
    }

    async addProduct(product) {
        await client.connect();
        const db = client.db('ecommerce');
        const productCollection = db.collection('productos');
        const result = await productCollection.insertOne(product);
        return result;
    }
    async deleteProduct(id) {
        await client.connect();
        const db = client.db('ecommerce');
        const productCollection = db.collection('productos');
        const result = await productCollection.deleteOne({id});
        return result;
    }
}

        
module.exports = ProductManager;