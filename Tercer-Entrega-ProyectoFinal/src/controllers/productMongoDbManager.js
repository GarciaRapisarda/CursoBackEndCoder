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
}

        
module.exports = ProductManager;