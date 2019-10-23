
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_games').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_games').insert([
        {id: 10, game_id: 10, user_id: 10},
        {id: 11, game_id: 10, user_id: 12},
        {id: 12, game_id: 12, user_id: 11}
      ]);
    });
};
