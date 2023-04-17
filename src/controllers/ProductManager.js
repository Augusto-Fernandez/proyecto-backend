import fs from "fs/promises"

class ProductManager {
  #products = [];
  path = ``;

  constructor() {
    this.#products = [];
    this.id = 1;
    this.path = `./src/db/products.json`
  }
  
  async addProduct({title, description, price, thumbnail, code, stock, status}) {
    const productFile = await fs.readFile(this.path, "utf-8");
    let newProduct = JSON.parse(productFile);
    if (newProduct.length !== 0) {
      const lastProduct = newProduct[newProduct.length - 1];
      this.id = lastProduct.id + 1;
    }

    if (typeof title !== 'string' || title.trim().length === 0) {
      return "Campo obligatorio";
    }
    
    if (typeof description !== 'string' || description.trim().length === 0) {
      return "Campo obligatorio";
    }
    
    if (typeof price !== 'number' || price <= 0) {
      return "Campo obligatorio";
    }
    
    if (typeof thumbnail !== 'string' || thumbnail.trim().length === 0) {
      return "Campo obligatorio";
    }
    
    if (typeof code !== 'string' || code.trim().length === 0) {
      return "Campo obligatorio";
    }
    
    if (typeof stock !== 'number' || stock < 0) {
      return "Campo obligatorio";
    }

    if (typeof status !== 'boolean'){
      return "Campo obligatorio"; 
    }
    
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

    newProduct.push({id: this.id, ...product});

    await fs.writeFile(this.path, JSON.stringify(newProduct, null, 2));
    return "El objeto se ha creado correctamente";
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

      return product;
    } catch (e) {
      return null;
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
      return null
    }
  }
  async deleteProduct(id) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(productFile);

      const idProduct = products.find((p) => p.id === id);

      if (!idProduct) {
        return "Id no encontrado"
      }
      const deletedProducts = products.filter((p) => p.id !== id);

      await fs.writeFile(this.path, JSON.stringify(deletedProducts, null, 2));

      return `Se ha eliminado el producto`;
    } catch (e) {
      return null
    }
  }
}

export default ProductManager;