
exports.up = function(knex) {
  
    return knex.schema.createTable("users", tbl => {
        tbl.increments();
        tbl.string("username", 150).unique().notNullable();
        tbl.string("password", 150).unique().notNullable();
        tbl.integer("points", 10000).unsigned().defaultTo(0);
        tbl.string("level", 150).defaultTo("Beginner");
  
     }).createTable("games", table => {
        table.increments();
        table.string("game_name", 200).notNullable();
        table.integer("instigator_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users");
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("games").dropTableIfExists("users");
};
