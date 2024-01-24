const express = require('express');
const authenticate = require('../middleware/auth');
const locationRouter = express.Router({ mergeParams: true });
const { saveUserLocation } = require('../controllers/location');
locationRouter.use(authenticate);
locationRouter.post('/', saveUserLocation);
module.exports = locationRouter;
