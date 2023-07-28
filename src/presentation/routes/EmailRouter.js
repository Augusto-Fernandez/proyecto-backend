import { Router } from 'express';
import { sendEmail } from "../controllers/EmailController.js";

const emailRouter = Router();

emailRouter.get('/', sendEmail);

export default emailRouter;