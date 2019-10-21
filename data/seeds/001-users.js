
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 10, username: 'narwhal', password: "narwhal", points: 5, level: "Beginner"},
        {id: 11, username: 'minke', password: "minke", points: 35, level: "Intermediate"},
        {id: 12, username: 'beluga', password: "beluga", points: 70, level: "Advanced"}
      ]);
    });
};
