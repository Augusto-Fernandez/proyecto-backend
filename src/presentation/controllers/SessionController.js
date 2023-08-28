import SessionManager from "../../domain/managers/SessionManager.js";
import loginValidation from "../../domain/validations/session/loginValidation.js";
import userCreateValidation from "../../domain/validations/user/userCreateValidation.js";
import emailValidation from "../../domain/validations/session/emailValidation.js";

export const login = async (req, res, next) => {
    try{
        await loginValidation.parseAsync(req.body)
        const { email, password } = req.body;
        const manager = new SessionManager();
        const sessionLogin = await manager.login({ email, password })
        res.cookie('accessToken', sessionLogin, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        }).send({ message: 'Login success!', sessionLogin })
    }catch(e){
        next(e)
    }
};

export const logout = async (req, res) => {
    const { _doc } = req.user;
    const manager = new SessionManager();
    await manager.logout(_doc.id);

    req.session.destroy(err => {
        if (!err) {
            return res.send({ message: 'Logout ok!' });
        }
        res.send({ message: 'Logout error!', body: err })
    });
};

export const current = async (req, res) => {
    res.status(200).send({ status: 'Success', payload: req.user });
};

export const signup = async (req, res, next) => {
    try{
        await userCreateValidation.parseAsync(req.body)
        let data = req.body
        const manager = new SessionManager()
        const signup = await manager.signup(data)
        res.status(201).send({ status: 'success', signup, message: 'User created.' });
    }catch(e){
        next(e)
    }
};

export const changePassword = async (req, res, next) => {
    try{
        const { _doc } = req.user;
        const { password } = req.body;
        const manager = new SessionManager();
        const changePassword = await manager.changePassword({ email: _doc.email, password })
        res.status(200).send({ status: 'success', changePassword, message: 'User change password.' });
    }catch (e){
        next(e)
    }
};

export const forgotPassword = async (req, res, next) => {
    try{
        await emailValidation.parseAsync(req.body);
        const { email } = req.body;
        const manager = new SessionManager();
        const forgetPassword = await manager.forgotPassword({ email })
        res.status(200).send({ status: 'success', forgetPassword, message: 'Mail sended' });
    }catch (e){
        next(e)
    }
};

export const resetPassword = async (req, res, next) => {
    try{
        const { token } = req.query
        const { password } = req.body;
        const manager = new SessionManager();
        const resetPassword = await manager.resetPassword({ token , password })
        res.status(200).send({ status: 'success', resetPassword, message: 'User change password.' });
    }catch (e){
        next(e)
    }
};
