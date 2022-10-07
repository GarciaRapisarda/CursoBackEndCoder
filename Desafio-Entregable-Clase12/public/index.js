const socket = io();

const formProd = document.getElementById('formProd');

formProd.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;
    const producto = {nombre, precio, imagen};
    socket.emit('producto', producto);
    saveProduct(producto);
    console.log(producto);
    formProd.reset();
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

let user 
let chatCenter = document.getElementById('chatCenter')
Swal.fire({
    title: 'Login Chat-Box',
    input: 'text',
    text: 'Ingresa tu e-mail',
    allowOutsideClick: false,
})
.then((result) => {
        user = result.value;   
});

btnChat.addEventListener('click', () => {
    let mensaje = document.getElementById('mensaje').value;
    let chat = {user, mensaje};

    console.log(chat);
    socket.emit('mensaje', chat);
    document.getElementById('mensaje').value = '';
});

socket.on('historial', (historial) => {
    let chat = '';
    historial.forEach((element) => {
        chat += `<div class="card">
        <div class="card-body">
            <p class="card-text"><small class="text-muted">A las : ${new Date} </small></p>
            <h5 class="card-title">${element.user}</h5>
            <p class="card-text">${element.mensaje}</p>
            
        </div>
    </div>`;
    });
    listaMensajes.innerHTML = chat;
});




    