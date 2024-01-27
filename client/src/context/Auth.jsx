import { createContext, useState, useEffect } from 'react';
import instance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);
	const setState = (user, loading, errors) => {
		setUser(user);
		setLoading(loading);
		setErrors(errors);
	};
	useEffect(() => {
		instance
			.get('/users/currentUser')
			.then((res) => {
				setState(res.data.user, false, null);
			})
			.catch(() => {
				setState(null, false, null);
			});
	}, []);

	const login = (user) => {
		setLoading(true);
		instance
			.post('/api/auth/login', user)
			.then((res) => {
				setState(res.data.user, false, null);
				navigate('/home');
			})
			.catch((err) => {
				setState(null, false, err.response.data);
			});
	};
	const register = (user) => {
		setLoading(true);
		instance
			.post('/api/auth/register', user)
			.then((res) => {
				setState(res.data.user, false, null);
				navigate('/home');
			})
			.catch((err) => {
				setState(null, false, err.response.data.errors);
			});
	};

	const logout = () => {
		instance.post('/users/logout', {}).then(() => {
			navigate('/');
			window.location.reload();
		});
	};

	return (
		<AuthContext.Provider
			value={{ user, errors, loading, register, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
