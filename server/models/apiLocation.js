const mongoose = require('mongoose');

const apiLocationSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: String,
		lat: Number,
		lon: Number,
		country: String,
		state: String,
	},
	{ timestamps: true }
);

const ApiLocation = mongoose.model('ApiLocation', apiLocationSchema);
module.exports = ApiLocation;
