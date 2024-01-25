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
