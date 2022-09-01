let fs = require('fs');

let data = `{"${process.argv[2]}" : ${process.argv[3]}}`;
fs.writeFile('data.json', JSON.stringify(JSON.parse(data), null, 2 ), err => {
    if (!err)
        console.log('Archivo creado');
        else
            console.log(err);
            } );
