import ProductService from "../services/productService.js";
const productService = new ProductService();

const getAll = async (req, res) => {
    const products = await productService.getAll();
    res.json(products);
}

const create = async (req, res) => {
    const product = await productService.create(req.body);
    res.json(product);
}

const deleteById = async (req, res) => {
    const product = await productService.deleteById(req.params.id);
    res.json(product);
}

const updateById = async (req, res) => {
    const product = await productService.updateById(req.params.id, req.body);
    res.json(product);
}

export default {
    getAll,
    create,
    deleteById,
    updateById
}



