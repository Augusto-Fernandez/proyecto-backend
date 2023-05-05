import { Router} from "express";
import CartManager from "../controllers/CartManager.js";
import ProductManager from "../controllers/ProductManager.js";
import cartsSchema from "../models/cartsSchema.js";
import productsSchema from "../models/productsSchema.js";

const manager = new CartManager();
const productManager = new ProductManager();

const cartRouter = Router();

cartRouter.post("/", async (req,res) =>{
    /*
    manager.createCart()
    return res.status(201).send({status: "sucess", message: "Cart created"});
    */
    const createCart = await cartsSchema.create({});
    res.status(201).send({status: "sucess", createCart, message: "Cart created"});
})

cartRouter.get("/:cid", async (req, res) =>{
    /*
    const cartId = +req.params.cid;
    const cartById = await manager.getCartById(cartId);

    if(typeof cartId !== 'number' || cartId === 0 || isNaN(cartId)){
        return res.status(401).send({status: "error", error: "Id not valid"});
    }else if(!cartById){
        return res.status(401).send({status: "error", error: "Id not found"});
    }else{
        return res.send(cartById);
    }
    */
    const cartId = req.params.cid;
    const cartById = await cartsSchema.findOne({_id: cartId});
    res.send({status: 'success', cartById});
})

cartRouter.post("/:cid/products/:pid", async (req,res) =>{
    /*
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
    */

    /*
    const cartsById = await cartsSchema.findOne({_id: cartId});
    const productId = await productsSchema.findOne({_id: cartProductId})
    */

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