import {Request, Response} from "express";
import {validationResult} from "express-validator";

import GroupService from "../services/groupService";
import {
    HttpResponseBadRequest,
    HttpResponseCreated,
    HttpResponseError,
    HttpResponseOk
} from "../shared/HttpResponse";
import {IGroup, GroupModel, GetGroupsQuery} from "../models/Group.model";
import {IErr,validateReq} from "../shared/Err";

const groupServ = new GroupService();


/** Get group list. */
export const getGroups = async (req:Request, res:Response) => {
    let data: IGroup[]|undefined;

    const qVal = new GetGroupsQuery(req.query);
    const result = await groupServ.getGroups(qVal);
    if (!result.success) {
        return new HttpResponseError(res, result);
    }

    data = result.data;
    return new HttpResponseOk(res, data);
};


/** Post a group */
export const createGroup = async (req: Request, res: Response) => {
    let data: IGroup|undefined;

    const {isValid, errs} = validateReq(req);
    if (!isValid) {
        return new HttpResponseBadRequest(res, errs);
    }

    const g = new GroupModel(req.body as IGroup);
    const result = await groupServ.createGroup(g);
    if (!result.success || !result.data) {
        return new HttpResponseError(res, result);
    }

    return new HttpResponseCreated(res, result.data);
};


/**
 * DELETE a group
 */
export const deleteGroup = async (req: Request, res: Response) => {
    let data: IGroup|undefined;

    const gName = req.params.name;
    const result = await groupServ.deleteGroup(gName);
    if (!result.success || !result.data) {
        return new HttpResponseError(res, result);
    }

    return new HttpResponseOk(res, result.data);
};


/**
 * GET a group
 */
export const getGroup = async (req: Request, res: Response) => {
    let data: IGroup|undefined;

    const gName = req.params.name;
    const result = await groupServ.getGroup(gName);
    if (!result.success || !result.data) {
        return new HttpResponseError(res, result);
    }

    return new HttpResponseOk(res, result.data);
};


/** Put a group */
// export const updateGroup = async (req: Request, res: Response) => {
//     let data: IGroup|undefined;
//
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const errs = errors.array({ onlyFirstError: false }) as IErr[];
//         return new HttpResponseBadRequest(res, errs);
//     }
//
//     const groupServ = new GroupService();
//
//     const gName = req.params.name;
//     const p = req.body as IGroup;
//     const result = await groupServ.updateGroup(gName, p);
//     if (!result.success || !result.data) {
//         return new HttpResponseError(res, result);
//     }
//
//     return new HttpResponseOk(res, result.data);
// };
