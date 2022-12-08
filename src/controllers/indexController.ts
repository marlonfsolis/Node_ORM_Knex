import {NextFunction, Request, Response, ErrorRequestHandler} from "express";
import {Err, IErr} from "../shared/Err";
import {HttpResponseInternalServerError, HttpResponseNotFound} from "../shared/HttpResponse";

/**
 * GET Page not found
 */
export const pageNotFound = async (req: Request, res: Response) => {
    const errs = [
        new Err(`API route not found.`, ``)
    ] as IErr[];
    return new HttpResponseNotFound(res, errs);
};


/**
 * GET page error not handled
 */
export const errorNotHandled = async (error:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
    // console.log(error);

    const errs = [
        new Err(`API route error not handled.`, ``)
    ] as IErr[];
    return new HttpResponseInternalServerError(res, errs);
};

