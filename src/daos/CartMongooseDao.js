import cartsSchema from "../models/cartsSchema.js";

class CartMongooseDao {
  async create(){
    return cartsSchema.create({});
  }

  async getOne(id){
    return await cartsSchema.findOne({_id: id}).populate("products.id")
  }

  async addToCart(cartId, cartProductId){
    const cartDocument = await cartsSchema.findByIdAndUpdate(
      cartId,
      {$push:{products:{id: cartProductId, quantity: 1}}},
      {new: true}
    );

    return{
      id: cartDocument._id,
      products: cartDocument.products
    }
  }

  async updatedCart(cartId, cartProductId, index){
    const cartDocument = await cartsSchema.findOneAndUpdate(
      {_id:cartId, "products.id":cartProductId},
      {$set:{"products.$.quantity":index}}
    );

    return{
      id: cartDocument._id,
      products: cartDocument.products
    }
  }

  async deleteOne(cartId, cartProductId){
    const cartDocument = await cartsSchema.findOneAndUpdate(
      {_id: cartId},
      {$pull: {products: {id: cartProductId}}},
      {returnOriginal: false}
    );

    return{
      id: cartDocument._id,
      products: cartDocument.products
    }
  }

  async deleteAll(id){
    const cartDocument = await cartsSchema.findOneAndUpdate(
      {_id: id},
      {$set: {products: []}}
    )

    return{
      id: cartDocument._id,
      products: cartDocument.products
    }
  }

  async updateOne(id, data){
    const cartDocument = await cartsSchema.updateOne({_id: id}, data, {new:true})

    return cartDocument.map(cart => ({
      id: cart._id,
      products: cart.products
    }))
  }
}

export default CartMongooseDao;