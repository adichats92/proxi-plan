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
									className='btn text-lg font-light bg-emerald-400 hover:bg-blue-600 hover:ps-12 border-none drawer-button rounded-none text-white fixed top-40 left-0 transition-all duration-900 ease-in-out'
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
