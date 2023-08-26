import express from "express";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express'

import productRouter from "../../presentation/routes/ProductRouter.js";
import cartRouter from "../../presentation/routes/CartRouter.js";
import sessionRouter from "../../presentation/routes/SessionRouter.js";
import userRouter from "../../presentation/routes/UserRouter.js";
import roleRouter from "../../presentation/routes/RoleRouter.js";
import emailRouter from "../../presentation/routes/EmailRouter.js";
import swaggerOptions from "../../config/swaggerConfig.js";
import { addLogger } from "../../utils/logger.js";
import cronHandler from "../middlewares/cron.js";

import errorHandler from "../../presentation/middlewares/errorHandler.js";

class AppExpress{
    init(){
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(compression({
            brotli: {
                enabled: true,
                zlib: {}
            },
        }));
    }

    build(){
        this.app.use(cronHandler);

        this.app.use(addLogger);

        this.app.use('/api/products', productRouter);
        this.app.use('/api/carts', cartRouter);
        this.app.use('/api/sessions', sessionRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/roles', roleRouter);
        this.app.use('/api/email', emailRouter);
        
        const specs = swaggerJSDoc(swaggerOptions);
        this.app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

        this.app.use(errorHandler);
    }

    callback(){
        return this.app;
    }

    listen(){
        this.server = this.app.listen(process.env.NODE_PORT, () => {
            console.log(`Server listening on port ${process.env.NODE_PORT}`);
        });

        return this.server;
    }

    close(){
        if (this.server) {
            this.server.close(() => {
                console.log('Server closed');
            });
        }
    }
}

export default AppExpress