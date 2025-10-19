import { StatusCodes } from "http-status-codes"
import { ApiError } from "./api_error.ts"

class NotFoundError extends ApiError {
    constructor(message:string){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export default NotFoundError