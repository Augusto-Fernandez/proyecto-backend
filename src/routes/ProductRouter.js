import ProductManager from "../controllers/ProductManager.js";
import { Router} from "express";

const productRouter = Router();

const manager = new ProductManager();

productRouter.get("/", async (req, res) => {
    const productsArray = await manager.getProducts();
    let {limit} = req.query;
    let limitInt = parseInt(limit)
    
    if(limitInt > 0 && limitInt <= productsArray.length){
        const limitedProducts = productsArray.splice(0,limitInt);
        res.send(limitedProducts);
    }else{
        res.send(productsArray);
    }    
});

productRouter.get("/:pid", async (req, res) => {
    const productId = +req.params.pid;
    const productById = await manager.getProductById(productId)

    if(typeof productId !== 'number' || productId === 0 || isNaN(productId)){
        res.send({error: "Id is not valid"});
    }else if(!productById){
        res.send({error: "Id not found"});
    }else{
        const productById = await manager.getProductById(parseInt(productId));
        res.send(productById);
    }
});

productRouter.post("/", async (req, res) =>{
    let product = req.body;
    const productsArray = await manager.getProducts();

    if (!product.title || typeof product.title !== 'string' || product.title.trim().length === 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    }
    if (!product.description || typeof product.description !== 'string' || product.description.trim().length === 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    } 
    if (!product.price || typeof product.price !== 'number' || product.price <= 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    } 
    if (!product.thumbnail || typeof product.thumbnail !== 'string' || product.thumbnail.trim().length === 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    } 
    if (!product.code || typeof product.code !== 'string' || product.code.trim().length === 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    }  
    if (!product.stock || typeof product.stock !== 'number' || product.stock < 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    }
    if (!product.status || typeof product.status !== 'boolean'){
        return res.status(400).send({status: "error", error: "Campo obligatorio"}); 
    }

    const validateId = productsArray.find((p) => p.id === product.id);
    const validateCode = productsArray.find((p) => p.code === product.code)

    if (validateId) {
        return res.status(400).send({status: "error", error: "Id Repetido"})
    }

    if (validateCode) {
        return res.status(400).send({status: "error", error: "Code Repetido"})
    }

    manager.addProduct(product);
    return res.status(201).send({status: "sucess", message: "Item created"});
})

productRouter.put("/:pid", async (req, res) =>{
    let product = req.body;
    let productId = +req.params.pid;
    const productsArray = await manager.getProducts()
    const productsById = await manager.getProductById(productId)
    
    if(typeof productId !== 'number' || productId === 0 || isNaN(productId) || productId>productsArray.length){
        return res.send({error: "Id not found"});
    }
    if(!productsById){
        return res.status(400).send({status: "error", error: "Product not found"});
    }

    if (!product.title || typeof product.title !== 'string' || product.title.trim().length === 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    }
    if (!product.description || typeof product.description !== 'string' || product.description.trim().length === 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    } 
    if (!product.price || typeof product.price !== 'number' || product.price <= 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    } 
    if (!product.thumbnail || typeof product.thumbnail !== 'string' || product.thumbnail.trim().length === 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    } 
    if (!product.code || typeof product.code !== 'string' || product.code.trim().length === 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    }  
    if (!product.stock || typeof product.stock !== 'number' || product.stock < 0) {
        return res.status(400).send({status: "error", error: "Campo obligatorio"});
    }
    if (!product.status || typeof product.status !== 'boolean'){
        return res.status(400).send({status: "error", error: "Campo obligatorio"}); 
    }

    manager.updateProduct(productId, product)
    return res.status(200).send({status: "sucess", message: "Item modified"});
})

productRouter.delete("/:pid", async (req, res) => {
    const productId = +req.params.pid;
    const productsArray = await manager.getProducts()
    const productsById = await manager.getProductById(productId)

    if(typeof productId !== 'number' || productId === 0 || isNaN(productId) || productId>productsArray.length){
        res.send({error: "Id not valid"});
    }else if(!productsById){
        return res.status(400).send({status: "error", error: "Product not found"});
    }else{
        manager.deleteProduct(productId);
        return res.status(200).send({status: "sucess", message: "Item deleted"});
    }
});

export default productRouter;