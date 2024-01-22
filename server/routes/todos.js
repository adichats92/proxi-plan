const express = require('express');
const authenticate = require('../middleware/auth');
const todosRouter = express.Router({ mergeParams: true });
const {
	createTodo,
	getAllTodos,
	getTodoById,
	updateTodo,
	deleteTodo,
} = require('../controllers/todos');
todosRouter.use(authenticate);
todosRouter.post('/', createTodo);
todosRouter.get('/', getAllTodos);
todosRouter.get('/:id', getTodoById);
todosRouter.put('/:id', updateTodo);
todosRouter.delete('/:id', deleteTodo);

module.exports = todosRouter;
