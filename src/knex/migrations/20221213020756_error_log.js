/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  let schema = knex.schema;

  schema.createTable(`errorLog`, (t) => {
    t.increments(`errorLogId`, { primaryKey: true });
    t.string(`errorMessage`, 1000).notNullable();
    t.text(`errorDetail`, `mediumtext`);
    t.text(`errorStack`, `longtext`); // mysql varchar(max=16383)
    t.datetime(`errorDate`).notNullable().defaultTo(knex.fn.now());
  });

  return schema.finally();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  let schema = knex.schema;
  schema.dropTable(`errorLog`);
  return schema.finally();
};
