import { CustomError } from "./custom-error";

export class BadRequetError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message); 
        Object.setPrototypeOf(this, BadRequetError.prototype); // Since CustomeError extends the Error base class
    }

    serialiseErrors() {
        return [{
            message: this.message
        }]
    }
}