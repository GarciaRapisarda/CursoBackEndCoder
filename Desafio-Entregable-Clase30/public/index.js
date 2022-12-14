let submitBtn = document.getElementById('submitBtn');
let formRegister = document.getElementById('formRegister');
let loginBtn = document.getElementById('loginBtn');



submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let obj = {}
    let data = new FormData(formRegister);
    for (let [key, value] of data.entries()) {
        obj[key] = value;
    }   

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(() => location.replace('./pages/login.html'))
    .catch(err => console.log(err));
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    location.replace('./pages/login.html');
});

