import { Router } from 'express';
import { errorHandler } from '../../error-handler';
import authMiddleware from '../middlewares/auth';
import { addAddress, deleteAddress, listAddress, updateUser } from '../controllers/users';
import { addItemToCart, changeQuantity, deleteItemToCart, getCart } from '../controllers/cart';

const cartRouter: Router = Router();

cartRouter.post('/', [authMiddleware], errorHandler(addItemToCart));
cartRouter.get('/', [authMiddleware], errorHandler(getCart));
cartRouter.delete('/:id', [authMiddleware], errorHandler(deleteItemToCart));
cartRouter.put('/:id', [authMiddleware], errorHandler(changeQuantity));

export default cartRouter;
