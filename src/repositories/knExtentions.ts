import db from "../knex";

/**
 * Exists a row on T that meet the condition on exp.
 * @param model String - Name the table to query from.
 * @param exp Any - Criteria to look for. It should be a literal object (Key Value pair).
 * */
export const exists = async function exists<T>(model:string, exp:any): Promise<boolean> {
    const count = await db<T>(model)
        .where(exp)
        .count({c: `*`});
    return count[0].c! > 0;
}

