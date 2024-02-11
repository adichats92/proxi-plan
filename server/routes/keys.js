const express = require('express');
const authenticate = require('../middleware/auth');
const { getApiKeys } = require('../controllers/keys');

const apiKeysRouter = express.Router({ mergeParams: true });

apiKeysRouter.use(authenticate);
apiKeysRouter.get('/', getApiKeys);

module.exports = apiKeysRouter;
