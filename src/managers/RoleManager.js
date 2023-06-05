import RoleMongooseDao from "../daos/RoleMongooseDao.js";

class RoleManager{
    constructor(){
        this.roleDao = new RoleMongooseDao();
    }

    async paginate(criteria){
        return this.roleDao.paginate(criteria);
    }

    async getOne(id){
        const validate = await this.roleDao.validateId(id);
        if(!validate){
            throw new Error('Role dont exist');
        }
        return this.roleDao.getOne(id);
    }

    async create(data){
        return await this.roleDao.create(data);
    }

    async updateOne(id,data){
        const validate = await this.roleDao.validateId(id);
        if (!validate){
            throw new Error('Role dont exist');
        }
        return this.roleDao.updateOne(id,data);
    }

    async deleteOne(id){
        const validate = await this.roleDao.validateId(id);
        if (!validate){
            throw new Error('Role dont exist');
        }
        return this.roleDao.deleteOne(id);
    }
}

export default RoleManager;