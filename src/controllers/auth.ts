import { NextFunction, Request, Response } from 'express';
import prisma from '../../DB/prisma';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, name } = req.body;

  let user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    // return res.status(400).json({
    //   message: 'User already exists',
    // });
    return next(new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS));
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
  // res.send('login working really fine!');
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  if (!compareSync(password, user.password)) {
    return res.status(400).json({
      message: 'Invalid password',
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string);

  res.status(200).json({
    message: 'User logged in successfully',
    data: user,
    token: token,
  });
};
