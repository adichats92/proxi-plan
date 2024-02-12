import Login from './User/Login';
import Register from './User/Register';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import SideBar from './Sidebar';
import { Outlet } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Tooltip } from '@mui/material';

const Main = () => {
	const { user, loading } = useContext(AuthContext);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<span className='loading loading-ring loading-lg'></span>
			</div>
		);
	}

	return (
		<div className={user ? 'bg-opacity-0 flex-grow' : 'bg-opacity-0'}>
			{user ? (
				<>
					<div className='drawer'>
						<input
							id='my-drawer'
							type='checkbox'
							className='drawer-toggle'
						/>
						<div className='drawer-content'>
							<div>
								<Outlet />
							</div>
							<Tooltip title='Open Sidebar'>
								<label
									htmlFor='my-drawer'
									className='btn text-lg font-light bg-emerald-400 hover:bg-blue-600 border-none drawer-button rounded-lg text-white fixed top-96 left-2'
								>
									{/* <MenuOpenIcon /> */}
									Side
								</label>
							</Tooltip>
						</div>
						<div className='drawer-side'>
							<label
								htmlFor='my-drawer'
								aria-label='close sidebar'
								className='drawer-overlay'
							></label>
							<SideBar />
						</div>
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
