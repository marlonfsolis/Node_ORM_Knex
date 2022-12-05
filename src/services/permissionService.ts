import {IResult, ResultError, ResultErrorInternalServer} from "../shared/Result";
import {IPermission,GetPermissionsQuery} from "../models/Permission";
import PermissionRepository from "../repositories/permissionRepository";


/**
 * Permission Service
 */
export default class PermissionService
{
    private readonly permRepo:PermissionRepository;

    constructor() {
        this.permRepo = new PermissionRepository();
    }

    /**
     * Get a permission list
     */
    async getPermissions(params:GetPermissionsQuery): Promise<IResult<IPermission[]>> {
        try {
            return await this.permRepo.getPermissions(params);
        } catch (err:any) {
            // console.log(err);
            // console.log(err.stack);
            return new ResultErrorInternalServer(err.toString(), `permissionService.getPermissions`, `0`);
        }
    }


    /**
     * Create a permission
     */
    async createPermission(p:IPermission): Promise<IResult<IPermission>> {
        try {
            return await this.permRepo.createPermission(p);
        } catch (err:any) {
            return new ResultErrorInternalServer<IPermission>(err.toString(),
                `permissionService.createPermission`, `0`);
        }
    }


    /**
     * Delete a permission
     */
    async deletePermission(pName:string): Promise<IResult<IPermission>> {
        try {
            return await this.permRepo.deletePermission(pName);
        } catch (err: any) {
            return new ResultErrorInternalServer<IPermission>(
                err.toString(),`permissionService.deletePermission`, `0`);
        }
    }

    /**
     * Get a permission
     */
    async getPermission(pName:string): Promise<IResult<IPermission>> {
        try {
            return await this.permRepo.getPermission(pName);
        } catch (err:any) {
            return new ResultErrorInternalServer<IPermission>(
                err.toString(),`permissionService.deletePermission`, `0`);
        }
    }

    /**
     * Update a permission
     */
    async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
        try {
            return await this.permRepo.updatePermission(pName, p);
        } catch (err:any) {
            return new ResultErrorInternalServer<IPermission>(
                err.toString(),`permissionService.deletePermission`, `0`);
        }
    }
}
