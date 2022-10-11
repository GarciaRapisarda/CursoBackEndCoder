const liteDB = require('./sqlite3.config');

const crearTablaSqlite3= async(tabla)=>{
    const table= tabla;
    try{
        if(!liteDB.schema.hasTable(table)){
            await liteDB.schema.createTable(table, table=>{
                table.increments('id');
                table.string('email', 20).notNullable();
                table.string('msg', 200).notNullable();
                table.time('date', 20).notNullable();
            })
            console.log('table created')
        }
        return {status:200, msg:'table created'}
    }catch(err){
        console.log(err)
        return {status:500, msg:'error'}
    }
    finally{
        liteDB.destroy()
    }
}

module.exports = crearTablaSqlite3;