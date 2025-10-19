import { StatusCodes } from "http-status-codes";
import { ApiError } from "./api_error.ts";

class BadRequestError extends ApiError{
    constructor(message:string) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export default BadRequestError