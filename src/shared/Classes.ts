export class GetPermissionsQuery {
    public name_f: string;
    public description_f: string;
    public name_s: string;
    public description_s: string;
    public limit: string;
    public skip: string;

    constructor(val:any) {
        this.name_f = val.name_f || ``;
        this.description_f = val.description_f || ``;
        this.name_s = val.name_s || ``;
        this.description_s = val.description_s || ``;
        this.limit = val.limit || `10`;
        this.skip = val.Skip || `0`;
    }

    get Limit() { return Number(this.limit); }
    get Skip() { return Number(this.skip); }
}
