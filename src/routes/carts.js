const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const cart = new Cart();
        await cart.save();
        res.status(201).json({ status: 'success', cart });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
    await cart.save();
    res.json({ status: 'success', cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const { products } = req.body;
    const cart = await Cart.findByIdAndUpdate(req.params.cid, { products }, { new: true });
    res.json({ status: 'success', cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findById(req.params.cid);
    const prod = cart.products.find(p => p.product.toString() === req.params.pid);
    if (prod) prod.quantity = quantity;
    await cart.save();
    res.json({ status: 'success', cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    cart.products = [];
    await cart.save();
    res.json({ status: 'success', cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

module.exports = router;