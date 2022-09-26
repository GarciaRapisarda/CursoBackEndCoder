const fs = require('fs');

const cartFilePath = './src/data/cart.json';

class CartManager {
     addCart = async (id) => {
        fs.promises.writeFile(cartFilePath, JSON.stringify(id, null, '\t'));
        return id;
    }
    

}

module.exports = CartManager;

