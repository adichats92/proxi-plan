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
import { formatDistanceToNow, parseISO } from 'date-fns';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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

	const sortedPosts =
		posts &&
		[...posts].sort(
			(a, b) =>
				new Date(b.createdAt || b.updatedAt) -
				new Date(a.createdAt || a.updatedAt)
		);

	const formatDateToNow = (dateString) => {
		const date = parseISO(dateString);
		return formatDistanceToNow(date, { addSuffix: true });
	};

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

			const updatedPost = response.data;
			const updatedPosts = posts.map((post) =>
				post._id === editPostData._id ? updatedPost : post
			);

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

	const handleLike = async (postId) => {
		try {
			const response = await instance.post(`/api/posts/${postId}/like`);
			console.log('likes', response.data);
			const updatedPosts = posts.map((post) => {
				if (post._id === postId) {
					return {
						...post,
						totalLikes: response.data.totalLikes,
						hasLiked: response.data.hasLiked,
					};
				}
				return post;
			});
			setPosts(updatedPosts);
		} catch (error) {
			console.error('Error liking the post:', error);
		}
	};

	return (
		<div className='bg-white bg-opacity-0 backdrop-blur-xs text-gray-800 mx-4 md:mx-20 lg:mx-56 xl:mx-72 2xl:mx-96'>
			{sortedPosts.map((post) => {
				return (
					<Card
						key={post._id}
						className='ms-2 mb-14 bg-white bg-opacity-50 backdrop-blur-md xl:px-12 md:py-4'
					>
						<div>
							{currentUser === post.userId._id && (
								<div className='flex flex-row nowrap'>
									<Tooltip title='Update'>
										<EditIcon
											fontSize='large'
											className='text-sky-500 hover:text-emerald-400 transition-all duration-900 ease-in-out hover:cursor-pointer absolute top-4 right-14 mx-2'
											onClick={() => openEditModal(post)}
										/>
									</Tooltip>
									<Tooltip title='Remove'>
										<DeleteOutlineIcon
											fontSize='large'
											className='text-red-500 hover:text-orange-400 transition-all duration-900 ease-in-out absolute top-4 right-4 hover:cursor-pointer mx-2 '
											onClick={() => deletePost(post._id)}
										/>
									</Tooltip>
								</div>
							)}
							<div className='flex flex-col justify-center md:justify-around items-center'>
								<div>
									<h3 className='text-xl font-semibold my-3 text-left'>
										{post.title}
									</h3>
									<p className='my-3 text-left'>{post.text}</p>
								</div>
								{post.imageUrl && (
									<div className='h-96 md:m-2 w-full bg-white bg-opacity-0  flex items-center justify-center overflow-hidden'>
										<img
											src={post.imageUrl}
											alt='image'
											className='object-contain max-w-full max-h-full w-full h-full'
										/>
									</div>
								)}
							</div>
						</div>

						<div className='flex flex-row justify-between items-center'>
							<p className='font-thin text-xs'>
								Posted by: {post.userId.userName}
							</p>
							<p className='font-thin text-xs md:pe-12'>
								{formatDateToNow(post.createdAt)}
							</p>

							<button onClick={() => handleLike(post._id)}>
								<ThumbUpIcon color={post.hasLiked ? 'primary' : 'action'} />
								{post.totalLikes || 0}
							</button>
						</div>

						<details
							tabIndex={0}
							className={`collapse collapse-arrow border border-none bg-white text-gray-800 gap-4`}
						>
							<summary className='collapse-title text-xl font-medium'>
								Comments ({post.comments.length})
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
				);
			})}
			{isModalOpen && (
				<dialog
					id='edit_modal'
					className='modal'
					open
				>
					<div className='modal-box bg-white bg-opacity-50 backdrop-blur-md flex flex-col  p-6'>
						<input
							type='text'
							name='title'
							placeholder='Title'
							value={editPostData.title}
							onChange={handleEditChange}
							className='text-gray-800 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg mt-6'
						/>
						<textarea
							name='text'
							value={editPostData.text}
							placeholder='Details'
							onChange={handleEditChange}
							className='text-gray-800 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg  mt-6 mb-4'
						/>
						<div className='modal-action'>
							<Tooltip title='Save'>
								<TaskAltRoundedIcon
									onClick={saveEdit}
									fontSize='large'
									className='text-emerald-400 hover:text-blue-600 hover:cursor-pointer absolute right-8 mx-3 top-1'
								/>
							</Tooltip>
							<Tooltip title='Cancel'>
								<ClearRoundedIcon
									onClick={cancelEdit}
									fontSize='large'
									className='text-red-500 hover:text-orange-400 dark:hover:text-yellow-700 hover:cursor-pointer absolute mx-3 right-2 top-1'
								/>
							</Tooltip>
						</div>
					</div>
				</dialog>
			)}
			<Tooltip title='Create Post'>
				<button
					className=' bg-emerald-400 text-md font-light hover:bg-blue-600 md:p-2 p-2 md:ps-16 md:hover:ps-20 md:hover:pt-2 pt-3 md:hover:pb-2 pb-3 hover:pb-12 transition-all duration-900 ease-in-out border-none rounded-none text-white fixed md:bottom-36 md:left-0 bottom-0 left-80 md:z-0 z-50'
					onClick={() => setIsModalTwoOpen(true)}
				>
					New
				</button>
			</Tooltip>
			{isModalTwoOpen && (
				<div className='modal modal-open bg-black bg-opacity-30 backdrop-blur-sm'>
					<div className='modal-box relative bg-white bg-opacity-50 backdrop-blur-md'>
						<Tooltip title='Cancel'>
							<ClearRoundedIcon
								onClick={() => setIsModalTwoOpen(false)}
								fontSize='large'
								className='text-red-500 hover:text-orange-400 dark:hover:text-yellow-700 hover:cursor-pointer absolute right-2 top-2'
							/>
						</Tooltip>
						<CreatePost onPostCreated={triggerCommentsRefreshAndCloseModal} />
					</div>
				</div>
			)}
		</div>
	);
};

export default PostsAll;
