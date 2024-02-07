import Login from './User/Login';
import Register from './User/Register';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import SideBar from './Sidebar';
import { Outlet } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Tooltip } from '@mui/material';

const Main = () => {
	const { user } = useContext(AuthContext);
	return (
		<div
			className={
				user
					? ' bg-white bg-gradient-to-r from-emerald-400 to-emerald-400 via-blue-400 flex-grow'
					: 'dark:bg-gray-800'
			}
		>
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
							<label
								htmlFor='my-drawer'
								className='btn bg-emerald-400 hover:bg-blue-600 border-none drawer-button rounded-lg text-white fixed top-20 left-4'
							>
								<Tooltip title='Open Sidebar'>
									<MenuOpenIcon />
								</Tooltip>
							</label>
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
