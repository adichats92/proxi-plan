const express = require('express');
const authenticate = require('../middleware/auth');
const radioRouter = express.Router({ mergeParams: true });
const { getStationsByState } = require('../controllers/radio');

radioRouter.use(authenticate);
radioRouter.get('/', getStationsByState);

module.exports = radioRouter;
