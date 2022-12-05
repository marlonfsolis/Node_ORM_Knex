import {check} from "express-validator";

import GetModelQuery from "./GetModelQuery.model";



export interface IGroup {
    name:string;
    description:string;
}

export class GroupModel implements IGroup {
    public description: string;
    public name: string;

    constructor(g:IGroup) {
        this.name = g.name;
        this.description = g.description;
    }
}

/**
 * Validate group input param
 * */
export const groupValidator = () => [
    check(`name`).exists().isLength({min:3, max:100}),
    check(`description`).optional().isLength({min:0, max:1000})
];

/**
 * GroupModel query class
 * */
export class GetGroupsQuery extends GetModelQuery{
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
