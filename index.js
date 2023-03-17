class ProductManager {
  constructor() {
    this.products = [];
    this.id = 1;
  }
  
  addProduct({title, description, price, thumbnail, code, stock}) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('Todos los campos son obligatorios');
    }
    
    const product = {
      id: this.id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    };

    const duplicateProduct = this.products.find(p => p.code === product.code);
    if (duplicateProduct) {
      throw new Error('Producto duplicado');
    }

    this.products.push(product);
    this.id++;
  }
  
  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error('Not Found');
    }
    
    return product;
  }
  
  getProducts() {
    return this.products;
  }
}

const manager = new ProductManager();
const item1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock:25
}
const item2 = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price:200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock:25
}
const item3 = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price:200,
  thumbnail: "Sin imagen",
  code: "abc123",
}

console.log(manager.getProducts());
manager.addProduct(item1);
console.log(manager.getProducts());
manager.addProduct(item2);
manager.addProduct(item3);
console.log(manager.getProducts());


