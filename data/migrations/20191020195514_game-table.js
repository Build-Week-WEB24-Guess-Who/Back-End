
exports.up = function(knex) {
  return knex.schema.createTable("games", table => {
      table.increments();
      table.string("game_name", 200).notNullable();
      table.integer("instigator_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table.integer("friend_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("games");
};
