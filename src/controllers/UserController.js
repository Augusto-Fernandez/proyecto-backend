import UserManager from "../managers/UserManager.js";
import idValidation from "../validations/shared/idValidation.js";
import userCreateValidation from "../validations/user/userCreateValidation.js"
import userUpdateValidation from "../validations/user/userUpdateValidation.js"

export const list = async (req, res, next) => {
    try{
        const { limit, page } = req.query;
        const manager = new UserManager();
        const users = await manager.paginate({ limit, page });
        res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
    }catch(e){
        next(e);
    }
};

export const getOne = async (req, res, next) => {
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new UserManager();
        const user = await manager.getOne(id);
        res.send({ status: 'success', user });
    }catch(e){
        next(e);
    }
};

export const save = async (req, res, next) => {
    try{
        await userCreateValidation.parseAsync(req.body)
        const manager = new UserManager();
        const user = await manager.create(req.body);
        res.send({ status: 'success', user, message: 'User created.' })
    }catch(e){
        next(e);
    }
};

export const update = async (req, res, next) => {
    try{
        await userUpdateValidation.parseAsync({ ...req.body, id: req.params })
        const { id } = req.params;
        const manager = new UserManager();
        const result = await manager.updateOne(id, req.body);
        res.send({ status: 'success', result, message: 'User updated.' })
    }catch(e){
        next(e);
    }
};

export const deleteOne = async (req, res, next) => {
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new UserManager();
        await manager.deleteOne(id);
        res.send({ status: 'success', message: 'User deleted.' })
    }catch(e){
        next(e);
    }
};

export const addCart = async (req, res, next) =>{
    try{
        await idValidation.parseAsync(req.params);
        const userId = req.params.id
        const cartId = req.params.cid
        const manager = new UserManager();
        await manager.addCart(userId, cartId);
        res.send({ status: 'success', message: 'Cart added' })
    }catch(e){
        next(e);
    }
}

export const deleteCart = async (req, res, next) =>{
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new UserManager();
        await manager.deleteCart(id);
        res.send({ status: 'success', message: 'Cart deleted' })
    }catch(e){
        next(e);
    }
}

export const addRole = async (req, res, next) =>{
    try{
        await idValidation.parseAsync(req.params);
        const userId = req.params.id
        const roleId = req.params.rid
        const manager = new UserManager();
        await manager.addRole(userId, roleId)
        res.send({ status: 'success', message: 'Role added' })
    }catch(e){
        next(e)
    }
}

export const deleteRole = async (req, res, next) =>{
    try{
        await idValidation.parseAsync(req.params);
        const userId = req.params.id
        const roleId = req.params.rid
        const manager = new UserManager();
        await manager.deleteRole(userId, roleId)
        res.send({ status: 'success', message: 'Role deleted' })
    }catch(e){
        next(e)
    }
}

export const deleteAllRoles = async (req, res, next) =>{
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new UserManager();
        await manager.deleteAllRoles(id);
        res.send({ status: 'success', message: 'All Roles Deleted' });
    }catch(e){
        next(e)
    }
}

export const idParam = async (req, res, next) => {
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new UserManager();
        const user = await manager.getOne(id);
        req.id = user
        next()
    }catch(e){
        next(e)
    }
}