const express = require('express');
const authRouter = express.Router({ mergeParams: true });

const { register, login } = require('../controllers/users');

authRouter.post('/register', register);
authRouter.post('/login', login);

module.exports = authRouter;
