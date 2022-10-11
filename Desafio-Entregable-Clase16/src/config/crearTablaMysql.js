const database = require('./mysql.config')

const crearTablaMysql = async (tabla) => {
    const table = tabla
    try {
        await database.schema.createTable(table, table => {
            table.increments('id')
            table.string('title', 20).notNullable()
            table.integer('price')
            table.string('thumbnail', 200)
            
        })
        console.log('table created')
    } catch (err) {
        console.log(err)
    }
    finally {
        database.destroy()
    }   
}

module.exports = crearTablaMysql