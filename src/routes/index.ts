import { Router } from 'express';
import authRouter from './auth';
import productRouter from './products';
import userRouter from './users';
import cartRouter from './cart';
import orderRouter from './orders';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/cart', cartRouter);
rootRouter.use('/orders', orderRouter);

export default rootRouter;
