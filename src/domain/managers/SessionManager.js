import container from "../../container.js";
import { createHash, isValidPassword, generateToken } from "../../shared/index.js";

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

        const accessToken = await generateToken(user);
        return accessToken
    }
    async signup(data){
        const validate = await this.userRepository.validateEmail(data.email);
        if (validate) {
            throw new Error('Login failed, password already used.');
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