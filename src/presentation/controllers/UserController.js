import UserManager from "../../domain/managers/UserManager.js";
import idValidation from "../../domain/validations/shared/idValidation.js";
import cartIdValidation from "../../domain/validations/user/cartIdValidation.js";
import roleIdValidation from "../../domain/validations/user/roleIdValidation.js";
import userCreateValidation from "../../domain/validations/user/userCreateValidation.js"

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
        await idValidation.parseAsync(req.params);
        await userCreateValidation.parseAsync(req.body)
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
        await cartIdValidation.parseAsync(req.params);
        const { id } = req.params;
        const { cid } = req.params;
        const manager = new UserManager();
        await manager.addCart(id, cid);
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
        await roleIdValidation.parseAsync(req.params);
        const { id } = req.params;
        const { rid } = req.params;
        const manager = new UserManager();
        await manager.addRole(id, rid)
        res.send({ status: 'success', message: 'Role added' })
    }catch(e){
        next(e)
    }
}

export const deleteRole = async (req, res, next) =>{
    try{
        await roleIdValidation.parseAsync(req.params);
        const { id } = req.params;
        const { rid } = req.params;
        const manager = new UserManager();
        await manager.deleteRole(id, rid)
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

export const premium = async (req, res, next) => {
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new UserManager();
        await manager.premium(id);
        res.send({ status: 'success', message: 'Premium Added' });
    }catch(e){
        next(e)
    }
}

export const uploadFiles = async (req, res, next) => {
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new UserManager();
        const files = req.files;
        files.forEach(async data => {
            await manager.uploadFiles(id, data)
        });

    }catch(e){
        next(e)
    }
}