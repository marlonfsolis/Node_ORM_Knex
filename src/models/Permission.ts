import {check} from "express-validator";

export interface IPermission {
    name: string;
    description: string
}

export class Permission implements IPermission {
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

