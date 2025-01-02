import { Request, Response } from 'express';
import { changeQuantitySchema, CreateCartSchema } from '../models/cart';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { NotFoundException } from '../exceptions/not-found';
import prisma from '../../DB/prisma';
import { Product } from '@prisma/client';

export const addItemToCart = async (req: Request, res: Response): Promise<any> => {
  const validatedData = CreateCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prisma.product.findFirstOrThrow({
      where: {
        id: Number(validatedData.productId),
      },
    });
  } catch (error: any) {
    throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
  }

  const cart = await prisma.cartItem.create({
    data: {
      userId: Number(req.user?.id),
      productId: Number(validatedData.productId),
      quantity: Number(validatedData.quantity),
    },
  });

  res.status(201).json(cart);
};

export const deleteItemToCart = async (req: Request, res: Response): Promise<any> => {
  const cart = await prisma.cartItem.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.status(200).json(cart);
};

export const changeQuantity = async (req: Request, res: Response): Promise<any> => {
  const validatedData = changeQuantitySchema.parse(req.body);

  const cart = await prisma.cartItem.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      quantity: Number(validatedData.quantity),
    },
  });

  res.status(200).json(cart);
};

export const getCart = async (req: Request, res: Response): Promise<any> => {
  const cart = await prisma.cartItem.findMany({
    where: {
      userId: Number(req.user?.id),
    },
    include: {
      product: true,
    },
  });

  res.status(200).json(cart);
};
