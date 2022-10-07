const knex = require('knex')

class ChatManager {
    constructor(options, chat) {
        const database = knex(options)
        if (!database.schema.hasTable(chat)) {
            database.schema.createTable(chat, table => {
                table.increments('id')
                table.string('email', 20).notNullable()
                table.string('message', 200)
            })
                .then(() => console.log('table created'))
                .catch(err => console.log(err))
    }
    this.database = database
    this.table = chat
}

    create = (message) => {
        return this.database(this.table).insert(message)
        .then(() => {
            console.log('message created')
            this.findAll()
        })
        .catch(err => console.log(err))
    }

    findAll = () => {
        return this.database(this.table).select('*')
        .then(response => JSON.parse(JSON.stringify(response)))
        .catch(err => console.log(err))
    }
}


module.exports = ChatManager