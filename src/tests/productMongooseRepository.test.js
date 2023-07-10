import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import ProductMongooseRepository from "../data/repositories/ProductMongooseRepository.js"

describe("Testing Product Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.productRepository = new ProductMongooseRepository();
        this.product = {};
    });
    after(function () {
        db.drop();
        /* db.close() */
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de ProductMongooseRepository', function () {
        expect(this.productRepository instanceof ProductMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.productRepository
            .getAll({ limit: 5, page: 1 })
            .then(result => {
                expect(Array.isArray(result.payload.products)).to.be.equals(true);
                expect(result.payload.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un producto', function () {
        const payload = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence(),
            price: faker.number.int(),
            thumbnail: faker.lorem.word(),
            code: faker.string.alphanumeric(),
            stock: faker.number.int(),
            status: true
            /* enable: true daba error porque está true como default */
        };

        this.product = this.productRepository.create(payload)

        return this.product
            .then(result => {
                expect(result.id.title).to.be.equals(payload.title);
                expect(result.id.description).to.be.equals(payload.description);
                expect(result.id.price).to.be.equals(payload.price);
                expect(result.id.thumbnail).to.be.equals(payload.thumbnail);
                expect(result.id.code).to.be.equals(payload.code);
                expect(result.id.stock).to.be.equals(payload.stock);
                expect(result.id.status).to.be.equals(payload.status);
                /* expect(result.id.enable).to.be.equals(payload.enable); */
            });
    });
    it('El repositorio debe poder encontrar un producto', async function (){
        const product = await this.product;
        const productId = product.id.id.toString();

        return this.productRepository
            .getOne(productId)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
                expect(result).to.have.property('id');
            })
    });
    it('El repositorio debe poder actualizar un producto', async function (){
        const product = await this.product;
        const productId = product.id.id.toString();
        
        const update = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence(),
            price: faker.number.int(),
            thumbnail: faker.lorem.word(),
            code: faker.string.alphanumeric(),
            stock: faker.number.int(),
            status: true
            /* enable: true */
        };

        return this.productRepository
            .updateOne(productId, update)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
                expect(result).to.have.property('id');
                expect(result.id.title).to.be.equals(update.title);
                expect(result.id.description).to.be.equals(update.description);
                expect(result.id.price).to.be.equals(update.price);
                expect(result.id.thumbnail).to.be.equals(update.thumbnail);
                expect(result.id.code).to.be.equals(update.code);
                expect(result.id.stock).to.be.equals(update.stock);
                expect(result.id.status).to.be.equals(update.status)
                /* expect(result.enable).to.be.equals(update.enable); */
            })
    });
    it('El repositorio debe poder eliminar un producto', async function (){
        const product = await this.product;
        const productId = product.id.id.toString();

        return this.productRepository
            .delete(productId)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
            })
    });
});