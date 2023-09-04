import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './app.js';

describe("Testing Auth Endpoints Success", () => {
    let _jwt;
    let _requester;
    let _app;
    let _db;
    let _payload = {};
    let _user;

    beforeAll(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        _requester = supertest.agent(application);
        _app = app;
        _db = db;
    });
    afterAll(async function () {
        const login = await _requester.post('/api/sessions/login').send({email: 'admin@admin.com', password: '12345678'});
        _jwt=login.body.sessionLogin;

        await _requester.delete(`/api/users/${_user}`).set('Authorization', `Bearer ${_jwt}`);

        await _db.close();
        await _app.close();
    });
    test('Creacion de cuenta /api/sessions/signup', async function () {
        _payload = {
            firstName: `${faker.person.firstName()} Ana Maria`,
            lastName: `${faker.person.lastName()} Ana Maria`,
            email: faker.internet.email(),
            age: 20,
            password: "12345678"
        }

        const result = await _requester.post('/api/sessions/signup').send(_payload);
        const { _body, status } = result;
        
        _user = _body.signup.id;

        expect(status).toEqual(201);
        expect(_body.signup.email).toEqual(_payload.email);
        expect(_body.message).toEqual("User created.");
    }, 60000);
    test('Login de cuenta /api/sessions/login', async function () {
        const payload = {
            email: _payload.email,
            password: _payload.password
        }

        const result = await _requester.post('/api/sessions/login').send(payload);
        const { _body, status } = result;
        expect(status).toEqual(200);
        expect(_body.message).toEqual("Login success!");
        _jwt = _body.sessionLogin;
    }, 60000);
    test('Current /api/sessions/current', async function () {
        const payload = {
            email: _payload.email,
            password: _payload.password
        }

        const result = await _requester.get('/api/sessions/current').set('Authorization', `Bearer ${_jwt}`).send(payload);
        const { _body, status } = result;
        expect(status).toEqual(200);
        expect(_body.payload._doc.email).toEqual(payload.email);
    }, 60000);
});

describe("Testing Auth Endpoints Fails", () => {
    let _requester;
    let _app;
    let _db;

    beforeAll(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        _requester = supertest.agent(application);
        _app = app;
        _db = db;
    });
    afterAll(async function () {
        await _db.close();
        await _app.close();
    });
    test('Creacion de cuenta /api/sessions/signup', async function () {
        const payload = {
            firstName: 'Ana',
            lastName: 'Ana',
            email: faker.internet.email(),
            age: 20,
            password: "12345678"
        }

        const result = await _requester.post('/api/sessions/signup').send(payload);
        const { status } = result;
        expect(status).toEqual(400);
    }, 60000);
    test('Error format email /api/sessions/login', async function () {
        const payload = {
            email: 'Invalid email',
            password: 'incorrectpassword'
        }

        const result = await _requester.post('/api/sessions/login').send(payload);
        const { _body, status } = result;
        expect(status).toEqual(400);
        expect(_body.message[0].message).toEqual(payload.email);
    }, 60000);
    test('User dont exist /api/sessions/login', async function () {
        const payload = {
            email: 'martin@gmail.com',
            password: 'incorrectpassword'
        }

        const result = await _requester.post('/api/sessions/login').send(payload)
        const { status } = result;
        expect(status).toEqual(404);
    }, 60000);
});
