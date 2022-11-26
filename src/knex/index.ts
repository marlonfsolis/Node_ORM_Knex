import knex from "knex";
import * as knexFile from "./knexfile";

/* Playing with Knex Extension Methods - Not working yet */
knex.QueryBuilder.extend(`exists`, function (exp:any) {
    return this.whereExists(
        this.select(`1`).where(exp)
    );
});

const db = knex(knexFile.development);

export default db;
