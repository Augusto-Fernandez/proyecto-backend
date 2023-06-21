import cartsSchema from "../models/cartsSchema.js";
import Cart from "../../domain/entities/cart.js";

class CartMongooseRepository {
    async validateId(id) {
        return cartsSchema.findOne({ _id: id });
    }

    async create() {
        return cartsSchema.create({});
    }

    async getOne(id) {
        const document = await cartsSchema.findOne({ _id: id }).populate("products.id");

        return new Cart(
            document._id,
            document.products
        )
    }

    async addToCart(cartId, cartProductId) {
        const document = await cartsSchema.findByIdAndUpdate(
            cartId,
            { $push: { products: { id: cartProductId, quantity: 1 } } },
            { new: true }
        );/* .populate("products.id"); */

        return new Cart(
            document._id,
            document.products
        )
    }

    async updatedCart(cartId, cartProductId, index) {
        const document = await cartsSchema.findOneAndUpdate(
            { _id: cartId, "products.id": cartProductId },
            { $set: { "products.$.quantity": index } }
        );

        return new Cart(
            document._id,
            document.products
        )
    }

    async deleteOne(cartId, cartProductId) {
        const document = await cartsSchema.findOneAndUpdate(
            { _id: cartId },
            { $pull: { products: { id: cartProductId } } },
            { returnOriginal: false }
        );

        return new Cart(
            document._id,
            document.products
        )
    }

    async deleteAll(id) {
        const document = await cartsSchema.findOneAndUpdate(
            { _id: id },
            { $set: { products: [] } }
        )

        return new Cart(
            document._id,
            document.products
        )
    }

    async updateOne(id, data) {
        const document = await cartsSchema.findOneAndUpdate({ _id: id }, data, { new: true });

        return new Cart(
            document._id,
            document.products
        )
    }
}

export default CartMongooseRepository;