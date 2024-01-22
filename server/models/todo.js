const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		title: { type: String, required: [true, 'Title is required'] },
		text: { type: String, required: [true, 'Text is required'] },
		hidden: Boolean,
		date: { type: Date, default: Date.now },
		meta: { likes: Number },
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Todo', todoSchema);
