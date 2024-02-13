const express = require('express');
const { toggleLike } = require('../controllers/likes');
const authenticate = require('../middleware/auth');

const likesRouter = express.Router({ mergeParams: true });

likesRouter.use(authenticate);
likesRouter.post('/', toggleLike);

module.exports = likesRouter;
