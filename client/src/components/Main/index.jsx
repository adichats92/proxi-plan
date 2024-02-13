import Login from './User/Login';
import Register from './User/Register';
import { AuthContext } from '../../context/Auth';
import { useContext, useEffect, useState } from 'react';
import SideBar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { LoadScript } from '@react-google-maps/api';
import instance from '../../axiosInstance';

const Main = () => {
	const { user, loading } = useContext(AuthContext);
	const [apiKey, setApiKey] = useState('');

	useEffect(() => {
		const fetchApiKey = async () => {
			try {
				const response = await instance.get('/api/keys');
				const keys = await response.data;
				setApiKey(keys.googleMap);
			} catch (error) {
				console.error('Error fetching API key:', error);
			}
		};

		fetchApiKey();
	}, []);

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
							{apiKey && (
								<LoadScript
									googleMapsApiKey={apiKey}
									key='google-map-script'
								>
									<div>
										<Outlet />
									</div>
								</LoadScript>
							)}
							<Tooltip title='Open Sidebar'>
								<label
									htmlFor='my-drawer'
									className='btn text-lg font-light bg-emerald-400 hover:bg-blue-600 md:ps-12 md:hover:pb-2 md:hover:pt-2 hover:pb-20 md:hover:ps-24 ps-2 pe-2 pt-2 pb-2 border-none drawer-button rounded-none text-white fixed md:bottom-48 md:left-0 bottom-0 left-36 transition-all duration-900 ease-in-out md:z-0 z-50'
								>
									Tasks
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
