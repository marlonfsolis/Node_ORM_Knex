import knex from "knex";
import * as knexFile from "./knexfile";

const db = knex(knexFile.development);

export default db;
