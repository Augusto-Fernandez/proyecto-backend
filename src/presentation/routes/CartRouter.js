import { Router} from "express";
import auth from "../middlewares/auth.js";
import validateIdParam from "../middlewares/validateIdParam.js";
import { addToCart, deleteAll, deleteOne, getOne, save, updateOne, idParam } from "../controllers/CartController.js";
import authorization from "../middlewares/authorization.js";

const cartRouter = Router();

cartRouter.post("/", auth, authorization('saveCart'), save);
cartRouter.get("/:id", auth, validateIdParam, authorization('getCart'), getOne);
cartRouter.post("/:id/products/:pid", auth, validateIdParam, authorization('addToCart'), addToCart);
cartRouter.delete("/:id/products/:pid", auth, validateIdParam, authorization('deleteOne'), deleteOne);
cartRouter.delete("/:id", auth, validateIdParam, authorization('deleteAll'), deleteAll);
cartRouter.put("/:id", auth, validateIdParam, authorization('updateCart'), updateOne);

cartRouter.param('id', idParam);

export default cartRouter;