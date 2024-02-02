const axios = require('axios');
const UserPreference = require('../models/radio');
const ApiLocation = require('../models/apiLocation');

const getStationsByState = async (req, res) => {
	try {
		const { state, countrycode } = req.query;
		const limit = req.query.limit || 150;

		if (!state || !countrycode) {
			return res.status(400).send('State and country code are required');
		}

		const response = await axios.get(
			`https://de1.api.radio-browser.info/json/stations/search?${countrycode}&hidebroken=true&state=${encodeURIComponent(
				state
			)}&limit=${limit}`
		);
		res.json(response.data);
	} catch (error) {
		console.error('Error fetching radio stations:', error);
		res.status(500).send('Failed to fetch stations');
	}
};

module.exports = { getStationsByState };
