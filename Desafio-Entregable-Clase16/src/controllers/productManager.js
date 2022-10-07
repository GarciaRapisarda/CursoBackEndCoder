const knex = require('knex')

class ProductManager {
    constructor(options, products) {
        const database = knex(options)
        if (!database.schema.hasTable(products)) {
            database.schema.createTable(products, table => {
                table.increments('id')
                table.string('title', 20).notNullable()
                table.integer('price')
                table.string('thumbnail', 200)
            })
                .then(() => console.log('table created'))
                .catch(err => console.log(err))
    }
    this.database = database
    this.table = products
}

    create = (product) => {
        return this.database(this.table).insert(product)
        .then(() => {
            console.log('product created')
            this.findAll()
        })
        .catch(err => console.log(err))
    }

    findAll = () => {
        return this.database(this.table).select('*')
        .then(response => JSON.parse(JSON.stringify(response)))
        .catch(err => console.log(err))
    }

    findById = (id) => {
        return this.database(this.table).select('*').where('id', id)
        .then(response => JSON.parse(JSON.stringify(response)))
        .catch(err => console.log(err))
    }


    update = (id, product) => {
        return this.database(this.table).where('id', id).update(product)
        .then(() => {
            console.log('product updated')
            this.findAll()
        })
        .catch(err => console.log(err))
    }

    delete = (id) => {
        return this.database(this.table).where('id', id).del()
        .then(() => {
            console.log('product deleted')
            this.findAll()
        })
        .catch(err => console.log(err))
    }
}



module.exports = ProductManager