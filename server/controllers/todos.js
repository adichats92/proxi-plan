const Todo = require('../models/todo');

const createTodo = async (req, res) => {
	try {
		const newTodo = await Todo.create({
			...req.body,
			userId: req.user._id,
		});
		res.status(201).json(newTodo);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getAllTodos = async (req, res) => {
	try {
		const todos = await Todo.find({ userId: req.user._id });
		res.json(todos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getTodoById = async (req, res) => {
	const { id } = req.params;
	try {
		// const todo = await Todo.findById(id);
		const todo = await Todo.find({ _id: id });
		if (todo.length === 0) {
			res.status(404).json({ message: `Todo with id ${id} Not Found` });
		} else {
			res.json(todo[0]);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const updateTodo = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, req.body, {
			new: true,
		});
		if (!updatedTodo) {
			res.status(404).json({ message: `Todo with id ${id} Not Found` });
		} else {
			res.json(updatedTodo);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const deleteTodo = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedTodo = await Todo.findOneAndDelete({ _id: id });
		if (!deletedTodo) {
			res.status(404).json({ message: `Todo with id ${id} Not Found` });
		} else {
			res.json({ message: 'Todo deleted' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createTodo,
	getAllTodos,
	getTodoById,
	updateTodo,
	deleteTodo,
};
