const Comment = require('../models/comment');
const Post = require('../models/post');

const createComment = async (req, res) => {
	const { id } = req.params;
	try {
		const newComment = await Comment.create({
			...req.body,
			post: id,
			userId: req.user._id,
		});
		const updatedPost = await Post.findOneAndUpdate(
			{ _id: id },
			{ $push: { comments: newComment._id } },
			{
				new: true,
			}
		);
		if (!updatedPost) {
			res.status(404).json({ message: `Post with id ${id} Not Found` });
		} else {
			res.json(updatedPost);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAllComments = async (req, res) => {
	const { id } = req.params;
	try {
		const comments = await Comment.find({ post: id }).populate(
			'userId',
			'userName'
		);
		res.json(comments);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getCommentById = async (req, res) => {
	const { id } = req.params;
	try {
		const comment = await Comment.find({ _id: id }).populate(
			'userId',
			'userName'
		);
		if (comment.length === 0) {
			res.status(404).json({ message: `Comment with id ${id} Not Found` });
		} else {
			res.json(comment);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const updateComment = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedComment = await Comment.findOneAndUpdate(
			{ _id: id },
			req.body,
			{
				new: true,
			}
		);
		if (!updatedComment) {
			res.status(404).json({ message: `Comment with id ${id} Not Found` });
		} else {
			res.json(updatedComment);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const deleteComment = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedComment = await Comment.findOneAndDelete({ _id: id });
		if (!deletedComment) {
			res.status(404).json({ message: `Comment with id ${id} Not Found` });
		} else {
			res.json({ message: 'Comment deleted' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createComment,
	getAllComments,
	getCommentById,
	updateComment,
	deleteComment,
};
