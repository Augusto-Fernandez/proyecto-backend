import { Router } from 'express';
import auth from "../middlewares/auth.js";
import validateIdParam from '../middlewares/validateIdParam.js';
import { list, deleteOne, getOne, save, update, idParam } from "../controllers/RoleController.js";
import authorization from "../middlewares/authorization.js";

const roleRouter = Router();

roleRouter.get('/', auth, authorization('getRoles'), list);
roleRouter.get('/:id', auth, validateIdParam, authorization('getRole'), getOne);
roleRouter.post('/', auth, authorization('saveRole'), save);
roleRouter.put('/:id', auth, validateIdParam, authorization('updateRole'), update);
roleRouter.delete('/:id', auth, validateIdParam, authorization('deleteRole'), deleteOne);

roleRouter.param('id', idParam);

export default roleRouter;