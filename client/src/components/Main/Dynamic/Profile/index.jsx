import { useContext } from 'react';
import { PostsContext } from '../../../../context/Posts';
import { AuthContext } from '../../../../context/Auth';
import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import instance from '../../../../axiosInstance';

const Profile = () => {
	const { posts } = useContext(PostsContext);
	const { user } = useContext(AuthContext);
	const [location, setLocation] = useState([]);

	console.log(location);

	useEffect(() => {
		instance
			.get('/api/apilocation/')
			.then((response) => {
				console.log('response for news apilocation', response);
				setLocation(response.data.apiLocationInstance);
			})
			.catch((error) => console.error('Error fetching user location:', error));
	}, [user]);

	const userPosts = posts.filter((post) => post.userId._id === user._id);

	return (
		<div className='mx-20 bg-white bg-opacity-0 backdrop-blur-md mt-32'>
			<div className='text-center mb-6'>
				<h2 className='text-2xl text-center font-bold text-purple-600 mb-4'>
					{user.userName}
				</h2>
				<p className='flex text-gray-600 font-semibold flex-row justify-center'>
					<p className='me-1'>Now in</p>{' '}
					{location.state && <span> {location.state}, </span>}
					{location.name && <span>{location.name}</span>}
				</p>
			</div>
			<div className=''>
				{userPosts.length > 0 ? (
					<>
						{userPosts.map((post) => (
							<Card
								key={post.id}
								className='flex text-center text-gray-800 mb-8 min-h-96 w-full p-4 bg-opacity-50 backdrop-blur-md border-none shadow-none justify-center items-center'
							>
								<div>
									<h4 className='text-lg text-gray-800 font-semibold'>
										{post.title}
									</h4>
									<p>{post.text}</p>
									<span className='text-xs font-thin text-gray-800'>
										Posted on: {new Date(post.createdAt).toLocaleDateString()}
									</span>
								</div>
								<div>
									{post.imageUrl && (
										<img
											src={post.imageUrl}
											alt='image'
											className='h-96 w-96 p-2 m-4'
										/>
									)}
								</div>
							</Card>
						))}
					</>
				) : (
					<p className='text-center p-2 m-2 text-gray-800'>
						You have no posts yet.
					</p>
				)}
			</div>
		</div>
	);
};

export default Profile;
