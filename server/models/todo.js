const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		title: { type: String, required: [true, 'Title is required'] },
		text: { type: String, required: [true, 'Text is required'] },
		hidden: Boolean,
		start: Date,
		end: Date,
		priority: {
			type: String,
			enum: ['high', 'medium', 'low'],
			default: 'low',
		},
		allDay: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
