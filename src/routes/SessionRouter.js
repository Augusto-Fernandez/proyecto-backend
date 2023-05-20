import {Router} from 'express';
import {forgetPassword, login,logout,signup} from "../controllers/SessionController.js";

const sessionRouter = Router();

sessionRouter.post('/login', login);

sessionRouter.post('/logout', logout);

sessionRouter.post('/signup', signup);

sessionRouter.post('/forget-password', forgetPassword);

export default sessionRouter;