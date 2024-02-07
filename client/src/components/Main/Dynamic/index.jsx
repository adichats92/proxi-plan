import { useContext, useState, useEffect } from 'react';
import { PostsContext } from '../../../context/Posts';
import PostCard from './Community/PostCard';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Weather from './Weather';
import Map from './Map';
import News from './News';

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
		<div>
			<div className='flex-col justify-center flex-wrap items-center shadow-none rounded-none h-full'>
				{weeklyPosts.length > 0 ? (
					<Carousel
						autoPlay
						infiniteLoop
						showThumbs={false}
						className='min-h-80 mt-4 pt-4'
					>
						{weeklyPosts.map((post, index) => (
							<div
								key={index}
								className='min-h-80 bg-white bg-opacity-50 backdrop-blur-md flex w-full justify-center'
							>
								<PostCard post={post} />
							</div>
						))}
					</Carousel>
				) : (
					<p className='text-gray-800 dark:text-white text-center'>
						No posts from the last week.
					</p>
				)}
			</div>
			<div className='flex pt-12 flex-row flex-wrap justify-around items-center my-6'>
				<div className='rounded-none border-none shadow-none w-96 h-96 m-2'>
					<Weather />
				</div>
				<div className='rounded-none border-none w-96 h-96 shadow-none m-2'>
					<Map />
				</div>
				<div className='rounded-none shadow-none border-none w-96 h-96 m-2 p-4 bg-white bg-opacity-50 backdrop-blur-md'>
					<News />
				</div>
			</div>
		</div>
	);
};

export default Dynamic;
