import { useState, useContext } from 'react';
import instance from '../../../../../axiosInstance';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { PostsContext } from '../../../../../context/Posts';

const CreatePost = () => {
	const navigate = useNavigate();
	const [postData, setPostData] = useState({
		title: '',
		text: '',
	});
	const { fetchPosts } = useContext(PostsContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPostData({
			...postData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await instance.post('/api/posts', postData);

			alert('Post created successfully!');
			setPostData({ title: '', text: '' });
			// Clear form after submission
			await fetchPosts();
			navigate('/home/community');
		} catch (error) {
			console.error('Error creating post:', error);
			alert('Failed to create post.');
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='flex-col w-full p-4 flex-wrap items-center justify-center text-center'
		>
			<div>
				<input
					type='text'
					name='title'
					id='title'
					placeholder='Title'
					value={postData.title}
					onChange={handleChange}
					required
					className='input w-full mb-3 bg-white dark:bg-gray-700'
				/>
			</div>
			<div>
				<textarea
					name='text'
					id='text'
					placeholder='Details'
					value={postData.text}
					onChange={handleChange}
					required
					className='textarea w-full mb-3 bg-white dark:bg-gray-700'
				/>
			</div>
			<Tooltip title='Post'>
				<PostAddRoundedIcon
					onClick={handleSubmit}
					className='text-large text-sky-400 hover:text-emerald-400 dark:hover:text-emerald-700 hover:cursor-pointer w-full'
					fontSize='large'
				/>
			</Tooltip>
		</form>
	);
};

export default CreatePost;
