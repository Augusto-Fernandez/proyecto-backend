import CartMongooseDao from "../../data/daos/CartMongooseDao.js";
import ProductMongooseDao from "../../data/daos/ProductMongooseDao.js";

class CartManager {
    constructor() {
        this.dao = new CartMongooseDao()
    }

    async create() {
        return this.dao.create()
    }

    async getOne(id) {
        const cartById = await this.dao.getOne(id);
        if (cartById === null) {
            return { status: "error", error: "Not Found Id" };
        }
        return cartById;
    }

    async addToCart(cartId, cartProductId) {

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
        /* 
        const cart = await this.dao.getOne(cartId);
        if (cart === null) {
            return { status: "error", error: "Not Found Id" };
        }
        const productDao = new ProductMongooseDao()
        const validateProduct= await productDao.getOne(productId);
        if (validateProduct === null) {
            return { status: "error", error: "Not Found Product" };
        }

        const productExist = cart.products.findIndex(prod => prod.id === productId);

        if (productExist !== -1) {
            const update = cart.products[productExist].quantity + 1;
            return this.dao.updatedCart(cartId, productId, update);
        }

        return this.dao.addToCart(cartId, productId);
        */
    }

    async deleteOne(cartId, productId) {
        const cart = await this.dao.getOne(cartId);
        if (cart === null) {
            return { status: "error", error: "Not Found Id" };
        }
        const productDao = new ProductMongooseDao()
        const product= await productDao.getOne(productId);
        if (product === null) {
            return { status: "error", error: "Not Found Product" };
        }
        const productExist = cart.products.findIndex(product => product.id === productId);

        if (productExist === -1) {
            return { status: "error", error: "Not Found Product in Cart" };
        }

        return this.dao.deleteOne(cartId, productId);
    }

    async deleteAll(id) {
        const cart = await this.dao.getOne(id);
        if (cart === null) {
            return { status: "error", error: "Not Found Id" };
        }

        return this.dao.deleteAll(id)
    }

    async updateOne(id, data) {
        const cart = await this.dao.getOne(id);
        if (cart === null) {
            return { status: "error", error: "Not Found Id" };
        }

        return this.dao.updateOne(id, data)
    }
}

export default CartManager;