const router = require('express').Router();
const Pets = require('../models/pets-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  console.log(req.user);
  const { id: userId } = req.user;

  Pets.getPets(userId)
    .then(pets => {
      res.status(200).json({ pets });
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not retrieve pets.' });
    });
});

router.get('/:id', restricted, (req, res) => {
  // console.log(req.user);
  // const { id: userId } = req.user;
  const { id: petId } = req.params;
  const { id: userId } = req.user;

  Pets.getPetById(petId, userId)
    .then(pet => {
      if (pet) {
        res.status(200).json({ pet });
      } else {
        res
          .status(500)
          .json({ message: 'Pet is not registered to this user.' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not retrieve pet.' });
    });
});

router.post('/', restricted, (req, res) => {
  const pet = { ...req.body, user_id: req.user.id };

  if (!pet.name || !pet.species || !pet.user_id) {
    res
      .status(404)
      .json({ message: "You're missing data from a required field" });
  }

  Pets.addPet(pet)
    .then(pet => {
      res.status(201).json(pet);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
