import ProductManager from "../managers/ProductManager.js";

export const list = async (req, res) => {
    let {sort} = req.query;
    let {name, limit, page} = req.query;
    const manager = new ProductManager();
    const productsArray = await manager.getAll(sort, {name, limit, page})
    res.send({status: 'success', productsArray:productsArray.docs, ...productsArray, docs: undefined});
};

export const getOne = async (req, res) => {
    const productId = req.params.pid;
    const manager = new ProductManager();
    const productById = await manager.getOne(productId)
    res.send({status: 'success', productById});
};

export const save = async (req, res) =>{
    let product = req.body;
    const manager = new ProductManager();
    const addProduct = await manager.create(product)
    res.status(201).send({status: "sucess", addProduct, message: "Item created"});
};

export const update = async (req, res) =>{
    let product = req.body;
    let productId = req.params.pid;
    const manager = new ProductManager();
    const productModified = await manager.updatOne(productId, product)
    res.status(200).send({status: "sucess", productModified, message: "Item modified"});
};

export const deleteOne = async (req, res) => {
    const productId = req.params.pid;
    const manager = new ProductManager();
    const deleteProduct = await manager.delete(productId)
    res.status(200).send({status: "sucess", deleteProduct, message: "Item deleted"});
};