import { createContext, useState, useContext, useEffect } from 'react';
import instance from '../axiosInstance';
import { LocationContext } from './Location';
export const PostsContext = createContext();

// eslint-disable-next-line react/prop-types
export const PostsProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);
	const { coordinates, maxDistance } = useContext(LocationContext);
	const longitude = coordinates[0];
	const latitude = coordinates[1];

	const fetchPosts = async () => {
		if (coordinates[0] && coordinates[1] && maxDistance) {
			try {
				const response = await instance.get(
					`/api/posts?longitude=${coordinates[0]}&latitude=${coordinates[1]}&maxDistance=${maxDistance}`
				);
				const fetchedPosts = response.data.map((post) => ({
					...post,
					totalLikes: post.likes.length,
					hasLiked: post.hasLiked,
				}));
				setPosts(fetchedPosts);
			} catch (err) {
				console.log(err.response?.data || 'An error occurred');
			}
		}
	};

	useEffect(() => {
		if (latitude && longitude && maxDistance) {
			instance
				.get(
					`/api/posts?longitude=${longitude}&latitude=${latitude}&maxDistance=${maxDistance}`
				)
				.then((response) => {
					setPosts(response.data);
				})
				.catch((err) => {
					console.log(err.response?.data || 'An error occurred');
				});
		}
		fetchPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [latitude, longitude, maxDistance]);

	return (
		<PostsContext.Provider value={{ posts, setPosts, fetchPosts }}>
			{children}
		</PostsContext.Provider>
	);
};
