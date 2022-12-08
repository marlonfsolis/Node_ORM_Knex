import {IResult, ResultError, ResultErrorInternalServer} from "../shared/Result";
import {IGroup, GetGroupsQuery} from "../models/Group.model";
import GroupRepository from "../repositories/groupRepository";


export default class GroupService
{
    private readonly groupRepo:GroupRepository;

    constructor() {
        this.groupRepo = new GroupRepository();
    }

    /**
     * Get a group list
     */
    async getGroups(params:GetGroupsQuery): Promise<IResult<IGroup[]>> {
        // try {
            return await this.groupRepo.getGroups(params);
        // } catch (err:any) {
        //     return new ResultErrorInternalServer(err.toString(), `groupService.getGroups`, `0`);
        // }
    }


    /**
     * Create a group
     */
    async createGroup(g:IGroup): Promise<IResult<IGroup>> {
        try {
            return await this.groupRepo.createGroup(g);
        } catch (err:any) {
            return new ResultErrorInternalServer<IGroup>(err.toString(),
            `groupService.createGroup`, `0`);
        }
    }


    /**
     * Delete a group
     */
    async deleteGroup(gName:string): Promise<IResult<IGroup>> {
        try {
            return await this.groupRepo.deleteGroup(gName);
        } catch (err: any) {
            return new ResultErrorInternalServer<IGroup>(
            err.toString(),`groupService.deleteGroup`, `0`);
        }
    }

    /**
     * Get a group
     */
    async getGroup(gName:string): Promise<IResult<IGroup>> {
        try {
            return await this.groupRepo.getGroup(gName);
        } catch (err:any) {
            return new ResultErrorInternalServer<IGroup>(
            err.toString(),`groupService.deleteGroup`, `0`);
        }
    }

    /**
     * Update a group
     */
    async updateGroup(gName:string, g:IGroup): Promise<IResult<IGroup>> {
        try {
            return await this.groupRepo.updateGroup(gName, g);
        } catch (err:any) {
            return new ResultErrorInternalServer<IGroup>(
            err.toString(),`groupService.deleteGroup`, `0`);
        }
    }
}
