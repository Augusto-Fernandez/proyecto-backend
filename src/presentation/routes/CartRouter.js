import { Router} from "express";
import auth from "../middlewares/auth.js";
import validateIdParam from "../middlewares/validateIdParam.js";
import { addToCart, deleteAll, deleteOne, getOne, purchase, save, updateOne } from "../controllers/CartController.js";
import authorization from "../middlewares/authorization.js";
import userOnly from "../middlewares/userOnly.js";

const cartRouter = Router();

cartRouter.use(auth);

cartRouter.post("/", authorization('saveCart'), save);
cartRouter.get("/:id", validateIdParam, authorization('getCart'), getOne);
cartRouter.post("/:id/products/:pid", userOnly('addToCart'), addToCart);
cartRouter.delete("/:id/products/:pid", authorization('deleteOne'), deleteOne);
cartRouter.delete("/:id", validateIdParam, authorization('deleteAll'), deleteAll);
cartRouter.put("/:id", validateIdParam, authorization('updateCart'), updateOne);
cartRouter.get("/:id/purchase", validateIdParam, authorization('purchase'), purchase);

export default cartRouter;