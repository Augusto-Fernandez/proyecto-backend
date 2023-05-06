import { Router} from "express";
import productsSchema from "../models/productsSchema.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const productsArray = await productsSchema.find();
    res.send({status: 'success', productsArray});
});

productRouter.get("/:pid", async (req, res) => {
    const productId = req.params.pid;
    try{
        const productById = await productsSchema.findOne({_id: productId})
        if(productById === null){
            return res.status(401).send({status: "error", error: "Id not found"});
        }
        res.send({status: 'success', productById});
    }catch{
        return res.status(401).send({status: "error", error: "Id not found"});
    }
});

productRouter.post("/", async (req, res) =>{
    let product = req.body;

    if(!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.thumbnail){
        return res.status(401).send({status: "error", error: "Todos los campos son obligatorios"});
    }else{
        const addProduct = await productsSchema.create(product)
        res.status(201).send({status: "sucess", addProduct, message: "Item created"});
    }
})

productRouter.put("/:pid", async (req, res) =>{
    let product = req.body;
    let productId = req.params.pid;

    try{
        const productById = await productsSchema.findOne({_id: productId})
        if(productById===null){
            return res.status(401).send({status: "error", error: "Id not found"});
        }
        
        if(!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.thumbnail){
            return res.status(401).send({status: "error", error: "Todos los campos son obligatorios"});
        }else{
            const productModified = await productsSchema.updateOne({_id: productId}, product)
            res.status(200).send({status: "sucess", productModified, message: "Item modified"});
        }
    }catch{
        return res.status(401).send({status: "error", error: "Id not found"});
    }
})

productRouter.delete("/:pid", async (req, res) => {
    const productId = req.params.pid;

    try{
        const productById = await productsSchema.findOne({_id: productId})
        if(productById===null){
            return res.status(401).send({status: "error", error: "Id not found"});
        }
        const deleteProduct = await productsSchema.deleteOne({_id: productId})
        return res.status(200).send({status: "sucess", deleteProduct, message: "Item deleted"});
    }catch{
        return res.status(401).send({status: "error", error: "Id not found"});
    }
});

export default productRouter;