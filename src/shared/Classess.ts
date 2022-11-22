export class GetPermissionsQuery {
    constructor(
        public name_f: string = ``,
        public description_f: string = ``,
        public name_s: string = ``,
        public description_s: string = ``,
        public limit: string =`0`,
        public skip: string = `0`) {
    }

    get Limit() {
        return Number(this.limit);
    }

    get Skip() {
        return Number(this.skip);
    }
}
