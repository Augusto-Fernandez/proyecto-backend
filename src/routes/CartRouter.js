import { Router} from "express";
import CartManager from "../controllers/CartManager.js";

const manager = new CartManager();

const cartRouter = Router();

cartRouter.post("/", async (req,res) =>{
    manager.createCart()
    return res.status(201).send({status: "sucess", message: "Cart created"});
})

cartRouter.get("/:cid", async (req, res) =>{
    const cartId = +req.params.cid;
    const cartsArray = await manager.getCart();

    if(typeof cartId !== 'number' || cartId === 0 || isNaN(cartId) || cartId>cartsArray.length){
        res.send({error: "Id not found"});
    }else{
        const cartById = await manager.getCartById(parseInt(cartId));
        res.send(cartById);
    }
})

export default cartRouter;