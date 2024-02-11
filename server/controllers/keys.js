const getApiKeys = async (req, res) => {
	// Send only the keys that are required by the frontend
	const apiKeys = {
		googleMap: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		news: process.env.NEWS_DATA_API_KEY,
		weather: process.env.WEATHERBIT_API_KEY,

		// Don't send API_KEY_TWO if it's not needed by the frontend
	};

	res.json(apiKeys);
};

module.exports = { getApiKeys };
