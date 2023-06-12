import { Router } from "express";
import ProductManager from "../../domain/managers/ProductManager.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    const manager = new ProductManager();
    const productsArray = await manager.getProducts();
    res.render('realTimeProducts', {title: 'Products', productsArray})
});

export default viewsRouter