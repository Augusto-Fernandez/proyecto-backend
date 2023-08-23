import container from "../../container.js";
import { createHash, isValidPassword, generateToken } from "../../shared/index.js";
import currentDate from "../../utils/currentDate.js";

class SessionManager{
    constructor() {
        this.userRepository = container.resolve('UserRepository');
    }

    async login(data){
        const user = await this.userRepository.validateEmail(data.email);

        if(!user){
            throw new Error('Not Found User Email')
        }
        const isHashedPassword = await isValidPassword(data.password, user.password);

        if(!isHashedPassword){
            throw new Error('Login failed, invalid password.')
        }

        const dto = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            cart: user.cart,
            password: user.password,
            isAdmin: user.isAdmin,
            role: user.role,
            premium: user.premium,
            documents: user.documents,
            last_connection: currentDate
        }

        await this.userRepository.updateOne(user.id, dto);

        const accessToken = await generateToken(user);
        return accessToken
    }
    async signup(data){
        const validate = await this.userRepository.validateEmail(data.email);
        if (validate) {
            throw new Error('Login failed, email already used.');
        }

        const dto = {
            ...data,
            password: await createHash(data.password, 10)
        }

        const user = await this.userRepository.create(dto);
        return user
    }
    async forgetPassword(data){
        const validate = await this.userRepository.validateEmail(data.email);
        if (!validate) {
            throw new Error('Not Found User Email');
        }

        const dto = {
            email: data.email,
            password: await createHash(data.password, 10)
        };

        const user = await this.userRepository.getOneByEmail(dto.email);
        user.password = dto.password;
        return this.userRepository.updateOne(user.id, user);
    }
}

export default SessionManager