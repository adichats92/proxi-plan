const express = require('express');
const authenticate = require('../middleware/auth');
const apiWeatherRouter = express.Router({ mergeParams: true });
const { getWeatherFromCoordinates } = require('../controllers/apiWeather');

apiWeatherRouter.use(authenticate);
apiWeatherRouter.get('/', getWeatherFromCoordinates);

module.exports = apiWeatherRouter;
