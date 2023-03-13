const ProductService = require("../services/productService");
const productService = new ProductService();

const getAll = async (req, res) => {
    const products = await productService.getAll();
    res.json(products);
}

const getById = async (req, res) => {
    const product = await productService.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no enconrado" });
    }
    return res.json(product);
  };

const create = async (req, res) => {
    const product = await productService.create(req.body);
    res.json(product);
}

const deleteById = async (req, res) => {
    const product = await productService.deleteById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json({ message: `Producto con el ${product.id} borrado de manera correcta` });
}

const updateById = async (req, res) => {
    const product = await productService.updateById(req.params.id, req.body);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
}

module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    updateById
}
