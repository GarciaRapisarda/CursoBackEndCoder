const ProductService = require("../services/productService");
const productService = new ProductService();

const getAll = async (req, res) => {
    const products = await productService.getAll();
    res.json(products);
}

const getById = async (req, res) => {
    const product = await productService.getById(req.params.id);
    res.json(product);
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

module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    updateById
}
