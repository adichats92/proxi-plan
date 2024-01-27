const Location = require('../models/location');

const saveUserLocation = async (req, res) => {
	const { latitude, longitude } = req.body;
	const userId = req.user._id;

	try {
		if (typeof latitude !== 'number' || typeof longitude !== 'number') {
			return res.status(400).json({ message: 'Invalid location data' });
		}

		let userLocation = await Location.findOne({ userId: userId });

		if (userLocation) {
			userLocation.location = {
				type: 'Point',
				coordinates: [longitude, latitude],
			};
			await userLocation.save();
		} else {
			// Create new location
			userLocation = await Location.create({
				userId: userId,
				location: {
					type: 'Point',
					coordinates: [longitude, latitude],
				},
			});
		}
		res.status(200).json({
			message: 'Location updated successfully',
			location: userLocation.location,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { saveUserLocation };
