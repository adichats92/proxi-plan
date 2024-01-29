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
		<PostsContext.Provider value={{ posts, setPosts }}>
			{children}
		</PostsContext.Provider>
	);
};
