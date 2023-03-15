class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }
  
  addProduct({title, description, price, thumbnail, code, stock}) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('Todos los campos son obligatorios');
    }
    /*
    VALIDACIONES
    if (typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Title field is required and must be a non-empty string');
    }
    
    if (typeof description !== 'string' || description.trim().length === 0) {
      throw new Error('Description field is required and must be a non-empty string');
    }
    
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      throw new Error('Price field is required and must be a positive number');
    }
    
    if (typeof thumbnail !== 'string' || thumbnail.trim().length === 0) {
      throw new Error('Thumbnail field is required and must be a non-empty string');
    }
    
    if (typeof code !== 'string' || code.trim().length === 0) {
      throw new Error('Code field is required and must be a non-empty string');
    }
    
    if (typeof stock !== 'number' || isNaN(stock) || stock < 0) {
      throw new Error('Stock field is required and must be a non-negative number');
    }
    */
    
    const product = {
      id: this.nextId,
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
    this.nextId++;
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


