import { useState, useEffect, useContext } from 'react';
import instance from '../../../../../context/Auth';
import { LocationContext } from '../../../../../context/Location';

const PostsAll = () => {
	const [posts, setPosts] = useState([]);
	const { latitude, longitude, maxDistance } = useContext(LocationContext);

	useEffect(() => {
		if (latitude && longitude && maxDistance) {
			fetchNearbyPosts();
		}
	}, [latitude, longitude, maxDistance]);

	const fetchNearbyPosts = async () => {
		try {
			const response = await instance.get(
				`/api/posts?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}`
			);
			console.log(response.data);
			setPosts(response.data);
		} catch (err) {
			console.log(err.response?.data || 'An error occurred');
		}
	};

	return (
		<div>
			<h2>All Posts</h2>
			{posts.map((post) => (
				<div key={post._id}>
					<h3>{post.title}</h3>
					<p>Posted by: {post.userId}</p>
					<p>{post.text}</p>
					<div>
						{post.comments.map((comment) => {
							<div key={comment._id}>
								<p>Commented by:{comment.userId}</p>
								<p>{comment.text}</p>
							</div>;
						})}
					</div>
					{/* Render other post details */}
				</div>
			))}
		</div>
	);
};

export default PostsAll;
