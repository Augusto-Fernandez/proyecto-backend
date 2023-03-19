class ProductManager {
  constructor() {
    this.products = [];
    this.id = 1;
  }
  
  addProduct({title, description, price, thumbnail, code, stock}) {
    
    if (typeof title !== 'string' || title.trim().length === 0) {
      return "Campo obligatorio";
    }
    
    if (typeof description !== 'string' || description.trim().length === 0) {
      return "Campo obligatorio";
    }
    
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      return "Campo obligatorio";
    }
    
    if (typeof thumbnail !== 'string' || thumbnail.trim().length === 0) {
      return "Campo obligatorio";
    }
    
    if (typeof code !== 'string' || code.trim().length === 0) {
      return "Campo obligatorio";
    }
    
    if (typeof stock !== 'number' || isNaN(stock) || stock < 0) {
      return "Campo obligatorio";
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

    const validateCode = this.products.find(p => p.code === product.code);
    if (validateCode) {
      return 'Producto duplicado';
    }

    this.products.push(product);
    this.id++;
  }
  
  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      return "Not Found";
    }
    
    return product;
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
console.log(manager.addProduct(item2))
console.log(manager.addProduct(item3))
console.log(manager.getProducts());


