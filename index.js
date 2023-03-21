const fs = require("fs").promises;

class ProductManager {
  id=1;
  #products = [];
  path = ``;

  constructor() {
    this.#products = [];
    this.id = 1;
    this.path = `./products.json`
  }
  
  async addProduct({title, description, price, thumbnail, code, stock}) {
    
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

    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let newProduct = JSON.parse(productFile);

      const validateId = newProduct.find((p) => p.id === product.id);
      const validateCode = newProduct.find((p) => p.code === product.code)

      if (validateId) {
        throw new Error("Id repetido");
      }

      if (validateCode) {
        throw new Error("Code repetido");
      }

      if (newProduct.length > 0) {
        const lastProduct = newProduct[newProduct.length - 1];
        this.id = lastProduct.id + 1;
      }

      newProduct.push({id: this.id++, ...product});

      await fs.writeFile(this.path, JSON.stringify(newProduct, null, 2));
      return "El objeto se ha creado correctamente";
    } catch(e) {
      throw new Error(e);
    }
  }
  
  async getProducts(){
    try{
      const productFile = await fs.readFile(this.path, "utf-8");
      return JSON.parse(productFile);
    }catch(e){
      await fs.writeFile(this.path, "[]");
      return "No existe el archivo. Se creo uno con un array vacio";
    }
  }

  async getProductById(id) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let idProducts = JSON.parse(productFile);

      const product = idProducts.find(p => p.id === id);

      if (!product) {
        throw new Error("Not Found");
      }
      return product;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateProduct(id, product) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(productFile);

      const idProduct = products.findIndex((p) => p.id === id);

      products.splice(idProduct, 1, { id, ...product });

      await fs.writeFile(this.path, JSON.stringify(products, null, 2));

      return `Se ha modificado el producto`;
    } catch (e) {
      throw new Error(e);
    }
  }
  async deleteProduct(id) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(productFile);

      const idProduct = products.find((p) => p.id === id);

      if (!idProduct) {
        throw new Error("Id no encontrado");
      }
      const deletedProducts = products.filter((p) => p.id !== id);

      await fs.writeFile(this.path, JSON.stringify(deletedProducts, null, 2));

      return `Se ha eliminado el producto`;
    } catch (e) {
      throw new Error(e);
    }
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

const main = async () => {
  console.log(await manager.getProducts());
  console.log(await manager.addProduct(item1));
  console.log(await manager.getProducts());
  console.log(await manager.getProductById(1));
  console.log(await manager.updateProduct(1, {...item1, title: "nuevo producto"}));
  console.log(await manager.getProducts());
  console.log(await manager.deleteProduct(1));
  console.log(await manager.getProducts());
}

main();




