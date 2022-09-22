const socket = io();

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;
    const producto = {nombre, precio, imagen};
    socket.emit('producto', producto);
    console.log(producto);
    form.reset();
});

socket.on('listaProductos', (productos) => {
    let listaProductos = document.getElementById('listaProductos');
    let prod = '';
    productos.forEach((producto) => {
        prod += `<table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Imagen</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td><img src="${producto.imagen}" alt="imagen" width="100px"></td>
                </tr>
                </tbody>
                </table>`;
    });
    listaProductos.innerHTML = prod;
});

