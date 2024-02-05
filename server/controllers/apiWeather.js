const axios = require('axios');
const Location = require('../models/location');

const openweather = process.env.OPENWEATHERMAP_API_KEY;

const getWeatherFromCoordinates = async (req, res) => {
	try {
		const userId = req.user._id;
		console.log(userId);
		const location = await Location.findOne({ userId: userId });
		console.log(location);
		if (!location) {
			return res.status(404).send('Location not found for the user.');
		}

		// Extract coordinates
		const { coordinates } = location.location;
		const [longitude, latitude] = coordinates;
		console.log('COO For WEATHER', coordinates);

		const response = await axios.get(
			`http://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${openweather}`
		);
		const apiData = response.data;
		console.log('Response', apiData);

		if (!apiData) {
			return res
				.status(404)
				.send('Api Location not found for the given coordinates.');
		}
		res.status(200).json(apiData);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
};
module.exports = { getWeatherFromCoordinates };
