import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import initServer from './app.js';

import UserMongooseRepository from "../data/repositories/UserMongooseRepository.js";

const { db } = await initServer();

describe("Testing User Mongoose Repository", () => {
    const userRepository = new UserMongooseRepository();
    let user;

    beforeAll( async function () {
        await db.init(process.env.DB_URI);
    });
     afterAll(async function () {
         await db.close();
    });
    test('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(userRepository instanceof UserMongooseRepository).toBeTruthy();
    }, 60000);
    test('El repositorio debe devolver un arreglo', async function () {
        return userRepository
            .paginate({ limit: 5, page: 1 })
            .then(result => {
                expect(Array.isArray(result.users)).toBe(true);
                expect(result.pagination.limit).toBe(5);
            }
        );
    }, 60000);
    test('El repositorio debe poder crear un user', async function () {
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };

        user = userRepository.create(payload);

        return user
            .then(result => {
                expect(result.firstName).toEqual(payload.firstName);
                expect(result.email).toEqual(payload.email);
                expect(result.lastName).toEqual(payload.lastName);
                expect(result.age).toEqual(payload.age);
            });
    }, 60000);
    test('El repositorio debe poder encontrar un user', async function (){
        const foundUser = await user;
        const userId = foundUser.id.toString();

        return userRepository
            .getOne(userId)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
                expect(typeof result).toBe('object'); 
                expect(result).toHaveProperty('id');
            });
    }, 60000);
    test('El repositorio debe poder actualizar un user', async function (){
        const foundUser = await user;
        const userId = foundUser.id.toString();
        
        const update = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };

        return userRepository
            .updateOne(userId, update)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
                expect(typeof result).toBe('object'); 
                expect(result).toHaveProperty('id');
                expect(result.firstName).toEqual(update.firstName);
                expect(result.email).toEqual(update.email);
                expect(result.lastName).toEqual(update.lastName);
                expect(result.age).toEqual(update.age);
            });
    }, 60000);
    test('El repositorio debe poder eliminar un user', async function (){
        const foundUser = await user;
        const userId = foundUser.id.toString();

        return userRepository
            .deleteOne(userId)
            .then(result => {
                expect(result).not.toBeNull();
                expect(result).toBeDefined();
            });
    }, 60000);
});
