import productsSchema from "../models/productsSchema.js";
import Product from "../../domain/entities/product.js";

class ProductMongooseRepository {
    async validateId(id) {
        return productsSchema.findOne({ _id: id });
    }

    async getAll(criteria) {
        const { name, limit, page } = criteria
        const productDocuments = await productsSchema.paginate({ name }, { page })/* saqué el limit porque no dejaba ver todos los productos si no se pasaba query */
        const {docs, ... pagination} = productDocuments;

        const products = docs.map(document => new Product(
            document._id,
            document.title,
            document.description,
            document.price,
            document.thumbnail,
            document.code,
            document.stock,
            document.status
        ));

        return {
            status: "success",
            payload: {
                products,
                pagination
            }
        }
    }

    async getAsc() {
        const productDocuments = await productsSchema.find().sort({ price: 1 });

        const products = productDocuments.map(document => new Product(
            document._id,
            document.title,
            document.description,
            document.price,
            document.thumbnail,
            document.code,
            document.stock,
            document.status
        ));

        return products;
    }

    async getDesc() {
        const productDocuments = await productsSchema.find().sort({ price: -1 });

        const products = productDocuments.map(document => new Product(
            document._id,
            document.title,
            document.description,
            document.price,
            document.thumbnail,
            document.code,
            document.stock,
            document.status
        ));

        return products;
    }

    async getOne(id) {
        const document = await productsSchema.findOne({ _id: id })

        return new Product(
            document._id,
            document.title,
            document.description,
            document.price,
            document.thumbnail,
            document.code,
            document.stock,
            document.status
        )
    }

    async create(data) {
        const document = await productsSchema.create(data)

        return new Product(
            document._id,
            document.title,
            document.description,
            document.price,
            document.thumbnail,
            document.code,
            document.stock,
            document.status
        )
    }

    async updateOne(id, data) {
        const document = await productsSchema.findByIdAndUpdate({ _id: id }, data, { new: true })

        return new Product(
            document._id,
            document.title,
            document.description,
            document.price,
            document.thumbnail,
            document.code,
            document.stock,
            document.status
        )
    }

    async delete(id) {
        return productsSchema.deleteOne({ _id: id })
    }
}

export default ProductMongooseRepository;