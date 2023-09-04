import container from "../../container.js";

class RoleManager{
    constructor(){
        this.roleRepository = container.resolve('RoleRepository');
    }

    async paginate(criteria){
        const { limit, page } = criteria;
        let defaultLimit = await this.roleRepository.docCount();

        if(limit !== undefined){
            defaultLimit = limit;
        }

        const dto = {
            limit: defaultLimit,
            page: page
        }
        return this.roleRepository.paginate(dto);
    }

    async getOne(id){
        const validate = await this.roleRepository.validateId(id);
        if(!validate){
            throw new Error('Not Found Id');
        }
        return this.roleRepository.getOne(id);
    }

    async create(data){
        return await this.roleRepository.create(data);
    }

    async updateOne(id,data){
        const validate = await this.roleRepository.validateId(id);
        if (!validate){
            throw new Error('Not Found Id');
        }
        return this.roleRepository.updateOne(id,data);
    }

    async deleteOne(id){
        const validate = await this.roleRepository.validateId(id);
        if (!validate){
            throw new Error('Not Found Id');
        }
        return this.roleRepository.deleteOne(id);
    }
}

export default RoleManager;
