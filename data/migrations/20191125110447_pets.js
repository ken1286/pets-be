exports.up = function(knex) {
  return knex.schema.createTable('pets', pets => {
    pets.increments();

    pets
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    pets.string('name', 128).notNullable();
    pets.string('species', 128).notNullable();
    pets.string('imageUrl');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pets');
};
