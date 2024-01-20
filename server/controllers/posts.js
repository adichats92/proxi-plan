const Post = require('../models/post');

const createPost = async (req, res) => {
	try {
		const newPost = await Post.create(req.body);
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find(req.body);
		res.json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getPostByLocation = async (req, res) => {};
const getPostById = async (req, res) => {
	try {
		const newPost = await Post.create(req.body);
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const updatePost = async (req, res) => {};
const deletePost = async (req, res) => {};

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	getPostByLocation,
	updatePost,
	deletePost,
};
