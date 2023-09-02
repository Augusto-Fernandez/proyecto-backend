import container from "../../container.js";
import { createHash } from "../../shared/index.js";
import MailService from "../../shared/MailService.js";
import currentDate from "../../utils/currentDate.js";

class UserManager {
    constructor() {
        this.userRepository = container.resolve('UserRepository');
        this.cartRepository = container.resolve('CartRepository');
        this.roleRepository = container.resolve('RoleRepository');
        this.productRepository = container.resolve('ProductRepository');
    }

    async paginate(criteria) {
        const { limit, page } = criteria
        let defaultLimit = await this.userRepository.docCount();

        if (limit !== undefined) {
            defaultLimit = limit
        }

        const dto = {
            limit: defaultLimit,
            page: page
        }
        return this.userRepository.paginate(dto);
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
        const dto = {
            ...data,
            password: await createHash(data.password, 10),
            last_connection: currentDate
        }

        const user = await this.userRepository.create(dto);
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

    async addCart(id, cartId) {
        const validateUser = await this.userRepository.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const validateCart = await this.cartRepository.validateId(cartId);
        if (!validateCart) {
            throw new Error('Not Found Cart');
        }

        const cartLength = validateUser.cart.length
        if (cartLength > 0) {
            throw new Error('User Has Cart Already');
        }

        return this.userRepository.addCart(id, cartId)
    }

    async deleteCart(id) {
        const validateUser = await this.userRepository.validateId(id);
        if (!validateUser) {
            throw new Error('Not Found User');
        }

        const cartLength = validateUser.cart.length;
        if (cartLength === 0) {
            throw new Error('Not Found Cart');
        }

        if(validateUser.premium === true){
            const cart = await this.cartRepository.getOne(validateUser.cart[0].id);
            const products = await Promise.all(cart.products.map(async prod => {
                const foundProducts = await this.productRepository.getOne(prod.id);
                return foundProducts.title
            }));

            const message = new MailService();
            await message.send('deletedProducts.hbs', {userName: validateUser.name, products}, validateUser.email, 'Deleted Products')
        }

        return this.userRepository.deleteCart(id);
    }

    async addRole(id, roleId) {
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

    async deleteRole(id, roleId) {
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

    async deleteAllRoles(id) {
        const validate = await this.userRepository.validateId(id);
        if (!validate) {
            throw new Error('Not Found User');
        }

        const rolesLength = validate.role.length
        if (rolesLength === 0) {
            throw new Error('Not Found Roles');
        }

        return this.userRepository.deleteAllRoles(id);
    }

    async premium(id) {
        const validate = await this.userRepository.validateId(id);
        if (!validate) {
            throw new Error('Not Found User');
        }

        const user = await this.userRepository.getOne(id);

        if (user.premium === true) {
            throw new Error('User is already premium');
        }

        const validateDoc = [
            "Identificación", "Comprobante de domicilio", "Comprobante de estado de cuenta"
        ]

        const docExist = user.documents.some(doc => validateDoc.includes(doc.name));

        if (!docExist) {
            throw new Error('User Docs Incompleted')
        }

        user.premium = true;

        return this.userRepository.updateOne(id, user);
    }

    async uploadFiles(id, data) {
        const validate = await this.userRepository.validateId(id);
        if (!validate) {
            throw new Error('Not Found User');
        }

        const dto = {
            name: data.originalname,
            reference: data.path
        }

        return this.userRepository.uploadFiles(id, dto);
    }
}

export default UserManager;