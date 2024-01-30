const express = require('express');
const authenticate = require('../middleware/auth');
const locationRouter = express.Router({ mergeParams: true });
const {
	saveUserLocation,
	getUserLocation,
} = require('../controllers/location');

locationRouter.use(authenticate);
locationRouter.post('/', saveUserLocation);
locationRouter.get('/getlocation', getUserLocation);

module.exports = locationRouter;
