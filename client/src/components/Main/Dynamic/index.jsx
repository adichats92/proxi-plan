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
		<div className=' md:flex sm:flex-col justify-around flex-wrap items-center dark:bg-gray-800 dark:text-neutral-200 drop-shadow-none rounded-none overflow-hidden h-full'>
			<Card className='md:w-full rounded-none shadow-none'>
				<Link to={'community'}>
					<h2 className='text-center text-lg text-teal-400 text-bold'>
						Discover Local Stories
					</h2>
				</Link>
				<div>
					{posts.length > 0 && <PostCard post={posts[currentPostIndex]} />}
				</div>
			</Card>
			<div className='flex md:flex-row justify-evenly items-center'>
				<Card className='md:w-full rounded-none drop-shadow-none items-center m-12'>
					<Map />
				</Card>
				<Card className='md:w-full rounded-none drop-shadow-none items-center'>
					<News />
				</Card>
			</div>
		</div>
	);
};

export default Dynamic;
