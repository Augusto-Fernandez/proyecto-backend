import UserMongooseDao from "../daos/UserMongooseDao.js";
import CartMongooseDao from "../daos/CartMongooseDao.js";
import RoleMongooseDao from "../daos/RoleMongooseDao.js";

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
            throw new Error('Not Found Cart');
        }

        const cartLength = validateUser.cart.length
        if(cartLength>0){
            throw new Error('User Has Cart Already');
        }

        return this.userDao.addCart(id, cartId)
    }

    async deleteCart(id){
        const validateUser = await this.userDao.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const cartLength = validateUser.cart.length
        if(cartLength===0){
            throw new Error('Not Found Cart');
        }

        return this.userDao.deleteCart(id);
    }

    async addRole(id, roleId){
        const validateUser = await this.userDao.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const roleDao = new RoleMongooseDao();
        const validateRole = await roleDao.validateId(roleId);
        if (!validateRole) {
            throw new Error('Not Found Role');
        }

        const existingRoles = validateUser.role.map(role => role.toString());
        if (existingRoles.includes(roleId.toString())) {
            throw new Error('Role Already Added');
        }

        return this.userDao.addRole(id, validateRole)
    }

    async deleteRole(id, roleId){
        const validateUser = await this.userDao.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const roleDao = new RoleMongooseDao();
        const validateRole = await roleDao.validateId(roleId);
        if (!validateRole) {
            throw new Error('Not Found Role');
        }

        const existingRoles = validateUser.role.map(role => role.toString());
        if (!existingRoles.includes(roleId.toString())) {
            throw new Error("Not Found User's Role");
        }

        return this.userDao.deleteRole(id, validateRole._id)
    }

    async deleteAllRoles(id){
        const validate = await this.userDao.validateId(id);
        if (!validate) {
            throw new Error('Not Found User');
        }

        const rolesLength = validate.role.length
        if(rolesLength===0){
            throw new Error('Not Found Roles');
        }

        return this.userDao.deleteAllRoles(id);
    }
}

export default UserManager;