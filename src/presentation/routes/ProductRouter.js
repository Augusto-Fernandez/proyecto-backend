import { Router} from "express";
import { deleteOne, getOne, list, save, update } from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.get("/", list);

productRouter.get("/:pid", getOne);

productRouter.post("/", save)

productRouter.put("/:pid", update)

productRouter.delete("/:pid", deleteOne);

export default productRouter;