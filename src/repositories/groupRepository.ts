

import {IResult, ResultOk, ResultError, ResultErrorNotFound, ResultErrorBadRequest} from "../shared/Result";
import db from "../knex";
import {Models} from "../models";
import * as kt from "./knExtentions";

import {dbDebug} from "../startup/debuggers";
import {IGroup,GetGroupsQuery} from "../models/Group.model";


/**
 * GroupModel Repository
 */
 export default class GroupRepository
{
    constructor() {}

    /**
     * Get a group list
     */
    async getGroups(params:GetGroupsQuery): Promise<IResult<IGroup[]>> {
        let groups = [] as IGroup[];

        let query = db<IGroup>(Models.group)
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

        const g = await query.select(`name`, `description`);
        // console.log(query.toSQL());

        groups = g as IGroup[];
        return new ResultOk<IGroup[]>(groups);
    }


    /**
     * Create a group
     */
    async createGroup(g:IGroup): Promise<IResult<IGroup>> {
        let group: IGroup|undefined;

        // Check if exists
        const exists = await kt.exists(Models.group, {name: g.name});
        if (exists) {
            return new ResultErrorBadRequest(
                `Group already exists.`, `groupRepository.createGroup`, `0`
            );
        }

        await db<IGroup>(Models.group).insert(g);
        group = await db<IGroup>(Models.group)
            .where(`name`, g.name)
            .first(`*`);

        return new ResultOk(group);
    }

    /** Delete a group */
    async deleteGroup(gName:string): Promise<IResult<IGroup>> {
        let group: IGroup|undefined;

        const query = db<IGroup>(Models.group)
            .where(`name`, gName);

        const del = await query.select(`*`);
        if (del.length === 0) {
            return new ResultErrorNotFound(
                `GroupModel not found.`, `groupRepository.deleteGroup`, `0`
            );
        }

        group = del[0];
        await query.delete();

        return new ResultOk(group);
    }

    /** Get a group */
    // async getPermission(pName:string): Promise<IResult<IPermission>> {
    //     let group: IPermission|undefined;
    //
    //     const per = await db<IPermission>(Models.group)
    //         .where(`name`, pName)
    //         .select(`*`);
    //     if (per.length === 0) {
    //         return new ResultErrorNotFound(
    //             `PermissionModel not found.`, `groupRepository.getPermission`, `0`
    //         )
    //     }
    //
    //     group = per[0];
    //     return new ResultOk(group);
    // }

    /** Update a group */
    // async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
    //     let group: IPermission|undefined;
    //
    //     // Check if the target exists
    //     let exists = await kt.exists<IPermission>(Models.group, {name: pName});
    //     if (!exists) {
    //         return new ResultErrorNotFound(
    //             `PermissionModel not found.`, `groupRepository.updatePermission`, `0`
    //         )
    //     }
    //
    //     // Check if the new name is valid
    //     const newNameExists = await db<IPermission>(Models.group)
    //         .where(`name`,p.name)
    //         .andWhereNot(`name`, pName)
    //         .select(`name`);
    //     if (newNameExists.length > 0) {
    //         return new ResultErrorBadRequest(
    //             `PermissionModel already exists.`, `groupRepository.updatePermission`, `0`
    //         )
    //     }

    //     // Update
    //     await db<IPermission>(Models.group)
    //         .where(`name`, pName)
    //         .update(p);
    //
    //     // Return the new group
    //     const updated = await db<IPermission>(Models.group)
    //         .where(`name`, p.name)
    //         .select(`*`);
    //     group = updated[0];
    //
    //     return new ResultOk(group);
    // }
}
