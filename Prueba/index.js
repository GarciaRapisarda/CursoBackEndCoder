const { MongoClient } = require('mongodb');

const host = 'localhost';
const port = 27017;
const dbName = 'ecommerce';

const uri = `mongodb://${host}:${port}`;
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

client.connect()
    .then(() => {
        console.log('Conectado a la base de datos');
        const db = client.db(dbName);
        const productCollection = db.collection('productos');
        const search = productCollection.find();
        search.toArray()
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    }
);
