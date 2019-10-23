
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 10, game_name: 'blue', instigator_id: 11},
        {id: 11, game_name: 'green', instigator_id: 11},
        {id: 12, game_name: 'purple', instigator_id: 12}
      ]);
    });
};
