import CartManager from "../managers/CartManager.js";

export const save = async (req,res) =>{
    const manager = new CartManager();
    const createCart = await manager.create();
    res.status(201).send({status: "sucess", createCart, message: "Cart created"});
};

export const getOne = async (req, res) =>{
    const cartId = req.params.cid;
    const manager = new CartManager();
    const cartById = await manager.getOne(cartId)
    res.send({status: 'success', cartById});
};

export const addToCart = async (req,res) =>{
    let cartId = req.params.cid;
    let cartProductId = req.params.pid;
    const manager = new CartManager();
    const addProductToCart = manager.addToCart(cartId, cartProductId)
    res.status(201).send({status: "sucess", addProductToCart, message: "Product added"});
};

export const deleteOne = async (req, res) =>{
    let cartId = req.params.cid;
    let cartProductId = req.params.pid;
    const manager = new CartManager();
    const deleteOneProduct = manager.deleteOne(cartId, cartProductId);
    res.status(200).send({status: "sucess", deleteOneProduct, message: "Cart Item deleted"});
}

export const deleteAll = async (req, res) =>{
    let cartId = req.params.cid;
    const manager = new CartManager();
    const deleteAllProducts = manager.deleteAll(cartId);
    res.status(200).send({status: "sucess", deleteAllProducts, message: "Cart Item deleted"});
}