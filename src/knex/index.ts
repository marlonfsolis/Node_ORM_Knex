import knex from "knex";
import * as knexFile from "./knexfile";

const env = process.env.NODE_ENV || `development`;

/* Playing with Knex Extension Methods - Not working yet */
knex.QueryBuilder.extend(`exists`, function (exp:any) {
    return this.whereExists(
        this.select(`1`).where(exp)
    );
});

const db = knex(knexFile[env]);

export default db;
