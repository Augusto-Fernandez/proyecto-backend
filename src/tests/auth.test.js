import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './app.js'

const { app, db } = await initServer();

describe("Testing Auth Endpoints Success", () => {
    let jwt;
    let requester;

    beforeAll(async function () {
        const application = app.callback();
        requester = supertest.agent(application);
        this.payload = {};
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
    test('Creacion de cuenta /api/sessions/signup', function () {
        this.payload = {
            firstName: `${faker.person.firstName()} Ana Maria`,
            lastName: `${faker.person.lastName()} Ana Maria`,
            email: faker.internet.email(),
            age: 20,
            password: "12345678"
        };

        return requester
            .post('/api/sessions/signup')
            .send(this.payload)
            .then(result => {
                const { _body, status } = result;
                expect(status).toEqual(201);
                expect(_body.signup.email).toEqual(payload.email);
                expect(_body.message).toEqual("User created.");
            }
            );
    }, 60000);
    test('Login de cuenta /api/sessions/login', function () {
        const payload = {
            email: this.payload.email,
            password: this.payload.password
        };

        return requester
            .post('/api/sessions/login')
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).toEqual(200);
                expect(_body.message).toEqual("Login success!");

                jwt = _body.sessionLogin;
            });
    });
    test('Current /api/sessions/current', function () {
        const payload = {
            email: this.payload.email,
            password: this.payload.password
        };

        return requester
            .get('/api/sessions/current')
            .set('Authorization', `Bearer ${jwt}`)
            .send(payload)
            .then(result => {
                const { _body, status } = result;
                expect(status).toEqual(200);
                expect(_body.payload._doc.email).toEqual(payload.email);
            });
    }, 60000);
});

describe("Testing Auth Endpoints Fails", () => {
    let requester;
    
    beforeAll(async function () {
        const application = app.callback();
        requester = supertest.agent(application);
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
    test('Creacion de cuenta /api/sessions/signup', function () {
        const payload = {
            firstName: 'Ana',
            lastName: 'Ana',
            email: faker.internet.email(),
            age: 20,
            password: "12345678"
        };

        return requester
            .post('/api/sessions/signup')
            .send(payload)
            .then(result => {
                const { status } = result;
                expect(status).toEqual(400);
            });
    }, 60000);
    test('Error format email /api/sessions/login', function () {
        const payload = {
            email: 'Invalid email',
            password: 'incorrectpassword'
        };

        return requester
            .post('/api/sessions/login')
            .send(payload)
            .then(result => {
                const { _body, status } = result;

                expect(status).toEqual(400);
                expect(_body.message[0].message).toEqual(payload.email);
                // expect(_body.message[0].message).to.be.equals("Invalid email");
            });
    }, 60000);
    test('User dont exist /api/sessions/login', function () {
        const payload = {
            email: 'martin@gmail.com',
            password: 'incorrectpassword'
        };

        return requester
            .post('/api/sessions/login')
            .send(payload)
            .then(result => {
                const { status } = result;

                expect(status).toEqual(404);
            });
    }, 60000);
});