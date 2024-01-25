import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Main/User/Login';
import Register from './components/Main/User/Register';
import Cookies from 'js-cookie';
import Main from './components/Main';

const App = () => {
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = Cookies.get('accessToken');
		if (token) {
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			if (isAuthenticated) {
				navigate('/home');
			} else {
				navigate('/login');
			}
		}
	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading) {
		return <div>Loading...</div>; // Or some loading spinner
	}

	return (
		<Routes>
			<Route
				path='/login'
				element={<Login setAuth={setIsAuthenticated} />}
			/>
			<Route
				path='/register'
				element={<Register />}
			/>
			<Route
				path='/home'
				element={<Main />}
			/>
			{/* Redirect to either login or home depending on authentication */}
			<Route
				path='/'
				element={
					<Navigate
						replace
						to={isAuthenticated ? '/home' : '/login'}
					/>
				}
			/>
			{/* Add other routes here */}
		</Routes>
	);
};

export default App;
