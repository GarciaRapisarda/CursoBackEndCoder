import supertest from 'supertest';
import chai, { expect } from 'chai';

const request = supertest('http://localhost:8080/productos');

describe('Testing de la API', () => {
    describe('GET de productos', () => {
    it('Debe poder devolver todos los productos', async () => {
        const response = await request.get('/');
        expect(response.status).to.equal(200);
    });
})
    describe('POST de productos', () => {
    it('Debe poder agregar un producto a la Base de datos', async () => {
        const response = await request.post('/').send({
        name: 'Fanta',
        description: 'Gaseosa de naranja',
        price: 50,
        });
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('Fanta');
    });
})
    describe('PUT de productos', () => {
    it('Debe poder actualizar datos del producto dado por ID', async () => {
        const response = await request.put('/63e16ea14fd6fba07c2660ce').send({
        name: 'Fanta',
        description: 'Gaseosa de naranja 1.5ltrs',
        price: 100,
        });
        expect(response.status).to.equal(200);
    });
})
    describe('DELETE de productos', () => {
    it('Debe poder borrar un producto de la base de datos dado por ID', async () => {
        const response = await request.delete('/63e16ea14fd6fba07c2660ce');
        expect(response.status).to.equal(200);
    });
})
});