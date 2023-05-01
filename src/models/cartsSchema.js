import mongoose,{Schema} from "mongoose";

const cartCollection = 'carts'

const cartModel = new Schema ({
    products: {
        type:Array,
        default: []
    },
    enable: {type: Schema.Types.Boolean, default: true}
})

export default mongoose.model(cartCollection, cartModel)