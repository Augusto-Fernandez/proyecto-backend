import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import CartMongooseRepository from "../data/repositories/CartMongooseRepository.js";
import ProductMongooseRepository from "../data/repositories/ProductMongooseRepository.js";

describe("Testing Cart Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.cartRepository = new CartMongooseRepository();
        this.cart = {};
    });
    after(function () {
        db.drop();
        /* db.close() */
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de CartMongooseRepository', function () {
        expect(this.cartRepository instanceof CartMongooseRepository).to.be.ok;
    });
    it('El repositorio debe poder crear un cart', function () {
        this.cart = this.cartRepository.create({})

        return this.cart
            .then(result => {
                expect(result.id).to.be.ok;
                expect(result.products).to.be.ok;
            });
    });
    it('El repositorio debe poder encontrar un cart', async function (){
        const cart = await this.cart;
        const cartId = cart.id.toString();

        return this.cartRepository
            .getOne(cartId)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
                expect(result).to.have.property('id');
            })
    });
    it('El repositorio debe poder actualizar un role', async function (){
        const cart = await this.cart;
        const cartId = cart.id.toString();
        
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
        };

        return this.cartRepository
            .updateOne(cartId, payload)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
                expect(result).to.have.property('id');
                expect(result.id.id).to.be.ok
                expect(result.id.products).to.deep.equal(payload.products);
            })
    });
    it('El repositorio debe poder eliminar un cart', async function (){
        const cart = await this.cart;
        const cartId = cart.id.toString();

        return this.cartRepository
            .deleteCart(cartId)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
            })
    });
});

