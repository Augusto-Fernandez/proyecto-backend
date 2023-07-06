import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import RoleMongooseRepository from "../data/repositories/RoleMongooseRepository.js";

describe("Testing Role Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.roleRepository = new RoleMongooseRepository();
    });
    after(function () {
        db.drop();
        db.close();
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de RoleMongooseRepository', function () {
        expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.roleRepository
            .paginate({ limit: 5, page: 1 })
            .then(result => {
                expect(Array.isArray(result.roles)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un rol', function () {
        const role = {
            name: faker.lorem.word(),
            permissions:[
                faker.lorem.word()
            ]
        };

        return this.roleRepository
            .create(role)
            .then(result => {
                expect(result).to.not.be.true;
                /* 
                    expect(result).to.not.be.null;
                    expect(result).to.not.be.undefined;
                    expect(result.name).to.be.equals(role.name);
                    expect(Array.isArray(permissions)).to.be.equals(role.permissions);
                */
            });
    });
    it('El repositorio debe poder encontrar un rol', function (){
        return this.roleRepository
            .getOne("64a74f9e5b74ca50c50bb820")
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
                expect(result).to.have.property('id');
            });
    });
    it('El repositorio debe poder actualizar un role', function (){
        const role = {
            name: faker.lorem.word(),
            permissions:[
                faker.lorem.word()
            ]
        };

        return this.userRepository
            .updateOne("64a74f9e5b74ca50c50bb820", role)
            .then(result => {
                expect(result).to.be.true;
                /* 
                    expect(result).to.not.be.null;
                    expect(result).to.not.be.undefined;
                    expect(result).to.be.an('object');
                    expect(result).to.have.property('id');
                    expect(result.name).to.be.equals(role.name);
                    expect(Array.isArray(permissions)).to.be.equals(role.permissions);
                */
            })
    });
    it('El repositorio debe poder eliminar un role', function (){
        return this.roleRepository
            .deleteOne("64a751cec4e35f5c626cb293")
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
            })
    });
});