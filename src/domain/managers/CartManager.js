import container from "../../container.js";
import idStringValidation from "../validations/shared/idStringValidation.js";

class CartManager {
    constructor() {
        this.cartRepository = container.resolve('CartRepository');
        this.productRepository = container.resolve('ProductRepository');
    }

    async create() {
        return this.cartRepository.create()
    }

    async getOne(id) {
        const cart = await this.cartRepository.validateId(id)
        if (cart === null) {
            throw new Error('Not Found Id');
        }
        return this.cartRepository.getOne(id);
    }

    async addToCart(cartId, productId) {
        await idStringValidation.parseAsync(cartId);
        await idStringValidation.parseAsync(productId);

        const cart = await this.cartRepository.validateId(cartId);
        if (cart === null) {
            throw new Error('Not Found Id');
        }

        const validateProduct= await this.productRepository.validateId(productId);
        if (validateProduct === null) {
            throw new Error('Not Found Product Id');
        }

        const productExist = cart.products.findIndex(prod => prod.id === productId);

        if (productExist !== -1) {
            const update = cart.products[productExist].quantity + 1;
            return this.cartRepository.updatedCart(cartId, productId, update);
        }

        return this.cartRepository.addToCart(cartId, productId);
    }

    async deleteOne(cartId, productId) {
        await idStringValidation.parseAsync(cartId);
        await idStringValidation.parseAsync(productId);

        const cart = await this.cartRepository.validateId(cartId);
        if (cart === null) {
            throw new Error('Not Found Id');
        }

        const product= await this.productRepository.validateId(productId);
        if (product === null) {
            throw new Error('Not Found Product Id');
        }
        const productExist = cart.products.findIndex(product => product.id === productId);

        if (productExist === -1) {
            throw new Error('Not Found Product in Cart');
        }

        return this.cartRepository.deleteOne(cartId, productId);
    }

    async deleteAll(id) {
        const cart = await this.cartRepository.validateId(id);
        if (cart === null) {
            throw new Error('Not Found Id');
        }

        return this.cartRepository.deleteAll(id)
    }

    async updateOne(id, data) {
        const cart = await this.cartRepository.validateId(id);
        if (cart === null) {
            throw new Error('Not Found Id');
        }

        return this.cartRepository.updateOne(id, data)
    }
}

export default CartManager;