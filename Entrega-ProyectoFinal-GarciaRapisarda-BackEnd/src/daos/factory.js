const config = require("../config/config.js");
const ProductDaoMongoDb = require('./productDaoMongoDb.js');
const ChatDaoMongoDb = require('./chatDaoMongoDb.js');
const CartDaoMongoDb = require('./cartDaoMongoDb.js');

module.exports = {
    getPersistence: () => {
        return new Promise((resolve, reject) => {
            switch (config.app.persistencia) {
                case 'fs':
                    resolve({
                        productDaoFs: new ProductDaoFs(),
                        chatDaoFs: new ChatDaoFs(),
                        cartDaoFs: new CartDaoFs(),
                    });
                    break;
                case 'mongo':
                    resolve({
                        productDaoMongoDb: new ProductDaoMongoDb(),
                        chatDaoMongoDb: new ChatDaoMongoDb(),
                        cartDaoMongoDb: new CartDaoMongoDb(),
                    });
                    break;
                case 'array':
                    resolve({
                        productDaoArray: new ProductDaoArray(),
                        chatDaoArray: new ChatDaoArray(),
                        cartDaoArray: new CartDaoArray(),
                    });
                    break;
                default:
                    reject(new Error("Persistencia no válida"));
            }
        });
    }
};


