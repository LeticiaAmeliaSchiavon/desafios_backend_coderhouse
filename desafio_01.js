class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(product) {
      const { title, description, price, thumbnail, code, stock } = product;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos os campos são obrigatórios.');
        return;
      }
  
      const codeExists = this.products.some(p => p.code === code);
      if (codeExists) {
        console.error('O código já existe.');
        return;
      }
  
      const newProduct = { ...product, id: this.nextId++ };
      this.products.push(newProduct);
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        console.error('Não encontrado');
        return null;
      }
      return product;
    }
  }
  
  const manager = new ProductManager();
  manager.addProduct({
    title: 'Produto 1',
    description: 'Descrição do Produto 1',
    price: 100,
    thumbnail: 'caminho/para/imagem1',
    code: 'PROD1',
    stock: 10
  });
  
  manager.addProduct({
    title: 'Produto 2',
    description: 'Descrição do Produto 2',
    price: 200,
    thumbnail: 'caminho/para/imagem2',
    code: 'PROD2',
    stock: 20
  });
  
  console.log(manager.getProductById(1));
  console.log(manager.getProductById(3));
  