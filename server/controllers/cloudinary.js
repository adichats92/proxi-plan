const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadImage = async (file) => {
	try {
		const filePath = file.path;
		const result = await cloudinary.uploader.upload(filePath);
		file = result;
		fs.unlinkSync(filePath);
		return result.secure_url;
	} catch (error) {
		console.error('Upload error:', error);
		throw error;
	}
};

module.exports = { uploadImage };
