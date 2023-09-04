import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import initServer from './app.js';

import ProductMongooseRepository from "../data/repositories/ProductMongooseRepository.js";

const { db } = await initServer();

describe("Testing Product Mongoose Repository", () => {
    const productRepository = new ProductMongooseRepository();
    let product;
    
    beforeAll( async function () {
       await db.init(process.env.DB_URI);
    });
    afterAll(async function () {
        await db.close();
    });
    test('El repositorio debe ser una instancia de ProductMongooseRepository', function () {
        expect(productRepository instanceof ProductMongooseRepository).toBeTruthy();
    }, 60000);
    test('El repositorio debe devolver un arreglo', async function () {
        return productRepository
            .getAll({ limit: 5, page: 1 })
            .then(result => {
                expect(Array.isArray(result.payload.products)).toBe(true);
                expect(result.payload.pagination.limit).toEqual(5);
            }
        );
    }, 60000);
    test('El repositorio debe poder crear un producto', async function () {
        const payload = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence(),
            price: faker.number.int(),
            thumbnail: faker.lorem.word(),
            code: faker.string.alphanumeric(),
            stock: faker.number.int(),
            status: true
        }

        product = productRepository.create(payload)

        return product
            .then(result => {
                expect(result.title).toEqual(payload.title);
                expect(result.description).toEqual(payload.description);
                expect(result.price).toEqual(payload.price);
                expect(result.thumbnail).toEqual(payload.thumbnail);
                expect(result.code).toEqual(payload.code);
                expect(result.stock).toEqual(payload.stock);
                expect(result.status).toEqual(payload.status);
            });
    }, 60000);
    test('El repositorio debe poder encontrar un producto', async function (){
        const foundProduct = await product;
        const productId = foundProduct.id.toString();

        return productRepository
            .getOne(productId)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
                expect(typeof result).toBe('object'); 
                expect(result).toHaveProperty('id');
            })
    }, 60000);
    test('El repositorio debe poder actualizar un producto', async function (){
        const foundProduct = await product;
        const productId = foundProduct.id.toString()
        
        const update = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence(),
            price: faker.number.int(),
            thumbnail: faker.lorem.word(),
            code: faker.string.alphanumeric(),
            stock: faker.number.int(),
            status: true
        }

        return productRepository
            .updateOne(productId, update)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
                expect(typeof result).toBe('object'); 
                expect(result).toHaveProperty('id')
                expect(result.title).toEqual(update.title);
                expect(result.description).toEqual(update.description);
                expect(result.price).toEqual(update.price);
                expect(result.thumbnail).toEqual(update.thumbnail);
                expect(result.code).toEqual(update.code);
                expect(result.stock).toEqual(update.stock);
                expect(result.status).toEqual(update.status);
            })
    }, 60000);
    test('El repositorio debe poder eliminar un producto', async function (){
        const foundProduct = await product;
        const productId = foundProduct.id.toString();

        return productRepository
            .delete(productId)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
            })
    }, 60000);
});
