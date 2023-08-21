import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './app.js'

describe("Testing Product Endpoints Success", () => {
    let _requester;
    let _app;
    let _db;
    let _role = {};
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
        await _app.close();
    });
    test('El repositorio debe devolver un arreglo', async function () {
        const result = await _requester.get('/api/roles/')
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(200);
    }, 60000);
    test('Creacion de rol /api/roles/', async function () {
        const payload = {
            name: "Prueba",
            permissions:[
                "Rol de Prueba"
            ]
        };
        const result = await _requester.post('/api/roles/')
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(payload)
        const { _body, status } = result;

        _role=_body.role;

        expect(status).toEqual(200);
        expect(_body.role.name).toEqual(payload.name);
        expect(_body.role.permissions).toEqual(payload.permissions);
    }, 60000);
    test('El repositorio debe poder encontrar un rol /api/roles/:id', async function (){
        const result = await _requester.get(`/api/roles/${_role.id}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(200);
    }, 60000);
    test('El repositorio debe poder actualizar un producto /api/roles/:id', async function (){
        const update = {
            name: "Update Prueba",
            permissions:[
                "Update Rol de Prueba"
            ]
        };

        const result = await _requester.put(`/api/roles/${_role.id}`)
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(update)
        const { _body, status } = result;

        expect(status).toEqual(200);
        expect(_body.result.name).toEqual(update.name);
        expect(_body.result.permissions).toEqual(update.permissions);
    }, 60000);
    test('El repositorio debe poder eliminar un rol /api/roles/:id', async function (){
        const result = await _requester.delete(`/api/roles/${_role.id}`)
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
        await _app.close();
    });
    test('Fallo creacion de rol /api/roles/', async function () {
        const payload = {
            name: "Prueba"
        };

        const result = await _requester.post('/api/roles')
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(payload)
        const { status } = result;

        expect(status).toEqual(400);
    }, 60000);
    test('Fallo donde el repositorio debe poder encontrar un rol /api/roles/:id', async function (){
        const result = await _requester.get(`/api/roles/${faker.string.numeric(24)}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(404);
    }, 60000);
    test('El repositorio debe fallar la actualizar un rol /api/roles/:id', async function (){
        const update = {
            permissions:[
                "Update Rol de Prueba"
            ]
        };

        const result = await _requester.delete(`/api/roles/${faker.string.numeric(24)}`)
                            .set('Authorization', `Bearer ${_jwt}`)
                            .send(update)
    
        const { status } = result;
        expect(status).toEqual(404);
    }, 60000);
    test('Fallo donde el repositorio debe poder eliminar un rol /api/roles/:id', async function (){
        const result = await _requester.delete(`/api/roles/${faker.string.numeric(24)}`)
                            .set('Authorization', `Bearer ${_jwt}`)
    
        const { status } = result;
        expect(status).toEqual(404);
    }, 60000);
});