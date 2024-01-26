import { createContext, useState, useEffect } from 'react';
import instance from '../axiosInstance';

export const LocationContext = createContext();

// eslint-disable-next-line react/prop-types
export const LocationProvider = ({ children }) => {
	const [location, setLocation] = useState({
		latitude: null,
		longitude: null,
		maxDistance: 5000, // Default max distance
	});
	useEffect(() => {
		instance
			.get('/users/currentUser')
			.then((res) => {
				setLocation(res.data.user.location, false, null);
			})
			.catch(() => {
				setLocation(null, false, null);
			});
	}, []);

	return (
		<LocationContext.Provider value={{ ...location, setLocation }}>
			{children}
		</LocationContext.Provider>
	);
};
