const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		location: {
			type: {
				type: String,
				enum: ['Point'],
				required: true,
			},
			coordinates: {
				type: [Number], // [longitude, latitude]
				required: true,
			},
		},
	},
	{ timestamps: true }
);

locationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
