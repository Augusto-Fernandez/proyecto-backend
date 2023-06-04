import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {engine} from "express-handlebars";
import {resolve} from "path";
import { Server } from "socket.io";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

import ProductManager from "./managers/ProductManager.js";
import productRouter from "./routes/ProductRouter.js";
import cartRouter from "./routes/CartRouter.js";
import viewsRouter from "./routes/ViewsRouter.js";
import sessionRouter from "./routes/SessionRouter.js";
import userRouter from "./routes/UserRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import roleRouter from "./routes/RoleRouter.js";

await mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI,
        ttl: 300
    }),
    secret: 'S3cR3tC0D3',
    resave: false,
    saveUninitialized: false
}))

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
app.use('/api/sessions', sessionRouter);
app.use('/api/users', userRouter);
app.use('/api/roles', roleRouter)
app.use(errorHandler);

const httpServer = app.listen(process.env.NODE_PORT, () => {
    console.log(`Server listening on port ${process.env.NODE_PORT}`);
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