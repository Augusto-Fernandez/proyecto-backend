import UserManager from "./UserManager.js";
import { createHash, isValidPassword } from "../utils/index.js";

class SessionManager{
    async login(data){
        /* falta que valide que exita el email, la validacion esta del lado de user */
        if(!data.email && !data.password){
            return 'Email and Password invalid format.';
        }

        const manager = new UserManager();
        const user = await manager.getOneByEmail(data.email);
        const isHashedPassword = await isValidPassword(data.password, user.password);

        if(!isHashedPassword){
            return'Login failed, invalid password.'
        }
    }
    async signup(data){
        const manager = new UserManager();

        const dto = {
        ...data,
        password: await createHash(data.password, 10)
        }

        const user = await manager.create(dto);
        return user
    }
    async forgetPassword(data){
        const manager = new UserManager();

        const dto = {
        email: data.email,
        password: await createHash(data.password, 10)
        };

        const user = await manager.forgetPassword(dto);
        return user
    }
}

export default SessionManager