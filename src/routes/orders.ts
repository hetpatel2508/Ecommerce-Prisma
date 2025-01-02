import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import authMiddleware from '../middlewares/auth';
import { cancelOrder, createOrder, getOrderById, listOrders } from '../controllers/orders';

const orderRouter: Router = Router();

orderRouter.post('/', [authMiddleware], errorHandler(createOrder));
orderRouter.get('/', [authMiddleware], errorHandler(listOrders));
orderRouter.put('/:id/cancel', [authMiddleware], errorHandler(cancelOrder));
orderRouter.get('/:id', [authMiddleware], errorHandler(getOrderById));

export default orderRouter;
