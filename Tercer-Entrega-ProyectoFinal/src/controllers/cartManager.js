const { runDB } = require('../config/configMongoDb');
const client = runDB();

class CartManager {
    constructor() {
        this.carritos = client;
    }

    async getCarritos() {
        await client.connect();
        const db = client.db('ecommerce');
        const carritoCollection = db.collection('carritos');
        const search = carritoCollection.find({});
        const carritoList = await search.toArray();
        return carritoList;
    }

    async getCarrito(id) {
        await client.connect();
        const db = client.db('ecommerce');
        const carritoCollection = db.collection('carritos');
        const search = carritoCollection
            .find({id});
        const carrito = await search.toArray();
        return carrito;
    }

    async addCarrito(carrito) {
        await client.connect();
        const db = client.db('ecommerce');
        const carritoCollection = db.collection('carritos');
        const result = await carritoCollection.insertOne(carrito);
        return result;
    }

        

    async updateCarrito(id, carrito) {
        await client.connect();
        const db = client.db('ecommerce');
        const carritoCollection = db.collection('carritos');
        const result = await carritoCollection.updateOne
            ({id}, {$set: carrito});
        return result;
    }

    async deleteCarrito(id) {
        await client.connect();
        const db = client.db('ecommerce');
        const carritoCollection = db.collection('carritos');
        const result = await carritoCollection.deleteOne({id});
        return result;
    }
}

module.exports = CartManager;