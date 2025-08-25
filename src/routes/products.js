const express = require('express');
const ProductManager = require('../managers/ProductManager');
const router = express.Router();

const productManager = new ProductManager('./src/data/products.json');


router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

router.get('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = productManager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.post('/', (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category, thumbnails } = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const newProduct = productManager.addProduct({
        title,
        description,
        price,
        thumbnail: thumbnail || '',
        code,
        stock,
        status: status !== undefined ? status : true,
        category,
        thumbnails: thumbnails || []
    });
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;
    const updated = productManager.updateProduct(pid, updateFields);
    if (updated) {
        res.json(updated);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const deleted = productManager.deleteProduct(pid);
    if (deleted) {
        res.json({ mensaje: 'Producto eliminado' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;