class ProductManager {
  constructor() {
    this.products = [];
    this.currentId = 1; 
  }

  
  addProduct({ title, description, price, thumbnail, code, stock }) {
    
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Todos os campos são obrigatórios.');
      return;
    }

    
    const codeExists = this.products.some(product => product.code === code);
    if (codeExists) {
      console.error(`Erro: O código ${code} já existe.`);
      return;
    }

    
    const newProduct = {
      id: this.currentId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    
    this.products.push(newProduct);
    console.log('Produto adicionado com sucesso:', newProduct);
  }

 
  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.error('Não encontrado');
      return;
    }
    return product;
  }
}


const manager = new ProductManager();
manager.addProduct({
  title: 'Camiseta',
  description: 'Camiseta 100% algodão',
  price: 49.90,
  thumbnail: 'img/camiseta.jpg',
  code: 'CAM123',
  stock: 100
});

console.log(manager.getProductById(1)); 
console.log(manager.getProductById(99));
