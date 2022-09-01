const Contenedor = require('./Contenedor.js');

const productos = new Contenedor('productos.txt');

const test = async () => {
	const data = await productos.save({ name: "name", lastName: "last name" });
	console.log(productos.objects);
}

test();
/* productos.getById(2).then(res => console.log(res)); */
/* productos.getAll().then(res => console.log(res)); */
/* productos.save({ name: "name", lastName: "last name" }).then(res => console.log(res)); */
/* productos.deleteById(5).then(res => console.log(res)); */
/* productos.deleteAll().then(res => console.log(res)); */
