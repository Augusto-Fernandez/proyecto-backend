import CartManager from "../../domain/managers/CartManager.js";
import idValidation from "../../domain/validations/shared/idValidation.js";
import productIdValidation from "../../domain/validations/cart/productIdValidation.js";
import cartUpdateValidation from "../../domain/validations/cart/cartUpdateValidation.js";

export const save = async (req, res, next) => {
    try {
        const manager = new CartManager();
        const cart = await manager.create();
        res.status(201).send({ status: "sucess", cart, message: "Cart created" });
    } catch (e) {
        next(e)
    }
};

export const getOne = async (req, res, next) => {
    try {
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new CartManager();
        const cart = await manager.getOne(id)
        res.send({ status: 'success', cart });
    } catch (e) {
        next(e)
    }
};

export const addToCart = async (req, res, next) => {
    try {
        await productIdValidation.parseAsync(req.params)
        const { id } = req.params;
        const { pid } = req.params;
        const manager = new CartManager();
        const cart = manager.addToCart(id, pid)
        res.status(201).send({ status: "sucess", cart, message: "Product added" });
    } catch (e) {
        next(e)
    }
};

export const deleteOne = async (req, res, next) => {
    try {
        await productIdValidation.parseAsync(req.params)
        const { id } = req.params;
        const { pid } = req.params;
        const manager = new CartManager();
        const cart = manager.deleteOne(id, pid);
        res.status(200).send({ status: "sucess", cart, message: "Cart Item deleted" });
    } catch (e) {
        next(e)
    }
}

export const deleteAll = async (req, res, next) => {
    try {
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new CartManager();
        const cart = manager.deleteAll(id);
        res.status(200).send({ status: "sucess", cart, message: "Cart Item deleted" });
    } catch (e) {
        next(e)
    }
}

export const updateOne = async (req, res, next) => {
    try {
        await idValidation.parseAsync(req.params);
        await cartUpdateValidation.parseAsync(req.body);
        const { id } = req.params;
        const manager = new CartManager();
        const cart = manager.updateOne(id, req.body);
        res.status(200).send({ status: "sucess", cart, message: "Cart updated" });
    } catch (e) {
        next(e)
    }
}

export const purchase = async (req, res, next) => {
    try{
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const { _doc } = req.user;
        const manager = new CartManager();
        const cart = manager.purchase(id, _doc);
        res.status(200).send({ status: "sucess", cart, message: "Successful Purchase" });
    }catch(e){
        next(e)
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const manager = new CartManager();
        const cart = await manager.deleteCart(id)
        res.send({ status: 'success', cart });
    } catch (e) {
        next(e)
    }
};
