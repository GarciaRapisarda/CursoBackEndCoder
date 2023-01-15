const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/ecommerce';


module.exports = {
    runDB: () => new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true }),
    getObjectId: (id) => new mongodb.ObjectID(id)

}



