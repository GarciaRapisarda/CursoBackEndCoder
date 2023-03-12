const CartService = require("../services/cartService");
const cartService = new CartService();

const getAll = async (req, res) => {
    const carts = await cartService.getAll();
    res.json(carts);
}

const create = async (req, res) => {
    const cart = await cartService.create(req.body);
    res.json(cart);
}

const deleteById = async (req, res) => {
    const cart = await cartService.deleteById(req.params.id);
    res.json(cart);
}

const updateById = async (req, res) => {
    const cart = await cartService.updateById(req.params.id, req.body);
    res.json(cart);
}

module.exports = {
    getAll,
    create,
    deleteById,
    updateById
}