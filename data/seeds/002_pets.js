exports.seed = function(knex) {
  return knex('pets').insert([
    {
      name: 'sparky',
      species: 'dog',
      user_id: 1
    },
    {
      name: 'fluffy',
      species: 'cat',
      user_id: 1
    },
    {
      name: 'harry',
      species: 'dog',
      user_id: 1
    }
  ]);
};
