
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Conectado a la base de datos');

const db = admin.firestore();


module.exports = {
  runDataBase: () => {
    return db.collection('carritos');
  }
}