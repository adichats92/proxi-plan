import Login from './User/Login';
import Register from './User/Register';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import SideBar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Main = () => {
	const { user } = useContext(AuthContext);
	return (
		<div
			className={
				user
					? 'lg:grid lg:grid-cols-6 bg-cyan-100 dark:bg-gray-800 flex-grow'
					: 'dark:bg-gray-800'
			}
		>
			{user ? (
				<>
					<SideBar />
					<div className='md:col-span-4'>
						<Outlet />
					</div>
				</>
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
