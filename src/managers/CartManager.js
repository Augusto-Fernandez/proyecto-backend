import CartMongooseDao from "../daos/CartMongooseDao.js";
import ProductMongooseDao from "../daos/ProductMongooseDao.js";

class CartManager {
  constructor(){
    this.dao = new CartMongooseDao()
  }

  async create(){
    return this.dao.create()
  }

  async getOne(id){
    try{
      const cartById = await this.dao.getOne(id);
      if(cartById === null){
          return {status: "error", error: "Id not found"};
      }
      return cartById;
    }catch{
      return {status: "error", error: "Id not found"};
    }
  }

  async addToCart(cartId, cartProductId){
      try{
        const cartById = await this.dao.getOne(cartId);
        if(cartById === null){
            return {status: "error", error: "Cart id not found"};
        }
        const productDao = new ProductMongooseDao()
        const productById = await productDao.getOne(cartProductId);
        if(productById === null){
            return {status: "error", error: "Product id not found"};
        }
        const productExist = cartById.products.findIndex(product => product.id === cartProductId);

        if(productExist!==-1){
            const update=cartById.products[productExist].quantity+1;
            const updatedCart = await this.dao.updatedCart(cartId, cartProductId, update);
            const newCart=await this.dao.getOne(cartId);
            return newCart;
        }else{
          const addProductToCart = await this.dao.addToCart(cartId, cartProductId);
          return addProductToCart;
        }
    }catch{
        return {status: "error", error: "Id not found"};
    }
  }

  async deleteOne(cartId, cartProductId){
    try{
      const cartById = await this.dao.getOne(cartId);
      if(cartById === null){
          return {status: "error", error: "Cart id not found"};
      }
      const productDao = new ProductMongooseDao()
      const productById = await productDao.getOne(cartProductId);
      if(productById === null){
          return {status: "error", error: "Product id not found"};
      }
      const productExist = cartById.products.findIndex(product => product.id === cartProductId);

      if(productExist!==-1){
          const deleteOne = await this.dao.deleteOne(cartId, cartProductId)
          const newCart=await this.dao.getOne(cartId);
          return newCart;
      }else{
        return {status: "error", error: "Product is not in Cart"};
      }
  }catch{
      return {status: "error", error: "Id not found"};
  }
  }
}

export default CartManager;