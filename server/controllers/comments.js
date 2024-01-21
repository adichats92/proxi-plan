const Comment = require('../models/comment');

const createComment = async (req, res) => {
	const id = req.params.id;
	try {
		const newComment = await Comment.create({
			...req.body,
			post: id,
			commentedBy: req.user.userName,
		});
		res.status(201).json(newComment);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getAllComments = async (req, res) => {
	try {
		const comments = await Comment.find(req.body);
		res.json(comments);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getCommentById = async (req, res) => {
	const { id } = req.params;
	try {
		// const comment = await Comment.findById(id);
		const comment = await Comment.find({ id: id });
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
		// const updatedComment = await Comment.findByIdAndUpdate({_id,id}, req.body, {
		// 	new: true,
		// });
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
		// const deletedComment = await Comment.findByIdAndDelete({_id,id});
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
