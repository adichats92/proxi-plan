import { useState, useEffect, useContext } from 'react';
import instance from '../../../../../../axiosInstance';
import { LocationContext } from '../../../../../../context/Location';

const PostsAll = () => {
	const [posts, setPosts] = useState([]);
	const { coordinates, maxDistance } = useContext(LocationContext);
	const longitude = coordinates[0];
	const latitude = coordinates[1];

	console.log('PostLon:', longitude, 'PostLat:', latitude);

	useEffect(() => {
		if (latitude && longitude && maxDistance) {
			console.log(
				latitude,
				longitude,
				maxDistance,
				'before doing instance.get'
			);
			instance
				.get(
					`/api/posts?longitude=${longitude}&latitude=${latitude}&maxDistance=${maxDistance}`
				)
				.then((response) => {
					console.log('Api post response:', response.data);
					setPosts(response.data);
				})
				.catch((err) => {
					console.log(err.response?.data || 'An error occurred');
				});
		}
	}, [latitude, longitude, maxDistance]);

	return (
		<div>
			<h6>All Posts</h6>
			{posts.map((post) => (
				<div key={post._id}>
					<h3>{post.title}</h3>
					<p>Posted by: {post.userId.userName}</p>
					<p>{post.text}</p>
					<div>
						{post.comments.map((comment) => (
							<div key={comment._id}>
								<p>Commented by: {comment.userId.userName}</p>
								<p>{comment.text}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default PostsAll;
