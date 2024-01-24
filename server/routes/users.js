const express = require('express');
const authenticate = require('../middleware/auth');
const usersRouter = express.Router({ mergeParams: true });

const {
	register,
	login,
	logout,
	getLoggedInUser,
} = require('../controllers/users');

usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.post('/logout', logout);
usersRouter.get('/currentUser', authenticate, getLoggedInUser);

module.exports = usersRouter;
