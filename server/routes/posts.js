const express = require('express');
const authenticate = require('../middleware/auth');
const postsRouter = express.Router({ mergeParams: true });
const upload = require('../middleware/multer');
const {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
} = require('../controllers/posts');

postsRouter.use(authenticate);
postsRouter.post('/', upload.single('image'), createPost);
postsRouter.get('/', getAllPosts);
postsRouter.get('/:id', getPostById);
postsRouter.put('/:id', updatePost);
postsRouter.delete('/:id', deletePost);

module.exports = postsRouter;
