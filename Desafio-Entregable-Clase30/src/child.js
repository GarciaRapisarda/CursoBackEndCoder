const array = []

process.on('message', message => {
    if(!isNaN(message) == true) {
        for (var i = 0; i < message; ++i) {
            let x = Math.floor(Math.random()*1000);
            array.push(x)
        }
    } else {
        for (var i = 0; i < 5 ; ++i) {
            let x = Math.floor(Math.random()*1000);
            array.push(x)
        }
    }
    process.send(array)
    process.exit()
})

process.send('listo')



