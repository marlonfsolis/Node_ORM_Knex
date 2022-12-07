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
    try {
        return await this.groupRepo.getGroups(params);
    } catch (err:any) {
        return new ResultErrorInternalServer(err.toString(), `groupService.getGroups`, `0`);
    }
}


/**
 * Create a permission
 */
async createGroup(g:IGroup): Promise<IResult<IGroup>> {
    try {
        return await this.groupRepo.createGroup(g);
    } catch (err:any) {
        return new ResultErrorInternalServer<IGroup>(err.toString(),
        `permissionService.createPermission`, `0`);
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
 * Get a permission
 */
// async getPermission(pName:string): Promise<IResult<IPermission>> {
// try {
//     return await this.permRepo.getPermission(pName);
// } catch (err:any) {
//     return new ResultErrorInternalServer<IPermission>(
//     err.toString(),`permissionService.deletePermission`, `0`);
// }
// }

/**
 * Update a permission
 */
// async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
// try {
//     return await this.permRepo.updatePermission(pName, p);
// } catch (err:any) {
//     return new ResultErrorInternalServer<IPermission>(
//     err.toString(),`permissionService.deletePermission`, `0`);
// }
// }
}
