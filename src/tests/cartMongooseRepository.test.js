import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import initServer from './app.js';

import CartMongooseRepository from "../data/repositories/CartMongooseRepository.js";

const { db } = await initServer();

describe("Testing Cart Mongoose Repository", () => {
    const cartRepository = new CartMongooseRepository();
    let cart;
    
    beforeAll( async function () {
        await db.init(process.env.DB_URI);
    });
    afterAll(async function () {
        await db.close();
    })
    test('El repositorio debe ser una instancia de CartMongooseRepository', function () {
        expect(cartRepository instanceof CartMongooseRepository).toBeTruthy();
    })
    test('El repositorio debe poder crear un cart', async function () {
        cart = cartRepository.create({});

        return cart
            .then(result => {
                expect(result._id).toBeTruthy();
                expect(result.products).toBeTruthy();
            });
    }, 60000);
    test('El repositorio debe poder encontrar un cart', async function (){
        const cartId = await cart;

        return cartRepository
            .getOne(cartId.id)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
                expect(typeof result).toBe('object'); 
                expect(result).toHaveProperty('id');
            })
    }, 60000);
    test('El repositorio debe poder actualizar un cart', async function (){
        const cartId = await cart;
        
        const payload = {
            products:[
                {
                    title: faker.lorem.word(),
                    description: faker.lorem.sentence(),
                    price: faker.number.int(),
                    thumbnail: faker.lorem.word(),
                    code: faker.string.alphanumeric(),
                    stock: faker.number.int(),
                    status: true
                }
            ]
        }

        return cartRepository
            .updateOne(cartId.id, payload)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
                expect(typeof result).toBe('object'); 
                expect(result).toHaveProperty('id');
                expect(result.id).toBeTruthy();
                expect(result.products).toStrictEqual(payload.products);
            })
    }, 60000);
    test('El repositorio debe poder eliminar un cart', async function (){
        const cartId = await cart

        return cartRepository
            .deleteCart(cartId.id)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
            })
    }, 60000);
});


