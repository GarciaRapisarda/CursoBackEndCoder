const mysqlOptions = require("knex")({
    client: process.env.DB_CLIENT||'mysql',
    connection: {
        host: process.env.DB_HOST||'127.0.0.1',
        port: process.env.DB_PORT||'3306',
        user: process.env.DB_USER||'root',
        password:process.env.DB_PASSWORD||"",
        database: process.env.DB_NAME||"ecommerce"
    },
    pool:{min:0, max:10}
    
})

module.exports = mysqlOptions