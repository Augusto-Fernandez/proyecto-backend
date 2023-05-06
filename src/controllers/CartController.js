import cartsSchema from "../models/cartsSchema.js";
import productsSchema from "../models/productsSchema.js";

export const save = async (req,res) =>{
    const createCart = await cartsSchema.create({});
    res.status(201).send({status: "sucess", createCart, message: "Cart created"});
};

export const getOne = async (req, res) =>{
    const cartId = req.params.cid;
    try{
        const cartById = await cartsSchema.findOne({_id: cartId});
        if(cartById === null){
            return res.status(401).send({status: "error", error: "Id not found"});
        }
        res.send({status: 'success', cartById});
    }catch{
        return res.status(401).send({status: "error", error: "Id not found"});
    }
};

export const addToCart = async (req,res) =>{
    let cartId = req.params.cid;
    let cartProductId = req.params.pid;

    try{
        const cartById = await cartsSchema.findById(cartId);
        if(cartById === null){
            return res.status(401).send({status: "error", error: "Id not found"});
        }
        const productById = await productsSchema.findById(cartProductId);
        if(productById === null){
            return res.status(401).send({status: "error", error: "Id not found"});
        }
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
        );
        res.status(201).send({status: "sucess", addProductToCart, message: "Product added"});
        }
    }catch{
        return res.status(401).send({status: "error", error: "Id not found"});
    }
};