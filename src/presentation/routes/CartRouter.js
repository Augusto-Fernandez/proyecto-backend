import { Router} from "express";
import auth from "../middlewares/auth.js";
import { addToCart, deleteAll, deleteCart, deleteOne, getOne, checkout, save, updateOne } from "../controllers/CartController.js";
import authorization from "../middlewares/authorization.js";
import userOnly from "../middlewares/userOnly.js";
import adminOnly from "../middlewares/adminOnly.js"

const cartRouter = Router();

cartRouter.use(auth);

cartRouter.post("/", authorization('saveCart'), save);
cartRouter.get("/:id", authorization('getCart'), getOne);
cartRouter.post("/:id/products/:pid", userOnly('addToCart'), addToCart);
cartRouter.delete("/:id/products/:pid", authorization('deleteOne'), deleteOne);
cartRouter.delete("/:id", authorization('deleteAll'), deleteAll);
cartRouter.put("/:id", authorization('updateCart'), updateOne);
cartRouter.get("/:id/checkout", authorization('checkout'), checkout);
cartRouter.delete("/:id/cart", adminOnly(), deleteCart);

export default cartRouter;