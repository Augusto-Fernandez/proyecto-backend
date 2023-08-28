import {Router} from 'express';
import auth from "../middlewares/auth.js";
import {forgotPassword, login,logout,signup, current, changePassword, resetPassword} from "../controllers/SessionController.js";

const sessionRouter = Router();

sessionRouter.post('/login', login);

sessionRouter.post('/logout', logout);

sessionRouter.get('/current', auth, current);

sessionRouter.post('/signup', signup);

sessionRouter.post('/change-password', auth, changePassword);

sessionRouter.post('/forgot-password', forgotPassword);

sessionRouter.post('/reset-password', resetPassword);

export default sessionRouter;