import {Router} from 'express';
import auth from "../middlewares/auth.js";
import {forgetPassword, login,logout,signup, current} from "../controllers/SessionController.js";

const sessionRouter = Router();

sessionRouter.post('/login', login);

sessionRouter.post('/logout', logout);

sessionRouter.get('/current', auth, current);

sessionRouter.post('/signup', signup);

sessionRouter.post('/forget-password', forgetPassword);

export default sessionRouter;