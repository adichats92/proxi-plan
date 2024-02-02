import { createContext, useState, useEffect, useContext } from 'react';
import instance from '../axiosInstance';
import { AuthContext } from './Auth';
export const LocationContext = createContext();

// eslint-disable-next-line react/prop-types
export const LocationProvider = ({ children }) => {
	const { user } = useContext(AuthContext);
	const [location, setLocation] = useState({
		type: 'Point',
		coordinates: [null, null], // [longitude, latitude]
		maxDistance: 5000,
	});

	// Function to update the location state
	const updateLocationState = (latitude, longitude) => {
		setLocation({
			...location,
			coordinates: [longitude, latitude],
			maxDistance: 5000,
		});
	};

	// Function to send position to the server
	const sendPositionToServer = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		instance
			.post('/api/location', { latitude, longitude })
			.then((response) => {
				console.log(response.data);
				updateLocationState(latitude, longitude);
			})
			.catch((error) => {
				console.error('Backend error:', error.response?.data || error.message);
			});
	};

	// Function to handle geolocation errors
	const handleGeoLocationError = (error) => {
		console.error('Geolocation Error:', error.message);
	};

	// Function to get the location
	const getLocation = async () => {
		// Check for logged-in user before getting location
		await instance
			.get('/users/currentUser')
			.then((res) => {
				if (res.data.user) {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(
							sendPositionToServer,
							handleGeoLocationError
						);
					} else {
						console.error('Geolocation is not supported by this browser.');
					}
				} else {
					console.error('User is not logged in.');
				}
			})
			.catch((err) => {
				console.error('Error fetching user:', err.message);
			});
	};

	useEffect(() => {
		getLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<LocationContext.Provider value={{ ...location, setLocation }}>
			{children}
		</LocationContext.Provider>
	);
};
