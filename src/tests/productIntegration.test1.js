import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './app.js'

describe("Testing Product Endpoints Success", () => {
    let _requester;
    let _app;
    let _db;
    let _payload = {};
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
    test('Creacion de producto /api/products/', async function () {
        _payload = {
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
                            .send(_payload)
        const { _body, status } = result;
        console.log(_body)
        console.log(status)
    }, 60000);
});
