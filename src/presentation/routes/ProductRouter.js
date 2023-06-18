import { Router} from "express";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";
import validateProductId from "../middlewares/validateProductId.js";
import { deleteOne, getOne, idParam, list, save, update } from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.get("/", auth, authorization('getProducts'), list);
productRouter.get("/:id", auth, validateProductId, authorization('getProduct'),  getOne);
productRouter.post("/", auth, authorization('saveProduct'), save)
productRouter.put("/:id", auth, validateProductId, authorization('updateProduct'), update);
productRouter.delete("/:id", auth, validateProductId, authorization('deleteProduct'),  deleteOne);

productRouter.param('id', idParam)

export default productRouter;