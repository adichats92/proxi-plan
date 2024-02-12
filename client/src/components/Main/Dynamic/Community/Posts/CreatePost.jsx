/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import instance from '../../../../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { PostsContext } from '../../../../../context/Posts';

const CreatePost = ({ onPostCreated }) => {
	const navigate = useNavigate();
	const [postData, setPostData] = useState({
		title: '',
		text: '',
	});
	const [image, setImage] = useState(null);
	const { fetchPosts } = useContext(PostsContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPostData({
			...postData,
			[name]: value,
		});
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', postData.title);
		formData.append('text', postData.text);
		if (image) {
			formData.append('image', image);
		}

		try {
			const res = await instance.post('/api/posts', formData);

			console.log('imagepostresponse', res.data);

			alert('Post created successfully!');
			setPostData({ title: '', text: '' });
			setImage(null);
			await fetchPosts();
			navigate('/home/community');

			if (onPostCreated) {
				onPostCreated();
			}
		} catch (error) {
			console.error(
				'Error creating post:',
				error.response ? error.response.data : error
			);
			alert(
				'Failed to create post: ' +
					(error.response ? error.response.data.message : 'Unknown error')
			);
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='flex-col w-full bg-opacity-0 p-4 flex-wrap items-center justify-center text-center'
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
			<input
				type='file'
				onChange={handleImageChange}
				accept='image/*'
			/>
			<button className='text-white text-lg transition-all duration-900 ease-in-out font-medium bg-emerald-400 hover:bg-blue-600 py-2 px-4 rounded-lg mt-6 mb-2'>
				{' '}
				Create New Post
			</button>
		</form>
	);
};

export default CreatePost;
