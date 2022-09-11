let formularioProducto = document.getElementById('formularioProducto');

const handleSubmmit = (evt, form, route) => {
    evt.preventDefault();
    let data = new FormData(form);
    let object = {};
    data.forEach((value, key) => 
        object[key] = value);
    fetch(route, {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));
    form.reset();
}

formularioProducto.addEventListener('submit', (e) => 
    handleSubmmit(e, e.target, '/api/productos'));


