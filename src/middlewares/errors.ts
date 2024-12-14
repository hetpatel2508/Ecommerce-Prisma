import { NextFunction } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware: any = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    console.log("Error caught by middleware");
    
    res.status(error.statusCode).json({
        message: error.message,
        errorCoed: error.errorCode,
        errors: error.errors
    })
}