const fs = require('fs');

const productsFilePath = './src/data/products.json';

class ProductManager {
    findAll = async () => {
        if (!fs.existsSync(productsFilePath)) 
            return { error: 'No hay productos cargados' }
            let data = await fs.promises.readFile(productsFilePath, 'utf-8');
            return JSON.parse(data);
        }
    findById = async (id) => {
        if (!id) return { status: "error", message: "Id no encontrado" };
        if (fs.existsSync(productsFilePath)) {
            let data = await fs.promises.readFile(productsFilePath, 'utf-8');
            let products = JSON.parse(data);
            let product = products.find(product => product.id == id);
            if (product) return { status: "success", data: product };
            else return { status: "error", message: "Producto no encontrado" };
        } else return { status: "error", message: "No hay productos cargados" };
    }
    saveProduct =  async (product) => {
        if (!product) return { status: "error", message: "Producto no encontrado" };
        if (fs.existsSync(productsFilePath)) {
            let data = await fs.promises.readFile(productsFilePath, 'utf-8');
            let products = JSON.parse(data);
            let id = products.length + 1;
            product.id = id;
            products.push(product);
            await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, '\t'));
            return { status: "success", data: product };
        } else return { status: "error", message: "No hay productos cargados" };
    }
    updateProduct = async (id, product) => {
        if (!id) return { status: "error", message: "Id no encontrado"};
        if (fs.existsSync(productsFilePath)) {
            let data = await fs.promises.readFile(productsFilePath, 'utf-8');
            let products = JSON.parse(data);
            let index = products.findIndex(product => product.id == id);
            if (index > -1) {
                products[index] = product;
                await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, '\t'));
                return { status: "success", data: products[index] };
            } else return { status: "error", message: "Producto no encontrado" };
        } else return { status: "error", message: "No hay productos cargados" };
    }
    deleteProduct = async (id) => {
        if (!id) return { status: "error", message: "Id no encontrado" };
        if (fs.existsSync(productsFilePath)) {
            let data = await fs.promises.readFile(productsFilePath, 'utf-8');
            let products = JSON.parse(data);
            let index = products.findIndex(product => product.id == id);
            if (index > -1) {
                products.splice(index, 1);
                await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, '\t'));
                return { status: "success", data: products };
            } else return { status: "error", message: "Producto no encontrado" };
        } else return { status: "error", message: "No hay productos cargados" };
    }
}
        
module.exports = ProductManager;