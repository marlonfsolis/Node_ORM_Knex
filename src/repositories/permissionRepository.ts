import {IPermission} from "../models/Permission";
import {IResult, ResultOk, ResultError, ResultErrorNotFound, ResultErrorBadRequest} from "../shared/Result";
import {Err} from "../shared/Err";
import {IOutputResult} from "../shared/SqlResult";
import db from "../knex";
import {GetPermissionsQuery} from "../shared/Classes";
import {Models} from "../models";
import * as kt from "./knExtentions";

import {dbDebug} from "../startup/debuggers";


export default class PermissionRepository
{
    constructor() {}

    /**
     * Get a permission list
     */
    async getPermissions(params:GetPermissionsQuery): Promise<IResult<IPermission[]>> {
        let permissions = [] as IPermission[];

        let query = db<IPermission>(`permission`)
            .where(function() {
                if (params.name_f.length > 0)
                    this.where(`name`, params.name_f);
            })
            .andWhere(function() {
                if (params.description_f.length > 0)
                    this.where(`description`, params.description_f);
            })
            .andWhere(function () {
               if (params.name_s.length > 0)
                    this.orWhereLike(`name`, params.name_s)
            })
            .andWhere(function () {
                if (params.description_s.length > 0)
                    this.orWhereLike(`description`, params.description_s)
            })
            .limit(params.Limit)
            .offset(params.Skip);

        const p = await query.select(`name`, `description`);
        // console.log(query.toSQL());

        permissions = p as IPermission[];
        return new ResultOk<IPermission[]>(permissions);
    }

    /** Create a permission */
    async createPermission(p:IPermission): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        // Check if exists
        const exists = await db<IPermission>(Models.permission)
            .where(`name`, p.name)
            .count({c:`name`});
        if (exists[0].c && exists[0].c > 0) {
            return new ResultErrorBadRequest(
                `Permission already exists.`, `permissionRepository.createPermission`, `0`
            );
        }

        await db<IPermission>(Models.permission).insert(p);
        permission = await db<IPermission>(Models.permission)
            .where(`name`, p.name)
            .first(`*`);

        return new ResultOk(permission);
    }

    /** Delete a permission */
    async deletePermission(pName:string): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        //const exists = await kt.exists<IPermission>(Models.permission, {name: pName});
        //if (!exists) {}
        const query = db<IPermission>(Models.permission)
            .where(`name`, pName);

        const del = await query.select(`*`);
        if (del.length === 0) {
            return new ResultErrorNotFound(
                `Permission not found.`, `permissionRepository.deletePermission`, `0`
            );
        }

        permission = del[0];
        await query.delete();

        return new ResultOk(permission);
    }

    /** Get a permission */
    async getPermission(pName:string): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        // const inValues = [pName];
        // const r = await db.call("sp_permissions_read", inValues,["@result"], this.pool);
        // const callResult  = r.getOutputVal<IOutputResult>("@result");
        //
        // if (!callResult.success) {
        //     return new ResultError(
        //         new Err(callResult.msg, "sp_permissions_read", callResult.errorLogId.toString())
        //     )
        // }
        //
        // permission = r.getData<IPermission>(0)[0];
        return new ResultOk(permission);
    }

    /** Update a permission */
    async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        // const inValues = [pName, JSON.stringify(p)];
        // const r = await db.call("sp_permissions_update", inValues,["@result"], this.pool);
        // const callResult  = r.getOutputVal<IOutputResult>("@result");
        //
        // if (!callResult.success) {
        //     return new ResultError(
        //         new Err(callResult.msg, "sp_permissions_update", callResult.errorLogId.toString())
        //     )
        // }
        //
        // permission = r.getData<IPermission>(0)[0];
        return new ResultOk(permission);
    }
}
