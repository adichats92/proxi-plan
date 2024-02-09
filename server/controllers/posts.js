const Post = require('../models/post');
const User = require('../models/user');
const Location = require('../models/location');
const uploadImage = require('./cloudinary').uploadImage;
// const cloudinary = require('../config/cloudinary');

const createPost = async (req, res) => {
	const { id } = req.user;

	try {
		const user = await User.find({ _Id: id });
		const location = await Location.findOne({ userId: req.user._id });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (!location) {
			return res
				.status(400)
				.json({ message: 'User location not set or invalid' });
		}

		let imageUrl = '';

		if (req.file) {
			try {
				imageUrl = await uploadImage(req.file);
				console.log(imageUrl);
			} catch (error) {
				return res
					.status(500)
					.json({ message: 'Image upload failed', error: error.message });
			}
		}

		const newPost = await Post.create({
			...req.body,
			userId: req.user._id,
			location: location.location,
			imageUrl,
		});

		res.status(201).json(newPost);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

const getAllPosts = async (req, res) => {
	const longitude = parseFloat(req.query.longitude);
	const latitude = parseFloat(req.query.latitude);

	try {
		const posts = await Post.find({
			location: {
				$geoWithin: {
					$centerSphere: [[longitude, latitude], 25 / 6378.1],
				},
			},
		})
			.populate('comments')
			.populate('userId', 'userName')
			.exec();
		// console.log('GetPosts:', posts);

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
			.populate('location')
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
