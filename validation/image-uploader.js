const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const imageUploader = (req, res, next) => {
  console.log(req);
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

module.exports = imageUploader;


// router.use(
//   fileupload({
//     useTempFiles: true
//   })
// );

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