import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import { createProduct } from '../controllers/products';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';

const productRouter: Router = Router();

productRouter.post('/create', [authMiddleware,adminMiddleware],errorHandler(createProduct));

export default productRouter;
