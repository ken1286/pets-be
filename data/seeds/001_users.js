exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'user1',
      password: '$2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw.'
    },
    {
      username: 'user2',
      password: '$2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw.'
    },
    {
      username: 'user3',
      password: '$2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw.'
    }
  ]);
};

// $2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw. = '12345'
