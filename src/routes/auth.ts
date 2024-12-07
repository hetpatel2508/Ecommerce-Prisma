import { Router } from 'express';
import { login, signup } from '../controllers/auth';

const authRouter: Router = Router();

authRouter.get('/login', login);
authRouter.post('/signup', signup);

export default authRouter;
