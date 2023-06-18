import { Router } from 'express';
import auth from "../middlewares/auth.js";
import validateIdParam from '../middlewares/validateIdParam.js';
import { list, deleteOne, getOne, save, update, idParam, addCart, deleteCart, addRole, deleteRole, deleteAllRoles } from "../controllers/UserController.js";
import authorization from '../middlewares/authorization.js';

const userRouter = Router();

userRouter.get('/', auth, authorization('getUsers'), list);
userRouter.get('/:id', auth, validateIdParam, authorization('getUser'), getOne);
userRouter.post('/', auth, authorization('saveUser'), save);
userRouter.put('/:id', auth, validateIdParam, authorization('updateUser'), update);
userRouter.delete('/:id', auth, validateIdParam, authorization('deleteUser'), deleteOne);
userRouter.post('/:id/carts/:cid', auth, validateIdParam, authorization('addCart'), addCart);
userRouter.delete('/:id/carts', auth, validateIdParam, authorization('deleteCart'), deleteCart);
userRouter.post('/:id/roles/:rid', auth, validateIdParam, authorization('addRole'),  addRole)
userRouter.delete('/:id/roles/:rid', auth, validateIdParam, authorization('deleteRole'), deleteRole)
userRouter.delete('/:id/roles', auth, validateIdParam, authorization('deleteAllRoles'), deleteAllRoles)

userRouter.param('id', idParam);

export default userRouter;