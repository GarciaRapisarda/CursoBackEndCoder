/* const config = require("../config/config.js");

const ProductDaoMongoDb = require('./productDaoMongoDb.js');
const chatDaoMongoDb = require('./chatDaoMongoDb.js');

module.exports = {
    getPersistence: () => {
        return new Promise((resolve, reject) => {
            switch (config.app.persistencia) {
                case 'fs':
                    resolve(new UserDaoFileSys());
                    break;
                case 'mongo':
                    resolve(new ProductDaoMongoDb());
                    break;
                case 'array':
                    resolve(new UserDaoArrays());
                    break;
                default:
                    reject(new Error("Persistencia no válida"));
            }
        });
    }
};  */

const config = require("../config/config.js");
const ProductDaoMongoDb = require('./productDaoMongoDb.js');
const ChatDaoMongoDb = require('./chatDaoMongoDb.js');
const CartDaoMongoDb = require('./cartDaoMongoDb.js');

module.exports = {
    getPersistence: () => {
        return new Promise((resolve, reject) => {
            switch (config.app.persistencia) {
                case 'fs':
                    resolve(new UserDaoFileSys());
                    break;
                case 'mongo':
                    resolve({
                        productDaoMongoDb: new ProductDaoMongoDb(),
                        chatDaoMongoDb: new ChatDaoMongoDb(),
                        cartDaoMongoDb: new CartDaoMongoDb(),
                    });
                    break;
                case 'array':
                    resolve(new UserDaoArrays());
                    break;
                default:
                    reject(new Error("Persistencia no válida"));
            }
        });
    }
};


