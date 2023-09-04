import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './app.js';

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
        _jwt=login.body.sessionLogin;
    });
    afterAll(async function () {
        await _db.close();
        await _app.close();
    });
    test('El repositorio debe devolver un arreglo', async function () {
        const result = await _requester.get('/api/products/')
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(200);
    }, 60000);
    test('Creacion de producto /api/products/', async function () {
        const payload = {
            title: "Test Product",
            description: "Test Description",
            price: 1,
            thumbnail: "Test Thumbnail",
            code: "1111111111111",
            stock: 1,
            status: true,
        }
        const result = await _requester.post('/api/products/')
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(payload)
        const { _body, status } = result;

        _product=_body.product;

        expect(status).toEqual(201);
        expect(_body.product.title).toEqual(payload.title);
        expect(_body.product.description).toEqual(payload.description);
        expect(_body.product.price).toEqual(payload.price);
        expect(_body.product.thumbnail).toEqual(payload.thumbnail);
        expect(_body.product.code).toEqual(payload.code);
        expect(_body.product.stock).toEqual(payload.stock);
        expect(_body.product.status).toEqual(payload.status);
    }, 60000);
    test('El repositorio debe poder encontrar un producto /api/products/:id', async function (){
        const result = await _requester.get(`/api/products/${_product.id}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(200);
    }, 60000);
    test('El repositorio debe poder actualizar un producto /api/products/:id', async function (){
        const update = {
            title: "Update Test Product",
            description: "Update Test Description",
            price: 2,
            thumbnail: "Update Test Thumbnail",
            code: "222222222222",
            stock: 2,
            status: true,
        }

        const result = await _requester.put(`/api/products/${_product.id}`)
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(update)
        const { _body, status } = result;

        expect(status).toEqual(200);
        expect(_body.product.title).toEqual(update.title);
        expect(_body.product.description).toEqual(update.description);
        expect(_body.product.price).toEqual(update.price);
        expect(_body.product.thumbnail).toEqual(update.thumbnail);
        expect(_body.product.code).toEqual(update.code);
        expect(_body.product.stock).toEqual(update.stock);
        expect(_body.product.status).toEqual(update.status);
    }, 60000);
    test('El repositorio debe poder eliminar un producto /api/products/:id', async function (){
        const result = await _requester.delete(`/api/products/${_product.id}`)
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
        _jwt=login.body.sessionLogin;
    });
    afterAll(async function () {
        await _db.close();
        await _app.close();
    });
    test('Fallo creacion de producto /api/products/', async function () {
        const payload = {
            title: faker.lorem.word(),
            thumbnail: faker.lorem.word(),
            code: faker.string.alphanumeric(),
            stock: faker.number.int(),
            status: true
        }

        const result = await _requester.post('/api/products')
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(payload)
        const { status } = result;

        expect(status).toEqual(400);
    }, 60000);
    test('Fallo donde el repositorio debe poder encontrar un producto /api/products/:id', async function (){
        const result = await _requester.get(`/api/products/${faker.string.numeric(24)}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(404);
    }, 60000);
    test('El repositorio debe fallar la actualizar un producto /api/products/:id', async function (){
        const update = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence(),
            price: faker.number.int(),
            thumbnail: faker.lorem.word(),
            code: faker.string.alphanumeric(),
            stock: faker.number.int(),
            status: true
        }

        const result = await _requester.delete(`/api/products/${faker.string.numeric(24)}`)
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(update)
    
        const { status } = result;
        expect(status).toEqual(404);
    }, 60000);
    test('Fallo donde el repositorio debe poder eliminar un producto /api/products/:id', async function (){
        const result = await _requester.delete(`/api/products/${faker.string.numeric(24)}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(404);
    }, 60000);
});
