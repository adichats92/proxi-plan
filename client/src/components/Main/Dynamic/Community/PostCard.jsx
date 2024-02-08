/* eslint-disable react/prop-types */
import { Card } from 'flowbite-react';

const PostCard = ({ post }) => {
	return (
		<Card className='mt-4 text-gray-800 bg-transparent shadow-none border-none flex flex-col md:flex-row justify-center items-center'>
			<div className='m-2 p-4 w-full h-full'>
				<h3 className='text-lg font-bold'>{post.title}</h3>
				<p className='text-sm'>{post.text}</p>
				<p className='text-xs font-thin'>Posted by: {post.userId.userName}</p>
			</div>
			<div className='m1'>
				{post.imageUrl && (
					<img
						src={post.imageUrl}
						alt='image'
						className='h-28 w-28'
					/>
				)}
			</div>
		</Card>
	);
};

export default PostCard;
