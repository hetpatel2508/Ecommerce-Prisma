import { Request, Response } from 'express';
import prisma from '../../DB/prisma';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({
      message: 'User already exists',
    });
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

export const login = async (req: Request, res: Response) => {
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

  if (compareSync(password, user.password)) {
    return res.status(400).json({
      message: 'Invalid password',
    });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as string,
    // {
    // expiresIn: '1d',
    // }
  );

  res.status(200).json({
    message: 'User logged in successfully',
    data: user,
  });
};
