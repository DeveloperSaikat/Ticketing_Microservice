import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
        super();// Since we are extending base class

        Object.setPrototypeOf(this, RequestValidationError.prototype);// Only because we are extending a built in class
    }
}
