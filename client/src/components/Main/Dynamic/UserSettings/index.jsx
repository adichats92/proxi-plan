import { useState, useContext } from 'react';
import { AuthContext } from '../../../../context/Auth';
import instance from '../../../../axiosInstance';

const UserSettings = () => {
	const { user } = useContext(AuthContext);
	const [username, setUsername] = useState(user.username || '');
	const [password, setPassword] = useState('');
	const [image, setImage] = useState(null);

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleAvatarChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('userName', username);
		formData.append('password', password);
		if (image) {
			formData.append('image', image);
			console.log('image', image);
		}

		try {
			const response = await instance.put('/users/updateUser', formData);
			console.log(response.data);
			alert('Profile updated successfully!');
		} catch (error) {
			console.error('Error updating profile:', error);
			alert('Failed to update profile.');
		}
	};

	return (
		<div className='flex justify-center items-center h-full mt-80'>
			<form
				onSubmit={handleSubmit}
				className='bg-white bg-opacity-50 backdrop-blur-md rounded px-12 pt-8 pb-12'
			>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='username'
					>
						Username
					</label>
					<input
						id='username'
						type='text'
						value={username}
						onChange={handleUsernameChange}
						className='appearance-none border-none bg-white bg-opacity-70 backdrop-blur-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'
					>
						Password (leave blank to keep unchanged)
					</label>
					<input
						id='password'
						type='password'
						value={password}
						onChange={handlePasswordChange}
						className='appearance-none border-none bg-white bg-opacity-70 backdrop-blur-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='image'
					>
						Avatar
					</label>
					<input
						name='image'
						accept='image/*'
						type='file'
						onChange={handleAvatarChange}
						className='appearance-none bg-opacity-50 backdrop-blur-lg border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='flex items-center justify-between'>
					<button
						className='bg-emerald-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserSettings;
