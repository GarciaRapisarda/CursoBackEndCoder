const fs = require('fs');

fs.writeFileSync('fyh.txt', '18/8/2022 22.35');

try {
    let contenido = fs.readFileSync('fyh.txt');
    console.log(contenido.toString());
} catch  {
    fs.writeFileSync('clase4.txt', 'Hola mundo');

}
