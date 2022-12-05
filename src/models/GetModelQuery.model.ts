/**
 * Model query class
 * */
export default class GetModelQuery {
    public limit: string;
    public skip: string;

    constructor(val:any) {
        this.limit = val.limit || `10`;
        this.skip = val.Skip || `0`;
    }

    get Limit() { return Number(this.limit); }
    get Skip() { return Number(this.skip); }
}
