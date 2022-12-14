const myDB = require('./mysql.config')

const crearTablaMysql = async (myTable)=>{
    try{
        let message = ''
        if(!await myDB.schema.hasTable(myTable)){
            await myDB.schema.createTable(myTable, table => {
                table.increments('id')
                table.string('title').nullable(false)
                table.float('price').nullable(false)
                table.string('thumbnail').nullable(false)
            })
            message = `Table ${myTable} created - `
        }

        return {status: 'success', result: message}
    }catch (err){
        throw {status : 'Error', result : {msg : err.message, code : err.code}}
    }finally{
        //destroy tables connection
        myDB.destroy()
    }
} 


module.exports = crearTablaMysql