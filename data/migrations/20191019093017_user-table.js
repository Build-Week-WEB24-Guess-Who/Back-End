
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
      tbl.increments();
      tbl.string("username", 150).unique().notNullable();
      tbl.string("password", 150).unique().notNullable();
      tbl.integer("points", 10000).unsigned().defaultTo(0);
      tbl.string("level", 150).defaultTo("Beginner");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
