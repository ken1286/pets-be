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
};

// router.post('/upload', restricted, (req, res) => {
//   const file = req.files.photo;
//   const user = req.user;
//   console.log(file);
//   console.log(user);
//   cloudinary.uploader.upload(file.tempFilePath, function(err, result) {
//     if (err) {
//       console.log('Error! ', err);
//     } else {
//       console.log('Result! ', result);
//     }
//   });
//   // file.mv('./api/routes/uploads/' + file.name, function(err, result) {
//   //   if (err) {
//   //     throw err;
//   //   } else {
//   //     res.status(200).json({ success: true, message: 'file uploaded' });
//   //   }
//   // });
// });

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

router.post('/', restricted, imageUploader, (req, res) => {
  const pet = { ...req.body, user_id: req.user.id };
  console.log('Pet: ', pet);
  if (!pet.name || !pet.species || !pet.user_id) {
    res
      .status(404)
      .json({ message: "You're missing data from a required field" });
  }

  Pets.addPet(pet, req.user.id)
    .then(pets => {
      res.status(201).json({ pets });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
