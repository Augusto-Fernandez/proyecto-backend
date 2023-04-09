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
    const cartsArray = await manager.getCart();

    if(typeof cartId !== 'number' || cartId === 0 || isNaN(cartId) || cartId>cartsArray.length){
        res.send({error: "Cart Id not found"});
    }else{
        const cartById = await manager.getCartById(parseInt(cartId));
        res.send(cartById);
    }
})

cartRouter.post("/:cid/products/:pid", async (req,res) =>{
    let cartProductId = +req.params.pid;
    let cartId = +req.params.cid;
    const productId = await productManager.getProductById(cartProductId)
    const cartValidation = await manager.getCartById(cartId)

    if (typeof cartId !== 'number' || cartId <= 0) {
        res.send({error: "Campo Obligatorio"});
    }
    if (typeof cartProductId !== 'number' || cartProductId <= 0) {
        res.send({error: "Campo Obligatorio"});
    }

    if(!cartValidation){
        res.send({error: "Cart Id not found"});
    }else if(!productId){
        res.send({error: "Id not found"});
    }else{
        const cartById = await manager.addProductToCart(cartId, cartProductId);
        res.send(cartById);
    }
})

export default cartRouter;