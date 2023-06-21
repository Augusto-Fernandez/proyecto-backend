import container from "../../container.js"

class ProductManager {
    constructor() {
        this.productRepository = container.resolve('ProductRepository')
    }

    async getAll(sort, criteria) {
        if (sort === "asc") {
            return this.productRepository.getAsc()
        } else if (sort === "desc") {
            return this.productRepository.getDesc()
        }
        return this.productRepository.getAll(criteria)
    }

    async getOne(id) {
        const validate = await this.productRepository.validateId(id)
        if (validate === null) {
            throw new Error('Not Found Id');
        }

        return this.productRepository.getOne(id)
    }

    async create(data) {
        return this.productRepository.create(data)
    }

    async updatOne(id, data) {
        const validate = await this.productRepository.validateId(id)
        if (validate === null) {
            throw new Error('Not Found Id');
        }

        return this.productRepository.updateOne(id, data)
    }

    async delete(id) {
        const validate = await this.productRepository.validateId(id)
        if (validate === null) {
            throw new Error('Not Found Id');
        }
        return this.productRepository.delete(id)
    }
}

export default ProductManager;