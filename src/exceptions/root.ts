//what will be sent?
/* message, http status code, error code, Actual Error Object  */

export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any; // any type because we don't know what the error will be object or string

  constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  // INTERNAL_SERVER_ERROR = 500,
  // BAD_REQUEST = 400,
  // NOT_FOUND = 404
}