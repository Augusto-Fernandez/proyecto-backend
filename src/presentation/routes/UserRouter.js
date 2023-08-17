import { Router } from 'express';
import auth from "../middlewares/auth.js";
import validateIdParam from '../middlewares/validateIdParam.js';
import { list, deleteOne, getOne, save, update, addCart, deleteCart, addRole, deleteRole, deleteAllRoles, premium, uploadFiles } from "../controllers/UserController.js";
import authorization from '../middlewares/authorization.js';
import adminOnly from '../middlewares/adminOnly.js';
import { uploader } from '../../utils/multer.js';

const userRouter = Router();

userRouter.use(auth);

userRouter.get('/', authorization('getUsers'), list);
userRouter.get('/:id', validateIdParam, authorization('getUser'), getOne);
userRouter.post('/', authorization('saveUser'), save);
userRouter.put('/:id', validateIdParam, authorization('updateUser'), update);
userRouter.delete('/:id', validateIdParam, authorization('deleteUser'), deleteOne);
userRouter.post('/:id/carts/:cid', authorization('addCart'), addCart);
userRouter.delete('/:id/carts', validateIdParam, authorization('deleteCart'), deleteCart);
userRouter.post('/:id/roles/:rid', authorization('addRole'),  addRole);
userRouter.delete('/:id/roles/:rid', authorization('deleteRole'), deleteRole);
userRouter.delete('/:id/roles', validateIdParam, authorization('deleteAllRoles'), deleteAllRoles);
userRouter.put('/premium/:id', validateIdParam, adminOnly, premium);
userRouter.post('/:id/documents', validateIdParam, authorization('uploadFiles'),uploader.fields([
    { name: 'documents', maxCount: 1 },
    { name: 'profileImages', maxCount: 1 },
    { name: 'productImages', maxCount: 1 }
]), uploadFiles);

export default userRouter;