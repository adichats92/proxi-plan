import { useContext } from 'react';
import { PostsContext } from '../../../../context/Posts';
import { AuthContext } from '../../../../context/Auth';
import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import instance from '../../../../axiosInstance';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Comments from '../Community/Comments/Comments';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Profile = () => {
	const { posts, setPosts } = useContext(PostsContext);
	const { user } = useContext(AuthContext);
	const [location, setLocation] = useState([]);
	const [userPosts, setUserPosts] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editPostData, setEditPostData] = useState({
		title: '',
		text: '',
	});

	useEffect(() => {
		setUserPosts(posts.filter((post) => post.userId._id === user._id));
	}, [posts, user]);

	const formatDateToNow = (dateString) => {
		const date = parseISO(dateString);
		return formatDistanceToNow(date, { addSuffix: true });
	};

	const [refreshComments, setRefreshComments] = useState(false);

	const triggerCommentsRefresh = () => {
		setRefreshComments(!refreshComments);
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
			setUserPosts(updatedPosts);
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

			setUserPosts(updatedPosts);
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
			.get('/api/apilocation/')
			.then((response) => {
				setLocation(response.data.apiLocationInstance);
			})
			.catch((error) => console.error('Error fetching user location:', error));
	}, []);

	const capitalizeFirstLetter = (string) => {
		if (!string) return '';
		return string.charAt(0).toUpperCase() + string.slice(1);
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
		<div className='bg-opacity-0 mt-32'>
			<div className='text-center flex flex-col mb-6 items-center justify-center'>
				<div className='w-24 rounded-full overflow-hidden'>
					<img
						alt='Profile picture'
						src={user.image ? user.image : '/dpdef.jpg'}
					/>
				</div>
				<h2 className='text-2xl text-center font-bold text-purple-600 mb-4'>
					{capitalizeFirstLetter(user.userName)}
				</h2>
				<div className='flex text-gray-600 font-semibold flex-row justify-center'>
					<p className='me-1'>Now in</p>{' '}
					{location.state && <span> {location.state}, </span>}
					{location.name && <span>{location.name}</span>}
				</div>
			</div>
			<div className='bg-white bg-opacity-0 backdrop-blur-xs text-gray-800 mx-4 md:mx-20 lg:mx-56 xl:mx-72 2xl:mx-96'>
				{userPosts.map((post) => {
					return (
						<Card
							key={post._id}
							className='ms-2 mb-14 bg-white bg-opacity-50 backdrop-blur-md xl:px-12 md:py-4'
						>
							<div>
								{user._id === post.userId._id && (
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
										currentUser={user}
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
			</div>
		</div>
	);
};

export default Profile;
