const mongoose = require('mongoose');

const userPreferenceSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	state: String,
});

const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);

module.exports = UserPreference;
