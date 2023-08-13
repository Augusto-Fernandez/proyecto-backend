import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const userCollection = 'users';

const userSchema = new Schema({
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, unique: true, required: true },
    age: { type: Schema.Types.Number, default: 18, required: true },
    cart:{type: Schema.Types.Array, ref:'carts', default: []},
    role: [{ type: Schema.Types.ObjectId, index: true, ref: 'roles', default: 'client' }],
    isAdmin: { type: Schema.Types.Boolean, default: false },
    password: { type: Schema.Types.String },
    premium: { type: Schema.Types.Boolean, default: false },
    documents: [{
      name: { type: Schema.Types.String},
      reference: { type: Schema.Types.String}
    }],
    last_connection: {type: Schema.Types.String}
});

userSchema.plugin(paginate);

/*
userSchema.pre('find', function () {
  this.populate(['role']);
});

userSchema.pre('findOne', function () {
  this.populate(['role']);
});
*/

export default mongoose.model(userCollection, userSchema);