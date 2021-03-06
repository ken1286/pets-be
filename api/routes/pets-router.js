const router = require('express').Router();
const Pets = require('../models/pets-model.js');
const restricted = require('../auth/restricted-middleware.js');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

router.use(
  fileupload({
    useTempFiles: true
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const imageUploader = (req, res, next) => {
  console.log('FILES ', req.files);
  if (req.files) {
    const file = req.files.photo;

    cloudinary.uploader.upload(file.tempFilePath, function(err, result) {
      if (err) {
        console.log('Error! ', err);
        res.status(500).json({ message: 'File failed to upload' });
      } else {
        console.log('Result! ', result);
        req.body = { ...req.body, imageUrl: result.secure_url };
        next();
      }
    });
  } else {
    next();
  }
};

router.get('/', restricted, (req, res) => {
  console.log(req.user);
  const userId = req.user.id;

  Pets.getPets(userId)
    .then(pets => {
      res.status(200).json({ pets });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting pets for the user.' });
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

router.post('/', restricted, imageUploader, (req, res) => {
  const userId = req.user.id;
  const pet = { ...req.body, user_id: userId };

  console.log('Pet: ', pet);
  if (!pet.name || !pet.species || !pet.user_id) {
    res
      .status(404)
      .json({ message: "You're missing data from a required field" });
  }

  Pets.addPet(pet, userId)
    .then(pets => {
      res.status(201).json({ pets });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding the pet' });
    });
});

router.put('/:id', restricted, imageUploader, (req, res) => {
  const petId = req.params.id;
  const userId = req.user.id;
  const changes = req.body;

  Pets.updatePet(petId, userId, changes)
    .then(pets => {
      if (!pets) {
        res
          .status(404)
          .json({ message: 'No pet found with this ID for current user.' });
      } else {
        res.status(200).json({ pets });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating the location.' });
    });
});

router.delete('/:id', restricted, (req, res) => {
  const petId = req.params.id;
  const userId = req.user.id;
  console.log(req);

  Pets.deletePet(petId, userId)
    .then(pets => {
      console.log(pets);
      res.status(200).json({ message: 'The pet has been deleted.' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Pet not found.' });
    });
});

module.exports = router;
