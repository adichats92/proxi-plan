const cloudinary = require('../config/cloudinary');

const uploadImage = async (file) => {
	try {
		const result = await cloudinary.uploader.upload(file.path);
		console.log('img res', result.secure_url);
		return result.secure_url;
	} catch (error) {
		throw error;
	}
};

module.exports = { uploadImage };
