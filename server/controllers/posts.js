const Post = require('../models/post');
const User = require('../models/user');

const createPost = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const newPost = await Post.create({
			...req.body,
			userId: req.user._id,
			location: user.location,
		});

		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find(req.body)
			.populate('comments')
			.populate('userId', 'userName')
			.exec();
		res.json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getPostById = async (req, res) => {
	const { id } = req.params;
	try {
		// const post = await Post.findById(id);
		const post = await Post.find({ _id: id })
			.populate('comments')
			.populate('userId', 'userName')
			.exec();
		if (post.length === 0) {
			res.status(404).json({ message: `Post with id ${id} Not Found` });
		} else {
			res.json(post[0]);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const updatePost = async (req, res) => {
	const { id } = req.params;
	try {
		// const updatedPost = await Post.findByIdAndUpdate({_id,id}, req.body, {
		// 	new: true,
		// });
		const updatedPost = await Post.findOneAndUpdate({ _id: id }, req.body, {
			new: true,
		});
		if (!updatedPost) {
			res.status(404).json({ message: `Post with id ${id} Not Found` });
		} else {
			res.json(updatedPost);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const deletePost = async (req, res) => {
	const { id } = req.params;
	try {
		// const deletedPost = await Post.findByIdAndDelete({_id,id});
		const deletedPost = await Post.findOneAndDelete({ _id: id });
		if (!deletedPost) {
			res.status(404).json({ message: `Post with id ${id} Not Found` });
		} else {
			res.json({ message: 'Post deleted' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
};
