const express = require('express');
const authenticate = require('../middleware/auth');
const apiLocationRouter = express.Router({ mergeParams: true });
const { getStateFromCoordinates } = require('../controllers/apiLocation');

apiLocationRouter.use(authenticate);
apiLocationRouter.get('/', getStateFromCoordinates);

module.exports = apiLocationRouter;
