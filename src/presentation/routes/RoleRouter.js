import { Router } from 'express';
import auth from "../middlewares/auth.js";
import validateIdParam from '../middlewares/validateIdParam.js';
import { list, deleteOne, getOne, save, update, idParam } from "../controllers/RoleController.js";
import authorization from "../middlewares/authorization.js";
import adminOnly from '../middlewares/adminOnly.js';

const roleRouter = Router();

roleRouter.use(auth);

roleRouter.get('/', authorization('getRoles'), list);
roleRouter.get('/:id', validateIdParam, authorization('getRole'), getOne);
roleRouter.post('/', adminOnly(), save);
roleRouter.put('/:id', validateIdParam, adminOnly(), update);
roleRouter.delete('/:id', validateIdParam, adminOnly(), deleteOne);

roleRouter.param('id', idParam);

export default roleRouter;