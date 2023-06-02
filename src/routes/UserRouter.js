import { Router } from 'express';
import auth from "../middlewares/auth.js";
import validateUserId from '../middlewares/validateUserId.js';
import { list, deleteOne, getOne, save, update, idParam } from "../controllers/UserController.js";

const userRouter = Router();

userRouter.get('/', list);
userRouter.get('/:id', validateUserId, getOne);
userRouter.post('/', auth, save);
userRouter.put('/:id', validateUserId, update);
userRouter.delete('/:id', validateUserId, deleteOne);

userRouter.param('id', idParam);

export default userRouter;