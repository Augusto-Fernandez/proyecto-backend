import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './app.js'

describe("Testing Product Endpoints Success", () => {
    let _requester;
    let _app;
    let _db;
    let _product = {};
    let _jwt;

    beforeAll(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        _requester = supertest.agent(application);
        _app = app;
        _db = db;

        const login = await _requester.post('/api/sessions/login').send({email: 'admin@admin.com', password: '12345678'});
        _jwt=login.body.sessionLogin
    });
    afterAll(async function () {
        await _db.close();
        await _requester._app.close();
    });
    test('El repositorio debe devolver un arreglo', async function () {
        const result = await _requester.get('/api/products/')
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(200);
    }, 60000);
    test('Creacion de producto /api/products/', async function () {
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

        const result = await _requester.post('/api/products')
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(payload)
        const { _body, status } = result;

        _product=_body.id

        expect(status).toEqual(201);
        expect(_body.id.title).toEqual(payload.title);
        expect(_body.id.description).toEqual(payload.description);
        expect(_body.id.price).toEqual(payload.price);
        expect(_body.id.thumbnail).toEqual(payload.thumbnail);
        expect(_body.id.code).toEqual(payload.code);
        expect(_body.id.stock).toEqual(payload.stock);
        expect(_body.id.status).toEqual(payload.status);
    }, 60000);
    test('El repositorio debe poder encontrar un producto /api/products/:id', async function (){
        const foundProduct = await _product;
        const productId = foundProduct.id.id.toString();

        const result = await _requester.get(`/api/products/${productId}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(200);
    }, 60000);
    test('El repositorio debe poder actualizar un producto /api/products/:id', async function (){
        const foundProduct = await _product;
        const productId = foundProduct.id.id.toString()
        
        const update = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence(),
            price: faker.number.int(),
            thumbnail: faker.lorem.word(),
            code: faker.string.alphanumeric(),
            stock: faker.number.int(),
            status: true
            // enable: true
        };

        const result = await _requester.put(`/api/products/${productId}`)
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(update)
        const { _body, status } = result;
        expect(status).toEqual(200);
        expect(_body.id.title).toEqual(update.title);
        expect(_body.id.description).toEqual(update.description);
        expect(_body.id.price).toEqual(update.price);
        expect(_body.id.thumbnail).toEqual(update.thumbnail);
        expect(_body.id.code).toEqual(update.code);
        expect(_body.id.stock).toEqual(update.stock);
        expect(_body.id.status).toEqual(update.status);
    }, 60000);
    test('El repositorio debe poder eliminar un producto /api/products/:id', async function (){
        const foundProduct = await _product;
        const productId = foundProduct.id.id.toString();

        const result = await _requester.delete(`/api/products/${productId}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(200);
    }, 60000);
});
describe("Testing Product Endpoints Fail", () => {
    let _requester;
    let _app;
    let _db;
    let _jwt;

    beforeAll(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        _requester = supertest.agent(application);
        _app = app;
        _db = db;

        const login = await _requester.post('/api/sessions/login').send({email: 'admin@admin.com', password: '12345678'});
        _jwt=login.body.sessionLogin
    });
    afterAll(async function () {
        await _db.close();
        await _requester.app.close();
    });
    test('Fallo reacion de producto /api/products/', async function () {
        const payload = {
            title: faker.lorem.word(),
            thumbnail: faker.lorem.word(),
            code: faker.string.alphanumeric(),
            stock: faker.number.int(),
            status: true
            /* enable: true daba error porque está true como default */
        };

        const result = await _requester.post('/api/products')
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(payload)
        const { status } = result;

        expect(status).toEqual(401);
    }, 60000);
    test('Fallo donde el repositorio debe poder encontrar un producto /api/products/:id', async function (){
        const result = await _requester.get(`/api/products/${faker.string.numeric(24)}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(401);
    }, 60000);
    test('El repositorio debe poder actualizar un producto /api/products/:id', async function (){
        const update = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence(),
            price: faker.number.int(),
            thumbnail: faker.lorem.word(),
            code: faker.string.alphanumeric(),
            stock: faker.number.int(),
            status: true
            // enable: true
        };

        const result = await _requester.delete(`/api/products/${faker.string.numeric(24)}`)
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(update)
    
        const { status } = result;
        expect(status).toEqual(401);
    }, 60000);
    test('Fallo donde el repositorio debe poder eliminar un producto /api/products/:id', async function (){
        const result = await _requester.delete(`/api/products/${faker.string.numeric(24)}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(401);
    }, 60000);
});