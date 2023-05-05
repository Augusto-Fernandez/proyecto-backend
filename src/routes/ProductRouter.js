import { Router} from "express";
import productsSchema from "../models/productsSchema.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const productsArray = await productsSchema.find();
    res.send({status: 'success', productsArray});
});

productRouter.get("/:pid", async (req, res) => {
    const productId = req.params.pid;
    const productById = await productsSchema.findOne({_id: productId})

    res.send({status: 'success', productById});
});

productRouter.post("/", async (req, res) =>{
    let product = req.body;
    const addProduct = await productsSchema.create(product)
    res.status(201).send({status: "sucess", addProduct, message: "Item created"});
})

productRouter.put("/:pid", async (req, res) =>{
    let product = req.body;
    let productId = req.params.pid;
    const productModified = await productsSchema.updateOne({_id: productId}, product)
    res.status(200).send({status: "sucess", productModified, message: "Item modified"});
})

productRouter.delete("/:pid", async (req, res) => {
    const productId = req.params.pid;
    const deleteProduct = await productsSchema.deleteOne({_id: productId})
    return res.status(200).send({status: "sucess", deleteProduct, message: "Item deleted"});
});

export default productRouter;