import mongoose,{Schema} from "mongoose";
import paginate from "mongoose-paginate-v2";

const cartCollection = 'carts'

const cartModel = new Schema ({
    products: {type: Schema.Types.Array, ref:'products', default: []},
    enable: {type: Schema.Types.Boolean, default: true}
})

cartModel.plugin(paginate);
/**
cartModel.pre('findOne', function (){
    this.populate(['products'])
})
 */

export default mongoose.model(cartCollection, cartModel)