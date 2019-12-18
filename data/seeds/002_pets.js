exports.seed = function(knex) {
  return knex('pets').insert([
    {
      name: 'sparky',
      species: 'dog',
      user_id: 1,
      imageUrl:
        'https://res.cloudinary.com/dbmi4xnsi/image/upload/v1575420156/arv7rla3oiysok7rftp4.jpg'
    },
    {
      name: 'fluffy',
      species: 'cat',
      user_id: 1,
      imageUrl:
        'https://res.cloudinary.com/dbmi4xnsi/image/upload/v1575420156/arv7rla3oiysok7rftp4.jpg'
    },
    {
      name: 'harry',
      species: 'dog',
      user_id: 1,
      imageUrl:
        'https://res.cloudinary.com/dbmi4xnsi/image/upload/v1575420156/arv7rla3oiysok7rftp4.jpg'
    }
  ]);
};
