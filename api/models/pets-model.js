const db = require('../../data/dbConfig.js');

module.exports = {
  getPets,
  addPet,
  getPetById,
  addPet
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

async function addPet(petObject, userId) {
  const [id] = await db('pets').insert(petObject);
  return getPets(userId);
}
