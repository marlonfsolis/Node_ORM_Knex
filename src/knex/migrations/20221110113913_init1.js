/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  let schema = knex.schema;

  // PermissionModel table
  schema = schema.createTable(`permission`, function (t) {
      t.string(`name`).primary();
      t.string(`description`);
  });

  return schema.finally();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  let schema = knex.schema;
  schema = knex.schema
    .dropTable(`permission`);

  return schema.finally();
};
