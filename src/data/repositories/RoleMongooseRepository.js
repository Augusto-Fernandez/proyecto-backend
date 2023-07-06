import roleSchema from "../models/roleSchema.js";
import Role from "../../domain/entities/role.js";

class RoleMongooseRepository {
    async validateId(id){
        return roleSchema.findOne({ _id: id });
    }

    async paginate(criteria){
        const {limit, page} = criteria;
        const roleDocuments = await roleSchema.paginate({}, {limit, page});/* cambiar a si no devuelve nada({}, { page }) */
        const {docs, ... pagination} = roleDocuments;

        const roles = docs.map(document => new Role ({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        }));

        return {
            roles,
            pagination
        };
    }

    async getOne(id){
        const document = await roleSchema.findOne({_id: id});

        return new Role ({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        })
    }

    async create(data){
        const document = await roleSchema.create(data);

        return new Role ({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        })
    }

    async updateOne(id, data){
        const document = await roleSchema.findOneAndUpdate({_id: id}, data, {new: true});

        return new Role ({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        })
    }

    async deleteOne(id){
        return roleSchema.deleteOne({_id: id});
    }
}

export default RoleMongooseRepository;