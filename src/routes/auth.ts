import { Router } from 'express';
import { login, signup } from '../controllers/auth';
import { errorHandler } from '../../error-handler';

const authRouter: Router = Router();

authRouter.get('/login', errorHandler(login));
authRouter.post('/signup', errorHandler(signup));

export default authRouter;
