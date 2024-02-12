const getApiKeys = async (req, res) => {
	const apiKeys = {
		googleMap: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		news: process.env.NEWS_DATA_API_KEY,
		weather: process.env.WEATHERBIT_API_KEY,
	};

	res.json(apiKeys);
};

module.exports = { getApiKeys };
