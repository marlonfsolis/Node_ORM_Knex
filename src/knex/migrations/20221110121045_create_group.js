/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  let schema = knex.schema;

  schema.createTable(`group`, (t) => {
    t.string(`name`, 100);
    t.string(`description`, 1000);
  });

  return schema.finally();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  let schema = knex.schema;
  schema.dropTable(`group`);
  return schema.finally();
};
