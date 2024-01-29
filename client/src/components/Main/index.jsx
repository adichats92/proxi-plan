import Dynamic from './Dynamic';
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
			className=' lg:mx-auto dark:bg-zinc-700'
			style={{ height: '92vh' }}
		>
			{user ? (
				<div className='grid grid-cols-6 dark:bg-zinc-700'>
					<SideBar />
					<div className='col-span-4'>
						<Outlet />
					</div>
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
