import Dynamic from './Dynamic';
import Radio from './Sidebar/Radio';
import Todos from './Sidebar/Todos';
import Login from './User/Login';
import Register from './User/Register';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';

const Main = () => {
	const { user } = useContext(AuthContext);
	return (
		<div
			className=' lg:mx-auto dark:bg-zinc-700'
			style={{ height: '90vh' }}
		>
			{user ? (
				<div>
					<Radio />
					<Todos />
					<Dynamic />
				</div>
			) : (
				<div>
					<Login />
					<Register />
				</div>
			)}
		</div>
	);
};

export default Main;
