import ProductMongooseDao from "../../data/daos/ProductMongooseDao.js";

class ProductManager {
    constructor() {
        this.dao = new ProductMongooseDao()
    }

    async getAll(sort, criteria) {
        if (sort === "asc") {
            return this.dao.getAsc()
        } else if (sort === "desc") {
            return this.dao.getDesc()
        }
        return this.dao.getAll(criteria)
    }

    async getOne(id) {
        const validate = await this.dao.validateId(id)
        if (validate === null) {
            throw new Error('Not Found Id');
        }

        return this.dao.getOne(id)
    }

    async create(data) {
        return this.dao.create(data)
    }

    async updatOne(id, data) {
        const validate = await this.dao.validateId(id)
        if (validate === null) {
            throw new Error('Not Found Id');
        }

        return this.dao.updateOne(id, data)
    }

    async delete(id) {
        const validate = await this.dao.validateId(id)
        if (validate === null) {
            throw new Error('Not Found Id');
        }
        return this.dao.delete(id)
    }
}

export default ProductManager;