import fs from "fs/promises"

class CartManager {
  id=1;
  #carts = [];
  path = ``;

  constructor() {
    this.#carts = [];
    this.id = 1;
    this.path = `../src/db/cart.json`
  }

  async createCart(){

    const cart = {
      id: this.id,
    }

    try{
      const cartFile = await fs.readFile(this.path, "utf-8");
      const newCart = JSON.parse(cartFile);

      if (newCart.length > 0) {
        const lastCart = newCart[newCart.length - 1];
        this.id = lastCart.id + 1;
      }

      newCart.push({id: this.id++, products: []});

      await fs.writeFile(this.path, JSON.stringify(newCart, null, 2));
      return "El carrito se ha creado correctamente";

    }catch(e){
      await fs.writeFile(this.path, "[]");
      const cartFile = await fs.readFile(this.path, "utf-8");
      const newCart = JSON.parse(cartFile);
      newCart.push({id: this.id++, products: []});

      await fs.writeFile(this.path, JSON.stringify(newCart, null, 2));
      return "El carrito se ha creado correctamente";
    }
  }

  async getCart(){
    try{
      const cartFile = await fs.readFile(this.path, "utf-8");
      return JSON.parse(cartFile);
    }catch(e){
      await fs.writeFile(this.path, "[]");
      return "No existe el archivo. Se creo uno con un array vacio";
    }
  }

  async getCartById(id) {
    const cartFile = await fs.readFile(this.path, "utf-8");
    let idCarts = JSON.parse(cartFile);

    const cart = idCarts.find(p => p.id === id);

    if (!cart) {
      return null;
    }
    return cart;
  }

  async addProductToCart(cartId, prodId){
    const cart = {
      id: prodId,
      quantity: 1
    }

    const cartFile = await fs.readFile(this.path, "utf-8");
    const newCart = JSON.parse(cartFile);
    const cartById = newCart.find(p => p.id === cartId)

    const existingProductIndex = cartById.products.findIndex(p => p.id === prodId);
    
    if (existingProductIndex !== -1) {
      cartById.products[existingProductIndex].quantity++;
    } else {
      cartById.products.push({id: prodId, quantity: 1});
    }

    await fs.writeFile(this.path, JSON.stringify(newCart, null, 2));
    return "Se agregó el producto al carrito";
  }
}

export default CartManager;




