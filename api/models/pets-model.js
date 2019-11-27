const db = require('../../data/dbConfig.js');

module.exports = {
  getPets,
  addPet,
  getPetById,
  addPet,
  updatePet,
  deletePet
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

async function updatePet(petId, userId, changes) {
  const oldPet = await db('pets')
    .where({ 'pets.id': petId, 'pets.user_id': userId })
    .first();

  const newPet = { ...oldPet, ...changes };

  await db('pets')
    .where({ 'pets.id': petId })
    .first()
    .update(newPet);

  return getPets(userId);
}

async function deletePet(petId, userId) {
  await db('pets')
    .where({ 'pets.id': petId, 'pets.user_id': userId })
    .del();

  return getPets(userId);
}
