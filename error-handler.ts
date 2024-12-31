import { NextFunction } from 'express';
import { ErrorCode, HttpException } from './src/exceptions/root';
import { InternalException } from './src/exceptions/internl-exception';
import { ZodError } from 'zod';
import { BadRequestException } from './src/exceptions/bad-requests';

export const errorHandler = (mathod: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await mathod(req, res, next);
    } catch (error: any) {
      let exception: HttpException;

      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestException(
            'Unprocessable Entity',
            ErrorCode.UNPROCESSABLE_ENTITY,
            error,
          );
        } else {
          exception = new InternalException(
            'Something went wrong',
            error,
            ErrorCode.INTERNAL_EXCEPTION,
          );
        }
      }
      next(exception);
    }
  };
};
