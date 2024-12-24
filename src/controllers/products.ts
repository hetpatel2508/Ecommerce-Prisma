import { Request, Response } from 'express';
import prisma from '../../DB/prisma';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { count } from 'console';

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(','),
    },
  });

  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    if (product.tags) {
      product.tags = product.tags.join(',');
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: product,
    });

    res.status(200).json(updatedProduct);
  } catch (error: any) {
    throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json(deletedProduct);
  } catch (error: any) {
    throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
  }
};

export const listProducts = async (req: Request, res: Response) => {
  const count = await prisma.product.count();

  const products = await prisma.product.findMany({
    skip: Number(req.query.skip) || 0,
    take: 5,
  });

  res.status(200).json({ count, data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
    }

    res.status(200).json(product);
  } catch (error: any) {
    throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
  }
};
