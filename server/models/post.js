const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		title: { type: String, required: [true, 'Title is required'] },
		text: { type: String, required: [true, 'Content is required'] },
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
		location: {
			latitude: Number,
			longitude: Number,
		},
		hidden: Boolean,
		likes: { likes: Number },
	},
	{ timestamps: true }
);
postSchema.virtual('url').get(function () {
	return '/post/' + this._id;
});
module.exports = mongoose.model('Post', postSchema);
