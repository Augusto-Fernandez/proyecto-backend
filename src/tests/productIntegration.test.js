import { faker } from '@faker-js/faker';
import chai from "chai";
import supertest from 'supertest';
import initServer from './app.js'

const expect = chai.expect;

describe("Testing Product Endpoints Success", () => {
    before(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.product = {};
        const res = await this.requester.post('/api/sessions/login').send({email: 'admin@admin.com', password: '12345678'});
        this.jwt = res.body.accessToken;
    });
    /*
    after(async function () {
        await this.db.drop(); 
        await this.db.close();
        this.requester.app.close(() => {
            console.log('Conexión cerrada');
        });
    });
    */
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('Creacion de producto /api/products/', function () {
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

        this.product = this.requester
                        .post('/api/products/')
                        .send(payload)
                        .set('Authorization', `Bearer ${this.jwt}`)

        return this.requester
            .then(result => {
                const { _body, status } = result;
                console.log(_body)
                console.log(status)
            });
        });
        it('Get de todos productos /api/products/', async function (){
            return this.requester
                .get('/api/products/')
                .set('Authorization', `Bearer ${this.jwt}`)
                .then(result => {
                    const { _body, status } = result;
                    console.log(_body)
                    console.log(status)
                })
        });
        it('Get de un producto /api/products/id', async function (){
            const product = await this.product;
            const productId = product.id.id.toString();

            return this.requester
                .get('/api/products/:id')
                .send(productId)
                .set('Authorization', `Bearer ${this.jwt}`)
                .then(result => {
                    const { _body, status } = result;
                    console.log(_body)
                    console.log(status)
                })
        });
        it('Actualizar un producto /api/products/id', async function (){
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
                .put('/api/products/:id')
                .send(productId, update)
                .set('Authorization', `Bearer ${this.jwt}`)
                .then(result => {
                    const { _body, status } = result;
                    console.log(_body)
                    console.log(status)
                });
        });
        it('Eliminar un producto /api/products/id', async function (){
            const product = await this.product;
            const productId = product.id.id.toString();

            return this.requester
                .delete('/api/products/:id')
                .send(productId)
                .set('Authorization', `Bearer ${this.jwt}`)
                .then(result => {
                    const { _body, status } = result;
                    console.log(_body)
                    console.log(status)
                })
        });
});
