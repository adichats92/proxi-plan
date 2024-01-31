import { useEffect, useState } from 'react';
import instance from '../../../../axiosInstance';
import { Card, Button, TextInput, Checkbox } from 'flowbite-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';

const Todos = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState({
		title: '',
		text: '',
		start: null,
		end: null,
		allDay: false,
		priority: 'low',
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

	const handlePriorityInputChange = (e) => {
		const { name, value } = e.target;
		setNewTodo({
			...newTodo,
			[name]: value,
		});
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
	const getPriorityClassName = (priority) => {
		switch (priority) {
			case 'high':
				return 'bg-red-400 dark:bg-red-700 text-neutral-100 ';
			case 'medium':
				return 'bg-yellow-400 dark:bg-yellow-700 text-neutral-100 ';
			case 'low':
			default:
				return 'bg-emerald-300 dark:bg-emerald-700 text-white ';
		}
	};

	return (
		<div className='p-3 text-gray-800 dark:text-gray-200'>
			<div className='mb-4 flex flex-col justify-center items-center'>
				<div className='flex flex-row w-full'>
					<TextInput
						id='title'
						type='text'
						name='title'
						placeholder='Title'
						className='mt-2 w-full'
						value={newTodo.title}
						onChange={handleInputChange}
					/>
					<div className='mt-2 ms-1'>
						<select
							id='priority'
							name='priority'
							value={newTodo.priority}
							onChange={handlePriorityInputChange}
							className='dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600 border-sm text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5'
						>
							<option
								value='low'
								className='bg-blue-700'
							>
								Low
							</option>
							<option value='medium'>Medium</option>
							<option value='high'>High</option>
						</select>
					</div>
				</div>
				<TextInput
					id='text'
					type='text'
					name='text'
					placeholder='Description'
					className='mt-2 w-full'
					value={newTodo.text}
					onChange={handleInputChange}
				/>
				<div className='mt-3 px-3 text-sm flex md:flex-nowrap xs:flex-col md:flex-row justify-center items-center w-full'>
					<div className='flex w-full justify-start items-center'>
						{/* Start Date Input */}
						<div className='flex my-2 mx-1 text-xs'>
							<label
								htmlFor='start'
								className='flex'
							>
								Start:
							</label>
							<ReactDatePicker
								selected={newTodo.start}
								onChange={(date) => handleDateTimeChange('start', date)}
								showTimeSelect
								dateFormat='Pp'
								className='flex rounded dark:bg-gray-500 p-0 ps-2 ms-1 text-xs max-w-20 border-none'
							/>
						</div>

						{/* End Date Input */}
						<div className='flex my-2 mx-1 text-xs'>
							<label
								htmlFor='end'
								className='flex'
							>
								End:
							</label>
							<ReactDatePicker
								selected={newTodo.end}
								onChange={(date) => handleDateTimeChange('end', date)}
								showTimeSelect
								dateFormat='Pp'
								className='flex rounded bg-white dark:bg-gray-500 p-0 ps-2 ms-1 text-xs max-w-20  border-none'
							/>
						</div>
						<div className='my-2 text-xs flex flex-row justify-evenly items-center'>
							<Checkbox
								id='allDay'
								name='allDay'
								checked={newTodo.allDay}
								onChange={handleCheckboxChange}
								className='px-2 mx-2 rounded-full'
							/>
							<span className='text-nowrap align-baseline text-xs'>
								All Day
							</span>
						</div>
					</div>

					{editingTodo ? (
						<PublishedWithChangesRoundedIcon
							onClick={addOrUpdateTodo}
							fontSize='medium'
							className='text-sky-400 hover:text-teal-400 dark:hover:text-teal-700 hover:cursor-pointer mx-2'
						/>
					) : (
						<TaskAltRoundedIcon
							onClick={addOrUpdateTodo}
							fontSize='medium'
							className='text-sky-400 hover:text-emerald-400 dark:hover:text-emerald-700 hover:cursor-pointer mx-2'
						/>
					)}

					{editingTodo && (
						<ClearRoundedIcon
							onClick={cancelEditing}
							fontSize='medium'
							className='text-orange-400 hover:text-yellow-400 dark:hover:text-yellow-700 hover:cursor-pointer'
						/>
					)}
				</div>
			</div>
			<div className='mt-6 md:max-h-48 lg:max-h-80 overflow-auto flex flex-col'>
				{todos.map((todo) => (
					<Card
						key={todo._id}
						className='my-2'
					>
						<div className='flex flex-row w-full justify-between items-center'>
							<h5 className='text-lg text-bold'>{todo.title}</h5>
							<div
								className={`badge ${getPriorityClassName(
									todo.priority
								)} border-none`}
							>
								{todo.priority.toUpperCase()}
							</div>
						</div>
						<p>{todo.text}</p>
						<div className='flex flex-row justify-evenly items-center'>
							<p className='text-gray-500 text-xs text-center'>
								{formatDate(todo.start)}
							</p>
							<p className='text-gray-500 text-xs text-center'>
								{formatDate(todo.end)}
							</p>
							<EditNoteRoundedIcon
								fontSize='small'
								onClick={() => startEditing(todo)}
								className='hover:text-sky-400 dark:hover:text-sky-700 hover:cursor-pointer'
							/>
							<DeleteOutlineRoundedIcon
								fontSize='small'
								onClick={() => deleteTodo(todo._id)}
								className='hover:text-red-400 dark:hover:text-red-700 hover:cursor-pointer'
							/>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Todos;
