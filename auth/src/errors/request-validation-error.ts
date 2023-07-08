import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super('Invalid request parametrs');// Since we are extending base class

        Object.setPrototypeOf(this, RequestValidationError.prototype);// Only because we are extending a built in class
    }

    serialiseErrors() {
        return this.errors.map( err => {
            return { message: err.msg, type: err.type}
        })
    }
}
