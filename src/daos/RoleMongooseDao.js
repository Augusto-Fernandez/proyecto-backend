import roleSchema from "../models/roleSchema.js";

class RoleMongooseDao {
    async validateId(id){
        return roleSchema.findOne({ _id: id });
    }

    async paginate(criteria){
        const {limit, page} = criteria;
        const roleDocuments = await roleSchema.paginate({},{page});/* ({}, {limit, page}) */

        roleDocuments.docs = roleDocuments.docs.map(document => ({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        }));

        return roleDocuments;
    }

    async getOne(id){
        const roleDocument = await roleSchema.findOne({_id: id});

        return{
            id: roleDocument?._id,
            name: roleDocument?.name,
            permissions: roleDocument?.permissions
        }
    }

    async create(data){
        const roleDocument = await roleSchema.create(data);

        return{
            id: roleDocument._id,
            name: roleDocument.name,
            permissions: roleDocument.permissions
        }
    }

    async updateOne(id, data){
        const roleDocument = await roleSchema.findOneAndUpdate({_id: id}, data, {new: true});

        return{
            id: roleDocument._id,
            name: roleDocument.name,
            permissions: roleDocument.permissions
        }
    }

    async deleteOne(id){
        return roleSchema.deleteOne({_id: id});
    }
}

export default RoleMongooseDao;