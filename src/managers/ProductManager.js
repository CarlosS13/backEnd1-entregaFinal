const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
    }

    async addProduct(productData) {
        const products = await this.getProducts();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id: newId, ...productData };
        products.push(newProduct);
        await this.saveProducts(products);
        return newProduct;
    }

    getProducts() {
        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updateFields) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) return null;
        const updatedProduct = { ...products[index], ...updateFields, id: products[index].id };
        products[index] = updatedProduct;
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
        return updatedProduct;
    }

    async deleteProduct(productId) {
        let products = await this.getProducts();
        products = products.filter(p => p.id !== parseInt(productId));
        await this.saveProducts(products);
    }

    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;