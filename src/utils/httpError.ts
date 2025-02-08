import { NextFunction, Request } from "express";
import errorObject from "./errorObject";

export default function errorHandler(
    next: NextFunction,
    err: Error | unknown,
    req: Request,
    errorStatusCode: number = 500
): void {
    const errorObj = errorObject(err, req, errorStatusCode);
    next(errorObj);
}
