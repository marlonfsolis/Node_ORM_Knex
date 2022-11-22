import {IPermission} from "../models/Permission";
import {IResult, ResultOk, ResultError} from "../shared/Result";
import {Err} from "../shared/Err";
import {IOutputResult} from "../shared/SqlResult";
import db from "../knex";
import {GetPermissionsQuery} from "../shared/Types";
import {debug} from "util";



export default class PermissionRepository
{
    constructor() {}

    /**
     * Get a permission list
     */
    async getPermissions(params:GetPermissionsQuery): Promise<IResult<IPermission[]>> {
        let permissions = [] as IPermission[];

        // let query = db<IPermission>(`permission`);
        // // Filter
        // if (params.name_f && params.name_f.length > 0)
        //     query = query.where({name: params.name_f});
        // if (params.description_f && params.description_f.length > 0)
        //     query = query.where({description: params.description_f});
        // // Search
        // if (params.name_s && params.name_s.length > 0)
        //     query = query.whereLike(`name`, params.name_s);
        // if (params.description_s && params.description_s.length > 0)
        //     query = query.whereLike(`description`, params.description_s)

        let query = db<IPermission>(`permission`)
            .where(`name`, params.name_f)
            .andWhere(function(){
                this.where(`description`, ``);
                this.orWhere(`description`, params.description_f);
            })
            // .whereLike(`name`, params.name_s)
            // .whereLike(`description`, params.description_s)
            .limit(Number(params.limit))
            .offset(Number(params.skip));
        console.log(query.toSQL());

        const p = await query
            .select(`name`, `description`)
            .limit(Number(params.limit))
            .offset(Number(params.skip));



        // const inValues = [0,0,null,null];
        // const r = await db.call("sp_permissions_readlist",inValues,["@result"], this.pool);
        // const callResult = r.getOutputVal<IOutputResult>("@result");
        //
        // if (!callResult.success) {
        //     return new ResultError<IPermission[]>(
        //         new Err(callResult.msg, "sp_permissions_readlist", callResult.errorLogId.toString())
        //     );
        // }

        // permissions = r.getData<IPermission>(0);

        permissions = p as IPermission[];
        return new ResultOk<IPermission[]>(permissions);
    }

    /** Create a permission */
    async createPermission(p:IPermission): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        // const inValues = [JSON.stringify(p)];
        // const r = await db.call("sp_permissions_create", inValues,["@result"], this.pool);
        // const callResult  = r.getOutputVal<IOutputResult>("@result");
        //
        // if (!callResult.success) {
        //     return new ResultError(
        //         new Err(callResult.msg, "sp_permissions_create", callResult.errorLogId.toString())
        //     )
        // }
        //
        // permission = r.getData<IPermission>(0)[0];
        return new ResultOk(permission);
    }

    /** Delete a permission */
    async deletePermission(pName:string): Promise<IResult<IPermission>> {
        let permission: IPermission|undefined;

        // const inValues = [pName];
        // const r = await db.call("sp_permissions_delete", inValues,["@result"], this.pool);
        // const callResult  = r.getOutputVal<IOutputResult>("@result");
        //
        // if (!callResult.success) {
        //     return new ResultError(
        //         new Err(callResult.msg, "sp_permissions_delete", callResult.errorLogId.toString())
        //     )
        // }
        //
        // permission = r.getData<IPermission>(0)[0];
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
