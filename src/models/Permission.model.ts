import {check} from "express-validator";

import GetModelQuery from "./GetModelQuery.model";


export interface IPermission {
    name: string;
    description: string
}

export class PermissionModel implements IPermission {
    public name:string;
    public description:string = ``;

    constructor(p: IPermission) {
        this.name = p.name;
        this.description = p.description;
    }
}

/**
 * Validate permission input param
 * */
export const permissionValidator = () => [
    check(`name`).exists().isLength({min:3, max:100}),
    check(`description`).optional().isLength({min:0, max:1000})
];


/**
* PermissionModel query class
*/
export class GetPermissionsQuery extends GetModelQuery {
    public name_f: string;
    public description_f: string;
    public name_s: string;
    public description_s: string;

    constructor(val:any) {
        super(val);
        this.name_f = val.name_f || ``;
        this.description_f = val.description_f || ``;
        this.name_s = val.name_s || ``;
        this.description_s = val.description_s || ``;
    }
}

