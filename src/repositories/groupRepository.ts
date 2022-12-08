

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

        throw Error(`My error`);

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

    /**
     * Delete a group
     */
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

    /**
     * Get a group
     */
    async getGroup(gName:string): Promise<IResult<IGroup>> {
        let group: IGroup|undefined;

        const groups = await db<IGroup>(Models.group)
            .where(`name`, gName)
            .select(`*`);
        if (groups.length === 0) {
            return new ResultErrorNotFound(
                `GroupModel not found.`, `groupRepository.getGroup`, `0`
            )
        }

        group = groups[0];
        return new ResultOk(group);
    }

    /**
     * Update a group
     */
    async updateGroup(gName:string, g:IGroup): Promise<IResult<IGroup>> {
        let group: IGroup|undefined;

        // Check if the target exists
        let exists = await kt.exists<IGroup>(Models.group, {name: gName});
        if (!exists) {
            return new ResultErrorNotFound(
                `GroupModel not found.`, `groupRepository.updateGroup`, `0`
            )
        }

        // Check if the new name is valid
        const newNameExists = await db<IGroup>(Models.group)
            .where(`name`,g.name)
            .andWhereNot(`name`, gName)
            .select(`name`);
        if (newNameExists.length > 0) {
            return new ResultErrorBadRequest(
                `GroupModel already exists.`, `groupRepository.updateGroup`, `0`
            )
        }

        // Update
        await db<IGroup>(Models.group)
            .where(`name`, gName)
            .update(g);

        // Return the new group
        const updated = await db<IGroup>(Models.group)
            .where(`name`, g.name)
            .select(`*`);
        group = updated[0];

        return new ResultOk(group);
    }
}
