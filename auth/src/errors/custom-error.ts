export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message); // this helps in logging
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serialiseErrors(): {message: string, field?: string}[]; //Delcare a method and the return type is and array of objects
}