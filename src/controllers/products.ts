import { Request, Response } from 'express';
import prisma from '../../DB/prisma';

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(','),
    },
  });

  res.status(201).json(product);
};
