
exports.up = function(knex) {
  return knex.schema.createTable("user_games", table => {
      table.increments();
      table.integer("game_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("games")
      table.integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("games")

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("")
};
