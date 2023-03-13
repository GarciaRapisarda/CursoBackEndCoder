const CartService = require("../services/cartService");
const cartService = new CartService();

const getAll = async (req, res) => {
    const carts = await cartService.getAll();
    res.json(carts);
}

const getById = async (req, res) => {
    const cart = await cartService.getById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart no encontrado" });
    }
    return res.json(cart);
  };

const createCart = async (req, res) => {
    const cart = await cartService.createCart(req.body);
    res.json(cart);
}
  
const addProductToCart = async (req, res) => {
    const cart = await cartService.getById(req.params.id);  
    if (!cart) {
      return res.status(404).json({ error: "El carrito no existe" });
    } 
    const product = req.body;
    cart.productos.push(product);
      const updatedCart = await cartService.updateById(req.params.id, { productos: cart.productos });    
    res.json(updatedCart);
  };

  const findByIdAndUpdate = async (req, res) => {
    const cartId = req.params.id;
    const cart = await cartService.getById(cartId);
  
    if (!cart) {
      return res.status(404).json({ error: "El carrito no existe" });
    }
  
    const product = req.body;
    const existingProduct = cart.productos.find((p) => p.product_id === product.product_id);
  
    if (!existingProduct) {
      return res.status(404).json({ error: "El producto no existe" });
    } else if (product.quantity > 0) {
      existingProduct.quantity = product.quantity;
    }
  
    const updatedCart = await cartService.updateById(cartId, { productos: cart.productos });
  
    res.json(updatedCart);
  };
  const deleteById = async (req, res) => {
    const cart = await cartService.deleteById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart no encontrado" });
    }
    return res.status(200).json({ message: `Cart con el ${cart.id} borrado de manera correcta` });
  };

const updateById = async (req, res) => {
    const cart = await cartService.updateById(req.params.id, req.body);
    res.json(cart);
}

module.exports = {
    getAll,
    getById,
    createCart,
    addProductToCart,
    findByIdAndUpdate,
    deleteById,
    updateById
} 

