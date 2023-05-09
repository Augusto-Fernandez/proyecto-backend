import { Router} from "express";
import { addToCart, deleteAll, deleteOne, getOne, save, updateOne } from "../controllers/CartController.js";

const cartRouter = Router();

cartRouter.post("/", save)

cartRouter.get("/:cid", getOne)

cartRouter.post("/:cid/products/:pid", addToCart)

cartRouter.delete("/:cid/products/:pid", deleteOne)

cartRouter.delete("/:cid", deleteAll)

cartRouter.put("/:cid", updateOne)

export default cartRouter;