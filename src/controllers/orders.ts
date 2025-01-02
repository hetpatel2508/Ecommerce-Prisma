import { Request, Response } from 'express';
import prisma from '../../DB/prisma';
import { me } from './auth';

export const createOrder = async (req: Request, res: Response) => {
  /*
    1. Create Transection
    2. List all the cart items if cart is not empty
    3. Calculate total amount
    4. Fetch Address of user 
    5. Formate the fetched address to make it as order address
    6. Create Order and OrderProducts
    7. Create OrderEvent
    8. Delete all the cart items
    */
  return await prisma.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: {
        userId: Number(req.user?.id),
      },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = cartItems.reduce((prev, current) => {
      return prev + current.quantity * current.product.price;
    }, 0); //0 is the initial value

    const address = await tx.address.findFirstOrThrow({
      where: {
        id: Number(req.user?.defaultShippingAddressId),
      },
    });
      
    const order = await tx.order.create({
      data: {
            userId: Number(req.user?.id),
            netAmount: totalAmount,
            address: address.formattedAddress,
            orderProducts: {
                create: cartItems.map((item) => {
                    return {
                        productId: item.productId,
                        quantity: item.quantity
                    }
                })
            }
      },
    });
      
    const orderEvent = await tx.orderEvent.create({
      data: {
        orderId: order.id,
      },    
    })
      
    await tx.cartItem.deleteMany({
      where: {
        userId: Number(req.user?.id),
      },
    });
      
    return res.status(200).json(order);
  });
};

export const listOrders = async (req: Request, res: Response) => {
};

export const cancelOrder = async (req: Request, res: Response) => {};

export const getOrderById = async (req: Request, res: Response) => {};
