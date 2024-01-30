import { useEffect, useState } from 'react';
import instance from '../../../../axiosInstance';
import { Card, Button, TextInput, Checkbox } from 'flowbite-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Todos = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState({
		title: '',
		text: '',
		start: null,
		end: null,
		allDay: false,
	});
	const [editingTodo, setEditingTodo] = useState(null);
	console.log('todos', todos);
	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = () => {
		instance
			.get('/api/todos')
			.then((res) => setTodos(res.data))
			.catch((err) => console.log(err.response?.data || err.message));
	};

	const handleCheckboxChange = (e) => {
		setNewTodo({
			...newTodo,
			allDay: e.target.checked,
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewTodo({
			...newTodo,
			[name]: value,
		});
	};

	const handleDateTimeChange = (name, date) => {
		setNewTodo({ ...newTodo, [name]: date });
	};

	const addOrUpdateTodo = () => {
		const apiCall = editingTodo
			? instance.put(`/api/todos/${editingTodo._id}`, newTodo)
			: instance.post('/api/todos', newTodo);

		apiCall
			.then(() => {
				fetchTodos();
				setNewTodo({
					title: '',
					text: '',
					start: null,
					end: null,
					allDay: false,
				});
				setEditingTodo(null);
			})
			.catch((err) => console.log(err.response?.data || err.message));
	};

	const startEditing = (todo) => {
		setEditingTodo(todo);
		setNewTodo({
			...todo,
			start: new Date(todo.start),
			end: new Date(todo.end),
		});
	};

	const cancelEditing = () => {
		setEditingTodo(null);
		setNewTodo({ title: '', text: '', start: null, end: null, allDay: false });
	};

	const deleteTodo = (id) => {
		instance
			.delete(`/api/todos/${id}`)
			.then(() => {
				setTodos(todos.filter((todo) => todo._id !== id));
			})
			.catch((err) => console.log(err.response?.data || err.message));
	};

	const formatDate = (dateString) => {
		const options = {
			year: '2-digit',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		};
		return new Date(dateString).toLocaleString(undefined, options);
	};

	return (
		<div className='p-3 text-gray-950 dark:text-gray-200'>
			<div className='mb-4 flex flex-col justify-center items-center'>
				<TextInput
					id='title'
					type='text'
					name='title'
					placeholder='Title'
					className='mt-2 w-full'
					value={newTodo.title}
					onChange={handleInputChange}
				/>
				<TextInput
					id='text'
					type='text'
					name='text'
					placeholder='Description'
					className='mt-2 w-full'
					value={newTodo.text}
					onChange={handleInputChange}
				/>
				<div className='mt-3 text-sm flex justify-center items-center'>
					{/* Start Date Input */}
					<div className='mb-4 mx-1 text-xs'>
						<label htmlFor='start'>Start:</label>
						<ReactDatePicker
							selected={newTodo.start}
							onChange={(date) => handleDateTimeChange('start', date)}
							showTimeSelect
							dateFormat='Pp'
							className='rounded dark:bg-gray-500 p-0 ps-2 ms-1 text-xs  max-w-24'
						/>
					</div>

					{/* End Date Input */}
					<div className='mb-4 mx-1 text-xs'>
						<label htmlFor='end'>End:</label>
						<ReactDatePicker
							selected={newTodo.end}
							onChange={(date) => handleDateTimeChange('end', date)}
							showTimeSelect
							dateFormat='Pp'
							className='rounded bg-white dark:bg-gray-500 p-0 ps-2 ms-1 text-xs max-w-24'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row justify-around items-center'>
					<div className='mb-4 mx-3 text-sm'>
						<Checkbox
							id='allDay'
							name='allDay'
							checked={newTodo.allDay}
							onChange={handleCheckboxChange}
							className='p-2 m-1 rounded-full'
						/>
						<span>All Day</span>
					</div>
					<Button
						onClick={addOrUpdateTodo}
						className='mx-3 rounded-full'
					>
						{editingTodo ? 'Update' : 'Add'}
					</Button>
					{editingTodo && (
						<Button
							onClick={cancelEditing}
							className='mx-3 rounded-full'
						>
							Cancel
						</Button>
					)}
				</div>
			</div>
			<div className='md:max-h-44 lg:max-h-52 xl:max-h-72 2xl:max-h-78 overflow-auto flex flex-col'>
				{todos.map((todo) => (
					<Card
						key={todo._id}
						className='my-2 mx-2'
					>
						<h5 className='text-lg text-bold'>{todo.title}</h5>
						<p>{todo.text}</p>
						<span className='flex flex-row justify-evenly items-center'>
							<p className='text-gray-500 text-xs text-center'>
								{formatDate(todo.start)}
							</p>
							<p className='text-gray-500 text-xs text-center'>
								{formatDate(todo.end)}
							</p>
							<Button
								onClick={() => startEditing(todo)}
								className='mx-1 rounded-full'
							>
								Edit
							</Button>
							<Button
								onClick={() => deleteTodo(todo._id)}
								className='mx-1 rounded-full bg-red-400 dark:bg-red-700 hover:bg-red-800'
							>
								Delete
							</Button>
						</span>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Todos;
