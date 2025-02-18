const fs = require('fs').promises;
const path = require('path');

class ProductManagerFS {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.nextId = 1;

        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.nextId = Math.max(...this.products.map(p => p.id)) + 1;
            }
        } catch (error) {
            await fs.writeFile(this.path, JSON.stringify([]));
        }
    }

    async getProducts() {
        return this.products;
    }

    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const codeExists = this.products.some(p => p.code === product.code);
        if (codeExists) {
            throw new Error("Já existe um produto com esse código.");
        }

        product.id = this.nextId++;
        this.products.push(product);
        await this.saveProducts();
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error("Produto não encontrado.");
        }

        this.products.splice(productIndex, 1);
        await this.saveProducts();
    }

    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }
}

module.exports = ProductManagerFS;