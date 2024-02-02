const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: [true, 'User name is required'],
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Email address is required'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minLength: [8, 'Password MUST be at least 8 characters'],
		},
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Location',
		},
	},
	{ timestamps: true }
);
//For checking unique email
userSchema.path('email').validate(async (value) => {
	const emailCount = await mongoose.models.User.countDocuments({
		email: value,
	});
	return !emailCount;
}, 'Email already exists');
//Virtual field to store info from req but not in DB
userSchema
	.virtual('confirmPassword')
	.get(() => this._confirmPassword)
	.set((value) => (this._confirmPassword = value));

//Pre Validation before DB interaction
//For Password
userSchema.pre('validate', function (next) {
	if (this.password !== this.confirmPassword) {
		this.invalidate('confirmPassword', 'Passwords must match');
		console.log("Passwords  don't match");
	}
	next();
});
//And
userSchema.pre('save', async function (next) {
	console.log('in pre save');
	try {
		const hashedPassword = await bcrypt.hash(this.password, 10);
		console.log('HASHED', hashedPassword);
		this.password = hashedPassword;
	} catch (error) {
		console.log('There is an error', error);
	}
	next();
});

// userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;
