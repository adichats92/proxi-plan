import { useEffect, useState } from 'react';
import instance from '../../../../axiosInstance';

const Todos = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		instance
			.get('api/todos')
			.then((res) => {
				setTodos(res.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	return (
		<div>
			<ul>
				{todos.map((todo) => (
					<li key={todo._id}>
						<h3>{todo.title}</h3>
						<p>{todo.text}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Todos;
