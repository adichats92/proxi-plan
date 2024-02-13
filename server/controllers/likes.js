const Post = require('../models/post');

const toggleLike = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user._id;

		const post = await Post.findById(id);
		if (!post) return res.status(404).send('Post not found.');

		const hasLiked = post.likes.includes(userId);
		if (hasLiked) {
			post.likes.pull(userId);
		} else {
			post.likes.push(userId);
		}

		await post.save();
		res.json({ totalLikes: post.likes.length, hasLiked: !hasLiked });
	} catch (error) {
		console.error('Error toggling like:', error);
		res.status(500).send('Internal server error');
	}
};
module.exports = { toggleLike };
