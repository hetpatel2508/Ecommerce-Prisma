import { Router } from 'express';
import { login, me, signup } from '../controllers/auth';
import { errorHandler } from '../../error-handler';
import authMiddleware from '../middlewares/auth';

const authRouter: Router = Router();

authRouter.get('/login', errorHandler(login));
authRouter.post('/signup', errorHandler(signup));
authRouter.get('/me',[authMiddleware], errorHandler(me));


export default authRouter;
