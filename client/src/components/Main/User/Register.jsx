import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/Auth';
import { Navigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
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
			<div className='flex flex-col items-center lg:mx-auto my-32 justify-center dark:bg-gray-800'>
				<form
					className='flex flex-auto max-w-md flex-col gap-4 p-6 justify-auto md:min-w-96'
					onSubmit={handleSubmit}
				>
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='userName'
								value='Your username'
							/>
							{errors?.userName && (
								<p className='text-danger'>{errors?.userName.message}</p>
							)}
						</div>
						<TextInput
							id='userName'
							type='text'
							name='userName'
							placeholder='myusername'
							value={user.userName}
							onChange={handleChange}
							required
							shadow
						/>
					</div>
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='email'
								value='Your email'
							/>
							{errors?.email && (
								<p className='text-danger'>{errors?.email.message}</p>
							)}
						</div>
						<TextInput
							id='email'
							type='email'
							name='email'
							value={user.email}
							onChange={handleChange}
							placeholder='name@email.com'
							required
							shadow
						/>
					</div>
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='password'
								value='Your password'
							/>
							{errors?.confirmPassword && (
								<p className='text-danger'>{errors?.confirmPassword.message}</p>
							)}
						</div>
						<TextInput
							id='password'
							type='password'
							name='password'
							value={user.password}
							onChange={handleChange}
							required
							shadow
						/>
					</div>
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='confirmPassword'
								value='Repeat password'
							/>
							{errors?.confirmPassword && (
								<p className='text-danger'>{errors?.confirmPassword.message}</p>
							)}
						</div>
						<TextInput
							id='confirmPassword'
							type='password'
							name='confirmPassword'
							value={user.confirmPassword}
							onChange={handleChange}
							required
							shadow
						/>
					</div>
					<div className='flex items-center gap-2'>
						<Checkbox id='agree' />
						<Label
							htmlFor='agree'
							className='flex'
						>
							I agree with the&nbsp;
							<Link
								href='#'
								className='text-cyan-600 hover:underline dark:text-cyan-500'
							>
								terms and conditions
							</Link>
						</Label>
					</div>
					<Button type='submit'>Register new account</Button>
				</form>
			</div>
		);
	}
}

export default Register;
