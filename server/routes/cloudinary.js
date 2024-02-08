const express = require('express');
const imageUploadRouter = express.Router();
const authenticate = require('../middleware/auth');
const upload = require('../middleware/multer');
const { uploadImage } = require('../controllers/cloudinary');

imageUploadRouter.use(authenticate);
imageUploadRouter.post('/', upload.single('image'), uploadImage);

module.exports = imageUploadRouter;
