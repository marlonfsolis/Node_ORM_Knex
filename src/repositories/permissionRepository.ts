import knex from "knex";

import {IPermission,GetPermissionsQuery} from "../models/Permission.model";
import {IResult, ResultOk, ResultError, ResultErrorNotFound, ResultErrorBadRequest} from "../shared/Result";
import {Err} from "../shared/Err";
import {IOutputResult} from "../shared/SqlResult";
import db from "../knex";
import {Models} from "../models";
import * as kt from "./knExtentions";

import {dbDebug} from "../startup/debuggers";
import {selectColor} from "debug";
import {update} from "lodash";


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

        const per = await db<IPermission>(Models.permission)
            .where(`name`, pName)
            .select(`*`);
        if (per.length === 0) {
            return new ResultErrorNotFound(
                `Permission not found.`, `permissionRepository.getPermission`, `0`
            )
        }

        permission = per[0];
        return new ResultOk(permission);
    }

    /** Update a permission */
    async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        // Check if the target exists
        let exists = await kt.exists<IPermission>(Models.permission, {name: pName});
        if (!exists) {
            return new ResultErrorNotFound(
                `Permission not found.`, `permissionRepository.updatePermission`, `0`
            )
        }

        // Check if the new name is valid
        const newNameExists = await db<IPermission>(Models.permission)
            .where(`name`,p.name)
            .andWhereNot(`name`, pName)
            .select(`name`);
        if (newNameExists.length > 0) {
            return new ResultErrorBadRequest(
                `Permission already exists.`, `permissionRepository.updatePermission`, `0`
            )
        }

        // Update
        await db<IPermission>(Models.permission)
            .where(`name`, pName)
            .update(p);

        // Return the new permission
        const updated = await db<IPermission>(Models.permission)
            .where(`name`, p.name)
            .select(`*`);
        permission = updated[0];

        return new ResultOk(permission);
    }
}
