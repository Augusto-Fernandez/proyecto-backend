import ProductManager from "../../domain/managers/ProductManager.js";
import idValidation from "../../domain/validations/shared/idValidation.js";
import productCreateValidation from "../../domain/validations/products/productCreateValidation.js";
import productUpdateValidation from "../../domain/validations/products/productUpdateValidation.js";

export const list = async (req, res, next) => {
    try{
        let {sort} = req.query;
        let {name, limit, page} = req.query;
        const manager = new ProductManager();
        const products = await manager.getAll(sort, {name, limit, page})
        res.send({status: 'success', products});
    }catch(e){
        next(e)
    }
};

export const getOne = async (req, res, next) => {
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new ProductManager();
        const product = await manager.getOne(id)
        res.send({status: 'success', product});
    }catch(e){
        next(e)
    }
};

export const save = async (req, res, next) =>{
    try{
        await productCreateValidation.parseAsync(req.body);
        const manager = new ProductManager();
        const product = await manager.create(req.body)
        res.status(201).send({status: "sucess", product, message: "Item created"});
    }catch(e){
        next(e)
    }
};

export const update = async (req, res, next) =>{
    try{
        await productUpdateValidation.parseAsync({ ...req.body, id: req.params })
        const { id } = req.params;
        const manager = new ProductManager();
        const product= await manager.updatOne(id, req.body)
        res.status(200).send({status: "sucess", product, message: "Item modified"});
    }catch(e){
        next(e)
    }
};

export const deleteOne = async (req, res, next) => {
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new ProductManager();
        const product = await manager.delete(id)
        res.status(200).send({status: "sucess", product, message: "Item deleted"});
    }catch(e){
        next(e)
    }
};

export const idParam = async (req, res, next) => {
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new ProductManager();
        const user = await manager.getOne(id);
        req.id = user
        next()
    }catch(e){
        next(e)
    }
}