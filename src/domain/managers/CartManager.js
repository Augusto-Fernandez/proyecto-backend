import container from "../../container.js";

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

    async purchase(id, user){
        const cart = await this.cartRepository.validateId(id);
        if (cart === null) {
            throw new Error('Not Found Id');
        }

        if(cart.products.length===0){
            throw new Error('Empty Cart');
        }

        let code = 1;
        const ticketCode = await this.cartRepository.getAllTickets();
        await Promise.all(ticketCode.map(async (ticket) => {
            if(ticket.code === code.toString()){
                code++;
            }
        }));

        const currentDate = new Date();

        const hour = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const day = currentDate.getDate();
        const month = currentDate.getMonth()+1;
        const year = currentDate.getFullYear();

        const purchaseDate = `${hour}:${formattedMinutes} - ${day}/${month}/${year}`;

        let onStock = [];
        let outOfStock = [];
        let totalAmount = 0;

        await Promise.all(cart.products.map(async (prod) => {
            const product = await this.productRepository.getOne(prod.id);
            if(prod.quantity===0){
                outOfStock.push(prod);
            }else if(prod.quantity>product.stock && product.stock>0){
                onStock.push({...prod, quantity: prod.quantity-product.stock})
                outOfStock.push({...prod, quantity: 0});
            }else if(prod.quantity>product.stock && product.stock===0){
                outOfStock.push({...prod, quantity: 0});
            }else{
                onStock.push(prod);
            }
        }));

        await Promise.all(onStock.map(async (prod) => {
            const product = await this.productRepository.getOne(prod.id);
            totalAmount+=product.price*prod.quantity;
            await this.productRepository.updateOne(prod.id, {...product, stock: product.stock - prod.quantity})
        }));

        if(onStock.length===0){
            throw new Error('Empty Cart, Out Of Stock');
        }

        await this.cartRepository.deleteAll(id);

        if(outOfStock.length>0){
            await Promise.all(outOfStock.map(async (prod) => {
                await this.cartRepository.updateOne(id, {prod})
            }));
        }

        const dto = {
            code: code.toString(),
            purchase_datetime: purchaseDate,
            amount: totalAmount,
            purchaser: user.email
        }

        return this.cartRepository.purchase(dto);
    }
}

export default CartManager;