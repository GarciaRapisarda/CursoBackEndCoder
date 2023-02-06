import axios from 'axios';

//GET de productos con axios

async function getProducts() {
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:8080/',
            url: 'productos',
            method: 'GET',
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

//Post de productos con axios

async function postProducts() {
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:8080/',
            url: 'productos',
            method: 'POST',
            data: {
                "name": "Fanta",
                "description": "Gaseosa de naranja",
                "price": 50
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

//PUT de productos con axios

async function putProducts() {
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:8080/',
            url: 'productos/63e16ea14fd6fba07c2660ce',
            method: 'PUT',
            data: {
                "name": "Fanta",
                "description": "Gaseosa de naranja 1.5ltrs",
                "price": 100
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

//DELETE de productos con axios

async function deleteProducts() {
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:8080/',
            url: 'productos/63e16ea14fd6fba07c2660ce',
            method: 'DELETE',
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export default {
    getProducts,
    postProducts,
    putProducts,
    deleteProducts
}

//getProducts();
//postProducts();
//putProducts();
//deleteProducts();