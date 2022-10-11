

class ChatManager {
    constructor(database, table) {   
    this.database = database
    this.table = table
}

    async create(message) {
        try {
            message = {
                email: message.email,
                message: message.message,
                timestamp: new Date().toLocaleString()
            }
            await this.database(this.table).insert(message)
        }
        catch (err) {
            console.log(err)
        }
    }

    async findAll(){
        let chat= result=JSON.parse(JSON.stringify(
        await this.database(this.table).where({}).select("email","msg","date")))
        ||[];
        return chat; 
    }
     
}


module.exports = ChatManager