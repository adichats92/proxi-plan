import Map from './Map';
import News from './News';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { PostsContext } from '../../../context/Posts';
import PostCard from './Community/PostCard';
import { Card } from 'flowbite-react';

const Dynamic = () => {
	const [currentPostIndex, setCurrentPostIndex] = useState(0);
	const postChangeInterval = 5000;
	const { posts } = useContext(PostsContext);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPostIndex((prevIndex) => (prevIndex + 1) % posts.length);
		}, postChangeInterval);

		return () => clearInterval(interval);
	}, [posts, postChangeInterval]);

	return (
		<div
			className='container md:flex sm:flex-col flex-grow justify-around flex-wrap items-center dark:bg-gray-800 dark:text-neutral-200 drop-shadow-none rounded-none overflow-auto'
			style={{ height: '93vh' }}
		>
			<Card className='md:w-full rounded-none drop-shadow-none'>
				<Link to={'community'}>
					<h2 className='text-center text-orange-300 text-bold'>
						Neighborhood Narratives
					</h2>
				</Link>
				<div>
					{posts.length > 0 && <PostCard post={posts[currentPostIndex]} />}
				</div>
			</Card>
			<Card>
				<Map />
			</Card>
			<Card>
				<News />
			</Card>
		</div>
	);
};

export default Dynamic;
