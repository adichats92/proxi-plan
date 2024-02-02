const axios = require('axios');
const UserPreference = require('../models/radio');
const ApiLocation = require('../models/apiLocation');

const getStationsByState = async (req, res) => {
	try {
		const { state, userCountryCode, limit = 150 } = req.query;

		if (!state) {
			return res.status(400).send('State is required');
		}

		const response = await axios.get(
			`https://de1.api.radio-browser.info/json/stations/bycountrycodeexact/de?hidebroken=true&state=${encodeURIComponent(
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
