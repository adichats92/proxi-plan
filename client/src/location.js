import instance from './axiosInstance';

export const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			sendPositionToServer,
			handleGeoLocationError
		);
	} else {
		console.error('Geolocation is not supported by this browser.');
	}
};

const sendPositionToServer = (position) => {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	instance
		.post('/api/location', { latitude, longitude })
		.then((response) => console.log(response.data))
		.catch((error) => handleAxiosError(error));
};

const handleGeoLocationError = (error) => {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			console.error('User denied the request for Geolocation.');
			break;
		case error.POSITION_UNAVAILABLE:
			console.error('Location information is unavailable.');
			break;
		case error.TIMEOUT:
			console.error('The request to get user location timed out.');
			break;
		default:
			console.error('An unknown error occurred.');
			break;
	}
};

const handleAxiosError = (error) => {
	if (error.response) {
		console.error('Backend error:', error.response.data);
	} else if (error.request) {
		console.error('No response received:', error.request);
	} else {
		console.error('Error:', error.message);
	}
};

getLocation();
