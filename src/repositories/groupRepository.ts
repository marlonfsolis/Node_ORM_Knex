import {IResult, ResultOk, ResultErrorNotFound, ResultErrorBadRequest} from "../shared/Result";
import db from "../knex";
import {Models} from "../models";
import * as kt from "./knExtentions";
import {IGroup,GetGroupsQuery} from "../models/Group.model";
import IndexService from "../services/indexService";
import {dbDebug} from "../startup/debuggers";


/**
 * GroupModel Repository
 */
 export default class GroupRepository
{
    private readonly indexServ:IndexService;

    constructor() {
        this.indexServ = new IndexService();
    }

    /**
     * Get a group list
     */
    async getGroups(params:GetGroupsQuery): Promise<IResult<IGroup[]>> {
        const mysql = `
            SELECT *
            FROM \`group\` g
            WHERE (IFNULL(:name_f,'') = '' OR g.name = :name_f)
            AND (IFNULL(:description_f,'') = '' OR g.description = :description_f)
            AND (IFNULL(:name_s,'') = '' OR g.name LIKE :name_s)
            AND (IFNULL(:description_s,'') = '' OR g.description LIKE :description_s)
            LIMIT ${params.limit}
            OFFSET ${params.skip};
        `;
        const [g1] = await db
            .raw(mysql, {
                name_f:params.name_f,
                description_f:params.description_f,
                name_s:params.name_s,
                description_s:params.description_s
            });
        return new ResultOk<IGroup[]>(g1);
    }


    /**
     * Create a group
     */
    async createGroup(g:IGroup): Promise<IResult<IGroup>> {
        let group: IGroup|undefined;

        // Check if exists
        const exists = await kt.exists(Models.group, {name: g.name});
        if (exists) {
            return ResultErrorBadRequest.instance(
                new Error(`Group already exists.`), `groupRepository.createGroup`);
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
