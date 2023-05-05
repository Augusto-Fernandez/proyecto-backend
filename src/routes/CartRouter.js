import { Router} from "express";
import cartsSchema from "../models/cartsSchema.js";

const cartRouter = Router();

cartRouter.post("/", async (req,res) =>{
    const createCart = await cartsSchema.create({});
    res.status(201).send({status: "sucess", createCart, message: "Cart created"});
})

cartRouter.get("/:cid", async (req, res) =>{
    const cartId = req.params.cid;
    const cartById = await cartsSchema.findOne({_id: cartId});
    res.send({status: 'success', cartById});
})

cartRouter.post("/:cid/products/:pid", async (req,res) =>{
    let cartId = req.params.cid;
    let cartProductId = req.params.pid;

    const cartById = await cartsSchema.findById(cartId);
    const productExist = cartById.products.findIndex(product => product.id === cartProductId);

    if(productExist!==-1){
        const update=cartById.products[productExist].quantity+1;
        await cartsSchema.findOneAndUpdate(
            {_id:cartId, "products.id":cartProductId},
            {$set:{"products.$.quantity":update}}
        );
        const newCart=await cartsSchema.findById(cartId);
        res.status(200).send({status:"sucess", newCart, message:"Product added",
        });
    }else{
        const addProductToCart = await cartsSchema.findByIdAndUpdate(
            cartId,
            {$push:{products:{id: cartProductId, quantity: 1}}},
            {new: true}
        )
        res.status(201).send({status: "sucess", addProductToCart, message: "Product added"});
    }
})

export default cartRouter;