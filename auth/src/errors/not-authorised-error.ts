import { CustomError } from "./custom-error";

export class NotAuthorisedErrors extends CustomError {
    statusCode = 400;

    constructor () {
        super('Not Authorised');

        Object.setPrototypeOf(this, NotAuthorisedErrors.prototype)
    }

    serialiseErrors(){
        return [{
            message: 'Not Authorised'
        }]
    }
}