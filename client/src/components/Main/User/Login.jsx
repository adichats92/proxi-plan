import { useState } from 'react';
import instance from '../../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({ setAuth }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await instance.post('/users/login', { email, password });
			// Assuming the token is returned in the response.data.token
			const token = response.data.token;
			if (token) {
				handleLoginSuccess(token);
			} else {
				// Handle the case where token is not returned
				setError('Token not provided in response');
			}
		} catch (err) {
			setError(err.response?.data?.message || 'An error occurred during login');
		}
	};

	const handleLoginSuccess = (token) => {
		Cookies.set('accessToken', token, { expires: 1 }); // Set the cookie to expire in 1 day, for example
		setAuth(true);
		navigate('/home');
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
