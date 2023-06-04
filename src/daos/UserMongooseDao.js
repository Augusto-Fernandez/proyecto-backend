import userSchema from "../models/userSchema.js";

class UserMongooseDao {
    async validateId(id) {
        return userSchema.findOne({ _id: id });
    }

    async validateEmail(email) {
        return userSchema.findOne({ email })
    }

    async paginate(criteria) {
        const { limit, page } = criteria;
        const userDocuments = await userSchema.paginate({}, { page });/* ({}, {limit, page}) */
        userDocuments.docs = userDocuments.docs.map(user => ({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            isAdmin: user.isAdmin
        }));

        return userDocuments;
    }

    async getOne(id) {
        const userDocument = await userSchema.findOne({ _id: id }).populate(["role"]);

        return {
            id: userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age: userDocument?.age,
            password: userDocument?.password,
            isAdmin: userDocument.isAdmin,
            role: userDocument.role
        }
    }

    async getOneByEmail(email) {
        const userDocument = await userSchema.findOne({ email }).populate(["role"]);

        return {
            id: userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age: userDocument?.age,
            password: userDocument?.password,
            isAdmin: userDocument?.isAdmin,
            role: userDocument.role
        }
    }

    async create(data) {
        const userDocument = await userSchema.create(data);

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            isAdmin: userDocument?.isAdmin
        }
    }

    async updateOne(id, data) {
        const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true });

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            isAdmin: userDocument?.isAdmin
        }
    }

    async deleteOne(id) {
        return userSchema.deleteOne({ _id: id });
    }
}

export default UserMongooseDao;