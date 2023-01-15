const { runDB } = require('../config/configMongoDb');
const client = runDB();

class CartManager {
    constructor() {
        this.carritos = client;
    }

    async getCarritos() {
        const snapshot = await this.carritos.get();
        const carritos = [];
        snapshot.forEach(doc => {
            carritos.push({id: doc.id, ...doc.data()});
        });
        return carritos;
    }

    async getCarrito(id) {
        const snapshot = await this.carritos.doc(id).get();
        const carrito = {id: snapshot.id, ...snapshot.data()};
        return carrito;
    }

    async addCarrito(carrito) {
        const result = await this.carritos.add(carrito);
        return result;
    }

    async updateCarrito(id, carrito) {
        const result = await this.carritos.doc(id).update(carrito);
        return result;
    }

    async deleteCarrito(id) {
        const result = await this.carritos.doc(id).delete();
        return result;
    }
}

module.exports = CartManager;