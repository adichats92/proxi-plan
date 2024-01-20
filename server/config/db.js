const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING);
		console.log('Mongodb connected!');
	} catch (error) {
		console.log('Mongodb connection error', error);
		process.exit(1);
	}
};

module.exports = connectDB;
