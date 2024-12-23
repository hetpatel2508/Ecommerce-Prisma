import { NextFunction, Request, Response } from 'express';
import prisma from '../../DB/prisma';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { UnprocessableEntityException } from '../exceptions/validation';
import { SignUpSchema } from '../models/users';
import { NotFoundException } from '../exceptions/not-found';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // try {
  //   SignUpSchema.parse(req.body);

  //   const { email, password, name } = req.body;

  //   let user = await prisma.user.findFirst({
  //     where: {
  //       email: email,
  //     },
  //   });

  //   if (user) {
  //     next(new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS));
  //   }

  //   user = await prisma.user.create({
  //     data: {
  //       email: email,
  //       password: hashSync(password, 10),
  //       name: name,
  //     },
  //   });

  //   res.status(201).json({
  //     message: 'User created successfully',
  //     data: user,
  //   });
  // } catch (error: any) {
  //   next(
  //     new UnprocessableEntityException(
  //       'Unprocessable Entity',
  //       ErrorCode.UNPROCESSABLE_ENTITY,
  //       error?.issues,
  //     ),
  //   );
  // }
  SignUpSchema.parse(req.body);

  const { email, password, name } = req.body;

  let user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    throw new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS);
  }

  user = await prisma.user.create({
    data: {
      email: email,
      password: hashSync(password, 10),
      name: name,
    },
  });

  res.status(201).json({
    message: 'User created successfully',
    data: user,
  });
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestException('Incorrect password', ErrorCode.INCORRECT_PASSWORD);
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string);

  res.status(200).json({
    message: 'User logged in successfully',
    data: user,
    token: token,
  });
};

export const me = async (req: Request, res: Response): Promise<any> => {
  res.json(req.user);
};
