let submitBtn = document.getElementById('submitBtn');
let formLogin = document.getElementById('formLogin');
let registerBtn = document.getElementById('registerBtn');


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let obj = {}
    let data = new FormData(formLogin);
    for (let [key, value] of data.entries()) {
        obj[key] = value;
    }   

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            location.replace('./profile.html');
        }
    })
    .catch(err => console.log(err));
});

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    location.replace('../index.html');
});

