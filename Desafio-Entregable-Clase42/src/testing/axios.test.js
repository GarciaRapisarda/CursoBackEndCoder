import assert from 'assert';
import axios from 'axios';

describe('Testing de la API', () => {
    it('GET de productos', () => {
        axios.get('http://localhost:8080/productos')
            .then(response => {
                assert.equal(response.status, 200);
                assert.equal(response.data.length, 1);
            })
            .catch(error => {
                console.error(error);
            })
    })
    it ('POST de productos', () => {
        axios.post('http://localhost:8080/productos', {
            "name": "Fanta",
            "description": "Gaseosa de naranja",
            "price": 50
        })
        .then(response => {
            assert.equal(response.status, 200);
            assert.equal(response.data.name, 'Fanta');
        })
        .catch(error => {
            console.error(error);
        })
    })
    it ('PUT de productos', () => {
        axios.put('http://localhost:8080/productos/63e16ea14fd6fba07c2660ce', {
            "name": "Fanta",
            "description": "Gaseosa de naranja 1.5ltrs",
            "price": 100
        })
        .then(response => {
            assert.equal(response.status, 200);
            assert.equal(response.data.name, 'Fanta');
        })
        .catch(error => {
            console.error(error);
        })
    })
    it ('DELETE de productos', () => {
        axios.delete('http://localhost:8080/productos/63e16ea14fd6fba07c2660ce')
        .then(response => {
            assert.equal(response.status, 200);
            assert.equal(response.data.name, 'Fanta');
        })
        .catch(error => {
            console.error(error);
        })
    })
});

//