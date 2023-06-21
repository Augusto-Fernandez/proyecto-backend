import dotenv from 'dotenv';
dotenv.config();

import { createContainer, asClass, Lifetime } from "awilix";

import UserMongooseRepository from "./data/repositories/UserMongooseRepository.js";
import RoleMongooseRepository from "./data/repositories/RoleMongooseRepository.js";
import ProductMongooseRepository from "./data/repositories/ProductMongooseRepository.js";
import CartMongooseRepository from "./data/repositories/CartMongooseRepository.js";

const container = createContainer();

if (process.env.DB === 'MongooseAdapter') {
    container.register('UserRepository', asClass(UserMongooseRepository), { lifetime: Lifetime.SINGLETON });
    container.register('RoleRepository', asClass(RoleMongooseRepository), { lifetime: Lifetime.SINGLETON });
    container.register('ProductRepository', asClass(ProductMongooseRepository), { lifetime: Lifetime.SINGLETON });
    container.register('CartRepository', asClass(CartMongooseRepository), { lifetime: Lifetime.SINGLETON });
}
else if (process.env.DB === 'FileAdapter') {

}else if (process.env.DB === 'MemoryAdapter') {

}

export default container;