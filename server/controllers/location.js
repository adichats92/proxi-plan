const User = require('../models/user');

const saveUserLocation = async (req, res) => {
	const { latitude, longitude } = req.body;
	const userId = req.user._id;
	console.log('UserID:', userId);
	console.log('Location:', latitude, longitude);
	try {
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				location: { latitude, longitude },
			},
			{ new: true }
		);
		res.status(200).json({ message: 'Location updated successfully' });
		console.log(req.body);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { saveUserLocation };

// const axios = require('axios');

// const getGeolocationData = async (req, res) => {
// 	try {
// 		const clientIP =
// 			req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
// 		const response = await axios.get(
// 			`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&ip=${clientIP}`
// 		);
// 		res.json(response.data);
// 		console.log(response.data);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: error.message });
// 	}
// };

// module.exports = { getGeolocationData };
