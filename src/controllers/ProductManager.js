import fs from "fs/promises"

class ProductManager {
  id=1;
  #products = [];
  path = ``;

  constructor() {
    this.#products = [];
    this.id = 1;
    this.path = `../src/db/products.json`
  }
  
  async addProduct({title, description, price, thumbnail, code, stock, status}) {
    
    const product = {
      id: this.id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      status: status
    };

    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let newProduct = JSON.parse(productFile);

      if (newProduct.length > 0) {
        const lastProduct = newProduct[newProduct.length - 1];
        this.id = lastProduct.id + 1;
      }

      newProduct.push({id: this.id++, ...product});

      await fs.writeFile(this.path, JSON.stringify(newProduct, null, 2));
      return "El objeto se ha creado correctamente";
    } catch(e) {
      await fs.writeFile(this.path, "[]");
      const productFile = await fs.readFile(this.path, "utf-8");
      const newProduct = JSON.parse(productFile);
      newProduct.push({id: this.id++, ...product});

      await fs.writeFile(this.path, JSON.stringify(newProduct, null, 2));
      return "El objeto se ha creado correctamente";
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
    const productFile = await fs.readFile(this.path, "utf-8");
    let idProducts = JSON.parse(productFile);

    const product = idProducts.find(p => p.id === id);

    if (!product) {
      return null;
    }
    return product;
  }

  async updateProduct(id, product) {
    const productFile = await fs.readFile(this.path, "utf-8");
    let products = JSON.parse(productFile);

    const idProduct = products.findIndex((p) => p.id === id);

    products.splice(idProduct, 1, { id, ...product });

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    return `Se ha modificado el producto`;
  }
  
  async deleteProduct(id) {
    const productFile = await fs.readFile(this.path, "utf-8");
    let products = JSON.parse(productFile);

    const deletedProducts = products.filter((p) => p.id !== id);

    await fs.writeFile(this.path, JSON.stringify(deletedProducts, null, 2));

    return `Se ha eliminado el producto`;
  }
}

export default ProductManager;




