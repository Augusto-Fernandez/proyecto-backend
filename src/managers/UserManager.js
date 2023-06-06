import UserMongooseDao from "../daos/UserMongooseDao.js";
import CartMongooseDao from "../daos/CartMongooseDao.js";

class UserManager {
    constructor() {
        this.userDao = new UserMongooseDao();
    }

    async paginate(criteria) {
        return this.userDao.paginate(criteria);
    }

    async getOneByEmail(email) {
        const validate = await this.userDao.validateEmail(email);
        if (!validate) {
            throw new Error('Not Found User Email');
        }
        return this.userDao.getOneByEmail(email);
    }

    async getOne(id) {
        const validate = await this.userDao.validateId(id);
        if (!validate || validate === null || validate === undefined) {
            throw new Error('Not Found User');
        }
        return this.userDao.getOne(id);
    }

    async create(data) {
        const user = await this.userDao.create(data);
        return { ...user, password: undefined };
    }

    async updateOne(id, data) {
        const validate = await this.userDao.validateId(id);
        if (!validate) {
            throw new Error('Not Found User');
        }
        return this.userDao.updateOne(id, data);
    }

    async deleteOne(id) {
        const validate = await this.userDao.validateId(id);
        if (!validate) {
            throw new Error('Not Found User');
        }
        return this.userDao.deleteOne(id);
    }

    async forgetPassword(dto) {
        const validate = await this.userDao.validateEmail(dto.email);
        if (!validate) {
            throw new Error('Not Found User Email');
        }

        const user = await this.userDao.getOneByEmail(dto.email);
        user.password = dto.password;
        return this.userDao.updateOne(user.id, user);
    }

    async addCart(id, cartId){
        const validateUser = await this.userDao.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const CartDao = new CartMongooseDao();
        const validateCart = await CartDao.getOne(cartId);
        if (!validateCart) {
            throw new Error('Cart Not Found');
        }

        /* hacer una validación para que tenga un solo carrito */

        return this.userDao.addCart(id, cartId)
    }

    async deleteCart(id){
        const validateUser = await this.userDao.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        return this.userDao.deleteCart(id);
    }
}

export default UserManager;