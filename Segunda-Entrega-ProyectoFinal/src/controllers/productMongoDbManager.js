const { runDB, getObjectId } = require('../config/configMongoDb');
const client = runDB();

module.exports = {
    getProducts: async () => {
        await client.connect();
        const db = client.db('ecommerce');
        const productCollection = db.collection('productos');
        const search = productCollection.find({});
        const productList = await search.toArray();
        
        return productList;
    },
    getProduct: async (id) => {
        await client.connect();
        const db = client.db('ecommerce');
        const productCollection = db.collection('productos');
        const search = productCollection.find({_id: getObjectId(id)});
        const productList = await search.toArray();
        return productList;
    },
    addProduct: async (product) => {
        await client.connect();
        const db = client.db('ecommerce');
        const productCollection = db.collection('productos');
        const result = await productCollection.insertOne(product);
        return result;
    },
    updateProduct: async (id, product) => {
        await client.connect();
        const db = client.db('ecommerce');
        const productCollection = db.collection('productos');
        const result = await productCollection.updateOne({_id: getObjectId(id)}, {$set: product});
        return result;
    },
    deleteProduct: async (id) => {
        await client.connect();
        const db = client.db('ecommerce');
        const productCollection = db.collection('productos');
        const result = await productCollection.deleteOne({_id: getObjectId(id)});
        return result;
    }
}
