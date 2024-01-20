const express = require('express');
const postsRouter = express.Router();
const {
	createPost,
	getAllPosts,
	getPostById,
	getPostByLocation,
	updatePost,
	deletePost,
} = require('../controllers/posts');
postsRouter.post('/', createPost);
postsRouter.get('/', getAllPosts);
postsRouter.get('/:id', getPostById);
postsRouter.get('/:location', getPostByLocation);
postsRouter.put('/:id', updatePost);
postsRouter.delete('/:id', deletePost);

module.exports = postsRouter;
