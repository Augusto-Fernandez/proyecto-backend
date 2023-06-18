import { Router} from "express";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";
import validateProductId from "../middlewares/validateProductId.js";
import { deleteOne, getOne, idParam, list, save, update } from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.get("/", auth, authorization('getProducts'), list);
productRouter.get("/:id",  getOne);
productRouter.post("/", save)
productRouter.put("/:id", auth, validateProductId, authorization('updateProduct'), update);
productRouter.delete("/:id",  deleteOne);

productRouter.param('id', idParam)

export default productRouter;