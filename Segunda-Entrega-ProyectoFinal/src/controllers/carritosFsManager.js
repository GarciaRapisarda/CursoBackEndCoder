const db = require('../config/configFireStore');
const client = db.collection('carritos');

module.exports = {
    getCarritos: async () => {
        const snapshot = await client.get();
        snapshot.forEach (doc => {
            console.log(doc.id, '=>', doc.data());
        });
    },
    
}
