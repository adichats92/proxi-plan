const axios = require('axios');
const Location = require('../models/location');
const ApiLocation = require('../models/apiLocation');

const openweather = process.env.OPENWEATHERMAP_API_KEY;

const getStateFromCoordinates = async (req, res) => {
	try {
		const userId = req.user._id;
		console.log(userId);

		const location = await Location.findOne({ userId: userId });

		if (!location) {
			return res.status(404).send('Location not found for the user.');
		}

		const { coordinates } = location.location;
		const [longitude, latitude] = coordinates;

		const response = await axios.get(
			`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${openweather}`
		);

		const apiData = response.data[0];

		if (!apiData) {
			return res
				.status(404)
				.send('Api Location not found for the given coordinates.');
		}

		const apiLocationInstance = new ApiLocation({
			userId: userId,
			name: apiData.name,
			lat: apiData.lat,
			lon: apiData.lon,
			country: apiData.country,
			state: apiData.state,
		});

		await apiLocationInstance.save();
		res.status(200).json({ apiLocationInstance });
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = { getStateFromCoordinates };
