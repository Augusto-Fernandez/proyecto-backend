import { Router} from "express";
import auth from "../middlewares/auth.js";
import validateIdParam from "../middlewares/validateIdParam.js";
import { addToCart, deleteAll, deleteOne, getOne, save, updateOne } from "../controllers/CartController.js";
import authorization from "../middlewares/authorization.js";

const cartRouter = Router();

cartRouter.use(auth);

cartRouter.post("/", authorization('saveCart'), save);
cartRouter.get("/:id", validateIdParam, authorization('getCart'), getOne);
cartRouter.post("/:id/products/:pid", authorization('addToCart'), addToCart);
cartRouter.delete("/:id/products/:pid", authorization('deleteOne'), deleteOne);
cartRouter.delete("/:id", validateIdParam, authorization('deleteAll'), deleteAll);
cartRouter.put("/:id", validateIdParam, authorization('updateCart'), updateOne);

export default cartRouter;