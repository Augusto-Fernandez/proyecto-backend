import dotenv from "dotenv";
dotenv.config();

import { faker, ro } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import RoleMongooseRepository from "../data/repositories/RoleMongooseRepository.js";

describe("Testing Role Mongoose Repository", () => {
    before(function () {
        db.init(process.env.DB_URI);
        this.roleRepository = new RoleMongooseRepository();
        this.role = {};
    });
    after(function () {
        db.drop();
        /* db.close() */
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
    it('El repositorio debe poder crear un rol', async function () {
        const payload = {
            name: faker.lorem.word(),
            permissions:[
                faker.lorem.word()
            ]
        };

        this.role = this.roleRepository.create(payload);

        return this.role
            .then(result => {
                expect(result.id.name).to.be.equals(payload.name);
                expect(result.id.permissions).to.deep.equal(payload.permissions);
            });
    });
    it('El repositorio debe poder encontrar un rol', async function (){
        const role = await this.role;
        const roleId = role.id.id.toString();
        
        return this.roleRepository
            .getOne(roleId)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
                expect(result).to.have.property('id');
            });
    });
    it('El repositorio debe poder actualizar un role', async function (){
        const role = await this.role;
        const roleId = role.id.id.toString();
        
        const payload = {
            name: faker.lorem.word(),
            permissions:[
                faker.lorem.word()
            ]
        };

        return this.roleRepository
            .updateOne(roleId, payload)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
                expect(result).to.be.an('object');
                expect(result).to.have.property('id');
                expect(result.id.name).to.be.equals(payload.name);
                expect(result.id.permissions).to.deep.equal(payload.permissions);
            })
    });
    it('El repositorio debe poder eliminar un role', async function (){
        const role = await this.role;
        const roleId = role.id.id.toString();
        
        return this.roleRepository
            .deleteOne(roleId)
            .then(result => {
                expect(result).to.not.be.null;
                expect(result).to.not.be.undefined;
            })
    });
});