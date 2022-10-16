export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export interface HttpExceptionError {
  value?: string;
  msg?: string;
  param?: string;
  location?: string;
}

interface HttpExceptionArgs {
  statusCode: HttpCode;
  message?: string;
  errors: HttpExceptionError[];
}

export class HttpExecption extends Error {
  public readonly statusCode: HttpCode;
  public readonly errors: HttpExceptionError[];

  constructor(args: HttpExceptionArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = args.statusCode;
    this.errors = args.errors;

    Error.captureStackTrace(this);
  }
}
