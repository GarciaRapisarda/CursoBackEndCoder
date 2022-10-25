/* const { MongoClient } = require('mongodb');

const host = 'localhost';
const port = 27017;
const dbName = 'ecommerce';

const uri = `mongodb://${host}:${port}`;
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

async function runDB() { 
    try {
        await client.connect();
        console.log('Conectado a la base de datos');
        const db = client.db(dbName);
        const productCollection = db.collection('productos');
        const search = productCollection.find();
        const productList = await search.toArray();
        return productList;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    runDB 
} */

/* const mongoose = require('mongoose');

async function runDB() {
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Conectado a la base de datos');
} */

const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/ecommerce';


module.exports = {
    runDB: () => new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true }),
    getObjectId: (id) => new mongodb.ObjectID(id)

}



