import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import UserMongooseRepository from "../data/repositories/UserMongooseRepository.js";
import RoleMongooseRepository from "../data/repositories/RoleMongooseRepository.js";

describe("Testing User Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.userRepository = new UserMongooseRepository();
        this.user = {};
    });
    after(function () {
        db.drop();
        db.close();
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.userRepository
            .paginate({ limit: 5, page: 1 })
            .then(result => {
                expect(Array.isArray(result.users)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un user', function () {
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };

        this.user = this.userRepository.create(payload)

        return this.user
            .then(result => {
                expect(result.firstName).to.be.equals(payload.firstName);
                expect(result.email).to.be.equals(payload.email);
                expect(result.lastName).to.be.equals(payload.lastName);
                expect(result.age).to.be.equals(payload.age);
            });
    });
    it('El repositorio debe poder encontrar un user', async function (){
        const user = await this.user;
        const userId = user.id.toString();

        return this.userRepository
            .getOne(userId)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
                expect(result).to.have.property('id');
            })
    });
    it('El repositorio debe poder actualizar un user', async function (){
        const user = await this.user;
        const userId = user.id.toString();
        
        const update = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };

        return this.userRepository
            .updateOne(userId, update)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
                expect(result).to.have.property('id');
                expect(result.firstName).to.be.equals(update.firstName);
                expect(result.email).to.be.equals(update.email);
                expect(result.lastName).to.be.equals(update.lastName);
                expect(result.age).to.be.equals(update.age);
            })
    });
    it('El repositorio debe poder eliminar un user', async function (){
        const user = await this.user;
        const userId = user.id.toString();

        return this.userRepository
            .deleteOne(userId)
            .then(result => {
                console.log("el pedo 2011")
            })
    });
});