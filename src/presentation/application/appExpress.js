import express from "express";
import cookieParser from "cookie-parser";

import productRouter from "../../presentation/routes/ProductRouter.js";
import cartRouter from "../../presentation/routes/CartRouter.js";
import sessionRouter from "../../presentation/routes/SessionRouter.js";
import userRouter from "../../presentation/routes/UserRouter.js";
import roleRouter from "../../presentation/routes/RoleRouter.js";

import errorHandler from "../../presentation/middlewares/errorHandler.js";

class AppExpress{
    init(){
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    build(){
        this.app.use('/api/products', productRouter);
        this.app.use('/api/carts', cartRouter);
        this.app.use('/api/sessions', sessionRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/roles', roleRouter);

        this.app.use(errorHandler);
    }

    listen(){
        return this.app.listen(process.env.NODE_PORT, () => {
            console.log(`Server listening on port ${process.env.NODE_PORT}`);
        });
    }
}

export default AppExpress