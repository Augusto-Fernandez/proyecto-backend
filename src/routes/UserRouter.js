import { Router } from 'express';
import auth from "../middlewares/auth.js";
import validateUserId from '../middlewares/validateUserId.js';
import { list, deleteOne, getOne, save, update, idParam, addCart, deleteCart } from "../controllers/UserController.js";
import authorization from '../middlewares/authorization.js';

const userRouter = Router();

userRouter.get('/', auth, authorization('getUsers'), list);
userRouter.get('/:id', auth, validateUserId, authorization('getUser'), getOne);
userRouter.post('/', auth, authorization('saveUser'), save);
userRouter.put('/:id', auth, validateUserId, authorization('updateUser'), update);
userRouter.delete('/:id', auth, validateUserId, authorization('deleteUser'), deleteOne);
userRouter.post('/:id/carts/:cid', auth, validateUserId, authorization('addCart'), addCart);
userRouter.delete('/:id/carts', auth, validateUserId, authorization('deleteCart'), deleteCart);

userRouter.param('id', idParam);

export default userRouter;