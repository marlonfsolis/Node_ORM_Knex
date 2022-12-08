import {Request, Response} from "express";
import {Err, IErr} from "../shared/Err";
import {HttpResponseNotFound} from "../shared/HttpResponse";

/**
 * GET Page not found
 */
export const pageNotFound = async (req: Request, res: Response) => {
    const errs = [
        new Err(`API route not found.`, ``)
    ] as IErr[];
    return new HttpResponseNotFound(res, errs);
};
