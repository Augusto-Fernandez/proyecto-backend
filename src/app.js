import express from "express";
import productRouter from "./routes/ProductRouter.js";
import cartRouter from "./routes/CartRouter.js";
import {engine} from "express-handlebars";
import {resolve} from "path";
import ProductManager from "./controllers/ProductManager.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const viewPath = resolve('views');

app.engine('handlebars', engine({
    layoutsDir: `${viewPath}/layouts`,
    defaultLayout: `${viewPath}/layouts/main.handlebars`
}))

app.set('view engine', 'handlebars');
app.set('views', viewPath);

app.get('/',  async (req, res) => {
    const manager = new ProductManager();
    const productsArray = await manager.getProducts();
    res.render('index', {title: 'Products', productsArray})
})

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});
