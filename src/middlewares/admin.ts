import { NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/root';
import * as jwt from 'jsonwebtoken';
import prisma from '../../DB/prisma';

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user.role === 'ADMIN') {
        next();
    } else {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
};

export default adminMiddleware;
