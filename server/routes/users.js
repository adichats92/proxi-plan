const express = require('express');
const authenticate = require('../middleware/auth');
const usersRouter = express.Router({ mergeParams: true });
const upload = require('../middleware/multer');

const {
	register,
	login,
	logout,
	getLoggedInUser,
	updateUser,
} = require('../controllers/users');

usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.post('/logout', logout);
usersRouter.get('/currentUser', authenticate, getLoggedInUser);
usersRouter.put(
	'/updateUser',
	authenticate,
	upload.single('image'),
	updateUser
);

module.exports = usersRouter;
