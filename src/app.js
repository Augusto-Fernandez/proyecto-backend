import dotenv from "dotenv";
dotenv.config();

import express from "express";
import productRouter from "./routes/ProductRouter.js";
import cartRouter from "./routes/CartRouter.js";
import viewsRouter from "./routes/ViewsRouter.js";
import {engine} from "express-handlebars";
import {resolve} from "path";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager();

const viewPath = resolve('src/views'); /* resolve('views') para node */

app.engine('handlebars', engine({
    layoutsDir: `${viewPath}/layouts`,
    defaultLayout: `${viewPath}/layouts/main.handlebars`
}))

app.set('view engine', 'handlebars');
app.set('views', viewPath);

app.get('/',  async (req, res) => {    
    const productsArray = await manager.getProducts();
    res.render('index', {title: 'Products', productsArray})
})

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/realtimeproducts', viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async socket => {
    
    socket.emit('listProducts', await manager.getProducts());

    socket.on('delete_event', async data =>{
        await manager.deleteProduct(parseInt(data))
        socket.emit('listProducts', await manager.getProducts());
    })

    socket.on('add_event', async data =>{
        await manager.getProducts()
        await manager.addProduct(data)
        socket.emit('listProducts', await manager.getProducts());
    })
})
