import { StatusCodes } from "http-status-codes";
import { ApiError } from "./api_error.ts";

class UnauthenticatedError extends ApiError {
  constructor(message:string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    Object.setPrototypeOf(this, UnauthenticatedError.prototype)
  }
}

export default UnauthenticatedError;