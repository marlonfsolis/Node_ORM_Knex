import {Request, Response} from "express";
import {validationResult} from "express-validator";

import PermissionService from "../services/permissionService";
import {
    HttpResponseBadRequest,
    HttpResponseCreated,
    HttpResponseInternalServerError, HttpResponseNotFound,
    HttpResponseOk
} from "../shared/HttpResponse";
import {IPermission} from "../models/Permission";
import {IErr} from "../shared/Err";
import {debug} from "../startup/debuggers";


/** Get permission list. */
export const getPermissions = async (req:Request, res:Response) => {
    let data: IPermission[]|undefined;
    const name = req.query.name as string;
    const description = req.query.description as string;

    debug(`name`,name, `description`,description);

    const permServ = new PermissionService();

    const result = await permServ.getPermissions(name, description);
    if (!result.success) {
        return new HttpResponseInternalServerError(res, [result.err!]);
    }

    data = result.data;
    return new HttpResponseOk(res, data);
};

/** Post a permission */
export const createPermission = async (req: Request, res: Response) => {
    let data: IPermission|undefined;

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     const errs = errors.array({ onlyFirstError: false }) as IErr[];
    //     return new HttpResponseBadRequest(res, errs);
    // }

    // const permServ = new PermissionService(req.app.locals.pool);
    //
    // const p = req.body as IPermission;
    // const result = await permServ.createPermission(p);
    // if (!result.success || !result.data) {
    //     const code = result.getErrorCode();
    //     if (code === `400`)
    //         return new HttpResponseBadRequest(res, [result.err!]);
    //     return new HttpResponseInternalServerError(res,[result.err!]);
    // }

    return new HttpResponseCreated(res, data);
};

/** DELETE a permission */
export const deletePermission = async (req: Request, res: Response) => {
    let data: IPermission|undefined;

    // const permServ = new PermissionService(req.app.locals.pool);
    //
    // const pName = req.params.name;
    // const result = await permServ.deletePermission(pName);
    // if (!result.success || !result.data) {
    //     const code = result.getErrorCode();
    //     if (code === `400`) return new HttpResponseBadRequest(res, [result.err!]);
    //     if (code === `404`) return new HttpResponseNotFound(res, [result.err!]);
    //     return new HttpResponseInternalServerError(res,[result.err!]);
    // }

    return new HttpResponseCreated(res, data);
};


/** GET a permission */
export const getPermission = async (req: Request, res: Response) => {
    let data: IPermission|undefined;

    // const permServ = new PermissionService(req.app.locals.pool);
    //
    // const pName = req.params.name;
    // const result = await permServ.getPermission(pName);
    // if (!result.success || !result.data) {
    //     const code = result.getErrorCode();
    //     if (code === `400`) return new HttpResponseBadRequest(res, [result.err!]);
    //     if (code === `404`) return new HttpResponseNotFound(res, [result.err!]);
    //     return new HttpResponseInternalServerError(res,[result.err!]);
    // }

    return new HttpResponseCreated(res, data);
};


/** Put a permission */
export const updatePermission = async (req: Request, res: Response) => {
    let data: IPermission|undefined;

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     const errs = errors.array({ onlyFirstError: false }) as IErr[];
    //     return new HttpResponseBadRequest(res, errs);
    // }

    // const permServ = new PermissionService(req.app.locals.pool);
    //
    // const pName = req.params.name;
    // const p = req.body as IPermission;
    // const result = await permServ.updatePermission(pName, p);
    // if (!result.success || !result.data) {
    //     const code = result.getErrorCode();
    //     if (code === `400`) return new HttpResponseBadRequest(res, [result.err!]);
    //     if (code === `404`) return new HttpResponseNotFound(res, [result.err!]);
    //     return new HttpResponseInternalServerError(res,[result.err!]);
    // }

    return new HttpResponseOk(res, data);
};
