import { useContext, useState, useEffect } from 'react';
import { PostsContext } from '../../../context/Posts';
import PostCard from './Community/PostCard';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Weather from './Weather';
import Map from './Map';
import News from './News';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const Dynamic = () => {
	const { posts } = useContext(PostsContext);
	const [weeklyPosts, setWeeklyPosts] = useState([]);

	useEffect(() => {
		const lastWeekPosts = posts
			.filter((post) => {
				const postDate = new Date(post.createdAt);
				const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
				return postDate > lastWeek;
			})
			.sort(() => 0.5 - Math.random());

		setWeeklyPosts(lastWeekPosts);
	}, [posts]);

	return (
		<div className='mt-2'>
			<div className='flex-col justify-center flex-wrap items-center shadow-none rounded-none h-full z-0'>
				{!weeklyPosts ? (
					<span className='loading loading-ring loading-lg h-96 mt-32'></span>
				) : weeklyPosts.length > 0 ? (
					<Carousel
						autoPlay
						infiniteLoop
						showThumbs={false}
						className='h-80 mt-7 z-0'
					>
						{weeklyPosts.map((post, index) => (
							<div
								key={index}
								className='min-h-80 bg-white bg-opacity-40 backdrop-blur-md flex w-full z-0'
							>
								<PostCard post={post} />
							</div>
						))}
					</Carousel>
				) : (
					<p className='text-gray-800 dark:text-white text-center'>
						No posts from the last week in the area.
					</p>
				)}
			</div>
			<div className='flex flex flex-wrap justify-around items-center mt-12'>
				<div className='md:ms-5 my-8 md:my-2'>
					<Weather />
				</div>

				<div className='rounded-none border-none h-96 w-96 shadow-none my-8 md:my-2 md:ms-8'>
					<Map />
				</div>
				<div className='rounded-none shadow-none border-none w-96 h-96 my-8 md:m-6 p-4 bg-white bg-opacity-50 backdrop-blur-md'>
					<News />
				</div>
				<Tooltip title='Local Posts'>
					<Link
						to='/home/community'
						className=' bg-emerald-400 text-md font-light hover:bg-blue-600 md:p-2 p-2 ps-2 md:ps-2.5 md:hover:ps-16 md:hover:pt-2 pt-3 md:hover:pb-3 pb-3 md:pt-2 md:pb-3 hover:pb-12 transition-all duration-900 ease-in-out border-none rounded-none text-white fixed md:bottom-36 md:left-0 bottom-0 left-56 md:z-0 z-50'
					>
						Community
					</Link>
				</Tooltip>
			</div>
		</div>
	);
};

export default Dynamic;
