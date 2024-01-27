import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/Auth';
import { Navigate } from 'react-router-dom';
function Register() {
	const context = useContext(AuthContext);
	const errors = context.errors;
	const [user, setUser] = useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		context.register(user);
	};

	if (!context.loading && context.user) {
		return <Navigate to='/home' />;
	}

	if (!context.loading && !context.user) {
		return (
			<form
				className='form'
				onSubmit={handleSubmit}
			>
				<label htmlFor=''>Username:</label>
				{errors?.userName && (
					<p className='text-danger'>{errors?.userName.message}</p>
				)}
				<input
					type='text'
					name='userName'
					value={user.userName}
					onChange={handleChange}
					required
				/>
				<label htmlFor=''>Email:</label>
				{errors?.email && (
					<p className='text-danger'>{errors?.email.message}</p>
				)}
				<input
					type='email'
					name='email'
					value={user.email}
					onChange={handleChange}
					required
				/>
				<label htmlFor=''>Password:</label>
				{errors?.password && (
					<p className='text-danger'>{errors?.password.message}</p>
				)}
				<input
					type='password'
					name='password'
					value={user.password}
					onChange={handleChange}
					required
				/>

				<label htmlFor=''>Confirm Password:</label>
				{errors?.confirmPassword && (
					<p className='text-danger'>{errors?.confirmPassword.message}</p>
				)}
				<input
					type='password'
					name='confirmPassword'
					value={user.confirmPassword}
					onChange={handleChange}
					required
				/>
				<button>Register</button>
			</form>
		);
	}
}

export default Register;
