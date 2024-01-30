import React, { useEffect, useState } from 'react';
import instance from '../../../../axiosInstance';

const Todos = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState({ title: '', text: '' });

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = () => {
		instance
			.get('api/todos')
			.then((res) => setTodos(res.data))
			.catch((err) => console.log(err.response?.data || err.message));
	};

	const handleInputChange = (e) => {
		setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
	};

	const addTodo = () => {
		instance
			.post('api/todos', newTodo)
			.then(() => {
				fetchTodos();
				setNewTodo({ title: '', text: '' });
			})
			.catch((err) => console.log(err.response?.data || err.message));
	};

	const updateTodo = (id, updatedTodo) => {
		instance
			.put(`api/todos/${id}`, updatedTodo)
			.then(() => fetchTodos())
			.catch((err) => console.log(err.response?.data || err.message));
	};

	const deleteTodo = (id) => {
		instance
			.delete(`api/todos/${id}`)
			.then(() => fetchTodos())
			.catch((err) => console.log(err.response?.data || err.message));
	};

	return (
		<div>
			<h3>Todos</h3>
			<div>
				<input
					name='title'
					placeholder='Title'
					value={newTodo.title}
					onChange={handleInputChange}
				/>
				<input
					name='text'
					placeholder='Description'
					value={newTodo.text}
					onChange={handleInputChange}
				/>
				<button onClick={addTodo}>Add Todo</button>
			</div>
			<ul>
				{todos.map((todo) => (
					<li key={todo._id}>
						<h3>{todo.title}</h3>
						<p>{todo.text}</p>
						<button onClick={() => deleteTodo(todo._id)}>Delete</button>
						{/* Update functionality can be expanded with additional UI for editing */}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Todos;
