var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Conectado a la base de datos');

const db = admin.firestore();
const client = db.collection('carritos');

const getCarritos = async () => {
    const snapshot = await client.get();
    snapshot.forEach(doc => {
        console.log(({id: doc.id, ...doc.data()}));
    });
}

getCarritos()


