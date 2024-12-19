const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async _readFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {  // Corrigido para "ENOENT"
                return [];
            } else {
                throw error;
            }
        }
    }

    async _writeFile(data) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (error) {
            throw error;
        }
    }

    async addProduct(product) {
        const products = await this._readFile();
        product.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        await this._writeFile(products);
    }

    async getProducts() {
        return await this._readFile();
    }

    async getProductById(id) {
        const products = await this._readFile();
        const product = products.find(p => p.id === id);
        
        if (!product) {
            return `Produto com id ${id} não encontrado`;
        }
        
        return product;
    }

    async updateProduct(id, updatedProduct) {
        const products = await this._readFile();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error(`Produto com id ${id} não encontrado`);
        }
        products[index] = { ...products[index], ...updatedProduct, id: products[index].id };
        await this._writeFile(products);
    }

    async deleteProduct(id) {
        const products = await this._readFile();
        const newProducts = products.filter(p => p.id !== id);
        await this._writeFile(newProducts);
    }
}

const productManager = new ProductManager(path.join(__dirname, 'products.json'));

(async () => {
    await productManager.addProduct({
        title: 'Camiseta',
        description: 'Camiseta 100% algodão',
        price: 49.90,
        thumbnail: 'img/camiseta.jpg',
        code: 'CAM123',
        stock: 100
    });
    
    console.log(await productManager.getProducts());
    console.log(await productManager.getProductById(1));

    await productManager.updateProduct(1, { price: 49.90, stock: 100 });
    await productManager.deleteProduct(1);
})();

module.exports = ProductManager;