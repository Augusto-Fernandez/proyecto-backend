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
      console.log('nuevo')
      return "El carrito se ha creado correctamente";

    }catch(e){
      await fs.writeFile(this.path, "[]");
      const cartFile = await fs.readFile(this.path, "utf-8");
      const newCart = JSON.parse(cartFile);
      newCart.push({id: this.id++, products: []});

      await fs.writeFile(this.path, JSON.stringify(newCart, null, 2));
      console.log("creado")
      return "El carrito se ha creado correctamente";
    }
  }
}

export default CartManager;




