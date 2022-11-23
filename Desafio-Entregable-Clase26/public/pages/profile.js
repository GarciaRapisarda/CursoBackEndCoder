let logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => location.replace('./login.html'))
    .catch(err => console.log(err));
});
let email = JSON.parse(localStorage.getItem('email'))



