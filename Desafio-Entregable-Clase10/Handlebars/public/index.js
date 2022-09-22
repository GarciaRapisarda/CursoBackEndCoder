const template = Handlebars.compile(`
<form>
    <label>{{nombre}}</label>
    <label>{{precio}}</label>
    <label>{{thumbnail}}</label>
</form>
`);

const html = template({
    nombre: 'Producto 1',
    precio: 100,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
});

document.getElementById('data').innerHTML = html;

