import { Router} from "express";
import CartManager from "../controllers/CartManager.js";

const manager = new CartManager();

const cartRouter = Router();

cartRouter.post("/", async (req,res) =>{
    manager.createCart()
    return res.status(201).send({status: "sucess", message: "Cart created"});
})

export default cartRouter;