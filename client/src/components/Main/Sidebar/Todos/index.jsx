import { useEffect, useState } from 'react';
import instance from '../../../../axiosInstance';
import { Card, TextInput, Checkbox } from 'flowbite-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { TextareaAutosize, Tooltip } from '@mui/material';

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
	const [sortOrder, setSortOrder] = useState('createdAt');

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		!editingTodo &
			setNewTodo({
				title: '',
				text: '',
				start: null,
				end: null,
				allDay: false,
			});
	};

	// const sortedTodos = [...todos].sort(
	// 	(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	// );

	const getSortedTodos = (todos, sortOrder) => {
		switch (sortOrder) {
			case 'priority':
				return [...todos].sort((a, b) => {
					// Assuming 'high', 'medium', 'low' as priority values
					const priorityValues = { high: 3, medium: 2, low: 1 };
					return priorityValues[b.priority] - priorityValues[a.priority];
				});
			case 'createdAt':
			default:
				return [...todos].sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
		}
	};

	const sortedTodos = getSortedTodos(todos, sortOrder);

	const [editingTodo, setEditingTodo] = useState(null);
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
			start: new Date(todo.start) || null,
			end: new Date(todo.end) || null,
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
		if (!dateString) return '';
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
		<div className=' text-gray-800 mt-40 pt-2 pb-24 h-dvh overflow-auto z-50'>
			<div className='mt-12 lg:mx-0 flex flex-col pb-96'>
				<button
					onClick={toggleModal}
					className='bg-opacity-20 backdrop-blur-sm bg-emerald-400 transition-all duration-900 ease-in-out hover:bg-blue-300 border-none rounded-lg absolute top-12 rounded-none w-full text-white px-28 py-3'
				>
					Add New Task
				</button>
				{todos.length > 0 && (
					<div className='bg-opacity-0 absolute top-24 md:left-36 border-none justify-center items-center rounded-lg rounded-none w-full py-3 mx-3'>
						<select
							value={sortOrder}
							onChange={(e) => setSortOrder(e.target.value)}
							className='bg-white bg-opacity-70 backdrop-blur-lg border border-none text-gray-800 text-sm rounded-lg block p-3'
						>
							<option value='createdAt'>Sort by Date</option>
							<option value='priority'>Sort by Priority</option>
						</select>
					</div>
				)}

				{sortedTodos.map((todo) => (
					<Card
						key={todo._id}
						className='mb-4 border-none shadow-none bg-black bg-opacity-20 backdrop-blur-md mx-2'
					>
						<div className='flex flex-row w-full justify-between items-center bg-opacity-0'>
							<div
								tabIndex={0}
								className='collapse collapse-arrow border border-none bg-white bg-opacity-80 backdrop-blur-lg border-none min-w-96'
							>
								<div className='collapse-title text-gray-800 font-small flex flex-row justify-between items-center'>
									<h5 className='text-sm font-semibold'>{todo.title}</h5>
									<div
										className={`badge ${getPriorityClassName(
											todo.priority
										)} border-none text-xs`}
									>
										{todo.priority.toUpperCase()}
									</div>{' '}
								</div>
								<div className='collapse-content'>
									<p className='text-xs font-light max-w-80'>{todo.text}</p>
								</div>
							</div>
						</div>
						<div className='flex flex-row justify-between items-center'>
							<div className='flex flex-row'>
								<p className='text-white text-xs text-center'>
									{formatDate(todo.start)}
								</p>
								<p className='text-white text-xs text-center mx-3'>
									{formatDate(todo.end)}
								</p>
							</div>
							<div className='flex flex-row'>
								<Tooltip title='Edit'>
									<EditNoteRoundedIcon
										fontSize='small'
										onClick={() => startEditing(todo)}
										className='text-white transition-all duration-900 ease-in-out hover:text-sky-400 dark:hover:text-sky-700 hover:cursor-pointer mx-2'
									/>
								</Tooltip>
								<Tooltip title='Delete'>
									<DeleteOutlineRoundedIcon
										fontSize='small'
										onClick={() => deleteTodo(todo._id)}
										className='ms-0 transition-all duration-900 ease-in-out text-white hover:text-red-400 dark:hover:text-red-700 hover:cursor-pointer'
									/>
								</Tooltip>
							</div>
						</div>
					</Card>
				))}
			</div>

			{isModalOpen && (
				<div className='absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md z-50 h-full w-full flex items-center justify-center'>
					<div className='relative left-0 bg-white backdrop-blur-lg bg-opacity-70 flex justify-around items-center rounded-lg p-4'>
						<h3 className='text-md font-medium text-gray-900 dark:text-white absolute top-3 left-6'>
							{editingTodo ? 'Editing Now...' : 'Add New Task'}
						</h3>

						<Tooltip title='Close'>
							<ClearRoundedIcon
								onClick={toggleModal}
								fontSize='large'
								className='text-red-500 hover:text-orange-400 hover:cursor-pointer absolute mx-3 right-2 top-3'
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
									className='mt-2 w-full text-gray-800 rounded-lg bg-white border-none bg-opacity-70 backdrop-blur-lg'
									value={newTodo.title}
									onChange={handleInputChange}
								/>
								<div className='mt-2 ms-1'>
									<select
										id='priority'
										name='priority'
										value={newTodo.priority}
										onChange={handlePriorityInputChange}
										className='text-sm border-none rounded-lg block w-full p-2.5 text-gray-800 rounded-lg bg-white bg-opacity-70 backdrop-blur-lg'
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
								className='text-sm rounded-lg border-none block w-full p-2.5 text-gray-800 rounded-lg bg-white bg-opacity-70 backdrop-blur-lg'
								value={newTodo.text}
								onChange={handleInputChange}
							/>
							<div className='mt-3 text-sm flex md:flex-nowrap xs:flex-col md:flex-row justify-center items-center w-full text-gray-800 rounded-lg'>
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
											className='shrink flex-grow rounded p-0 ps-2 ms-1 text-xs max-w-20 border-none text-gray-800 rounded-lg bg-white bg-opacity-70 backdrop-blur-lg'
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
											className='flex rounded text-gray-800 rounded-lg bg-white bg-opacity-70 backdrop-blur-lg p-0 ps-2 ms-1 text-xs max-w-20 border-none'
										/>
									</div>
									<Tooltip title='All Day'>
										<Checkbox
											id='allDay'
											name='allDay'
											checked={newTodo.allDay}
											onChange={handleCheckboxChange}
											className='px-2 mx-1 rounded-full'
										/>
									</Tooltip>
								</div>

								{editingTodo ? (
									<button
										onClick={addOrUpdateTodo}
										className='text-white bg-emerald-400 hover:bg-blue-600 me-1 py-1 px-1 md:px-3 rounded'
									>
										Save
									</button>
								) : (
									<button
										onClick={addOrUpdateTodo}
										className='text-white bg-emerald-400 hover:bg-blue-600 mx-2 py-2 md:px-3 px-1 rounded'
									>
										Save
									</button>
								)}

								{editingTodo && (
									<button
										onClick={cancelEditing}
										className='text-white bg-red-400 hover:bg-blue-600 py-1 md:px-3 px-1 rounded'
									>
										Cancel
									</button>
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
