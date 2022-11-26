import {Request, Response} from "express";
import {validationResult} from "express-validator";

import PermissionService from "../services/permissionService";
import {
    HttpResponseBadRequest,
    HttpResponseCreated, HttpResponseError,
    HttpResponseInternalServerError, HttpResponseNotFound,
    HttpResponseOk
} from "../shared/HttpResponse";
import {IPermission, Permission} from "../models/Permission";
import {GetPermissionsQuery} from "../shared/Classes";
import {convertTo} from "../utils";


import {IErr} from "../shared/Err";
import {debug} from "../startup/debuggers";


/** Get permission list. */
export const getPermissions = async (req:Request, res:Response) => {
    let data: IPermission[]|undefined;

    // const qVal = convertTo<GetPermissionsQuery>(req.query);
    const qVal = new GetPermissionsQuery(req.query);

    const permServ = new PermissionService();
    // debug(qVal);

    const result = await permServ.getPermissions(qVal);
    if (!result.success) {
        return new HttpResponseError(res, result);
    }

    data = result.data;
    return new HttpResponseOk(res, data);
};

/** Post a permission */
export const createPermission = async (req: Request, res: Response) => {
    let data: IPermission|undefined;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array({ onlyFirstError: false }) as IErr[];
        return new HttpResponseBadRequest(res, errs);
    }

    const permServ = new PermissionService();
    const p = new Permission(req.body as IPermission);
    const result = await permServ.createPermission(p);
    if (!result.success || !result.data) {
        return new HttpResponseError(res, result);
    }

    return new HttpResponseCreated(res, result.data);
};

/** DELETE a permission */
export const deletePermission = async (req: Request, res: Response) => {
    let data: IPermission|undefined;

    const permServ = new PermissionService();
    const pName = req.params.name;
    const result = await permServ.deletePermission(pName);
    if (!result.success || !result.data) {
        return new HttpResponseError(res, result);
    }

    return new HttpResponseOk(res, result.data);
};


/** GET a permission */
export const getPermission = async (req: Request, res: Response) => {
    let data: IPermission|undefined;

    const permServ = new PermissionService();

    const pName = req.params.name;
    const result = await permServ.getPermission(pName);
    if (!result.success || !result.data) {
        return new HttpResponseError(res, result);
    }

    return new HttpResponseOk(res, result.data);
};


/** Put a permission */
export const updatePermission = async (req: Request, res: Response) => {
    let data: IPermission|undefined;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array({ onlyFirstError: false }) as IErr[];
        return new HttpResponseBadRequest(res, errs);
    }

    const permServ = new PermissionService();

    const pName = req.params.name;
    const p = req.body as IPermission;
    const result = await permServ.updatePermission(pName, p);
    if (!result.success || !result.data) {
        return new HttpResponseError(res, result);
    }

    return new HttpResponseOk(res, result.data);
};
