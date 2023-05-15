import {Router} from 'express';
import {login,logout,signup} from "../controllers/SessionController.js";

const sessionRouter = Router();

sessionRouter.post('/login', login);

sessionRouter.post('/logout', logout);

sessionRouter.post('/signup', signup);

export default sessionRouter;