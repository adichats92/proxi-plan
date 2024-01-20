const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		userName: { type: String, required: [true, 'User name is required'] },
		body: { type: String, required: [true, 'Post content is required'] },
		comments: [{ body: String, date: Date }],
		date: { type: Date, default: Date.now },
		hidden: Boolean,
		meta: { likes: Number },
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Post', postSchema);
