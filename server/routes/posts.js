const express = require('express');
const authenticate = require('../middleware/auth');
const postsRouter = express.Router({ mergeParams: true });
const upload = require('../middleware/multer');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
} = require('../controllers/posts');
const cloudinaryUpload = async (req, res, next) => {
	try {
		const filePath = req.file.path;
		const result = await cloudinary.uploader.upload(filePath);
		req.file = result;
		fs.unlinkSync(filePath);
		next();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

postsRouter.use(authenticate);
postsRouter.post('/', upload.single('image'), cloudinaryUpload, createPost);
postsRouter.get('/', getAllPosts);
postsRouter.get('/:id', getPostById);
postsRouter.put('/:id', updatePost);
postsRouter.delete('/:id', deletePost);

module.exports = postsRouter;
