import container from "../../container.js";
import idStringValidation from "../validations/shared/idStringValidation.js";

class UserManager {
    constructor() {
        this.userRepository = container.resolve('UserRepository');
        this.cartRepository = container.resolve('CartRepository');
        this.roleRepository = container.resolve('RoleRepository');
    }

    async paginate(criteria) {
        return this.userRepository.paginate(criteria);
    }

    async getOneByEmail(email) {
        const validate = await this.userRepository.validateEmail(email);
        if (!validate) {
            throw new Error('Not Found User Email');
        }
        return this.userRepository.getOneByEmail(email);
    }

    async getOne(id) {
        const validate = await this.userRepository.validateId(id);
        if (!validate || validate === null || validate === undefined) {
            throw new Error('Not Found User');
        }
        return this.userRepository.getOne(id);
    }

    async create(data) {
        const user = await this.userRepository.create(data);
        return { ...user, password: undefined };
    }

    async updateOne(id, data) {
        const validate = await this.userRepository.validateId(id);
        if (!validate) {
            throw new Error('Not Found User');
        }
        return this.userRepository.updateOne(id, data);
    }

    async deleteOne(id) {
        const validate = await this.userRepository.validateId(id);
        if (!validate) {
            throw new Error('Not Found User');
        }
        return this.userRepository.deleteOne(id);
    }

    async forgetPassword(dto) {
        const validate = await this.userRepository.validateEmail(dto.email);
        if (!validate) {
            throw new Error('Not Found User Email');
        }

        const user = await this.userRepository.getOneByEmail(dto.email);
        user.password = dto.password;
        return this.userRepository.updateOne(user.id, user);
    }

    async addCart(id, cartId){
        await idStringValidation.parseAsync(id);
        await idStringValidation.parseAsync(cartId);

        const validateUser = await this.userRepository.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const validateCart = await this.cartRepository.getOne(cartId);
        if (!validateCart) {
            throw new Error('Not Found Cart');
        }

        const cartLength = validateUser.cart.length
        if(cartLength>0){
            throw new Error('User Has Cart Already');
        }

        return this.userRepository.addCart(id, cartId)
    }

    async deleteCart(id){
        const validateUser = await this.userRepository.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const cartLength = validateUser.cart.length
        if(cartLength===0){
            throw new Error('Not Found Cart');
        }

        return this.userRepository.deleteCart(id);
    }

    async addRole(id, roleId){
        await idStringValidation.parseAsync(id);
        await idStringValidation.parseAsync(roleId);

        const validateUser = await this.userRepository.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const validateRole = await this.roleRepository.validateId(roleId);
        if (!validateRole) {
            throw new Error('Not Found Role');
        }

        const existingRoles = validateUser.role.map(role => role.toString());
        if (existingRoles.includes(roleId.toString())) {
            throw new Error('Role Already Added');
        }

        return this.userRepository.addRole(id, validateRole)
    }

    async deleteRole(id, roleId){
        await idStringValidation.parseAsync(id);
        await idStringValidation.parseAsync(roleId);

        const validateUser = await this.userRepository.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const validateRole = await this.roleRepository.validateId(roleId);
        if (!validateRole) {
            throw new Error('Not Found Role');
        }

        const existingRoles = validateUser.role.map(role => role.toString());
        if (!existingRoles.includes(roleId.toString())) {
            throw new Error("Not Found User's Role");
        }

        return this.userRepository.deleteRole(id, validateRole._id)
    }

    async deleteAllRoles(id){
        const validate = await this.userRepository.validateId(id);
        if (!validate) {
            throw new Error('Not Found User');
        }

        const rolesLength = validate.role.length
        if(rolesLength===0){
            throw new Error('Not Found Roles');
        }

        return this.userRepository.deleteAllRoles(id);
    }
}

export default UserManager;