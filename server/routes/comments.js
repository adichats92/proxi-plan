const express = require('express');
const authenticate = require('../middleware/auth');
const commentsRouter = express.Router({ mergeParams: true });
const {
	createComment,
	getAllComments,
	getCommentById,
	updateComment,
	deleteComment,
} = require('../controllers/comments');
commentsRouter.use(authenticate);
commentsRouter.post('/', createComment);
commentsRouter.get('/', getAllComments);
commentsRouter.get('/:id', getCommentById);
commentsRouter.put('/:id', updateComment);
commentsRouter.delete('/:id', deleteComment);

module.exports = commentsRouter;
