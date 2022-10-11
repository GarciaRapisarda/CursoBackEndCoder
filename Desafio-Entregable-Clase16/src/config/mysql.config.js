const mysqlOptions = require("knex")({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce',
        table: 'products'
    }
})

module.exports = mysqlOptions