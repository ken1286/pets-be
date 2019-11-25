const db = require('../../data/dbConfig.js');

module.exports = {
  getPets,
  addPet,
  getPetById
};

function getPets(userId) {
  return db('pets')
    .where({ 'pets.user_id': userId })
    .select('pets.*');
}

function getPetById(petId, userId) {
  return db('pets')
    .where({ 'pets.id': petId, 'pets.user_id': userId })
    .first();
}

async function addPet(petObject) {
  const [id] = await db('pets').insert(petObject);
  return id;
}
