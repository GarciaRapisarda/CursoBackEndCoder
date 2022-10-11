let sqliteOptions= require("knex")({
    client:process.env.DB_HOST_II||'sqlite3',
    connection:{
        filename: "./db/ecommerce.sqlite3",
    },
    useNullAsDefault: true
})

module.exports= sqliteOptions;