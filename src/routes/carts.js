const express = require('express');
const CartManager = require('../managers/CartManager');
const router = express.Router();

const cartManager = new CartManager('./src/data/carts.json');

router.post('/', (req, res) => {
    const newCart = cartManager.addCart();
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const updatedCart = cartManager.addProductToCart(cid, pid);
    if (updatedCart) {
        res.json(updatedCart);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

module.exports = router;