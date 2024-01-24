import { useState } from 'react';
import instance from '../../../axiosInstance';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await instance.post('/users/login', { email, password });
			console.log(response.data);
			// Handle successful login here (e.g., store the token, redirect, etc.)
		} catch (err) {
			setError(err.response?.data?.message || 'An error occurred during login');
		}
	};

	return (
		<div>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default Login;
