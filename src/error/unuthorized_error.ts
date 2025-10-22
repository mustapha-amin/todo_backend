import { StatusCodes } from "http-status-codes"
import { ApiError } from "./api_error.ts"

class UnauthorizedError extends ApiError {
    constructor(message:string){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export default UnauthorizedError