import { useEffect, useState } from 'react';
import instance from '../../../../axiosInstance';
import { Card, TextInput, Checkbox } from 'flowbite-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import { TextareaAutosize, Tooltip } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';

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
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const sortedTodos = [...todos].sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

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
		toggleModal();
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
		toggleModal();
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
		if (!dateString) return ' 00  :  00  :  00 ';
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
				return 'bg-red-400 dark:bg-red-700 text-white ';
			case 'medium':
				return 'bg-yellow-400 dark:bg-yellow-700 text-white ';
			case 'low':
			default:
				return 'bg-emerald-300 dark:bg-emerald-700 text-white ';
		}
	};

	return (
		<div className=' text-gray-800 dark:text-gray-200'>
			<div className='mt-1 mx-10 md:mx-4 flex flex-col'>
				{sortedTodos.map((todo) => (
					<Card
						key={todo._id}
						className='my-2'
					>
						<div className='flex flex-row w-full justify-between items-center bg-white dark:bg-gray-800'>
							<div
								tabIndex={0}
								className='collapse collapse-arrow border border-base-300 bg-white dark:bg-gray-800 border-none focus:border-cyan-800'
							>
								<div className='collapse-title text-xl font-medium flex flex-row justify-between items-center'>
									<h5 className='text-lg text-bold'>{todo.title}</h5>
									<div
										className={`badge ${getPriorityClassName(
											todo.priority
										)} border-none`}
									>
										{todo.priority.toUpperCase()}
									</div>{' '}
								</div>
								<div className='collapse-content'>
									<p>{todo.text}</p>
								</div>
							</div>
						</div>
						<div className='flex flex-row justify-between items-center'>
							<div className='flex flex-row'>
								<p className='text-gray-500 text-xs text-center'>
									{formatDate(todo.start)}
								</p>
								<p className='text-gray-500 text-xs text-center mx-3'>
									{formatDate(todo.end)}
								</p>
							</div>
							<div className='flex flex-row'>
								<Tooltip title='Edit'>
									<EditNoteRoundedIcon
										fontSize='small'
										onClick={() => startEditing(todo)}
										className='hover:text-sky-400 dark:hover:text-sky-700 hover:cursor-pointer mx-2'
									/>
								</Tooltip>
								<Tooltip title='Delete'>
									<DeleteOutlineRoundedIcon
										fontSize='small'
										onClick={() => deleteTodo(todo._id)}
										className='ms-0 hover:text-red-400 dark:hover:text-red-700 hover:cursor-pointer'
									/>
								</Tooltip>
							</div>
						</div>
					</Card>
				))}
			</div>
			<Tooltip title='Add Task'>
				<AddTaskIcon
					className='fixed top-72 right-8 text-sky-500 hover:text-blue-700 z-50 hover:cursor-pointer '
					onClick={toggleModal}
					fontSize='large'
				></AddTaskIcon>
			</Tooltip>
			{isModalOpen && (
				<div className='fixed inset-0 bg-gray-600 bg-opacity-50 z-50 h-full w-full flex items-center justify-center'>
					<div className='relative bg-white flex justify-around items-center rounded-lg shadow dark:bg-gray-700 p-8'>
						<h3 className='text-xl font-medium text-gray-900 dark:text-white absolute top-3 left-4'>
							{editingTodo ? 'Editing Now...' : 'Add New Task'}
						</h3>

						<Tooltip title='Cancel'>
							<ClearRoundedIcon
								onClick={toggleModal}
								fontSize='medium'
								className='text-orange-400 hover:text-yellow-400 dark:hover:text-yellow-700 hover:cursor-pointer absolute mx-3 right-3 top-3'
							/>
						</Tooltip>

						{/* Form */}
						<div className='mb-4 flex flex-col justify-center items-center m-6'>
							<div className='flex flex-row w-full mb-4'>
								<TextInput
									id='title'
									type='text'
									name='title'
									placeholder='Title'
									className='mt-2 w-full dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-cyan-500 focus:border-cyan-500'
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
							<TextareaAutosize
								id='text'
								type='text'
								name='text'
								placeholder='Description'
								className='dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600 border-sm text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5'
								value={newTodo.text}
								onChange={handleInputChange}
							/>
							<div className='mt-3 text-sm flex md:flex-nowrap xs:flex-col md:flex-row justify-center items-center w-full'>
								<div className='flex w-full justify-between items-center ms-3'>
									{/* Start Date */}
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
											className='shrink flex-grow bg-gray-100 rounded dark:bg-gray-500 p-0 ps-2 ms-1 text-xs max-w-20 border-none'
										/>
									</div>

									{/* End Date */}
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
											className='flex rounded bg-gray-100 dark:bg-gray-500 p-0 ps-2 ms-1 text-xs max-w-20  border-none'
										/>
									</div>
									<Tooltip title='All Day'>
										<Checkbox
											id='allDay'
											name='allDay'
											checked={newTodo.allDay}
											onChange={handleCheckboxChange}
											className='px-2 mx-2 rounded-full'
										/>
									</Tooltip>
								</div>

								{editingTodo ? (
									<Tooltip title='Update'>
										<PublishedWithChangesRoundedIcon
											onClick={addOrUpdateTodo}
											fontSize='medium'
											className='text-sky-400 hover:text-teal-400 dark:hover:text-teal-700 hover:cursor-pointer mx-2'
										/>
									</Tooltip>
								) : (
									<Tooltip title='Save'>
										<TaskAltRoundedIcon
											onClick={addOrUpdateTodo}
											fontSize='medium'
											className='text-sky-400 hover:text-emerald-400 dark:hover:text-emerald-700 hover:cursor-pointer mx-2'
										/>
									</Tooltip>
								)}

								{editingTodo && (
									<Tooltip title='Cancel'>
										<ClearRoundedIcon
											onClick={cancelEditing}
											fontSize='medium'
											className='text-orange-400 hover:text-yellow-400 dark:hover:text-yellow-700 hover:cursor-pointer'
										/>
									</Tooltip>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Todos;
