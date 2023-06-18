import { Router} from "express";
import { addToCart, deleteAll, deleteOne, getOne, save, updateOne } from "../controllers/CartController.js";

const cartRouter = Router();

cartRouter.post("/", save)

cartRouter.get("/:id", getOne)

cartRouter.post("/:id/products/:pid", addToCart)

cartRouter.delete("/:id/products/:pid", deleteOne)

cartRouter.delete("/:id", deleteAll)

cartRouter.put("/:id", updateOne)

export default cartRouter;