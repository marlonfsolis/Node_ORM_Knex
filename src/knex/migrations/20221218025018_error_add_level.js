/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  let schema = knex.schema;

  schema.alterTable(`errorLog`, (t) => {
    // Add new column
    t.tinyint(`level`, 5)
      .notNullable()
      .defaultTo(0)
      .after(`errorLogId`);

    // Rename existing columns
    t.renameColumn(`errorMessage`,`message`);
    t.renameColumn(`errorDetail`,`detail`);
    t.renameColumn(`errorStack`,`stack`);
  });

  return schema.finally();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  let schema = knex.schema;

  schema.alterTable(`errorLog`, (t) => {
    // Remove column
    t.dropColumn(`level`);

    // Rename columns
    t.renameColumn(`message`,`errorMessage`);
    t.renameColumn(`detail`,`errorDetail`);
    t.renameColumn(`stack`,`errorStack`);
  });

  return schema.finally();

};
