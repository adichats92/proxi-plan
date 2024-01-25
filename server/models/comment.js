const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
		text: { type: String, required: [true, 'Text is required'] },
		hidden: Boolean,
		likes: { likes: Number },
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Comment', commentSchema);
