const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		title: { type: String, required: [true, 'Title is required'] },
		text: { type: String, required: [true, 'Text is required'] },
		hidden: Boolean,
		start: Date,
		end: Date,
		date: { type: Date, default: Date.now },
		meta: { likes: Number },
		allDay: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Todo', todoSchema);
