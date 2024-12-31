import { Request, Response } from 'express';
import { AddressSchema, updateUserSchema } from '../models/users';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { Address, User } from '@prisma/client';
import prisma from '../../DB/prisma';
import { BadRequestException } from '../exceptions/bad-requests';

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);

  const address = await prisma.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });

  res.status(201).json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const deletedAddress = await prisma.address.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json(deletedAddress);
  } catch (error: any) {
    throw new NotFoundException('Address not found', ErrorCode.ADDRESS_NOT_FOUND);
  }
};

export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prisma.address.findMany({
    where: {
      userId: req.user?.id,
    },
  });

  res.status(200).json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = updateUserSchema.parse(req.body);
  let shippingAddressId: Address | null = null;
  let billingAddressId: Address | null = null;

  if (validatedData.defaultShippingAddressId) {
    try {
      shippingAddressId = await prisma.address.findFirstOrThrow({
        where: {
          id: Number(validatedData.defaultShippingAddressId),
        },
      });
      if (shippingAddressId.userId !== req.user?.id) {
        throw new BadRequestException('Address does not belong to user', ErrorCode.ADDRESS_NOT_FOUND);
      }
    } catch (error: any) {
      throw new NotFoundException('Address not found', ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER);
    }
  }

  if (validatedData.defaultBillingAddressId) {
    try {
      billingAddressId = await prisma.address.findFirstOrThrow({
        where: {
          id: Number(validatedData.defaultBillingAddressId),
        },
      });
      if (billingAddressId.userId !== req.user?.id) {
        throw new BadRequestException('Address does not belong to user', ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER);
      }
    } catch (error: any) {
      throw new NotFoundException('Address not found', ErrorCode.ADDRESS_NOT_FOUND);
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: req.user?.id,
    },
    data: {
      ...validatedData,
      defaultShippingAddressId: shippingAddressId?.id,
      defaultBillingAddressId: billingAddressId?.id,
    },
  });

  res.status(200).json({
    ...updatedUser,
    defaultShippingAddress: shippingAddressId,
    defaultBillingAddress: billingAddressId,
  });
};
