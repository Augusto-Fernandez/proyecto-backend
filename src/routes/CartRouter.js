import { Router} from "express";
import { addToCart, getOne, save } from "../controllers/CartController.js";

const cartRouter = Router();

cartRouter.post("/", save)

cartRouter.get("/:cid", getOne)

cartRouter.post("/:cid/products/:pid", addToCart)

export default cartRouter;