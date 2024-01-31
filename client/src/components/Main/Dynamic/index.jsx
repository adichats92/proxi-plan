import Map from './Map';
import News from './News';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { PostsContext } from '../../../context/Posts';
import PostCard from './Community/PostCard';
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

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

	const navigate = useNavigate();
	const handleGoBackClick = () => {
		navigate(-1);
	};
	return (
		<div className=' md:flex sm:flex-col justify-around flex-wrap items-center dark:bg-gray-800 dark:text-neutral-200 drop-shadow-none rounded-none overflow-hidden h-full'>
			<Card className='md:w-full rounded-none drop-shadow-none'>
				<Link to={'community'}>
					<h2 className='text-center text-lg text-teal-400 text-bold'>
						Neighborhood Narratives
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
				<ArrowBackRoundedIcon
					onClick={handleGoBackClick}
					className='absolute left-0 top-0 text-large my-6 mx-4 text-sky-400 hover:text-emerald-400 dark:hover:text-emerald-700 hover:cursor-pointer'
				/>
			</div>
		</div>
	);
};

export default Dynamic;
