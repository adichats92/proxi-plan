import Map from './Map';
import News from './News';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { PostsContext } from '../../../context/Posts';
import PostCard from './Community/PostCard';
import { Card } from 'flowbite-react';
import Weather from './Weather';

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
		<div className=' flex-col justify-center flex-wrap items-center dark:bg-gray-800 dark:text-neutral-200 drop-shadow-none rounded-none h-full p-16'>
			<Card className='md:w-full rounded-none shadow-none'>
				<Link to={'community'}>
					<h2 className='text-center text-lg text-gray-700 dark:text-white font-bold'>
						Discover Local Stories
					</h2>
				</Link>
				<div>
					{posts.length > 0 && <PostCard post={posts[currentPostIndex]} />}
				</div>
			</Card>
			<div className='flex flex-row flex-wrap justify-center items-center my-6'>
				<Card className='rounded-none border-none shadow-none w-96 m-2'>
					<Weather />
				</Card>
				<Card className='rounded-none border-none w-96 shadow-none m-2'>
					<Map />
				</Card>
				<Card className='rounded-none shadow-none border-none w-96 m-2'>
					<News />
				</Card>
			</div>
		</div>
	);
};

export default Dynamic;
