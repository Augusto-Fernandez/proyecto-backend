import { Router} from "express";
import CartManager from "../controllers/CartManager.js";
import ProductManager from "../controllers/ProductManager.js";

const manager = new CartManager();
const productManager = new ProductManager();

const cartRouter = Router();

cartRouter.post("/", async (req,res) =>{
    manager.createCart()
    return res.status(201).send({status: "sucess", message: "Cart created"});
})

cartRouter.get("/:cid", async (req, res) =>{
    const cartId = +req.params.cid;
    const cartById = await manager.getCartById(cartId);

    if(typeof cartId !== 'number' || cartId === 0 || isNaN(cartId)){
        return res.status(401).send({status: "error", error: "Id not valid"});
    }else if(!cartById){
        return res.status(401).send({status: "error", error: "Id not found"});
    }else{
        return res.send(cartById);
    }
})

cartRouter.post("/:cid/products/:pid", async (req,res) =>{
    let cartProductId = +req.params.pid;
    let cartId = +req.params.cid;
    const productId = await productManager.getProductById(cartProductId)
    const cartsById = await manager.getCartById(cartId);

    if (typeof cartId !== 'number' || cartId <= 0  || isNaN(cartProductId)) {
        return res.status(401).send({status: "error", error: "Campo obligatorio"});
    }
    if (typeof cartProductId !== 'number' || cartProductId <= 0 || isNaN(cartProductId)) {
        return res.status(401).send({status: "error", error: "Campo obligatorio"});
    }

    if(!productId){
        return res.status(401).send({status: "error", error: "Id not found"});
    }else if(!cartsById){
        return res.status(401).send({status: "error", error: "Cart not found"});
    }else{
        const cartById = await manager.addProductToCart(cartId, cartProductId);
        return res.send(cartById);
    }
})

export default cartRouter;