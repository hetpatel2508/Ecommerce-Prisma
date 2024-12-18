import { ErrorCode, HttpException } from "./root";

export class UnprocessableEntityException extends HttpException{
    constructor(message: string, errorCode: ErrorCode, error: any) {
        super(message, errorCode, 422, error);
    }
}