import { User } from '@prisma/client';
import express from 'express';

declare module 'express' {
  export interface Request {
    user?: User;
    hetPatel?: string; // we can use it as a global variable for all requests with authMiddleware
    // res.status(200).json({ message: req.hetPatel });
  }
}
