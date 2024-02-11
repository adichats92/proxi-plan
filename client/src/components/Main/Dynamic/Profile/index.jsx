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

const Profile = () => {
	const { posts } = useContext(PostsContext);
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
				console.log('response profile location', response);
				setLocation(response.data.apiLocationInstance);
			})
			.catch((error) => console.error('Error fetching user location:', error));
	}, []);

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
					{user.userName}
				</h2>
				<div className='flex text-gray-600 font-semibold flex-row justify-center'>
					<p className='me-1'>Now in</p>{' '}
					{location.state && <span> {location.state}, </span>}
					{location.name && <span>{location.name}</span>}
				</div>
			</div>
			<div className=''>
				{userPosts.length > 0 ? (
					<div className='bg-white justify-center bg-opacity-0 backdrop-blur-xs dark:text-white text-gray-800 p-4 md:p-8 mx-12 md:mx-20 lg:mx-72 xl:mx-96'>
						{userPosts.map((post) => (
							<div
								key={post._id}
								className=''
							>
								{user._id === post.userId._id && (
									<Card
										key={post._id}
										className='mb-14 bg-white bg-opacity-50 backdrop-blur-md'
									>
										<div>
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

											<div className='flex flex-col justify-center items-center mt-4'>
												<div>
													<h3 className='text-xl font-semibold my-3 text-center'>
														{post.title}
													</h3>
													<p className='my-3 text-left'>{post.text}</p>
												</div>
												{post.imageUrl && (
													<div className='justify-center rounded-md overflow-hidden'>
														<img
															src={post.imageUrl}
															alt='image'
															className='md:h-96 h-60 w-60 md:w-96 p-2 m-4'
														/>
													</div>
												)}
											</div>
										</div>

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
													currentUser={user}
												/>
											</div>
										</details>
									</Card>
								)}
							</div>
						))}
						{isModalOpen && (
							<div
								id='edit_modal'
								className='modal'
								open
							>
								<div className='modal-box bg-white top-0 flex flex-col p-6'>
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
							</div>
						)}
					</div>
				) : (
					<p className='text-center p-2 m-2 text-gray-800'>
						You have no posts yet.
					</p>
				)}
			</div>
		</div>
	);
};

export default Profile;
