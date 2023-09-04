import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import initServer from './app.js';

import RoleMongooseRepository from "../data/repositories/RoleMongooseRepository.js";

const { db } = await initServer();

describe("Testing Role Mongoose Repository", () => {
    const roleRepository = new RoleMongooseRepository();
    let role;

    beforeAll( async function () {
       await db.init(process.env.DB_URI);
    });
    afterAll(async function () {
        await db.close();
    });
    test('El repositorio debe ser una instancia de RoleMongooseRepository', function () {
        expect(roleRepository instanceof RoleMongooseRepository).toBeTruthy();
    }, 60000);
    test('El repositorio debe devolver un arreglo', async function () {
        return roleRepository
            .paginate({ limit: 5, page: 1 })
            .then(result => {
                expect(Array.isArray(result.roles)).toBe(true);
                expect(result.pagination.limit).toBe(5);
            }
        );
    }, 60000);
    test('El repositorio debe poder crear un rol', async function () {
        const payload = {
            name: faker.lorem.word(),
            permissions:[
                faker.lorem.word()
            ]
        }

        role = roleRepository.create(payload);

        return role
            .then(result => {
                expect(result.name).toEqual(payload.name);
                expect(result.permissions).toStrictEqual(payload.permissions);
            });
    }, 60000);
    test('El repositorio debe poder encontrar un rol', async function (){
        const foundRole = await role;
        const roleId = foundRole.id.toString();
        
        return roleRepository
            .getOne(roleId)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
                expect(typeof result).toBe('object'); 
                expect(result).toHaveProperty('id');
            });
    }, 60000);
    test('El repositorio debe poder actualizar un role', async function (){
        const foundRole = await role;
        const roleId = foundRole.id.toString();
        
        const payload = {
            name: faker.lorem.word(),
            permissions:[
                faker.lorem.word()
            ]
        }

        return roleRepository
            .updateOne(roleId, payload)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
                expect(typeof result).toBe('object'); 
                expect(result).toHaveProperty('id');
                expect(result.name).toEqual(payload.name);
                expect(result.permissions).toStrictEqual(payload.permissions);
            });
    }, 60000);
    test('El repositorio debe poder eliminar un role', async function (){
        const foundRole = await role;
        const roleId = foundRole.id.toString();
        
        return roleRepository
            .deleteOne(roleId)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
            });
    }, 60000);
});
