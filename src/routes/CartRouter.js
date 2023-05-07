import { Router} from "express";
import { addToCart, deleteOne, getOne, save } from "../controllers/CartController.js";

const cartRouter = Router();

cartRouter.post("/", save)

cartRouter.get("/:cid", getOne)

cartRouter.post("/:cid/products/:pid", addToCart)

cartRouter.delete("/:cid/products/:pid", deleteOne)

export default cartRouter;