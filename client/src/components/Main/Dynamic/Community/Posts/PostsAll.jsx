import { Card } from 'flowbite-react';
import { PostsContext } from '../../../../../context/Posts';
import { useContext, useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import instance from '../../../../../axiosInstance';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Comments from '../Comments/Comments';
import CreatePost from './CreatePost';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { formatDistanceToNow, parseISO } from 'date-fns';

const PostsAll = () => {
	const { posts, setPosts } = useContext(PostsContext);
	const [currentUser, setCurrentUser] = useState(null);
	const [editPostData, setEditPostData] = useState({
		title: '',
		text: '',
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
	const [refreshComments, setRefreshComments] = useState(false);

	const triggerCommentsRefresh = () => {
		setRefreshComments(!refreshComments);
	};

	const sortedPosts = [...posts].sort(
		(a, b) =>
			new Date(b.createdAt || b.updatedAt) -
			new Date(a.createdAt || a.updatedAt)
	);

	const formatDateToNow = (dateString) => {
		const date = parseISO(dateString);
		return formatDistanceToNow(date, { addSuffix: true });
	};

	console.log('Edit Data', editPostData);

	console.log('current user', currentUser);
	console.log('edited data', editPostData);

	const openEditModal = (post) => {
		setEditPostData({ _id: post._id, title: post.title, text: post.text });
		setIsModalOpen(true);
	};

	const handleEditChange = (e) => {
		setEditPostData({ ...editPostData, [e.target.name]: e.target.value });
	};

	const deletePost = async (postId) => {
		try {
			await instance.delete(`/api/posts/${postId}`);
			const updatedPosts = posts.filter((post) => post._id !== postId);
			setPosts(updatedPosts);
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	const saveEdit = async () => {
		try {
			const response = await instance.put(
				`/api/posts/${editPostData._id}`,
				editPostData
			);

			console.log('Updated Post RES', response.data);

			const updatedPost = response.data;
			const updatedPosts = posts.map((post) =>
				post._id === editPostData._id ? updatedPost : post
			);
			console.log('updatedpostres', updatedPosts);
			setPosts(updatedPosts);
			setIsModalOpen(false);
			setEditPostData({
				title: '',
				text: '',
			});
		} catch (error) {
			console.error('Error updating post:', error);
		}
	};

	const cancelEdit = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		instance
			.get('/users/currentUser')
			.then((res) => {
				console.log('Api get user data response:', res.data);
				setCurrentUser(res.data.user._id);
			})
			.catch((err) => {
				console.log(err.response?.data || 'An error occurred');
			});
	}, []);

	const triggerCommentsRefreshAndCloseModal = () => {
		triggerCommentsRefresh();
		setIsModalTwoOpen(false);
	};

	return (
		<div className='bg-white bg-opacity-0 backdrop-blur-xs dark:text-white text-gray-800 p-6 mx-4 lg:mx-10'>
			{sortedPosts.map((post) => (
				<Card
					key={post._id}
					className='ms-2 mb-14 bg-white bg-opacity-50 backdrop-blur-md'
				>
					<div>
						{currentUser === post.userId._id && (
							<div className='flex flex-row nowrap'>
								<Tooltip title='Update'>
									<EditIcon
										fontSize='medium'
										className='text-sky-400 hover:text-teal-400 hover:cursor-pointer absolute right-14 mx-2'
										onClick={() => openEditModal(post)}
									/>
								</Tooltip>
								<Tooltip title='Remove'>
									<DeleteOutlineIcon
										fontSize='medium'
										className='text-red-400 hover:text-red-600 absolute right-4 hover:cursor-pointer mx-2 '
										onClick={() => deletePost(post._id)}
									/>
								</Tooltip>
							</div>
						)}
						<div className='flex flex-col md:flex-row justify-center md:justify-around items-center'>
							<div>
								<h3 className='text-xl font-semibold my-3 text-left'>
									{post.title}
								</h3>
								<p className='my-3 text-left'>{post.text}</p>
							</div>
							{post.imageUrl && (
								<img
									src={post.imageUrl}
									alt='image'
									className='h-96 w-96 p-2 m-4'
								/>
							)}
						</div>
					</div>

					<p className='font-thin text-xs'>Posted by: {post.userId.userName}</p>
					<p className='font-thin text-xs'>{formatDateToNow(post.createdAt)}</p>

					<details
						tabIndex={0}
						className={`collapse collapse-arrow border border-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white gap-4`}
					>
						<summary className='collapse-title text-xl font-medium'>
							Comments
						</summary>
						<div className='collapse-content bg-white dark:bg-gray-800 text-gray-800 dark:text-white my-4'>
							<Comments
								postId={post._id}
								refresh={refreshComments}
								onRefreshRequested={triggerCommentsRefresh}
								currentUser={currentUser}
							/>
						</div>
					</details>
				</Card>
			))}
			{isModalOpen && (
				<dialog
					id='edit_modal'
					className='modal'
					open
				>
					<div className='modal-box bg-white dark:bg-gray-700 flex flex-col  p-6'>
						<input
							type='text'
							name='title'
							placeholder='Title'
							value={editPostData.title}
							onChange={handleEditChange}
							className='text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-lg my-2'
						/>
						<textarea
							name='text'
							value={editPostData.text}
							placeholder='Details'
							onChange={handleEditChange}
							className='text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-lg  my-2'
						/>
						<div className='modal-action'>
							<Tooltip title='Save'>
								<TaskAltRoundedIcon
									onClick={saveEdit}
									fontSize='medium'
									className='text-sky-400 hover:text-emerald-400 dark:hover:text-emerald-700 hover:cursor-pointer absolute right-6 mx-3 top-1'
								/>
							</Tooltip>
							<Tooltip title='Cancel'>
								<ClearRoundedIcon
									onClick={cancelEdit}
									fontSize='medium'
									className='text-orange-400 hover:text-yellow-400 dark:hover:text-yellow-700 hover:cursor-pointer absolute mx-3 right-1 top-1'
								/>
							</Tooltip>
						</div>
					</div>
				</dialog>
			)}
			<Tooltip title='Create Post'>
				<button
					className=' bg-emerald-400 hover:bg-blue-600 border-none rounded-lg text-white fixed top-48 left-2 px-4 py-3'
					onClick={() => setIsModalTwoOpen(true)}
				>
					<PostAddIcon fontSize='medium' />
				</button>
			</Tooltip>
			{isModalTwoOpen && (
				<div className='modal modal-open bg-white dark:bg-gray-800'>
					<div className='modal-box relative bg-sky-100 dark:bg-gray-800'>
						<Tooltip title='Cancel'>
							<ClearRoundedIcon
								onClick={() => setIsModalTwoOpen(false)}
								fontSize='medium'
								className='text-orange-400 hover:text-yellow-400 dark:hover:text-yellow-700 hover:cursor-pointer absolute right-2 top-2'
							/>
						</Tooltip>
						<h3 className='text-lg font-bold text-gray-800 dark:text-white'>
							Create New Post
						</h3>
						<CreatePost onPostCreated={triggerCommentsRefreshAndCloseModal} />
					</div>
				</div>
			)}
		</div>
	);
};

export default PostsAll;
