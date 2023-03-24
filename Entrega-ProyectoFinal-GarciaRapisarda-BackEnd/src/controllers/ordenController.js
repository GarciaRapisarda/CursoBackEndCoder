const OrdenModel = require('../models/ordenModel');
const transporter = require('../config/nodeMailer');

class OrdenController {
    async createOrden(req, res) {
        let cartId = req.body.cartId;
        let userId = req.user._id;
        if (!userId) {
            res.status(400).json({error: 'No se encontró el usuario'});
        } else {
        try {
            let buy = new OrdenModel({user: userId, cart: cartId});
            await buy.save();
            let newBuy = await OrdenModel.findById(buy._id).populate('cart').populate('user');
            if (newBuy) {
                let ordenDeCompra = newBuy.cart.products;
                let total = newBuy.cart.total;
                let list = '';
                for (let i = 0; i < ordenDeCompra.length; i++) {
                    list += `<li>${ordenDeCompra[i].title} - ${ordenDeCompra[i].cantidad} unidades - $${ordenDeCompra[i].price}</li>`
                }
                let mailOptions = {
                    from: process.env.TEST_EMAIL,
                    to: newBuy.user.email,
                    subject: 'Orden de compra',
                    html: `<h1>Gracias por tu compra!</h1>
                    <p>Estos son los productos que compraste:</p>
                    <ul>${list}</ul>
                    <p>Total: $${total}</p>
                    <p>En breve nos pondremos en contacto con vos para coordinar la entrega.</p>
                    <p>Saludos!</p>`
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(info)
                    }
                })
                res.status(200).json(newBuy);
            } else {
                res.status(400).json({message: 'No se pudo crear la orden de compra'});
            }
        } catch (error) {
            console.log(error)
        }
    }
}


    async getOrdenes(req, res) {
        try {
            let ordenes = await OrdenModel.find().populate('cart').populate('user');
            if (ordenes) {
                res.status(200).json(ordenes);
            } else {
                res.status(400).json({message: 'No se encontraron ordenes de compra'});
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getOrdenById(req, res) {
        let { id } = req.params;
        try {
            let orden = await OrdenModel.findById(id).populate('cart').populate('user');
            if (orden) {
                res.status(200).json(orden);
            }
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new OrdenController();


