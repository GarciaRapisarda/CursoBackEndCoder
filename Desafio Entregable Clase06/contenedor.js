const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.fileName = nombreArchivo
        this.countID = 0
        this.content = [];
    }

    async init() {
        try {
			let data = await fs.promises.readFile(this.fileName);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('Aún no hay archivo');
		}
    }
    async write() { 
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }

    save(object) {
        this.countID++ 
        object["id"] = this.countID 
        this.content.push(object) 
        this.write() 
        return `El id del objeto añadido es ${this.countID}` 
    }

    getAll() { 
        return this.content
    }

    getById(id) {
        if (!id) return {status: "error", message: "No se ha especificado un ID"};
        try {
            this.objects = this.getAll();
            const obj = this.objects.find(el => el.id === Number(id));
            return obj ? obj : {status: "error", message: "No se ha encontrado el objeto con el ID especificado"};
        } catch (err) {
            console.log(err);
        }
    }

    deleteById(id) { 
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() 
            result = 'OK'
        } else {
            result = `El archivo está vacío`
        }
        return result
    }

    async deleteAll() { 
        this.content = this.content.splice(0, this.content.length)
        this.write()
    }
}

module.exports = Contenedor;