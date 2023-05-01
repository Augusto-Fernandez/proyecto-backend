import ProductManager from "../controllers/ProductManager.js";
import { Router} from "express";
import productsSchema from "../models/productsSchema.js";

const productRouter = Router();

const manager = new ProductManager();

const item1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock:25,
    status: true
}

const item2 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail: "Sin imagen",
    code: "abc124",
    stock:25,
    status: true
}

const item3 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail: "Sin imagen",
    code: "abc125",
    stock:25,
    status: true
}

const main = async () => {
    /*
    await manager.addProduct(item1);
    await manager.addProduct(item2);
    await manager.addProduct(item3);
    */
    const createProduct1 = await productsSchema.create(item1)
    const createProduct2 = await productsSchema.create(item2)
    const createProduct3 = await productsSchema.create(item3)
}

main();

productRouter.get("/", async (req, res) => {
    /* 
        const productsArray = await manager.getProducts();
        let {limit} = req.query;
        let limitInt = parseInt(limit)
    
        if(limitInt > 0 && limitInt <= productsArray.length){
            const limitedProducts = productsArray.splice(0,limitInt);
            return res.send(limitedProducts);
        }else{
            return res.send(productsArray);
        }  
    */
    const productsArray = await productsSchema.find();
    res.send({status: 'success', productsArray});
});

productRouter.get("/:pid", async (req, res) => {
    /*  
        const productId = +req.params.pid;
        const productById = await manager.getProductById(parseInt(productId));

        if(typeof productId !== 'number' || productId === 0 || isNaN(productId)){
            return res.status(401).send({status: "error", error: "Id not valid"});
        }else if(!productById){
            return res.status(401).send({status: "error", error: "Id not found"});
        }else{
            return res.send(productById);
        } 
    */

    const productId = req.params.pid;
    const productById = await productsSchema.findOne({_id: productId})

    res.send({status: 'success', productById});
});

productRouter.post("/", async (req, res) =>{
    /* 
    let product = req.body;
    const productsArray = await manager.getProducts();

    const validateId = productsArray.find((p) => p.id === product.id);
    const validateCode = productsArray.find((p) => p.code === product.code)

    if(!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.thumbnail){
        return res.status(401).send({status: "error", error: "Todos los campos son obligatorios"});
    }else if(validateId){
        return res.status(401).send({status: "error", error: "Id Repetido"})
    }else if(validateCode){
        return res.status(401).send({status: "error", error: "Code Repetido"})
    }else{
        manager.addProduct(product);
        return res.status(201).send({status: "sucess", message: "Item created"});
    }
    */
    let product = req.body;
    const addProduct = await productsSchema.create(product)
    res.status(201).send({status: "sucess", addProduct, message: "Item created"});
})

productRouter.put("/:pid", async (req, res) =>{
    /* 
    let product = req.body;
    let productId = +req.params.pid;
    const productById = await manager.getProductById(productId)

    if(!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.thumbnail){
        return res.status(401).send({status: "error", error: "Todos los campos son obligatorios"});
    }else if(typeof productId !== 'number' || productId === 0 || isNaN(productId)){
        return res.status(401).send({status: "error", error: "Id not valid"});
    }else if(!productById){
        return res.status(401).send({status: "error", error: "Id not found"});
    }else{
        manager.updateProduct(productId, product)
        return res.status(200).send({status: "sucess", message: "Item modified"});
    }
    */
    let product = req.body;
    let productId = req.params.pid;
    const productModified = await productsSchema.updateOne({_id: productId}, product)
    res.status(200).send({status: "sucess", productModified, message: "Item modified"});
})

productRouter.delete("/:pid", async (req, res) => {
    /* 
    const productId = +req.params.pid;
    const productById = await manager.getProductById(productId)

    if(typeof productId !== 'number' || productId === 0 || isNaN(productId)){
        return res.status(401).send({status: "error", error: "Id not valid"});
    }else if(!productById){
        return res.status(401).send({status: "error", error: "Id not found"});
    }else{
        manager.deleteProduct(productId);
        return res.status(200).send({status: "sucess", message: "Item deleted"});
    }
    */

    const productId = req.params.pid;
    const deleteProduct = await productsSchema.deleteOne({_id: parseInt(productId)})
    return res.status(200).send({status: "sucess", deleteProduct, message: "Item deleted"});
});

export default productRouter;