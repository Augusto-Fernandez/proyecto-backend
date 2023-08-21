import { Router} from "express";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";
import adminOnly from "../middlewares/adminOnly.js";
import validateIdParam from "../middlewares/validateIdParam.js";
import { deleteOne, getOne, idParam, list, save, update } from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.use(auth);

productRouter.get("/", authorization('getProducts'), list);
productRouter.get("/:id", validateIdParam, authorization('getProduct'),  getOne);
productRouter.post("/", adminOnly(), save)
productRouter.put("/:id", validateIdParam, adminOnly(), update);
productRouter.delete("/:id", validateIdParam, authorization('deleteProduct'),  deleteOne);

productRouter.param('id', idParam)

export default productRouter;