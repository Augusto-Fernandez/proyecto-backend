import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './app.js'

const { app, db } = await initServer();

describe("Testing Product Endpoints Success", () => {
    let jwt;
    let requester;

    beforeAll(async function () {
        const application = app.callback();
        requester = supertest.agent(application);
        this.product = {};
        
        const login = await requester.post('/api/sessions/login').send({email: 'admin@admin.com', password: '12345678'});
        jwt = login.body.accessToken;
    });
    afterAll(async function () {
        //await this.db.drop(); 
        await db.close();
        /*
        requester.app.close(() => {
            console.log('Conexión cerrada');
        });
        */
    });
    test('Creacion de producto /api/products/', function () {
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

        this.product = requester
                        .post('/api/products/')
                        .set('Authorization', `Bearer ${jwt}`)
                        .send(payload)

        return requester
            .then(result => {
                const { _body, status } = result;
                console.log(_body)
                console.log(status)
            });
    }, 60000);
    test('Get de todos productos /api/products/', async function (){
        return requester
            .get('/api/products/')
            .set('Authorization', `Bearer ${jwt}`)
            .then(result => {
                const { _body, status } = result;
                console.log(_body)
                console.log(status)
            })
    }, 60000);
    test('Get de un producto /api/products/id', async function (){
        const product = await this.product;
        const productId = product.id.id.toString();

        return requester
            .get('/api/products/:id')
            .set('Authorization', `Bearer ${jwt}`)
            .send(productId)
            .then(result => {
                const { _body, status } = result;
                console.log(_body)
                console.log(status)
            })
    }, 60000);
    test('Actualizar un producto /api/products/id', async function (){
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

        return requester
            .put('/api/products/:id')
            .set('Authorization', `Bearer ${jwt}`)
            .send(productId, update)
            .then(result => {
                const { _body, status } = result;
                console.log(_body)
                console.log(status)
            });
    }, 60000);
    test('Eliminar un producto /api/products/id', async function (){
        const product = await this.product;
        const productId = product.id.id.toString();

        return requester
            .delete('/api/products/:id')
            .set('Authorization', `Bearer ${jwt}`)
            .send(productId)
            .then(result => {
                const { _body, status } = result;
                console.log(_body)
                console.log(status)
            })
    }, 60000);
});
