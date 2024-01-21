const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		commentedBy: { type: mongoose.Schema.Types.String, ref: 'User' },
		post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
		text: { type: String, required: [true, 'Text is required'] },
		hidden: Boolean,
		date: { type: Date, default: Date.now },
		meta: { likes: Number },
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Comment', commentSchema);
