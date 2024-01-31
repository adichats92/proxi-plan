import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/Auth';
import { Navigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
function Login() {
	const context = useContext(AuthContext);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		context.login(user);
	};
	if (!context.loading && context.user) {
		return <Navigate to='/home' />;
	}

	if (!context.loading && !context.user) {
		return (
			<div className='flex flex-col items-center lg:mx-auto my-32 justify-center dark:bg-gray-800'>
				{context.errors?.message}
				<form
					onSubmit={handleSubmit}
					className='flex flex-auto max-w-md flex-col gap-4 p-6 md:min-w-96'
				>
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='email'
								value='Your email'
							/>
						</div>
						<TextInput
							id='email'
							type='email'
							name='email'
							placeholder='name@mail.com'
							value={user.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='password'
								value='Your password'
							/>
						</div>
						<TextInput
							id='password'
							type='password'
							name='password'
							value={user.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='flex items-center gap-2'>
						<Checkbox id='remember' />
						<Label htmlFor='remember'>Remember me</Label>
					</div>
					<Label
						htmlFor='agree'
						className='flex'
					>
						<p className='pe-2'>Transform your experience:</p>
						<Link
							to={'/register'}
							className='text-cyan-600 hover:underline dark:text-cyan-500'
						>
							Sign up now
						</Link>
					</Label>

					<Button type='submit'>Login</Button>
				</form>
			</div>
		);
	}
}

export default Login;
