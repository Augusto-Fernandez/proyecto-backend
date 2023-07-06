import userSchema from "../models/userSchema.js";
import User from "../../domain/entities/user.js";

class UserMongooseRepository {
    async validateId(id) {
        return userSchema.findOne({ _id: id });
    }

    async validateEmail(email) {
        return userSchema.findOne({ email })
    }

    async paginate(criteria) {
        const { limit, page } = criteria;
        const userDocuments = await userSchema.paginate({}, {limit, page});/* cambiar a si no devuelve nada({}, { page }) */
        const {docs, ... pagination} = userDocuments;

        const users = docs.map(document => new User ({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            cart: document.cart,
            isAdmin: document.isAdmin
        }));

        return {
            users,
            pagination
        };
    }

    async getOne(id) {
        const document = await userSchema.findOne({ _id: id }).populate(["role"]);

        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            password: document?.password,
            isAdmin: document.isAdmin,
            role: document.role
        })
    }

    async getOneByEmail(email) {
        const document = await userSchema.findOne({ email }).populate(["role"]);

        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            password: document?.password,
            isAdmin: document.isAdmin,
            role: document.role
        })
    }

    async create(data) {
        const document = await userSchema.create(data);

        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            password: document?.password,
            isAdmin: document.isAdmin,
            role: null
        })
    }

    async updateOne(id, data) {
        const document = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true });

        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            isAdmin: document.isAdmin
        })
    }

    async deleteOne(id) {
        return userSchema.deleteOne({ _id: id });
    }

    async addCart(id, cartId){
        const document = await userSchema.findByIdAndUpdate(
            id,
            {$push:{cart:{id: cartId}}},
            {new: true}
        )

        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            password: document?.password,
            isAdmin: document.isAdmin,
            role: document.role
        })
    }

    async deleteCart(id){
        const document = await userSchema.findOneAndUpdate(
            {_id: id},
            {$set: {cart: []}}
        )

        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            password: document?.password,
            isAdmin: document.isAdmin,
            role: document.role
        })
    }

    async addRole(id, data){
        const document = await userSchema.findByIdAndUpdate(
            id,
            {$push:{role:data}},
            {new: true}
        )

        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            password: document?.password,
            isAdmin: document.isAdmin,
            role: document.role
        })
    }

    async deleteRole(id, data){
        const document = await userSchema.findOneAndUpdate(
            {_id: id},
            {$pull: {role: data}},
            {returnOriginal: false}
        );

        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            password: document?.password,
            isAdmin: document.isAdmin,
            role: document.role
        })
    }

    async deleteAllRoles(id){
        const document = await userSchema.findOneAndUpdate(
            {_id: id},
            {$set: {role: []}}
        )
      
        return new User({
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            cart: document?.cart,
            password: document?.password,
            isAdmin: document.isAdmin,
            role: document.role
        })
    }
}

export default UserMongooseRepository;