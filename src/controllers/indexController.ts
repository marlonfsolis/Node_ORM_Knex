import {NextFunction, Request, Response, ErrorRequestHandler} from "express";
import {Err, IErr} from "../shared/Err";
import {HttpResponseInternalServerError, HttpResponseNotFound} from "../shared/HttpResponse";
import IndexService from "../services/indexService";

const indexServ = new IndexService();

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
export const errorNotHandled = async (error:Error, req:Request, res:Response, next:NextFunction) => {
    const errLog = await indexServ.logError(error, `Error not handled.`);
    const errs = [
        new Err(`API route error not handled.`, ``, errLog.errorLogId.toString())
    ] as IErr[];
    return new HttpResponseInternalServerError(res, errs);
};

