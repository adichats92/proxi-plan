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
		formData.append('username', username);
		formData.append('password', password);
		if (image) {
			formData.append('image', image);
		}

		try {
			const response = await instance.put('/users/updateUser', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(response.data);
			// Handle response or update UI accordingly
			alert('Profile updated successfully!');
		} catch (error) {
			console.error('Error updating profile:', error);
			alert('Failed to update profile.');
		}
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
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
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='avatar'
					>
						Avatar
					</label>
					<input
						accept='image/*'
						type='file'
						onChange={handleAvatarChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='flex items-center justify-between'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
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
